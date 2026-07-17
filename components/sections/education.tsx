"use client";

import { motion, useReducedMotion } from "motion/react";
import { Student } from "@phosphor-icons/react";
import { Section } from "@/components/ui/section";
import { Stagger } from "@/components/ui/reveal";
import { useContent } from "@/lib/useContent";

export function Education() {
  const { education, ui } = useContent();
  const reduce = useReducedMotion();

  return (
    <Section id="education" title={ui.education.title}>
      <Stagger className="flex flex-col gap-3" delayChildren={0.08} stagger={0.08}>
        {education.map((e, i) => (
          <motion.article
            key={e.institution}
            initial={{ opacity: 0, x: reduce ? 0 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduce ? 0.01 : 0.5,
              delay: reduce ? 0 : i * 0.06,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="motion-card group grid gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card/60 px-5 py-5 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:gap-8 sm:px-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent/80">
              {e.duration}
            </span>

            <div className="min-w-0 flex flex-col gap-1.5">
              <h3 className="font-display text-base font-semibold tracking-tight text-fg sm:text-lg">
                {e.institution}
              </h3>
              <p className="text-[13px] leading-relaxed text-fg-muted">{e.degree}</p>
            </div>

            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-accent/10 text-accent transition-transform group-hover:scale-105">
              <Student size={16} weight="regular" aria-hidden="true" />
            </span>
          </motion.article>
        ))}
      </Stagger>
    </Section>
  );
}
