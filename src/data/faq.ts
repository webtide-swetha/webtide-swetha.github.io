export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "timeline",
    question: "How long does a website take?",
    answer:
      "A focused landing page is usually about 1–2 weeks. A full business site is closer to 3–5 weeks, depending on copy, pages, and how quickly feedback comes back. Automation setup is typically 1–2 weeks for a first workflow. These are estimates — Swetha will confirm after the discovery call.",
  },
  {
    id: "geo",
    question: "Do you work with businesses across Tamil Nadu?",
    answer:
      "Yes. Typical clients are in Coimbatore, Tiruppur, Chennai, and nearby. Calls are usually over WhatsApp or Google Meet. If you are elsewhere in India, remote work is still possible — Swetha will confirm on the discovery call.",
  },
  {
    id: "n8n",
    question: "What is n8n automation in plain English?",
    answer:
      "n8n is a workflow tool you host yourself. It watches for something to happen — a form fill, a payment, a new row in a sheet — then does the next steps: add the person to your CRM, send a WhatsApp, alert the team, write a weekly report. You keep paying for the tools you already use; n8n is the glue so nobody has to copy-paste between them.",
  },
  {
    id: "hosting",
    question: "Do you handle hosting and domains?",
    answer:
      "Yes, if you want. Swetha can register or connect a domain, set up hosting (including GitHub Pages, Vercel, or a VPS for n8n), and hand you the logins. If you already have hosting, the site can live there instead.",
  },
  {
    id: "retainer",
    question: "What does a monthly retainer include?",
    answer:
      "It depends on the package. Growth typically covers ads management, a social cadence, and a monthly performance note. Automate monthly covers hosting the workflows, small changes, and keeping integrations healthy. Exact hours and channels are written into the quote so there are no surprises.",
  },
  {
    id: "start",
    question: "How do we start?",
    answer:
      "Send a note through the form, WhatsApp, or email. Share what you sell, what is broken today, and a rough budget. Swetha replies with questions or a short call invite, then a scoped quote. No work starts until you approve the scope.",
  },
  {
    id: "copy",
    question: "Do I need to write the website copy myself?",
    answer:
      "You can, but you do not have to. Content writing is available as an add-on. Even on a build-only project, Swetha will structure pages so the message is clear — you will still need to confirm facts about the business.",
  },
  {
    id: "stack",
    question: "Can you work with the tools we already pay for?",
    answer:
      "That is the point of the automation work. CRM, WhatsApp Business, email, Sheets, Shopify, WordPress — if it has an API or a webhook, it can usually be connected. The discovery call lists what you already use so we do not sell you another subscription.",
  },
];
