import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Logo } from "../Logo";
import { brand } from "../../data/brand";
import { chatSuggestions } from "../../data/chat";
import {
  chatConfig,
  hrefFor,
  linkify,
  loadChat,
  saveChat,
  streamAssistant,
  whatsappNudge,
  type ChatMessage,
} from "../../lib/chat";
import { cn } from "../../lib/cn";

type Props = { onClose: () => void };

export function ChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChat());
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const lastSend = useRef(0);
  const userTurns = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    saveChat(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim().slice(0, chatConfig.maxInputChars);
    if (!trimmed) return;
    const now = Date.now();
    if (now - lastSend.current < chatConfig.debounceMs) return;
    lastSend.current = now;
    if (userTurns >= chatConfig.maxTurns || sentCount >= chatConfig.sessionMessageLimit) {
      setError("This chat has reached its limit for the session. WhatsApp Swetha to continue.");
      return;
    }

    const nextUser: ChatMessage = { role: "user", content: trimmed };
    const history = [...messages, nextUser];
    setMessages(history);
    setInput("");
    setTyping(true);
    setError(null);
    setSentCount((n) => n + 1);

    let assistant = "";
    const abort = new AbortController();
    const timeout = window.setTimeout(() => abort.abort(), 45000);

    const applyAssistant = (content: string) => {
      setMessages([...history, { role: "assistant", content }]);
    };

    const offline =
      "The Grok assistant is not connected yet. WhatsApp Swetha at " +
      `${brand.whatsappUrl} or email ${brand.email}.`;

    try {
      const streamed = await streamAssistant(
        history,
        (chunk) => {
          assistant += chunk;
          applyAssistant(assistant);
        },
        abort.signal,
      );
      if (!streamed && !assistant) {
        applyAssistant(offline);
      }
    } catch {
      applyAssistant(offline);
    } finally {
      window.clearTimeout(timeout);
      setTyping(false);
      const exchanges = history.filter((m) => m.role === "user").length;
      if (exchanges === chatConfig.offerWhatsappAfterExchanges) {
        setMessages((current) => [...current, whatsappNudge()]);
      }
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-navy-700 px-4 py-3">
        <Logo className="h-8 w-10" title="WebTide" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-text-hi">WebTide Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-text-lo">
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </p>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-text-hi cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          aria-label="Close chat"
          onClick={onClose}
        >
          ×
        </button>
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4" tabIndex={0}>
        <ul className="space-y-3">
          {messages.map((message, index) => (
            <li
              key={`${message.role}-${index}`}
              className={cn(
                "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                message.role === "user"
                  ? "ml-auto bg-teal-400 text-navy-900"
                  : "bg-navy-900 text-text-lo",
              )}
            >
              {message.role === "assistant" ? (
                <RichText text={message.content} />
              ) : (
                message.content
              )}
            </li>
          ))}
          {typing ? (
            <li className="flex gap-1 rounded-2xl bg-navy-900 px-3 py-3 w-16" aria-label="Assistant is typing">
              <span className="size-1.5 animate-bounce rounded-full bg-teal-300 [animation-delay:-0.2s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-teal-300" />
              <span className="size-1.5 animate-bounce rounded-full bg-teal-300 [animation-delay:0.2s]" />
            </li>
          ) : null}
        </ul>
        {messages.length <= 2 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chatSuggestions.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-navy-700 px-3 py-2 text-left text-xs text-text-lo hover:border-teal-400 hover:text-text-hi cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                onClick={() => void send(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-navy-700 p-3">
        {error ? (
          <p className="mb-2 text-xs text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex items-end gap-2">
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <textarea
            id="chat-input"
            rows={1}
            maxLength={chatConfig.maxInputChars}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about services, pricing, n8n…"
            className="min-h-11 flex-1 resize-none rounded-xl border border-navy-700 bg-navy-900 px-3 py-2.5 text-sm text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          />
          <button
            type="submit"
            className="inline-flex size-11 items-center justify-center rounded-full bg-teal-400 text-navy-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
            aria-label="Send message"
            disabled={typing}
          >
            <Send className="size-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  return (
    <>
      {linkify(text).map((part, index) =>
        part.type === "link" ? (
          <a
            key={`${part.value}-${index}`}
            href={hrefFor(part.value)}
            className="underline underline-offset-2 text-teal-300"
            target="_blank"
            rel="noreferrer"
          >
            {part.value}
          </a>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </>
  );
}
