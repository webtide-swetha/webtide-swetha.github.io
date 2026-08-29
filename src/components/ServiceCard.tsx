import { useRef, type MouseEvent } from "react";
import {
  Bot,
  Globe,
  Megaphone,
  Search,
  Share2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Service, ServiceId } from "../data/services";
import { cn } from "../lib/cn";

const icons: Record<ServiceId, LucideIcon> = {
  seo: Search,
  ads: Megaphone,
  web: Globe,
  automation: Workflow,
  social: Share2,
  ai: Bot,
};

type Props = { service: Service };

export function ServiceCard({ service }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Icon = icons[service.icon];
  const hero = service.size === "hero";

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${event.clientX - box.left}px`);
    el.style.setProperty("--glow-y", `${event.clientY - box.top}px`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-navy-700 bg-navy-800 p-6 transition-[transform,border-color] duration-200 sm:p-8",
        "hover:-translate-y-1 hover:border-teal-400",
        hero && "min-h-[280px] lg:min-h-full",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(43,163,184,0.18), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col">
        <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl border border-navy-700 bg-navy-900 text-teal-300">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-text-hi sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-lo sm:text-[0.95rem]">
          {service.description}
        </p>
        <ul className="mt-5 space-y-2 text-sm text-text-lo">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
