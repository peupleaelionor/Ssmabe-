import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PositioningBand } from "@/components/landing/PositioningBand";
import { Vibes } from "@/components/landing/Vibes";
import { Why } from "@/components/landing/Why";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CommunitiesSection } from "@/components/mvp/CommunitiesSection";
import { ForWho } from "@/components/landing/ForWho";
import { Sovereignty } from "@/components/landing/Sovereignty";
import { Difference } from "@/components/landing/Difference";
import { Roadmap } from "@/components/landing/Roadmap";
import { JoinAnyway } from "@/components/mvp/JoinAnyway";
import { BetaTeaser } from "@/components/mvp/BetaTeaser";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing Songi Songi Mabé — téléchat moderne.
 * Simple en façade : appel, WhatsApp, SMS, web, cercles.
 * Puissant derrière : voix, sécurité, low-data, diaspora, paiement futur.
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />
      <Hero />
      <PositioningBand />
      <Vibes />
      <Why />
      <Features />
      <HowItWorks />
      <CommunitiesSection />
      <ForWho />
      <Sovereignty />
      <Difference />
      <Roadmap />
      <JoinAnyway />
      <BetaTeaser />
      <Footer />
    </main>
  );
}
