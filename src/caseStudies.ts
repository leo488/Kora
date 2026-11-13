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
import woman1200 from './assets/ipaybtc-woman-1200.jpg'
import woman2400 from './assets/ipaybtc-woman-2400.jpg'
import selfie1200 from './assets/ipaybtc-selfie-1200.jpg'
import selfie2400 from './assets/ipaybtc-selfie-2400.jpg'
import roadtrip1200 from './assets/ipaybtc-roadtrip-1200.jpg'
import roadtrip2400 from './assets/ipaybtc-roadtrip-2400.jpg'
import beach1200 from './assets/ipaybtc-beach-1200.jpg'
import beach2400 from './assets/ipaybtc-beach-2400.jpg'
import ill11200 from './assets/ipaybtc-ill1-1200.jpg'
import ill12400 from './assets/ipaybtc-ill1-2400.jpg'
import ill21200 from './assets/ipaybtc-ill2-1200.jpg'
import ill22400 from './assets/ipaybtc-ill2-2400.jpg'
import ill31200 from './assets/ipaybtc-ill3-1200.jpg'
import ill32400 from './assets/ipaybtc-ill3-2400.jpg'
import ill41200 from './assets/ipaybtc-ill4-1200.jpg'
import ill42400 from './assets/ipaybtc-ill4-2400.jpg'
import icons3d1200 from './assets/ipaybtc-icons3d-1200.jpg'
import icons3d2400 from './assets/ipaybtc-icons3d-2400.jpg'
import wrap1200 from './assets/ipaybtc-wrap-1200.jpg'
import wrap2400 from './assets/ipaybtc-wrap-2400.jpg'
import borderless from './assets/ipaybtc-borderless.mp4'
import borderlessPoster from './assets/ipaybtc-borderless-poster.jpg'
import poster1200 from './assets/ipaybtc-poster-1200.jpg'
import poster2400 from './assets/ipaybtc-poster-2400.jpg'
import phone1200 from './assets/ipaybtc-phone-1200.jpg'
import phone2400 from './assets/ipaybtc-phone-2400.jpg'
import lanyard1200 from './assets/ipaybtc-lanyard-1200.jpg'
import lanyard2400 from './assets/ipaybtc-lanyard-2400.jpg'
import busstop1200 from './assets/ipaybtc-busstop-1200.jpg'
import busstop2400 from './assets/ipaybtc-busstop-2400.jpg'
import tee1200 from './assets/ipaybtc-tee-1200.jpg'
import tee2400 from './assets/ipaybtc-tee-2400.jpg'
import tote1200 from './assets/ipaybtc-tote-1200.jpg'
import tote2400 from './assets/ipaybtc-tote-2400.jpg'
import stage1200 from './assets/ipaybtc-stage-1200.jpg'
import stage2400 from './assets/ipaybtc-stage-2400.jpg'
import billboard1200 from './assets/ipaybtc-billboard-1200.jpg'
import billboard2400 from './assets/ipaybtc-billboard-2400.jpg'

export interface CaseSlot {
  /** What goes here — shown on the placeholder until `src` is set. */
  label: string
  /** Width / height, e.g. '16 / 9'. */
  ratio: string
  src?: string
  /** Responsive sources for `src`, as an img srcset. */
  srcSet?: string
  video?: boolean
  /** First frame shown while a video loads. */
  poster?: string
  /** Something drawn in code on top of the photo or video. */
  overlay?: 'ipaybtc-card'
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

/* Plates from the brand's own files: the Figma mockups, the v4 app and coins,
   and the campaign type. */
const plate = (label: string, ratio: string, name: [string, string]): CaseSlot => ({
  label,
  ratio,
  src: name[1],
  srcSet: set([[name[0], 1200], [name[1], 2400]]),
})

const IPAY_POSTER = plate('“We move in sats” in campaign type on Deep Navy', '5 / 4', [poster1200, poster2400])
const IPAY_PHONE = plate('The v4 welcome screen with the Bitcoin, Naira and Tether coins', '4 / 5', [phone1200, phone2400])
const IPAY_LANYARD = plate('iPayBTC lanyard and staff pass', '4 / 5', [lanyard1200, lanyard2400])
const IPAY_BUSSTOP = plate('iPayBTC posters along a bus shelter', '3 / 2', [busstop1200, busstop2400])
const IPAY_TEE = plate('iPayBTC tee on a tennis court', '4 / 5', [tee1200, tee2400])
const IPAY_TOTE = plate('“We Move In Sats” tote on concrete', '3 / 2', [tote1200, tote2400])
const IPAY_STAGE = plate('iPayBTC on the main stage screen', '4096 / 2842', [stage1200, stage2400])
const IPAY_WOMAN = plate('Woman paying with a card and her phone', '2500 / 3235', [woman1200, woman2400])
const IPAY_SELFIE = plate('Friends taking a selfie', '3 / 2', [selfie1200, selfie2400])
const IPAY_ROADTRIP = plate('Friends on a road trip', '1 / 1', [roadtrip1200, roadtrip2400])
const IPAY_BEACH = plate('Friends at the beach at sunset', '2500 / 3235', [beach1200, beach2400])
const IPAY_ICONS = plate('The iPayBTC 3D icon family', '5504 / 3072', [icons3d1200, icons3d2400])
const IPAY_WRAP = plate('“We move in sats” wrapped on a building in Lagos', '4 / 5', [wrap1200, wrap2400])
const IPAY_ILL = [
  plate('Character illustration: verifying a code', '5683 / 4000', [ill11200, ill12400]),
  plate('Character illustration: paying from the app', '5683 / 4000', [ill21200, ill22400]),
  plate('Character illustration: a receipt and a coin', '5683 / 4000', [ill31200, ill32400]),
  plate('Character illustration: banking done', '5683 / 4000', [ill41200, ill42400]),
]
const IPAY_BILLBOARD = plate('Naira → Sats on a sidewalk billboard', '2400 / 1340', [billboard1200, billboard2400])

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
      { kind: 'full', slot: IPAY_POSTER, inset: true },
      { kind: 'pair', slots: [IPAY_LANYARD, IPAY_TEE] },
      {
        kind: 'full',
        slot: {
          label: 'The iPayBTC card over clips that cut from a road trip to Lagos',
          ratio: '16 / 9',
          src: borderless,
          poster: borderlessPoster,
          video: true,
          overlay: 'ipaybtc-card',
        },
      },
      { kind: 'full', slot: IPAY_BUSSTOP },
      { kind: 'full', slot: IPAY_ICONS, inset: true },
      { kind: 'full', slot: IPAY_TOTE, inset: true },
      { kind: 'pair', slots: [IPAY_WOMAN, IPAY_BEACH] },
      { kind: 'pair', slots: [IPAY_WRAP, IPAY_PHONE], inset: true },
      { kind: 'grid', columns: 2, slots: IPAY_ILL },
      { kind: 'full', slot: IPAY_SELFIE },
      { kind: 'full', slot: IPAY_STAGE },
      { kind: 'full', slot: IPAY_ROADTRIP, inset: true },
      { kind: 'full', slot: IPAY_BILLBOARD },
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
