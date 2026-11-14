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
import rf_logo_1600 from './assets/refreeg/rf-logo-1600.jpg'
import rf_logo_2800 from './assets/refreeg/rf-logo-2800.jpg'
import rf_logo_full from './assets/refreeg/rf-logo-full.jpg'
import rf_billboard_1600 from './assets/refreeg/rf-billboard-1600.jpg'
import rf_billboard_2800 from './assets/refreeg/rf-billboard-2800.jpg'
import rf_billboard_full from './assets/refreeg/rf-billboard-full.jpg'
import rf_icon_1600 from './assets/refreeg/rf-icon-1600.jpg'
import rf_icon_2800 from './assets/refreeg/rf-icon-2800.jpg'
import rf_icon_full from './assets/refreeg/rf-icon-full.jpg'
import rf_card_1600 from './assets/refreeg/rf-card-1600.jpg'
import rf_card_full from './assets/refreeg/rf-card-full.jpg'
import rf_web_1600 from './assets/refreeg/rf-web-1600.jpg'
import rf_web_2800 from './assets/refreeg/rf-web-2800.jpg'
import rf_web_full from './assets/refreeg/rf-web-full.jpg'
import rf_tablet_1600 from './assets/refreeg/rf-tablet-1600.jpg'
import rf_tablet_2800 from './assets/refreeg/rf-tablet-2800.jpg'
import rf_tablet_full from './assets/refreeg/rf-tablet-full.jpg'
import rf_folders_1600 from './assets/refreeg/rf-folders-1600.jpg'
import rf_folders_2800 from './assets/refreeg/rf-folders-2800.jpg'
import rf_folders_full from './assets/refreeg/rf-folders-full.jpg'
import rf_receipt_1600 from './assets/refreeg/rf-receipt-1600.jpg'
import rf_receipt_full from './assets/refreeg/rf-receipt-full.jpg'
import rf_subway_1600 from './assets/refreeg/rf-subway-1600.jpg'
import rf_subway_2800 from './assets/refreeg/rf-subway-2800.jpg'
import rf_subway_full from './assets/refreeg/rf-subway-full.jpg'
import rf_pocket_1600 from './assets/refreeg/rf-pocket-1600.jpg'
import rf_pocket_2800 from './assets/refreeg/rf-pocket-2800.jpg'
import rf_pocket_full from './assets/refreeg/rf-pocket-full.jpg'
import rf_social_1600 from './assets/refreeg/rf-social-1600.jpg'
import rf_social_full from './assets/refreeg/rf-social-full.jpg'
import rf_lunch_1600 from './assets/refreeg/rf-lunch-1600.jpg'
import rf_lunch_2800 from './assets/refreeg/rf-lunch-2800.jpg'
import rf_lunch_full from './assets/refreeg/rf-lunch-full.jpg'
import rf_scooter_1600 from './assets/refreeg/rf-scooter-1600.jpg'
import rf_scooter_2800 from './assets/refreeg/rf-scooter-2800.jpg'
import rf_scooter_full from './assets/refreeg/rf-scooter-full.jpg'
import rf_tote_1600 from './assets/refreeg/rf-tote-1600.jpg'
import rf_tote_2800 from './assets/refreeg/rf-tote-2800.jpg'
import rf_tote_full from './assets/refreeg/rf-tote-full.jpg'
import rf_groceries_1600 from './assets/refreeg/rf-groceries-1600.jpg'
import rf_groceries_2800 from './assets/refreeg/rf-groceries-2800.jpg'
import rf_groceries_full from './assets/refreeg/rf-groceries-full.jpg'
import rf_pledge_1600 from './assets/refreeg/rf-pledge-1600.jpg'
import rf_pledge_full from './assets/refreeg/rf-pledge-full.jpg'
import rf_posters_1600 from './assets/refreeg/rf-posters-1600.jpg'
import rf_posters_2800 from './assets/refreeg/rf-posters-2800.jpg'
import rf_posters_full from './assets/refreeg/rf-posters-full.jpg'
import rf_family_1600 from './assets/refreeg/rf-family-1600.jpg'
import rf_family_2800 from './assets/refreeg/rf-family-2800.jpg'
import rf_family_full from './assets/refreeg/rf-family-full.jpg'
import rf_type_1600 from './assets/refreeg/rf-type-1600.jpg'
import rf_type_2800 from './assets/refreeg/rf-type-2800.jpg'
import rf_type_full from './assets/refreeg/rf-type-full.jpg'

import type { ChipSpec } from './components/refreeg/Chip'

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
  /** Refreeg notification pill, live over the photo. */
  chip?: ChipSpec
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
const RF_LOGO: CaseSlot = { label: 'The Refreeg logo on Refreeg Blue', ratio: '3838 / 1961', src: rf_logo_full, srcSet: set([[rf_logo_1600, 1600], [rf_logo_2800, 2800], [rf_logo_full, 3838]]) }
const RF_BILLBOARD: CaseSlot = { label: '“Give where you can see.” on a city billboard', ratio: '5120 / 2560', src: rf_billboard_full, srcSet: set([[rf_billboard_1600, 1600], [rf_billboard_2800, 2800], [rf_billboard_full, 5120]]) }
const RF_ICON: CaseSlot = { label: 'The Refreeg app on a home screen', ratio: '3276 / 4096', src: rf_icon_full, srcSet: set([[rf_icon_1600, 1600], [rf_icon_2800, 2800], [rf_icon_full, 3276]]) }
const RF_CARD: CaseSlot = { label: 'Refreeg in hand', ratio: '2048 / 2561', src: rf_card_full, srcSet: set([[rf_card_1600, 1600], [rf_card_full, 2048]]) }
const RF_WEB: CaseSlot = { label: 'Writing help, the AI in Create a campaign', ratio: '4915 / 2764', src: rf_web_full, srcSet: set([[rf_web_1600, 1600], [rf_web_2800, 2800], [rf_web_full, 4915]]) }
const RF_TABLET: CaseSlot = { label: 'Create a campaign on a tablet', ratio: '5056 / 3370', src: rf_tablet_full, srcSet: set([[rf_tablet_1600, 1600], [rf_tablet_2800, 2800], [rf_tablet_full, 5056]]) }
const RF_FOLDERS: CaseSlot = { label: 'Restock 600 market stalls', ratio: '3686 / 4608', src: rf_folders_full, srcSet: set([[rf_folders_1600, 1600], [rf_folders_2800, 2800], [rf_folders_full, 3686]]), chip: { icon: 'heart', title: 'Restock 600 market stalls', amount: '₦12.4M of ₦20M', time: '10:23', x: 5, y: 40, w: 66 } }
const RF_RECEIPT: CaseSlot = { label: '“Every naira, receipted.”', ratio: '2155 / 2694', src: rf_receipt_full, srcSet: set([[rf_receipt_1600, 1600], [rf_receipt_full, 2155]]) }
const RF_SUBWAY: CaseSlot = { label: 'Campaigns, petitions, bounties, wallet, writer on a subway poster', ratio: '5504 / 2752', src: rf_subway_full, srcSet: set([[rf_subway_1600, 1600], [rf_subway_2800, 2800], [rf_subway_full, 5504]]) }
const RF_POCKET: CaseSlot = { label: 'The Refreeg mark on a phone', ratio: '5461 / 3072', src: rf_pocket_full, srcSet: set([[rf_pocket_1600, 1600], [rf_pocket_2800, 2800], [rf_pocket_full, 5461]]) }
const RF_SOCIAL: CaseSlot = { label: 'Refreeg social post', ratio: '1955 / 2444', src: rf_social_full, srcSet: set([[rf_social_1600, 1600], [rf_social_full, 1955]]) }
const RF_LUNCH: CaseSlot = { label: 'Fire safety kits for Balogun traders', ratio: '3276 / 4096', src: rf_lunch_full, srcSet: set([[rf_lunch_1600, 1600], [rf_lunch_2800, 2800], [rf_lunch_full, 3276]]), chip: { icon: 'coin', title: 'Fire safety kits, Balogun', amount: '₦1.4M of ₦4M', time: '13:41', x: 33, y: 55, w: 66 } }
const RF_SCOOTER: CaseSlot = { label: 'Pledge, in the Refreeg app', ratio: '5504 / 2752', src: rf_scooter_full, srcSet: set([[rf_scooter_1600, 1600], [rf_scooter_2800, 2800], [rf_scooter_full, 5504]]) }
const RF_TOTE: CaseSlot = { label: '“Every kobo. Accounted for.” tote', ratio: '4915 / 3276', src: rf_tote_full, srcSet: set([[rf_tote_1600, 1600], [rf_tote_2800, 2800], [rf_tote_full, 4915]]) }
const RF_GROCERIES: CaseSlot = { label: 'School fees for 90 girls in Ikorodu', ratio: '3686 / 4608', src: rf_groceries_full, srcSet: set([[rf_groceries_1600, 1600], [rf_groceries_2800, 2800], [rf_groceries_full, 3686]]), chip: { icon: 'flag', title: 'School fees for 90 girls', amount: '₦5.5M of ₦5.8M', time: '14:55', x: 5, y: 24, w: 66 } }
const RF_PLEDGE: CaseSlot = { label: 'The Pledge screen on Lime', ratio: '1991 / 2489', src: rf_pledge_full, srcSet: set([[rf_pledge_1600, 1600], [rf_pledge_full, 1991]]) }
const RF_POSTERS: CaseSlot = { label: 'Three Refreeg posters', ratio: '5504 / 2501', src: rf_posters_full, srcSet: set([[rf_posters_1600, 1600], [rf_posters_2800, 2800], [rf_posters_full, 5504]]) }
const RF_FAMILY: CaseSlot = { label: 'Refreeg at home', ratio: '5461 / 3072', src: rf_family_full, srcSet: set([[rf_family_1600, 1600], [rf_family_2800, 2800], [rf_family_full, 5461]]) }
import rf_film from './assets/refreeg/refreeg-film.mp4'
import rf_film_poster from './assets/refreeg/film-poster.jpg'
const RF_FILM: CaseSlot = {
  label: 'Refreeg launch film: Ask Refreeg finds a campaign you can see, then the receipt',
  ratio: '16 / 9',
  src: rf_film,
  poster: rf_film_poster,
  video: true,
}
const RF_TYPE: CaseSlot = { label: '“Give where you can see.” in Recoleta', ratio: '3840 / 1920', src: rf_type_full, srcSet: set([[rf_type_1600, 1600], [rf_type_2800, 2800], [rf_type_full, 3840]]) }

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
    hero: RF_BILLBOARD,
    gallery: [
      { kind: 'full', slot: RF_LOGO, inset: true },
      { kind: 'pair', slots: [RF_ICON, RF_CARD], inset: true },
      { kind: 'full', slot: RF_WEB },
      { kind: 'pair', slots: [RF_FOLDERS, RF_RECEIPT], inset: true },
      { kind: 'full', slot: RF_TABLET, inset: true },
      { kind: 'full', slot: RF_SUBWAY },
      { kind: 'pair', slots: [RF_SOCIAL, RF_LUNCH], inset: true },
      { kind: 'full', slot: RF_POCKET, inset: true },
      { kind: 'full', slot: RF_SCOOTER },
      { kind: 'pair', slots: [RF_GROCERIES, RF_PLEDGE], inset: true },
      { kind: 'full', slot: RF_TOTE, inset: true },
      { kind: 'full', slot: RF_POSTERS },
      { kind: 'full', slot: RF_FAMILY, inset: true },
      { kind: 'full', slot: RF_TYPE },
      { kind: 'full', slot: RF_FILM },
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
