import Link from "next/link";
import type { Metadata } from "next";
import { artifacts } from "@/lib/artifacts";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Artifacts",
};

export default function ArtifactsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div data-reveal>
        <p className="eyebrow">// Portfolio Artifacts</p>
        <h1 className="font-display mt-4 text-5xl font-bold tracking-tight md:text-6xl">
          Portfolio <span className="text-gradient">Artifacts</span>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          Each artifact below includes its objective, process, tools, and
          value proposition, built as part of the IWU AI/ML program and
          beyond.
        </p>
      </div>

      <div className="dim-list mt-10 grid gap-6 md:grid-cols-2">
        {artifacts.map((artifact, index) => (
          <Link
            key={artifact.slug}
            href={`/artifacts/${artifact.slug}`}
            data-reveal
            className="card card-lift group flex flex-col p-8"
          >
            <span className="font-mono text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
              {artifact.title}
            </h2>
            <p className="mt-4 flex-1 leading-relaxed text-muted">
              {artifact.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {artifact.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              View artifact
              <IconArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
