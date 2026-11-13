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
import roadtrip1200 from './assets/ipaybtc-roadtrip-1200.jpg'
import roadtrip2400 from './assets/ipaybtc-roadtrip-2400.jpg'
import beach1200 from './assets/ipaybtc-beach-1200.jpg'
import beach2400 from './assets/ipaybtc-beach-2400.jpg'
import wrap1200 from './assets/ipaybtc-wrap-1200.jpg'
import wrap2400 from './assets/ipaybtc-wrap-2400.jpg'
import borderless from './assets/ipaybtc-borderless.mp4'
import borderlessPoster from './assets/ipaybtc-borderless-poster.jpg'
import busstop1200 from './assets/ipaybtc-busstop-1200.jpg'
import busstop2400 from './assets/ipaybtc-busstop-2400.jpg'
import tee1200 from './assets/ipaybtc-tee-1200.jpg'
import tee2400 from './assets/ipaybtc-tee-2400.jpg'
import stage1200 from './assets/ipaybtc-stage-1200.jpg'
import stage2400 from './assets/ipaybtc-stage-2400.jpg'
import billboard1200 from './assets/ipaybtc-billboard-1200.jpg'
import billboard2400 from './assets/ipaybtc-billboard-2400.jpg'

import scBeach1200 from './assets/ipaybtc-scene-beach-1200.jpg'
import scBeach2400 from './assets/ipaybtc-scene-beach-2400.jpg'
import scRoadtrip1200 from './assets/ipaybtc-scene-roadtrip-1200.jpg'
import scRoadtrip2400 from './assets/ipaybtc-scene-roadtrip-2400.jpg'

import cardReceipt from './assets/v3/card-receipt.webp'
import cardNaira from './assets/v3/card-naira.webp'
import cardWallets from './assets/v3/card-wallets.webp'

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
  art?:
    | 'ipaybtc-logo'
    | 'ipaybtc-ui'
    | 'ipaybtc-type'
    | 'ipaybtc-headline'
    | 'ipaybtc-objects'
    | 'ipaybtc-uiboard'
  /** A real app card floating beside the person in the photo. */
  card?: { src: string; side: 'left' | 'right'; top?: boolean }
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


/* Plates from the brand's own files: the Figma mockups, the v4 app and coins,
   and the campaign type. */
const plate = (label: string, ratio: string, name: [string, string]): CaseSlot => ({
  label,
  ratio,
  src: name[1],
  srcSet: set([[name[0], 1200], [name[1], 2400]]),
})

const IPAY_BUSSTOP = plate('iPayBTC posters along a bus shelter', '3 / 2', [busstop1200, busstop2400])
const IPAY_TEE = plate('iPayBTC tee on a tennis court', '4 / 5', [tee1200, tee2400])
const IPAY_STAGE = plate('iPayBTC on the main stage screen', '4096 / 2842', [stage1200, stage2400])
const IPAY_ROADTRIP = plate('Friends on a road trip', '4 / 5', [roadtrip1200, roadtrip2400])
const IPAY_BEACH = plate('Friends at the beach at sunset', '2500 / 3235', [beach1200, beach2400])
const IPAY_WRAP = plate('“We move in sats” wrapped on a building in Lagos', '4 / 5', [wrap1200, wrap2400])
const IPAY_UI: CaseSlot = { label: 'The v3 app buying sats, screen by screen', ratio: '4 / 5', art: 'ipaybtc-ui' }
const SC_BEACH = plate('Friends at the beach in iPayBTC blue', '1200 / 670', [scBeach1200, scBeach2400])
const SC_ROADTRIP = plate('Road trip, paying from the phone', '1200 / 670', [scRoadtrip1200, scRoadtrip2400])
const art = (label: string, ratio: string, kind: NonNullable<CaseSlot['art']>): CaseSlot => ({ label, ratio, art: kind })
const IPAY_TYPE = art('Campaign lines swapping in Futura on Deep Navy', '5 / 4', 'ipaybtc-type')
const IPAY_HEADLINE = art('Bitcoin, made for everyday life.', '21 / 9', 'ipaybtc-headline')
const IPAY_OBJECTS = art('The iPayBTC 3D objects, floating', '16 / 9', 'ipaybtc-objects')
const IPAY_UIBOARD = art('The app’s UI, card by card', '16 / 10', 'ipaybtc-uiboard')
const withCard = (slot: CaseSlot, src: string, side: 'left' | 'right', top = false): CaseSlot => ({
  ...slot,
  card: { src, side, top },
})
const IPAY_BILLBOARD = plate('Naira → Sats on a sidewalk billboard, with the app in hand', '2400 / 1340', [billboard1200, billboard2400])

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
      { kind: 'pair', slots: [IPAY_ICON, IPAY_TEE], inset: true },
      { kind: 'full', slot: IPAY_BILLBOARD },
      { kind: 'full', slot: IPAY_TYPE, inset: true },
      { kind: 'pair', slots: [IPAY_WRAP, IPAY_UI], inset: true },
      { kind: 'full', slot: IPAY_BUSSTOP, inset: true },
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
      { kind: 'full', slot: IPAY_HEADLINE, inset: true },
      { kind: 'full', slot: withCard(SC_BEACH, cardNaira, 'right', true), inset: true },
      { kind: 'pair', slots: [withCard(IPAY_BEACH, cardWallets, 'left'), IPAY_ROADTRIP], inset: true },
      { kind: 'full', slot: IPAY_OBJECTS, inset: true },
      { kind: 'full', slot: withCard(SC_ROADTRIP, cardReceipt, 'right'), inset: true },
      { kind: 'full', slot: IPAY_UIBOARD, inset: true },
      { kind: 'full', slot: IPAY_STAGE, inset: true },
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
