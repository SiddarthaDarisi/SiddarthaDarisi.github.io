import Link from "next/link";

export const metadata = {
  title: "Experience",
};

type Role = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
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
  },
];

const education = [
  {
    school: "New Jersey Institute of Technology",
    program: "MS, Cyber Security & Privacy",
  },
  {
    school: "Koneru Lakshmaiah Education Foundation",
    program: "B.Tech, Computer Science & Engineering",
  },
  {
    school: "Indiana Wesleyan University",
    program: "Graduate studies, AI & Machine Learning (in progress)",
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
];

function renderBullet(bullet: string, key: number) {
  const parts = bullet.split(/(\*\*[^*]+\*\*)/g);
  return (
    <li key={key} className="flex gap-3 text-base leading-relaxed text-muted">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <span key={i} className="font-semibold text-accent-strong">
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
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Experience
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Software Development Engineer specializing in cloud architecture
          and AI/ML ingestion platforms for enterprise-scale systems.
        </p>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon-briefcase.svg" alt="" width={40} height={40} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Work Experience
          </h2>
        </div>

        <div className="mt-10 space-y-10 border-l border-line pl-8 md:pl-10">
          {roles.map((role) => (
            <div key={role.company} className="relative">
              <span className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-accent md:-left-[calc(2.5rem+5px)]" />
              <div className="rounded-xl border border-line bg-surface p-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {role.title}
                    </h3>
                    <p className="mt-0.5 text-base font-medium text-accent">
                      {role.company} &middot; {role.location}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted">
                    {role.dates}
                  </p>
                </div>
                <ul className="mt-5 space-y-3">
                  {role.bullets.map((bullet, i) => renderBullet(bullet, i))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon-gradcap.svg" alt="" width={40} height={40} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Education
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {education.map((item) => (
            <div
              key={item.school}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.school}
              </h3>
              <p className="mt-2 text-base text-muted">{item.program}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon-gear.svg" alt="" width={40} height={40} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Skills
          </h2>
        </div>

        <div className="mt-8 space-y-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-line bg-raised px-3.5 py-1.5 text-sm font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Certifications
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                </svg>
              </span>
              <p className="text-base font-semibold text-foreground">
                {cert}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT HIGHLIGHT */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Project Highlight
        </h2>
        <div className="mt-8 rounded-xl border border-line border-l-4 border-l-accent bg-surface p-7 md:p-8">
          <h3 className="text-xl font-semibold text-foreground">
            Drowsiness Detection AI
          </h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            Real-time CNN pipeline (PyTorch) with automated model-reliability
            monitoring — achieving{" "}
            <span className="font-semibold text-accent-strong">95%</span>{" "}
            accuracy in production with edge-case drift detection.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center md:flex-row md:justify-between md:text-left">
          <Link
            href="/artifacts"
            className="text-base font-semibold text-accent hover:text-accent-strong"
          >
            View my portfolio artifacts →
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
          >
            Contact me
          </Link>
        </div>
      </section>
    </>
  );
}
