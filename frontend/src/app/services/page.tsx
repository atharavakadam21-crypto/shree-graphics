import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import ServicesHero from "@/components/public/services/ServicesHero";
import ServiceSystems from "@/components/public/services/ServiceSystems";
import ServiceCTA from "@/components/public/services/ServiceCTA";

export default function ServicesPage() {
  return <main className="sg-blue-skin min-h-screen overflow-x-hidden bg-[#0B1220] text-white"><Header /><ServicesHero /><ServiceSystems /><ServiceCTA /><Footer /></main>;
}
