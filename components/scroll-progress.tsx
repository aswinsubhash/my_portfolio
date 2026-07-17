"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useWindowScroll } from "@/lib/use-window-scroll";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { progress } = useWindowScroll();
  const scaleX = useSpring(progress, {
    stiffness: reduce ? 1000 : 120,
    damping: reduce ? 100 : 28,
    mass: 0.4,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent shadow-[0_0_12px_var(--color-accent-glow)]"
      style={{ scaleX }}
    />
  );
}
