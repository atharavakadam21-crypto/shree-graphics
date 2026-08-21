import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import HeroSection from "@/components/public/home/HeroSection";
import HomeCTA from "@/components/public/home/HomeCTA";
import MachineShowcase from "@/components/public/home/MachineShowcase";
import ManufacturingSection from "@/components/public/home/ManufacturingSection";
import PrecisionSection from "@/components/public/home/PrecisionSection";
import TechnicalStatement from "@/components/public/home/TechnicalStatement";
import FeaturedMachines from "@/components/public/home/FeaturedMachines";

export default function HomePage() {
  return (
    <main className="min-h-[100svh] overflow-x-hidden bg-[#050507] text-zinc-100 cad-grid-fine relative">
      {/* Structural CAD Grid Vertical Guidelines */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-20">
        <div className="w-[1px] h-full bg-zinc-800" />
        <div className="w-[1px] h-full bg-zinc-800 hidden md:block" />
        <div className="w-[1px] h-full bg-zinc-800 hidden lg:block" />
        <div className="w-[1px] h-full bg-zinc-800" />
      </div>

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <MachineShowcase />
        <PrecisionSection />
        <FeaturedMachines />
        <ManufacturingSection />
        <TechnicalStatement />
        <HomeCTA />
        <Footer />
      </div>
    </main>
  );
}