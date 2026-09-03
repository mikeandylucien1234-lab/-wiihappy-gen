import type { ReactNode } from 'react'
import type { OperationType } from '@/features/quote-form/types'

export interface ServiceStep {
  title: string
  description: string
}

export interface ServiceCategory {
  label: string
  /** Value written to the quote form's category field when this pastille is clicked. */
  formCategory: string
  placeholder: string
}

export interface ServiceContent {
  slug: string
  eyebrow: string
  title: string
  description: string
  heroImageLabel: string
  opType: OperationType
  defaultCategory: string
  iconColor: string
  icon: ReactNode
  steps: ServiceStep[]
  categories: ServiceCategory[]
  ctaTitle: string
  ctaDescription: string
  ctaLabel: string
}

const sharedCategories: ServiceCategory[] = [
  { label: 'Véhicules', formCategory: 'Véhicules', placeholder: 'Véhicules' },
  { label: 'Alimentation', formCategory: 'Alimentation', placeholder: 'Alimentation' },
  { label: 'Habillement', formCategory: 'Habillement', placeholder: 'Habillement' },
  { label: 'Autre / Sourcing', formCategory: 'Autre', placeholder: 'Sourcing sur-mesure' },
]

export const services: ServiceContent[] = [
  {
    slug: 'importation',
    eyebrow: 'SERVICE IMPORTATION',
    title: "Importez depuis la Chine et l'international en toute confiance",
    description:
      'Nous prenons en charge la vérification fournisseur, le contrôle qualité et la logistique — vous recevez vos produits sans mauvaise surprise.',
    heroImageLabel: 'Photo : entrepôt de marchandises prêtes à l’import',
    opType: 'Import',
    defaultCategory: 'Véhicules',
    iconColor: '#0057D9',
    icon: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
    steps: [
      {
        title: 'Vérification du fournisseur',
        description: 'Nous validons la fiabilité et la conformité de votre fournisseur en Chine ou à l’international.',
      },
      {
        title: 'Devis détaillé sous 48h',
        description: 'Vous recevez une proposition claire : coûts produit, transport et douane inclus.',
      },
      {
        title: 'Contrôle qualité avant expédition',
        description: 'Chaque commande est inspectée avant de quitter l’entrepôt fournisseur.',
      },
      {
        title: 'Livraison jusqu’à votre porte',
        description: 'Suivi transparent jusqu’à la réception, où que vous soyez.',
      },
    ],
    categories: sharedCategories,
    ctaTitle: 'Prêt à importer votre prochaine commande ?',
    ctaDescription: 'Décrivez votre besoin, nous revenons vers vous avec un devis détaillé sous 24-48h.',
    ctaLabel: "Demander un devis d'importation",
  },
  {
    slug: 'exportation',
    eyebrow: 'SERVICE EXPORTATION',
    title: 'Exportez vos produits partout dans le monde',
    description:
      'Cotation logistique sur mesure, choix du mode de transport et formalités d’expédition gérées de bout en bout.',
    heroImageLabel: 'Photo : conteneurs prêts à l’export sur un quai portuaire',
    opType: 'Export',
    defaultCategory: 'Véhicules',
    iconColor: '#0057D9',
    icon: (
      <>
        <rect x="3" y="10" width="14" height="8" rx="1.5" />
        <path d="M3 10l3-5h6l3 5M17 13h4l2 3v2h-6" />
      </>
    ),
    steps: [
      {
        title: 'Cotation logistique sur mesure',
        description: 'Nous établissons le meilleur itinéraire et coût selon votre volume et votre destination.',
      },
      {
        title: 'Choix du transport',
        description: 'Aérien pour la rapidité, maritime pour le volume — nous vous conseillons le bon arbitrage.',
      },
      {
        title: 'Formalités d’expédition gérées',
        description: 'Documents export, emballage et mise en conteneur pris en charge pour vous.',
      },
      {
        title: 'Suivi jusqu’à destination',
        description: 'Un point de contact unique du départ jusqu’à la livraison chez votre client.',
      },
    ],
    categories: sharedCategories,
    ctaTitle: 'Prêt à expédier vers l’international ?',
    ctaDescription: 'Indiquez votre destination et vos volumes, nous revenons vers vous avec une cotation sous 24-48h.',
    ctaLabel: "Demander un devis d'exportation",
  },
  {
    slug: 'sourcing-personnalise',
    eyebrow: 'SOURCING PERSONNALISÉ',
    title: 'Un produit hors catalogue ? Nous le trouvons pour vous',
    description:
      'Décrivez votre besoin, nous identifions et négocions avec les meilleurs fournisseurs pour vous, où qu’ils se trouvent.',
    heroImageLabel: 'Photo : équipe sourcing en usine à l’étranger',
    opType: 'Import',
    defaultCategory: 'Autre',
    iconColor: '#FF8C00',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    steps: [
      { title: 'Décrivez votre besoin', description: 'Photo, croquis ou simple description : tout nous est utile.' },
      {
        title: 'Nous identifions les fournisseurs',
        description: 'Notre réseau en Chine et à l’international nous permet de trouver des candidats fiables.',
      },
      {
        title: 'Négociation et achat',
        description: 'Nous négocions le meilleur prix et validons la commande avec vous.',
      },
      {
        title: 'Expédition prise en charge',
        description: 'Transport, douane et livraison jusqu’à votre porte, sans que vous ayez à intervenir.',
      },
    ],
    categories: sharedCategories,
    ctaTitle: 'Un produit précis en tête ?',
    ctaDescription: 'Décrivez-le-nous, même hors catalogue — nous nous chargeons de le trouver et de l’acheminer.',
    ctaLabel: 'Démarrer mon sourcing',
  },
  {
    slug: 'accompagnement-douane',
    eyebrow: 'ACCOMPAGNEMENT DOUANE',
    title: 'Formalités douanières gérées de bout en bout',
    description:
      'Documents, dépôt en douane et suivi du dossier : nous nous occupons de tout pour sécuriser votre opération.',
    heroImageLabel: 'Photo : dossier douanier et conteneurs en zone portuaire',
    opType: 'Import',
    defaultCategory: 'Véhicules',
    iconColor: '#FF8C00',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    steps: [
      {
        title: 'Analyse de votre dossier',
        description: 'Nous étudions la nature de votre marchandise et les règles applicables.',
      },
      {
        title: 'Préparation des documents requis',
        description: 'Facture, certificats, déclarations : tout est préparé en amont pour éviter les blocages.',
      },
      {
        title: 'Dépôt et suivi en douane',
        description: 'Nous déposons le dossier et suivons son traitement jusqu’à validation.',
      },
      {
        title: 'Livraison finale sécurisée',
        description: 'Une fois dédouanée, votre marchandise vous est livrée sans surprise de dernière minute.',
      },
    ],
    categories: sharedCategories,
    ctaTitle: 'Une opération à sécuriser côté douane ?',
    ctaDescription: 'Parlez-nous de votre dossier, nous vous disons comment le sécuriser sous 24-48h.',
    ctaLabel: 'Être accompagné pour ma douane',
  },
]

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return services.find((service) => service.slug === slug)
}
