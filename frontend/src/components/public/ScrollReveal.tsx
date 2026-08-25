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
  distance = 20,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.intersectionRatio > 0.06;
        if (visibleRef.current === nextVisible) return;

        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      },
      {
        threshold: [0, 0.06, 0.12, 0.25],
        rootMargin: "0px 0px -4% 0px",
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
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity 480ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? delay : 0}ms, transform 620ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
}
