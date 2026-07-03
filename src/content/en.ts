import type { Content } from "./fr";

/**
 * Contenu EN — miroir concis du FR (préparation i18n).
 * La landing rend le FR aujourd'hui ; getContent("en") est prêt.
 */
export const en: Content = {
  brand: {
    name: "Songi Songi Mabé",
    tagline: "Voice first.",
    signature: "Voice first. Contact after.",
  },
  nav: [
    { href: "/communautes", label: "Communities" },
    { href: "/createurs", label: "Creators" },
    { href: "/diaspora", label: "Diaspora" },
    { href: "/#vision", label: "Vision" },
    { href: "/beta", label: "Beta" },
  ],
  navCta: "Join the beta",
  hero: {
    badges: ["Community platform", "Kinshasa · Africa · World"],
    title1: "Born in Kinshasa.",
    title2: "Built for every community.",
    subtitle:
      "Connect with your local community, discuss what matters, find voices near you and stay informed about important events.",
    ctaPrimary: "Join the beta",
    ctaSecondary: "Discover the vision",
    trust: "18+ only · Number hidden · Mutual consent",
    trustChips: ["Active communities", "Respectful discussions", "Protected number", "Connected diaspora"],
  },
  positioning: "Local voice. Global community.",
  why: {
    title: "Why Songi Songi Mabé exists",
    problem: {
      title: "The problem",
      text: "African voices are scattered across platforms they don't own. Poorly represented, poorly protected, poorly monetized. And meeting someone means handing your number to strangers.",
    },
    solution: {
      title: "Our answer",
      text: "A sovereign social platform, born in Kinshasa. You talk voice-first, your number stays private, your language is at home here. Useful locally, credible globally.",
    },
  },
  features: {
    title: "What you'll be able to do",
    subtitle: "The MVP opens with voice. The rest lands step by step.",
    items: [
      { icon: "🎙", name: "Voice calls", text: "Meet by voice, number hidden.", live: true },
      { icon: "👤", name: "Profiles", text: "Your space, your handle, your vibe." },
      { icon: "💬", name: "Rooms", text: "Talk spaces by city and topic." },
      { icon: "📢", name: "Local alerts", text: "What's happening near you." },
      { icon: "🔥", name: "Trends", text: "What Kin, Abidjan and Paris talk about." },
      { icon: "🌍", name: "Diaspora mode", text: "The bridge between home and abroad.", live: true },
      { icon: "🎧", name: "Short audio", text: "Voice notes that matter." },
      { icon: "🤝", name: "Communities", text: "Students, artists, traders, orgs." },
      { icon: "⭐", name: "Creators", text: "Your voice can become your work." },
      { icon: "🛍", name: "Light marketplace", text: "Buy and sell, no bloat." },
      { icon: "📱", name: "Mobile money", text: "Airtel, Orange, M-Pesa. Pay like home." },
      { icon: "📶", name: "Low-data mode", text: "Built for 3G, not for fiber.", live: true },
    ],
  },
  how: {
    title: "Voice first. Community all around.",
    intro:
      "Songi Songi Mabé starts with voice: you listen, you talk, and contact only comes if both agree. Around the voice, there's everything else: communities, rooms, creators, alerts.",
    steps: [
      { num: "01", title: "Pick your country", text: "Congo, France, Belgium, Canada… start where you belong." },
      { num: "02", title: "Pick your language", text: "French, Lingala, Swahili — talk like home." },
      { num: "03", title: "Find a voice", text: "You listen, you feel, you choose. No pressure." },
      { num: "04", title: "Contact after consent", text: "Numbers stay hidden until both agree." },
    ],
  },
  rdc: {
    title: "DRC first. Never locked in.",
    text: "The heart beats in Kinshasa. The signal reaches Brussels, Paris and Montreal.",
    cities: ["Kinshasa", "Goma", "Lubumbashi", "Mbandaka", "Brazzaville"],
    diasporaLabel: "Diaspora",
    diaspora: ["France", "Belgium", "Canada"],
    next: "Next: Abidjan, Dakar, Douala.",
  },
  forWho: {
    title: "Who is it for?",
    text: "For those with a voice and no one to carry it.",
    audiences: [
      "Youth", "Creators", "Entrepreneurs", "Artists", "Students",
      "Traders", "Organizations", "Diaspora", "Independent media",
    ],
  },
  sovereignty: {
    title: "Sovereign. Protected. Trustworthy.",
    text: "An African platform that protects its people: their data, their number, their language and their money.",
    points: [
      { icon: "🔒", title: "Number never shown", text: "Your contact stays hidden until mutual consent." },
      { icon: "🛡", title: "Protected data", text: "Minimal collection. Nothing resold." },
      { icon: "⚖️", title: "Responsible moderation", text: "Fast reporting, active anti-scam, 18+." },
      { icon: "💳", title: "Local payments", text: "Mobile money first, cards later." },
      { icon: "🗣", title: "African languages", text: "Lingala, Swahili, Kikongo, Tshiluba — not optional." },
      { icon: "🧭", title: "Independence", text: "Portable architecture. Captive to no vendor." },
    ],
  },
  difference: {
    title: "Why it's different",
    points: [
      { title: "Voice before photo", text: "Here you listen first. No swiping, no storefront." },
      { title: "More than a chat line", text: "Meeting, rooms, alerts, creators: a public square, not just a phone line." },
      { title: "Rooted, not fenced", text: "Kinshasa at the core, the world in reach. Both, no trade-off." },
      { title: "Protected by design", text: "Hidden numbers and mutual consent aren't options. They're the baseline." },
    ],
  },
  roadmap: {
    title: "The road",
    phases: [
      { tag: "Now", title: "Web MVP + beta", text: "Landing, signups, simulated voice demo.", active: true },
      { tag: "Next", title: "Profiles & posts", text: "Your space, your messages, your rooms." },
      { tag: "Then", title: "Live voice", text: "Real calls, short audio, notifications." },
      { tag: "After", title: "Mobile app + mobile money", text: "Android first. Airtel, Orange, M-Pesa." },
      { tag: "Finally", title: "Creators & expansion", text: "Monetization, local AI, francophone Africa." },
    ],
  },
  beta: {
    title: "Join the first wave.",
    text: "We open to a limited community first. Early testers shape the platform with us.",
    fields: { pseudo: "First name", country: "Country", language: "Main language" },
    submit: "Join the beta",
    submitting: "Sending…",
    success: "Welcome to the first wave. Your beta request has been recorded.",
    successSub: "Mabé will let you know when the beta opens.",
    note: "Phone optional · Never shown publicly · Contact after consent.",
    successByProfile: {
      createur: "Welcome to the first wave. Your creator space is ready.",
      diaspora: "Welcome. Your diaspora community is registered.",
      local: "Welcome. Your local community is registered for the beta.",
    },
    errors: {
      pseudo: "Enter your first name (2 characters minimum).",
      country: "Pick your country.",
      language: "Pick your main language.",
      generic: "Something went wrong. Try again.",
    },
  },
  communitiesSection: {
    title: "Communities in action",
    text: "Real spaces, by city and by passion. From Kinshasa to Montreal.",
    cta: "See all communities",
  },

  contactSection: {
    title: "Talk to the team",
    text: "A question, a partnership, a community to launch? We answer.",
  },

  faq: [
    { q: "What is Songi Songi Mabé?", a: "A community platform born in Kinshasa: local communities, rooms, voice, creators and diaspora — with your number always protected." },
    { q: "Is it DRC-only?", a: "No. The heart beats in Kinshasa, but the platform is built for every community: Africa, diaspora, world." },
    { q: "Is my number visible?", a: "Never. Numbers are never shown publicly and contact is only exchanged after mutual consent." },
    { q: "When does the app arrive?", a: "Web first (installable PWA), then Android and iOS." },
    { q: "Is it free?", a: "The beta is free. Premium features will come later, always clearly announced." },
    { q: "How do I create a community?", a: "Join the beta with the Creator profile: the first spaces open with the first testers." },
    { q: "How do I join the beta?", a: "The form takes one minute. First name, email, country — phone is optional." },
  ],

  footer: {
    signature: "Songi Songi Mabé — Voice first. Contact after.",
    status: "Private beta in preparation",
    contact: "hello@songisongi.app",
    countries: "🇨🇩 🇨🇬 🇨🇮 🇸🇳 🇨🇲 🇫🇷 🇧🇪 🇨🇦",
    links: [
      { href: "#vision", label: "Vision" },
      { href: "#souverainete", label: "Sovereignty" },
      { href: "#beta", label: "Beta" },
    ],
    legal: "Legal terms available at beta launch.",
  },
};
