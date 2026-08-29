import { useScroll, useTransform, motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 80]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ y }} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(43,163,184,0.16),_transparent_55%)]" />
      <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aurora-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2BA3B8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#16304F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#35C4D9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0A1A2F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-80 420C180 280 360 560 720 430C1080 300 1260 520 1520 380"
          fill="none"
          stroke="url(#aurora-a)"
          strokeWidth="120"
          strokeLinecap="round"
          animate={
            reduced
              ? undefined
              : { d: [
                  "M-80 420C180 280 360 560 720 430C1080 300 1260 520 1520 380",
                  "M-80 460C200 320 380 500 740 470C1100 340 1280 480 1520 420",
                  "M-80 420C180 280 360 560 720 430C1080 300 1260 520 1520 380",
                ] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: easeSoft }}
        />
        <motion.path
          d="M-40 560C220 640 480 420 820 540C1160 660 1320 480 1560 600"
          fill="none"
          stroke="url(#aurora-b)"
          strokeWidth="90"
          strokeLinecap="round"
          animate={
            reduced
              ? undefined
              : { d: [
                  "M-40 560C220 640 480 420 820 540C1160 660 1320 480 1560 600",
                  "M-40 520C240 600 500 460 800 500C1140 620 1340 520 1560 560",
                  "M-40 560C220 640 480 420 820 540C1160 660 1320 480 1560 600",
                ] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: easeSoft }}
        />
      </svg>
    </motion.div>
  );
}

const easeSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];
