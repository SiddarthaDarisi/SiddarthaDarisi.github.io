export interface ArtifactReference {
  label: string;
  url?: string;
}

export interface ArtifactEmbed {
  src: string;
  title: string;
  minHeight: number;
}

export interface Artifact {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  introduction: string;
  description: string;
  objective: string;
  process: string[];
  tools: string[];
  uniqueValue: string;
  relevance: string;
  references: ArtifactReference[];
  /** External iframe embed; omitted when the artifact renders as a live in-page component. */
  embed?: ArtifactEmbed;
  externalUrl?: string;
}

export const artifacts: Artifact[] = [
  {
    slug: "ai-ml-timeline",
    title: "The Climate of Machine Intelligence",
    subtitle:
      "An interactive timeline of AI history (1943–2025), framed as booms, winters, and thaws",
    tags: ["AI/ML Research", "Data Visualization", "TypeScript", "GitHub Pages"],
    introduction:
      "An interactive, publicly hosted web timeline that tells the story of artificial intelligence from 1943 to 2025 through a weather metaphor — booms, winters, and thaws — arguing that AI winters were driven by hardware and funding constraints rather than failures of the underlying theory.",
    description:
      'The timeline presents 40 curated milestones across six eras — Foundations (1943–1955), the Golden Years (1956–1973), AI Winters I & II (1974–1987), Quiet Progress (1993–2011), the Deep Learning Boom (2012–2019), and the Generative Era (2020–2025). Milestones are categorized (Theory, Hardware, Industry, Model Release, AI Winter) and filterable by theme; a clickable "barometer" lets visitors jump between eras; and a log-scale training-compute visualization shows how compute flatlined during the winters and exploded afterward, reinforcing the central thesis.',
    objective:
      "Created for the AI & ML Timelines activity in the IWU AI/ML program, with two goals: (1) demonstrate the ability to research, synthesize, and communicate seven decades of AI history for a technical-professional audience, and (2) publish it as a genuinely useful, interactive reference rather than a static document.",
    process: [
      "Researched primary sources and milestone candidates across 1943–2025.",
      'Developed the "climate" narrative frame and grouped milestones into six eras.',
      "Designed the interaction model (era barometer, category filters, compute chart).",
      "Implemented as a TypeScript web app.",
      "Collected and log-scaled training-compute data for landmark models.",
      "Deployed to GitHub Pages and iterated on feedback.",
    ],
    tools: [
      "TypeScript",
      "HTML & CSS",
      "JavaScript",
      "GitHub Pages",
      "Git/GitHub",
      "Historical sources: peer-reviewed papers, Stanford AI Index, Epoch AI compute data",
    ],
    uniqueValue:
      "Goes beyond a list of dates — it advances an argument (winters were resource constraints, not theoretical dead ends) and lets the audience test that argument interactively against the compute data. It demonstrates research synthesis, front-end engineering, and data-storytelling in a single artifact.",
    relevance:
      "For hiring managers and collaborators in AI/ML it shows historical literacy — understanding why the field moves in cycles — which directly informs sober judgment about today's generative-AI boom; for peers and learners it serves as a free, reusable teaching resource.",
    references: [
      {
        label:
          'McCulloch & Pitts (1943), "A Logical Calculus of the Ideas Immanent in Nervous Activity"',
      },
      { label: 'Turing (1950), "Computing Machinery and Intelligence"' },
      { label: "Dartmouth Summer Research Project on AI (1956)" },
      {
        label:
          'Krizhevsky et al. (2012), "ImageNet Classification with Deep CNNs"',
      },
      { label: 'Vaswani et al. (2017), "Attention Is All You Need"' },
      {
        label: "Stanford HAI AI Index Report",
        url: "https://aiindex.stanford.edu",
      },
      {
        label: "Epoch AI training-compute dataset",
        url: "https://epoch.ai/data",
      },
    ],
    embed: {
      src: "https://siddarthadarisi.github.io/climate-of-machine-intelligence/",
      title: "The Climate of Machine Intelligence — interactive timeline",
      minHeight: 720,
    },
    externalUrl: "https://siddarthadarisi.github.io/climate-of-machine-intelligence/",
  },
  {
    slug: "triage-copilot",
    title: "Triage Copilot — On-Call AI Assistant",
    subtitle:
      "An AI agent that advises but never executes — built for a sleep-deprived engineer at 3am, and designed around what it refuses to do",
    tags: ["AI Agent", "Responsible AI", "AWS Operations", "Knowledge Grounding"],
    introduction:
      "Triage Copilot is a Socratic triage guide for a failed AWS data pipeline: it asks one question at a time, sequences an on-call engineer toward a testable hypothesis, and states a confidence level and a falsification condition for every conclusion. It never runs a command and never declares an incident resolved. It's embedded live below — ask it about a Redshift or Lambda failure and see it work the way it was designed to.",
    description:
      "This bot came out of three earlier AI Lab exercises where I tested an LLM comparison, a custom tutoring GPT, and a research assistant against questions I already knew the answers to — and every one of them failed the same way: not by being wrong, but by being confidently incomplete in ways invisible from inside the output. Triage Copilot is a direct response to that finding. Because the model cannot see live infrastructure state, every design decision follows from one constraint: it advises, it never acts. It won't provide state-changing commands, won't invent a metric or system-table name it isn't sure exists, won't declare an incident over, and says \"that is not in the runbook I have\" rather than reaching for a plausible-sounding answer from general AWS knowledge. Most of its system prompt is dedicated to constraining the model, not empowering it.",
    objective:
      "To design and ship an assistant for a real failure mode I'd already identified in my own domain — a sleep-deprived on-call engineer who needs help sequencing an investigation, not a tool that acts on a half-formed theory — and to prove the design by breaking it on purpose before calling it done.",
    process: [
      "Ran three earlier AI Lab exercises (LLM comparison, custom GPT, research assistant) against questions I knew the answers to, and found a consistent failure pattern: fluent, plausible output with invisible gaps.",
      "Applied a design-thinking pass: defined the user as \"me, on call, at 3am,\" and rejected two tempting options — an auto-remediation bot and a log-ingesting bot — because both required trusting the model with live state it can't actually see.",
      "Chose a Socratic triage guide instead: it asks, it advises, it never acts. The limitation became the design.",
      "Wrote a diagnostic runbook (Lambda → Redshift failure modes) and a system prompt where every behavioral rule states its own reason, so the model can't reinterpret an unexplained instruction.",
      "Set the required conclusion format — HYPOTHESIS / CONFIDENCE / FALSIFY — so a confidence level is always visible and every hypothesis names the one check that would disprove it.",
      "Ran five adversarial test scenarios, including a direct request for a restart command and a question deliberately outside the runbook's scope, to see whether the constraints held under pressure.",
      "Found a real bug: Chatbase's own \"Initial Message\" setting silently overrode my no-greeting instruction. Fixed it in the platform config and re-tested — the prompt alone wasn't the whole system.",
    ],
    tools: [
      "Chatbase (LLM agent platform)",
      "Hand-written diagnostic runbook (Lambda ↔ Redshift failure modes) plus AWS documentation as grounding sources",
      "System-prompt design: behavioral constraints, refusal conditions, required output structure",
      "Design thinking (empathy → define → ideate → prototype → test)",
      "Adversarial testing against five scenarios, including a jailbreak attempt for a restart command",
    ],
    uniqueValue:
      "Most AI-lab bots are graded on what they can do. This one is graded on what it refuses to do under pressure — it turned down a direct request for a restart command, admitted a question was outside its runbook rather than guessing from general AWS knowledge, and pushed back when I asserted a wrong conclusion with confidence. Constraining a capable model is a harder design problem than making it more capable, and the five test scenarios exist to prove the constraints actually hold rather than just read well in the prompt.",
    relevance:
      "My day job is building the RAG ingestion infrastructure that grounds enterprise AI in real documents; this artifact is that same judgment applied to a much higher-stakes question — what happens when the model is confidently wrong and the user is too tired to catch it. For hiring managers it's evidence of responsible-AI design instincts, not just prompt-writing; for on-call engineers it's a tool built by someone who has actually been paged.",
    references: [
      {
        label: "Full AI Lab write-up (PDF) — all four activities, the bot's complete system prompt, and a test transcript",
        url: "/AI_Lab_Complete.pdf",
      },
      { label: "Chatbase documentation", url: "https://www.chatbase.co" },
      {
        label: 'Lewis et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"',
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        label: "AWS documentation (Amazon Redshift, AWS Lambda, Amazon CloudWatch)",
        url: "https://docs.aws.amazon.com",
      },
    ],
    embed: {
      src: "https://www.chatbase.co/chatbot-iframe/r8okjfK0T_xEGU7L7X4w9",
      title: "Triage Copilot — on-call AI assistant",
      minHeight: 700,
    },
  },
  {
    slug: "ml-vs-dl",
    title: "Machine Learning vs. Deep Learning — A Decision Framework",
    subtitle:
      "Two real-world case studies where the \"wrong\" approach was actually tried and lost — and the one question that decides between them",
    tags: ["Applied Research", "ML vs DL", "Case Studies", "Technical Writing"],
    introduction:
      "The usual answer to \"when should I use deep learning?\" is about data volume and compute cost — true, and almost never the real reason. This Workshop 2 report argues the distinction that actually decides the choice: whether the features that predict the outcome can be written down by a human in advance. It defends that principle with two production case studies where the losing approach wasn't dismissed on theory — it was genuinely attempted, and the evidence went the other way. Read the full report below.",
    description:
      "Case 1 — customer churn prediction (classical ML wins): on the canonical IBM/Kaggle Telco dataset (~7,000 subscribers), the features are already human-legible business facts — contract type, tenure, payment method — so there is no hierarchy left for a deep network to discover, and interpretability is a deployment requirement because retention teams must know why a customer is at risk. Frohböse (2020) benchmarked KNN, logistic regression, random forest, and SVM, then deliberately added a feed-forward neural network: it scored best (0.7996 accuracy, 0.5948 F1) but only marginally, at a heavy cost in interpretability and training complexity. Case 2 — diabetic retinopathy screening (deep learning wins): the predictive features (microaneurysms, haemorrhages, exudates) live in raw retinal pixels that no human can articulate as columns; hand-crafted classical approaches were attempted for roughly two decades before being conceded as theoretically incapable, and a CNN-based system, IDx-DR, became the first FDA-approved autonomous AI diagnostic in 2018. The report closes by generalizing the governing principle and its downstream consequences for data volume, interpretability, and cost.",
    objective:
      "To move past the folklore answer on ML vs. deep learning and build a defensible decision framework for the Workshop 2 assignment — one grounded in documented deployments and honest about counter-evidence, including the churn author's own caveat about larger datasets, rather than argued from first principles alone.",
    process: [
      "Framed the report around one governing question — can a domain expert enumerate the predictive features in advance? — and committed to testing it against real deployments, not toy examples.",
      "Selected two case studies with an unusual property: in each, the losing approach was actually attempted on the same problem, so the comparison is evidence rather than assertion.",
      "Analyzed the Telco churn literature — including Frohböse's 2020 benchmark where a neural network was explicitly added to a classical lineup and won only marginally — and connected the interpretability requirement to how retention teams actually consume model output.",
      "Analyzed the diabetic retinopathy case: two decades of hand-crafted feature engineering, the theoretical reason it could not succeed, and the CNN-based IDx-DR system that earned autonomous FDA clearance in 2018.",
      "Addressed the strongest counter-arguments honestly, including why more data does not rescue deep learning for churn (the interpretability requirement does not shrink as data grows).",
      "Wrote and typeset the report, then published it here with the full PDF for scrutiny.",
    ],
    tools: [
      "Literature analysis (published benchmarks, FDA announcements, deployment studies)",
      "IBM/Kaggle Telco churn dataset context (~7,000 subscribers)",
      "Classical ML methods analyzed: logistic regression, KNN, random forest, SVM",
      "Deep learning methods analyzed: feed-forward networks, CNNs (IDx-DR)",
      "Technical writing & argumentation",
    ],
    uniqueValue:
      "Most ML-vs-DL comparisons list pros and cons; this one advances a single falsifiable principle and stress-tests it against two deployments where the opposite approach was really tried. It also demonstrates intellectual honesty — the report includes the churn author's own caveat that cuts against its thesis, then answers it — which is the skill that separates engineering judgment from advocacy.",
    relevance:
      "Choosing the wrong model family is one of the most expensive mistakes an AI team can make, and I make this call in practice on ingestion and ML systems at Amazon. For hiring managers this artifact shows I can reason about when NOT to use deep learning — a rarer and more valuable signal than knowing how to use it; for students and practitioners it is a reusable decision framework with citations to follow.",
    references: [
      {
        label: "Full report (PDF) — Machine Learning vs. Deep Learning, Workshop 2",
        url: "/ML_vs_DL_Report.pdf",
      },
      {
        label: "Frohböse (2020), customer churn prediction benchmark on the IBM Telco dataset",
      },
      {
        label: "IBM Telco Customer Churn dataset (Kaggle)",
        url: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
      },
      {
        label: "FDA (2018), authorization of IDx-DR — first autonomous AI diagnostic for diabetic retinopathy",
        url: "https://www.fda.gov/news-events/press-announcements/fda-permits-marketing-artificial-intelligence-based-device-detect-certain-diabetes-related-eye",
      },
    ],
    externalUrl: "/ML_vs_DL_Report.pdf",
  },
  {
    slug: "preppilot",
    title: "PrepPilot — AI Mock Interview Tutor",
    subtitle:
      "A local-first AI interviewer that listens to how you speak, not just what you say — a full voice loop (STT → coaching LLM → prosody analytics → TTS) on an 8GB laptop GPU",
    tags: ["Full-Stack AI", "Speech & Audio ML", "Local-First LLM", "Real-Time Systems"],
    introduction:
      "PrepPilot runs a realistic spoken mock interview and coaches the candidate on both what they say and how they say it. Unlike a chatbot, it listens to delivery — pace, pauses, filler words, pitch variance, vocal energy — and returns structured 1–10 rubric feedback with concrete rewrites, entirely offline on a laptop GPU. The demo video below shows the full voice loop; the complete source and system design are on GitHub.",
    description:
      "A candidate picks a role, seniority, and optionally pastes a job description. An AI interviewer asks one question at a time over a WebSocket voice loop: Silero VAD detects the end of an answer, faster-whisper large-v3 transcribes it with word-level timestamps, a prosody/filler analytics layer computes interpretable delivery metrics (WPM, pause ratio, filler rate, documented confidence and expressiveness composites — deliberately not black-box emotion labels), and an LLM scores the answer on a five-part rubric (content, structure/STAR, specificity, technical accuracy, delivery), choosing between a targeted follow-up and the next question. A Kokoro TTS voice asks it aloud. Sessions persist to SQLite, feeding a printable report and a cross-session trends dashboard. The LLM is swappable — local Ollama (qwen3) by default, Claude or GPT with one config line — and every heavy dependency degrades gracefully: the full text-mode loop works with zero ML packages installed.",
    objective:
      "To demonstrate the ability to design and ship a complete, production-shaped AI system — not a notebook or a single prompt — that integrates real-time audio, multiple ML models, and an LLM under a hard resource budget (8GB VRAM), while making deliberate engineering trade-offs around reliability, privacy, and cost.",
    process: [
      "Designed the contract first: shared Pydantic schemas and a documented WebSocket protocol between the FastAPI backend and the TypeScript frontend, so every later feature had a stable spine.",
      "Built an async turn state machine (orchestrator) that is transport- and provider-agnostic — the live voice WebSocket path and the REST endpoints drive the same logic, and interviews survive a server restart mid-session.",
      "Assembled the audio pipeline: Silero VAD end-of-turn detection (with an energy fallback and a manual flush so a quiet mic never silently drops an answer) → faster-whisper transcription with word timestamps → parselmouth/librosa prosody analysis → Kokoro TTS reply.",
      "Made the LLM swappable behind a provider abstraction (Ollama, Anthropic, OpenAI, and a canned offline provider) with automatic fallback; all model output is parsed as strict JSON with a retry-on-validation-failure loop.",
      "Engineered the 8GB VRAM budget explicitly: two model-residency strategies (a 4B LLM co-resident with Whisper, or an 8B LLM loaded on demand between turns) documented and configurable.",
      "Enforced graceful degradation as a hard rule — every heavy dependency imports lazily, a health endpoint reports machine-readable degradation flags, and the UI surfaces them honestly instead of failing silently.",
      "Verified with 58 GPU-free unit tests plus end-to-end voice testing on the target hardware, then published the source, a system-design document, and the recorded demo.",
    ],
    tools: [
      "Python · FastAPI · WebSockets",
      "faster-whisper large-v3 (STT)",
      "Silero VAD",
      "Kokoro-82M TTS",
      "parselmouth + librosa (prosody analytics)",
      "Ollama (qwen3) · Claude · GPT (swappable providers)",
      "SQLite · SQLAlchemy 2.0",
      "Next.js 14 · TypeScript (static export)",
      "Docker · pytest · CUDA (RTX 3070, 8GB)",
    ],
    uniqueValue:
      "Most AI interview tools grade the transcript. PrepPilot treats delivery as a first-class signal using interpretable, documented metrics rather than black-box emotion labels — and it does this local-first, so the candidate's voice never leaves their machine. Fitting real-time STT, an 8B-parameter LLM, and TTS inside an 8GB VRAM budget, with graceful CPU-only degradation and reconnectable sessions, is the core engineering achievement: it is systems design, not prompt-writing.",
    relevance:
      "Interviewing under pressure is a near-universal professional bottleneck, and delivery is where strong candidates most often lose points — PrepPilot gives job seekers a private, unlimited, judgment-free way to rehearse. For hiring managers, it is end-to-end evidence of the skills an AI/ML engineer is actually hired for: real-time inference, model orchestration, resource budgeting, provider abstraction, and reliable UX under failure.",
    references: [
      {
        label: "Source code — github.com/SiddarthaDarisi/preppilot",
        url: "https://github.com/SiddarthaDarisi/preppilot",
      },
      {
        label: "System design document (architecture, data flow, design decisions)",
        url: "https://github.com/SiddarthaDarisi/preppilot/blob/main/docs/ARCHITECTURE.md",
      },
      {
        label: "faster-whisper (CTranslate2 Whisper inference)",
        url: "https://github.com/SYSTRAN/faster-whisper",
      },
      {
        label: "Silero VAD",
        url: "https://github.com/snakers4/silero-vad",
      },
      {
        label: "Kokoro-82M text-to-speech",
        url: "https://huggingface.co/hexgrad/Kokoro-82M",
      },
      {
        label: "Praat/parselmouth & librosa (prosody analysis)",
        url: "https://parselmouth.readthedocs.io",
      },
    ],
    embed: {
      src: "https://www.youtube.com/embed/2rCSeOZxo-A",
      title: "PrepPilot — full voice-loop demo",
      minHeight: 480,
    },
    externalUrl: "https://github.com/SiddarthaDarisi/preppilot",
  },
];

export function getArtifact(slug: string): Artifact | undefined {
  return artifacts.find((artifact) => artifact.slug === slug);
}
