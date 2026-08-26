"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

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
  distance = 24,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.18,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        type: "spring",
        stiffness: 82,
        damping: 22,
        mass: 0.75,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
