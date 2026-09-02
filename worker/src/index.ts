/**
 * Cloudflare Worker — OpenRouter proxy for the QUVO chat widget.
 *
 * Secrets (wrangler secret put):
 *   OPENROUTER_API_KEY
 *
 * The front-end MUST call this Worker (VITE_CHAT_ENDPOINT). Never ship the key
 * in the Vite bundle.
 */

const ALLOWED_ORIGINS = [
  "https://quvo-swetha.github.io",
  "https://webtide-swetha.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const MAX_BODY_BYTES = 16_384;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

const hits = new Map<string, number[]>();

export interface Env {
  OPENROUTER_API_KEY: string;
}

function cors(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = cors(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, headers);
    }

    if (rateLimited(clientIp(request))) {
      return json({ error: "Too many requests" }, 429, headers);
    }

    const raw = await request.arrayBuffer();
    if (raw.byteLength > MAX_BODY_BYTES) {
      return json({ error: "Payload too large" }, 413, headers);
    }

    let body: {
      model?: string;
      messages?: { role: string; content: string }[];
      stream?: boolean;
    };
    try {
      body = JSON.parse(new TextDecoder().decode(raw)) as typeof body;
    } catch {
      return json({ error: "Invalid JSON" }, 400, headers);
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: "messages required" }, 400, headers);
    }

    const model = typeof body.model === "string" ? body.model : "meta-llama/llama-3.1-8b-instruct";

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://quvo-swetha.github.io/",
        "X-Title": "QUVO",
      },
      body: JSON.stringify({
        model,
        messages: body.messages,
        stream: body.stream !== false,
        max_tokens: 512,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      return json({ error: "Upstream error" }, 502, headers);
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream",
        "Cache-Control": "no-store",
      },
    });
  },
};

function json(data: unknown, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
