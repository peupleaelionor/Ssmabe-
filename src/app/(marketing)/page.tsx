import { MarketingHeader } from "@/components/marketing/marketing-header";
import { Hero } from "@/components/marketing/hero";
import { Concept } from "@/components/marketing/concept";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ModesSection } from "@/components/marketing/modes-section";
import { CongoFirst } from "@/components/marketing/congo-first";
import { SafetySection } from "@/components/marketing/safety-section";
import { BetaForm } from "@/components/marketing/beta-form";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-noir">
      <MarketingHeader />

      {/* Main content */}
      <div className="pt-14">
        <Hero />
        <Concept />
        <HowItWorks />
        <ModesSection />
        <CongoFirst />
        <SafetySection />
        <BetaForm />
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-noir-border">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-vert-congo flex items-center justify-center">
              <span aria-hidden>🎙</span>
            </div>
            <span className="font-black text-blanc-chaud">
              Songi Songi Mabé
            </span>
          </div>
          <p className="text-xs text-gris-texte mb-4">
            La voix d&apos;abord. Le contact après.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gris-texte mb-6">
            <a href="#concept" className="hover:text-blanc-chaud transition-colors">
              Concept
            </a>
            <span>·</span>
            <a href="#safety" className="hover:text-blanc-chaud transition-colors">
              Sécurité
            </a>
            <span>·</span>
            <a href="#beta" className="hover:text-blanc-chaud transition-colors">
              Bêta
            </a>
          </div>
          <p className="text-xs text-gris-texte/50">
            © 2025 Songi Songi Mabé · Né au Congo. Pensé pour la diaspora.
            Ouvert au monde. 🌍
          </p>
        </div>
      </footer>
    </main>
  );
}
