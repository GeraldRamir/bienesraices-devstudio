"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  once = true,
}: StaggerGroupProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.08, margin: "0px 0px -32px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  variant?: "fade-up" | "scale-up" | "slide-right" | "blur-up";
};

const itemVariants: Record<NonNullable<StaggerItemProps["variant"]>, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  },
  "blur-up": {
    hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE },
    },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  },
};

export function StaggerItem({
  children,
  className,
  variant = "blur-up",
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants[variant]}>
      {children}
    </motion.div>
  );
}
