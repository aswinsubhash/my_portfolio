"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Stagger, useRevealVariants } from "@/components/ui/reveal";
import { useContent } from "@/lib/useContent";

export function About() {
  const { personal, skills, ui } = useContent();
  const spec = ui.about_spec;
  const fadeStart = useRevealVariants("fadeStart");
  const blurIn = useRevealVariants("blurIn");
  const scaleIn = useRevealVariants("scaleIn");
  const fadeEnd = useRevealVariants("fadeEnd");
  const reduce = useReducedMotion();

  return (
    <Section
      id="about"
      eyebrow={ui.about.eyebrow}
      eyebrowSigil="$"
      title={ui.about.title}
    >
      <Stagger className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20" delayChildren={0.12}>
        <motion.div variants={fadeStart} className="flex flex-col gap-6">
          <motion.p variants={blurIn} className="text-[15px] leading-relaxed text-fg-muted">
            {personal.bio}
          </motion.p>
          <motion.div
            variants={scaleIn}
            className="motion-card mt-2 overflow-hidden rounded-[var(--radius-card)] border border-border"
          >
            {[
              { k: spec.base, v: personal.location },
              { k: spec.focus, v: spec.focusVal },
              { k: spec.experience, v: spec.expVal },
              { k: spec.platforms, v: spec.platformsVal },
              { k: spec.status, v: spec.available },
            ].map(({ k, v }, i) => (
              <div
                key={k}
                className={`flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm ${i < 4 ? "border-b border-border" : ""}`}
              >
                <span className="text-[12px] tracking-tight text-fg-subtle">{k}</span>
                <span className="flex items-center gap-2 text-[13px]">
                  <span className="text-accent" aria-hidden="true">
                    =
                  </span>
                  <span className={`font-medium ${i === 4 ? "text-success" : "text-fg"}`}>
                    {v}
                  </span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex flex-col divide-y divide-border border-t border-border">
          <Stagger stagger={0.08} delayChildren={0.2}>
            {skills.map((group, i) => (
              <motion.div
                key={i}
                variants={fadeEnd}
                className="grid grid-cols-[100px_1fr] items-start gap-4 py-3 sm:grid-cols-[120px_1fr]"
              >
                <span className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                  <span className="text-accent/70" aria-hidden="true">
                    [
                  </span>
                  {group.group}
                  <span className="text-accent/70" aria-hidden="true">
                    ]
                  </span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((s, j) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.85, y: reduce ? 0 : 6 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduce ? 0.01 : 0.4,
                        delay: reduce ? 0 : i * 0.06 + j * 0.03,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="motion-chip skill-chip-pop inline-flex items-center rounded-sm border border-border bg-bg-elev/50 px-2.5 py-0.5 font-mono text-[11px] tracking-tight text-fg-muted hover:border-accent/50 hover:bg-accent-dim hover:text-fg hover:shadow-[0_0_12px_-4px_var(--color-accent-glow)]"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </Stagger>
    </Section>
  );
}
