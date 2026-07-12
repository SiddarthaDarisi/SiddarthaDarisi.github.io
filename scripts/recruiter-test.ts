/**
 * Recruiter cold-test harness.
 * Replicates AskWidget.tsx's retrieval path EXACTLY:
 *   - index built via buildIndex over profileKB with
 *     boost = `${topic} ${keywords.join(" ")}`, body = text
 *   - search(q, 3), confidence threshold 2.2
 *   - top hit >= 2.2 -> that chunk's `text` is the answer
 *   - otherwise -> fallback pivot message
 *
 * Run: npx tsx scripts/recruiter-test.ts
 */
import { buildIndex } from "../lib/rag";
import { profileKB } from "../lib/profile-kb";
import { questions } from "./recruiter-questions";

const CONFIDENCE = 2.2;

const FALLBACK_TEXT =
  "I don't have that specific detail on hand — but Siddartha's track record says a lot: he's gone from GenAI MLOps to building RAG ingestion at Amazon scale, picking up new stacks quickly along the way. He'd love to talk specifics directly.";

const index = buildIndex(
  profileKB.map((c) => ({
    id: c.id,
    boost: `${c.topic} ${c.keywords.join(" ")}`,
    body: c.text,
  }))
);

interface Row {
  n: number;
  question: string;
  outcome: "FALLBACK" | "HIT";
  topId?: string;
  topScore?: number;
  allHits: string;
  answer: string;
}

const rows: Row[] = [];

questions.forEach((q, i) => {
  const rawHits = index.search(q, 3);
  const hits = rawHits.filter((h) => h.score >= CONFIDENCE);
  const allHits = rawHits
    .map((h) => `${h.id}=${h.score.toFixed(2)}`)
    .join(", ") || "(none)";

  if (hits.length === 0) {
    rows.push({
      n: i + 1,
      question: q,
      outcome: "FALLBACK",
      allHits,
      answer: FALLBACK_TEXT,
    });
    return;
  }

  const top = profileKB.find((c) => c.id === hits[0].id)!;
  rows.push({
    n: i + 1,
    question: q,
    outcome: "HIT",
    topId: hits[0].id,
    topScore: hits[0].score,
    allHits,
    answer: top.text,
  });
});

// ---- Print report ----
for (const r of rows) {
  console.log("=".repeat(100));
  console.log(`#${r.n}  Q: ${r.question}`);
  if (r.outcome === "FALLBACK") {
    console.log(`  -> FALLBACK  (top-3 raw scores: ${r.allHits})`);
  } else {
    console.log(
      `  -> HIT  top=${r.topId}  score=${r.topScore!.toFixed(3)}  (top-3 raw: ${r.allHits})`
    );
  }
  console.log(`  ANSWER: ${r.answer}`);
}

console.log("=".repeat(100));
const fallbackCount = rows.filter((r) => r.outcome === "FALLBACK").length;
console.log(
  `\nTotal questions: ${rows.length}  |  FALLBACK: ${fallbackCount}  |  HIT: ${rows.length - fallbackCount}`
);
