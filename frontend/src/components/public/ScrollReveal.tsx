"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

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
  distance = 18,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = entry.intersectionRatio >= 0.08;
        setIsVisible((current) => (current === shouldShow ? current : shouldShow));
      },
      {
        threshold: [0, 0.08, 0.2],
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu will-change-[opacity,transform] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0)" : `translate3d(0,${distance}px,0)`,
        transitionProperty: "opacity, transform",
        transitionDuration: "420ms, 760ms",
        transitionTimingFunction: "ease-out, cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: isVisible ? `${delay}ms, ${delay}ms` : "0ms, 0ms",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
