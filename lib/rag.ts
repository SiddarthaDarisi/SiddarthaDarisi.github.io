/**
 * Tiny client-side retrieval engine (BM25) — no backend, no cost.
 * Powers the Ask Siddartha site assistant (profile KB).
 */

export interface RagDoc {
  id: string;
  /** Field text used for matching; title/keywords get a boost via repetition. */
  body: string;
  boost?: string;
}

export interface RagHit {
  id: string;
  score: number;
}

const STOP = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "to", "of", "and",
  "or", "in", "on", "at", "for", "with", "my", "our", "your", "it", "its",
  "this", "that", "what", "how", "do", "does", "did", "doing", "i", "we",
  "you", "me", "can", "should", "am", "has", "have", "had", "will",
  "would", "about", "he", "him", "his", "she", "her", "they", "them",
  "whom", "why", "when", "where", "which", "know", "knows",
  "tell", "give", "get", "there", "here", "been", "being", "from",
  "into", "than", "then", "also", "just", "very", "any",
  "use", "used", "using",
]);

function stem(t: string): string {
  // crude suffix stemming: working→work, architected→architect, projects→project
  if (t.length >= 7 && t.endsWith("ing")) t = t.slice(0, -3);
  else if (t.length >= 6 && t.endsWith("ed")) t = t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) t = t.slice(0, -1);
  return t;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+%.\-_/ ]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

export interface RagIndex {
  search: (query: string, k?: number) => RagHit[];
}

export function buildIndex(docs: RagDoc[]): RagIndex {
  const K1 = 1.4;
  // Low length-normalization: keyword-rich chunks (e.g. the Amazon role) should
  // not be penalized for breadth, so they win the queries they're meant to answer.
  const B = 0.35;

  const docTokens = docs.map((d) =>
    tokenize(`${d.boost ?? ""} ${d.boost ?? ""} ${d.body}`)
  );
  const df = new Map<string, number>();
  const tfs: Array<Map<string, number>> = docTokens.map((tokens) => {
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    return tf;
  });
  const avgLen =
    docTokens.reduce((s, t) => s + t.length, 0) / Math.max(docTokens.length, 1);
  const N = docs.length;

  return {
    search(query: string, k = 4): RagHit[] {
      const qTokens = [...new Set(tokenize(query))];
      if (qTokens.length === 0) return [];
      const scores = docs.map((doc, i) => {
        const tf = tfs[i];
        const len = docTokens[i].length || 1;
        let score = 0;
        for (const q of qTokens) {
          const f = tf.get(q) ?? 0;
          if (f === 0) continue;
          const n = df.get(q) ?? 0;
          const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
          score += (idf * f * (K1 + 1)) / (f + K1 * (1 - B + (B * len) / avgLen));
        }
        return { id: doc.id, score };
      });
      return scores
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
    },
  };
}

/* ---------------- Optional LLM mode (bring-your-own-key, Gemini) ---------------- */

const KEY_STORAGE = "gemini_api_key";

export function getGeminiKey(): string | null {
  try {
    return localStorage.getItem(KEY_STORAGE);
  } catch {
    return null;
  }
}

export function setGeminiKey(key: string | null): void {
  try {
    if (key) localStorage.setItem(KEY_STORAGE, key);
    else localStorage.removeItem(KEY_STORAGE);
  } catch {
    /* private mode */
  }
}

/**
 * Compose an answer via the site's Cloudflare Worker proxy (key stays
 * server-side). Throws when the proxy is disabled or errors.
 */
export async function proxyAnswer(
  proxyUrl: string,
  system: string,
  context: string,
  question: string
): Promise<string> {
  if (!proxyUrl) throw new Error("Proxy disabled");
  const res = await fetch(proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, context, question }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    text?: string;
    error?: string;
  };
  if (!res.ok || !data.text) {
    throw new Error(data.error ?? `Proxy error ${res.status}`);
  }
  return data.text;
}

/**
 * Compose an answer with Gemini over retrieved context. Called directly from
 * the browser with the visitor's own free AI Studio key; the site ships no key.
 */
export async function geminiAnswer(
  apiKey: string,
  system: string,
  context: string,
  question: string
): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Context (the ONLY source of truth — cite section ids in [brackets]):\n${context}\n\nQuestion: ${question}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text ?? "")
    .join("")
    .trim();
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}
