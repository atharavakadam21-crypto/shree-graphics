"use client";

import { Quote, ArrowUpRight } from "lucide-react";
import ScrollMotion from "@/components/public/ScrollMotion";
import ScrollReveal from "@/components/public/ScrollReveal";

const testimonials = [
  {
    quote:
      "We have always been impressed with the machine quality and service provided by Shree Graphics. Our printing machinery requirement was totally as per our day-to-day custom need. Shree Graphics put their extra efforts to understand the end product which we deliver to our clients. They gathered as much information as possible and the result of this is 100% satisfaction for us and for our esteemed customers.",
    name: "Ketan Vasani",
    company: "ADDON PAPER",
  },
  {
    quote:
      "Since 2005, we are successfully providing our printing solutions across India. When we started our setup in Bhiwandi, we faced several issues in delivering products as per customer industrial needs. But in 2005 we came across Mr. Kishor Kadam and got to know about his 100% tailor-made printing machinery production. We visited his unit and got assurance that he is the right person to solve all our printing equipment issues. From setting up the printing unit to making custom-shaped spare parts for our special printer, he assisted us in all ways. From that time, he has been our printing machinery consultant. We have got the right partner to strengthen our growth.",
    name: "Vinod Jain",
    company: "STICKER BAZAR",
  },
  {
    quote:
      "Our first machinery was imported from China and we got good business from it. But after one year it started giving us many issues and there was not the right technical person or assistance to handle it with a guarantee and care. In 2014, with the help of Shree Graphics, we built the same kind of machinery as per our custom need. This machine is far better than the imported one and that too with additional facilities. From thereafter, Shree Graphics is our only 'importer' in India and growth partner.",
    name: "Narendra Gupta",
    company: "IMAGING TECHNOLOGY",
  },
  {
    quote:
      "Our unit in Boisar and our clients have all from SME to big industrialists. We have 4 units with 6 machineries. Among 6 machineries, one is tailor-made from Shree Graphics. Till date, I have spent lacs of rupees in maintenance of other imported machineries and it really affected our deliveries. But the machinery unit which we got built from Shree Graphics is giving us flawless results with near to zero breakdown. I am sure in the nearby days we will have more setups with the help of Shree Graphics.",
    name: "Kamal Printways",
    company: "KAMAL PRINTWAYS",
  },
];

export default function PrecisionSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-zinc-800/80 bg-[#07070a] py-24 sm:py-28"
    >
      {/* Technical background grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[#2E1A6B]/10 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[10%] h-64 w-64 rounded-full bg-[#F5820C]/5 blur-[110px]" />
      </div>

      <ScrollMotion
        speed={0.045}
        direction={-1}
        id="precision-motion"
        className="relative"
      >
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <ScrollReveal delay={0}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F5820C]">
                  <span className="h-px w-10 bg-[#F5820C]" />
                  03 / Customer Experience
                </div>

                <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  TRUSTED BY
                  <br />
                  <span className="text-zinc-600">INDUSTRY.</span>
                  <br />
                  <span className="text-[#2E1A6B]">
                    PROVEN IN PRODUCTION.
                  </span>
                </h2>
              </div>

              <div className="border-l border-[#2E1A6B] pl-5 lg:col-span-4">
                <p className="text-sm leading-7 text-zinc-400">
                  From tailor-made machinery to technical support and
                  long-term service, our customers rely on Shree Graphics
                  to keep their production moving.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <ScrollMotion
                key={testimonial.name}
                speed={0.025 + index * 0.012}
                direction={index % 2 === 0 ? 1 : -1}
              >
                <ScrollReveal delay={index * 100}>
                  <article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden border border-zinc-800 bg-[#09090d] p-7 transition-all duration-500 hover:border-[#2E1A6B] hover:bg-[#0b0b11] sm:p-9">
                    <div className="absolute right-0 top-0 h-20 w-20 border-l border-b border-[#2E1A6B]/30 transition-colors duration-500 group-hover:border-[#F5820C]/40" />

                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#F5820C]/50 bg-[#F5820C]/5">
                        <Quote size={18} className="text-[#F5820C]" />
                      </div>

                      <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-700">
                        TESTIMONIAL / 0{index + 1}
                      </span>
                    </div>

                    <div className="mt-9 flex-1">
                      <p className="font-display text-lg font-medium leading-8 text-zinc-200 sm:text-xl">
                        “{testimonial.quote}”
                      </p>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-5 border-t border-zinc-800 pt-6">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-white">
                          {testimonial.name}
                        </p>

                        <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5820C]">
                          {testimonial.company}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="text-zinc-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F5820C]"
                      />
                    </div>
                  </article>
                </ScrollReveal>
              </ScrollMotion>
            ))}
          </div>

          {/* Bottom trust bar */}
          <ScrollMotion speed={0.035} direction={1}>
            <ScrollReveal delay={300}>
              <div className="mt-8 grid border border-zinc-800 bg-[#09090d] sm:grid-cols-3">
                <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    CUSTOMER FIRST
                  </span>

                  <p className="mt-2 text-sm font-semibold text-zinc-300">
                    Machinery engineered around real production requirements.
                  </p>
                </div>

                <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    TAILOR-MADE
                  </span>

                  <p className="mt-2 text-sm font-semibold text-zinc-300">
                    Solutions designed around the customer's application.
                  </p>
                </div>

                <div className="p-6">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    LONG-TERM PARTNERSHIP
                  </span>

                  <p className="mt-2 text-sm font-semibold text-zinc-300">
                    Technical support that continues beyond installation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </ScrollMotion>
        </div>
      </ScrollMotion>
    </section>
  );
}
