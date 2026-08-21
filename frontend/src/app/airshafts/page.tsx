import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

import AirShaftHero from "@/components/public/airshafts/AirShaftHero";
import AirShaftTypes from "@/components/public/airshafts/AirShaftTypes";
import AirShaftDiagram from "@/components/public/airshafts/AirShaftDiagram";

export default function AirShaftsPage() {
  return (
    <>
      <Header />

      <main>
        <AirShaftHero />
        <AirShaftTypes />
        <AirShaftDiagram />
      </main>

      <Footer />
    </>
  );
}