import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { processSteps } from "../data/process";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const width = useTransform(scaleX, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-ice-50 px-5 py-24 text-navy-900 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Process"
            title="Discover → Design → Launch → Optimise"
            copy="A sequence, not a mystery. You always know which stage you are in and what happens next."
          />
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="pointer-events-none absolute top-[22px] right-0 left-0 hidden h-px bg-navy-900/15 lg:block" />
          <motion.div
            className="pointer-events-none absolute top-[22px] left-0 hidden h-px origin-left bg-teal-400 lg:block"
            style={{ width: reduced ? "100%" : width }}
          />
          <ol className="grid gap-10 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.id} className="relative">
                <Reveal delay={index * 0.06}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-navy-900/15 bg-ice-50 font-display text-sm font-semibold text-navy-900">
                      {index + 1}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed text-ice-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
