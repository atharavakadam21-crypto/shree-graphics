"use client";

import Image from "next/image";
import { useState } from "react";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";

interface ProductGalleryProps {
  machine: Machine;
}

export default function ProductGallery({
  machine,
}: ProductGalleryProps) {
  const images =
    machine.images?.length > 0
      ? machine.images
      : ["/images/logo.png"];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollReveal>
      <div className="space-y-4">
        <div className="relative min-h-[420px] overflow-hidden border border-zinc-800 bg-[#090909] sm:min-h-[620px]">
          <Image
            src={images[activeIndex]}
            alt={`${machine.name} image ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-contain p-10 sm:p-16"
          />

          <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
            VIEW / {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
            {images.length} IMAGE{images.length === 1 ? "" : "S"}
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex max-w-full gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-20 min-h-20 w-24 min-w-24 overflow-hidden border ${
                  activeIndex === index
                    ? "border-cyan-500"
                    : "border-zinc-800"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>  
  );
}