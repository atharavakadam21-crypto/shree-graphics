"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    const element = ref.current;
    if (!element || media.matches) {
      setIsVisible(true);
      return () => media.removeEventListener("change", updateMotionPreference);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible || reduceMotion ? 1 : 0,
        transform:
          isVisible || reduceMotion
            ? "translate3d(0, 0, 0) scale(1)"
            : `translate3d(0, ${distance}px, 0) scale(0.985)`,
        transitionProperty: "opacity, transform",
        transitionDuration: "900ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
