"use client";

import { useEffect, useRef } from "react";

/** Page-wide soft radial glow that follows the cursor (brittanychiang-style). */
export default function PageGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    const paint = () => {
      raf = 0;
      el.style.background = `radial-gradient(620px circle at ${x}px ${y}px, var(--ambient-a), transparent 75%)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
  );
}
