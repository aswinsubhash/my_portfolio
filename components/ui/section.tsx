import * as React from "react";
import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  eyebrow?: string;
  eyebrowSigil?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
};

export function Section({
  id,
  eyebrow,
  eyebrowSigil,
  title,
  description,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-20 px-6 py-24 sm:py-32", className)}
      {...rest}
    >
      <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-12", containerClassName)}>
        {(eyebrow || title || description) && (
          <header className="flex flex-col gap-3">
            {eyebrow && (
              eyebrowSigil ? (
                <span className="eyebrow eyebrow--prompt">
                  <span className="eyebrow__sigil">{eyebrowSigil}</span>
                  {eyebrow}
                </span>
              ) : (
                <span className="eyebrow">{eyebrow}</span>
              )
            )}
            {title && (
              <h2 className="font-display text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-fg-muted">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
