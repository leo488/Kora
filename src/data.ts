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

export interface Office {
  /** Airport code, used as the oversized label on the contact band. */
  code: string
  city: string
  /** IANA zone — the band clocks each office in its own local time. */
  timeZone: string
  address: string[]
  email: string
  /** Rendered only when set, so an office without a listed line stays tidy. */
  phone?: string
  mapUrl: string
}

export const OFFICES: Office[] = [
  {
    code: 'LOS',
    city: 'Lagos',
    timeZone: 'Africa/Lagos',
    address: ['Victoria Island', 'Lagos', 'Nigeria'],
    email: 'lagos@kora.studio',
    mapUrl: 'https://maps.google.com/?q=Victoria+Island+Lagos+Nigeria',
  },
  {
    code: 'ABV',
    city: 'Abuja',
    timeZone: 'Africa/Lagos',
    address: ['Wuse II', 'Abuja, FCT', 'Nigeria'],
    email: 'abuja@kora.studio',
    mapUrl: 'https://maps.google.com/?q=Wuse+II+Abuja+Nigeria',
  },
]

import full31 from './assets/Frame 33531.jpg'
import full32 from './assets/Frame 33532.jpg'
import full33 from './assets/Frame 33533.jpg'
import full34 from './assets/Frame 33534.jpg'
import full35 from './assets/Frame 33535.jpg'
import full36 from './assets/Frame 33536.jpg'
import full37 from './assets/Frame 33537.jpg'
import full38 from './assets/Frame 33538.jpg'
import full39 from './assets/Frame 33539.jpg'
import full40 from './assets/Frame 33540.jpg'
import small31 from './assets/Frame 33531-900.jpg'
import small32 from './assets/Frame 33532-900.jpg'
import small33 from './assets/Frame 33533-900.jpg'
import small34 from './assets/Frame 33534-900.jpg'
import small35 from './assets/Frame 33535-900.jpg'
import small36 from './assets/Frame 33536-900.jpg'
import small37 from './assets/Frame 33537-900.jpg'
import small38 from './assets/Frame 33538-900.jpg'
import small39 from './assets/Frame 33539-900.jpg'
import small40 from './assets/Frame 33540-900.jpg'

export interface ProjectImage {
  /** 2000px plate, for desktop and high-density tablets. */
  src: string
  /** 900px variant — what a phone actually downloads, chosen by srcset. */
  small: string
}

/** Every frame ships at two widths; the hero picks per device. */
const FRAMES = {
  f31: { src: full31, small: small31 },
  f32: { src: full32, small: small32 },
  f33: { src: full33, small: small33 },
  f34: { src: full34, small: small34 },
  f35: { src: full35, small: small35 },
  f36: { src: full36, small: small36 },
  f37: { src: full37, small: small37 },
  f38: { src: full38, small: small38 },
  f39: { src: full39, small: small39 },
  f40: { src: full40, small: small40 },
} satisfies Record<string, ProjectImage>

export interface Project {
  name: string
  /** Brand name as it is actually set in the artwork, for the client wall. */
  brand: string
  category: string
  year: string
  headline: string
  stat: string
  /** Cycled by the hero carousel while this project is selected. */
  images: ProjectImage[]
}

export const PROJECTS: Project[] = [
  {
    name: 'Ipaybtc',
    brand: 'ipaybtc',
    category: 'Fintech',
    year: '2026',
    headline: 'iPayBTC — re‑Designing a Bitcoin Brand for Everyday Use',
    stat: '12TRN',
    images: [FRAMES.f31, FRAMES.f37],
  },
  {
    name: 'Escro',
    brand: 'Escro',
    category: 'Web3',
    year: '2025',
    headline: 'Escro — Making Peer‑to‑Peer Deals Feel Safe',
    stat: '4.2M',
    images: [FRAMES.f35],
  },
  {
    name: 'Tagmi',
    brand: 'Tagmi',
    category: 'E-commerce',
    year: '2025',
    headline: 'Tagmi — A Bold Identity for a Social Marketplace',
    stat: '860K',
    images: [FRAMES.f38],
  },
  {
    name: 'squaremetre',
    brand: 'squaremetre',
    category: 'Real Estate',
    year: '2024',
    headline: 'squaremetre — Fractional Property Investing, Simplified',
    stat: '1.8M',
    images: [FRAMES.f39],
  },
  {
    name: 'Fourstrides',
    brand: 'FourStrides',
    category: 'Sports & Lifestyle',
    year: '2024',
    headline: 'FourStrides — An Identity Built to Move',
    stat: '320K',
    images: [FRAMES.f32],
  },
  {
    name: 'Whotafrica',
    brand: 'Whotafrica',
    category: 'Fintech',
    year: '2023',
    headline: 'Whotafrica — Trusted Supply, End to End',
    stat: '540K',
    images: [FRAMES.f40],
  },
  {
    name: '3Projects',
    brand: '3PROJECTS',
    category: 'Motorsport',
    year: '2026',
    headline: '3PROJECTS — Complexity Isn’t a Hurdle. It’s an Asset.',
    stat: '2.6M',
    images: [FRAMES.f34, FRAMES.f36, FRAMES.f33],
  },
]

export interface HeroSlide {
  src: string
  /** Width-descriptor set, so a phone never pulls the 2000px plate. */
  srcSet: string
  project: Project
  /** Where this frame sits inside its own project, for alt text. */
  frame: number
  frameCount: number
}

/**
 * Flattens the projects into one continuous reel so the hero plays the whole
 * portfolio end to end, instead of looping whichever project is selected.
 */
export function buildHeroReel(projects: Project[]): HeroSlide[] {
  return projects.flatMap((project) =>
    project.images.map((image, i) => ({
      src: image.src,
      srcSet: `${image.small} 900w, ${image.src} 2000w`,
      project,
      frame: i + 1,
      frameCount: project.images.length,
    })),
  )
}

import logoOhobu from './assets/01.svg'
import logoTagmi from './assets/02.svg'
import logoCleon from './assets/03.svg'
import logoRefreeg from './assets/04.svg'
import logoCleonSpotless from './assets/05.svg'
import logoSquaremetre from './assets/06.svg'
import logoWhot from './assets/07.svg'
import logoFrameFest from './assets/08.svg'
import logoFourStrides from './assets/09.svg'
import logoThreeProjects from './assets/10.svg'

export interface Partner {
  name: string
  logo: string
  /**
   * Optical scale against the shared row height. Set at one height these do not
   * read as one size — the artwork runs from a 0.8:1 stacked lockup to a 6.8:1
   * wordmark, and a long wordmark at the same cap height as a square mark looks
   * roughly twice as big. Each multiplier is tuned so the marks carry the same
   * visual weight, not the same pixel height.
   */
  scale: number
}

export const PARTNERS: Partner[] = [
  { name: 'Õhobù', logo: logoOhobu, scale: 0.9 },
  { name: 'Tagmi', logo: logoTagmi, scale: 0.88 },
  // Stacked lockup, so it earns height it would never get from a shared cap.
  { name: 'Cleon', logo: logoCleon, scale: 1.45 },
  { name: 'Refreeg', logo: logoRefreeg, scale: 0.92 },
  { name: 'Cleon de Spotless', logo: logoCleonSpotless, scale: 0.82 },
  // Widest mark in the set at 6.8:1 — the most shrinking to do.
  { name: 'Squaremetre', logo: logoSquaremetre, scale: 0.72 },
  // Very heavy strokes, so it reads large even set small.
  { name: 'Whot', logo: logoWhot, scale: 0.66 },
  { name: 'Frame Fest', logo: logoFrameFest, scale: 0.86 },
  { name: 'FourStrides', logo: logoFourStrides, scale: 0.68 },
  { name: '3PROJECTS', logo: logoThreeProjects, scale: 0.74 },
]
