"use client";

import Link from "next/link";

import ScrollReveal from "@/components/public/ScrollReveal";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <ScrollReveal>
            <div className="border-l-2 border-cyan-500 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500">
                05 / Next Operation
              </p>

              <h2 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.88] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
                LET&apos;S
                <br />
                BUILD THE
                <br />
                RIGHT MACHINE.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="border border-zinc-800 bg-[#090909] p-7 sm:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
                Start a conversation
              </p>

              <p className="mt-6 text-sm leading-7 text-zinc-500">
                Looking for a machine, a converting solution or technical
                support? Explore the equipment or send an inquiry directly.
              </p>

              <div className="mt-8 grid gap-3">
                <Link
                  href="/products"
                  className="flex min-h-12 items-center justify-between border border-zinc-700 px-5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-cyan-500 hover:text-cyan-400"
                >
                  <span>Explore Machines</span>
                  <span>↗</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-between border border-cyan-500/60 bg-cyan-500 px-5 text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors hover:bg-cyan-400"
                >
                  <span>Send Inquiry</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}