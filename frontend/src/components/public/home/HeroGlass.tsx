"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/public/ui/Badge";
import Button from "@/components/public/ui/Button";
import Container from "@/components/public/ui/Container";
import GlassCard from "@/components/public/ui/GlassCard";

export default function HeroGlass() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0B1220] pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-[30rem] w-[30rem] rounded-full bg-[#4274D9]/25 blur-[130px]" />
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#95CCDD]/15 blur-[130px]" />
        <div className="absolute bottom-[-14rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#D3C09A]/10 blur-[140px]" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>
      <Container className="relative z-10 grid min-h-[calc(100svh-10rem)] items-center gap-14 lg:grid-cols-[1fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Badge>Precision Engineering</Badge>
          <h1 className="mt-6 font-display text-5xl font-black leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block bg-gradient-to-r from-white via-[#95CCDD] to-[#4274D9] bg-clip-text text-transparent">Printing. Slitting.</span>
            <span className="block text-white">Converting.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Shree Graphics manufactures and supplies industrial machinery for printing, slitting, die cutting, paper core cutting and related converting applications.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" className="gap-3">Explore Machines <ArrowRight size={17} /></Button>
            <Button href="/spare-parts" variant="secondary">Spare Parts</Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:grid-cols-4">
            <span>Machinery</span><span>Spare Parts</span><span>Service</span><span>Engineering</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative">
          <GlassCard className="relative overflow-hidden rounded-[2rem] p-2"><div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem]"><Image src="/gallery/turret-diecutting-machine.jpg" alt="Shree Graphics industrial machinery" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" /></div></GlassCard>
          <GlassCard className="absolute -bottom-5 left-4 rounded-2xl px-5 py-4 sm:-left-6"><span className="block text-[10px] uppercase tracking-[.16em] text-[#95CCDD]">Shree Graphics</span><span className="mt-1 block font-semibold text-white">Industrial Machinery</span></GlassCard>
          <GlassCard className="absolute -right-2 top-8 rounded-2xl px-4 py-3"><span className="block text-[10px] uppercase tracking-[.14em] text-[#D3C09A]">Maharashtra</span><span className="text-sm text-white">India</span></GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}
