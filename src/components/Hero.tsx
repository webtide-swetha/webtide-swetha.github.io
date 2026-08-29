import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "./Button";
import { HeroBackground } from "./HeroBackground";
import { HeroScene } from "./HeroScene";
import { brand, trustPoints } from "../data/brand";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { duration, easeOutExpo } from "../lib/motion";

const headline = brand.tagline.split(" ");

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:pt-24"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-12 lg:gap-y-8">
        <div>
          <motion.div
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-navy-700 bg-navy-800/70 px-3 py-1.5 text-xs text-text-lo backdrop-blur"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: duration.enter, ease: easeOutExpo }}
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for freelance projects
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-text-hi lg:text-[clamp(2.6rem,4.8vw,4.75rem)]">
            {headline.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: "110%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.28 + index * 0.08,
                    duration: duration.enterSlow,
                    ease: easeOutExpo,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-text-lo sm:text-xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: duration.enter, ease: easeOutExpo }}
          >
            {brand.founder} is a {brand.role.toLowerCase()} who builds sites, campaigns, and n8n
            workflows for Tamil Nadu businesses — Coimbatore to Chennai — without an agency layer.
          </motion.p>
        </div>

        <motion.div
          className="lg:row-span-2"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: duration.enterSlow, ease: easeOutExpo }}
        >
          <HeroScene />
        </motion.div>

        <div>
          <motion.div
            className="flex flex-wrap gap-3 lg:mt-0"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: duration.enter, ease: easeOutExpo }}
          >
            <Button href="#contact">Start a Project</Button>
            <Button href="#services" variant="ghost">
              See Services
            </Button>
          </motion.div>

          <motion.ul
            className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: duration.enter, ease: easeOutExpo }}
          >
            {trustPoints.map((item) => (
              <li key={item.label} className="border-t border-navy-700 pt-4 text-sm text-text-lo">
                <p className="font-display text-base font-semibold text-text-hi">{item.label}</p>
                <p className="mt-1 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <motion.a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-text-lo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: duration.hover, ease: easeOutExpo }}
        aria-label="Scroll to services"
      >
        <span>Scroll</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
