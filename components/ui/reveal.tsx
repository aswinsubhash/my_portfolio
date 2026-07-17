"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

export type RevealVariant =
  | "fadeUp"
  | "fadeStart"
  | "fadeEnd"
  | "scaleIn"
  | "blurIn"
  | "clipReveal";

const EASE = [0.25, 1, 0.5, 1] as const;

export function createRevealVariants(
  reduce: boolean | null,
  variant: RevealVariant = "fadeUp",
  rtl = false,
): Variants {
  let resolved = variant;
  if (rtl && (variant === "fadeStart" || variant === "fadeEnd")) {
    resolved = variant === "fadeStart" ? "fadeEnd" : "fadeStart";
  }

  const duration = reduce ? 0.01 : 0.6;
  const baseShow = {
    opacity: 1,
    transition: { duration, ease: EASE },
  };

  switch (resolved) {
    case "fadeStart":
      return {
        hidden: { opacity: 0, x: reduce ? 0 : -28 },
        show: { ...baseShow, x: 0 },
      };
    case "fadeEnd":
      return {
        hidden: { opacity: 0, x: reduce ? 0 : 28 },
        show: { ...baseShow, x: 0 },
      };
    case "scaleIn":
      return {
        hidden: { opacity: 0, scale: reduce ? 1 : 0.92 },
        show: { ...baseShow, scale: 1 },
      };
    case "blurIn":
      return {
        hidden: {
          opacity: 0,
          filter: reduce ? "blur(0px)" : "blur(10px)",
        },
        show: { ...baseShow, filter: "blur(0px)" },
      };
    case "clipReveal":
      return {
        hidden: {
          opacity: 0,
          clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        },
        show: { ...baseShow, clipPath: "inset(0 0 0 0)" },
      };
    case "fadeUp":
    default:
      return {
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { ...baseShow, y: 0 },
      };
  }
}

export function useItemVariants(): Variants {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  return createRevealVariants(reduce, "fadeUp", lang === "ar");
}

export function useRevealVariants(variant: RevealVariant = "fadeUp"): Variants {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  return createRevealVariants(reduce, variant, lang === "ar");
}

/** @deprecated Use useItemVariants() for reduced-motion safety */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

type RevealProps = {
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  className?: string;
  children?: React.ReactNode;
};

export function Reveal({
  delay = 0,
  y,
  variant = "fadeUp",
  className,
  children,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const variants = createRevealVariants(reduce, variant, lang === "ar");
  if (y !== undefined && variant === "fadeUp") {
    variants.hidden = { opacity: 0, y: reduce ? 0 : y };
    variants.show = {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : 0.6,
        ease: EASE,
        delay: reduce ? 0 : delay,
      },
    };
  } else if (delay > 0) {
    variants.show = {
      ...variants.show,
      transition: {
        ...(typeof variants.show === "object" && "transition" in variants.show
          ? variants.show.transition
          : {}),
        delay: reduce ? 0 : delay,
      },
    };
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const Stagger = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    delayChildren?: number;
    stagger?: number;
  }
>(function Stagger(
  { className, children, delayChildren = 0, stagger = 0.06 },
  ref,
) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
});

export function StaggerItem({
  variant = "fadeUp",
  className,
  children,
}: {
  variant?: RevealVariant;
  className?: string;
  children?: React.ReactNode;
}) {
  const variants = useRevealVariants(variant);
  return (
    <motion.div variants={variants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
