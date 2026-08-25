import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/20 backdrop-blur-2xl", className)} {...props} />;
}
