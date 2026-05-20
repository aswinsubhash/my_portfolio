"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { useContent } from "@/lib/useContent";

export function Education() {
  const { education, ui } = useContent();

  return (
    <Section id="education" eyebrow={ui.education.eyebrow} eyebrowSigil="~/" title={ui.education.title}>
      <Stagger className="grid gap-4 md:grid-cols-3">
          {education.map((e) => (
            <motion.article
              key={e.institution}
              variants={itemVariants}
              className="card-accent motion-card group flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-6 hover:border-accent/30 hover:shadow-[0_0_24px_-14px_var(--color-accent-glow)]"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-accent/10 text-accent">
                <GraduationCap size={15} aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold leading-snug text-fg">
                  {e.institution}
                </h3>
                <p className="text-[13px] leading-relaxed text-fg-muted">{e.degree}</p>
                <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.16em] text-accent/70">
                  {e.duration}
                </p>
              </div>
            </motion.article>
          ))}
      </Stagger>
    </Section>
  );
}
