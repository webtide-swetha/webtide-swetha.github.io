import { motion } from "motion/react";
import { tools } from "../data/tools";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function Marquee() {
  const reduced = usePrefersReducedMotion();
  const sequence = [...tools, ...tools];

  return (
    <section
      aria-label="Tools and platforms"
      className="relative border-y border-navy-700 bg-navy-800/50 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-900 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-900 to-transparent sm:w-28" />
      <div className="group overflow-hidden">
        {reduced ? (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-display text-sm font-semibold tracking-wide text-text-lo uppercase"
              >
                {tool}
              </span>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max gap-10 px-6 group-hover:[animation-play-state:paused] animate-marquee"
            aria-hidden="true"
          >
            {sequence.map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                className="shrink-0 font-display text-sm font-semibold tracking-wide text-text-lo uppercase"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
