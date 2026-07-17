import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for aswinsubhash.vercel.app",
};

export default function TermsPage() {
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
            <span className="text-accent">$</span> terms
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
            Terms of use
          </h1>
          <p className="text-sm text-fg-muted">Last updated: July 17, 2026</p>
        </header>

        <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-fg-muted">
          <p>
            This website presents personal portfolio information about Aswin Subhash. By using
            the site you agree to these terms.
          </p>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">Content</h2>
            <p>
              Project descriptions, credentials, and copy are provided for informational
              purposes. Details may change as work evolves. Screenshots, marks, and product
              names belonging to clients or third parties remain their property.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">Acceptable use</h2>
            <p>
              Do not abuse the contact form, attempt to disrupt the site, or scrape content in a
              way that harms availability. Automated spam submissions are blocked where
              possible.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">No warranty</h2>
            <p>
              The site is provided as-is. Links to app stores and external profiles are offered
              for convenience and may change without notice.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-semibold text-fg">Contact</h2>
            <p>
              Questions about these terms: use the{" "}
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
