/* Case studies — one long page per client, laid out after the reference the
   studio is following: a hero plate, an intro with the facts beside it, then
   the work told in images, most of them full width, and a hand-off to the
   next project.

   Each image slot carries a `label` saying what belongs there. Until the art
   is made the page shows the slot as a grey panel with that label, so the
   page doubles as the shot list. When a plate is ready, give the slot its
   `src` (and `video: true` for a loop). A plate with `screen` also runs the
   app on the phone in the photo (components/ipaybtc/ScreenOverlay.tsx). */

import type { PhoneScreen } from './components/ipaybtc/ScreenOverlay'
import table1600 from './assets/ipaybtc-table-1600.jpg'
import table2800 from './assets/ipaybtc-table-2800.jpg'
import tableFull from './assets/ipaybtc-table-full.jpg'
import card1600 from './assets/ipaybtc-card-1600.jpg'
import card2800 from './assets/ipaybtc-card-2800.jpg'
import cardFull from './assets/ipaybtc-card-full.jpg'
import icon1000 from './assets/ipaybtc-icon-1000.jpg'
import icon1800 from './assets/ipaybtc-icon-1800.jpg'
import iconFull from './assets/ipaybtc-icon-full.jpg'
import hand1000 from './assets/ipaybtc-hand-1000.jpg'
import hand1800 from './assets/ipaybtc-hand-1800.jpg'
import handFull from './assets/ipaybtc-hand-full.jpg'

export interface CaseSlot {
  /** What goes here — shown on the placeholder until `src` is set. */
  label: string
  /** Width / height, e.g. '16 / 9'. */
  ratio: string
  src?: string
  /** Responsive sources for `src`, as an img srcset. */
  srcSet?: string
  video?: boolean
  /** The live app, mapped onto the phone screen in the photo. */
  screen?: PhoneScreen
  /** A plate drawn in code instead of a photo. */
  art?: 'ipaybtc-logo'
}

export type CaseBlock =
  /** `inset` sits the block in the centre column instead of edge to edge. */
  | { kind: 'full'; slot: CaseSlot; inset?: boolean }
  | { kind: 'pair'; slots: [CaseSlot, CaseSlot]; inset?: boolean }
  | { kind: 'grid'; columns: number; slots: CaseSlot[] }
  | { kind: 'collage'; slots: CaseSlot[] }

export interface CaseSection {
  heading: string
  paragraphs: string[]
}

export interface CaseStudy {
  /** Matches Project.name in data.ts, and is the URL: /work/<slug>. */
  slug: string
  title: string
  /** One or two sentences under the title. */
  summary: string
  facts: Array<{ label: string; value: string }>
  /** Short bold lines after the summary — awards, funding, launches. */
  highlights: string[]
  sections: CaseSection[]
  liveUrl?: string
  hero: CaseSlot
  gallery: CaseBlock[]
  /** The project the page hands off to at the end. */
  next: string
}

const slot = (label: string, ratio = '16 / 9'): CaseSlot => ({ label, ratio })

const set = (pairs: Array<[string, number]>) => pairs.map(([src, w]) => `${src} ${w}w`).join(', ')

/* iPayBTC stills (4K, made in Magnific from Leo's reference scenes), each
   with the light-mode v3 app placed on its phone. */
const IPAY_TABLE: CaseSlot = {
  label: 'iPayBTC on a walnut table with coffee, Bitcoin coins and notebooks',
  ratio: '5504 / 3072',
  src: tableFull,
  srcSet: set([[table1600, 1600], [table2800, 2800], [tableFull, 5504]]),
  screen: {
    flow: 'send',
    size: [5504, 3072],
    corners: [[2318.9, 702.5], [3138.4, 876.4], [2655, 2607.5], [1801, 2404.3]],
    radius: 50,
    glare: 'linear-gradient(115deg, rgba(255,240,220,0.10) 0%, rgba(255,255,255,0) 45%, rgba(60,30,0,0.06) 100%)',
  },
}

const IPAY_CARD: CaseSlot = {
  label: 'The iPayBTC card going into a pink shirt pocket',
  ratio: '5504 / 3072',
  src: cardFull,
  srcSet: set([[card1600, 1600], [card2800, 2800], [cardFull, 5504]]),
}

const IPAY_LOGO: CaseSlot = {
  label: 'The iPayBTC wordmark on Electric Blue',
  ratio: '16 / 9',
  art: 'ipaybtc-logo',
}

const IPAY_ICON: CaseSlot = {
  label: 'The iPayBTC app icon on a phone home screen',
  ratio: '4 / 5',
  src: iconFull,
  srcSet: set([[icon1000, 1000], [icon1800, 1800], [iconFull, 3584]]),
  screen: {
    flow: 'launch',
    size: [3584, 4800],
    corners: [[470, 400], [3124, 400], [3124, 6143], [470, 6143]],
    radius: 50,
  },
}

const IPAY_HAND: CaseSlot = {
  label: 'A hand holding a phone, buying Bitcoin in iPayBTC',
  ratio: '4 / 5',
  src: handFull,
  srcSet: set([[hand1000, 1000], [hand1800, 1800], [handFull, 3584]]),
  screen: {
    flow: 'buy',
    size: [3584, 4800],
    corners: [[580.6, 901.8], [1799.2, 530.1], [2713.9, 3195.1], [1518, 3646]],
    radius: 50,
    glare: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%)',
  },
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'ipaybtc',
    title: 'iPayBTC',
    // TODO(kora): draft copy. The structure is final; swap every sentence
    // below for the real brief, and add highlights only if they are true.
    summary:
      'iPayBTC makes Bitcoin feel like everyday money. We rebuilt the brand so paying, saving and sending in sats feels as familiar as any bank app.',
    facts: [
      { label: 'Client', value: 'iPayBTC' },
      { label: 'Industry', value: 'Fintech' },
      { label: 'Services', value: 'Brand strategy, Visual identity, Product design, Motion' },
      { label: 'Year', value: '2026' },
    ],
    highlights: [],
    sections: [
      {
        heading: 'The challenge',
        paragraphs: [
          'Bitcoin still reads as technical, speculative and built for insiders. iPayBTC wanted the opposite: a brand that made spending and saving in Bitcoin feel ordinary, safe and a little bit joyful.',
        ],
      },
      {
        heading: 'Our approach',
        paragraphs: [
          'We started with how people already talk about money, not about crypto. From there we built a bright, confident identity, a family of 3D objects that make abstract ideas tangible, and a product language that puts the next action first.',
          'Every touchpoint, from the app to the billboards, uses the same small set of colours, shapes and words, so the brand is recognisable at a glance.',
        ],
      },
      {
        heading: 'The outcome',
        paragraphs: [
          'A brand that feels at home on a phone screen and on a city street, and a system the iPayBTC team can keep building on.',
        ],
      },
    ],
    // TODO(kora): add liveUrl once the site address is confirmed.
    hero: IPAY_TABLE,
    gallery: [
      { kind: 'full', slot: IPAY_CARD },
      { kind: 'full', slot: IPAY_LOGO, inset: true },
      { kind: 'pair', slots: [IPAY_ICON, IPAY_HAND], inset: true },
      { kind: 'full', slot: slot('Brand colour composition — big flat colour blocks (animated)') },
      { kind: 'full', slot: slot('Hero 3D object — e.g. a Bitcoin vault or wallet, on a brand colour') },
      { kind: 'full', slot: slot('Colour band transition — thin stripes of the palette', '21 / 9') },
      { kind: 'full', slot: slot('Logo lockup — full wordmark on the primary brand colour') },
      { kind: 'full', slot: slot('Browser close-up — the iPayBTC website and address bar') },
      { kind: 'full', slot: slot('3D icon family over a large brand line (supergraphic)') },
      { kind: 'full', slot: slot('Brand colour composition 2 (animated)') },
      { kind: 'full', slot: slot('3D icon family — six icons on a light ground') },
      {
        kind: 'pair',
        slots: [
          slot('Lifestyle photo — a customer with the app', '4 / 5'),
          slot('Product detail — the iPayBTC card or a key screen', '4 / 5'),
        ],
      },
      { kind: 'full', slot: slot('Still life — phone on a desk with everyday objects') },
      {
        kind: 'pair',
        slots: [
          slot('Merch — cap', '1 / 1'),
          slot('Merch — tote bag', '1 / 1'),
        ],
      },
      {
        kind: 'grid',
        columns: 5,
        slots: Array.from({ length: 10 }, (_, i) => slot(`Social post ${i + 1}`, '4 / 5')),
      },
      { kind: 'full', slot: slot('Web banner — lifestyle photo with headline panel') },
      { kind: 'full', slot: slot('Out of home — three posters at a bus shelter') },
      {
        kind: 'collage',
        slots: Array.from({ length: 10 }, (_, i) => slot(`Portrait ${i + 1}`, '4 / 5')),
      },
      { kind: 'full', slot: slot('Billboard — the campaign line in the city') },
      { kind: 'full', slot: slot('Logo sting — the mark animating on brand colour (video)') },
    ],
    next: '3Projects',
  },
]

export function caseStudyFor(slug: string | undefined) {
  return CASE_STUDIES.find((c) => c.slug.toLowerCase() === slug?.toLowerCase())
}

/** The case study link for a project, if it has one. */
export function caseLinkFor(projectName: string) {
  const study = caseStudyFor(projectName)
  return study ? `/work/${study.slug}` : undefined
}
