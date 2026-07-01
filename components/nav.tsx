"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { personal } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import { useContent } from "@/lib/useContent";
import { ThemeToggle } from "@/components/theme-toggle";

const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "ar", label: "AR", native: "العربية" },
  { code: "ja", label: "JA", native: "日本語" },
  { code: "de", label: "DE", native: "Deutsch" },
];

function LangSwitcher() {
  const { lang, switchTo } = useLang();
  const [open, setOpen] = React.useState(false);
  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div
      className="relative pb-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-8 items-center gap-1.5 rounded border border-accent/50 bg-accent/10 px-3 font-mono text-[11px] tracking-wide text-accent transition-colors hover:bg-accent/20"
      >
        {current.label}
        <ChevronDown size={10} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 min-w-[168px] overflow-hidden rounded border border-border bg-bg-card/95 py-1 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {LANGS.map(({ code, label, native }) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={lang === code}
              onClick={() => { switchTo(code); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2.5 text-left font-mono text-[11px] transition-colors hover:bg-accent-dim",
                lang === code ? "bg-accent/10 text-accent" : "text-fg-muted",
              )}
            >
              <span className="text-accent/50" aria-hidden="true">•</span>
              <span className="w-5 uppercase tracking-[0.12em]">{label}</span>
              <span className={cn("text-[10px]", lang === code ? "text-accent/70" : "text-fg-subtle")}>
                {native}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const { lang, switchTo } = useLang();
  const { navSections } = useContent();

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("home");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [navSections]);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
      scrolled
        ? "border-b border-border bg-bg/80 backdrop-blur-xl"
        : "border-b border-transparent bg-transparent",
    )}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" aria-label="Home" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/40 bg-accent/10 font-mono text-xs font-bold text-accent">
            A
          </span>
          <span className="font-display hidden text-sm font-semibold tracking-tight text-fg sm:block">
            {personal.name}
            <span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          {navSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "relative px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-150",
                active === id ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 border-b border-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LangSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-fg-muted transition-colors hover:border-accent/50 hover:text-accent md:hidden"
        >
          {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4 gap-1">
            {navSections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 font-mono text-[11px] uppercase tracking-[0.14em]",
                  active === id ? "text-accent" : "text-fg-muted",
                )}
              >
                {label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => { switchTo(code); setOpen(false); }}
                  className={cn(
                    "py-2 font-mono text-[11px] uppercase tracking-[0.14em]",
                    lang === code ? "text-accent" : "text-fg-muted",
                  )}
                >
                  {label}
                </button>
              ))}
              <ThemeToggle className="ms-auto" />
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
