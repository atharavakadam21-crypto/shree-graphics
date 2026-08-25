import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "./ui/Container";

const machines = ["Machines", "Spare Parts", "Airshafts", "Services"];
const company = ["About", "Gallery", "Contact"];
const hrefs: Record<string,string> = { Machines:"/products", "Spare Parts":"/spare-parts", Airshafts:"/airshafts", Services:"/services", About:"/about", Gallery:"/gallery", Contact:"/contact" };

export default function Footer() {
 return <footer className="relative overflow-hidden border-t border-white/10 bg-[#090909] text-slate-300">
  <div aria-hidden className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#4274D9]/15 blur-[130px]" />
  <div aria-hidden className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#95CCDD]/10 blur-[120px]" />
  <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:py-20">
   <div><Link href="/" className="flex items-center gap-3"><span className="relative h-12 w-12 overflow-hidden rounded-full border border-[#95CCDD]/30 bg-white/5"><Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="48px" className="object-contain" /></span><span><strong className="block font-display text-xl text-white">Shree Graphics</strong><small className="text-[8px] uppercase tracking-[.16em] text-slate-500">Printing & Converting Machinery</small></span></Link><p className="mt-7 max-w-md text-sm leading-7 text-slate-400">Shree Graphics manufactures and supplies industrial machinery, spare parts and related engineering solutions for printing and converting applications.</p></div>
   <FooterColumn title="Machines" items={machines} />
   <FooterColumn title="Company" items={company} />
   <div><h3 className="text-xs font-semibold uppercase tracking-[.18em] text-[#95CCDD]">Contact</h3><div className="mt-6 space-y-5 text-sm"><a href="tel:+919820968449" className="flex gap-3 hover:text-white"><Phone size={17} className="shrink-0 text-[#4274D9]"/>+91 98209 68449</a><a href="mailto:shreeksr09@gmail.com" className="flex gap-3 hover:text-white"><Mail size={17} className="shrink-0 text-[#4274D9]"/>shreeksr09@gmail.com</a><div className="flex gap-3 leading-6"><MapPin size={17} className="mt-1 shrink-0 text-[#4274D9]"/>Maharashtra 421302, India</div></div></div>
  </Container>
  <div className="relative border-t border-white/10"><Container className="flex flex-col gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Shree Graphics. All rights reserved.</span><span>Printing · Converting · Engineering</span></Container></div>
 </footer>;
}
function FooterColumn({title,items}:{title:string;items:string[]}) { return <div><h3 className="text-xs font-semibold uppercase tracking-[.18em] text-[#95CCDD]">{title}</h3><ul className="mt-6 space-y-4">{items.map(item=><li key={item}><Link href={hrefs[item]} className="text-sm text-slate-400 transition hover:text-white">{item}</Link></li>)}</ul></div>; }
