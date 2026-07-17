"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { personal } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import { useContent } from "@/lib/useContent";
import { useWindowScroll } from "@/lib/use-window-scroll";
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
  const rootRef = React.useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative flex h-8 items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-accent/50 bg-accent/10 px-3 font-mono text-[11px] tracking-wide text-accent transition-colors hover:bg-accent/20"
      >
        {current.label}
        <motion.span
          className="inline-flex"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretDown size={10} weight="bold" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="absolute end-0 top-[calc(100%+4px)] z-50 min-w-[168px] overflow-hidden rounded-sm border border-border bg-bg-card/95 py-1 shadow-[0_8px_32px_-10px_rgba(10,12,16,0.55),0_0_0_1px_rgba(96,165,250,0.08)] backdrop-blur-sm before:absolute before:inset-x-0 before:-top-1 before:h-1 before:content-['']"
          >
            {LANGS.map(({ code, label, native }, i) => (
              <motion.button
                key={code}
                type="button"
                role="option"
                aria-selected={lang === code}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  switchTo(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left font-mono text-[11px] transition-colors hover:bg-accent-dim",
                  lang === code ? "bg-accent/10 text-accent" : "text-fg-muted",
                )}
              >
                <span className="text-accent/50" aria-hidden="true">
                  •
                </span>
                <span className="w-5 uppercase tracking-[0.12em]">{label}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    lang === code ? "text-accent/70" : "text-fg-subtle",
                  )}
                >
                  {native}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const { lang, switchTo } = useLang();
  const { navSections } = useContent();
  const { scrollY } = useWindowScroll();

  const scrolled = scrollY > 20;
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("home");

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [navSections]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#home" aria-label="Home" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/40 bg-accent/10 font-mono text-xs font-bold text-accent">
            A
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-fg sm:block">
            {personal.name}
            <span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden items-center lg:flex">
          {navSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "relative px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-150",
                active === id ? "text-accent" : "text-fg-muted hover:text-fg",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-sm border border-accent/35 bg-accent/12"
                  transition={{ type: "spring", stiffness: 900, damping: 42, mass: 0.35 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-1.5 bottom-0 h-0.5 rounded-full bg-accent"
                  />
                </motion.span>
              )}
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex [&>*]:shrink-0">
          <LangSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-fg-muted transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
        >
          {open ? <X size={16} weight="bold" aria-hidden="true" /> : <List size={16} weight="bold" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navSections.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-sm px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                    active === id
                      ? "border border-accent/35 bg-accent/12 text-accent"
                      : "border border-transparent text-fg-muted",
                  )}
                >
                  {label}
                </motion.a>
              ))}
              <div className="mt-3 flex items-center gap-3">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      switchTo(code);
                      setOpen(false);
                    }}
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
      </AnimatePresence>
    </header>
  );
}
