import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { easeOutExpo } from "../lib/motion";

export function HeroScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="hero-scene">
        <motion.div
          className="hero-scene__stage"
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotateY: -12 }}
          animate={
            reduced
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  rotateY: [-8, 8, -8],
                  rotateX: [5, -3, 5],
                }
          }
          transition={
            reduced
              ? { duration: 0.4, ease: easeOutExpo }
              : { duration: 16, repeat: Infinity, ease: easeOutExpo, delay: 0.2 }
          }
        >
          <img
            src="/images/hero-3d.png"
            alt="3D glass workflow scene for WebTide"
            width={1376}
            height={768}
            className="relative z-[1] h-auto w-full rounded-[1.75rem] border border-navy-700/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            fetchPriority="high"
          />
          <span className="hero-scene__ring hero-scene__ring--a" />
          <span className="hero-scene__ring hero-scene__ring--b" />
        </motion.div>
        {!reduced ? (
          <>
            <motion.span
              className="hero-scene__orb hero-scene__orb--teal"
              animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: easeOutExpo }}
            />
            <motion.span
              className="hero-scene__orb hero-scene__orb--ice"
              animate={{ y: [0, 14, 0], x: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: easeOutExpo }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
