import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { brand } from "../data/brand";
import { navLinks } from "../data/nav";

export function Footer() {
  return (
    <footer className="border-t border-navy-700 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 text-text-hi">
            <Logo className="h-10 w-10 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-tight">{brand.fullName}</span>
              <span className="mt-1 font-sans text-[0.68rem] font-medium tracking-[0.16em] text-text-lo uppercase">
                Digital Solutions
              </span>
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-text-lo">{brand.secondaryLine}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-lo">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-text-hi">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-wrap gap-4 text-sm text-text-lo">
          <li>
            <a href={brand.instagramUrl} rel="noreferrer" target="_blank" className="hover:text-text-hi">
              Instagram
            </a>
          </li>
          <li>
            <a href={brand.linkedinUrl} rel="noreferrer" target="_blank" className="hover:text-text-hi">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={brand.whatsappUrl} rel="noreferrer" target="_blank" className="hover:text-text-hi">
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between gap-4 border-t border-navy-700 pt-6 text-xs text-text-lo">
        <p>
          © 2026 {brand.fullName} · Built by {brand.founder}
        </p>
        <a
          href="#top"
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy-700 text-text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
