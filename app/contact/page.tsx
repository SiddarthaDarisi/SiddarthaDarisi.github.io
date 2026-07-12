import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siddartha-darisi ↗",
    href: site.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/SiddarthaDarisi ↗",
    href: site.github,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex items-center gap-3">
        <Image src="/brand/icon-envelope.svg" alt="" width={40} height={40} />
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Get in Touch
        </h1>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Recruiting, collaborating, or just curious about AI/ML infrastructure
        — my inbox is open.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="max-w-xl rounded-xl border border-line bg-surface p-7">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-7">
            <h2 className="text-lg font-semibold text-foreground">
              Direct channels
            </h2>
            <ul className="mt-5 space-y-4">
              {channels.map((channel) => (
                <li key={channel.label} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted hover:text-accent"
                    >
                      {channel.value}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Location
                  </p>
                  <p className="text-sm text-muted">{site.location}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-raised p-7">
            <p className="text-sm leading-relaxed text-muted">
              Prefer instant answers? Ask my AI assistant — the chat bubble in
              the bottom corner of every page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
