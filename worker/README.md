# QUVO chat proxy (Cloudflare Worker)

This Worker holds the OpenRouter API key and is the only thing the landing page talks to.

## Deploy

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler secret put OPENROUTER_API_KEY
wrangler deploy
```

Copy the printed `*.workers.dev` URL into the GitHub repository variable `VITE_CHAT_ENDPOINT` (and into `.env.local` for local preview).

Also set a **hard spend limit** on the OpenRouter key in the OpenRouter dashboard.

## Local

```bash
cd worker
wrangler dev
```

Then set `VITE_CHAT_ENDPOINT=http://127.0.0.1:8787` in `.env.local`.
