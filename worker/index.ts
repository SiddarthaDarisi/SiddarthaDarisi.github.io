/**
 * Ask Siddartha proxy — lets every site visitor get Gemini-composed answers
 * without the API key ever reaching a browser.
 *
 * POST { system, context, question } -> { text }
 * The key lives only in the Worker secret GEMINI_API_KEY.
 */

interface Env {
  GEMINI_API_KEY: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://siddarthadarisi.github.io",
  "http://localhost:3000",
  "http://localhost:4173",
]);

const MAX_QUESTION = 600;
const MAX_CONTEXT = 8000;
const MAX_SYSTEM = 2000;

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "POST only" }), {
        status: 405,
        headers: corsHeaders(origin),
      });
    }

    let body: { system?: string; context?: string; question?: string };
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: corsHeaders(origin),
      });
    }

    const system = (body.system ?? "").slice(0, MAX_SYSTEM);
    const context = (body.context ?? "").slice(0, MAX_CONTEXT);
    const question = (body.question ?? "").slice(0, MAX_QUESTION);
    if (!question || !context) {
      return new Response(
        JSON.stringify({ error: "question and context are required" }),
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const upstream = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Context (the ONLY source of truth):\n${context}\n\nQuestion: ${question}`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 800 },
        }),
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: `Gemini error ${upstream.status}: ${detail.slice(0, 200)}`,
        }),
        { status: 502, headers: corsHeaders(origin) }
      );
    }

    const data = (await upstream.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!text) {
      return new Response(JSON.stringify({ error: "Empty model response" }), {
        status: 502,
        headers: corsHeaders(origin),
      });
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: corsHeaders(origin),
    });
  },
};
