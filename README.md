# QUVO

Freelance digital-services landing page for **QUVO**, run by **Swetha**. Live at [https://quvo-swetha.github.io/](https://quvo-swetha.github.io/).

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

The live chatbot reads `OPENROUTER_API_KEY` from a **GitHub Actions encrypted secret** at build time. Do not commit the key in a file.

| Variable | Where | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | GitHub → Settings → Secrets and variables → Actions → **Secret** | Encrypted OpenRouter key for the live assistant |
| `VITE_CHAT_ENDPOINT` | `.env.local` and GitHub **repository variable** | Optional Cloudflare Worker URL |
| `VITE_FORM_ENDPOINT` | same | Formspree `https://formspree.io/f/xxxx` or Web3Forms `https://api.web3forms.com/submit` |
| `VITE_FORM_ACCESS_KEY` | same, only for Web3Forms | Public access key (restrict by domain in their dashboard) |

If OpenRouter is unset or the request fails, the chat widget uses a local keyword FAQ so the site never looks broken.

If `VITE_FORM_ENDPOINT` is empty, the contact form falls back to a `mailto:` link.

Set a **hard spend limit** on the OpenRouter key in the OpenRouter dashboard.

## GitHub Pages

This is a **user site** (`quvo-swetha.github.io`), so Vite `base` is `/`.

1. Push `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions → add secret `OPENROUTER_API_KEY`.
4. The workflow in `.github/workflows/deploy.yml` builds on Node 20 and deploys `dist/`.

## Stack

Vite + React + TypeScript, Tailwind v4, Motion, Lucide.
Deployment update
