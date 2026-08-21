"use client";

import Link from "next/link";
import type {
  MouseEvent,
  ReactNode,
} from "react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export default function MagneticButton({
  href,
  children,
  external = false,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (!ref.current) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    ref.current.style.transform =
      `translate3d(${x * 0.14}px, ${y * 0.14}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      "translate3d(0,0,0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-4 overflow-hidden border border-[#ff8500] bg-[#ff8500] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#09080f] transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_35px_rgba(255,133,0,0.18)] motion-reduce:transition-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-white/20 transition-transform duration-500 group-hover:scale-x-100"
      />

      <span className="relative z-10">
        {children}
      </span>

      <ArrowUpRight
        size={16}
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </Link>
  );
}