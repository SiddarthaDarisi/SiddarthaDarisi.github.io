/* Prints each recruiter question with the chunk id it resolves to. */
import { buildIndex } from "../lib/rag";
import { profileKB } from "../lib/profile-kb";
import { questions } from "./recruiter-questions";

const CONFIDENCE = 2.2;
const index = buildIndex(
  profileKB.map((c) => ({
    id: c.id,
    boost: `${c.topic} ${c.keywords.join(" ")}`,
    body: c.text,
  }))
);

questions.forEach((q, i) => {
  const hits = index.search(q, 3).filter((h) => h.score >= CONFIDENCE);
  const got = hits.length === 0 ? "FALLBACK" : `${hits[0].id} @ ${hits[0].score.toFixed(1)}`;
  console.log(`${String(i + 1).padStart(2)}. ${q}\n    -> ${got}`);
});
