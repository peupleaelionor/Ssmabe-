import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { WhyDifferent } from "@/components/marketing/why-different";
import { CongoFirst } from "@/components/marketing/congo-first";
import { SafetySection } from "@/components/marketing/safety-section";
import { BetaForm } from "@/components/marketing/beta-form";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-noir">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-noir/90 backdrop-blur-md border-b border-noir-border">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-vert-congo flex items-center justify-center">
              <span className="text-base">🎙</span>
            </div>
            <span className="font-black text-blanc-chaud text-sm">
              Songi Songi Mabé
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#beta"
              className="text-xs text-gris-texte hover:text-blanc-chaud transition-colors px-3 py-1.5"
            >
              Bêta
            </a>
            <Link
              href="/onboarding"
              className="bg-vert-congo text-blanc-chaud text-xs font-semibold px-4 py-2 rounded-xl hover:bg-vert-light transition-colors"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-14">
        <Hero />
        <HowItWorks />
        <WhyDifferent />
        <CongoFirst />
        <SafetySection />
        <BetaForm />
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-noir-border">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-vert-congo flex items-center justify-center">
              <span>🎙</span>
            </div>
            <span className="font-black text-blanc-chaud">
              Songi Songi Mabé
            </span>
          </div>
          <p className="text-xs text-gris-texte mb-4">
            La voix qui connecte. Le numéro qui reste caché.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gris-texte mb-6">
            <a href="#" className="hover:text-blanc-chaud transition-colors">
              Confidentialité
            </a>
            <span>·</span>
            <a href="#" className="hover:text-blanc-chaud transition-colors">
              CGU
            </a>
            <span>·</span>
            <a href="#" className="hover:text-blanc-chaud transition-colors">
              Sécurité
            </a>
            <span>·</span>
            <a href="#" className="hover:text-blanc-chaud transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-gris-texte/50">
            © 2025 Songi Songi Mabé · Né au Congo · Pour le Monde 🌍
          </p>
        </div>
      </footer>
    </main>
  );
}
