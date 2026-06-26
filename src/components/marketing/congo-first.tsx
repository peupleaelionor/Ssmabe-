"use client";

import { motion } from "framer-motion";

const COUNTRIES = [
  { flag: "🇨🇩", name: "RD Congo", detail: "M-Pesa · Lingala · Kinshasa" },
  { flag: "🇨🇬", name: "Congo-Brazza", detail: "Airtel · Lingala · Brazzaville" },
  { flag: "🇫🇷", name: "France", detail: "Diaspora · Paris · Stripe" },
  { flag: "🇧🇪", name: "Belgique", detail: "Diaspora · Bruxelles · Stripe" },
  { flag: "🇨🇦", name: "Canada", detail: "Diaspora · Montréal · Interac" },
  { flag: "🇨🇮", name: "Côte d'Ivoire", detail: "Orange Money · Abidjan" },
  { flag: "🇨🇲", name: "Cameroun", detail: "MTN Money · Douala" },
  { flag: "🇸🇳", name: "Sénégal", detail: "Wave · Dakar" },
];

const STATS = [
  { value: "7", label: "Modes d'ambiance" },
  { value: "8", label: "Pays actifs" },
  { value: "5", label: "Langues" },
  { value: "100%", label: "Anonymat" },
];

export function CongoFirst() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-cuivre/20 border border-cuivre/30 rounded-full px-4 py-1.5 mb-6">
            <span>🇨🇩</span>
            <span className="text-xs font-bold text-cuivre uppercase tracking-wide">
              Congo First
            </span>
          </div>
          <h2 className="text-3xl font-black text-blanc-chaud mb-4 tracking-tight">
            Fait pour nous.
            <br />
            <span className="text-cuivre">Par nous.</span>
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed">
            Songi Songi Mabé est le seul produit de rencontre vocale qui parle
            vraiment lingala – pas juste en traduction, mais dans l&apos;âme du
            produit. M-Pesa natif. Villes congolaises. Diaspora connectée.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="text-center p-3 rounded-2xl bg-noir-card border border-noir-border"
            >
              <div className="text-xl font-black text-vert-light">
                {stat.value}
              </div>
              <div className="text-xs text-gris-texte mt-0.5 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Countries grid */}
        <div className="grid grid-cols-2 gap-3">
          {COUNTRIES.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="p-3 rounded-2xl bg-noir-card border border-noir-border hover:border-vert-congo/30 transition-colors"
            >
              <div className="text-2xl mb-1.5">{country.flag}</div>
              <div className="text-sm font-semibold text-blanc-chaud">
                {country.name}
              </div>
              <div className="text-xs text-gris-texte mt-0.5">
                {country.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Diaspora bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-5 rounded-2xl border border-cuivre/30 bg-cuivre/5 text-center"
        >
          <div className="text-2xl mb-2">✈️</div>
          <h3 className="font-bold text-blanc-chaud mb-2">
            Mode Diaspora : le pont voix
          </h3>
          <p className="text-sm text-gris-texte leading-relaxed">
            Paris–Kinshasa. Bruxelles–Brazzaville. Montréal–Goma.
            Songi Songi Mabé connecte la diaspora à sa patrie en un appel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
