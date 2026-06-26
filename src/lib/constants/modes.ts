import { CallMode, CountryCode, type Mode } from "@/lib/types";

export const MODES: Record<CallMode, Mode> = {
  [CallMode.MBOKA]: {
    id: CallMode.MBOKA,
    label: "Mboka",
    labelFr: "Amour Local",
    description:
      "Rencontre des voix de ta ville. Même cité, même vibration. L'amour commence près de chez toi.",
    icon: "🏙️",
    safetyLevel: 4,
    defaultCallDuration: 180, // 3 min
    free: true,
    creditCost: 0,
    matchingRules: {
      requireSameCity: true,
      requireSameCountry: true,
      ageRange: [18, 45],
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    color: "#0F3D32",
  },

  [CallMode.LINGALA]: {
    id: CallMode.LINGALA,
    label: "Lingala",
    labelFr: "Musique & Culture",
    description:
      "Voix qui chantent, rient, vivent en lingala. Pour ceux qui portent la culture congo dans le cœur.",
    icon: "🎵",
    safetyLevel: 4,
    defaultCallDuration: 300, // 5 min
    free: true,
    creditCost: 0,
    matchingRules: {
      requireSameLanguage: true,
      ageRange: [18, 55],
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
    ],
    color: "#C76A2D",
  },

  [CallMode.SERIEUX]: {
    id: CallMode.SERIEUX,
    label: "Sérieux",
    labelFr: "Rencontre Sérieuse",
    description:
      "Tu cherches quelque chose qui dure. Voix qui respectent, intentions claires. Pas de jeu.",
    icon: "💍",
    safetyLevel: 5,
    defaultCallDuration: 600, // 10 min
    free: false,
    creditCost: 2,
    matchingRules: {
      requireVerified: true,
      ageRange: [21, 60],
      maxTrustDifference: 20,
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    color: "#0F3D32",
  },

  [CallMode.DIASPORA]: {
    id: CallMode.DIASPORA,
    label: "Diaspora",
    labelFr: "Pont Diaspora",
    description:
      "Un pont entre la diaspora et la patrie. Parle avec quelqu'un qui comprend les deux mondes.",
    icon: "✈️",
    safetyLevel: 4,
    defaultCallDuration: 480, // 8 min
    free: false,
    creditCost: 3,
    matchingRules: {
      prioritizeDiaspora: true,
      ageRange: [18, 65],
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
    ],
    color: "#C76A2D",
  },

  [CallMode.MONDE]: {
    id: CallMode.MONDE,
    label: "Monde",
    labelFr: "Ouvert au Monde",
    description:
      "Rencontre des voix de partout. Pas de frontières. Juste des humains qui parlent.",
    icon: "🌍",
    safetyLevel: 3,
    defaultCallDuration: 300,
    free: false,
    creditCost: 2,
    matchingRules: {
      ageRange: [18, 99],
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    color: "#0F3D32",
  },

  [CallMode.NUIT]: {
    id: CallMode.NUIT,
    label: "Nuit",
    labelFr: "Mode Nocturne",
    description:
      "Les vraies conversations naissent la nuit. Voix calmes, profonds, authentiques. 21h–5h.",
    icon: "🌙",
    safetyLevel: 3,
    defaultCallDuration: 900, // 15 min
    free: false,
    creditCost: 4,
    matchingRules: {
      ageRange: [21, 99],
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    timeRestriction: { start: 21, end: 5 },
    color: "#1a1a2e",
  },

  [CallMode.RESPECT]: {
    id: CallMode.RESPECT,
    label: "Respect",
    labelFr: "Voix qui Respectent",
    description:
      "Mode slow. On prend le temps. Voix posées, écoute active, zéro pression. Le respect avant tout.",
    icon: "🕊️",
    safetyLevel: 5,
    defaultCallDuration: 420, // 7 min
    free: false,
    creditCost: 1,
    matchingRules: {
      requireVerified: false,
      ageRange: [18, 99],
      maxTrustDifference: 30,
    },
    availableCountries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    color: "#2d4a3e",
  },
};

export const MODES_LIST = Object.values(MODES);
