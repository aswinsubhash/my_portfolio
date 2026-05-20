"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navSections, personal } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
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
  }, []);

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
            {personal.name.split(" ")[0]}
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
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={personal.resume}
            download
            className="inline-flex h-8 items-center gap-1.5 rounded border border-accent/50 bg-accent/10 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent/20"
          >
            Resume
          </a>
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
            <a
              href={personal.resume}
              download
              onClick={() => setOpen(false)}
              className="mt-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
            >
              Download Resume
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
