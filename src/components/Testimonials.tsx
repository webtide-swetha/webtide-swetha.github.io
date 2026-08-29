import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "../data/testimonials";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { duration, easeOutExpo } from "../lib/motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const item = testimonials[index];

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say"
            copy="Owners and partners across Coimbatore, Tiruppur, and Chennai — in their words."
          />
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative rounded-3xl border border-navy-700 bg-navy-800 p-8 sm:p-12">
            <div className="min-h-[160px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={item.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: duration.enter, ease: easeOutExpo }}
                >
                  <p className="font-display text-xl leading-snug text-text-hi sm:text-2xl">
                    {item.quote}
                  </p>
                  <footer className="mt-8 text-sm text-text-lo">
                    <cite className="not-italic font-medium text-text-hi">{item.attribution}</cite>
                    <p>{item.role}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs text-text-lo">
                {index + 1} / {testimonials.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-navy-700 text-text-hi cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-navy-700 text-text-hi cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
