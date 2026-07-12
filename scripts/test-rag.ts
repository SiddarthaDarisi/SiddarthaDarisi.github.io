/* Quick smoke test for the Ask Siddartha retrieval path (no browser, no key). */
import { buildIndex } from "../lib/rag";
import { profileKB, askSuggestions } from "../lib/profile-kb";

const index = buildIndex(
  profileKB.map((c) => ({
    id: c.id,
    boost: `${c.topic} ${c.keywords.join(" ")}`,
    body: c.text,
  }))
);

const queries = [
  ...askSuggestions,
  "What does Siddartha do at Amazon?",
  "does he know kubernetes",
  "tell me about the timeline project",
  "what is triage copilot",
  "how do I contact him",
  "does he have COBOL experience", // should be a no-hit → contact fallback
];

for (const q of queries) {
  const hits = index.search(q, 3);
  const top = hits[0] ? profileKB.find((c) => c.id === hits[0].id) : undefined;
  console.log(
    `Q: ${q}\n → ${hits.length === 0 ? "NO HIT (contact fallback)" : `${top?.id} (${hits[0].score.toFixed(2)}) — ${top?.text.slice(0, 90)}…`}\n`
  );
}

// user-reported misses
for (const q of ["is siddartha any good in speaking", "does siddartha know english", "how are his communication skills"]) {
  const hits = index.search(q, 3);
  const top = hits[0] ? profileKB.find((c) => c.id === hits[0].id) : undefined;
  console.log(`Q: ${q}\n → ${hits.length === 0 ? "NO HIT" : `${top?.id} (${hits[0].score.toFixed(2)})`}\n`);
}
