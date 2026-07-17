"use client";

import Image from "next/image";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { useContent } from "@/lib/useContent";

export function Hero() {
  const { personal, ui } = useContent();
  const [first, last] = personal.name.split(" ");

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div className="bg-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap font-display text-[22vw] font-black uppercase leading-none tracking-tighter text-fg/[0.025]">
          ASWIN
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-0">
        <div className="relative mx-auto flex w-full max-w-[340px] items-end justify-center md:mx-0">
          <div className="relative w-full">
            <div className="absolute bottom-0 left-1/4 h-2/3 w-2/3 rounded-full bg-accent/10" />
            <Image
              src="/profile.png"
              alt={personal.name}
              width={500}
              height={600}
              priority
              unoptimized
              className="relative w-full drop-shadow-2xl"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {personal.available && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-success/30 bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-success">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              Available
            </span>
          )}

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {first}
            <br />
            <span className="text-fg/40">{last}</span>
            <span className="text-accent">.</span>
          </h1>

          <div className="border-s-2 border-accent/40 ps-4">
            <p className="font-display text-lg font-semibold tracking-tight text-fg">
              {personal.title}
            </p>
            <p className="mt-1 font-mono text-xs text-sky">
              {personal.subtitle}
              <span className="cursor-blink ms-1" aria-hidden="true" />
            </p>
          </div>

          <p className="max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">
            {personal.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-6 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-strong active:scale-[0.98]"
            >
              {ui.hero.viewProjects}
              <ArrowRight
                size={13}
                weight="bold"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={personal.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-strong bg-bg-elev px-5 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-accent/40 hover:text-fg active:scale-[0.98]"
            >
              <DownloadSimple size={13} weight="bold" aria-hidden="true" /> {ui.hero.resume}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
