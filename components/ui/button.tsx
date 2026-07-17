import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    href?: string;
  };

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong focus-visible:outline-accent",
  secondary:
    "border border-border-strong bg-bg-elev text-fg-muted hover:border-accent/40 hover:text-fg",
  ghost: "text-fg-muted hover:text-accent",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(function Button({ variant = "primary", className, href, ...rest }, ref) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-sm px-5 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.98]",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...rest}
      />
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...rest}
    />
  );
});
