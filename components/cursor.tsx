"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring lags behind cursor
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.6 });

  // Glow blob drifts slowly
  const glowX = useSpring(mouseX, { stiffness: 35, damping: 18, mass: 1.2 });
  const glowY = useSpring(mouseY, { stiffness: 35, damping: 18, mass: 1.2 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    document.documentElement.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot — snaps instantly */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] h-2 w-2 rounded-full bg-accent"
        style={{ left: 0, top: 0, x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Ring — spring lag */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9997] h-8 w-8 rounded-full border border-accent/50"
        style={{ left: 0, top: 0, x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Glow blob — slow drift */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0"
        style={{
          left: 0,
          top: 0,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 480,
          height: 480,
          borderRadius: "999px",
          background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
    </>
  );
}
