export type Billing = "project" | "monthly";

export type PricingTier = {
  id: "starter" | "growth" | "automate";
  name: string;
  badge?: string;
  highlighted: boolean;
  blurb: string;
  startingFrom: Record<Billing, string>;
  includes: string[];
  cta: string;
};

export const pricingNote =
  "Starting from prices. Scope decides the final quote — every project is scoped with Swetha before work begins.";

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    highlighted: false,
    blurb: "A sharp landing page plus the SEO basics so you can start showing up.",
    startingFrom: {
      project: "₹25,000",
      monthly: "₹12,000",
    },
    includes: [
      "Custom landing page",
      "On-page SEO & meta",
      "Mobile-first, fast load",
      "Contact / WhatsApp CTA",
      "1 round of revisions",
    ],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    highlighted: true,
    blurb: "Site, ads, and social running as a monthly system — not a one-off launch.",
    startingFrom: {
      project: "₹80,000",
      monthly: "₹45,000",
    },
    includes: [
      "Site or landing page",
      "Meta & Google Ads management",
      "Social content cadence",
      "Monthly performance notes",
      "Tracking & analytics setup",
    ],
    cta: "Choose Growth",
  },
  {
    id: "automate",
    name: "Automate",
    highlighted: false,
    blurb: "n8n workflows, an AI chatbot, and the integrations that stop work falling through.",
    startingFrom: {
      project: "₹40,000",
      monthly: "₹20,000",
    },
    includes: [
      "Self-hosted n8n setup",
      "Lead → CRM → WhatsApp flow",
      "AI chatbot on site or WhatsApp",
      "2–3 core integrations",
      "Handover docs & walkthrough",
    ],
    cta: "Automate the busywork",
  },
];

export const budgetRanges = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;
