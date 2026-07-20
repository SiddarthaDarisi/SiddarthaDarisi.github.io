import Link from "next/link";
import { site } from "@/lib/site";
import NeuralHero from "@/components/NeuralHero";
import Counter from "@/components/Counter";
import SectionSpy from "@/components/SectionSpy";
import ArtifactThumb from "@/components/ArtifactThumb";
import {
  IconGitHub,
  IconLinkedIn,
  IconEnvelope,
  IconSparkle,
  IconArrowRight,
} from "@/components/Icons";

const roles = [
  "RAG infrastructure",
  "MLOps automation",
  "cloud architecture",
  "RAG infrastructure",
];

const sections = [
  { id: "about", label: "About" },
  { id: "value", label: "Value" },
  { id: "experience", label: "Experience" },
  { id: "artifacts", label: "Artifacts" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { value: 10, suffix: "k+", label: "docs/day processed by pipelines I build at Amazon" },
  { value: 4, suffix: "", label: "certifications — AWS ×2, Security+, CEH v12" },
  { value: 2, suffix: "", label: "graduate programs — MS Cyber Security + AI/ML (in progress)" },
  { value: 6, suffix: "", label: "engineers mentored in GenAI & DevOps" },
];

const techs = [
  "AWS", "Amazon Bedrock", "Python", "Java · Spring Boot", "TypeScript",
  "PyTorch", "TensorFlow", "Kubernetes", "Docker", "Terraform",
  "React", "Node.js", "CI/CD", "RAG Systems", "MLOps",
];

const experiencePreview = [
  {
    range: "2024 — Present",
    role: "Software Development Engineer",
    company: "Amazon · Seattle",
    summary:
      "AWS Quick RAG team — high-throughput ingestion for Quick Suite, Q Business, and Kendra: 10k+ docs/day, zero-downtime re-ingestion, 60% faster ML deployments.",
    tags: ["RAG", "AWS", "LLM Integration", "CI/CD"],
  },
  {
    range: "Apr — Oct 2024",
    role: "Cloud Engineer",
    company: "People Tech Group · Seattle",
    summary:
      "GenAI-driven MLOps turning natural-language prompts into validated IaC (35% faster releases); AI document pipeline for HCA Healthcare cutting manual entry 80%+.",
    tags: ["GenAI", "IaC", "MLOps", "Healthcare AI"],
  },
];

const artifacts = [
  {
    number: "01",
    kind: "timeline" as const,
    title: "The Climate of Machine Intelligence",
    description:
      "Interactive AI/ML history timeline (1943–2025) charting booms, winters, and thaws — 40 milestones, era barometer, and a log-scale training-compute visualization.",
    href: "/artifacts/ai-ml-timeline",
    tags: ["Research", "Data Viz", "TypeScript"],
  },
  {
    number: "02",
    kind: "chatbot" as const,
    title: "Triage Copilot — On-Call AI Assistant",
    description:
      "An AI agent that advises but never executes — it questions its way to a hypothesis for a failed AWS pipeline and refuses to guess. Built for a 3am page. Live demo on its page.",
    href: "/artifacts/triage-copilot",
    tags: ["AI Agent", "Responsible AI", "AWS Ops"],
  },
  {
    number: "03",
    kind: "report" as const,
    title: "Machine Learning vs. Deep Learning — A Decision Framework",
    description:
      "One question decides between them: can a human write the predictive features down in advance? Two case studies — telecom churn and diabetic retinopathy — where the losing approach was actually tried.",
    href: "/artifacts/ml-vs-dl",
    tags: ["Applied Research", "ML vs DL", "Case Studies"],
  },
  {
    number: "04",
    kind: "voice" as const,
    title: "PrepPilot — AI Mock Interview Tutor",
    description:
      "A local-first AI interviewer that listens to how you speak, not just what you say — a full voice loop (VAD → Whisper STT → prosody analytics → LLM coaching → TTS) running on an 8GB laptop GPU. Demo video on its page.",
    href: "/artifacts/preppilot",
    tags: ["Full-Stack AI", "Speech ML", "Real-Time Systems"],
  },
];

export default function Home() {
  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        {/* ============ LEFT · STICKY IDENTITY ============ */}
        <header className="relative pt-16 lg:sticky lg:top-14 lg:flex lg:h-[calc(100vh-3.5rem)] lg:flex-col lg:pt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-8 -z-10 hidden h-[420px] w-[420px] opacity-[0.16] lg:block"
          >
            <NeuralHero />
          </div>

          <p className="eyebrow animate-rise">
            // Software Development Engineer · Amazon
          </p>

          <h1 className="animate-rise delay-1 font-display mt-5 text-6xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Siddartha
            <br />
            <span className="text-gradient">Darisi</span>
          </h1>

          <div className="animate-rise delay-2 mt-6 text-lg leading-relaxed text-muted md:text-xl">
            I build{" "}
            <span className="inline-block h-[1.35em] overflow-hidden align-bottom">
              <span className="word-cycle block font-semibold text-accent">
                {roles.map((r, i) => (
                  <span key={`${r}-${i}`} className="block h-[1.35em]">
                    {r}
                  </span>
                ))}
              </span>
            </span>
            <br />
            that makes AI reliable at enterprise scale.
          </div>

          <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-4">
            <Link href="/artifacts" className="btn-primary">
              Explore Artifacts →
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in Touch
            </Link>
          </div>

          <div className="animate-rise delay-4 mt-12 hidden lg:block">
            <SectionSpy sections={sections} />
          </div>

          <div className="animate-rise delay-4 mt-10 flex items-center gap-3 lg:mt-auto lg:pb-16">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <IconGitHub size={17} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <IconLinkedIn size={17} />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <IconEnvelope size={17} />
            </a>
            <span className="ml-2 font-mono text-xs tracking-wider text-muted">
              Seattle, WA
            </span>
          </div>
        </header>

        {/* ============ RIGHT · SCROLLING CONTENT ============ */}
        <div className="pb-10 pt-4 lg:pt-24">
          {/* ---- About ---- */}
          <section id="about" className="scroll-mt-28">
            <p data-reveal className="eyebrow lg:sr-only">
              // About
            </p>
            <div data-reveal className="mt-4 space-y-5 leading-relaxed text-muted lg:mt-0">
              <p>
                I&apos;m a Software Development Engineer at{" "}
                <span className="font-medium text-foreground">Amazon</span> in
                Seattle, on the AWS Quick RAG team — building high-throughput
                ingestion pipelines for{" "}
                <span className="font-medium text-foreground">
                  Amazon Quick Suite, Q Business, and Kendra
                </span>{" "}
                that process 10,000+ documents a day and power RAG and LLM
                experiences over enterprise data.
              </p>
              <p>
                Before Amazon, at People Tech Group I built GenAI-driven MLOps that
                turn natural-language prompts into validated Infrastructure-as-Code,
                and an AI/ML document pipeline for HCA Healthcare. I hold an MS in
                Cyber Security &amp; Privacy (NJIT) and four certifications — two
                AWS Associate, CompTIA Security+, and CEH v12 — and I&apos;m
                currently deepening my AI/ML expertise through graduate study at
                Indiana Wesleyan University.
              </p>
              <p>
                I mentor engineers on GenAI and DevOps practices. My north star:{" "}
                <span className="font-medium text-foreground">
                  reliable, responsible AI at enterprise scale
                </span>
                .
              </p>
            </div>

            {/* Stats */}
            <dl
              data-reveal
              className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-surface px-4 py-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-1 text-[0.7rem] leading-snug text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ---- Value Proposition ---- */}
          <section id="value" className="mt-20 scroll-mt-28">
            <div
              data-reveal
              className="card relative overflow-hidden p-8 md:p-10"
            >
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25"
                style={{
                  background: "radial-gradient(circle, var(--teal), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, var(--violet), transparent 70%)",
                }}
              />
              <p className="eyebrow flex items-center gap-2">
                <IconSparkle size={14} /> Personal Value Proposition
              </p>
              <p className="font-display relative mt-5 text-xl font-medium leading-snug tracking-tight md:text-2xl">
                {site.valueProposition}
              </p>
            </div>
          </section>

          {/* ---- Experience preview ---- */}
          <section id="experience" className="mt-20 scroll-mt-28">
            <p data-reveal className="eyebrow">
              // Experience
            </p>
            <div className="dim-list mt-6 space-y-4">
              {experiencePreview.map((e) => (
                <div
                  key={e.company}
                  data-reveal
                  className="card grid gap-2 p-6 md:grid-cols-[130px_1fr] md:gap-5"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-muted md:pt-1">
                    {e.range}
                  </p>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {e.role}
                    </h3>
                    <p className="text-sm text-accent">{e.company}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {e.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              data-reveal
              href="/experience"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
            >
              Full résumé &amp; skills <IconArrowRight size={15} />
            </Link>
          </section>

          {/* ---- Artifacts ---- */}
          <section id="artifacts" className="mt-20 scroll-mt-28">
            <div data-reveal className="flex items-end justify-between">
              <p className="eyebrow">// Portfolio Artifacts</p>
              <Link
                href="/artifacts"
                className="text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
              >
                View all →
              </Link>
            </div>
            <div className="dim-list mt-6 space-y-5">
              {artifacts.map((artifact) => (
                <Link
                  key={artifact.href}
                  href={artifact.href}
                  data-reveal
                  className="card card-lift group grid gap-5 p-6 sm:grid-cols-[150px_1fr]"
                >
                  <div className="h-[92px] overflow-hidden rounded-xl border border-line bg-raised p-2">
                    <ArtifactThumb kind={artifact.kind} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-accent">
                      {artifact.number}
                    </span>
                    <h3 className="font-display mt-1 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {artifact.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {artifact.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {artifact.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ---- Contact CTA ---- */}
          <section id="contact" className="mt-20 scroll-mt-28">
            <div data-reveal className="card relative overflow-hidden p-8 text-center md:p-12">
              <div className="hairline-gradient absolute inset-x-0 top-0" />
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Let&apos;s build something{" "}
                <span className="text-gradient">intelligent</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted">
                Open to conversations with recruiters, collaborators, and fellow
                builders about AI/ML, cloud infrastructure, and MLOps.
              </p>
              <div className="mt-7 flex justify-center">
                <Link href="/contact" className="btn-primary">
                  Get in Touch →
                </Link>
              </div>
              <p className="mt-5 font-mono text-xs tracking-wider text-muted">
                or ask my AI assistant — the chat bubble in the corner
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ============ TECH MARQUEE ============ */}
      <section
        aria-label="Technologies"
        className="marquee mt-6 overflow-hidden border-y border-line bg-surface/50 py-4"
      >
        <div className="marquee-track flex w-max gap-3">
          {[...techs, ...techs].map((t, i) => (
            <span key={`${t}-${i}`} className="chip whitespace-nowrap !text-[0.72rem]">
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
