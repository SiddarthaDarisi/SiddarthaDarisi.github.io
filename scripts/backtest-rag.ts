/**
 * Backtest for the Ask Siddartha agent: every plausible visitor/recruiter
 * question, with the chunk(s) considered a correct top-1 answer.
 * "FALLBACK" = correct behavior is the recruiter-friendly contact pivot
 * (no hit, or top score below the widget's 2.2 confidence threshold).
 */
import { buildIndex } from "../lib/rag";
import { profileKB } from "../lib/profile-kb";

const CONFIDENCE = 2.2; // keep in sync with AskWidget

interface Case {
  q: string;
  expect: string[]; // acceptable top-1 chunk ids, or ["FALLBACK"]
}

const cases: Case[] = [
  // --- current role ---
  { q: "where does siddartha work", expect: ["kb-amazon-role"] },
  { q: "what is his current role", expect: ["kb-amazon-role"] },
  { q: "what does siddartha do at amazon", expect: ["kb-amazon-role", "kb-amazon-impact"] },
  { q: "which team is he on", expect: ["kb-amazon-role"] },
  { q: "tell me about amazon q business", expect: ["kb-amazon-role"] },
  { q: "what has he achieved at amazon", expect: ["kb-amazon-impact", "kb-amazon-role"] },
  { q: "does he work with llms", expect: ["kb-amazon-role", "kb-amazon-impact", "kb-skills-competencies", "kb-artifact-triage-copilot"] },
  // --- past experience ---
  { q: "what did he do before amazon", expect: ["kb-ptg-role"] },
  { q: "tell me about people tech group", expect: ["kb-ptg-role", "kb-ptg-hca", "kb-ptg-infra"] },
  { q: "what was the hca healthcare project", expect: ["kb-ptg-hca"] },
  { q: "how did he reduce infrastructure costs", expect: ["kb-ptg-infra"] },
  { q: "what is his work history", expect: ["kb-amazon-role", "kb-ptg-role", "kb-value-proposition"] },
  { q: "how many years of experience does he have", expect: ["kb-value-proposition", "kb-amazon-role"] },
  // --- skills ---
  { q: "what programming languages does he know", expect: ["kb-skills-languages"] },
  { q: "does he know python", expect: ["kb-skills-languages"] },
  { q: "java experience", expect: ["kb-skills-languages"] },
  { q: "does he know react", expect: ["kb-skills-languages"] },
  { q: "does he know kubernetes", expect: ["kb-skills-cloud-mlops"] },
  { q: "terraform experience", expect: ["kb-skills-cloud-mlops"] },
  { q: "is he good with docker", expect: ["kb-skills-cloud-mlops"] },
  { q: "aws experience", expect: ["kb-skills-cloud-mlops", "kb-amazon-role", "kb-certifications"] },
  { q: "machine learning experience", expect: ["kb-skills-competencies", "kb-skills-languages", "kb-education-iwu", "kb-project-drowsiness"] },
  { q: "is he frontend or backend", expect: ["kb-skills-languages"] },
  { q: "does he know azure", expect: ["FALLBACK"] },
  { q: "does he know golang", expect: ["FALLBACK"] },
  { q: "does he know cobol", expect: ["FALLBACK"] },
  // --- education ---
  { q: "where did he study", expect: ["kb-education-njit", "kb-education-klu", "kb-education-iwu"] },
  { q: "does he have a masters degree", expect: ["kb-education-njit"] },
  { q: "what is he studying now", expect: ["kb-education-iwu"] },
  { q: "tell me about his bachelors", expect: ["kb-education-klu"] },
  { q: "what was his gpa", expect: ["FALLBACK"] },
  // --- certifications ---
  { q: "is he aws certified", expect: ["kb-certifications"] },
  { q: "does he have security certifications", expect: ["kb-certifications"] },
  { q: "does he have comptia security+", expect: ["kb-certifications"] },
  { q: "is he a certified ethical hacker", expect: ["kb-certifications"] },
  // --- projects/artifacts ---
  { q: "what projects has he built", expect: ["kb-artifact-timeline", "kb-artifact-triage-copilot", "kb-project-drowsiness"] },
  { q: "tell me about the ai timeline", expect: ["kb-artifact-timeline"] },
  { q: "what is triage copilot", expect: ["kb-artifact-triage-copilot"] },
  { q: "drowsiness detection project", expect: ["kb-project-drowsiness"] },
  { q: "how was this website built", expect: ["kb-portfolio-build"] },
  { q: "how does this chatbot work", expect: ["kb-portfolio-build"] },
  // --- soft skills ---
  { q: "is he a good communicator", expect: ["kb-communication"] },
  { q: "is siddartha any good in speaking", expect: ["kb-communication"] },
  { q: "does siddartha know english", expect: ["kb-languages-spoken"] },
  { q: "leadership experience", expect: ["kb-mentoring", "kb-communication"] },
  { q: "has he mentored anyone", expect: ["kb-mentoring"] },
  { q: "is he a team player", expect: ["kb-communication", "kb-mentoring", "kb-amazon-role"] },
  { q: "how do you work in a team environment", expect: ["kb-communication"] },
  // --- hiring/contact ---
  { q: "how can i contact him", expect: ["kb-contact"] },
  { q: "what is his email address", expect: ["kb-contact"] },
  { q: "linkedin profile", expect: ["kb-contact"] },
  { q: "where is he located", expect: ["kb-contact", "kb-amazon-role"] },
  { q: "is he open to new opportunities", expect: ["kb-contact"] },
  { q: "why should we hire siddartha", expect: ["kb-value-proposition"] },
  { q: "give me his elevator pitch", expect: ["kb-value-proposition"] },
  { q: "who is siddartha", expect: ["kb-value-proposition", "kb-summary-current-focus"] },
  { q: "tell me about yourself", expect: ["kb-value-proposition"] },
  { q: "what are his strengths", expect: ["kb-value-proposition", "kb-communication", "kb-skills-competencies"] },
  // --- recruiter cold-test findings ---
  { q: "what company do you currently work for", expect: ["kb-amazon-role"] },
  { q: "have you built rag systems", expect: ["kb-amazon-role"] },
  { q: "what databases have you used, sql or nosql", expect: ["FALLBACK"] },
  // amazon-impact (high-throughput ingestion) is the best honest adjacent answer
  { q: "have you worked with spark or big data tools", expect: ["kb-amazon-impact", "FALLBACK"] },
  { q: "do you have experience with genai or generative ai projects", expect: ["kb-ptg-role", "kb-artifact-triage-copilot"] },
  { q: "have you led or designed a system architecture", expect: ["kb-amazon-impact"] },
  { q: "what was the biggest technical challenge you faced", expect: ["kb-amazon-impact"] },
  { q: "what is your interview availability this week", expect: ["kb-contact", "FALLBACK"] },
  { q: "team lead?", expect: ["kb-mentoring", "kb-communication"] },
  { q: "where did you go to school", expect: ["kb-education-njit", "kb-education-klu", "kb-education-iwu"] },
  { q: "can i get your resume", expect: ["kb-resume"] },
  { q: "do you have a cv", expect: ["kb-resume"] },
  { q: "expereince with kubernetes", expect: ["kb-skills-cloud-mlops", "FALLBACK"] },
  { q: "aws?", expect: ["kb-skills-cloud-mlops", "kb-amazon-role", "kb-certifications"] },
  // --- correct fallbacks (sensitive/unknown) ---
  { q: "what is his visa status", expect: ["FALLBACK"] },
  { q: "what are his salary expectations", expect: ["FALLBACK"] },
  { q: "is he willing to relocate", expect: ["FALLBACK"] },
  { q: "when can he start", expect: ["FALLBACK"] },
  { q: "what are his weaknesses", expect: ["FALLBACK"] },
  { q: "what are his hobbies", expect: ["FALLBACK"] },
];

const index = buildIndex(
  profileKB.map((c) => ({
    id: c.id,
    boost: `${c.topic} ${c.keywords.join(" ")}`,
    body: c.text,
  }))
);

let pass = 0;
const failures: string[] = [];

for (const c of cases) {
  const hits = index.search(c.q, 3).filter((h) => h.score >= CONFIDENCE);
  const got = hits.length === 0 ? "FALLBACK" : hits[0].id;
  const ok = c.expect.includes(got);
  if (ok) pass++;
  else {
    const raw = index.search(c.q, 1)[0];
    failures.push(
      `FAIL: "${c.q}"\n  got: ${got}${raw ? ` (top raw: ${raw.id} @ ${raw.score.toFixed(2)})` : ""}  expected: ${c.expect.join(" | ")}`
    );
  }
}

console.log(`\n${pass}/${cases.length} passed\n`);
for (const f of failures) console.log(f + "\n");
