import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { duration, easeOutExpo } from "../lib/motion";

const FLAG = "quvo-preloaded";

export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(FLAG) === "1") return;
    } catch {
      /* private mode */
    }
    setVisible(true);
    const max = window.setTimeout(() => finish(), reduced ? 200 : 1100);
    return () => window.clearTimeout(max);
  }, [reduced]);

  function finish() {
    setVisible(false);
    try {
      sessionStorage.setItem(FLAG, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: reduced ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            opacity: reduced ? 0 : 1,
          }}
          transition={{ duration: reduced ? 0.3 : duration.enter, ease: easeOutExpo }}
          role="status"
          aria-live="polite"
          aria-label="QUVO loading"
        >
          <Logo className="h-16 w-24" draw title="QUVO" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
