import type { DeepPartial } from "./index";
import type { Content } from "./fr";

/**
 * Contenu Lingala — partiel, fusionné sur le FR (fallback).
 * Les clés les plus visibles d'abord ; le reste retombe sur le FR.
 */
export const ln: DeepPartial<Content> = {
  brand: {
    tagline: "Téléchat ya sika.",
    signature: "Pasi te lokola kobenga. Ebatelami lokola plateforme.",
  },
  navCta: "Kota",
  hero: {
    title1: "Loba.",
    title2: "Kutana. Kota.",
    subtitle:
      "Téléchat ya sika mpo na Afrika, diaspora mpe ba communautés nyonso. Kota na appel, WhatsApp, SMS to web. Numéro na yo ebombami.",
    ctaCall: "Benga sikoyo",
    ctaWhatsApp: "WhatsApp",
    ctaEnter: "Kota na site",
    ctaCreate: "Sala cercle na ngai",
    trust: "18+ kaka · Numéro ebombami · Contact sima ya boyokani",
  },
  positioning: "Pasi te lokola kobenga. Makasi lokola plateforme ya mokili.",
  beta: {
    title: "Kota na liboke ya liboso.",
    submit: "Kota na bêta",
    success: "Matondo. Demande na yo ekomami.",
    successSub: "Mabé akoyebisa yo tango bêta ekofungwama.",
  },
  footer: {
    signature: "Songi Songi Mabé — Téléchat ya sika. Pasi te lokola kobenga.",
  },
};
