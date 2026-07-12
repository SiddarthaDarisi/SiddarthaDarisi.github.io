import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const artifacts = [
  {
    title: "The Climate of Machine Intelligence",
    description:
      "Interactive AI/ML history timeline (1943–2025) charting booms, winters, and thaws with 40 milestones and a training-compute visualization.",
    href: "/artifacts/ai-ml-timeline",
    tags: ["Research", "Data Visualization", "TypeScript"],
  },
  {
    title: "Ask Siddartha — Custom AI Chatbot",
    description:
      "A custom-trained AI assistant built in the AI Lab, embedded live on this site.",
    href: "/artifacts/ai-lab-chatbot",
    tags: ["Generative AI", "Chatbase", "Prompt Design"],
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/hero-banner.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--hero-overlay)" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            AI/ML · Cloud · MLOps
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-medium text-foreground/90">
            {site.title}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {site.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/artifacts"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
            >
              Explore Artifacts
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-5 text-sm">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL BIO */}
      <section id="bio" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/icon-profile.svg"
            alt=""
            width={40}
            height={40}
          />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Professional Bio
          </h2>
        </div>

        <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a Software Development Engineer at Amazon in Seattle,
            where I work on the AWS Quick RAG team building high-throughput
            ingestion pipelines for Amazon Quick Suite, Q Business, and
            Kendra — processing 10,000+ documents a day and powering RAG and
            LLM experiences over enterprise data.
          </p>
          <p>
            Before Amazon, I was a Cloud Engineer at People Tech Group, where
            I built GenAI-driven MLOps that convert natural-language prompts
            into validated Infrastructure-as-Code, cutting release cycles by
            35%, and an AI/ML document pipeline for HCA Healthcare that
            reduced manual data entry by over 80%.
          </p>
          <p>
            I hold an MS in Cyber Security &amp; Privacy from New Jersey
            Institute of Technology and a BS in Computer Science &amp;
            Engineering from Koneru Lakshmaiah Education Foundation, and I&apos;m
            AWS Certified Solutions Architect – Associate and AWS Certified
            Developer – Associate. I mentor engineers on GenAI and DevOps
            best practices and am currently pursuing graduate AI/ML studies
            at Indiana Wesleyan University. My aspiration is building
            reliable, responsible AI systems at enterprise scale.
          </p>
        </div>
      </section>

      {/* PERSONAL VALUE PROPOSITION */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-xl border border-line border-l-4 border-l-accent bg-surface px-8 py-10 shadow-sm md:px-12 md:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Personal Value Proposition
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {site.valueProposition}
          </p>
        </div>
      </section>

      {/* FEATURED ARTIFACTS */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-center gap-3">
          <Image src="/brand/icon-folder.svg" alt="" width={40} height={40} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Portfolio Artifacts
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <Link
              key={artifact.href}
              href={artifact.href}
              className="group flex flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {artifact.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                {artifact.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {artifact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-raised px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-6 text-sm font-semibold text-accent">
                View artifact →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s build something intelligent
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Open to conversations with recruiters, collaborators, and fellow
            builders about AI/ML, cloud infrastructure, and MLOps.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
            >
              Get in Touch
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            Or ask my AI assistant — the chat bubble in the corner.
          </p>
        </div>
      </section>
    </>
  );
}
