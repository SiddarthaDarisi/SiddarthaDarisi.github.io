"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/artifacts", label: "Artifacts" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-raised transition-shadow group-hover:shadow-[var(--glow)]">
            <Image
              src="/brand/logo-teal.svg"
              alt=""
              width={26}
              height={26}
              priority
            />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Siddartha&nbsp;<span className="text-gradient">Darisi</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:text-accent ${
                  isActive(l.href) ? "text-accent" : "text-muted"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span
                    className="absolute inset-x-3 -bottom-[1.05rem] h-px"
                    style={{ background: "var(--grad)" }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
          <li>
            <Link href="/contact" className="btn-primary ml-2 !px-4 !py-2 text-sm">
              Hire Me
            </Link>
          </li>
        </ul>

        {/* Mobile: theme toggle + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="rounded-md p-2 text-muted hover:text-accent"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-background/95 px-5 py-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(l.href) ? "text-accent" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-md px-3 py-2.5 text-sm font-semibold text-accent"
            >
              Hire Me →
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
