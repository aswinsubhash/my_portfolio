"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { personal, skills } from "@/lib/content";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title="Engineer who ships."
    >
      <Stagger className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
          {/* Left — bio + spec table */}
          <div className="flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed text-fg-muted">
              {personal.bio}
            </p>
            <div className="mt-2 border border-border rounded-[var(--radius-card)] overflow-hidden">
              {[
                { k: "Base", v: personal.location },
                { k: "Focus", v: "Flutter · Dart" },
                { k: "Experience", v: "2.5+ years" },
                { k: "Platforms", v: "Android · iOS" },
                { k: "Status", v: "Available" },
              ].map(({ k, v }, i) => (
                <div
                  key={k}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${i < 4 ? "border-b border-border" : ""}`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                    {k}
                  </span>
                  <span className={`font-medium ${k === "Status" ? "text-success" : "text-fg"}`}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2-col spec rows */}
          <div className="flex flex-col divide-y divide-border border-t border-border">
            <Stagger stagger={0.06}>
              {skills.map((group) => (
                <motion.div
                  key={group.group}
                  variants={itemVariants}
                  className="grid grid-cols-[100px_1fr] gap-4 py-3 items-start sm:grid-cols-[120px_1fr]"
                >
                  <span className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                    {group.group}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-sm border border-border bg-bg-elev/50 px-2.5 py-0.5 font-mono text-[11px] tracking-tight text-fg-muted transition-all duration-150 hover:border-accent/50 hover:bg-accent-dim hover:text-fg hover:shadow-[0_0_12px_-4px_var(--color-accent-glow)]"
                      >
                        {s}
                      </span>
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
