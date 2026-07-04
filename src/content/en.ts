import type { Content } from "./fr";

/**
 * EN content — concise mirror of FR for future i18n.
 * The landing renders FR today; getContent("en") remains ready.
 */
export const en: Content = {
  brand: {
    name: "Songi Songi Mabé",
    tagline: "The modern telechat.",
    signature: "Simple like a call. Protected like a platform.",
  },
  nav: [
    { href: "/#ambiances", label: "Vibes" },
    { href: "/create", label: "Create a circle" },
    { href: "/lite", label: "Lite mode" },
    { href: "/pricing", label: "Pricing" },
    { href: "/beta", label: "Beta" },
  ],
  navCta: "Enter",
  hero: {
    badges: ["Modern telechat", "Call · WhatsApp · Web"],
    title1: "Talk.",
    title2: "Meet. Join.",
    subtitle:
      "The modern telechat for Africa, the diaspora and every community. Enter by call, WhatsApp, SMS or web. Your number stays protected.",
    ctaCall: "Call now",
    ctaWhatsApp: "WhatsApp",
    ctaEnter: "Enter the site",
    ctaCreate: "Create my circle",
    trust: "18+ only · Number hidden · Contact after consent",
    trustChips: ["No app required", "Low-data ready", "Protected voice", "World-ready circles"],
  },
  positioning: "Simple like a call. Powerful like a global platform.",
  why: {
    title: "Why Songi Songi Mabé exists",
    problem: {
      title: "The problem",
      text: "Meetings and communities are scattered across social networks, WhatsApp groups and private calls. People share their number too fast, lose the thread, and low-connectivity users stay outside.",
    },
    solution: {
      title: "Our answer",
      text: "A modern telechat: call, listen, talk, then join a circle if you want. The number stays protected and every community keeps a simple door: call, WhatsApp, SMS, web or lite mode.",
    },
  },
  features: {
    title: "Simple upfront. Futuristic underneath.",
    subtitle: "Users see the essentials. The architecture prepares voice, circles, trust and future payments.",
    items: [
      { icon: "📞", name: "Direct call", text: "Enter even with poor connectivity.", live: true },
      { icon: "🎙", name: "Voice meeting", text: "Listen, speak and feel before sharing contact.", live: true },
      { icon: "💬", name: "WhatsApp / SMS", text: "Join without installing a new app.", live: true },
      { icon: "⚡", name: "Lite mode", text: "Built for old Android, 2G/3G and small screens.", live: true },
      { icon: "🧩", name: "Circles", text: "Family, diaspora, dating, orgs, creators, events." },
      { icon: "🔒", name: "Protected number", text: "Contact only after mutual consent." },
      { icon: "🌍", name: "Diaspora", text: "Kinshasa, Paris, Brussels, Montreal, then the world." },
      { icon: "🗣", name: "Languages", text: "French, Lingala, Swahili — future voice translation." },
      { icon: "🛡", name: "Moderation", text: "Block, report, anti-scam and separate 18+ spaces." },
      { icon: "💳", name: "Future payments", text: "Creators, events, dues, mobile money and Stripe." },
      { icon: "📲", name: "PWA", text: "Web first, installable later, no friction." },
      { icon: "🧠", name: "Discrete AI", text: "Matching, safety, translation and invisible help." },
    ],
  },
  how: {
    title: "How it works",
    intro:
      "The core stays popular: call or enter, pick a vibe, listen or talk, then join a circle only if you want to go further.",
    steps: [
      { num: "01", title: "Call or enter", text: "Call, WhatsApp, SMS, web or lite mode: no app required." },
      { num: "02", title: "Pick your vibe", text: "Dating, friendship, diaspora, city, business, family, event." },
      { num: "03", title: "Listen or talk", text: "Voice comes before photos. Move without pressure." },
      { num: "04", title: "Join a circle", text: "Contact and numbers stay protected until consent." },
    ],
  },
  vibes: {
    title: "Pick your vibe",
    text: "No need to understand a complicated platform. Just choose the energy you want to join.",
    items: [
      { emoji: "💛", name: "Dating", text: "Talk to real people without exposing your number." },
      { emoji: "🤝", name: "Friendship", text: "Create bonds, talk and find human presence." },
      { emoji: "🌍", name: "Diaspora", text: "France, Belgium, Canada, Africa: keep the bridge alive." },
      { emoji: "📍", name: "Cities", text: "Kinshasa, Goma, Lubumbashi, Paris, Brussels, Montreal." },
      { emoji: "💼", name: "Business", text: "Local network, shops, projects, services and opportunities." },
      { emoji: "🎤", name: "Creators", text: "Artists, media, podcasters, public voices and talent." },
      { emoji: "🏛", name: "Organizations", text: "Groups, communities, families, events and mutual aid." },
      { emoji: "🕊", name: "Spirituality", text: "Respectful circles, speech, guidance and transmission." },
    ],
  },
  rdc: {
    title: "Born in Kinshasa. Open to the world.",
    text: "The heart beats in Congo, but the product locks nobody in. Any community can create its own doorway.",
    cities: ["Kinshasa", "Goma", "Lubumbashi", "Mbandaka", "Brazzaville"],
    diasporaLabel: "Diaspora",
    diaspora: ["France", "Belgium", "Canada"],
    next: "Next: Abidjan, Dakar, Douala, then every community in the world.",
  },
  forWho: {
    title: "Who is it for?",
    text: "For people who want to talk, meet, belong or organize without complexity.",
    audiences: ["Dating", "Friendship", "Diaspora", "Families", "Creators", "Entrepreneurs", "Shops", "Organizations", "Events"],
  },
  sovereignty: {
    title: "Protected. Moderated. Trustworthy.",
    text: "A modern telechat must be safer than an open phone line and more human than a noisy social network.",
    points: [
      { icon: "🔒", title: "Number never shown", text: "Your contact stays hidden until mutual consent." },
      { icon: "✅", title: "Clear consent", text: "Contact is not forced. Both people choose." },
      { icon: "⚖️", title: "Responsible moderation", text: "Fast reporting, active anti-scam, 18+." },
      { icon: "📶", title: "Low connectivity", text: "Lite mode, WhatsApp, SMS and calls keep people included." },
      { icon: "🗣", title: "Local languages", text: "Lingala, Swahili, Kikongo, Tshiluba — then future translation." },
      { icon: "🧭", title: "Durable architecture", text: "Simple upfront, extensible for 2030, 2040 and 2050." },
    ],
  },
  difference: {
    title: "Why it's different",
    points: [
      { title: "Voice before photo", text: "Here you listen first. No empty swipe, no aggressive storefront." },
      { title: "Simpler than an app", text: "Enter by call, WhatsApp, SMS, web or lite mode." },
      { title: "Meeting + circles", text: "The core stays telechat, but every group can become an organized circle." },
      { title: "Built to last", text: "Trends change. Talking, meeting, belonging and safety remain." },
    ],
  },
  roadmap: {
    title: "The road",
    phases: [
      { tag: "Now", title: "Web telechat + beta", text: "Simple landing, call/WhatsApp ready by variables, lite mode.", active: true },
      { tag: "Next", title: "Create my circle", text: "Public link, QR code, WhatsApp, SMS, rules, lite page." },
      { tag: "Then", title: "Real voice", text: "Calls, voice rooms, voice profiles and mutual consent." },
      { tag: "After", title: "Creators & events", text: "Private rooms, tickets, dues, Stripe and mobile money." },
      { tag: "Finally", title: "Translation & expansion", text: "African languages, global diaspora, discrete AI, mobile app." },
    ],
  },
  beta: {
    title: "Join the first wave.",
    text: "We first open to a limited community. Early testers shape the modern telechat with us.",
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
    title: "Circles in preparation",
    text: "Simple spaces by city, vibe and community. From Kinshasa to Montreal.",
    cta: "See circles",
  },
  contactSection: {
    title: "Talk to the team",
    text: "A question, a partnership, a community to launch? We answer.",
  },
  faq: [
    { q: "What is Songi Songi Mabé?", a: "A modern telechat: call, voice, WhatsApp, SMS, web, circles and communities — with the number always protected." },
    { q: "Is it DRC-only?", a: "No. The heart beats in Kinshasa, but the platform is built for every community: Africa, diaspora, world." },
    { q: "Is my number visible?", a: "Never. Numbers are never shown publicly and contact is exchanged only after mutual consent." },
    { q: "Do I need to install an app?", a: "No. Web, WhatsApp, SMS, calls and lite mode come before the app. The app comes later." },
    { q: "Is it free?", a: "The beta is free. Creator, organization, business and event options come later." },
    { q: "How do I create a circle?", a: "The Create a circle page prepares the flow: link, QR code, WhatsApp, SMS, call, rules and lite page." },
    { q: "How do I join the beta?", a: "The form takes one minute. First name, country, language — email or phone depending on the channel." },
  ],
  footer: {
    signature: "Songi Songi Mabé — The modern telechat. Simple like a call.",
    status: "Private beta in preparation · Web + call + WhatsApp + SMS + lite ready",
    contact: "hello@songisongi.app",
    countries: "🇨🇩 🇨🇬 🇨🇮 🇸🇳 🇨🇲 🇫🇷 🇧🇪 🇨🇦 🌍",
    links: [
      { href: "/#ambiances", label: "Vibes" },
      { href: "/create", label: "Create a circle" },
      { href: "/pricing", label: "Pricing" },
    ],
    legal: "Legal terms, privacy, moderation and beta terms must be maintained before public launch.",
  },
};
