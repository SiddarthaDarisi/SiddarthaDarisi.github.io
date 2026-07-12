import ContactForm, { CopyEmailButton } from "@/components/ContactForm";
import { site } from "@/lib/site";
import {
  IconEnvelope,
  IconGitHub,
  IconLinkedIn,
  IconPin,
  IconSparkle,
} from "@/components/Icons";

export const metadata = {
  title: "Contact",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: IconEnvelope,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siddartha-darisi ↗",
    href: site.linkedin,
    icon: IconLinkedIn,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/SiddarthaDarisi ↗",
    href: site.github,
    icon: IconGitHub,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div data-reveal>
        <p className="eyebrow">// Contact</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Recruiting, collaborating, or just curious about AI/ML infrastructure
          — my inbox is open.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div data-reveal className="card p-7 md:p-9">
          <ContactForm />
        </div>

        <div data-reveal className="space-y-6">
          <div className="card p-7">
            <h2 className="text-lg font-semibold text-foreground">
              Direct channels
            </h2>
            <ul className="mt-5 space-y-4">
              {channels.map((channel) => (
                <li key={channel.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                    <channel.icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="block truncate text-sm text-muted hover:text-accent"
                    >
                      {channel.value}
                    </a>
                  </div>
                  {channel.label === "Email" && (
                    <CopyEmailButton email={site.email} />
                  )}
                </li>
              ))}
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                  <IconPin size={18} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Location
                  </p>
                  <p className="text-sm text-muted">{site.location}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                <IconSparkle size={16} />
              </span>
              <p className="text-sm leading-relaxed text-muted">
                Prefer instant answers? Ask my AI assistant — the chat bubble
                in the corner of every page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
