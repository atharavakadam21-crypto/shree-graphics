"use client";

import ScrollReveal from "@/components/public/ScrollReveal";
import ScrollMotion from "../ScrollMotion";

const principles = [
  {
    number: "01",
    title: "PRECISION",
    description:
      "Machine construction and process control are approached with attention to dimensional accuracy, alignment and repeatable operation.",
  },
  {
    number: "02",
    title: "RELIABILITY",
    description:
      "Industrial equipment must work consistently in production. The engineering approach prioritises dependable operation and serviceability.",
  },
  {
    number: "03",
    title: "APPLICATION",
    description:
      "The machine exists to solve a production problem. Process requirements remain central to the way equipment is configured and developed.",
  },
];

export default function EngineeringApproach() {
  return (
    <section className="border-b border-zinc-900 bg-[#060606] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.3fr_0.7fr]">
          <ScrollReveal>
            <div className="sticky top-24 self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500">
                03 / Engineering
              </p>

              <h2 className="mt-8 max-w-sm text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                ENGINEERED
                <br />
                AROUND
                <br />
                THE PROCESS.
              </h2>
            </div>
          </ScrollReveal>   
          <div className="border-t border-zinc-800">
            {principles.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 100}>
                <article className="grid gap-8 border-b border-zinc-800 py-10 sm:grid-cols-[90px_1fr_1.2fr] sm:items-start">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-500">
                    {item.number}
                  </span>

                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {item.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-7 text-zinc-500">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>   
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}