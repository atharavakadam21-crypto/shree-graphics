"use client";

import { useEffect, type ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.075,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.25,
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
