import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

import ServicesHero from "@/components/public/services/ServicesHero";
import ServiceSystems from "@/components/public/services/ServiceSystems";
import ServiceCTA from "@/components/public/services/ServiceCTA";

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606] text-white">
      <Header />

      <ServicesHero />

      <ServiceSystems />

      <ServiceCTA />

      <Footer />
    </main>
  );
}