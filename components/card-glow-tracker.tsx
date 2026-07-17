"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/** Tracks pointer position on .motion-card elements for radial hover glow. */
export function CardGlowTracker() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".motion-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return null;
}
