import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-[#95CCDD]/25 bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#95CCDD] backdrop-blur-xl", className)}>
      {children}
    </span>
  );
}
