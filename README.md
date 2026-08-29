# WebTide Digital Solutions

Freelance digital-services landing page for **WebTide**, run by **Swetha**. Live at [https://webtide-swetha.github.io/](https://webtide-swetha.github.io/).

Dark-first navy/teal site: services (bento), n8n automation spotlight, process, pricing, contact, and a chat widget that talks to OpenRouter through a Cloudflare Worker.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:5173`.

```bash
npm run build
npm run preview
```

## Where to edit content

All copy lives in typed files under `src/data/` — you should not need to touch JSX for content:

| File | What it holds |
|---|---|
| `src/data/brand.ts` | Name, founder, email, phone, socials |
| `src/data/nav.ts` | Header / footer links |
| `src/data/services.ts` | Six services + “also available” chips |
| `src/data/process.ts` | Discover → Optimise steps |
| `src/data/projects.ts` | Tamil Nadu case snapshots |
| `src/data/pricing.ts` | Tiers, starting prices, budget ranges |
| `src/data/testimonials.ts` | Quotes from Coimbatore, Tiruppur, and Chennai clients |
| `src/data/faq.ts` | Accordion questions |
| `src/data/tools.ts` | Marquee tools |
| `src/data/chat.ts` | Bot system prompt, model ID, local FAQ fallback |

## Environment variables

Public URLs only. **Never** put an OpenRouter key in this repo, in `.env`, or in client code.

| Variable | Where | Purpose |
|---|---|---|
| `VITE_CHAT_ENDPOINT` | `.env.local` and GitHub **repository variable** | Cloudflare Worker URL |
| `VITE_FORM_ENDPOINT` | same | Formspree `https://formspree.io/f/xxxx` or Web3Forms `https://api.web3forms.com/submit` |
| `VITE_FORM_ACCESS_KEY` | same, only for Web3Forms | Public access key (restrict by domain in their dashboard) |

If `VITE_CHAT_ENDPOINT` is empty or the Worker fails, the chat widget uses a local keyword FAQ so the site never looks broken.

If `VITE_FORM_ENDPOINT` is empty, the contact form falls back to a `mailto:` link.

## Deploy the Cloudflare Worker (chat)

The Worker holds `OPENROUTER_API_KEY` as a secret, restricts `Origin` to the live site + local Vite, caps payload size, and rate-limits per IP.

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put OPENROUTER_API_KEY
npx wrangler deploy
```

Copy the `*.workers.dev` URL into GitHub → Settings → Variables → `VITE_CHAT_ENDPOINT`, and into `.env.local` for local testing.

Set a **hard spend limit** on the OpenRouter key in the OpenRouter dashboard.

Local Worker:

```bash
cd worker
npx wrangler dev
```

Then `VITE_CHAT_ENDPOINT=http://127.0.0.1:8787`.

## GitHub Pages

This is a **user site** (`webtide-swetha.github.io`), so Vite `base` is `/`.

1. Push `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Add repository variables `VITE_CHAT_ENDPOINT` and `VITE_FORM_ENDPOINT`.
4. The workflow in `.github/workflows/deploy.yml` builds on Node 20 and deploys `dist/`.

## Stack

Vite + React + TypeScript, Tailwind v4, Motion, Lucide.
