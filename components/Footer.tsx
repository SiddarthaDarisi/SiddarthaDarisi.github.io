import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <picture>
            <source
              srcSet="/brand/logo-wordmark-dark.svg"
              media="(prefers-color-scheme: dark)"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-wordmark.svg"
              alt={site.name}
              className="mx-auto h-20 w-auto md:mx-0"
            />
          </picture>
          <p className="mt-1 text-sm text-muted">
            {site.title} · {site.location}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/artifacts" className="text-muted hover:text-accent">
            Artifacts
          </Link>
          <Link href="/experience" className="text-muted hover:text-accent">
            Experience
          </Link>
          <Link href="/contact" className="text-muted hover:text-accent">
            Contact
          </Link>
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
          <a
            href={`mailto:${site.email}`}
            className="text-muted hover:text-accent"
          >
            Email
          </a>
        </nav>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Built with Next.js · Hosted on
        GitHub Pages.
      </div>
    </footer>
  );
}
