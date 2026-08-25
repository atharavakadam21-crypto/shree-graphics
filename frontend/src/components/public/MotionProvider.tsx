"use client";

import { useEffect, type ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      let frame = 0;
      const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      cleanup = () => { cancelAnimationFrame(frame); lenis.destroy(); };
    });

    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return children;
}
