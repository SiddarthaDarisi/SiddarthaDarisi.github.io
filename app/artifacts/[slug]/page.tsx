import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artifacts, getArtifact } from "@/lib/artifacts";
import { IconExternal } from "@/components/Icons";

export function generateStaticParams() {
  return artifacts.map((artifact) => ({ slug: artifact.slug }));
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
  number,
  heading,
  children,
}: {
  number: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal className="mt-14">
      <p className="eyebrow">
        // {number} · {heading}
      </p>
      <h2 className="font-display mt-3 text-2xl font-bold tracking-tight md:text-3xl">
        {heading}
      </h2>
      <div className="mt-4 max-w-3xl leading-relaxed text-muted">
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

  const titleWords = artifact.title.split(" ");
  const lastWord = titleWords.pop();

  return (
    <article className="mx-auto max-w-4xl px-5 py-16">
      <Link
        href="/artifacts"
        className="font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        ← All artifacts
      </Link>

      <header data-reveal className="mt-6">
        <p className="eyebrow">// Artifact · {artifact.tags[0]}</p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          {titleWords.length > 0 ? `${titleWords.join(" ")} ` : ""}
          <span className="text-gradient">{lastWord}</span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          {artifact.subtitle}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {artifact.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* LIVE EMBED */}
      {(artifact.embed || artifact.externalUrl) && (
        <section data-reveal className="mt-10">
          {artifact.externalUrl && (
            <div className="mb-4 flex justify-end">
              <a
                href={artifact.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open full experience
                <IconExternal size={16} />
              </a>
            </div>
          )}
          {artifact.embed && (
            <iframe
              src={artifact.embed.src}
              title={artifact.embed.title}
              style={{ minHeight: artifact.embed.minHeight }}
              className="w-full rounded-2xl border border-line bg-surface shadow-[var(--glow)]"
              allow="microphone"
              loading="lazy"
            />
          )}
        </section>
      )}

      <Section number="01" heading="Introduction">
        <p>{artifact.introduction}</p>
      </Section>

      <Section number="02" heading="Description">
        <p>{artifact.description}</p>
      </Section>

      <Section number="03" heading="Objective">
        <p>{artifact.objective}</p>
      </Section>

      <Section number="04" heading="Process">
        <div>
          {artifact.process.map((step, index) => (
            <div
              key={step}
              className="flex gap-4 border-b border-line py-4 last:border-0"
            >
              <span className="w-8 shrink-0 font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-muted">{step}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section number="05" heading="Tools & Technologies">
        <div className="flex flex-wrap gap-2">
          {artifact.tools.map((tool) => (
            <span key={tool} className="chip">
              {tool}
            </span>
          ))}
        </div>
      </Section>

      <hr className="hairline-gradient mt-14" />

      {/* VALUE PROPOSITION */}
      <section data-reveal className="mt-14">
        <p className="eyebrow">// 06 · Value Proposition</p>
        <h2 className="font-display mt-3 text-2xl font-bold tracking-tight md:text-3xl">
          Value Proposition
        </h2>
        <div className="card relative mt-6 overflow-hidden p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, var(--teal), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, var(--violet), transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Unique Value
            </p>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              {artifact.uniqueValue}
            </p>
          </div>
          <div className="relative mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Relevance to My Audience
            </p>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              {artifact.relevance}
            </p>
          </div>
        </div>
      </section>

      <Section number="07" heading="References">
        <ul className="space-y-3">
          {artifact.references.map((reference) => (
            <li key={reference.label} className="flex items-start gap-3">
              <span className="mt-2 h-[3px] w-[3px] shrink-0 rounded-full bg-accent" />
              {reference.url ? (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
                >
                  {reference.label}
                  <IconExternal size={13} />
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
