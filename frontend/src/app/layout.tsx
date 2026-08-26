import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "./public-theme.css";
import Assistant from "@/components/public/assistant/Assistant";
import MotionProvider from "@/components/public/MotionProvider";
import PublicTheme from "@/components/public/PublicTheme";

const displayFont = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--display-font", display: "swap" });
const bodyFont = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--body-font", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--mono-font", display: "swap" });

export const metadata: Metadata = {
  title: "Shree Graphics — High-Tolerance Flexographic & Slitting Machinery",
  description: "Engineers of high-speed flexographic printing, micro-slitting, and full rotary converting systems for industrial flexible packaging.",
  keywords: ["flexographic printing machine", "micro slitter rewinder", "rotary converting lines", "flexible packaging machinery", "Shree Graphics"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-[#0B1220] text-zinc-100 dark`}>
      <body className="font-body antialiased selection:bg-[#95CCDD] selection:text-[#0B1220]">
        <MotionProvider>
          <PublicTheme>{children}</PublicTheme>
        </MotionProvider>
        <Assistant />
      </body>
    </html>
  );
}
