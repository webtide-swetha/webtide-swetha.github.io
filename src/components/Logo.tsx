import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { duration, easeOutExpo } from "../lib/motion";

type LogoProps = {
  className?: string;
  draw?: boolean;
  title?: string;
};

export function Logo({ className, draw = false, title }: LogoProps) {
  const reduced = usePrefersReducedMotion();
  const animateDraw = draw && !reduced;

  return (
    <svg
      className={cn("overflow-visible", className)}
      viewBox="0 0 72 48"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="wt-wave" x1="0" y1="8" x2="72" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#35C4D9" />
          <stop offset="0.45" stopColor="#2BA3B8" />
          <stop offset="1" stopColor="#F4F7F9" />
        </linearGradient>
      </defs>
      <motion.path
        d="M6 14C10 14 12 34 20 36C26 37.5 28 12 36 12"
        stroke="url(#wt-wave)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animateDraw ? { pathLength: 0, opacity: 1 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      />
      <motion.path
        d="M36 12C44 12 46 36 54 36C62 36 64 16 68 16"
        stroke="url(#wt-wave)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animateDraw ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: animateDraw ? 0.12 : 0, ease: easeOutExpo }}
      />
      <motion.path
        d="M20 36C24 28 30 22 36 22C42 22 48 28 54 36"
        stroke="#F4F7F9"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.55}
        initial={animateDraw ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: duration.enter,
          delay: animateDraw ? 0.28 : 0,
          ease: easeOutExpo,
        }}
      />
    </svg>
  );
}
