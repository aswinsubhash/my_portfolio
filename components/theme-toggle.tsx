"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const currentTheme = resolvedTheme ?? theme;
  const isDark = mounted && currentTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("theme-flash");
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-flash");
      }, 220);
    }
  };

  return (
    <button
      type="button"
      dir="ltr"
      aria-label={label}
      aria-pressed={isDark}
      onClick={handleToggle}
      className={cn(
        "group relative inline-flex h-8 w-14 items-center rounded-sm border border-border bg-bg-elev p-1 text-fg-muted transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_24px_-14px_var(--color-accent-glow)]",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="absolute inset-y-1 start-1 w-6 rounded-[2px] bg-amber-300/10 transition-opacity duration-300 dark:opacity-0"
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-1 end-1 w-6 rounded-[2px] bg-sky/10 opacity-0 transition-opacity duration-300 dark:opacity-100"
      />
      <motion.span
        aria-hidden="true"
        className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-[2px] border border-accent/35 bg-bg-card text-accent shadow-[0_4px_18px_-10px_var(--color-accent-glow)]"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      >
        <motion.span
          className="absolute"
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -80 : 0,
            scale: isDark ? 0.55 : 1,
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Sun size={13} weight="bold" />
        </motion.span>
        <motion.span
          className="absolute"
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 80,
            scale: isDark ? 1 : 0.55,
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Moon size={13} weight="bold" />
        </motion.span>
      </motion.span>
    </button>
  );
}
