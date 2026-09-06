import type { ReactNode } from 'react'

export type ShapeKind = 'arrow-circle' | 'arrow-square' | 'asterisk' | 'blade' | 'dot'
export type ShapeTone = 'blue' | 'violet' | 'amber' | 'coral'

/**
 * Knocked out of whichever shape carries it, in the colour of the ground behind
 * it rather than a hard-coded black — so the arrow reads as a hole in the mark.
 */
const ARROW = (
  <path
    className="kora-shape-knockout"
    d="M7.5 12h8M12 8.5l3.5 3.5L12 15.5"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

/**
 * Punctuation for the manifesto: they stand in for the paragraph breaks, so the
 * whole page reads as one block of text rather than a stack of sections.
 */
const SHAPES: Record<ShapeKind, { viewBox: string; body: ReactNode }> = {
  'arrow-circle': {
    viewBox: '0 0 24 24',
    body: (
      <>
        <circle cx="12" cy="12" r="12" />
        {ARROW}
      </>
    ),
  },
  'arrow-square': {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect width="24" height="24" rx="6" />
        {ARROW}
      </>
    ),
  },
  asterisk: {
    viewBox: '0 0 24 24',
    body: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      >
        <path d="M12 3v18" />
        <path d="M4.2 7.5l15.6 9" />
        <path d="M4.2 16.5l15.6-9" />
      </g>
    ),
  },
  blade: {
    viewBox: '0 0 24 24',
    body: <path d="M15 1h8L9 23H1z" />,
  },
  dot: {
    viewBox: '0 0 24 24',
    body: <circle cx="12" cy="12" r="11" />,
  },
}

export function Shape({ kind, tone }: { kind: ShapeKind; tone: ShapeTone }) {
  const { viewBox, body } = SHAPES[kind]

  return (
    <span
      className={`kora-shape kora-shape-${kind} is-${tone}`}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {body}
      </svg>
    </span>
  )
}

/**
 * A mark that holds a piece of work behind it: brand blue at rest, the image
 * pushing through on hover. Decorative — the same projects are named and
 * credited on the work page, so this is a glimpse, not content.
 */
export function Reveal({ src }: { src: string }) {
  return (
    <span className="kora-reveal" aria-hidden="true">
      <img src={src} alt="" loading="lazy" draggable={false} />
    </span>
  )
}
