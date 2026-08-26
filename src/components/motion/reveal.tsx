"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "scale-up"
  | "slide-left"
  | "slide-right"
  | "blur-up";

function buildVariants(variant: RevealVariant, distance: number): Variants {
  const hiddenMap: Record<RevealVariant, Variants["hidden"]> = {
    "fade-up": { opacity: 0, y: distance },
    "fade-down": { opacity: 0, y: -distance },
    "fade-in": { opacity: 0 },
    "scale-up": { opacity: 0, scale: 0.94, y: distance * 0.45 },
    "slide-left": { opacity: 0, x: -distance },
    "slide-right": { opacity: 0, x: distance },
    "blur-up": { opacity: 0, y: distance, filter: "blur(10px)" },
  };

  return {
    hidden: hiddenMap[variant],
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: EASE },
    },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  variant = "blur-up",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: "0px 0px -48px 0px" }}
      variants={buildVariants(variant, y)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
