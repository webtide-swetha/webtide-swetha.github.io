import { brand } from "../data/brand";
import {
  chatConfig,
  chatSystemPrompt,
  localFallbackReply,
  localFaqRules,
} from "../data/chat";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

const STORAGE_KEY = "webtide-chat";

export function loadChat(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [greeting()];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) && parsed.length ? parsed : [greeting()];
  } catch {
    return [greeting()];
  }
}

export function saveChat(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    /* ignore quota */
  }
}

export function greeting(): ChatMessage {
  return {
    role: "assistant",
    content: `Hi — I am the ${brand.name} assistant. I can walk you through services, starting prices, n8n automation, and how to reach ${brand.founder}. What would you like to know?`,
  };
}

export function whatsappNudge(): ChatMessage {
  return {
    role: "assistant",
    content: `If this is starting to feel like a real project, WhatsApp ${brand.founder} directly: ${brand.whatsappUrl} — she replies herself.`,
  };
}

export function matchLocalReply(input: string): string {
  const text = input.toLowerCase();
  const scored = localFaqRules
    .map((rule) => ({
      rule,
      score: rule.keywords.filter((kw) => text.includes(kw)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored[0] && scored[0].score > 0 ? scored[0].rule.reply : localFallbackReply;
}

export function linkify(text: string): { type: "text" | "link"; value: string }[] {
  const regex = /(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(\+91\s?)?\d[\d\s]{8,}\d)/gi;
  const parts: { type: "text" | "link"; value: string }[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    if (match.index > last) {
      parts.push({ type: "text", value: text.slice(last, match.index) });
    }
    parts.push({ type: "link", value: match[0] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts.length ? parts : [{ type: "text", value: text }];
}

export function hrefFor(value: string): string {
  if (value.includes("@") && !value.startsWith("http")) return `mailto:${value}`;
  if (value.startsWith("http")) return value;
  const digits = value.replace(/\s/g, "");
  if (digits.startsWith("+")) return `https://wa.me/${digits.replace(/\D/g, "")}`;
  return `https://wa.me/${digits.replace(/\D/g, "")}`;
}

export async function streamAssistant(
  messages: ChatMessage[],
  onToken: (chunk: string) => void,
  signal: AbortSignal,
): Promise<boolean> {
  const endpoint = import.meta.env.VITE_CHAT_ENDPOINT?.trim();
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: chatConfig.model,
      messages: [{ role: "system", content: chatSystemPrompt }, ...messages],
      stream: true,
    }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error("chat endpoint failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let received = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") continue;
      try {
        const json = JSON.parse(data) as {
          choices?: { delta?: { content?: string }; message?: { content?: string } }[];
        };
        const token =
          json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.message?.content ?? "";
        if (token) {
          received = true;
          onToken(token);
        }
      } catch {
        onToken(data);
        received = true;
      }
    }
  }

  return received;
}

export { chatConfig };
