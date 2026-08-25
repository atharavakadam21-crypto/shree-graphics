"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  distance = 36,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.72,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
