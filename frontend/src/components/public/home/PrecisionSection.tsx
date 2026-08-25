"use client";

import { Quote, ArrowUpRight } from "lucide-react";
import ScrollMotion from "@/components/public/ScrollMotion";
import ScrollReveal from "@/components/public/ScrollReveal";

const testimonials = [
  { quote: "We have always been impressed with the machine quality and service provided by Shree Graphics. Our printing machinery requirement was totally as per our day-to-day custom need. Shree Graphics put their extra efforts to understand the end product which we deliver to our clients. They gathered as much information as possible and the result of this is 100% satisfaction for us and for our esteemed customers.", name: "Ketan Vasani", company: "ADDON PAPER" },
  { quote: "Since 2005, we are successfully providing our printing solutions across India. When we started our setup in Bhiwandi, we faced several issues in delivering products as per customer industrial needs. But in 2005 we came across Mr. Kishor Kadam and got to know about his 100% tailor-made printing machinery production. We visited his unit and got assurance that he is the right person to solve all our printing equipment issues. From setting up the printing unit to making custom-shaped spare parts for our special printer, he assisted us in all ways. From that time, he has been our printing machinery consultant. We have got the right partner to strengthen our growth.", name: "Vinod Jain", company: "STICKER BAZAR" },
  { quote: "Our first machinery was imported from China and we got good business from it. But after one year it started giving us many issues and there was not the right technical person or assistance to handle it with a guarantee and care. In 2014, with the help of Shree Graphics, we built the same kind of machinery as per our custom need. This machine is far better than the imported one and that too with additional facilities. From thereafter, Shree Graphics is our only 'importer' in India and growth partner.", name: "Narendra Gupta", company: "IMAGING TECHNOLOGY" },
  { quote: "Our unit in Boisar and our clients have all from SME to big industrialists. We have 4 units with 6 machineries. Among 6 machineries, one is tailor-made from Shree Graphics. Till date, I have spent lacs of rupees in maintenance of other imported machineries and it really affected our deliveries. But the machinery unit which we got built from Shree Graphics is giving us flawless results with near to zero breakdown. I am sure in the nearby days we will have more setups with the help of Shree Graphics.", name: "Kamal Printways", company: "KAMAL PRINTWAYS" },
];

export default function PrecisionSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden border-y border-[#95CCDD]/20 bg-[linear-gradient(135deg,#0B1220_0%,#13213A_48%,#101B31_100%)] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_25%,rgba(66,116,217,.22),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(243,106,33,.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(to right,rgba(149,204,221,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(149,204,221,.055) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

      <ScrollMotion speed={0.045} direction={-1} id="precision-motion" className="relative">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal delay={0}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F36A21]"><span className="h-px w-10 bg-[#F36A21]" />03 / Customer Experience</div>
                <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">TRUSTED BY<br/><span className="text-[#95CCDD]">INDUSTRY.</span><br/><span className="bg-gradient-to-r from-[#4274D9] via-[#95CCDD] to-white bg-clip-text text-transparent">PROVEN IN PRODUCTION.</span></h2>
              </div>
              <div className="border-l-2 border-[#F36A21] pl-5 lg:col-span-4"><p className="text-sm leading-7 text-slate-300">From tailor-made machinery to technical support and long-term service, our customers rely on Shree Graphics to keep their production moving.</p></div>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {testimonials.map((testimonial,index)=><ScrollMotion key={testimonial.name} speed={0.025+index*0.012} direction={index%2===0?1:-1}><ScrollReveal delay={index*100}><article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-[#95CCDD]/20 bg-[#13213A]/75 p-7 shadow-[0_20px_70px_rgba(0,0,0,.16)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4274D9]/70 hover:bg-[#172846] sm:p-9"><div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-[#4274D9]/40 transition-colors duration-500 group-hover:border-[#F36A21]/70"/><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F36A21]/60 bg-[#F36A21]/10"><Quote size={18} className="text-[#F36A21]"/></div><span className="font-mono text-[9px] tracking-[0.2em] text-[#95CCDD]/55">TESTIMONIAL / 0{index+1}</span></div><div className="mt-9 flex-1"><p className="font-display text-lg font-medium leading-8 text-slate-100 sm:text-xl">“{testimonial.quote}”</p></div><div className="mt-8 flex items-end justify-between gap-5 border-t border-[#95CCDD]/15 pt-6"><div><p className="text-sm font-bold uppercase tracking-wide text-white">{testimonial.name}</p><p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F36A21]">{testimonial.company}</p></div><ArrowUpRight size={17} className="text-[#95CCDD]/55 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F36A21]"/></div></article></ScrollReveal></ScrollMotion>)}
          </div>

          <ScrollMotion speed={0.035} direction={1}><ScrollReveal delay={300}><div className="mt-8 grid overflow-hidden rounded-2xl border border-[#95CCDD]/20 bg-[#101B31]/85 backdrop-blur-xl sm:grid-cols-3"><div className="border-b border-[#95CCDD]/15 p-6 sm:border-b-0 sm:border-r"><span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#95CCDD]/65">CUSTOMER FIRST</span><p className="mt-2 text-sm font-semibold text-slate-200">Machinery engineered around real production requirements.</p></div><div className="border-b border-[#95CCDD]/15 p-6 sm:border-b-0 sm:border-r"><span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#95CCDD]/65">TAILOR-MADE</span><p className="mt-2 text-sm font-semibold text-slate-200">Solutions designed around the customer's application.</p></div><div className="p-6"><span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#95CCDD]/65">LONG-TERM PARTNERSHIP</span><p className="mt-2 text-sm font-semibold text-slate-200">Technical support that continues beyond installation.</p></div></div></ScrollReveal></ScrollMotion>
        </div>
      </ScrollMotion>
    </section>
  );
}
