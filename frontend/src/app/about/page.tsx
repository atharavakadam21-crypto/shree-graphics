import AboutHero from "@/components/public/about/AboutHero";
import AboutCTA from "@/components/public/about/AboutCTA";
import CapabilitiesStrip from "@/components/public/about/CapabilitiesStrip";
import CompanyStory from "@/components/public/about/CompanyStory";
import EngineeringApproach from "@/components/public/about/EngineeringApproach";

export const metadata = {
  title: "About | Shree Graphics",
  description:
    "Learn about Shree Graphics and our approach to industrial machinery engineering for the label converting and printing industry.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606]">
      <AboutHero />
      <CompanyStory />
      <EngineeringApproach />
      <CapabilitiesStrip />
      <AboutCTA />
    </main>
  );
}