import { useId } from "react";
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
  const uid = useId().replace(/:/g, "");
  const gradId = `quvo-q-${uid}`;

  return (
    <svg
      className={cn("overflow-visible", className)}
      viewBox="0 0 48 48"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gradId} x1="8" y1="6" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#35C4D9" />
          <stop offset="0.5" stopColor="#2BA3B8" />
          <stop offset="1" stopColor="#F4F7F9" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="22.5"
        cy="22.5"
        r="13.25"
        stroke={`url(#${gradId})`}
        strokeWidth="5.5"
        initial={animateDraw ? { pathLength: 0, opacity: 1 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      />
      <motion.path
        d="M31 31.5L41 41.5"
        stroke={`url(#${gradId})`}
        strokeWidth="5.5"
        strokeLinecap="round"
        initial={animateDraw ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: duration.enter,
          delay: animateDraw ? 0.22 : 0,
          ease: easeOutExpo,
        }}
      />
    </svg>
  );
}
