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
        "inline-flex items-center rounded-full border border-border bg-bg-elev/60 px-3 py-1 font-mono text-[11px] tracking-tight text-fg-muted transition-colors duration-150 hover:border-border-strong hover:text-fg",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
