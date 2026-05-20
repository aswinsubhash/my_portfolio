"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, itemVariants } from "@/components/ui/reveal";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 · Projects"
      title="Shipped products."
      description="Live on Play Store and App Store. Each built end-to-end with Flutter."
    >
      <Stagger className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <motion.div key={p.title} variants={itemVariants}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
      </Stagger>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const detailsId = React.useId();

  return (
    <article className={cn(
      "card-accent motion-card group relative flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-6",
      "hover:border-accent/30 hover:shadow-[0_0_30px_-10px_var(--color-accent-glow)]",
    )}>
      {/* Index + title */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold tracking-tight text-fg leading-snug">
          {project.title}
        </h3>
        <span className={cn(
          "mt-1 shrink-0 h-2 w-2 rounded-full",
          accentDot[project.accent] ?? "bg-accent",
        )} />
      </div>

      <p className="text-[14px] leading-relaxed text-fg-muted">{project.summary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-sm border border-border bg-bg-elev/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Expand */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            id={detailsId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
            className="border-t border-border pt-4"
          >
            <ul className="flex flex-col gap-2">
              {project.description.map((d, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-[9px] inline-block h-px w-3 shrink-0 bg-accent/50" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-auto inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-[0.16em] text-accent/70 transition-colors hover:text-accent"
        aria-expanded={open}
        aria-controls={detailsId}
      >
        {open ? "Collapse" : "Details"}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
          <ChevronDown size={11} />
        </motion.span>
      </button>
    </article>
  );
}

const accentDot: Record<string, string> = {
  teal: "bg-teal-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  indigo: "bg-indigo-400",
};
