"use client";

import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface ScrollMotionProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  direction?: 1 | -1;
}

export default function ScrollMotion({
  children,
  className = "",
  speed = 0.08,
  direction = 1,
  style,
  ...props
}: ScrollMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;

      const movement = Math.max(
        -80,
        Math.min(80, distance * speed * direction)
      );

      element.style.transform =
        `translate3d(0, ${movement}px, 0)`;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: "transform",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
