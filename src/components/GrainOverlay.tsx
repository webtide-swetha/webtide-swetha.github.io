export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.04] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="wt-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#wt-grain)" />
      </svg>
    </div>
  );
}
