"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import type { Machine } from "@/lib/types";

import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import ScrollReveal from "@/components/public/ScrollReveal";

import ContactHero from "@/components/public/contact/ContactHero";
import ContactDetails from "@/components/public/contact/ContactDetails";
import InquiryForm from "@/components/public/contact/InquiryForm";

import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

export default function ContactPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  useEffect(() => {
    async function loadMachines() {
      try {
        const response = await api.get<Machine[]>("/api/machines");

        if (response.success && response.data) {
          setMachines(
            response.data.filter((machine) => machine.is_active)
          );
        }
      } catch (error) {
        console.error(
          "Failed to load machines for inquiry form:",
          error
        );
      } finally {
        setLoadingMachines(false);
      }
    }

    loadMachines();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606] text-white">
      <Header />

      <ContactHero />

      <ContactDetails />

      <section className="border-y border-zinc-900 bg-[#060606] py-24 sm:py-32 lg:py-40">
        <TechnicalGrid>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
              <ScrollReveal>
                <SectionLabel number="03">
                  Send requirement
                </SectionLabel>

                <h2 className="mt-8 text-4xl font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-white sm:text-5xl">
                  Start the
                  <br />
                  conversation.
                </h2>

                <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
                  Select a machine if you already know what you need.
                  Otherwise, use the requirement field to describe
                  your process.
                </p>
              </ScrollReveal>   

              <ScrollReveal delay={120}>
                {loadingMachines ? (
                  <div className="flex min-h-[500px] items-center justify-center border border-zinc-800 bg-[#090909]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      Loading machine systems...
                    </div>
                  </div>
                ) : (
                  <InquiryForm
                    machines={machines.map((machine) => ({
                      id: machine.id,
                      name: machine.name,
                    }))}
                  />
                )}
              </ScrollReveal>  
            </div>
          </div>
        </TechnicalGrid>
      </section>

      <section className="bg-[#070707] py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="grid gap-10 border-t border-zinc-800 pt-10 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500">
                  SG / NEXT STEP
                </p>

                <h2 className="mt-6 max-w-5xl text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                  Know the machine
                  <br />
                  you need?
                </h2>
              </div>

              <div>
                <p className="border-l-2 border-cyan-500 pl-4 text-sm leading-7 text-zinc-600">
                  Explore the machine systems before sending your
                  requirement.
                </p>

                <Link
                  href="/products"
                  className="mt-7 flex min-h-12 items-center justify-between border border-zinc-700 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-500"
                >
                  View machines

                  <span className="text-cyan-500">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>   
        </div>
      </section>

      <Footer />
    </main>
  );
}