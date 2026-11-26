export type Discipline = 'graphisme' | 'ui' | 'code' | 'data'

export type Projet = {
  title: string
  discipline: Discipline
  label: string
  year: string
  description: string
  tools?: string
  href?: string
  image: string
  imagePosition?: string
}

export const disciplines: Record<Discipline, string> = {
  graphisme: 'Graphisme',
  ui: 'UI/UX',
  code: 'Code',
  data: 'Data',
}

export const projets: Projet[] = [
  {
    title: 'Ce portfolio',
    discipline: 'ui',
    label: 'UI/UX',
    year: '2026',
    description: 'Identité et site, maquettés dans Figma puis codés à la main.',
    tools: 'Figma · HTML · SCSS · TypeScript',
    image: '/img/textures/ui.webp',
  },
  {
    title: 'Bulle — « Tes Records »',
    discipline: 'data',
    label: 'Data',
    year: '2026',
    description: "Le tableau des records personnels de chaque utilisateur d'une app de concentration : 4 KPI créés de A à Z.",
    tools: 'Python · pandas · SQL · PostgreSQL',
    image: '/img/textures/data.webp',
    imagePosition: '20% 80%',
  },
  {
    title: 'Au Bonheur',
    discipline: 'code',
    label: 'Code · Full-stack',
    year: '2026',
    description: 'Site de réservation de restaurant : front React, API REST de 7 routes, authentification JWT à 2 rôles.',
    tools: 'React · Node.js · PostgreSQL',
    href: '/projets/au-bonheur.html',
    image: '/img/projets/au-bonheur/accueil.webp',
    imagePosition: '18% 50%',
  },
  {
    title: 'Artik — Kakémonos',
    discipline: 'graphisme',
    label: 'Graphisme',
    year: '2026',
    description: "2 kakémonos créés et déclinés selon l'identité visuelle de l'entreprise.",
    tools: 'Illustrator · Photoshop',
    image: '/img/textures/graphisme.webp',
    imagePosition: '10% 20%',
  },
  {
    title: 'Artik — Logo',
    discipline: 'graphisme',
    label: 'Graphisme',
    year: '2026',
    description: "Un logo refondu, avec création et adaptation d'éléments vectoriels.",
    tools: 'Illustrator',
    image: '/img/textures/graphisme.webp',
    imagePosition: '90% 40%',
  },
  {
    title: 'Artik — Carte de vœux',
    discipline: 'graphisme',
    label: 'Graphisme',
    year: '2026',
    description: 'Une carte de vœux conçue et illustrée digitalement pour les clients.',
    tools: 'Procreate',
    image: '/img/textures/graphisme.webp',
    imagePosition: '50% 90%',
  },
  {
    title: "Détection d'ampoules",
    discipline: 'data',
    label: 'Data · Code',
    year: '2026',
    description: 'Un modèle de vision par ordinateur qui repère les ampoules sur des plans électriques, servi par une API et une interface.',
    tools: 'Python · FastAPI · RF-DETR · TypeScript',
    href: '/projets/detection-ampoules.html',
    image: '/img/projets/detection-ampoules/detection-interface.webp',
  },
  {
    title: "Formes d'Amis",
    discipline: 'code',
    label: 'Code · Installation',
    year: '2025',
    description: 'Une installation interactive pour les Portes Ouvertes de GOBELINS : deux salles, deux caméras, des visiteurs changés en formes animées.',
    tools: 'WebRTC · Mediapipe · p5.js',
    href: '/projets/formes-d-amis.html',
    image: '/img/projets/formes-d-amis/signal-fleur.webp',
    imagePosition: '45% 50%',
  },
  {
    title: 'Appareil photo',
    discipline: 'graphisme',
    label: 'Graphisme · 3D',
    year: '2025',
    description: 'Un appareil photo modélisé dans Blender, découpé pièce par pièce puis animé dans une vidéo de 20 secondes.',
    tools: 'Blender',
    href: '/projets/appareil-photo.html',
    image: '/img/projets/appareil-photo.webp',
  },
  {
    title: 'Livret de voyage',
    discipline: 'graphisme',
    label: 'Graphisme · Édition',
    year: '2024',
    description: 'Un guide de voyage de 8 pages pour un séjour scolaire en Espagne : mise en page, typographie et photographie.',
    tools: 'Photoshop · InDesign',
    href: '/projets/livret-de-voyage.html',
    image: '/img/projets/livret-de-voyage/mockup.webp',
    imagePosition: '55% 50%',
  },
  {
    title: 'Une ligne et des âmes',
    discipline: 'graphisme',
    label: 'Graphisme · Scénographie',
    year: '2024',
    description: "L'affiche et la scénographie d'une exposition photographique sur une ligne de bus de Fresnes.",
    href: '/projets/une-ligne-et-des-ames.html',
    image: '/img/textures/graphisme.webp',
    imagePosition: '30% 40%',
  },
]
