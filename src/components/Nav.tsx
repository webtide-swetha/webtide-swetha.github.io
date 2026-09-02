import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { brand } from "../data/brand";
import { navLinks } from "../data/nav";
import { useScrolled } from "../hooks/useScrolled";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { cn } from "../lib/cn";
import { duration, easeOutExpo } from "../lib/motion";

export function Nav() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(open, overlayRef, close);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-navy-700/80 bg-navy-900/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:h-[5.25rem] sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-3 text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          <Logo className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
          <span className="flex min-w-0 flex-col justify-center leading-none">
            <span className="font-display text-2xl font-bold tracking-tight sm:text-[2.15rem]">
              {brand.name}
            </span>
            <span className="mt-1 hidden font-sans text-[0.68rem] font-medium tracking-[0.16em] text-text-lo uppercase sm:inline">
              Digital Solutions
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-lo transition-colors duration-200 hover:text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#contact" className="hidden sm:inline-flex" variant="primary">
            Let&apos;s Talk
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-text-hi lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-navy-900 px-8 pt-24 pb-10 lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.enter, ease: easeOutExpo }}
          >
            <button
              type="button"
              className="absolute top-4 right-5 inline-flex size-11 items-center justify-center rounded-full text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              aria-label="Close menu"
              onClick={close}
            >
              <X aria-hidden="true" />
            </button>
            <ul className="flex flex-1 flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.06 * index,
                    duration: duration.enter,
                    ease: easeOutExpo,
                  }}
                >
                  <a
                    href={link.href}
                    className="block py-3 font-display text-4xl font-semibold tracking-tight text-text-hi"
                    onClick={close}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button href="#contact" onClick={close} className="w-full">
              Let&apos;s Talk
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
