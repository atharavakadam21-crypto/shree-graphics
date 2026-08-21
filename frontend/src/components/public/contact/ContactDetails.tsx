import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const details = [
  {
    number: "01",
    label: "Business",
    value: "Shree Graphics",
    description:
      "Industrial machinery manufacturing and engineering solutions.",
  },
  {
    number: "02",
    label: "Applications",
    value: "Label conversion",
    description:
      "Flexographic printing, slitting, die cutting and related systems.",
  },
  {
    number: "03",
    label: "Enquiries",
    value: "Machine / Service",
    description:
      "Discuss a machine, spare requirement, repair or custom system.",
  },
];

export default function ContactDetails() {
  return (
    <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <ScrollReveal>
            <SectionLabel number="02">
              Communication
            </SectionLabel>

            <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
              Start with the information that matters. We can take
              the conversation from there.
            </p>
          </ScrollReveal>  

          <div className="grid gap-0 border-t border-zinc-800 md:grid-cols-3 md:border-l">
            {details.map((detail, index) => (
              <ScrollReveal
                key={detail.number}
                delay={index * 100}
              >
                <div className="min-h-64 border-b border-zinc-800 p-7 md:border-r md:p-9 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-cyan-500">
                      {detail.number}
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                      SG
                    </span>
                  </div>

                  <p className="mt-12 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                    {detail.label}
                  </p>

                  <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white">
                    {detail.value}
                  </h2>

                  <p className="mt-5 text-sm leading-6 text-zinc-600">
                    {detail.description}
                  </p>
                </div>
              </ScrollReveal>  
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}