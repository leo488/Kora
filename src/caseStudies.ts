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
import hand1000 from './assets/ipaybtc-hand-1000.jpg'
import hand1800 from './assets/ipaybtc-hand-1800.jpg'
import handFull from './assets/ipaybtc-hand-full.jpg'
import iconPhone1000 from './assets/ipaybtc-iconphone-1000.jpg'
import iconPhone1800 from './assets/ipaybtc-iconphone-1800.jpg'
import iconPhoneFull from './assets/ipaybtc-iconphone-full.jpg'
import wrap1200 from './assets/ipaybtc-wrap-1200.jpg'
import wrap2400 from './assets/ipaybtc-wrap-2400.jpg'
import billboard1200 from './assets/ipaybtc-billboard-1200.jpg'
import billboard2400 from './assets/ipaybtc-billboard-2400.jpg'
import roadtrip1200 from './assets/ipaybtc-scene-roadtrip-1200.jpg'
import roadtrip2400 from './assets/ipaybtc-scene-roadtrip-2400.jpg'
import pole1200 from './assets/ipaybtc-w-pole-1200.jpg'
import pole2400 from './assets/ipaybtc-w-pole-2400.jpg'
import under1200 from './assets/ipaybtc-w-under-1200.jpg'
import under2400 from './assets/ipaybtc-w-under-2400.jpg'
import laptop1200 from './assets/ipaybtc-w-laptop-1200.jpg'
import laptop2400 from './assets/ipaybtc-w-laptop-2400.jpg'
import landscape1200 from './assets/ipaybtc-w-landscape-1200.jpg'
import landscape2400 from './assets/ipaybtc-w-landscape-2400.jpg'
import lanyard1200 from './assets/ipaybtc-lanyard-1200.jpg'
import lanyard2400 from './assets/ipaybtc-lanyard-2400.jpg'
import tee1200 from './assets/ipaybtc-tee-1200.jpg'
import tee2400 from './assets/ipaybtc-tee-2400.jpg'
import borderless from './assets/ipaybtc-borderless.mp4'
import borderlessPoster from './assets/ipaybtc-borderless-poster.jpg'
import fx05a from './assets/figx/f05-1200.jpg'
import fx05b from './assets/figx/f05-2400.jpg'
import fx07a from './assets/figx/f07-1200.jpg'
import fx07b from './assets/figx/f07-2400.jpg'
import fx20a from './assets/figx/f20-1200.jpg'
import fx20b from './assets/figx/f20-2400.jpg'
import fx21a from './assets/figx/f21-1200.jpg'
import fx21b from './assets/figx/f21-2400.jpg'
import fx22a from './assets/figx/f22-1200.jpg'
import fx22b from './assets/figx/f22-2400.jpg'
import fx23a from './assets/figx/f23-1200.jpg'
import fx23b from './assets/figx/f23-2400.jpg'
import fx24a from './assets/figx/f24-1200.jpg'
import fx24b from './assets/figx/f24-2400.jpg'
import fx26a from './assets/figx/f26-1200.jpg'
import fx26b from './assets/figx/f26-2400.jpg'
import fx27a from './assets/figx/f27-1200.jpg'
import fx27b from './assets/figx/f27-2400.jpg'
import fx28a from './assets/figx/f28-1200.jpg'
import fx28b from './assets/figx/f28-2400.jpg'
import fx29a from './assets/figx/f29-1200.jpg'
import fx29b from './assets/figx/f29-2400.jpg'
import fx30a from './assets/figx/f30-1200.jpg'
import fx30b from './assets/figx/f30-2400.jpg'
import fx31a from './assets/figx/f31-1200.jpg'
import fx31b from './assets/figx/f31-2400.jpg'
import fx32a from './assets/figx/f32-1200.jpg'
import fx32b from './assets/figx/f32-2400.jpg'
import fx33a from './assets/figx/f33-1200.jpg'
import fx33b from './assets/figx/f33-2400.jpg'
import fx05top from './assets/figx/f05-fingers.webp'
import teeClose1200 from './assets/ipaybtc-w-tee-1200.jpg'
import teeClose2400 from './assets/ipaybtc-w-tee-2400.jpg'

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
    | 'ipaybtc-logo-navy'
    | 'ipaybtc-type'
    | 'ipaybtc-social'
    | 'ipaybtc-wall'
    | 'ipaybtc-icons'
    | 'ipaybtc-coin'
    | 'ipaybtc-cap'
    | 'ipaybtc-tote'
    | 'ipaybtc-wallposter'
    | 'ipaybtc-phone'
    | 'ipaybtc-phones'
    | 'ipaybtc-poster-border'
    | 'ipaybtc-poster-tea'
    | 'ipaybtc-poster-spend'
  /** A cut-out of the photo laid over the live screen (fingers on the glass). */
  top?: string
  /** The app's amount keypad resting beside the people in the photo. */
  keypad?: boolean
  /** The photo eases out from a slight zoom while it is on screen. */
  zoom?: boolean
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
  src: iconPhoneFull,
  srcSet: set([[iconPhone1000, 1000], [iconPhone1800, 1800], [iconPhoneFull, 3584]]),
  screen: {
    flow: 'launch',
    size: [3584, 4480],
    corners: [[1161.5, 876.6], [2419.7, 876.6], [2419.7, 3599.2], [1161.5, 3599.2]],
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
const plate = (label: string, ratio: string, name: [string, string]): CaseSlot => ({
  label,
  ratio,
  src: name[1],
  srcSet: set([[name[0], 1200], [name[1], 2400]]),
})
const art = (label: string, ratio: string, kind: NonNullable<CaseSlot['art']>): CaseSlot => ({ label, ratio, art: kind })

const IPAY_BILLBOARD = plate('Naira → Sats on a sidewalk billboard, with the app in hand', '2400 / 1340', [billboard1200, billboard2400])

/* The scenes of the Ragged Edge Wise page, made our own. */
const IPAY_TYPE = art('Campaign lines swapping, one 3D icon each', '5 / 4', 'ipaybtc-type')
const IPAY_LOGO_NAVY = art('The iPayBTC wordmark on Deep Navy', '4 / 5', 'ipaybtc-logo-navy')
const IPAY_TEE_CLOSE = plate('The iPayBTC wordmark on a white tee', '4 / 5', [teeClose1200, teeClose2400])
const IPAY_LANYARD = plate('iPayBTC lanyard and staff pass', '4 / 5', [lanyard1200, lanyard2400])
const IPAY_TEE = plate('iPayBTC tee on a tennis court', '4 / 5', [tee1200, tee2400])
const IPAY_CARD_VIDEO: CaseSlot = {
  label: 'The iPayBTC card over clips that cut from a road trip to Lagos',
  ratio: '16 / 9',
  src: borderless,
  poster: borderlessPoster,
  video: true,
  overlay: 'ipaybtc-card',
}
const IPAY_POSTER_BORDER = art('No bank opening hours. No border. No permission.', '16 / 10', 'ipaybtc-poster-border')
const IPAY_WRAP = plate('“We move in sats” wrapped on a building in Lagos', '4 / 5', [wrap1200, wrap2400])
const IPAY_PHONE = art('The app buying Bitcoin', '4 / 5', 'ipaybtc-phone')
const IPAY_UNDER = plate('“Your Naira can’t travel. Your Bitcoin can.” on an underground platform', '5504 / 3072', [under1200, under2400])
const IPAY_KEYPAD: CaseSlot = {
  ...plate('Sending sats from the road', '1200 / 670', [roadtrip1200, roadtrip2400]),
  keypad: true,
  zoom: true,
}
const IPAY_POLE = plate('“Pay NEPA in sats.” on a roadside billboard', '5504 / 3072', [pole1200, pole2400])
const IPAY_PHONES = art('The account, a buy, and the receipt', '16 / 9', 'ipaybtc-phones')
const IPAY_LAPTOP: CaseSlot = {
  ...plate('iPayBTC on the web, card in hand', '5056 / 3392', [laptop1200, laptop2400]),
  screen: {
    flow: 'send',
    web: true,
    size: [5056, 3392],
    corners: [[1992, 342], [3312, 636], [3166, 1460], [2169, 1214]],
    radius: 6,
  },
}
const IPAY_LANDSCAPE: CaseSlot = {
  ...plate('iPayBTC held up over the hills', '5504 / 3072', [landscape1200, landscape2400]),
  screen: {
    flow: 'send',
    size: [5504, 3072],
    corners: [[2383, 702], [3118, 705], [3126, 2402], [2371, 2400]],
    radius: 44,
  },
}
/* Leo's Figma frames, exported from Figma as they are. */
const fig = (_n: string, label: string, pair: [string, string]): CaseSlot => plate(label, '10130 / 6488', pair)
const FX05: CaseSlot = {
  ...fig('05', 'Holding up iPayBTC on Electric Blue', [fx05a, fx05b]),
  screen: {
    flow: 'send',
    size: [2400, 1537],
    corners: [[1266, 728], [1507, 725], [1514, 1255], [1264, 1258]],
    radius: 40,
  },
  top: fx05top,
}
const FX07 = fig('07', 'Buying Bitcoin under a blue sky', [fx07a, fx07b])
const FX20 = fig('20', 'The iPayBTC brand guide', [fx20a, fx20b])
const FX21 = fig('21', '“We Move In Sats” tote in the sun', [fx21a, fx21b])
const FX22 = fig('22', 'The pattern tote on Electric Blue', [fx22a, fx22b])
const FX23 = fig('23', 'Tee and staff pass', [fx23a, fx23b])
const FX24 = fig('24', 'iPayBTC posters along a walkway', [fx24a, fx24b])
const FX26 = fig('26', 'The blue tee on Milky Yellow', [fx26a, fx26b])
const FX27 = fig('27', 'iPayBTC on the main stage', [fx27a, fx27b])
const FX28 = fig('28', 'The app icon in the dock', [fx28a, fx28b])
const FX29 = fig('29', 'iPayBTC on the watch', [fx29a, fx29b])
const FX30 = fig('30', 'The iPayBTC website', [fx30a, fx30b])
const FX31 = fig('31', 'Futura LT Condensed ExtraBold', [fx31a, fx31b])
const FX32 = fig('32', 'Neue Haas Grotesk', [fx32a, fx32b])
const FX33 = fig('33', 'Friends in the sun', [fx33a, fx33b])
const IPAY_SOCIAL = art('Posts sliding through the iPayBTC feed', '16 / 9', 'ipaybtc-social')
const IPAY_WALL = art('The campaign as social posts', '16 / 9', 'ipaybtc-wall')
const IPAY_ICONS = art('The iPayBTC 3D set: our coin, a coin ring, swap, gift, tick and bank', '16 / 9', 'ipaybtc-icons')
const IPAY_COIN = art('The iPayBTC coin in 3D', '4 / 5', 'ipaybtc-coin')
const IPAY_CAP = art('The iPayBTC cap', '4 / 5', 'ipaybtc-cap')
const IPAY_TOTE = art('The iPayBTC tote', '4 / 5', 'ipaybtc-tote')
const IPAY_WALLPOSTER = art('An iPayBTC poster on a wall', '4 / 5', 'ipaybtc-wallposter')
const IPAY_POSTER_TEA = art('Buy Bitcoin before your tea gets cold.', '4 / 5', 'ipaybtc-poster-tea')
const IPAY_POSTER_SPEND = art('Bitcoin was never meant to sit still. Spend it.', '4 / 5', 'ipaybtc-poster-spend')

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
      { kind: 'full', slot: IPAY_BILLBOARD },
      { kind: 'full', slot: IPAY_TYPE, inset: true },
      { kind: 'pair', slots: [IPAY_LOGO_NAVY, IPAY_TEE_CLOSE], inset: true },
      { kind: 'pair', slots: [IPAY_LANYARD, IPAY_TEE] },
      { kind: 'full', slot: IPAY_CARD_VIDEO },
      { kind: 'full', slot: IPAY_POSTER_BORDER, inset: true },
      { kind: 'pair', slots: [IPAY_WRAP, IPAY_PHONE], inset: true },
      { kind: 'full', slot: IPAY_UNDER },
      { kind: 'full', slot: IPAY_KEYPAD, inset: true },
      { kind: 'full', slot: IPAY_POLE },
      { kind: 'full', slot: IPAY_PHONES, inset: true },
      { kind: 'full', slot: IPAY_SOCIAL },
      { kind: 'full', slot: IPAY_WALL },
      { kind: 'full', slot: IPAY_ICONS },
      { kind: 'pair', slots: [IPAY_CAP, IPAY_TOTE], inset: true },
      { kind: 'pair', slots: [IPAY_WALLPOSTER, IPAY_COIN], inset: true },
      { kind: 'full', slot: IPAY_LAPTOP },
      { kind: 'full', slot: IPAY_LANDSCAPE },
      { kind: 'pair', slots: [IPAY_POSTER_TEA, IPAY_POSTER_SPEND], inset: true },
      { kind: 'full', slot: FX33 },
      { kind: 'full', slot: FX05, inset: true },
      { kind: 'full', slot: FX07, inset: true },
      { kind: 'pair', slots: [FX21, FX22], inset: true },
      { kind: 'full', slot: FX24 },
      { kind: 'pair', slots: [FX26, FX27], inset: true },
      { kind: 'full', slot: FX30, inset: true },
      { kind: 'pair', slots: [FX28, FX29], inset: true },
      { kind: 'full', slot: FX23, inset: true },
      { kind: 'pair', slots: [FX31, FX32], inset: true },
      { kind: 'full', slot: FX20, inset: true },
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
