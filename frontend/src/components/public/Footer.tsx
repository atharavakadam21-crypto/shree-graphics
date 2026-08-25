import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "./ui/Container";

const machines = ["Machines", "Spare Parts", "Airshafts", "Services"];
const company = ["About", "Gallery", "Contact"];
const hrefs: Record<string,string> = { Machines:"/products", "Spare Parts":"/spare-parts", Airshafts:"/airshafts", Services:"/services", About:"/about", Gallery:"/gallery", Contact:"/contact" };

export default function Footer() {
 return <footer className="relative overflow-hidden border-t border-[#95CCDD]/20 bg-[linear-gradient(135deg,#0D1930_0%,#101B31_55%,#0B1220_100%)] text-slate-300">
  <div aria-hidden className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#4274D9]/25 blur-[140px]" />
  <div aria-hidden className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#F36A21]/10 blur-[130px]" />
  <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:py-20">
   <div><Link href="/" className="flex items-center gap-3"><span className="relative h-14 w-14 overflow-hidden rounded-full border border-[#95CCDD]/40 bg-[#13213A]"><Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="56px" className="object-contain p-1" /></span><span><strong className="block font-display text-xl text-white">Shree Graphics</strong><small className="text-[8px] uppercase tracking-[.16em] text-[#95CCDD]/70">Printing & Converting Machinery</small></span></Link><p className="mt-7 max-w-md text-sm leading-7 text-slate-300">Shree Graphics manufactures and supplies industrial machinery, spare parts and related engineering solutions for printing and converting applications.</p></div>
   <FooterColumn title="Machines" items={machines} />
   <FooterColumn title="Company" items={company} />
   <div><h3 className="text-xs font-semibold uppercase tracking-[.18em] text-[#95CCDD]">Contact</h3><div className="mt-6 space-y-5 text-sm"><a href="tel:+919820968449" className="flex gap-3 transition hover:text-white"><Phone size={17} className="shrink-0 text-[#F36A21]"/>+91 98209 68449</a><a href="mailto:shreeksr09@gmail.com" className="flex gap-3 transition hover:text-white"><Mail size={17} className="shrink-0 text-[#F36A21]"/>shreeksr09@gmail.com</a><div className="flex gap-3 leading-6"><MapPin size={17} className="mt-1 shrink-0 text-[#F36A21]"/>Maharashtra 421302, India</div></div></div>
  </Container>
  <div className="relative border-t border-[#95CCDD]/15 bg-[#081426]/45"><Container className="flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Shree Graphics. All rights reserved.</span><span>Printing · Converting · Engineering</span></Container></div>
 </footer>;
}
function FooterColumn({title,items}:{title:string;items:string[]}) { return <div><h3 className="text-xs font-semibold uppercase tracking-[.18em] text-[#95CCDD]">{title}</h3><ul className="mt-6 space-y-4">{items.map(item=><li key={item}><Link href={hrefs[item]} className="text-sm text-slate-300 transition hover:text-[#F36A21]">{item}</Link></li>)}</ul></div>; }
