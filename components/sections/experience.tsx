"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { useContent } from "@/lib/useContent";

function shortHash(input: string) {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export function Experience() {
  const { experience, ui } = useContent();

  return (
    <Section
      id="experience"
      eyebrow={ui.experience.eyebrow}
      eyebrowSigil="$"
      title={ui.experience.title}
    >
      <Stagger className="relative ps-4 md:ps-8">
          <span
            aria-hidden
            className="absolute start-0 top-3 bottom-3 w-px bg-gradient-to-b from-accent/60 via-border-strong to-transparent"
          />
          <ol className="flex flex-col gap-12">
            {experience.map((exp, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -start-[17px] top-1.5 flex h-4 w-4 items-center justify-center md:-start-[25px]"
                >
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
                </span>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <span className="commit-hash">{shortHash(exp.company + exp.duration)}</span>
                      <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-fg">
                        {exp.role}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-fg-muted">
                        {exp.company}
                        <span className="mx-2 text-border-strong">·</span>
                        {exp.location}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      <span className="text-fg-subtle">Date: </span>
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {exp.description.map((d, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-fg-muted">
                        <span aria-hidden className="mt-[9px] inline-block h-px w-4 shrink-0 bg-accent/40" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {idx < experience.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -start-[13px] top-8 h-full w-px bg-border md:-start-[21px]"
                  />
                )}
              </motion.li>
            ))}
          </ol>
      </Stagger>
    </Section>
  );
}
