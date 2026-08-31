import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { WorldBand } from "@/components/landing/WorldBand";
import { Vibes } from "@/components/landing/Vibes";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CommunitiesSection } from "@/components/mvp/CommunitiesSection";
import { getCommunities } from "@/lib/communities";
import { Sovereignty } from "@/components/landing/Sovereignty";
import { BetaTeaser } from "@/components/mvp/BetaTeaser";
import { Footer } from "@/components/landing/Footer";
import { StickyEnter } from "@/components/mvp/StickyEnter";
import { TrackLanding } from "@/components/mvp/TrackLanding";
import { FLAGS } from "@/config/flags";

/**
 * Landing Songi Songi Mabé — simplifiée (une intention : entrer et parler).
 * Répond à 3 questions : c'est quoi (Hero + Vibes), comment j'entre (HowItWorks
 * + Entrer), à qui faire confiance (Sovereignty). Le reste a été retiré pour
 * ne pas noyer l'action principale (sections conservées comme composants).
 */
export default async function LandingPage() {
  const communities = await getCommunities();
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />
      <Hero />
      {FLAGS.avatarsEnabled && <WorldBand />}
      <Vibes />
      <HowItWorks />
      <CommunitiesSection communities={communities} />
      <Sovereignty />
      <BetaTeaser />
      <Footer />
      {FLAGS.stickyCtaEnabled && <StickyEnter />}
      <TrackLanding />
    </main>
  );
}
