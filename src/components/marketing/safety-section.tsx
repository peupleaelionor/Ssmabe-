"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { SAFETY_RULES } from "@/lib/constants/config";

export function SafetySection() {
  return (
    <section
      id="safety"
      className="py-20 px-4 bg-gradient-to-b from-vert-congo/5 to-transparent"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-vert-congo/20 border border-vert-congo/30 mb-6">
            <Shield className="w-7 h-7 text-vert-light" />
          </div>
          <h2 className="text-3xl font-black text-blanc-chaud mb-3 tracking-tight">
            Ta voix est libre.
            <br />
            <span className="text-vert-light">Ton numéro est protégé.</span>
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed">
            Nous avons construit la sécurité dans le cœur du produit.
            Pas en surface. Dans l&apos;architecture même.
          </p>
        </motion.div>

        <div className="space-y-4">
          {SAFETY_RULES.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-2xl border border-noir-border bg-noir-card"
            >
              <div className="w-10 h-10 rounded-xl bg-vert-congo/20 flex items-center justify-center text-xl shrink-0">
                {rule.icon}
              </div>
              <div>
                <h3 className="font-semibold text-blanc-chaud text-sm mb-0.5">
                  {rule.title}
                </h3>
                <p className="text-xs text-gris-texte leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Double consent mini-section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-6 rounded-2xl border border-cuivre/30 bg-cuivre/5 text-center"
        >
          <div className="text-2xl mb-2">🤝</div>
          <h3 className="font-bold text-blanc-chaud mb-1.5">
            Le contact seulement si les deux acceptent.
          </h3>
          <p className="text-sm text-gris-texte leading-relaxed">
            Aucune information n&apos;est échangée sans accord mutuel. Si une
            personne dit non, c&apos;est une fin propre — et aucun contact
            n&apos;est partagé.
          </p>
        </motion.div>

        {/* Promise box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 p-6 rounded-2xl border border-vert-congo bg-vert-congo/10 text-center"
        >
          <p className="text-sm font-medium text-blanc-chaud leading-relaxed">
            &ldquo;Aucun numéro de téléphone ne quitte nos serveurs.
            C&apos;est une promesse technique, pas un simple slogan.&rdquo;
          </p>
          <p className="text-xs text-gris-texte mt-3">
            — L&apos;équipe Songi Songi Mabé
          </p>
        </motion.div>
      </div>
    </section>
  );
}
