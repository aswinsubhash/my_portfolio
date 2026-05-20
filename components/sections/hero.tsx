"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useContent } from "@/lib/useContent";

function Typewriter({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.35 + i * 0.045 }}
          aria-hidden="true"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { personal, ui } = useContent();
  const reduce = useReducedMotion();
  const ease = [0.25, 1, 0.5, 1] as const;
  const [first, last] = personal.name.split(" ");

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="bg-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
      <span
        aria-hidden="true"
        className="hero-signal pointer-events-none left-[7%] top-[24%] -z-10 w-56 rotate-[14deg]"
      />
      <span
        aria-hidden="true"
        className="hero-signal pointer-events-none bottom-[20%] right-[10%] -z-10 w-72 -rotate-[10deg] [animation-delay:1.6s]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span className="hero-ghost select-none whitespace-nowrap font-display text-[22vw] font-black uppercase leading-none tracking-tighter text-fg/[0.025]">
          ASWIN
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-0">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="relative mx-auto flex w-full max-w-[340px] items-end justify-center md:mx-0"
        >
          <div className="hero-float relative w-full">
            <div className="absolute bottom-0 left-1/4 h-2/3 w-2/3 rounded-full bg-accent/15 blur-[80px]" />
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
        </motion.div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            {personal.available && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-success">
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Available
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
              <MapPin size={10} aria-hidden="true" />
              <span className="kbd">{personal.location}</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl xl:text-8xl">
              <Typewriter text={first} />
              <br />
              <span className="text-fg/40">
                <Typewriter text={last} />
              </span>
              <span className="text-accent">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
            className="border-s-2 border-accent/40 ps-4"
          >
            <p className="font-display text-lg font-semibold tracking-tight text-fg">
              {personal.title}
            </p>
            <p className="mt-1 font-mono text-xs text-sky">
              {personal.subtitle}
              <span className="cursor-blink ms-1" aria-hidden="true" />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
            className="max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.34 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-6 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-strong"
            >
              {ui.hero.viewProjects}
              <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={personal.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-strong bg-bg-elev px-5 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              <Download size={13} aria-hidden="true" /> {ui.hero.resume}
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-accent"
            >
              {ui.hero.sayHello}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
