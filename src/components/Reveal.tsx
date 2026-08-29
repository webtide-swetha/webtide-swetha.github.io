import { motion, type HTMLMotionProps } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { cn } from "../lib/cn";
import { fadeOnly, fadeUp, revealTransition, viewportOnce } from "../lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? fadeOnly.hidden : fadeUp.hidden}
      whileInView={reduced ? fadeOnly.show : fadeUp.show}
      viewport={viewportOnce}
      transition={revealTransition(reduced, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
