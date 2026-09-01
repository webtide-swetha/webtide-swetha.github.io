import { type FormEvent, type ReactNode, useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { brand } from "../data/brand";
import { services } from "../data/services";
import { budgetRanges } from "../data/pricing";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { cn } from "../lib/cn";

type Status = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const mailto = `mailto:${brand.email}?subject=${encodeURIComponent("Project enquiry — QUVO")}`;

function fieldClass(invalid?: boolean) {
  return cn(
    "mt-1.5 w-full min-h-11 rounded-xl border bg-navy-900 px-3 text-sm text-text-hi placeholder:text-text-lo/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400",
    invalid ? "border-red-400" : "border-navy-700",
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(value: string, id: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (message.length < 8) next.message = "Tell Swetha a little more about the project.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
    if (!endpoint) {
      window.location.href = `${mailto}&body=${encodeURIComponent(
        `${message}\n\n${name}\n${email}\n${data.get("phone")}\n${data.get("service")}\n${data.get("budget")}`,
      )}`;
      return;
    }

    setStatus("loading");
    const payload: Record<string, string> = {
      name,
      email,
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message,
    };
    const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY;
    if (accessKey) payload.access_key = accessKey;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("submit failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">
            Contact
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-text-hi">
            {brand.closingLine}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            {status === "success" ? (
              <div className="rounded-3xl border border-teal-400/40 bg-navy-800 p-8" role="status">
                <h3 className="font-display text-2xl font-semibold text-text-hi">Message sent</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-lo">
                  Swetha will reply to the email you gave. If it is urgent, WhatsApp is faster.
                </p>
                <Button href={brand.whatsappUrl} className="mt-6">
                  Open WhatsApp
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-text-hi">
                    Name <span className="text-teal-300">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className={fieldClass(Boolean(errors.name))}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-1 text-xs text-red-300" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-text-hi">
                    Email <span className="text-teal-300">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass(Boolean(errors.email))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-1 text-xs text-red-300" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm text-text-hi">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass()}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="text-sm text-text-hi">
                    Service
                  </label>
                  <select id="service" name="service" className={fieldClass()} defaultValue="">
                    <option value="" disabled>
                      What do you need?
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm text-text-hi">
                    Budget range
                  </label>
                  <select id="budget" name="budget" className={fieldClass()} defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-text-hi">
                    Message <span className="text-teal-300">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(fieldClass(Boolean(errors.message)), "py-3")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1 text-xs text-red-300" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                {status === "error" ? (
                  <p className="text-sm text-red-300" role="alert">
                    Could not send just now. Email Swetha instead —{" "}
                    <a className="underline" href={mailto}>
                      {brand.email}
                    </a>
                  </p>
                ) : null}
                <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                  {status === "loading" ? "Sending…" : "Send message"}
                </Button>
                <p className="text-xs text-text-lo">
                  Prefer email?{" "}
                  <a className="text-teal-300 underline underline-offset-2" href={mailto}>
                    {brand.email}
                  </a>
                </p>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.08} className="grid content-start gap-3">
            <ContactTile
              icon={<MessageCircle className="size-5" aria-hidden="true" />}
              label="WhatsApp"
              value={brand.phoneDisplay}
              href={brand.whatsappUrl}
              onCopy={() => copy(brand.phoneDisplay, "phone")}
              copied={copied === "phone"}
            />
            <ContactTile
              icon={<Mail className="size-5" aria-hidden="true" />}
              label="Email"
              value={brand.email}
              href={mailto}
              onCopy={() => copy(brand.email, "email")}
              copied={copied === "email"}
            />
            <ContactTile
              icon={<InstagramIcon />}
              label="Instagram"
              value={brand.instagram}
              href={brand.instagramUrl}
            />
            <ContactTile
              icon={<LinkedInIcon />}
              label="LinkedIn"
              value={brand.linkedin}
              href={brand.linkedinUrl}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactTile({
  icon,
  label,
  value,
  href,
  onCopy,
  copied,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-navy-700 bg-navy-800 p-4">
      <span className="flex size-11 items-center justify-center rounded-xl bg-navy-900 text-teal-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.16em] text-text-lo">{label}</p>
        <a
          href={href}
          className="block truncate text-sm text-text-hi hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          {value}
        </a>
      </div>
      {onCopy ? (
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-text-lo hover:text-text-hi cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          aria-label={`Copy ${label}`}
          onClick={onCopy}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </button>
      ) : null}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H4V20h2.5V9ZM5.25 4A1.75 1.75 0 1 0 5.25 7.5 1.75 1.75 0 0 0 5.25 4ZM20 20h-2.5v-5.6c0-1.9-.7-2.5-1.7-2.5s-1.8.9-1.8 2.5V20H11.5V9h2.4v1.5c.5-.9 1.6-1.8 3.3-1.8 2.3 0 3.8 1.4 3.8 4.4V20Z" />
    </svg>
  );
}
