import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    asChild?: boolean;
    href?: string;
  };

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong focus-visible:outline-accent",
  secondary:
    "bg-bg-elev text-fg border border-border-strong hover:border-fg-muted hover:bg-bg-soft",
  ghost: "text-fg-muted hover:text-fg hover:bg-bg-elev",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(function Button({ variant = "primary", className, href, ...rest }, ref) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-150 will-change-transform active:scale-[0.98]",
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
