"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/public/ui/Badge";
import Container from "@/components/public/ui/Container";
import GlassCard from "@/components/public/ui/GlassCard";

export default function AboutHero() {
  return <section className="relative isolate overflow-hidden bg-[#0B1220] pb-20 pt-32 sm:pt-40 lg:pb-28">
    <div aria-hidden className="pointer-events-none absolute inset-0"><div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[#4274D9]/20 blur-[130px]"/><div className="absolute right-[-10rem] top-1/3 h-[25rem] w-[25rem] rounded-full bg-[#95CCDD]/12 blur-[120px]"/><div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:30px_30px]"/></div>
    <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}><Badge>About Shree Graphics</Badge><h1 className="mt-6 font-display text-5xl font-black leading-[.94] tracking-[-.05em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">Built around <span className="bg-gradient-to-r from-[#95CCDD] to-[#4274D9] bg-clip-text text-transparent">precision.</span></h1><p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">Engineering machinery for label converting and industrial printing applications, with a focus on practical manufacturing and dependable industrial performance.</p></motion.div>
      <motion.div initial={{opacity:0,scale:.97,y:24}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.8,delay:.1}} className="relative"><GlassCard className="overflow-hidden rounded-[2rem] p-2"><div className="relative aspect-[16/10] overflow-hidden rounded-[1.55rem]"><Image src="/gallery/DSC_1889.JPG" alt="Shree Graphics manufacturing environment" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/75 via-transparent to-transparent"/><div className="absolute bottom-5 left-5"><span className="text-[10px] uppercase tracking-[.18em] text-[#95CCDD]">Shree Graphics</span><p className="mt-1 text-sm text-white">Manufacturing & engineering</p></div></div></GlassCard></motion.div>
    </Container>
  </section>;
}
