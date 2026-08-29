export type Project = {
  id: string;
  client: string;
  location: string;
  clientType: string;
  thumbnailLabel: string;
  visual: "leads" | "store" | "seo";
  problem: string;
  whatWasDone: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    client: "Lakshmi Selvam",
    location: "Coimbatore",
    clientType: "Home painting · Coimbatore",
    thumbnailLabel: "Lead recovery flow",
    visual: "leads",
    problem:
      "Lakshmi’s painting crew was booked through WhatsApp, but weekend website forms sat in Gmail until Monday. By then the house owner had already called another contractor in Peelamedu or RS Puram.",
    whatWasDone:
      "A Tamil + English landing page, Google Business Profile for Coimbatore, and an n8n flow: form fill → sheet → WhatsApp reply in Tamil → alert to Lakshmi’s phone.",
    outcome:
      "After-hours enquiries now get a WhatsApp within minutes. Weekend leads stay with her instead of going to the next painter on Google.",
  },
  {
    id: "p2",
    client: "Divya Murugan",
    location: "Tiruppur",
    clientType: "Knitwear D2C · Tiruppur",
    thumbnailLabel: "Store + ads rebuild",
    visual: "store",
    problem:
      "Divya’s family unit in Tiruppur sold cotton sets on Instagram. Meta ads sent people to a slow homepage. Mobiles bounced, and carts from Chennai and Madurai buyers were never followed up.",
    whatWasDone:
      "Product landing pages for best-selling sets, a faster store, Meta campaigns aimed at Tamil Nadu cities, and a cart-recovery WhatsApp sequence in n8n.",
    outcome:
      "Paid traffic lands on the exact set they tapped — not a crowded catalogue — and abandoned carts get a Tamil WhatsApp the same evening.",
  },
  {
    id: "p3",
    client: "Senthil Iyer",
    location: "Chennai",
    clientType: "CA practice · T. Nagar, Chennai",
    thumbnailLabel: "Site, SEO, weekly digest",
    visual: "seo",
    problem:
      "The firm was invisible for “CA near T. Nagar”. New work arrived only through relatives and Instagram DMs. Partners had no list of who enquired that week.",
    whatWasDone:
      "A five-page site in English with Tamil contact copy, local SEO for Chennai, enquiry form to Sheets, and a Monday n8n digest for the partners.",
    outcome:
      "The practice now shows up for local CA searches, and Senthil gets one inbox of the week’s enquiries every Monday morning.",
  },
];
