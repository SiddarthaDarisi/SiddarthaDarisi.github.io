"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { profileKB, askSuggestions } from "@/lib/profile-kb";
import { ASK_PROXY_URL } from "@/lib/site";
import {
  buildIndex,
  geminiAnswer,
  proxyAnswer,
  getGeminiKey,
  setGeminiKey,
} from "@/lib/rag";
import { IconSparkle, IconArrowRight, IconGear } from "@/components/Icons";

type Message =
  | { kind: "user"; text: string }
  | {
      kind: "bot";
      text: string;
      link?: string;
      linkLabel?: string;
      topic?: string;
      viaLlm?: boolean;
      /** Render a prominent contact CTA button under the reply. */
      cta?: string;
    };

/** Hiring/contact intent → the reply gets a physical "Hire Me" button. */
const HIRE_INTENT =
  /\b(hire|hiring|recruit|available|availability|open to work|opportunit|position|role|job|interview|salary|resume|cv|contact|reach|email|get in touch)\b/i;

/** Rotated so repeated misses don't read as a scripted bot. */
const FALLBACKS = [
  "I don't have that specific detail on hand — but Siddartha's track record says a lot: he's gone from GenAI MLOps to building RAG ingestion at Amazon scale, picking up new stacks quickly along the way. He'd love to talk specifics directly.",
  "That one's beyond what I've been given — it's worth asking Siddartha himself. He's quick to respond, and questions like this are exactly what the contact page is for.",
  "Good question — I don't have it in my knowledge base, and I'd rather connect you with Siddartha than guess. He's happy to get into specifics one-on-one.",
];

export default function AskWidget() {
  const index = useMemo(
    () =>
      buildIndex(
        profileKB.map((c) => ({
          id: c.id,
          boost: `${c.topic} ${c.keywords.join(" ")}`,
          body: c.text,
        }))
      ),
    []
  );

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      kind: "bot",
      text: "Hi — I'm Siddartha's assistant, built by him: client-side retrieval over his real profile, running entirely in your browser. Ask me about his work, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const fallbackIdx = useRef(0);
  const [showSettings, setShowSettings] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasKey(Boolean(getGeminiKey()));
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, showSettings]);

  const saveKey = () => {
    const k = keyDraft.trim();
    setGeminiKey(k || null);
    setHasKey(Boolean(k));
    setKeyDraft("");
    setShowSettings(false);
  };

  const ask = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    setMessages((m) => [...m, { kind: "user", text: q }]);

    const key = getGeminiKey();
    const llm = Boolean(key) || Boolean(ASK_PROXY_URL);
    const hireCta = "Hire Me — get in touch";
    const contactCta = "Contact Siddartha";
    const wantsHire = HIRE_INTENT.test(q);

    // ---------- Retrieval-only mode (no LLM available) ----------
    // Gate on a confidence threshold; pivot to contact when nothing matches.
    if (!llm) {
      const CONFIDENCE = 2.2;
      const hits = index.search(q, 3).filter((h) => h.score >= CONFIDENCE);
      if (hits.length === 0) {
        const text = FALLBACKS[fallbackIdx.current % FALLBACKS.length];
        fallbackIdx.current += 1;
        setMessages((m) => [...m, { kind: "bot", text, cta: contactCta }]);
        return;
      }
      const top = profileKB.find((c) => c.id === hits[0].id)!;
      setMessages((m) => [
        ...m,
        {
          kind: "bot",
          text: top.text,
          link: top.link,
          topic: top.topic,
          cta: wantsHire || top.id === "kb-contact" ? hireCta : undefined,
        },
      ]);
      return;
    }

    // ---------- LLM mode (proxy or visitor key) ----------
    // No hard threshold: the model reasons over the top matches, so typos and
    // vaguely-phrased questions still get a real answer. If nothing matches at
    // all, anchor on the identity chunks so "who is he" always resolves.
    const hits = index.search(q, 5);
    const contextChunks = hits.length
      ? hits.map((h) => profileKB.find((c) => c.id === h.id)!)
      : profileKB.filter(
          (c) =>
            c.id === "kb-value-proposition" || c.id === "kb-summary-current-focus"
        );
    const topHit = hits.length ? profileKB.find((c) => c.id === hits[0].id) : undefined;

    setBusy(true);
    try {
      const context = contextChunks
        .map((c) => `[${c.id}] ${c.topic}: ${c.text}`)
        .join("\n");
      const system =
        "You are the portfolio assistant for Siddartha Darisi, a software engineer, speaking mostly with recruiters. Answer in 2-3 concise, professional sentences using ONLY the provided context; never invent facts, numbers, or skills. If the context fully answers the question, answer it plainly and do NOT tack on any \"reach out\" or contact call-to-action. Only when the context does not actually contain the answer: instead of saying he lacks the skill, point to his closest relevant experience, note that he ramps up on new technologies fast (from GenAI MLOps to Amazon-scale RAG in under two years), and invite the recruiter to reach out via his contact page. Never overstate — if the context does not show he has done something, do not imply he is an expert at it.";
      // Visitor's own key wins; otherwise the site's Worker proxy.
      const text = key
        ? await geminiAnswer(key, system, context, q)
        : await proxyAnswer(ASK_PROXY_URL, system, context, q);
      // Show a contact button on hiring questions or when the reply invites it.
      const invitesContact = /contact page|reach out|get in touch|contact him/i.test(text);
      const cta = wantsHire ? hireCta : invitesContact ? contactCta : undefined;
      setMessages((m) => [
        ...m,
        { kind: "bot", text, link: topHit?.link, topic: topHit?.topic, viaLlm: true, cta },
      ]);
    } catch {
      // Proxy/model unavailable — fall back to the best retrieved chunk, or contact.
      if (topHit) {
        setMessages((m) => [
          ...m,
          {
            kind: "bot",
            text: topHit.text,
            link: topHit.link,
            topic: topHit.topic,
            cta: wantsHire || topHit.id === "kb-contact" ? hireCta : undefined,
          },
        ]);
      } else {
        const text = FALLBACKS[fallbackIdx.current % FALLBACKS.length];
        fallbackIdx.current += 1;
        setMessages((m) => [...m, { kind: "bot", text, cta: contactCta }]);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Launcher bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask Siddartha's AI assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[var(--glow-strong)] transition-transform hover:scale-105"
        style={{ background: "var(--grad)" }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        ) : (
          <IconSparkle size={22} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="card !fixed bottom-24 right-5 z-50 flex w-[min(92vw,380px)] flex-col overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: "var(--grad)" }}>
                <IconSparkle size={15} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold leading-tight">
                  Ask Siddartha
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  {hasKey || ASK_PROXY_URL
                    ? "LLM mode · Gemini"
                    : "Self-built · client-side RAG"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings((s) => !s)}
              aria-label="Assistant settings"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <IconGear size={14} />
            </button>
          </div>

          {showSettings && (
            <div className="border-b border-line bg-raised/60 px-4 py-3">
              <p className="text-xs leading-relaxed text-muted">
                Optional: paste a free{" "}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-strong"
                >
                  Google AI Studio key
                </a>{" "}
                to let Gemini compose answers. The key stays in your browser
                only — this site has no backend and ships no keys.
              </p>
              <div className="mt-2.5 flex gap-2">
                <input
                  type="password"
                  value={keyDraft}
                  onChange={(e) => setKeyDraft(e.target.value)}
                  placeholder={hasKey ? "Key saved — paste new, or save empty to clear" : "AIza…"}
                  aria-label="Gemini API key"
                  className="w-full rounded-lg border border-line bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
                />
                <button onClick={saveKey} className="btn-ghost !px-3.5 !py-2 text-xs">
                  Save
                </button>
              </div>
            </div>
          )}

          <div ref={logRef} className="h-80 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) =>
              msg.kind === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm text-white" style={{ background: "var(--grad)" }}>
                    {msg.text}
                  </p>
                </div>
              ) : (
                <div key={i} className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-raised/70 px-3.5 py-2.5">
                  {msg.topic && (
                    <p className="mb-1 font-mono text-[0.58rem] uppercase tracking-wider text-accent">
                      {msg.topic}
                      {msg.viaLlm ? " · gemini" : ""}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {msg.text}
                  </p>
                  {msg.link && msg.link !== "/contact" && (
                    <Link
                      href={msg.link}
                      onClick={() => setOpen(false)}
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-strong"
                    >
                      {msg.linkLabel ?? "See more"} <IconArrowRight size={12} />
                    </Link>
                  )}
                  {msg.cta && (
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="btn-primary mt-2.5 !px-4 !py-2 text-xs"
                    >
                      {msg.cta} <IconArrowRight size={13} />
                    </Link>
                  )}
                </div>
              )
            )}
            {busy && (
              <p className="font-mono text-xs tracking-wider text-muted">thinking…</p>
            )}
          </div>

          <div className="border-t border-line px-4 py-3">
            <div className="flex flex-wrap gap-1.5">
              {askSuggestions.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="chip !text-[0.62rem] transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="mt-2.5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Siddartha…"
                aria-label="Ask about Siddartha"
                className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
              <button type="submit" disabled={busy} className="btn-primary !px-4 !py-2 text-sm disabled:opacity-60">
                Ask
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
