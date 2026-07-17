"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { createRevealVariants, revealViewport } from "@/components/ui/reveal";

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
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "section-shell relative scroll-mt-20 px-6 pt-24 pb-28 sm:pt-32 sm:pb-36",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="section-divider pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="section-vignette pointer-events-none absolute inset-0 -z-10"
      />

      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-12",
          containerClassName,
        )}
      >
        {(eyebrow || title || description) && (
          <header className="relative flex flex-col gap-3">
            {eyebrow && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                variants={createRevealVariants(reduce, "fadeStart")}
                transition={{ delay: reduce ? 0 : 0.05 }}
              >
                {eyebrowSigil ? (
                  <span className="eyebrow eyebrow--prompt">
                    <span className="eyebrow__sigil">{eyebrowSigil}</span>
                    {eyebrow}
                  </span>
                ) : (
                  <span className="eyebrow">{eyebrow}</span>
                )}
              </motion.div>
            )}
            {title && (
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                variants={createRevealVariants(reduce, "fadeUp")}
                transition={{ delay: reduce ? 0 : 0.1 }}
                className="font-display text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl lg:text-[3.25rem]"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                variants={createRevealVariants(reduce, "fadeUp")}
                transition={{ delay: reduce ? 0 : 0.18 }}
                className="max-w-2xl text-pretty text-[15px] leading-relaxed text-fg-muted"
              >
                {description}
              </motion.p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
