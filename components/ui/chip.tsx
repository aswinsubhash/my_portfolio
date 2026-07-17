import * as React from "react";
import { cn } from "@/lib/cn";

export function Chip({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "motion-chip inline-flex items-center rounded-sm border border-border bg-bg-elev/50 px-2.5 py-0.5 font-mono text-[11px] tracking-tight text-fg-muted transition-colors duration-150 hover:border-accent/50 hover:bg-accent-dim hover:text-fg hover:shadow-[0_0_12px_-4px_var(--color-accent-glow)]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
