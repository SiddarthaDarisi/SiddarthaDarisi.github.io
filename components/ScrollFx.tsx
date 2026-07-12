"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll/pointer effects:
 * - adds .revealed to [data-reveal] elements entering the viewport
 * - tracks the cursor over .card elements to drive the spotlight highlight
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.(".card");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
