"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? theme;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-fg-muted transition-all hover:border-accent/50 hover:text-accent"
    >
      <Sun size={14} className="hidden dark:block" />
      <Moon size={14} className="block dark:hidden" />
    </button>
  );
}
