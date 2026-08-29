export type ServiceId =
  | "seo"
  | "ads"
  | "web"
  | "automation"
  | "social"
  | "ai";

export type BentoSize = "hero" | "mid" | "small";

export type Service = {
  id: ServiceId;
  title: string;
  description: string;
  bullets: [string, string, string];
  icon: ServiceId;
  size: BentoSize;
};

export const services: Service[] = [
  {
    id: "automation",
    title: "Automation with n8n",
    description:
      "Self-hosted workflows that connect the tools you already pay for — so leads, follow-ups, and reports move without you.",
    bullets: [
      "Lead capture → CRM sync, WhatsApp & email auto-responders",
      "AI agent nodes, scheduled reporting, invoice follow-ups",
      "API glue between the stack your business already runs",
    ],
    icon: "automation",
    size: "hero",
  },
  {
    id: "web",
    title: "Web Design & Development",
    description:
      "Landing pages, business sites, and shops that load fast and convert — built in React, Next.js, Shopify, or WordPress.",
    bullets: [
      "Landing pages, business sites, and e-commerce",
      "Next.js / React builds, Shopify & WordPress",
      "Core Web Vitals tuning so Google and visitors stay",
    ],
    icon: "web",
    size: "mid",
  },
  {
    id: "ads",
    title: "Paid Ads (Performance Marketing)",
    description:
      "Meta and Google campaigns with funnels, retargeting, and tracking that actually ties spend to revenue.",
    bullets: [
      "Meta Ads and Google Ads setup & management",
      "Funnel design and retargeting sequences",
      "Conversion tracking you can trust",
    ],
    icon: "ads",
    size: "mid",
  },
  {
    id: "seo",
    title: "SEO & Organic Growth",
    description:
      "Technical foundations and local visibility so the right people find you without paying for every click.",
    bullets: [
      "Technical audits and on-page optimisation",
      "Local SEO and Google Business Profile",
      "Keyword strategy that matches search intent",
    ],
    icon: "seo",
    size: "small",
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "A consistent presence that compounds — calendars, short-form, community, and creator coordination.",
    bullets: [
      "Content calendars and reels / short-form",
      "Community management that actually replies",
      "Influencer coordination when it fits the brand",
    ],
    icon: "social",
    size: "small",
  },
  {
    id: "ai",
    title: "AI & Chatbots",
    description:
      "Assistants that qualify leads and answer the same questions at 2am — on your site or on WhatsApp.",
    bullets: [
      "Website chat assistants and WhatsApp bots",
      "RAG over your business docs, not generic answers",
      "Lead qualification that hands warm chats to you",
    ],
    icon: "ai",
    size: "small",
  },
];

export const alsoAvailable = [
  "Branding & Logo",
  "Content Writing",
  "Email Marketing",
  "Analytics Dashboards",
  "Google Business Profile",
  "Maintenance Retainers",
] as const;
