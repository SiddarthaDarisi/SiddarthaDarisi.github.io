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
      "An AI agent built in the AI Lab that walks an engineer through a production alert at 3am — grounded in curated on-call documentation, running live below",
    tags: ["AI Agent", "Generative AI", "AWS Operations", "Knowledge Grounding"],
    introduction:
      "Triage Copilot is a working AI agent for on-call engineers, built during the AI Lab activity. Describe a production alert — \"Redshift disk at 92%\", \"Lambda throwing 429s\", a CloudWatch alarm storm — and it answers from curated on-call documentation: what is likely happening, what to check first, and how to mitigate, the exact workflow of a 3am page. It is embedded live below: try it.",
    description:
      "The agent is a single-purpose assistant grounded in a custom knowledge base of on-call documentation for the AWS services I operate — Amazon Redshift, AWS Lambda, and CloudWatch — covering symptoms, first checks, diagnosis paths, mitigations, and escalation criteria. Built on Chatbase's LLM agent platform, it combines that document grounding with behavioral instructions that keep it in role: direct, structured answers for an engineer under incident pressure, and honesty when a question falls outside its runbook coverage. It is deliberately not a general chatbot — a one-purpose agent grounded in domain documents is what makes it dependable enough to be useful during a real page.",
    objective:
      "To take the AI Lab from experiment to product: apply hands-on lessons about LLM behavior, knowledge grounding, and instruction design to ship an agent that solves a real problem from my own job — guiding on-call triage — rather than a demo chatbot, and to publish it where the audience can test it directly.",
    process: [
      "Chose a real problem from my own domain: on-call triage for the AWS services I operate (Redshift, Lambda, CloudWatch).",
      "Curated and structured the on-call documentation that became the agent's knowledge base — symptoms, immediate checks with commands, diagnosis steps, mitigations, and escalation criteria.",
      "Configured the agent on Chatbase and uploaded the documentation as grounding sources.",
      "Wrote behavioral instructions defining the persona (calm, direct, incident-focused), the answer structure, and guardrails to stay within the runbook scope.",
      "Tested with realistic alert phrasings and error strings an engineer would paste at 3am, then refined the docs and instructions where answers were weak.",
      "Embedded the live agent on this page so recruiters and engineers can interrogate it directly.",
    ],
    tools: [
      "Chatbase (LLM agent platform)",
      "Large language model with document grounding (RAG)",
      "Knowledge-base curation (AWS on-call runbook content)",
      "Prompt engineering & behavioral instructions",
      "AWS domain expertise (Redshift, Lambda, CloudWatch)",
      "HTML iframe embed",
    ],
    uniqueValue:
      "Most AI-lab artifacts are throwaway chats with a model; this is a scoped, grounded agent that solves a problem from my actual job. It demonstrates the judgment that makes GenAI useful in production: constraining an LLM to curated domain documents, designing its behavior for a high-stakes user (an engineer mid-incident), and knowing that a dependable one-purpose agent beats an unreliable general one.",
    relevance:
      "My work at Amazon is building RAG ingestion infrastructure — the machinery that grounds enterprise AI in documents. Triage Copilot is that same discipline exercised end-to-end at product scale: for hiring managers it proves applied GenAI skills plus operational AWS depth; for on-call engineers it is a genuinely reusable triage aid.",
    references: [
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
];

export function getArtifact(slug: string): Artifact | undefined {
  return artifacts.find((artifact) => artifact.slug === slug);
}
