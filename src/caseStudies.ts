/* Case studies — one long page per client, laid out after the reference the
   studio is following: a hero plate, an intro with the facts beside it, then
   the work told in images, most of them full width, and a hand-off to the
   next project.

   Each image slot carries a `label` saying what belongs there. Until the art
   is made the page shows the slot as a grey panel with that label, so the
   page doubles as the shot list. When a plate is ready, give the slot its
   `src` (and `video: true` for a loop). */

export interface CaseSlot {
  /** What goes here — shown on the placeholder until `src` is set. */
  label: string
  /** Width / height, e.g. '16 / 9'. */
  ratio: string
  src?: string
  video?: boolean
}

export type CaseBlock =
  | { kind: 'full'; slot: CaseSlot }
  | { kind: 'pair'; slots: [CaseSlot, CaseSlot] }
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
    hero: slot('Hero — 3D iPayBTC mark floating on a soft brand-colour field (looping animation)', '16 / 10'),
    gallery: [
      { kind: 'full', slot: slot('Brand colour composition — big flat colour blocks (animated)') },
      { kind: 'full', slot: slot('Hero 3D object — e.g. a Bitcoin vault or wallet, on a brand colour') },
      { kind: 'full', slot: slot('Colour band transition — thin stripes of the palette', '21 / 9') },
      { kind: 'full', slot: slot('Logo lockup — full wordmark on the primary brand colour') },
      { kind: 'full', slot: slot('Browser close-up — the iPayBTC website and address bar') },
      {
        kind: 'pair',
        slots: [
          slot('Phone — home screen with the iPayBTC app icon', '4 / 5'),
          slot('Hand holding a phone — the pay or QR flow', '4 / 5'),
        ],
      },
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
