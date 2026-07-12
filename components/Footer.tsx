import Link from "next/link";
import { site } from "@/lib/site";
import { IconGitHub, IconLinkedIn, IconEnvelope } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="relative mt-10">
      <div className="hairline-gradient" />
      <div className="bg-surface/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            {/* Wordmark — variant follows the active theme */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-wordmark.svg"
              alt={site.name}
              className="light-only mx-auto h-24 w-auto md:mx-0"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-wordmark-dark.svg"
              alt={site.name}
              className="dark-only mx-auto h-24 w-auto md:mx-0"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {site.title} · {site.location}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 md:items-end">
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/artifacts" className="text-muted transition-colors hover:text-accent">
                Artifacts
              </Link>
              <Link href="/experience" className="text-muted transition-colors hover:text-accent">
                Experience
              </Link>
              <Link href="/contact" className="text-muted transition-colors hover:text-accent">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
        <div className="border-t border-line py-4 text-center font-mono text-[0.68rem] tracking-wider text-muted">
          © {new Date().getFullYear()} {site.name} · Built with Next.js · Deployed on GitHub Pages
        </div>
      </div>
    </footer>
  );
}
