import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center px-6 py-24">
      <div className="bg-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_20%,transparent_100%)]" />

      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          <span className="text-accent">$</span> 404
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          Route not found.
        </h1>
        <p className="mx-auto max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">
          This path does not exist on this site. Head home or open the contact form.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-sm bg-accent px-6 font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-strong active:scale-[0.98]"
          >
            Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center rounded-sm border border-border-strong bg-bg-elev px-5 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-accent/40 hover:text-fg active:scale-[0.98]"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
