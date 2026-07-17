import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for aswinsubhash.vercel.app",
};

export default function PrivacyPage() {
  return (
    <main className="relative px-6 py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-accent"
        >
          ← Home
        </Link>
        <header className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            <span className="text-accent">$</span> privacy
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
            Privacy policy
          </h1>
          <p className="text-sm text-fg-muted">Last updated: July 17, 2026</p>
        </header>

        <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-fg-muted">
          <p>
            This site is a personal portfolio. It does not sell personal data and does not run
            advertising trackers beyond privacy-respecting analytics where configured.
          </p>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">What is collected</h2>
            <p>
              If you use the contact form, the name, email, subject, and message you submit are
              sent so I can reply. A Cloudflare Turnstile check runs to reduce spam. Analytics
              providers may collect anonymous usage metrics such as page views.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">How it is used</h2>
            <p>
              Contact details are used only to respond to your message. They are not sold or
              shared for marketing. Form submissions are processed through the site&apos;s
              server action and the configured form endpoint.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">Local preferences</h2>
            <p>
              Language and theme choices may be stored in your browser&apos;s localStorage so the
              site can remember them on later visits.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">Contact</h2>
            <p>
              Questions about this policy: use the{" "}
              <Link href="/#contact" className="text-accent underline-offset-4 hover:underline">
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
