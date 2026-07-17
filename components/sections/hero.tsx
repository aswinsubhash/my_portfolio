"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { Magnetic } from "@/components/ui/magnetic";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";
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

function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.15 + i * 0.08,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { personal, ui } = useContent();
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const ease = [0.25, 1, 0.5, 1] as const;
  const [first, last] = personal.name.split(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 30]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 20]);
  const signalY1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -15]);
  const signalY2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 25]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.35]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.96]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 22 });

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || coarse) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(py * -8);
    tiltY.set(px * 8);
  };

  const handlePhotoLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <motion.div
        style={{ y: gridY }}
        className="bg-glow pointer-events-none absolute inset-0 -z-10"
      />
      <motion.div
        style={{ y: gridY }}
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]"
      />
      <motion.span
        aria-hidden="true"
        style={{ y: signalY1 }}
        className="hero-signal pointer-events-none left-[7%] top-[24%] -z-10 w-56 rotate-[14deg]"
      />
      <motion.span
        aria-hidden="true"
        style={{ y: signalY2 }}
        className="hero-signal pointer-events-none bottom-[20%] right-[10%] -z-10 w-72 -rotate-[10deg] [animation-delay:1.6s]"
      />

      <motion.div
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span className="hero-ghost select-none whitespace-nowrap font-display text-[22vw] font-black uppercase leading-none tracking-tighter text-fg/[0.025]">
          ASWIN
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-0"
      >
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ y: photoY, rotateX: springTiltX, rotateY: springTiltY }}
          onMouseMove={handlePhotoMove}
          onMouseLeave={handlePhotoLeave}
          className="motion-tilt relative mx-auto flex w-full max-w-[340px] items-end justify-center md:mx-0"
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

        <div className="flex flex-col gap-5">
          {personal.available && (
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-success/30 bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-success">
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Available
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
              <WordReveal text={first} />
              <br />
              <span className="text-fg/40">
                <WordReveal text={last} />
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
              <Typewriter text={personal.subtitle} />
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
            <Magnetic strength={0.1}>
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
            </Magnetic>
            <Magnetic strength={0.08}>
              <a
                href={personal.resume}
                download
                className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-strong bg-bg-elev px-5 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-accent/40 hover:text-fg active:scale-[0.98]"
              >
                <DownloadSimple size={13} weight="bold" aria-hidden="true" /> {ui.hero.resume}
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
