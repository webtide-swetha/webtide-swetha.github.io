import { Reveal } from "./Reveal";
import { WorkflowDiagram } from "./WorkflowDiagram";

export function Automation() {
  return (
    <section id="automation" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">
            Automation spotlight
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-text-hi">
            Hours back every week. Leads that do not go cold.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-lo">
            Small teams lose time on copy-paste: a form fill that never hits the CRM, a WhatsApp
            that nobody answers after hours, a report rebuilt every Friday. Self-hosted n8n sits
            between the tools you already pay for and does the next step — without a new SaaS
            subscription eating the margin.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-text-lo">
            {[
              "Recover missed leads the moment they enquire",
              "Auto-respond on WhatsApp and email, then alert the team",
              "Ship a weekly report nobody has to assemble by hand",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.12}>
          <WorkflowDiagram />
        </Reveal>
      </div>
    </section>
  );
}
