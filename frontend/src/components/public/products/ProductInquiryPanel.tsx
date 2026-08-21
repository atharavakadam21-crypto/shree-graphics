import Link from "next/link";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface ProductInquiryPanelProps {
  machine: Machine;
}

export default function ProductInquiryPanel({
  machine,
}: ProductInquiryPanelProps) {
  return (
    <ScrollReveal>
      <div className="border border-zinc-800 bg-[#090909] p-7 sm:p-10 lg:p-12">
        <SectionLabel number="04">
          Machine enquiry
        </SectionLabel>

        <h2 className="mt-7 max-w-3xl text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-white sm:text-5xl">
          Discuss this
          <br />
          system.
        </h2>

        <p className="mt-7 max-w-xl border-l-2 border-cyan-500 pl-4 text-sm leading-7 text-zinc-500">
          Send us your production requirement and our team can
          discuss this machine, its application and the appropriate
          configuration.
        </p>

        <div className="mt-8 border-t border-zinc-800 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
            Selected machine
          </p>

          <p className="mt-3 text-sm uppercase text-zinc-300">
            {machine.name}
          </p>
        </div>

        <Link
          href={`/contact?machine=${encodeURIComponent(machine.id)}`}
          className="mt-8 flex min-h-14 items-center justify-between border border-zinc-700 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-500"
        >
          Send machine enquiry

          <span className="text-cyan-500">
            →
          </span>
        </Link>
      </div>
    </ScrollReveal>  
  );
}