/**
 * Contenu FR — source unique de la landing.
 * Tous les textes vivent ici, pas dans les composants.
 */
export const fr = {
  brand: {
    name: "Songi Songi Mabé",
    tagline: "La voix d'abord.",
    signature: "La voix d'abord. Le contact après.",
  },

  nav: [
    { href: "/communautes", label: "Communautés" },
    { href: "/createurs", label: "Créateurs" },
    { href: "/diaspora", label: "Diaspora" },
    { href: "/#vision", label: "Vision" },
    { href: "/beta", label: "Bêta" },
  ],
  navCta: "Rejoindre la bêta",

  hero: {
    badges: ["Plateforme communautaire", "Kinshasa · Afrique · Monde"],
    title1: "Né à Kinshasa.",
    title2: "Pensé pour toutes les communautés.",
    subtitle:
      "Connectez-vous à votre communauté locale, échangez sur les sujets qui comptent, trouvez des voix proches de vous et restez informé des événements importants.",
    ctaPrimary: "Rejoindre la bêta",
    ctaSecondary: "Découvrir la vision",
    trust: "18+ uniquement · Numéro masqué · Double consentement",
    trustChips: ["Communautés actives", "Discussions respectueuses", "Numéro protégé", "Diaspora connectée"],
  },

  positioning: "La voix locale. La communauté mondiale.",

  why: {
    title: "Pourquoi Songi Songi Mabé existe",
    problem: {
      title: "Le problème",
      text: "Les voix africaines sont dispersées sur des plateformes qui ne leur appartiennent pas. Mal représentées, mal protégées, mal monétisées. Et pour se rencontrer, il faut donner son numéro à des inconnus.",
    },
    solution: {
      title: "Notre réponse",
      text: "Une plateforme sociale souveraine, née à Kinshasa. On s'y parle de vive voix, on y protège son numéro, on y retrouve sa langue. Utile ici, crédible partout.",
    },
  },

  features: {
    title: "Ce que tu pourras faire",
    subtitle: "Le MVP ouvre avec la voix. Le reste arrive, étape par étape.",
    items: [
      { icon: "🎙", name: "Appels vocaux", text: "Rencontre par la voix, numéro masqué.", live: true },
      { icon: "👤", name: "Profils", text: "Ton espace, ton pseudo, ta vibe." },
      { icon: "💬", name: "Salons", text: "Des espaces de parole par ville et par thème." },
      { icon: "📢", name: "Alertes locales", text: "Ce qui se passe près de chez toi." },
      { icon: "🔥", name: "Tendances", text: "Ce dont Kin, Abidjan et Paris parlent." },
      { icon: "🌍", name: "Mode diaspora", text: "Le pont entre le pays et l'ailleurs.", live: true },
      { icon: "🎧", name: "Audio court", text: "Des messages vocaux qui comptent." },
      { icon: "🤝", name: "Communautés", text: "Étudiants, artistes, commerçants, assos." },
      { icon: "⭐", name: "Créateurs", text: "Ta voix peut devenir ton travail." },
      { icon: "🛍", name: "Marketplace légère", text: "Vendre et acheter, sans usine à gaz." },
      { icon: "📱", name: "Mobile money", text: "Airtel, Orange, M-Pesa. Payer comme au pays." },
      { icon: "📶", name: "Mode faible connexion", text: "Pensé pour la 3G, pas pour la fibre.", live: true },
    ],
  },

  how: {
    title: "La voix d'abord. La communauté autour.",
    intro:
      "Songi Songi Mabé commence par la voix : on s'écoute, on échange, puis le contact vient seulement si les deux personnes sont d'accord. Autour de la voix, il y a tout le reste : communautés, salons, créateurs, alertes.",
    steps: [
      { num: "01", title: "Choisis ton pays", text: "Congo, France, Belgique, Canada… ton point de départ te ressemble." },
      { num: "02", title: "Choisis ta langue", text: "Français, lingala, swahili — parle comme chez toi." },
      { num: "03", title: "Trouve une voix", text: "Tu écoutes, tu ressens, tu choisis sans pression." },
      { num: "04", title: "Contact après accord", text: "Le numéro reste protégé jusqu'au consentement mutuel." },
    ],
  },

  rdc: {
    title: "RDC d'abord. Sans s'y enfermer.",
    text: "Le cœur bat à Kinshasa. Les ondes portent jusqu'à Bruxelles, Paris et Montréal.",
    cities: ["Kinshasa", "Goma", "Lubumbashi", "Mbandaka", "Brazzaville"],
    diasporaLabel: "Diaspora",
    diaspora: ["France", "Belgique", "Canada"],
    next: "Ensuite : Abidjan, Dakar, Douala.",
  },

  forWho: {
    title: "Pour qui ?",
    text: "Pour celles et ceux qui ont une voix et personne pour la porter.",
    audiences: [
      "Jeunes", "Créateurs", "Entrepreneurs", "Artistes", "Étudiants",
      "Commerçants", "Associations", "Diaspora", "Médias indépendants",
    ],
  },

  sovereignty: {
    title: "Souverain. Protégé. Digne de confiance.",
    text: "Une plateforme africaine qui protège ses gens : leurs données, leur numéro, leur langue et leur argent.",
    points: [
      { icon: "🔒", title: "Numéro jamais affiché", text: "Ton contact reste masqué jusqu'à accord mutuel." },
      { icon: "🛡", title: "Données protégées", text: "Collecte minimale. Rien n'est revendu." },
      { icon: "⚖️", title: "Modération responsable", text: "Signalement rapide, anti-arnaque actif, 18+." },
      { icon: "💳", title: "Paiement local", text: "Mobile money d'abord, cartes ensuite." },
      { icon: "🗣", title: "Langues africaines", text: "Lingala, swahili, kikongo, tshiluba — pas en option." },
      { icon: "🧭", title: "Indépendance", text: "Architecture portable. Prisonnière d'aucun fournisseur." },
    ],
  },

  difference: {
    title: "Pourquoi c'est différent",
    points: [
      { title: "La voix avant la photo", text: "Ici on s'écoute d'abord. Pas de swipe, pas de vitrine." },
      { title: "Plus qu'un téléchat", text: "Rencontre, salons, alertes, créateurs : une place publique, pas juste une ligne téléphonique." },
      { title: "Enraciné, pas enfermé", text: "Kinshasa au cœur, le monde à portée. Les deux, sans choisir." },
      { title: "Protégé par conception", text: "Numéro masqué et double consentement ne sont pas des options. C'est la base." },
    ],
  },

  roadmap: {
    title: "La route",
    phases: [
      { tag: "Maintenant", title: "MVP web + bêta", text: "Landing, inscriptions, démo vocale simulée.", active: true },
      { tag: "Ensuite", title: "Profils & posts", text: "Ton espace, tes messages, tes salons." },
      { tag: "Puis", title: "Voix en direct", text: "Appels réels, audio court, notifications." },
      { tag: "Après", title: "App mobile + mobile money", text: "Android d'abord. Airtel, Orange, M-Pesa." },
      { tag: "Enfin", title: "Créateurs & expansion", text: "Monétisation, IA locale, Afrique francophone." },
    ],
  },

  beta: {
    title: "Entre dans la première vague.",
    text: "On ouvre d'abord à une communauté limitée. Les premiers testeurs façonnent la plateforme avec nous.",
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
    title: "Communautés en action",
    text: "Des espaces réels, par ville et par passion. De Kinshasa à Montréal.",
    cta: "Voir toutes les communautés",
    worldLine: "Né à Kinshasa. Ouvert à toutes les communautés du monde.",
  },

  contactSection: {
    title: "Parler à l'équipe",
    text: "Une question, un partenariat, une communauté à lancer ? On répond.",
  },

  faq: [
    { q: "C'est quoi Songi Songi Mabé ?", a: "Une plateforme sociale communautaire née à Kinshasa : communautés locales, salons, voix, créateurs et diaspora — avec le numéro toujours protégé." },
    { q: "Est-ce limité à la RDC ?", a: "Non. Le cœur bat à Kinshasa, mais la plateforme est pensée pour toutes les communautés : Afrique, diaspora et monde." },
    { q: "Mon numéro est-il visible ?", a: "Jamais. Le numéro n'est jamais affiché publiquement et le contact ne s'échange qu'après consentement mutuel." },
    { q: "Quand l'application arrive ?", a: "Le web d'abord (PWA installable), puis l'app Android et iOS. Voir la page Applications." },
    { q: "Est-ce gratuit ?", a: "La bêta est gratuite. Certaines fonctions premium arriveront plus tard, toujours annoncées clairement." },
    { q: "Comment créer une communauté ?", a: "Rejoins la bêta avec le profil « Créateur » : les premiers espaces sont ouverts avec les premiers testeurs." },
    { q: "Comment rejoindre la bêta ?", a: "Le formulaire prend une minute. Prénom, email, pays — le téléphone est optionnel." },
  ],

  footer: {
    signature: "Songi Songi Mabé — La voix d'abord. Le contact après.",
    status: "Bêta privée en préparation",
    contact: "hello@songisongi.app",
    countries: "🇨🇩 🇨🇬 🇨🇮 🇸🇳 🇨🇲 🇫🇷 🇧🇪 🇨🇦",
    links: [
      { href: "#vision", label: "Vision" },
      { href: "#souverainete", label: "Souveraineté" },
      { href: "#beta", label: "Bêta" },
    ],
    legal: "Mentions légales et CGU disponibles à l'ouverture de la bêta.",
  },
};

export type Content = typeof fr;
