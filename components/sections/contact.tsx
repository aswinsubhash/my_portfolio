"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { personal } from "@/lib/content";
import {
  contactSchema,
  getContactFieldErrors,
  initialContactValues,
  type ContactField,
  type ContactFieldErrors,
  type ContactValues,
} from "@/lib/contact-form";
import { submitContact } from "@/app/actions/contact";

const fieldOrder: ContactField[] = ["name", "email", "subject", "message"];

export function Contact() {
  const [values, setValues] =
    React.useState<ContactValues>(initialContactValues);
  const [fieldErrors, setFieldErrors] = React.useState<ContactFieldErrors>({});
  const [touched, setTouched] = React.useState<
    Partial<Record<ContactField, boolean>>
  >({});
  const [formError, setFormError] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const focusFirstError = React.useCallback((errors: ContactFieldErrors) => {
    const firstField = fieldOrder.find((field) => errors[field]);
    if (!firstField) return;

    document.getElementById(`contact-${firstField}`)?.focus();
  }, []);

  const updateFieldError = React.useCallback(
    (field: ContactField, error?: string) => {
      setFieldErrors((current) => {
        const next = { ...current };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    },
    [],
  );

  const validateField = React.useCallback(
    (field: ContactField, nextValues: ContactValues) => {
      const parsed = contactSchema.safeParse(nextValues);
      if (parsed.success) {
        updateFieldError(field);
        return true;
      }

      const errors = getContactFieldErrors(parsed.error);
      updateFieldError(field, errors[field]);
      return !errors[field];
    },
    [updateFieldError],
  );

  const handleChange = (field: ContactField, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setFormError("");

    if (touched[field]) {
      validateField(field, nextValues);
    }
  };

  const handleBlur = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    validateField(field, values);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(false);
    setFormError("");
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errors = getContactFieldErrors(parsed.error);
      setFieldErrors(errors);
      focusFirstError(errors);
      return;
    }

    setFieldErrors({});
    startTransition(() => {
      void (async () => {
        const result = await submitContact(parsed.data);

        if (result.status === "ok") {
          setSent(true);
          setValues(initialContactValues);
          setTouched({});
          return;
        }

        const errors = result.fieldErrors ?? {};
        setFieldErrors(errors);
        if (Object.keys(errors).length) {
          focusFirstError(errors);
        } else {
          setFormError(result.message);
        }
      })();
    });
  };

  return (
    <Section
      id="contact"
      eyebrow="05 · Contact"
      title="Let's talk."
      description="Open to roles, freelance builds, and product conversations."
      containerClassName="max-w-5xl"
    >
      <Reveal className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.1fr] lg:gap-10">
        {/* Left — contact info */}
        <aside className="card-accent motion-card rounded-[var(--radius-card)] border border-border bg-bg-card/70 p-5 shadow-[0_18px_60px_-48px_var(--color-accent-glow)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold tracking-tight text-fg">
                  Direct Line
                </p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  Best for app builds, production fixes, and long-term product work.
                </p>
              </div>
              <div className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-success/30 bg-success/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-success">
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                  <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-success opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Open
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ContactRow
                href={`mailto:${personal.email}`}
                icon={<Mail size={13} aria-hidden="true" />}
                label="Email"
              >
                {personal.email}
              </ContactRow>
              <ContactRow
                icon={<MapPin size={13} aria-hidden="true" />}
                label="Base"
              >
                {personal.location}
              </ContactRow>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
              <p className="font-mono text-[11px] leading-relaxed text-fg-subtle">
                Replies within 24 hours.
              </p>
              <div className="flex shrink-0 gap-2">
                {[
                  { href: personal.github, label: "GitHub", icon: <FaGithub size={14} /> },
                  { href: personal.linkedin, label: "LinkedIn", icon: <FaLinkedinIn size={13} /> },
                  { href: `mailto:${personal.email}`, label: "Email", icon: <Mail size={13} /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-bg/40 text-fg-muted transition-colors hover:border-accent/50 hover:bg-accent-dim hover:text-accent"
                  >
                    <span aria-hidden="true">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right — form */}
        <div className="card-accent motion-card relative rounded-[var(--radius-card)] border border-border bg-bg-card/80 p-5 shadow-[0_24px_80px_-54px_var(--color-accent-glow)] focus-within:border-accent/40 focus-within:shadow-[0_24px_80px_-48px_var(--color-accent-glow)] sm:p-6">
          <div className="mb-5 flex flex-col gap-1 border-b border-border pb-5">
            <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
              Send a Message
            </h3>
            <p className="text-sm leading-relaxed text-fg-muted">
              Share the context, timeline, or role details and I&apos;ll reply with the next step.
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-success/40 bg-success/10 text-success">
                  <Check size={18} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg">Message sent.</h3>
                <p className="max-w-xs text-sm text-fg-muted">
                  Thanks for reaching out. I&apos;ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={values.name}
                    placeholder="Aswin Subhash…"
                    autoComplete="name"
                    error={fieldErrors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={values.email}
                    placeholder="you@example.com…"
                    autoComplete="email"
                    spellCheck={false}
                    error={fieldErrors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  value={values.subject}
                  placeholder="Project inquiry…"
                  autoComplete="off"
                  error={fieldErrors.subject}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Field
                  label="Message"
                  name="message"
                  value={values.message}
                  placeholder="Tell me more…"
                  textarea
                  autoComplete="off"
                  error={fieldErrors.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {formError && (
                  <p className="text-xs text-rose-400" role="status" aria-live="polite">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="motion-chip mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent font-mono text-xs uppercase tracking-[0.14em] text-white hover:bg-accent-strong active:scale-[0.98] disabled:opacity-60"
                >
                  {pending ? (
                    <><Loader2 size={13} aria-hidden="true" className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send Message <Send size={13} aria-hidden="true" /></>
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

function ContactRow({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "motion-card group flex items-center gap-3 rounded-sm border border-border/70 bg-bg/30 px-3 py-3 text-sm hover:border-accent/30 hover:bg-accent-dim";
  const content = (
    <>
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-bg-card text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-fg-muted transition-colors group-hover:text-fg">
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function Field({
  label,
  name,
  value,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  spellCheck,
  textarea,
  error,
  onBlur,
  onChange,
}: {
  label: string;
  name: ContactField;
  value: string;
  placeholder: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  spellCheck?: boolean;
  textarea?: boolean;
  error?: string;
  onBlur: (field: ContactField) => void;
  onChange: (field: ContactField, value: string) => void;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const base = cn(
    "w-full rounded-sm border bg-bg-soft/35 px-4 py-2.5 font-mono text-sm text-fg placeholder:text-fg-muted/60 transition-colors",
    error
      ? "border-rose-500/70 focus:border-rose-400"
      : "border-border-strong/70 hover:border-border-strong focus:border-accent/70",
  );
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">{label}</span>
      {textarea
        ? (
            <textarea
              id={id}
              name={name}
              value={value ?? ""}
              placeholder={placeholder}
              rows={5}
              autoComplete={autoComplete}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              onBlur={() => onBlur(name)}
              onChange={(event) => onChange(name, event.target.value)}
              className={cn(base, "resize-y")}
            />
          )
        : (
            <input
              id={id}
              name={name}
              type={type}
              inputMode={inputMode}
              value={value ?? ""}
              placeholder={placeholder}
              autoComplete={autoComplete}
              spellCheck={spellCheck}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              onBlur={() => onBlur(name)}
              onChange={(event) => onChange(name, event.target.value)}
              className={base}
            />
          )
      }
      {error && <span id={errorId} className="text-xs text-rose-400" role="status" aria-live="polite">{error}</span>}
    </label>
  );
}
