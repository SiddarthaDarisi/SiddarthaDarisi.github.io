"use client";

import { useEffect, useState } from "react";

export type SpySection = { id: string; label: string };

/**
 * Scrollspy anchor rail (brittanychiang-style): line indicators that
 * lengthen + brighten for the section currently in view.
 */
export default function SectionSpy({ sections }: { sections: SpySection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Section navigation" className="hidden lg:block">
      <ul className="space-y-4">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center gap-4">
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-16"
                      : "w-8 group-hover:w-14"
                  }`}
                  style={{
                    background: isActive ? "var(--grad)" : "var(--line)",
                  }}
                />
                <span
                  className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
