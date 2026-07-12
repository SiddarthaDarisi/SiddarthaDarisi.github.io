"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { IconCheck, IconCopy } from "@/components/Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/siddarthadarisi@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject || `Portfolio contact from ${name}`,
            message,
          }),
        }
      );

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-line bg-raised px-6 py-16 text-center">
        <span className="icon-badge">
          <IconCheck size={24} />
        </span>
        <p className="text-sm text-foreground">
          Message sent — thank you! I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Let's talk about..."
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-line bg-raised px-4 py-3 text-sm text-foreground">
          Something went wrong — email me directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent hover:text-accent-strong"
          >
            {site.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition hover:border-accent hover:text-accent"
    >
      {copied ? (
        <>
          <IconCheck size={14} className="text-accent" />
          <span className="text-accent">Copied</span>
        </>
      ) : (
        <>
          <IconCopy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
