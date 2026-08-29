import { cn } from "../lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
  id?: string;
};

export function SectionHeading({ eyebrow, title, copy, light = false, id }: Props) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-[0.22em]",
            light ? "text-teal-400" : "text-teal-300",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-display text-[clamp(1.85rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]",
          light ? "text-navy-900" : "text-text-hi",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-xl text-base leading-relaxed",
            light ? "text-ice-muted" : "text-text-lo",
          )}
        >
          {copy}
        </p>
      ) : null}
    </header>
  );
}
