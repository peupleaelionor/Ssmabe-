import type { DeepPartial } from "./index";
import type { Content } from "./fr";

/**
 * Contenu Lingala — partiel, fusionné sur le FR (fallback).
 * Les clés les plus visibles d'abord ; le reste retombe sur le FR.
 */
export const ln: DeepPartial<Content> = {
  brand: {
    tagline: "Mongongo liboso.",
    signature: "Mongongo liboso. Contact sima.",
  },
  navCta: "Kota na bêta",
  hero: {
    title1: "Réseau ya bomoi ya",
    title2: "mongongo ya Afrika.",
    subtitle:
      "Songi Songi Mabé ekangisi mingongo, makanisi mpe ba communautés kati ya RDC, Afrika mpe diaspora. Mongongo liboso. Contact sima, soki bino mibale bondimi.",
    ctaPrimary: "Kota na Songi Songi",
    ctaSecondary: "Tala vision",
    trust: "18+ kaka · Numéro ebombami · Boyokani ya mibale",
  },
  positioning: "Ebotami na Kinshasa. Ekanisami mpo na ba communautés nyonso.",
  beta: {
    title: "Kota na liboke ya liboso.",
    submit: "Kota na bêta",
    success: "Matondo. Demande na yo ekomami.",
    successSub: "Mabé akoyebisa yo tango bêta ekofungwama.",
  },
  footer: {
    signature: "Songi Songi Mabé — Mongongo liboso. Contact sima.",
  },
};
