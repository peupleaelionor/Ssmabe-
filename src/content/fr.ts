/**
 * Contenu FR — source unique de la landing.
 * Tous les textes vivent ici, pas dans les composants.
 */
export const fr = {
  brand: {
    name: "Songi Songi Mabé",
    tagline: "Le téléchat moderne.",
    signature: "Simple comme un appel. Protégé comme une plateforme.",
  },

  nav: [
    { href: "/#ambiances", label: "Ambiances" },
    { href: "/create", label: "Créer un cercle" },
    { href: "/lite", label: "Mode léger" },
    { href: "/pricing", label: "Tarifs" },
    { href: "/beta", label: "Bêta" },
  ],
  navCta: "Entrer",

  hero: {
    badges: ["Téléchat moderne", "Appel · WhatsApp · Web"],
    title1: "Parle.",
    title2: "Rencontre. Rejoins.",
    subtitle:
      "Le téléchat moderne pour l’Afrique, la diaspora et toutes les communautés. Entre par appel, WhatsApp, SMS ou web. Ton numéro reste protégé.",
    ctaCall: "Appeler maintenant",
    ctaWhatsApp: "WhatsApp",
    ctaEnter: "Entrer sur le site",
    ctaCreate: "Créer mon cercle",
    trust: "18+ uniquement · Numéro masqué · Contact après consentement",
    trustChips: ["Sans app obligatoire", "Faible connexion", "Voix protégée", "Cercles ouverts au monde"],
  },

  positioning: "Simple comme un appel. Puissant comme une plateforme mondiale.",

  why: {
    title: "Pourquoi Songi Songi Mabé existe",
    problem: {
      title: "Le problème",
      text: "Les rencontres et les communautés sont dispersées entre réseaux sociaux, groupes WhatsApp et appels privés. On donne trop vite son numéro, on perd le fil, et les personnes peu connectées restent souvent dehors.",
    },
    solution: {
      title: "Notre réponse",
      text: "Un téléchat moderne : on appelle, on écoute, on parle, puis on rejoint un cercle si on veut. Le numéro reste protégé et chaque communauté garde une porte d’entrée simple : appel, WhatsApp, SMS, web ou mode léger.",
    },
  },

  features: {
    title: "Simple devant. Futuriste derrière.",
    subtitle: "L’utilisateur voit l’essentiel. L’architecture prépare la voix, les cercles, la confiance et les paiements futurs.",
    items: [
      { icon: "📞", name: "Appel direct", text: "Entrer même sans bonne connexion.", live: true },
      { icon: "🎙", name: "Rencontre vocale", text: "Écouter, parler, ressentir avant de partager son contact.", live: true },
      { icon: "💬", name: "WhatsApp / SMS", text: "Rejoindre sans installer une nouvelle app.", live: true },
      { icon: "⚡", name: "Mode léger", text: "Pensé pour vieux Android, 2G/3G et petits écrans.", live: true },
      { icon: "🧩", name: "Cercles", text: "Famille, diaspora, rencontre, assos, créateurs, événements." },
      { icon: "🔒", name: "Numéro protégé", text: "Contact seulement après consentement mutuel." },
      { icon: "🌍", name: "Diaspora", text: "Kinshasa, Paris, Bruxelles, Montréal, puis le monde." },
      { icon: "🗣", name: "Langues", text: "Français, lingala, swahili — puis traduction vocale future." },
      { icon: "🛡", name: "Modération", text: "Blocage, signalement, anti-arnaque, espaces 18+ séparés." },
      { icon: "💳", name: "Paiements futurs", text: "Créateurs, événements, cotisations, mobile money et Stripe." },
      { icon: "📲", name: "PWA", text: "Web d’abord, installable plus tard, sans friction." },
      { icon: "🧠", name: "IA discrète", text: "Matching, sécurité, traduction et aide invisible." },
    ],
  },

  how: {
    title: "Comment ça marche",
    intro:
      "Le cœur reste populaire : tu appelles ou tu entres, tu choisis une ambiance, tu écoutes ou tu parles, puis tu rejoins un cercle seulement si tu veux aller plus loin.",
    steps: [
      { num: "01", title: "Tu appelles ou tu entres", text: "Appel, WhatsApp, SMS, web ou mode léger : aucune app obligatoire." },
      { num: "02", title: "Tu choisis ton ambiance", text: "Rencontre, amitié, diaspora, ville, business, famille, événement." },
      { num: "03", title: "Tu écoutes ou tu parles", text: "La voix passe avant la photo. Tu avances sans pression." },
      { num: "04", title: "Tu rejoins un cercle", text: "Le contact et les numéros restent protégés jusqu’au consentement." },
    ],
  },

  vibes: {
    title: "Choisis ton ambiance",
    text: "Pas besoin de comprendre une plateforme compliquée. Tu choisis seulement l’énergie que tu veux rejoindre.",
    items: [
      { emoji: "💛", name: "Rencontre", text: "Parler avec des personnes réelles, sans exposer ton numéro." },
      { emoji: "🤝", name: "Amitié", text: "Créer du lien, discuter, retrouver une présence humaine." },
      { emoji: "🌍", name: "Diaspora", text: "France, Belgique, Canada, Afrique : garder le pont vivant." },
      { emoji: "📍", name: "Villes", text: "Kinshasa, Goma, Lubumbashi, Paris, Bruxelles, Montréal." },
      { emoji: "💼", name: "Business", text: "Réseau local, commerces, projets, services et opportunités." },
      { emoji: "🎤", name: "Créateurs", text: "Artistes, médias, podcasteurs, voix publiques et talents." },
      { emoji: "🏛", name: "Associations", text: "Groupes, communautés, familles, événements et entraide." },
      { emoji: "🕊", name: "Spiritualité", text: "Cercles respectueux, parole, guidance et transmission." },
    ],
  },

  rdc: {
    title: "Né à Kinshasa. Ouvert au monde.",
    text: "Le cœur bat au Congo, mais le produit n’enferme personne. Toute communauté peut créer sa porte d’entrée.",
    cities: ["Kinshasa", "Goma", "Lubumbashi", "Mbandaka", "Brazzaville"],
    diasporaLabel: "Diaspora",
    diaspora: ["France", "Belgique", "Canada"],
    next: "Ensuite : Abidjan, Dakar, Douala, puis toutes les communautés du monde.",
  },

  forWho: {
    title: "Pour qui ?",
    text: "Pour celles et ceux qui veulent parler, rencontrer, appartenir ou organiser sans complexité.",
    audiences: [
      "Rencontres", "Amitiés", "Diaspora", "Familles", "Créateurs",
      "Entrepreneurs", "Commerçants", "Associations", "Événements",
    ],
  },

  sovereignty: {
    title: "Protégé. Modéré. Digne de confiance.",
    text: "Un téléchat moderne doit être plus sûr qu’une ligne ouverte et plus humain qu’un réseau social bruyant.",
    points: [
      { icon: "🔒", title: "Numéro jamais affiché", text: "Ton contact reste masqué jusqu’à accord mutuel." },
      { icon: "✅", title: "Consentement clair", text: "On ne force pas le contact. Les deux personnes choisissent." },
      { icon: "⚖️", title: "Modération responsable", text: "Signalement rapide, anti-arnaque actif, 18+." },
      { icon: "📶", title: "Faible connexion", text: "Mode lite, WhatsApp, SMS et appel pour ne laisser personne dehors." },
      { icon: "🗣", title: "Langues locales", text: "Lingala, swahili, kikongo, tshiluba — puis traduction future." },
      { icon: "🧭", title: "Architecture durable", text: "Simple en façade, extensible pour 2030, 2040 et 2050." },
    ],
  },

  difference: {
    title: "Pourquoi c’est différent",
    points: [
      { title: "La voix avant la photo", text: "Ici on s’écoute d’abord. Pas de swipe vide, pas de vitrine agressive." },
      { title: "Plus simple qu’une app", text: "Tu peux entrer par appel, WhatsApp, SMS, web ou mode léger." },
      { title: "Rencontre + cercles", text: "Le cœur reste téléchat, mais chaque groupe peut devenir un cercle organisé." },
      { title: "Fait pour durer", text: "Les modes changent. Parler, rencontrer, appartenir et être protégé restent." },
    ],
  },

  roadmap: {
    title: "La route",
    phases: [
      { tag: "Maintenant", title: "Téléchat web + bêta", text: "Landing simple, appels/WhatsApp prêts par variables, mode léger.", active: true },
      { tag: "Ensuite", title: "Créer mon cercle", text: "Lien public, QR code, WhatsApp, SMS, règles, page lite." },
      { tag: "Puis", title: "Voix réelle", text: "Appels, salons vocaux, profils vocaux et consentement mutuel." },
      { tag: "Après", title: "Créateurs & événements", text: "Salons privés, billets, cotisations, Stripe et mobile money." },
      { tag: "Enfin", title: "Traduction & expansion", text: "Langues africaines, diaspora mondiale, IA discrète, app mobile." },
    ],
  },

  beta: {
    title: "Entre dans la première vague.",
    text: "On ouvre d’abord à une communauté limitée. Les premiers testeurs façonnent le téléchat moderne avec nous.",
    fields: { pseudo: "Prénom", country: "Pays", language: "Langue principale" },
    submit: "Rejoindre la bêta",
    submitting: "Envoi…",
    success: "Bienvenue dans la première vague. Votre demande bêta est bien enregistrée.",
    successSub: "Mabé te préviendra quand la bêta ouvre.",
    note: "Numéro optionnel · Jamais affiché publiquement · Contact après consentement.",
    successByProfile: {
      createur: "Bienvenue dans la première vague. Ton espace créateur est bien préparé.",
      diaspora: "Bienvenue. Ta communauté diaspora est bien prise en compte.",
      local: "Bienvenue. Ta communauté locale est bien enregistrée pour la bêta.",
    },
    errors: {
      pseudo: "Entre ton prénom (2 caractères minimum).",
      country: "Choisis ton pays.",
      language: "Choisis ta langue principale.",
      generic: "Une erreur est survenue. Réessaie.",
    },
  },

  communitiesSection: {
    title: "Cercles en préparation",
    text: "Des espaces simples par ville, ambiance et communauté. De Kinshasa à Montréal.",
    cta: "Voir les cercles",
  },

  contactSection: {
    title: "Parler à l’équipe",
    text: "Une question, un partenariat, une communauté à lancer ? On répond.",
  },

  faq: [
    { q: "C’est quoi Songi Songi Mabé ?", a: "Un téléchat moderne : appel, voix, WhatsApp, SMS, web, cercles et communautés — avec le numéro toujours protégé." },
    { q: "Est-ce limité à la RDC ?", a: "Non. Le cœur bat à Kinshasa, mais la plateforme est pensée pour toutes les communautés : Afrique, diaspora et monde." },
    { q: "Mon numéro est-il visible ?", a: "Jamais. Le numéro n’est jamais affiché publiquement et le contact ne s’échange qu’après consentement mutuel." },
    { q: "Faut-il installer une application ?", a: "Non. Le web, WhatsApp, SMS, l’appel et le mode léger passent avant l’app. L’app viendra plus tard." },
    { q: "Est-ce gratuit ?", a: "La bêta est gratuite. Des options créateur, association, business et événement arriveront plus tard." },
    { q: "Comment créer un cercle ?", a: "La page Créer un cercle prépare le flow : lien, QR code, WhatsApp, SMS, appel, règles et page lite." },
    { q: "Comment rejoindre la bêta ?", a: "Le formulaire prend une minute. Prénom, pays, langue — email ou téléphone selon le canal choisi." },
  ],

  footer: {
    signature: "Songi Songi Mabé — Le téléchat moderne. Simple comme un appel.",
    status: "Bêta privée en préparation · Web + appel + WhatsApp + SMS + lite ready",
    contact: "hello@songisongi.app",
    countries: "🇨🇩 🇨🇬 🇨🇮 🇸🇳 🇨🇲 🇫🇷 🇧🇪 🇨🇦 🌍",
    links: [
      { href: "/#ambiances", label: "Ambiances" },
      { href: "/create", label: "Créer un cercle" },
      { href: "/pricing", label: "Tarifs" },
    ],
    legal: "Mentions légales, confidentialité, modération et CGU bêta à maintenir avant ouverture publique.",
  },
};

export type Content = typeof fr;
