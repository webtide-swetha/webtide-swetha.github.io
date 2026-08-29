import { useState } from "react";
import { pricingNote, pricingTiers, type Billing } from "../data/pricing";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { cn } from "../lib/cn";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("project");

  return (
    <section id="pricing" className="bg-ice-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Pricing"
            title="Packages with a starting line, not a locked quote"
            copy={pricingNote}
          />
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <div
            className="inline-flex rounded-full border border-navy-900/15 bg-white p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["project", "monthly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "min-h-11 rounded-full px-5 text-sm font-medium capitalize cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400",
                  billing === option ? "bg-navy-900 text-text-hi" : "text-ice-muted",
                )}
                aria-pressed={billing === option}
                onClick={() => setBilling(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.06}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-white p-7",
                  tier.highlighted
                    ? "border-teal-400 shadow-[0_0_48px_rgba(43,163,184,0.28)]"
                    : "border-navy-900/10",
                )}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-navy-900">{tier.name}</h3>
                  {tier.badge ? (
                    <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-[11px] font-medium tracking-wide text-teal-400 uppercase">
                      {tier.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-ice-muted">{tier.blurb}</p>
                <p className="mt-6 font-display text-3xl font-semibold tracking-tight text-navy-900">
                  Starting from {tier.startingFrom[billing]}
                </p>
                <p className="mt-1 text-xs text-ice-muted">
                  {billing === "monthly" ? "per month, billed monthly" : "per project"}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-ice-muted">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href="#contact" className="mt-8 w-full" variant={tier.highlighted ? "primary" : "ice"}>
                  {tier.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
