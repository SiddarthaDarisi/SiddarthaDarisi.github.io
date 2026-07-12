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
  embed: ArtifactEmbed;
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
    slug: "ai-lab-chatbot",
    title: "Ask Siddartha — Custom AI Chatbot",
    subtitle:
      "A custom-trained AI assistant built in the AI Lab and deployed live across this portfolio",
    tags: ["Generative AI", "Chatbase", "Prompt Design", "LLM"],
    introduction:
      "A working generative-AI chatbot built during the AI Lab activity: a custom assistant trained on Siddartha's professional background that visitors can converse with, embedded below and available site-wide as the floating chat bubble in the corner of every page.",
    description:
      "The assistant is built on Chatbase, an LLM chatbot platform. It was configured with a custom knowledge base covering Siddartha's experience, skills, projects, and this portfolio, plus behavioral instructions that keep answers professional, grounded, and on-topic. Rather than describing the AI Lab experience, this artifact IS the product of it — a live system the audience can interrogate directly.",
    objective:
      "To take the AI Lab from experiment to product: apply hands-on lessons about LLM behavior, knowledge grounding, and prompt design to ship a chatbot that both demonstrates generative-AI skills and serves a real function — answering recruiters' and collaborators' questions about Siddartha on demand, 24/7.",
    process: [
      "Explored LLM capabilities and limitations in the AI Lab.",
      "Selected Chatbase as the platform.",
      "Curated and structured the knowledge base (professional background, projects, resume content).",
      "Wrote system instructions and tuned tone/guardrails.",
      "Tested with adversarial and edge-case questions and refined responses.",
      "Embedded via iframe on this page and as a site-wide widget script.",
    ],
    tools: [
      "Chatbase (LLM chatbot platform)",
      "GPT-family large language model",
      "Prompt engineering & system instructions",
      "Custom knowledge-base curation",
      "HTML iframe / JavaScript embed",
    ],
    uniqueValue:
      "Most portfolio descriptions of AI coursework are static write-ups; this one is a functioning AI product the audience can test in real time. It demonstrates practical GenAI skills — grounding, instruction design, evaluation — and the product sense to deploy them somewhere genuinely useful.",
    relevance:
      "For recruiters and hiring managers it offers an interactive way to learn about Siddartha's background while simultaneously proving hands-on generative-AI capability, which is exactly the skill set his target roles demand.",
    references: [
      { label: "Chatbase documentation", url: "https://www.chatbase.co" },
      { label: "OpenAI model documentation" },
    ],
    embed: {
      src: "https://www.chatbase.co/chatbot-iframe/r8okjfK0T_xEGU7L7X4w9",
      title: "Ask Siddartha — custom AI chatbot",
      minHeight: 700,
    },
  },
];

export function getArtifact(slug: string): Artifact | undefined {
  return artifacts.find((artifact) => artifact.slug === slug);
}
