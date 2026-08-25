"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const navigation = [
  ["Machines", "/products"], ["Spare Parts", "/spare-parts"], ["Airshafts", "/airshafts"], ["Services", "/services"], ["Gallery", "/gallery"], ["About", "/about"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-[70] pt-3 sm:pt-4">
      <Container>
        <div className="flex min-h-[68px] items-center justify-between rounded-2xl border border-white/10 bg-[#0B1220]/75 px-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-4">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#95CCDD]/35 bg-[#4274D9]/20"><Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="44px" className="object-contain" /></span>
            <span className="hidden sm:block"><strong className="block font-display text-lg tracking-wide text-white">Shree Graphics</strong><small className="block text-[8px] uppercase tracking-[0.15em] text-slate-400">Printing & Converting Machinery</small></span>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {navigation.map(([label, href]) => <Link key={href} href={href} className="group relative py-2 text-sm text-slate-300 transition hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#95CCDD] after:transition-all hover:after:w-full">{label}</Link>)}
          </nav>
          <div className="hidden lg:block"><Button href="/contact">Get Free Consultation</Button></div>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white lg:hidden" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {open && <div className="mt-2 rounded-2xl border border-white/10 bg-[#0B1220]/95 p-4 backdrop-blur-2xl lg:hidden"><nav className="grid gap-1">{navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-slate-200 hover:bg-white/[0.06]">{label}</Link>)}<Button href="/contact" className="mt-2">Get Free Consultation</Button></nav></div>}
      </Container>
    </header>
  );
}
