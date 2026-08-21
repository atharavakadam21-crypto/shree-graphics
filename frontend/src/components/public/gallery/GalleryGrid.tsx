"use client";

import Image from "next/image";

import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const assets = [
  {
    src: "/gallery/DSC_1889.JPG",
    name: "Shree Graphics / Factory",
  },
  {
    src: "/gallery/turret-diecutting-machine.jpg",
    name: "Turret Diecutting Machine",
  },
  {
    src: "/gallery/two-color-flexo-printing-machine.jpg",
    name: "Two Color Flexo Printing Machine",
  },
];

export default function GalleryGrid() {
  return (
    <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[260px_1fr]">
          <ScrollReveal>
            <SectionLabel number="02">
              Visual archive
            </SectionLabel>

            <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
              A visual record of machines, engineering work and the
              production environment.
            </p>
          </ScrollReveal>  

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {assets.map((asset, index) => {
              const large = index === 0;

              return (
                <ScrollReveal
                  key={asset.src}
                  delay={index * 100}
                  className={
                    large
                      ? "sm:col-span-2 lg:col-span-7"
                      : "lg:col-span-5"
                  }
                >
                  <figure
                    className={`group relative overflow-hidden border border-zinc-800 bg-[#090909] ${
                      large
                        ? "aspect-[16/10]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={asset.src}
                      alt={asset.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                      className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/90 to-transparent p-5 pt-20">
                      <figcaption className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-300">
                        {asset.name}
                      </figcaption>

                      <span className="font-mono text-[8px] text-cyan-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </figure>
                </ScrollReveal>   
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}