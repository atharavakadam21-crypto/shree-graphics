import Link from "next/link";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import ProductHero from "@/components/public/products/ProductHero";
import ProductGrid from "@/components/public/products/ProductGrid";
import ProductSpecsPreview from "@/components/public/products/ProductSpecsPreview";
import Badge from "@/components/public/ui/Badge";
import Button from "@/components/public/ui/Button";
import Container from "@/components/public/ui/Container";
import GlassCard from "@/components/public/ui/GlassCard";
import SectionHeading from "@/components/public/ui/SectionHeading";
import type { Machine } from "@/lib/types";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const apiCandidates = Array.from(new Set([configuredApiUrl, "http://localhost:5000", "http://127.0.0.1:5000"].filter((value): value is string => Boolean(value))));

async function getMachines(): Promise<Machine[]> {
  for (const baseUrl of apiCandidates) {
    try {
      const response = await fetch(`${baseUrl}/api/machines`, { cache: "no-store" });
      if (!response.ok) continue;
      const result = await response.json() as { success?: boolean; data?: Machine[] };
      if (result.success && Array.isArray(result.data)) return result.data;
    } catch { /* try next backend */ }
  }
  return [];
}

export default async function ProductsPage() {
  const machines = await getMachines();
  const featuredMachine = machines.find((machine) => machine.featured) ?? machines[0] ?? null;

  return <main className="min-h-screen overflow-x-hidden bg-[#0B1220] text-white">
    <Header/>
    <ProductHero/>

    <section className="relative overflow-hidden bg-[#101B31] py-24 sm:py-32">
      <div aria-hidden className="absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-[#4274D9]/20 blur-[150px]"/>
      <div aria-hidden className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#F36A21]/10 blur-[140px]"/>
      <Container className="relative">
        <SectionHeading eyebrow="Machine index" title="Explore our machine systems." description="Machine systems engineered for label production, printing, slitting, die cutting, rewinding and material conversion."/>
        <div className="mt-14"><ProductGrid machines={machines}/></div>
      </Container>
    </section>

    {featuredMachine ? <section className="relative overflow-hidden bg-[#0D1930] py-24 sm:py-32"><div aria-hidden className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#4274D9]/20 blur-[130px]"/><Container className="relative"><div className="mb-10"><Badge>Featured system</Badge></div><GlassCard className="overflow-hidden rounded-[2rem] border border-[#95CCDD]/20 bg-[#13213A]/80 p-2"><div className="grid lg:grid-cols-[1.15fr_.85fr]"><div className="relative min-h-[380px] rounded-[1.5rem] bg-[#0B1220]/70 sm:min-h-[520px]">{featuredMachine.images?.[0] ? <img src={featuredMachine.images[0]} alt={featuredMachine.name} className="absolute inset-0 h-full w-full object-contain p-8 sm:p-14"/> : <div className="grid h-full place-items-center text-xs uppercase tracking-[.2em] text-[#95CCDD]">Shree Graphics System</div>}</div><div className="flex flex-col justify-between p-7 sm:p-10"><div><Badge>Featured machine</Badge><h2 className="mt-6 font-display text-4xl font-black leading-[.95] tracking-[-.04em] sm:text-5xl">{featuredMachine.name}</h2><p className="mt-6 leading-8 text-slate-300">{featuredMachine.description || featuredMachine.short_description || "Technical information for this machine is available on enquiry."}</p><div className="mt-8"><ProductSpecsPreview specifications={featuredMachine.specifications}/></div></div><Link href={`/products/${featuredMachine.slug}`} className="mt-10"><Button className="w-full">Explore system</Button></Link></div></div></GlassCard></Container></section> : <section className="relative overflow-hidden bg-[#0D1930] py-24"><div aria-hidden className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F36A21]/10 blur-[130px]"/><Container className="relative"><GlassCard className="rounded-3xl border border-[#95CCDD]/20 bg-[#13213A]/80 p-10 text-center"><p className="text-slate-300">No machine systems are currently available. Please contact Shree Graphics for the latest manufacturing and converting solutions.</p></GlassCard></Container></section>}

    <section className="relative overflow-hidden bg-[#101B31] py-24 sm:py-32"><div aria-hidden className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F36A21]/10 blur-[140px]"/><Container className="relative"><GlassCard className="rounded-[2rem] border border-[#95CCDD]/20 bg-[#13213A]/85 p-8 sm:p-12"><div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end"><div><Badge>Production requirement</Badge><h2 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[.94] tracking-[-.05em] sm:text-6xl">Need a system for your <span className="text-[#F36A21]">process?</span></h2></div><div><p className="leading-8 text-slate-300">Tell us about your material, application and production requirement and discuss the appropriate machine configuration.</p><Link href="/contact" className="mt-7 block"><Button className="w-full">Start enquiry</Button></Link></div></div></GlassCard></Container></section>
    <Footer/>
  </main>;
}
