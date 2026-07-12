import Link from "next/link";
import {
  IconBriefcase,
  IconGradCap,
  IconGear,
  IconSparkle,
  IconArrowRight,
  IconCheck,
} from "@/components/Icons";

export const metadata = {
  title: "Experience",
};

type Role = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  chips: string[];
};

const roles: Role[] = [
  {
    company: "Amazon",
    title: "Software Development Engineer",
    location: "Seattle, WA",
    dates: "October 2024 – Present",
    bullets: [
      "Spearheaded high-throughput ingestion services for Amazon Q Business, Kendra, and Quick Suite, processing **10k+** documents/day and enabling RAG + LLM integration across enterprise data.",
      "Architected large-scale index re-ingestion workflows for AI-powered document systems, eliminating manual operations and enabling zero-downtime updates as ML models evolved.",
      "Collaborated with cross-functional product and science teams to standardize ingestion for 10+ enterprise formats, improving cross-service compatibility and onboarding.",
      "Streamlined index ingestion by integrating validation and safe rollout mechanisms into CI/CD workflows for ML teams — **60%** faster deployments.",
    ],
    chips: ["RAG", "AWS", "CI/CD", "LLM Integration"],
  },
  {
    company: "People Tech Group",
    title: "Cloud Engineer",
    location: "Seattle, WA",
    dates: "April 2024 – October 2024",
    bullets: [
      "Led customer demos to develop a GenAI-driven MLOps solution converting natural-language prompts into validated IaC deployments, reducing release timelines by **35%**.",
      "Built an AWS-based consent-forms processing pipeline for HCA Healthcare using AI/ML to extract data from handwritten forms — **80%+** less manual data entry, turnaround from days to minutes.",
      "Implemented automated scaling policies from cloud-usage analysis, cutting infrastructure costs **15%**.",
      "Designed traffic-splitting algorithms that cut microservice latency by **40ms** for real-time AI inference.",
    ],
    chips: ["GenAI", "IaC", "MLOps", "AWS"],
  },
];

const education = [
  {
    school: "New Jersey Institute of Technology",
    program: "MS, Cyber Security & Privacy",
    inProgress: false,
  },
  {
    school: "Koneru Lakshmaiah Education Foundation",
    program: "B.Tech, Computer Science & Engineering",
    inProgress: false,
  },
  {
    school: "Indiana Wesleyan University",
    program: "Graduate studies, AI & Machine Learning (in progress)",
    inProgress: true,
  },
];

const skillGroups = [
  {
    label: "Languages & Frameworks",
    skills: [
      "Java (Spring Boot)",
      "Python",
      "JavaScript/TypeScript (React, Node.js)",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    label: "Cloud & MLOps",
    skills: [
      "AWS",
      "MLOps Pipelines",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Amazon Bedrock",
    ],
  },
  {
    label: "Core Competencies",
    skills: [
      "Performance Optimization",
      "Model Deployment & Monitoring",
      "RAG Systems",
      "Responsible AI",
      "Distributed Systems",
    ],
  },
];

const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Developer – Associate",
  "CompTIA Security+",
  "Certified Ethical Hacker (CEH) v12 — EC-Council",
];

function renderBullet(bullet: string, key: number) {
  const parts = bullet.split(/(\*\*[^*]+\*\*)/g);
  return (
    <li key={key} className="flex gap-3 text-base leading-relaxed text-muted">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <span key={i} className="font-semibold text-gold">
              {part.slice(2, -2)}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    </li>
  );
}

export default function ExperiencePage() {
  return (
    <>
      {/* HEADER */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" data-reveal>
        <p className="eyebrow">// Experience</p>
        <h1 className="font-display mt-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Career <span className="text-gradient">Experience</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Software Development Engineer specializing in cloud architecture
          and AI/ML ingestion platforms for enterprise-scale systems.
        </p>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex items-center gap-4" data-reveal>
          <span className="icon-badge">
            <IconBriefcase />
          </span>
          <div>
            <p className="eyebrow">// 01 &middot; Work Experience</p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-foreground">
              Work Experience
            </h2>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 hidden w-px md:block"
            style={{
              background: "linear-gradient(180deg, var(--teal), var(--violet))",
            }}
          />
          <div className="dim-list space-y-4 md:pl-8">
            {roles.map((role) => (
              <div
                key={role.company}
                data-reveal
                className="card grid gap-4 p-6 md:grid-cols-[140px_1fr] md:gap-6 md:p-7"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-muted">
                  {role.dates}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">
                    {role.company} &middot; {role.location}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {role.bullets.map((bullet, i) => renderBullet(bullet, i))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.chips.map((chip) => (
                      <span key={chip} className="chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex items-center gap-4" data-reveal>
          <span className="icon-badge">
            <IconGradCap />
          </span>
          <div>
            <p className="eyebrow">// 02 &middot; Education</p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-foreground">
              Education
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {education.map((item) => (
            <div key={item.school} data-reveal className="card card-lift p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.school}
              </h3>
              <p className="mt-2 text-base text-muted">{item.program}</p>
              {item.inProgress && (
                <span className="chip mt-4 inline-flex">In Progress</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex items-center gap-4" data-reveal>
          <span className="icon-badge">
            <IconGear />
          </span>
          <div>
            <p className="eyebrow">// 03 &middot; Skills</p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-foreground">
              Skills
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-8" data-reveal>
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div data-reveal>
          <p className="eyebrow">// 04 &middot; Certifications</p>
          <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-foreground">
            Certifications
          </h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert}
              data-reveal
              className="card card-lift flex items-center gap-4 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-gold">
                <IconCheck size={18} />
              </span>
              <p className="font-display text-base font-semibold text-foreground">
                {cert}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT HIGHLIGHT */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="card relative overflow-hidden p-8" data-reveal>
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, var(--teal), transparent)",
            }}
          />
          <p className="eyebrow relative flex items-center gap-2">
            <IconSparkle size={16} />
            // Project Highlight
          </p>
          <h3 className="font-display relative mt-3 text-xl font-semibold text-foreground">
            Drowsiness Detection AI
          </h3>
          <p className="relative mt-3 max-w-3xl text-base leading-relaxed text-muted">
            Real-time CNN pipeline (PyTorch) with automated model-reliability
            monitoring — achieving{" "}
            <span className="font-semibold text-gold">95%</span> accuracy in
            production with edge-case drift detection.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center md:flex-row md:justify-between md:text-left">
          <Link href="/artifacts" className="btn-ghost">
            View my portfolio artifacts
            <IconArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-primary">
            Contact me
          </Link>
        </div>
      </section>
    </>
  );
}
