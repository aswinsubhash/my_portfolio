"use client";

import * as React from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.12 }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 380, damping: 32, mass: 0.35 });
  const y = useSpring(0, { stiffness: 380, damping: 32, mass: 0.35 });

  React.useEffect(() => {
    if (reduce) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const leave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [reduce, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      data-cursor="magnetic"
      style={reduce ? undefined : { x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
