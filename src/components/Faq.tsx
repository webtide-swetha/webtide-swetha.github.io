import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { faqItems } from "../data/faq";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { duration, easeOutExpo } from "../lib/motion";
import { cn } from "../lib/cn";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="faq" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Straight answers before the call"
          />
        </Reveal>
        <div className="mt-12 divide-y divide-navy-700 border-y border-navy-700">
          {faqItems.map((item, index) => {
            const open = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <Reveal key={item.id} delay={index * 0.04}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    {item.question}
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-teal-300 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: duration.enter, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-text-lo">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
