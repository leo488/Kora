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

/* Project media. Every still ships at 1200/2000/3000 so a phone never pulls a
   plate meant for a 5K display, and a 5K display never gets a soft one — the
   hero is full-bleed now, so the widest tier is what a retina laptop actually
   uses. The two brands still on their original art have no 3000 tier because
   their source never had the pixels for one.

   Names carry the project and the pixel width, so adding a frame is adding the
   next number rather than decoding an export name. */

import ipaybtc011200 from './assets/ipaybtc-01-1200.jpg'
import ipaybtc012000 from './assets/ipaybtc-01-2000.jpg'
import ipaybtc013000 from './assets/ipaybtc-01-3000.jpg'
import ipaybtc021200 from './assets/ipaybtc-02-1200.jpg'
import ipaybtc022000 from './assets/ipaybtc-02-2000.jpg'
import ipaybtc023000 from './assets/ipaybtc-02-3000.jpg'
import ipaybtc031200 from './assets/ipaybtc-03-1200.jpg'
import ipaybtc032000 from './assets/ipaybtc-03-2000.jpg'
import ipaybtc033000 from './assets/ipaybtc-03-3000.jpg'
import escro011200 from './assets/escro-01-1200.jpg'
import escro012000 from './assets/escro-01-2000.jpg'
import escro013000 from './assets/escro-01-3000.jpg'
import escro021200 from './assets/escro-02-1200.jpg'
import escro022000 from './assets/escro-02-2000.jpg'
import escro023000 from './assets/escro-02-3000.jpg'
import tagmi011200 from './assets/tagmi-01-1200.jpg'
import tagmi012000 from './assets/tagmi-01-2000.jpg'
import tagmi013000 from './assets/tagmi-01-3000.jpg'
import tagmi021200 from './assets/tagmi-02-1200.jpg'
import tagmi022000 from './assets/tagmi-02-2000.jpg'
import tagmi023000 from './assets/tagmi-02-3000.jpg'
import tagmi041200 from './assets/tagmi-04-1200.jpg'
import tagmi042000 from './assets/tagmi-04-2000.jpg'
import tagmi031200 from './assets/tagmi-03-1200.jpg'
import tagmi032000 from './assets/tagmi-03-2000.jpg'
import tagmi033000 from './assets/tagmi-03-3000.jpg'
import fourstrides011200 from './assets/fourstrides-01-1200.jpg'
import fourstrides012000 from './assets/fourstrides-01-2000.jpg'
import fourstrides013000 from './assets/fourstrides-01-3000.jpg'
import fourstrides021200 from './assets/fourstrides-02-1200.jpg'
import fourstrides022000 from './assets/fourstrides-02-2000.jpg'
import fourstrides023000 from './assets/fourstrides-02-3000.jpg'
import threeProjects011200 from './assets/3projects-01-1200.jpg'
import threeProjects012000 from './assets/3projects-01-2000.jpg'
import threeProjects013000 from './assets/3projects-01-3000.jpg'
import threeProjects021200 from './assets/3projects-02-1200.jpg'
import threeProjects022000 from './assets/3projects-02-2000.jpg'
import threeProjects023000 from './assets/3projects-02-3000.jpg'
import threeProjects031200 from './assets/3projects-03-1200.jpg'
import threeProjects032000 from './assets/3projects-03-2000.jpg'
import threeProjects033000 from './assets/3projects-03-3000.jpg'
import framefest011200 from './assets/framefest-01-1200.jpg'
import framefest012000 from './assets/framefest-01-2000.jpg'
import framefest013000 from './assets/framefest-01-3000.jpg'
import framefest021200 from './assets/framefest-02-1200.jpg'
import framefest022000 from './assets/framefest-02-2000.jpg'
import framefest023000 from './assets/framefest-02-3000.jpg'
import refreeg011200 from './assets/refreeg-01-1200.jpg'
import refreeg012000 from './assets/refreeg-01-2000.jpg'
import refreeg013000 from './assets/refreeg-01-3000.jpg'
import refreeg021200 from './assets/refreeg-02-1200.jpg'
import refreeg022000 from './assets/refreeg-02-2000.jpg'
import refreeg023000 from './assets/refreeg-02-3000.jpg'
import refreeg031200 from './assets/refreeg-03-1200.jpg'
import refreeg032000 from './assets/refreeg-03-2000.jpg'
import refreeg033000 from './assets/refreeg-03-3000.jpg'
import squaremetre011200 from './assets/squaremetre-01-1200.jpg'
import squaremetre012000 from './assets/squaremetre-01-2000.jpg'
import whotafrica011200 from './assets/whotafrica-01-1200.jpg'
import whotafrica012000 from './assets/whotafrica-01-2000.jpg'

/* The film is H.264 rather than the HEVC master it was cut from: Safari plays
   HEVC, but Firefox never does and Chrome only where the hardware obliges, so
   the master stays out of the bundle and this is what ships. */

import ipaybtcFilm from './assets/ipaybtc-motion.mp4'
import koraClosingFilm from './assets/kora-closing.mp4'
import koraClosingPoster1200 from './assets/kora-closing-poster-1200.jpg'
import koraClosingPoster2000 from './assets/kora-closing-poster-2000.jpg'
import ipaybtcFilmPoster1200 from './assets/ipaybtc-motion-poster-1200.jpg'
import ipaybtcFilmPoster2000 from './assets/ipaybtc-motion-poster-2000.jpg'

export interface ProjectImage {
  /** Widest plate available — also the plain `src` fallback. */
  src: string
  /** Every width this frame exists at, for the `srcset`. */
  widths: Array<{ url: string; w: number }>
}

/** Builds a frame from the tiers it actually has, widest last. */
function frame(tiers: Array<[string, number]>): ProjectImage {
  const widths = tiers.map(([url, w]) => ({ url, w }))
  return { src: widths[widths.length - 1].url, widths }
}

const FRAMES = {
  ipaybtc01: frame([[ipaybtc011200, 1200], [ipaybtc012000, 2000], [ipaybtc013000, 3000]]),
  ipaybtc02: frame([[ipaybtc021200, 1200], [ipaybtc022000, 2000], [ipaybtc023000, 3000]]),
  ipaybtc03: frame([[ipaybtc031200, 1200], [ipaybtc032000, 2000], [ipaybtc033000, 3000]]),
  escro01: frame([[escro011200, 1200], [escro012000, 2000], [escro013000, 3000]]),
  escro02: frame([[escro021200, 1200], [escro022000, 2000], [escro023000, 3000]]),
  // Only two tiers: the source is 2752px wide, so a 3000 would be upscaled —
  // bigger bytes for no more detail.
  tagmi04: frame([[tagmi041200, 1200], [tagmi042000, 2000]]),
  tagmi01: frame([[tagmi011200, 1200], [tagmi012000, 2000], [tagmi013000, 3000]]),
  tagmi02: frame([[tagmi021200, 1200], [tagmi022000, 2000], [tagmi023000, 3000]]),
  tagmi03: frame([[tagmi031200, 1200], [tagmi032000, 2000], [tagmi033000, 3000]]),
  fourstrides01: frame([[fourstrides011200, 1200], [fourstrides012000, 2000], [fourstrides013000, 3000]]),
  fourstrides02: frame([[fourstrides021200, 1200], [fourstrides022000, 2000], [fourstrides023000, 3000]]),
  threeProjects01: frame([[threeProjects011200, 1200], [threeProjects012000, 2000], [threeProjects013000, 3000]]),
  threeProjects02: frame([[threeProjects021200, 1200], [threeProjects022000, 2000], [threeProjects023000, 3000]]),
  threeProjects03: frame([[threeProjects031200, 1200], [threeProjects032000, 2000], [threeProjects033000, 3000]]),
  framefest01: frame([[framefest011200, 1200], [framefest012000, 2000], [framefest013000, 3000]]),
  framefest02: frame([[framefest021200, 1200], [framefest022000, 2000], [framefest023000, 3000]]),
  refreeg01: frame([[refreeg011200, 1200], [refreeg012000, 2000], [refreeg013000, 3000]]),
  refreeg02: frame([[refreeg021200, 1200], [refreeg022000, 2000], [refreeg023000, 3000]]),
  refreeg03: frame([[refreeg031200, 1200], [refreeg032000, 2000], [refreeg033000, 3000]]),
  squaremetre01: frame([[squaremetre011200, 1200], [squaremetre012000, 2000]]),
  whotafrica01: frame([[whotafrica011200, 1200], [whotafrica012000, 2000]]),
} satisfies Record<string, ProjectImage>

export interface ProjectFilm {
  /** H.264 MP4 — the one copy every target browser can decode. */
  src: string
  /** Shown until the first video frame can paint, and whenever autoplay is
      refused or the visitor has asked for reduced motion. */
  poster: ProjectImage
  /** The film's own running length, so the reel holds it to the last frame
      instead of cutting away mid-shot. */
  durationMs: number
}

const IPAYBTC_FILM: ProjectFilm = {
  src: ipaybtcFilm,
  poster: frame([
    [ipaybtcFilmPoster1200, 1200],
    [ipaybtcFilmPoster2000, 2000],
  ]),
  durationMs: 6050,
}

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
  /** Optional opening frame. When set it leads the project's reel, so a
      project that has motion opens on motion rather than on a still. */
  film?: ProjectFilm
}

export const PROJECTS: Project[] = [
  {
    name: 'Ipaybtc',
    brand: 'ipaybtc',
    category: 'Fintech',
    year: '2026',
    headline: 'iPayBTC — re‑Designing a Bitcoin Brand for Everyday Use',
    stat: '12TRN',
    film: IPAYBTC_FILM,
    images: [FRAMES.ipaybtc01, FRAMES.ipaybtc02, FRAMES.ipaybtc03],
  },
  {
    name: 'Escro',
    brand: 'Escro',
    category: 'Web3',
    year: '2025',
    headline: 'Escro — Making Peer‑to‑Peer Deals Feel Safe',
    stat: '4.2M',
    images: [FRAMES.escro01, FRAMES.escro02],
  },
  {
    name: 'Tagmi',
    brand: 'Tagmi',
    category: 'E-commerce',
    year: '2025',
    headline: 'Tagmi — A Bold Identity for a Social Marketplace',
    stat: '860K',
    images: [FRAMES.tagmi04, FRAMES.tagmi01, FRAMES.tagmi02, FRAMES.tagmi03],
  },
  {
    name: 'Framefest',
    brand: 'FRAME FEST',
    // TODO(kora): placeholder copy. The artwork is real; the category, year,
    // headline and stat are stand-ins — swap them for the actual brief.
    category: 'Events & Culture',
    year: '2025',
    headline: 'Frame Fest — An Identity for a Festival of Moving Image',
    stat: '—',
    images: [FRAMES.framefest01, FRAMES.framefest02],
  },
  {
    name: 'Refreeg',
    brand: 'Refreeg',
    // TODO(kora): placeholder copy — these three plates arrived labelled as
    // Frame Fest exports; the artwork is Refreeg's, the words are stand-ins.
    category: 'Social Impact',
    year: '2025',
    headline: 'Refreeg — Giving, Made Direct',
    stat: '—',
    images: [FRAMES.refreeg01, FRAMES.refreeg02, FRAMES.refreeg03],
  },
  {
    name: 'squaremetre',
    brand: 'squaremetre',
    category: 'Real Estate',
    year: '2024',
    headline: 'squaremetre — Fractional Property Investing, Simplified',
    stat: '1.8M',
    // Still on its original plate: no new art was supplied for this one.
    images: [FRAMES.squaremetre01],
  },
  {
    name: 'Fourstrides',
    brand: 'FourStrides',
    category: 'Sports & Lifestyle',
    year: '2024',
    headline: 'FourStrides — An Identity Built to Move',
    stat: '320K',
    images: [FRAMES.fourstrides01, FRAMES.fourstrides02],
  },
  {
    name: 'Whotafrica',
    brand: 'Whotafrica',
    category: 'Fintech',
    year: '2023',
    headline: 'Whotafrica — Trusted Supply, End to End',
    stat: '540K',
    // As with squaremetre — no new art supplied, so the original stands.
    images: [FRAMES.whotafrica01],
  },
  {
    name: '3Projects',
    brand: '3PROJECTS',
    category: 'Motorsport',
    year: '2026',
    headline: '3PROJECTS — Complexity Isn’t a Hurdle. It’s an Asset.',
    stat: '2.6M',
    images: [FRAMES.threeProjects01, FRAMES.threeProjects02, FRAMES.threeProjects03],
  },
]

/** The narrowest tier — for the thumbnail-sized reveals on the About page,
    which are never larger than a line of text. */
export function thumbOf(image: ProjectImage): string {
  return image.widths[0].url
}

/** A frame's `srcset`, built from the tiers it actually ships at. */
export function srcSetFor(image: ProjectImage): string {
  return image.widths.map(({ url, w }) => `${url} ${w}w`).join(', ')
}

export interface HeroCaption {
  brand: string
  category: string
  year: string
  stat: string
  headline: string
}

export interface HeroSlide {
  /** Stable React key, and what the copy block re-cuts on. */
  key: string
  /** The still for this frame — or, on a film, the poster under it. */
  src: string
  srcSet: string
  /** Set only on a film frame; `src` above is then its poster. */
  video?: string
  /** A film holds for its own length; a still takes the reel's interval. */
  holdMs?: number
  /** Absent on the closing film, which plays as pure atmosphere. */
  caption?: HeroCaption
  frame: number
  frameCount: number
}

/** The closing film: a street plate that belongs to no project, so it plays
    without a caption and hands the reel back to the top. */
const CLOSING_FILM: ProjectFilm = {
  src: koraClosingFilm,
  poster: frame([
    [koraClosingPoster1200, 1200],
    [koraClosingPoster2000, 2000],
  ]),
  durationMs: 4040,
}

/* The hero reel, in order. It opens on the iPayBTC film, walks through four
   projects, and closes on a street plate before returning to the top. This is
   deliberately not the whole portfolio — that lives on the Work page. */

type ReelEntry =
  | { project: string; film: true }
  | { project: string; frame: number }
  | { closing: true }

const HERO_REEL: ReelEntry[] = [
  { project: 'Ipaybtc', film: true },
  // The billboard plate only — the key-tag frame sits on the Work wall.
  { project: '3Projects', frame: 0 },
  // Heads together. The 3D mark and the app screens stay on Work.
  { project: 'Refreeg', frame: 0 },
  // Tagmi leads on its 3D characters, then cuts to the icon lockup.
  { project: 'Tagmi', frame: 0 },
  { project: 'Tagmi', frame: 2 },
  // The illustrated pair; the rainbow plate stays on Work.
  { project: 'Framefest', frame: 0 },
  { closing: true },
]

/** Resolves HERO_REEL against PROJECTS into the slides the hero plays. */
export function buildHeroReel(): HeroSlide[] {
  const frameCount = HERO_REEL.length

  return HERO_REEL.map((entry, i): HeroSlide => {
    const base = { frame: i + 1, frameCount }

    if ('closing' in entry) {
      return {
        ...base,
        key: 'closing',
        src: CLOSING_FILM.poster.src,
        srcSet: srcSetFor(CLOSING_FILM.poster),
        video: CLOSING_FILM.src,
        holdMs: CLOSING_FILM.durationMs,
      }
    }

    const project = PROJECTS.find((p) => p.name === entry.project)
    if (!project) throw new Error(`HERO_REEL names an unknown project: ${entry.project}`)

    const caption: HeroCaption = {
      brand: project.brand,
      category: project.category,
      year: project.year,
      stat: project.stat,
      headline: project.headline,
    }

    if ('film' in entry) {
      if (!project.film) throw new Error(`${project.name} has no film to lead with`)
      return {
        ...base,
        key: `${project.name}-film`,
        src: project.film.poster.src,
        srcSet: srcSetFor(project.film.poster),
        video: project.film.src,
        holdMs: project.film.durationMs,
        caption,
      }
    }

    const image = project.images[entry.frame]
    if (!image) throw new Error(`${project.name} has no frame ${entry.frame}`)
    return {
      ...base,
      key: `${project.name}-${entry.frame}`,
      src: image.src,
      srcSet: srcSetFor(image),
      caption,
    }
  })
}

import logoOhobu from './assets/logo-ohobu.svg'
import logoTagmi from './assets/logo-tagmi.svg'
import logoCleon from './assets/logo-cleon.svg'
import logoRefreeg from './assets/logo-refreeg.svg'
import logoCleonSpotless from './assets/logo-cleon-de-spotless.svg'
import logoSquaremetre from './assets/logo-squaremetre.svg'
import logoWhot from './assets/logo-whot.svg'
import logoFrameFest from './assets/logo-frame-fest.svg'
import logoFourStrides from './assets/logo-fourstrides.svg'
import logoThreeProjects from './assets/logo-3projects.svg'

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
  // Widest mark in the set at 6.8:1, and the diamond — not the word — sets its
  // box height, so a scale that matched boxes left the lettering undersized.
  // Sized off the cap height instead: 0.86 puts "Squaremetre" at ~25px.
  { name: 'Squaremetre', logo: logoSquaremetre, scale: 0.86 },
  // Very heavy strokes, so it reads large even set small.
  { name: 'Whot', logo: logoWhot, scale: 0.66 },
  { name: 'Frame Fest', logo: logoFrameFest, scale: 0.86 },
  // Same lockup problem as Squaremetre, worse: the word is only 58% of the box
  // height, so it read smallest of the whole set. 0.90 lands its caps at ~24px.
  { name: 'FourStrides', logo: logoFourStrides, scale: 0.90 },
  { name: '3PROJECTS', logo: logoThreeProjects, scale: 0.74 },
]
