import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { artifacts } from "@/lib/artifacts";

export const metadata: Metadata = {
  title: "Artifacts",
};

export default function ArtifactsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex items-center gap-3">
        <Image src="/brand/icon-folder.svg" alt="" width={40} height={40} />
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Portfolio Artifacts
        </h1>
      </div>

      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
        Each artifact below includes its objective, process, tools, and value
        proposition, built as part of the IWU AI/ML program and beyond.
        Explore the write-ups, or interact with the live embeds directly.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {artifacts.map((artifact) => (
          <Link
            key={artifact.slug}
            href={`/artifacts/${artifact.slug}`}
            className="group flex flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-accent"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {artifact.title}
            </h2>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
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
            <span className="mt-6 text-sm font-semibold text-accent">
              View artifact →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
