export type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    body: "A short call, a look at your current stack, and a clear brief. We agree on the outcome before a pixel is pushed.",
  },
  {
    id: "build",
    title: "Design / Build",
    body: "Copy, design, and implementation in one thread with Swetha. You see work in progress, not a big reveal at the end.",
  },
  {
    id: "launch",
    title: "Launch",
    body: "Domains, hosting, tracking, and a go-live checklist. Ads, SEO, and automations are wired before we call it done.",
  },
  {
    id: "optimise",
    title: "Optimise",
    body: "After launch we watch the numbers. Tweaks, new workflows, and retainers if you want a steady partner.",
  },
];
