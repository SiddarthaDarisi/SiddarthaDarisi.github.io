"use client";

import { useEffect, useState } from "react";

/** Floating back-to-top button, appears after a screen of scroll. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-lg backdrop-blur transition-all hover:border-accent hover:text-accent ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V4m-6 6 6-6 6 6" />
      </svg>
    </button>
  );
}
