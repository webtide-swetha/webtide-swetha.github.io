import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { duration } from "../../lib/motion";

export function ChatWidgetInner() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(open, panelRef, close);

  const launcher = useMemo(
    () => (
      <button
        type="button"
        className="relative flex size-14 items-center justify-center rounded-full bg-teal-400 text-navy-900 shadow-[0_0_0_0_rgba(43,163,184,0.5)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        aria-label={open ? "Close chat" : "Open WebTide assistant"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-teal-300 motion-reduce:animate-none"
          aria-hidden="true"
        />
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </button>
    ),
    [open],
  );

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="WebTide Assistant"
            className="mb-3 origin-bottom-right overflow-hidden rounded-2xl border border-navy-700 bg-navy-800 shadow-2xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, duration: duration.enter }}
            style={{ width: "min(380px, calc(100vw - 2rem))", height: 560 }}
          >
            <ChatPanel onClose={close} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex justify-end">{launcher}</div>
    </div>
  );
}
