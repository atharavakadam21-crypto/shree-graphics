import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import HeroGlass from "@/components/public/home/HeroGlass";
import HomeCTA from "@/components/public/home/HomeCTA";
import MachineShowcase from "@/components/public/home/MachineShowcase";
import ManufacturingSection from "@/components/public/home/ManufacturingSection";
import PrecisionSection from "@/components/public/home/PrecisionSection";
import TechnicalStatement from "@/components/public/home/TechnicalStatement";
import FeaturedMachines from "@/components/public/home/FeaturedMachines";

export default function HomePage() {
  return (
    <main className="min-h-[100svh] overflow-x-hidden bg-[#0B1220] text-zinc-100">
      <Header />
      <HeroGlass />
      <MachineShowcase />
      <PrecisionSection />
      <FeaturedMachines />
      <ManufacturingSection />
      <TechnicalStatement />
      <HomeCTA />
      <Footer />
    </main>
  );
}
