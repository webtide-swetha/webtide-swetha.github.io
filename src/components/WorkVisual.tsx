import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const visuals = {
  leads: "/images/work-leads.png",
  store: "/images/work-store.png",
  seo: "/images/work-seo.png",
} as const;

export type WorkVisualId = keyof typeof visuals;

type Props = {
  id: WorkVisualId;
  label: string;
  location: string;
};

export function WorkVisual({ id, label, location }: Props) {
  const reduced = usePrefersReducedMotion();
  const src = visuals[id];

  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden bg-navy-900">
      <motion.img
        src={src}
        alt=""
        width={1376}
        height={768}
        loading="lazy"
        className="h-full w-full object-cover"
        animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
      <span className="absolute top-4 left-4 rounded-full border border-teal-400/40 bg-navy-900/70 px-2 py-0.5 text-[10px] font-medium tracking-wide text-teal-300 uppercase">
        {location}
      </span>
      <p className="absolute right-4 bottom-4 left-4 font-display text-lg font-semibold text-text-hi">
        {label}
      </p>
    </div>
  );
}
