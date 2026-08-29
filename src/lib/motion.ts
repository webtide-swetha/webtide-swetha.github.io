export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const duration = {
  enter: 0.55,
  enterSlow: 0.7,
  hover: 0.2,
  tap: 0.15,
  exit: 0.35,
} as const;

export const viewportOnce = { once: true, margin: "-100px" as const };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const fadeOnly = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function revealTransition(reduced: boolean, delay = 0) {
  return {
    duration: reduced ? 0.35 : duration.enter,
    delay,
    ease: easeOutExpo,
  };
}
