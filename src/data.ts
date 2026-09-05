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

import frame33531 from './assets/Frame 33531.png'
import frame33532 from './assets/Frame 33532.png'
import frame33533 from './assets/Frame 33533.png'
import frame33534 from './assets/Frame 33534.png'
import frame33535 from './assets/Frame 33535.png'
import frame33536 from './assets/Frame 33536.png'
import frame33537 from './assets/Frame 33537.png'
import frame33538 from './assets/Frame 33538.png'
import frame33539 from './assets/Frame 33539.png'
import frame33540 from './assets/Frame 33540.png'

export interface Project {
  name: string
  /** Brand name as it is actually set in the artwork, for the client wall. */
  brand: string
  category: string
  year: string
  headline: string
  stat: string
  /** Cycled by the hero carousel while this project is selected. */
  images: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'Ipaybtc',
    brand: 'ipaybtc',
    category: 'Fintech',
    year: '2026',
    headline: 'iPayBTC — re‑Designing a Bitcoin Brand for Everyday Use',
    stat: '12TRN',
    images: [frame33531, frame33537],
  },
  {
    name: 'Escro',
    brand: 'Escro',
    category: 'Web3',
    year: '2025',
    headline: 'Escro — Making Peer‑to‑Peer Deals Feel Safe',
    stat: '4.2M',
    images: [frame33535],
  },
  {
    name: 'Tagmi',
    brand: 'Tagmi',
    category: 'E-commerce',
    year: '2025',
    headline: 'Tagmi — A Bold Identity for a Social Marketplace',
    stat: '860K',
    images: [frame33538],
  },
  {
    name: 'squaremetre',
    brand: 'squaremetre',
    category: 'Real Estate',
    year: '2024',
    headline: 'squaremetre — Fractional Property Investing, Simplified',
    stat: '1.8M',
    images: [frame33539],
  },
  {
    name: 'Fourstrides',
    brand: 'FourStrides',
    category: 'Sports & Lifestyle',
    year: '2024',
    headline: 'FourStrides — An Identity Built to Move',
    stat: '320K',
    images: [frame33532],
  },
  {
    name: 'Whotafrica',
    brand: 'Whotafrica',
    category: 'Fintech',
    year: '2023',
    headline: 'Whotafrica — Trusted Supply, End to End',
    stat: '540K',
    images: [frame33540],
  },
  {
    name: '3Projects',
    brand: '3PROJECTS',
    category: 'Motorsport',
    year: '2026',
    headline: '3PROJECTS — Complexity Isn’t a Hurdle. It’s an Asset.',
    stat: '2.6M',
    images: [frame33534, frame33536, frame33533],
  },
]
