import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtifact } from "@/lib/artifacts";

export function generateStaticParams() {
  return [{ slug: "ai-ml-timeline" }, { slug: "ai-lab-chatbot" }];
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artifact = getArtifact(slug);

  if (!artifact) {
    return { title: "Artifact" };
  }

  return { title: artifact.title };
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default async function ArtifactDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const artifact = getArtifact(slug);

  if (!artifact) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-5 py-16">
      <Link
        href="/artifacts"
        className="text-sm font-medium text-muted hover:text-accent"
      >
        ← All artifacts
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {artifact.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
          {artifact.subtitle}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {artifact.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-raised px-2.5 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* LIVE EMBED */}
      <section className="mt-10">
        {artifact.externalUrl && (
          <a
            href={artifact.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
          >
            Open full experience ↗
          </a>
        )}
        <iframe
          src={artifact.embed.src}
          title={artifact.embed.title}
          style={{ minHeight: artifact.embed.minHeight }}
          className="w-full rounded-xl border border-line bg-surface"
          allow="microphone"
          loading="lazy"
        />
      </section>

      <Section heading="Introduction">
        <p>{artifact.introduction}</p>
      </Section>

      <Section heading="Description">
        <p>{artifact.description}</p>
      </Section>

      <Section heading="Objective">
        <p>{artifact.objective}</p>
      </Section>

      <Section heading="Process">
        <ol className="space-y-3">
          {artifact.process.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-raised text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="Tools & Technologies">
        <div className="flex flex-wrap gap-2">
          {artifact.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </Section>

      {/* VALUE PROPOSITION */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Value Proposition
        </h2>
        <div className="mt-4 rounded-xl border border-line border-l-4 border-l-accent bg-surface p-7">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-strong">
              Unique Value
            </h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted">
              {artifact.uniqueValue}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-strong">
              Relevance to My Audience
            </h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted">
              {artifact.relevance}
            </p>
          </div>
        </div>
      </section>

      <Section heading="References">
        <ul className="space-y-2">
          {artifact.references.map((reference) => (
            <li key={reference.label}>
              {reference.url ? (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-strong"
                >
                  {reference.label} ↗
                </a>
              ) : (
                <span>{reference.label}</span>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}
