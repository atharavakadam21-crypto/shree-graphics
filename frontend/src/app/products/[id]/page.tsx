import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import ScrollReveal from "@/components/public/ScrollReveal";

import ProductDetailHero from "@/components/public/products/ProductDetailHero";
import ProductGallery from "@/components/public/products/ProductGallery";
import ProductInquiryPanel from "@/components/public/products/ProductInquiryPanel";
import ProductSpecificationTable from "@/components/public/products/ProductSpecificationTable";
import RelatedMachines from "@/components/public/products/RelatedMachines";

import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

import type { Machine } from "@/lib/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function getMachines(): Promise<Machine[]> {
  try {
    const response = await fetch(`${API_URL}/api/machines`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch machines:",
        response.status,
        response.statusText
      );

      return [];
    }

    const result = (await response.json()) as {
      success: boolean;
      data?: Machine[];
    };

    if (!result.success || !result.data) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Failed to load machines:", error);

    return [];
  }
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const machines = await getMachines();

  const machine =
    machines.find(
      (item) => item.slug === id || item.id === id
    ) ?? null;

  if (!machine) {
    notFound();
  }

  const relatedMachines = machines.filter(
    (item) => item.id !== machine.id
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606] text-white">
      <Header />

      <ProductDetailHero machine={machine} />

      <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <ProductGallery machine={machine} />

            <ScrollReveal delay={120}>
              <SectionLabel number="02">
                System overview
              </SectionLabel>

              <h2 className="mt-8 text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-white sm:text-5xl">
                Engineered
                <br />
                for the
                <br />
                process.
              </h2>

              <p className="mt-8 border-l-2 border-orange-500 pl-4 text-sm leading-7 text-zinc-500">
                {machine.description ||
                  "Technical information for this machine is available on enquiry."}
              </p>

              <div className="mt-10 border-t border-zinc-800">
                <div className="grid grid-cols-2 border-b border-zinc-900 py-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    System status
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange-500">
                    {machine.is_active
                      ? "Operational"
                      : "Unavailable"}
                  </span>
                </div>

                <div className="grid grid-cols-2 border-b border-zinc-900 py-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    Machine ID
                  </span>

                  <span className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                    {machine.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 border-b border-zinc-900 py-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    System slug
                  </span>

                  <span className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                    {machine.slug}
                  </span>
                </div>
              </div>
            </ScrollReveal>   
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-900 bg-[#060606] py-24 sm:py-32 lg:py-40">
        <TechnicalGrid>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
              <ScrollReveal>
                <SectionLabel number="03">
                  Technical specifications
                </SectionLabel>

                <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
                  Machine specifications are presented directly
                  from the machine database.
                </p>
              </ScrollReveal>   

              <ProductSpecificationTable
                specifications={machine.specifications}
              />
            </div>
          </div>
        </TechnicalGrid>
      </section>

      <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <ProductInquiryPanel machine={machine} />
        </div>
      </section>

      <RelatedMachines machines={relatedMachines} />

      <section className="border-t border-zinc-900 bg-[#060606] py-10">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <Link
            href="/products"
            className="flex min-h-11 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-white"
          >
            <span>←</span>

            Back to machine index
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}