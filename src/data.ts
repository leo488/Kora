export interface NavLinkItem {
  label: string
  to?: string
  mega?: boolean
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', mega: true },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
]

export interface Service {
  name: string
  description: string
}

export const SERVICES: Service[] = [
  {
    name: 'Brand Strategy',
    description:
      'Positioning, messaging, and a clear plan for how your brand shows up and grows.',
  },
  {
    name: 'Visual Identity',
    description:
      'Logo, color, type, and a system that holds together across every touchpoint.',
  },
  {
    name: 'Web Design & Development',
    description:
      'Fast, well-crafted websites and web apps built to convert and scale.',
  },
  {
    name: 'Motion & Animation',
    description:
      'Brand films, product animation, and motion systems that bring identity to life.',
  },
  {
    name: 'Packaging Design',
    description:
      'Shelf-ready packaging that stands out and stays true to the brand.',
  },
  {
    name: 'Art Direction',
    description:
      'Photography and creative direction for campaigns, product, and content.',
  },
  {
    name: 'Social & Content',
    description:
      'Ongoing content systems and social design that keep momentum going.',
  },
  {
    name: 'Product Design',
    description: 'UX/UI for digital products, from first flow to shipped interface.',
  },
  {
    name: 'Naming & Verbal Identity',
    description: 'Names, taglines, and tone of voice that people actually remember.',
  },
  {
    name: 'Design Systems',
    description: 'Scalable component libraries and documentation for growing teams.',
  },
  {
    name: 'Pitch Decks & Investor Collateral',
    description: 'Decks and materials that help founders raise with confidence.',
  },
  {
    name: 'Rebranding & Brand Refresh',
    description:
      'A full evaluation and evolution of an existing brand that has outgrown itself.',
  },
]

export const OFFICES = ['London', 'New York', 'Lagos', 'Dubai']

export interface Project {
  name: string
  category: string
  year: string
  active?: boolean
}

export const PROJECTS: Project[] = [
  { name: 'Ipaybtc', category: 'Fintech', year: '2026', active: true },
  { name: 'Escro', category: 'Web3', year: '2025' },
  { name: 'Tagmi', category: 'E-commerce', year: '2025' },
  { name: 'squaremetre', category: 'Real Estate', year: '2024' },
  { name: 'Fourstrides', category: 'Sports & Lifestyle', year: '2024' },
  { name: 'Whotafrica', category: 'Fintech', year: '2023' },
]
