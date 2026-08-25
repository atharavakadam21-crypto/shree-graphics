"use client";

import { useEffect, type ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
      cleanup = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return children;
}
