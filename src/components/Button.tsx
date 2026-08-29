import { type MouseEventHandler, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { duration, easeOutExpo } from "../lib/motion";

type Variant = "primary" | "ghost" | "ice";

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-400 text-navy-900 hover:bg-teal-300 shadow-[0_0_0_0_rgba(43,163,184,0)] hover:shadow-[0_0_32px_rgba(43,163,184,0.45)]",
  ghost:
    "bg-transparent text-text-hi border border-navy-700 hover:border-teal-400 hover:text-teal-300",
  ice: "bg-navy-900 text-text-hi hover:bg-navy-800",
};

export function Button({
  className,
  variant = "primary",
  href,
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium tracking-tight transition-[box-shadow,background-color,border-color,color] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: duration.tap, ease: easeOutExpo }}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: duration.tap, ease: easeOutExpo }}
    >
      {children}
    </motion.button>
  );
}
