import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PositioningBand } from "@/components/landing/PositioningBand";
import { Concept } from "@/components/landing/Concept";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Avatars } from "@/components/landing/Avatars";
import { Security } from "@/components/landing/Security";
import { BetaForm } from "@/components/landing/BetaForm";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing Songi Songi Mabé — premium, mobile-first.
 * Palette : noir profond · vert nuit · or doux. Typo : Playfair / Inter.
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />
      <Hero />
      <PositioningBand />
      <Concept />
      <HowItWorks />
      <Avatars />
      <Security />
      <BetaForm />
      <Footer />
    </main>
  );
}
