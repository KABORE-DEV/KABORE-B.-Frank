/**
 * ============================================
 *  CONFIGURATION DU PORTFOLIO
 *  Modifie ce fichier pour personnaliser ton site
 * ============================================
 */

const PORTFOLIO_CONFIG = {
  // --- Informations personnelles ---
  personal: {
    firstName: "Frank",
    lastName: "KABORE",
    title: "Étudiant en Génie Logiciel",
    subtitle: "2ème année · Passionné par le développement web & mobile",
    email: "kabore.dev@gmail.com",
    phone: "+226 52 76 62 73 / 06 41 84 57",
    location: "Burkina Faso - Bobo Dioulasso",
    bio: `Étudiant en 2ème année de génie logiciel, je suis passionné par la création
    d'applications web et mobiles. J'aime transformer des idées en solutions concrètes
    et apprendre de nouvelles technologies.`,
    avatar: "assets/KBF.png",
  },

  // Niveaux de compétences (plus crédible que des pourcentages)
  // learning  = "En cours d'apprentissage"
  // familiar  = "À l'aise / utilisé en cours"
  // practiced = "Utilisé dans des projets concrets"
  skillLevels: {
    learning: "En cours",
    familiar: "À l'aise",
    practiced: "Utilisé en projet",
  },

  // --- Liens sociaux ---
  social: {
    github: "https://github.com/KABORE-DEV",
    linkedin: "https://www.linkedin.com/in/frank-b-kabore-9117632b0/",
  },

  // --- Compétences ---
  skills: [
    {
      name: "HTML / CSS",
      level: "practiced",
      category: "front",
      context: "Utilisé dans tous mes projets web",
    },
    {
      name: "JavaScript",
      level: "practiced",
      category: "front",
      context: "Manipulation du DOM, logique applicative",
    },
    {
      name: "PHP",
      level: "learning",
      category: "back",
      context: "Scripts, algorithmique, projets universitaires",
    },
    {
      name: "Java",
      level: "practiced",
      category: "back",
      context: "POO, structures de données",
    },
    {
      name: "SQL",
      level: "practiced",
      category: "back",
      context: "Requêtes, modélisation de BDD",
    },
    {
      name: "Git / GitHub",
      level: "practiced",
      category: "tools",
      context: "Versioning de tous mes projets",
    },
    {
      name: "Figma",
      level: "learning",
      category: "tools",
      context: "Maquettes et prototypage UI",
    },
    {
      name: "React",
      level: "learning",
      category: "front",
      context: "En cours d'apprentissage",
    },
  ],

  // --- Projets ---
  projects: [
    {
      title: "Gestion de Compte électronique | Java",
      description:
        "Application console de gestion de comptes (transferts, retraits, consultation).",
      longDescription:
        "Application Java développée pour simuler un portefeuille électronique en mode console. Fonctionnalités : création et gestion de comptes, transferts entre comptes, gestion d'un compte administrateur, consultation des soldes.",
      features: [
        "Création et suppression de comptes",
        "Transferts et retrait d'argent",
        "Gestion d'un compte administrateur",
        "Journalisation simple des opérations",
      ],
      technologies: ["Java"],
      image: null,
      github: "https://github.com/KABORE-DEV/Gestion-Compte-Java",
      demo: null,
      featured: true,
    },
    {
      title: "Mise en place d'une base de Données | C et Mysql",
      description: "Projet en C pour la gestion de données (CRUD).",
      longDescription:
        "Travail en langage C portant sur la manipulation de fichiers et la gestion d'une base de données simple (CRUD).",
      features: [
        "Opérations CRUD",
        "Structures en C",
        "Sauvegarde dans des fichiers",
      ],
      technologies: ["C"],
      image: null,
      github: "https://github.com/KABORE-DEV/Base-de-Donn-es-C-",
      demo: null,
      featured: false,
    },
    {
      title: "Projet Coursera (HTML/CSS)",
      description: "Projet front-end réalisé dans le cadre d'un cours (CSS).",
      longDescription:
        "Mini-projet front-end mettant l'accent sur le design responsive et les bonnes pratiques CSS.",
      features: ["Design responsive", "CSS moderne"],
      technologies: ["HTML", "CSS"],
      image: null,
      github:
        "https://github.com/KABORE-DEV/https-Zeuxi.github.io-projet_coursera",
      demo: null,
      featured: true,
    },
    {
      title: "Portfolio (site personnel)",
      description:
        "Vitrine personnelle utilisée pour présenter les projets et le parcours.",
      longDescription:
        "Site personnel avec sections À propos, Compétences, Projets et Contact. Responsive et facile à maintenir.",
      features: [
        "Vitrine responsive",
        "Navigation ancrée",
        "Présentation de projets",
      ],
      technologies: ["HTML", "CSS", "JavaScript"],
      image: null,
      github: "https://github.com/KABORE-DEV/KABORE-B.-Frank",
      demo: null,
      featured: true,
    },
  ],

  // --- Formation ---
  education: [
    {
      degree: "Licence ",
      school: "Université Aube Nouvelle",
      period: "2026 — Présent",
      description:
        "Formation en développement logiciel, algorithmique, bases de données et gestion de projet.",
    },
    {
      degree: "Baccalauréat",
      school: "Collège Saint Joseph Moukassa de Koudougou",
      period: "2023",
      description: "SERIE D.",
    },
  ],

  // --- Expérience professionnelle ---
  // Laisse vide pour l'instant — un message "à venir" s'affichera automatiquement.
  experience: [],

  // --- Navigation ---
  nav: [
    { id: "accueil", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "competences", label: "Compétences" },
    { id: "projets", label: "Projets" },
    { id: "parcours", label: "Parcours" },
    { id: "contact", label: "Contact" },
  ],
};