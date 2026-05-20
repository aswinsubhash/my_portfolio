"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 · Experience"
      title="Where I've built."
    >
      <Stagger className="relative pl-4 md:pl-8">
          {/* Vertical trace line */}
          <span
            aria-hidden
            className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-accent/60 via-border-strong to-transparent"
          />
          <ol className="flex flex-col gap-12">
            {experience.map((exp, idx) => (
              <motion.li
                key={exp.company + exp.duration}
                variants={itemVariants}
                className="relative"
              >
                {/* Circuit node */}
                <span
                  aria-hidden
                  className="absolute -left-[17px] top-1.5 flex h-4 w-4 items-center justify-center md:-left-[25px]"
                >
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
                </span>

                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-fg">
                        {exp.role}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-fg-muted">
                        {exp.company}
                        <span className="mx-2 text-border-strong">·</span>
                        {exp.location}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2">
                    {exp.description.map((d, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-fg-muted">
                        <span aria-hidden className="mt-[9px] inline-block h-px w-4 shrink-0 bg-accent/40" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector trace to next */}
                {idx < experience.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -left-[13px] top-8 h-full w-px bg-border md:-left-[21px]"
                  />
                )}
              </motion.li>
            ))}
          </ol>
      </Stagger>
    </Section>
  );
}
