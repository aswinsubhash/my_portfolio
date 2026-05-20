"use client";

import * as React from "react";
import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { personal } from "@/lib/content";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

export function Contact() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <Section
      id="contact"
      eyebrow="05 · Contact"
      title="Let's talk."
      description="Open to Flutter roles, freelance work, or just a conversation about building apps that last."
    >
      <Reveal className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
        {/* Left — contact info */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-sm border border-success/30 bg-success/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Open to work
          </div>

          <div className="flex flex-col gap-3">
            <ContactRow icon={<Mail size={13} />}>
              <a href={`mailto:${personal.email}`} className="text-fg hover:text-accent transition-colors">
                {personal.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin size={13} />}>
              <span className="text-fg-muted">{personal.location}</span>
            </ContactRow>
          </div>

          <div className="flex gap-2">
            {[
              { href: personal.github, label: "GitHub", icon: <FaGithub size={14} /> },
              { href: personal.linkedin, label: "LinkedIn", icon: <FaLinkedinIn size={13} /> },
              { href: `mailto:${personal.email}`, label: "Email", icon: <Mail size={13} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-fg-muted transition-all hover:border-accent/50 hover:text-accent"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="font-mono text-[11px] leading-relaxed text-fg-subtle">
            Replies within 24 hours.
          </p>
        </div>

        {/* Right — form */}
        <div className="card-accent relative rounded-[var(--radius-card)] border border-border bg-bg-card p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {state.status === "ok" ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-center gap-3 py-10 text-center"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-success/40 bg-success/10 text-success">
                  <Check size={18} />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg">Message sent.</h3>
                <p className="max-w-xs text-sm text-fg-muted">
                  Thanks for reaching out. I&apos;ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={action}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" error={fieldErrors.name} />
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" error={fieldErrors.email} />
                </div>
                <Field label="Subject" name="subject" placeholder="What's this about?" error={fieldErrors.subject} />
                <Field label="Message" name="message" placeholder="Tell me more…" textarea error={fieldErrors.message} />

                {state.status === "error" && !Object.keys(fieldErrors).length && (
                  <p className="text-xs text-rose-400">{state.message}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent font-mono text-xs uppercase tracking-[0.14em] text-white transition-all hover:bg-accent-strong active:scale-[0.98] disabled:opacity-60"
                >
                  {pending ? (
                    <><Loader2 size={13} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send message <Send size={13} /></>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-border text-fg-muted">
        {icon}
      </span>
      {children}
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", textarea, error }: {
  label: string; name: string; placeholder: string; type?: string; textarea?: boolean; error?: string;
}) {
  const base = cn(
    "w-full rounded-sm border bg-bg/60 px-4 py-2.5 font-mono text-sm text-fg placeholder:text-fg-subtle outline-none transition-colors",
    error
      ? "border-rose-500/60 focus:border-rose-400"
      : "border-border hover:border-border-strong focus:border-accent/60",
  );
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">{label}</span>
      {textarea
        ? <textarea name={name} placeholder={placeholder} rows={5} className={cn(base, "resize-y")} />
        : <input name={name} type={type} placeholder={placeholder} className={base} />
      }
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </label>
  );
}
