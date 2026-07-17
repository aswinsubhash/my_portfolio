"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Section } from "@/components/ui/section";
import { Stagger, useRevealVariants } from "@/components/ui/reveal";
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
  const reduce = useReducedMotion();
  const fadeStart = useRevealVariants("fadeStart");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <Section
      id="experience"
      title={ui.experience.title}
    >
      <Stagger
        ref={containerRef}
        className="relative ps-4 md:ps-8"
        delayChildren={0.1}
      >
        <motion.span
          aria-hidden
          style={{ scaleY: reduce ? 1 : lineScale }}
          className="timeline-line absolute start-0 top-3 bottom-3 w-px origin-top bg-gradient-to-b from-accent/60 via-border-strong to-transparent"
        />
        <ol className="flex flex-col gap-12">
          {experience.map((exp, idx) => (
            <motion.li
              key={idx}
              variants={fadeStart}
              className="group relative"
            >
              <span
                aria-hidden
                className="absolute -start-[17px] top-1.5 flex h-4 w-4 items-center justify-center md:-start-[25px]"
              >
                <motion.span
                  initial={{ scale: reduce ? 1 : 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 22,
                    delay: reduce ? 0 : idx * 0.1,
                  }}
                  className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg shadow-[0_0_8px_var(--color-accent-glow)] transition-shadow group-hover:shadow-[0_0_14px_var(--color-accent-glow)]"
                />
              </span>

              <div className="flex flex-col gap-4 rounded-sm border border-transparent p-2 -m-2 transition-colors group-hover:border-accent/10 group-hover:bg-accent/[0.02]">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: reduce ? 0 : 0.1 + idx * 0.08 }}
                      className="commit-hash"
                    >
                      {shortHash(exp.company + exp.duration)}
                    </motion.span>
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
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: reduce ? 0 : -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduce ? 0.01 : 0.4,
                        delay: reduce ? 0 : 0.15 + i * 0.06,
                      }}
                      className="flex gap-3 text-[14px] leading-relaxed text-fg-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] inline-block h-px w-4 shrink-0 bg-accent/40"
                      />
                      <span>{d}</span>
                    </motion.li>
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
