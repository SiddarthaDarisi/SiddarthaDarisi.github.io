/* Exercises the LIVE Gemini proxy exactly as the reworked AskWidget LLM mode does. */
import { buildIndex } from "../lib/rag";
import { profileKB } from "../lib/profile-kb";

const PROXY = "https://ask-siddartha.siddarthadarisi.workers.dev";
const SYSTEM =
  "You are the portfolio assistant for Siddartha Darisi, a software engineer, speaking mostly with recruiters. Answer in 2-3 concise, professional sentences using ONLY the provided context; never invent facts, numbers, or skills. If the context fully answers the question, answer it plainly and do NOT tack on any \"reach out\" or contact call-to-action. Only when the context does not actually contain the answer: instead of saying he lacks the skill, point to his closest relevant experience, note that he ramps up on new technologies fast (from GenAI MLOps to Amazon-scale RAG in under two years), and invite the recruiter to reach out via his contact page. Never overstate — if the context does not show he has done something, do not imply he is an expert at it.";

const index = buildIndex(
  profileKB.map((c) => ({
    id: c.id,
    boost: `${c.topic} ${c.keywords.join(" ")}`,
    body: c.text,
  }))
);

function contextFor(q: string) {
  const hits = index.search(q, 5);
  const chunks = hits.length
    ? hits.map((h) => profileKB.find((c) => c.id === h.id)!)
    : profileKB.filter(
        (c) => c.id === "kb-value-proposition" || c.id === "kb-summary-current-focus"
      );
  return { chunks, empty: hits.length === 0 };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ask(q: string) {
  const { chunks, empty } = contextFor(q);
  const context = chunks.map((c) => `[${c.id}] ${c.topic}: ${c.text}`).join("\n");
  let text = "";
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(PROXY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://siddarthadarisi.github.io",
        },
        body: JSON.stringify({ system: SYSTEM, context, question: q }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (data.text) {
        text = data.text;
        break;
      }
      text = `ERROR: ${data.error}`;
      if (!/503|UNAVAILABLE|high demand/i.test(text)) break;
    } catch (e) {
      text = `NETWORK: ${e instanceof Error ? e.message : String(e)}`;
    }
    await sleep(2500);
  }
  const invites = /contact page|reach out|get in touch|contact him/i.test(text);
  console.log(
    `Q: ${q}${empty ? "  [anchor]" : ""}\n   ${text}\n   button: ${invites ? "Contact Siddartha" : "(none)"}\n`
  );
}

const questions = [
  "wat does he do",
  "who is siddartha",
  "What are his AWS certifications?",
  "is sid any good at sales",
  "what is his visa status",
  "what are his salary expectations",
  "does he know cobol",
  "can you share his resume",
];

(async () => {
  for (const q of questions) await ask(q);
})();
