"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { FaGooglePlay, FaApple } from "react-icons/fa6";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, useRevealVariants } from "@/components/ui/reveal";
import { type Project } from "@/lib/content";
import { useContent } from "@/lib/useContent";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";
import { cn } from "@/lib/cn";

export function Projects() {
  const { projects, ui } = useContent();
  const [featured, ...rest] = projects;

  return (
    <Section
      id="projects"
      eyebrow={ui.projects.eyebrow}
      eyebrowSigil="$"
      title={ui.projects.title}
      description={ui.projects.desc}
    >
      <div className="flex flex-col gap-5">
        <Reveal variant="scaleIn">
          <FeaturedCard project={featured} featuredLabel={ui.featured} />
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-2 md:items-start" delayChildren={0.15}>
          {rest.map((p) => (
            <ProjectCardWrapper key={p.title}>
              <CompactCard project={p} />
            </ProjectCardWrapper>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function ProjectCardWrapper({ children }: { children: React.ReactNode }) {
  const fadeUp = useRevealVariants("fadeUp");
  return <motion.div variants={fadeUp}>{children}</motion.div>;
}

function useCardTilt() {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || coarse) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -6);
    rotateY.set(px * 6);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { springX, springY, onMove, onLeave, enabled: !reduce && !coarse };
}

function FeaturedCard({
  project,
  featuredLabel,
}: {
  project: Project;
  featuredLabel: string;
}) {
  const fadeUp = useRevealVariants("fadeUp");
  const { springX, springY, onMove, onLeave } = useCardTilt();

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY }}
      className={cn(
        "motion-tilt card-accent motion-card group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-bg-card",
        "border-accent/40 shadow-[0_0_40px_-10px_var(--color-accent-glow)]",
        "hover:shadow-[0_0_60px_-10px_var(--color-accent-glow)]",
      )}
    >
      <div className="terminal-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <Stagger className="flex flex-1 flex-col gap-5 p-8 md:p-10" delayChildren={0.25} stagger={0.05}>
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-fg md:text-3xl">
              {project.title}
            </h3>
            <span
              className={cn(
                "h-2.5 w-2.5 shrink-0 rounded-full",
                accentDot[project.accent] ?? "bg-accent",
              )}
            />
          </div>
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-accent/70 sm:inline-flex">
            {featuredLabel}
          </span>
        </motion.div>

        {project.highlights && project.highlights.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="rounded-sm border border-accent/30 bg-accent-dim px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent"
              >
                {h}
              </span>
            ))}
          </motion.div>
        )}

        <motion.p variants={fadeUp} className="max-w-3xl text-[15px] leading-relaxed text-fg-muted">
          {project.summary}
        </motion.p>

        <motion.ul variants={fadeUp} className="flex flex-col gap-2.5 border-t border-border pt-5">
          {project.description.map((d, i) => (
            <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-fg-muted">
              <span
                aria-hidden
                className="mt-[9px] inline-block h-px w-3 shrink-0 bg-accent/50"
              />
              <span>{d}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border bg-bg-elev/80 px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-fg-muted"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {project.links && (
          <motion.div variants={fadeUp} className="mt-auto flex flex-wrap items-center gap-2 pt-1">
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="inline-flex h-9 items-center gap-2 rounded-sm border border-border bg-bg-elev px-3.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <FaGooglePlay size={12} aria-hidden="true" />
                Play Store
              </a>
            )}
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="App Store"
                className="inline-flex h-9 items-center gap-2 rounded-sm border border-border bg-bg-elev px-3.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <FaApple size={13} aria-hidden="true" />
                App Store
              </a>
            )}
          </motion.div>
        )}
      </Stagger>
    </motion.article>
  );
}

function CompactCard({ project }: { project: Project }) {
  const { springX, springY, onMove, onLeave } = useCardTilt();
  const visibleTags = project.tags.slice(0, 4);
  const overflow = project.tags.length - visibleTags.length;

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY }}
      className={cn(
        "motion-tilt card-accent motion-card group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card",
        "hover:border-accent/30 hover:shadow-[0_0_30px_-10px_var(--color-accent-glow)]",
      )}
    >
      <div className="terminal-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug tracking-tight text-fg">
            {project.title}
          </h3>
          <span
            className={cn(
              "mt-1 h-2 w-2 shrink-0 rounded-full",
              accentDot[project.accent] ?? "bg-accent",
            )}
          />
        </div>

        <p className="line-clamp-3 text-[13px] leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border bg-bg-elev/80 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-fg-muted"
            >
              {t}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded-sm border border-border bg-bg-elev/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.04em] text-fg-subtle">
              +{overflow}
            </span>
          )}
        </div>

        {project.links && (
          <div className="mt-auto flex items-center gap-2 pt-1">
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-bg-elev px-2.5 font-mono text-[10px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <FaGooglePlay size={10} aria-hidden="true" />
                Play Store
              </a>
            )}
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="App Store"
                className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-bg-elev px-2.5 font-mono text-[10px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <FaApple size={11} aria-hidden="true" />
                App Store
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

const accentDot: Record<string, string> = {
  cyan: "bg-accent",
  teal: "bg-accent",
  sky: "bg-sky",
  emerald: "bg-sky",
  rose: "bg-accent",
  indigo: "bg-sky",
  amber: "bg-sky",
  violet: "bg-accent",
};
