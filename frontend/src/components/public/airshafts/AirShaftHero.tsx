"use client";
import Image from "next/image";
import { Factory, Settings2, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/public/ui/Badge";
import Button from "@/components/public/ui/Button";
import Container from "@/components/public/ui/Container";
import GlassCard from "@/components/public/ui/GlassCard";

export default function AirShaftHero(){
  return <section className="relative isolate overflow-hidden bg-[#0B1220] pb-20 pt-32 sm:pt-40">
    <div aria-hidden className="absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full bg-[#4274D9]/20 blur-[150px]"/>
    <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
        <Badge>Airshaft systems</Badge>
        <h1 className="mt-6 font-display text-6xl font-black leading-[.88] tracking-[-.055em] sm:text-7xl lg:text-8xl">Airshaft <span className="bg-gradient-to-r from-[#95CCDD] to-[#4274D9] bg-clip-text text-transparent">systems.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Airshaft manufacturing, repair and component supply for printing, slitting and converting machinery.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Button href="/contact">Request Airshaft Service</Button><Button href="#airshaft-types" variant="secondary">Explore Types</Button></div>
      </motion.div>
      <motion.div initial={{opacity:0,scale:.96,y:22}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.8,delay:.1}}>
        <GlassCard className="rounded-[2rem] p-4 sm:p-6">
          <p className="px-2 text-[10px] uppercase tracking-[.18em] text-[#95CCDD]">Airshaft assembly</p>
          <div className="relative mt-4 aspect-[12/7] overflow-hidden rounded-3xl border border-white/10 bg-[#08101F]">
            <Image src="/images/airshafts/airshaft-standard.svg" alt="Shree Graphics airshaft assembly illustration" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-4"/>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">{[[Factory,"Manufacturing","New Airshaft Builds"],[Wrench,"Workshop","Repair & Reconditioning"],[Settings2,"Components","Individual Spare Parts"]].map(([Icon,title,text])=>{const C=Icon as typeof Factory;return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.025] p-3"><C size={16} className="text-[#95CCDD]"/><p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">{title as string}</p><p className="mt-1 text-xs text-slate-200">{text as string}</p></div>})}</div>
        </GlassCard>
      </motion.div>
    </Container>
  </section>}
