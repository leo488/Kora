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
import rf_logoA from './assets/refreeg/rf-logo-1200.jpg'
import rf_logoB from './assets/refreeg/rf-logo-2400.jpg'
import rf_billboardA from './assets/refreeg/rf-billboard-1200.jpg'
import rf_billboardB from './assets/refreeg/rf-billboard-2400.jpg'
import rf_iconA from './assets/refreeg/rf-icon-1200.jpg'
import rf_iconB from './assets/refreeg/rf-icon-2400.jpg'
import rf_pledge_handA from './assets/refreeg/rf-pledge-hand-1200.jpg'
import rf_pledge_handB from './assets/refreeg/rf-pledge-hand-2400.jpg'
import rf_cityA from './assets/refreeg/rf-city-1200.jpg'
import rf_cityB from './assets/refreeg/rf-city-2400.jpg'
import rf_tabletA from './assets/refreeg/rf-tablet-1200.jpg'
import rf_tabletB from './assets/refreeg/rf-tablet-2400.jpg'
import rf_huddleA from './assets/refreeg/rf-huddle-1200.jpg'
import rf_huddleB from './assets/refreeg/rf-huddle-2400.jpg'
import rf_receiptA from './assets/refreeg/rf-receipt-1200.jpg'
import rf_receiptB from './assets/refreeg/rf-receipt-2400.jpg'
import rf_metroA from './assets/refreeg/rf-metro-1200.jpg'
import rf_metroB from './assets/refreeg/rf-metro-2400.jpg'
import rf_pocketA from './assets/refreeg/rf-pocket-1200.jpg'
import rf_pocketB from './assets/refreeg/rf-pocket-2400.jpg'
import rf_sweatshirtA from './assets/refreeg/rf-sweatshirt-1200.jpg'
import rf_sweatshirtB from './assets/refreeg/rf-sweatshirt-2400.jpg'
import rf_coupleA from './assets/refreeg/rf-couple-1200.jpg'
import rf_coupleB from './assets/refreeg/rf-couple-2400.jpg'
import rf_handA from './assets/refreeg/rf-hand-1200.jpg'
import rf_handB from './assets/refreeg/rf-hand-2400.jpg'
import rf_toteA from './assets/refreeg/rf-tote-1200.jpg'
import rf_toteB from './assets/refreeg/rf-tote-2400.jpg'
import rf_capA from './assets/refreeg/rf-cap-1200.jpg'
import rf_capB from './assets/refreeg/rf-cap-2400.jpg'
import rf_greenA from './assets/refreeg/rf-green-1200.jpg'
import rf_greenB from './assets/refreeg/rf-green-2400.jpg'
import rf_wallA from './assets/refreeg/rf-wall-1200.jpg'
import rf_wallB from './assets/refreeg/rf-wall-2400.jpg'
import rf_socialA from './assets/refreeg/rf-social-1200.jpg'
import rf_socialB from './assets/refreeg/rf-social-2400.jpg'
import rf_typeA from './assets/refreeg/rf-type-1200.jpg'
import rf_typeB from './assets/refreeg/rf-type-2400.jpg'

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
  /** Show the whole picture inside the plate: the flare reach is not
   *  filled, so artwork that runs to its edges is not cropped. */
  fit?: boolean
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

/* 3PROJECTS: assets cut from the brand guidelines and pitch deck exports
   (Leo's Figma), laid out as plates rather than pasted guideline pages. */
const P3 = import.meta.glob('./assets/3p/billboard-*.jpg', { eager: true, import: 'default' }) as Record<string, string>
const p3 = (label: string, ratio: string, name: string, fit = false): CaseSlot => ({
  ...plate(label, ratio, [P3[`./assets/3p/${name}-1200.jpg`], P3[`./assets/3p/${name}-2400.jpg`]]),
  fit,
})
const P3_BILLBOARD = p3('“Complexity isn’t a hurdle. It’s an asset.” on a street billboard', '3 / 2', 'billboard')
import p3Film from './assets/3p/3projects-brand-film.mp4'
import p3FilmPoster from './assets/3p/film-poster.jpg'
const P3_FILM: CaseSlot = {
  label: 'The 3PROJECTS brand guide, slide by slide',
  ratio: '16 / 9',
  src: p3Film,
  poster: p3FilmPoster,
  video: true,
}


/* Refreeg: the image run follows Leo's reference presentation plate for
   plate. Mockups are Magnific blanks with the real logo, posters and Figma
   screens placed in them; the rest are Refreeg's own brand-book exports. */
const rf = (label: string, ratio: string, a: string, b: string) => plate(label, ratio, [a, b])
const RF_LOGO = rf('The Refreeg logo on Refreeg Blue', '16 / 9', rf_logoA, rf_logoB)
const RF_BILLBOARD = rf('“Give where you can see.” on a street hoarding', '16 / 9', rf_billboardA, rf_billboardB)
const RF_ICON = rf('The Refreeg app icon on a home screen', '4 / 5', rf_iconA, rf_iconB)
const RF_PLEDGE_HAND = rf('Pledging ₦50,000 in the app', '4 / 5', rf_pledge_handA, rf_pledge_handB)
const RF_CITY = rf('The Refreeg dashboard on a city screen', '16 / 9', rf_cityA, rf_cityB)
const RF_TABLET = rf('Campaigns to fund, on a tablet', '16 / 9', rf_tabletA, rf_tabletB)
const RF_HUDDLE = rf('Givers in a huddle', '4 / 5', rf_huddleA, rf_huddleB)
const RF_RECEIPT = rf('A donation receipt on Lime', '4 / 5', rf_receiptA, rf_receiptB)
const RF_METRO = rf('“Giving you can see, from the first naira to the last.” on a metro platform', '16 / 9', rf_metroA, rf_metroB)
const RF_POCKET = rf('The Refreeg mark on a phone case', '16 / 9', rf_pocketA, rf_pocketB)
const RF_SWEATSHIRT = rf('“Every naira, receipted.” sweatshirt', '4 / 5', rf_sweatshirtA, rf_sweatshirtB)
const RF_COUPLE = rf('Refreeg campaign portrait', '4 / 5', rf_coupleA, rf_coupleB)
const RF_HAND = rf('A pledge in hand', '16 / 9', rf_handA, rf_handB)
const RF_TOTE = rf('“Every kobo. Accounted for.” tote', '4 / 3', rf_toteA, rf_toteB)
const RF_CAP = rf('Refreeg cap', '4 / 3', rf_capA, rf_capB)
const RF_GREEN = rf('Refreeg givers', '4 / 3', rf_greenA, rf_greenB)
const RF_WALL = rf('Three Refreeg posters', '16 / 9', rf_wallA, rf_wallB)
const RF_SOCIAL = rf('Refreeg social post', '16 / 9', rf_socialA, rf_socialB)
const RF_TYPE = rf('“Every naira, receipted.” in Recoleta', '16 / 10', rf_typeA, rf_typeB)

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
  {
    slug: '3projects',
    title: '3PROJECTS',
    // Copy taken from the 3PROJECTS Visual Identity Guidelines.
    summary:
      '3PROJECTS operates at the intersection of enterprise transformation and technology-driven business optimization, working with organizations between $50M and $1B in revenue.',
    facts: [
      { label: 'Client', value: '3PROJECTS' },
      { label: 'Services', value: 'Brand identity, Logo system, Campaign' },
      { label: 'Year', value: '2026' },
    ],
    highlights: ['We do not deliver technology. We architect transformation.'],
    sections: [
      {
        heading: 'Positioning',
        paragraphs: [
          'The transformation architect for large enterprises. Not a vendor of solutions but a partner in redesigning how an organization grows and operates.',
          'We help enterprises grow revenue and optimize operational cost by uncovering the inefficiencies they have stopped seeing. We identify hidden inefficiencies before they escalate, rather than waiting for a problem to be defined for us.',
        ],
      },
      {
        heading: 'The mark',
        paragraphs: [
          'The 3Projects logo is a precise geometric construct designed to reflect the brand’s core identity as a Transformation Architect. The mark consists of three distinct, layered blocks that represent the fundamental phases of our strategic process: Discover, Design and Transform.',
          'These forms are arranged in an ascending, upward trajectory to symbolize continuous growth and the reclamation of lost revenue. The flat vertical edge on the left creates a structural lock-up with the typography, giving the mark stability and order.',
        ],
      },
      {
        heading: 'The promise',
        paragraphs: [
          'We do the right things, properly. Less work. Better outcomes.',
          'These guidelines are the single source of truth for the identity. They exist so that any document, screen or post is recognisably ours before a word is read.',
        ],
      },
    ],
    hero: P3_BILLBOARD,
    gallery: [{ kind: 'full', slot: P3_FILM }],
    next: 'Refreeg',
  },
  {
    slug: 'refreeg',
    title: 'Refreeg',
    // Copy taken from the Refreeg brand book.
    summary: 'Giving you can see, from the first naira to the last.',
    facts: [
      { label: 'Client', value: 'Refreeg' },
      { label: 'Services', value: 'Brand identity, Product design, Web app, Campaign' },
      { label: 'Year', value: '2025' },
    ],
    highlights: [],
    sections: [
      {
        heading: 'Proof, not trust',
        paragraphs: [
          'Most people who want to help have no way of knowing where their money went. A transfer leaves, a thank-you arrives, and the rest is trust. Refreeg exists to replace that trust with proof.',
          'Every campaign on Refreeg is verified before it goes live, every gift is receipted, and every release of funds is tied to a spend report the donor can open. Money is held until it is needed and moves only against evidence.',
        ],
      },
      {
        heading: 'More than giving',
        paragraphs: [
          'Around giving sit the other ways people take part: petitions that put a cause in front of the people who can act on it, bounties that pay for real work like photography and translation, and EIZA, the reward that comes back to anyone who shows up.',
          'All of it rests on one idea: that doing good should be as clear as it is generous. Refreeg makes sure everyone who gives can see what their giving did.',
        ],
      },
      {
        heading: 'The mark',
        paragraphs: [
          'The Refreeg symbol is two strokes that bow toward each other and meet at the centre. One is the person who gives, the other is the person who receives.',
          'The gap between them never closes. That space is where the receipt lives: the proof that travels from one side to the other.',
        ],
      },
    ],
    hero: RF_LOGO,
    gallery: [
      { kind: 'full', slot: RF_BILLBOARD },
      { kind: 'pair', slots: [RF_ICON, RF_PLEDGE_HAND], inset: true },
      { kind: 'full', slot: RF_CITY },
      { kind: 'full', slot: RF_TABLET },
      { kind: 'pair', slots: [RF_HUDDLE, RF_RECEIPT], inset: true },
      { kind: 'full', slot: RF_METRO },
      { kind: 'full', slot: RF_POCKET },
      { kind: 'pair', slots: [RF_SWEATSHIRT, RF_COUPLE], inset: true },
      { kind: 'full', slot: RF_HAND },
      { kind: 'full', slot: RF_TOTE, inset: true },
      { kind: 'pair', slots: [RF_CAP, RF_GREEN], inset: true },
      { kind: 'full', slot: RF_WALL },
      { kind: 'full', slot: RF_SOCIAL, inset: true },
      { kind: 'full', slot: RF_TYPE },
    ],
    next: 'Ipaybtc',
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
