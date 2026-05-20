"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { education } from "@/lib/content";

export function Education() {
  return (
    <Section id="education" eyebrow="04 · Education" title="Academic record.">
      <Stagger className="grid gap-4 md:grid-cols-3">
          {education.map((e) => (
            <motion.article
              key={e.institution}
              variants={itemVariants}
              className="card-accent group flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-6 transition-all duration-200 hover:border-accent/30"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-accent/10 text-accent">
                <GraduationCap size={15} />
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
