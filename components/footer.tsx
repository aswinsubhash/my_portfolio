"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useContent } from "@/lib/useContent";

export function Footer() {
  const { personal } = useContent();
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date());

  return (
    <footer className="relative border-t border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded border border-accent/40 bg-accent/10 font-mono text-[10px] font-bold text-accent">
              A
            </span>
            <p className="font-mono text-[11px] text-fg-subtle">
              <span className="footer-prompt text-accent">$</span> whoami{" "}
              <span className="text-fg-muted">
                - {personal.name}, ©{" "}
                <motion.span
                  key={year}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {year}
                </motion.span>
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { href: personal.github, label: "GitHub", icon: <FaGithub size={13} /> },
              { href: personal.linkedin, label: "LinkedIn", icon: <FaLinkedinIn size={12} /> },
            ].map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, borderColor: "rgba(96, 165, 250, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-fg-muted transition-colors hover:text-accent"
              >
                <span aria-hidden="true">{icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border pt-4 sm:justify-start">
          <Link
            href="/privacy"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle transition-colors hover:text-accent"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle transition-colors hover:text-accent"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
