"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  Certificate,
  Code,
  Cpu,
  SealCheck,
  Student,
  type Icon,
} from "@phosphor-icons/react";
import { Section } from "@/components/ui/section";
import { Stagger, useRevealVariants } from "@/components/ui/reveal";
import { type Certification, type CertificationCategory } from "@/lib/content";
import { useContent } from "@/lib/useContent";
import { cn } from "@/lib/cn";

const categoryOrder: CertificationCategory[] = ["ai-agentic", "mobile-cs"];
const issuerOrder = ["BlueDot Impact", "OpenAI", "Anthropic", "LinkedIn", "Udemy"];

const categoryIcons: Record<CertificationCategory, Icon> = {
  "ai-agentic": Brain,
  "mobile-cs": Code,
};

const issuerIcons: Record<string, Icon> = {
  Anthropic: Cpu,
  "BlueDot Impact": Brain,
  LinkedIn: SealCheck,
  OpenAI: Cpu,
  Udemy: Student,
};

const accentBadge: Record<string, string> = {
  cyan: "border-accent/30 bg-accent/10 text-accent",
  blue: "border-accent/30 bg-accent/10 text-accent",
  sky: "border-sky/40 bg-sky-dim text-sky",
  teal: "border-accent/25 bg-accent-dim text-accent-strong",
  stone: "border-border-strong bg-bg-elev text-fg-muted",
  emerald: "border-sky/35 bg-sky-dim text-sky",
  violet: "border-accent/30 bg-accent/10 text-accent",
};

export function Certifications() {
  const { certifications, ui } = useContent();
  const copy = ui.certifications;
  const reduce = useReducedMotion();

  const groups = categoryOrder
    .map((category) => ({
      category,
      items: certifications.filter((cert) => cert.category === category),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <Section id="certifications" title={copy.title}>
      <div className="flex flex-col gap-8">
        {groups.map(({ category, items }, groupIdx) => {
          const CategoryIcon = categoryIcons[category];

          return (
            <motion.section
              key={category}
              layout
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduce ? 0.01 : 0.6,
                delay: reduce ? 0 : groupIdx * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
              aria-labelledby={`certification-${category}`}
              className="flex flex-col gap-4"
            >
              <motion.div
                layout
                className="flex items-center justify-between gap-4 border-b border-border pb-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <motion.span
                    layoutId={`cert-icon-${category}`}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-accent/30 bg-accent/10 text-accent"
                  >
                    <CategoryIcon size={16} aria-hidden="true" />
                  </motion.span>
                  <motion.h3
                    layoutId={`cert-title-${category}`}
                    id={`certification-${category}`}
                    className="truncate font-display text-lg font-bold tracking-tight text-fg"
                  >
                    {copy.categories[category]}
                  </motion.h3>
                </div>
                <motion.span
                  layout
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-accent/70"
                  aria-label={`${items.length}`}
                >
                  {String(items.length).padStart(2, "0")}
                </motion.span>
              </motion.div>

              <div className="flex flex-col gap-6">
                {groupByIssuer(items).map(({ issuer, certifications: issuerCerts }) => {
                  const IssuerIcon = issuerIcons[issuer] ?? Certificate;

                  return (
                    <motion.div
                      key={`${category}-${issuer}`}
                      layout
                      className="flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-border bg-bg-elev text-accent">
                            <IssuerIcon size={12} aria-hidden="true" />
                          </span>
                          <h4 className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
                            {issuer}
                          </h4>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-fg-subtle">
                          {issuerCerts.length}
                        </span>
                      </div>

                      <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.06}>
                        {issuerCerts.map((cert) => (
                          <CertificationCard key={`${cert.issuer}-${cert.title}`} cert={cert} />
                        ))}
                      </Stagger>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>
    </Section>
  );
}

function groupByIssuer(certifications: Certification[]) {
  const grouped = certifications.reduce<Record<string, Certification[]>>((acc, cert) => {
    acc[cert.issuer] = [...(acc[cert.issuer] ?? []), cert];
    return acc;
  }, {});

  return Object.entries(grouped)
    .sort(([a], [b]) => {
      const aIndex = issuerOrder.indexOf(a);
      const bIndex = issuerOrder.indexOf(b);
      return (aIndex === -1 ? issuerOrder.length : aIndex) - (bIndex === -1 ? issuerOrder.length : bIndex);
    })
    .map(([issuer, issuerCertifications]) => ({
      issuer,
      certifications: issuerCertifications,
    }));
}

function CertificationCard({ cert }: { cert: Certification }) {
  const { ui } = useContent();
  const copy = ui.certifications;
  const fadeUp = useRevealVariants("fadeUp");
  const IssuerIcon = issuerIcons[cert.issuer] ?? Certificate;

  return (
    <motion.article
      layout
      variants={fadeUp}
      className="card-accent motion-card group flex h-full min-w-0 flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-5 hover:border-accent/30 hover:shadow-[0_0_28px_-14px_var(--color-accent-glow)]"
    >
      <div className="flex min-w-0 gap-3">
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-transform group-hover:scale-105",
            accentBadge[cert.accent] ?? "border-accent/30 bg-accent/10 text-accent",
          )}
        >
          <IssuerIcon size={17} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="text-balance text-sm font-semibold leading-snug text-fg">
            {cert.title}
          </h4>
          <p className="mt-1 text-[13px] leading-snug text-fg-muted">{cert.issuer}</p>
        </div>
      </div>

      <dl className="grid gap-2 border-t border-border pt-4 text-[12px] leading-relaxed">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            {copy.issued}
          </dt>
          <dd className="shrink-0 font-mono text-[11px] text-accent/80">{cert.issued}</dd>
        </div>

        {cert.credentialId && (
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              {copy.credentialId}
            </dt>
            <dd dir="ltr" className="break-all font-mono text-[11px] text-fg-muted">
              {cert.credentialId}
            </dd>
          </div>
        )}
      </dl>

      {cert.skills && cert.skills.length > 0 && (
        <div className="mt-auto flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            {copy.skills}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-sm border border-border bg-bg-elev/80 px-2 py-0.5 text-[11px] leading-relaxed text-fg-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
