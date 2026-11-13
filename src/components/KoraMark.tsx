import { useId } from 'react'
import { LOGO } from '../brand/logoData'

/** Where the star sits: the centre of the o, in logo units. */
export const STAR_CX = 520.734 + LOGO.tx[1]
export const STAR_CY = 63.0595

const LETTERS: Array<[string, number]> = [
  [LOGO.K, LOGO.tx[0]],
  [LOGO.O, LOGO.tx[1]],
  [LOGO.R, LOGO.tx[2]],
  [LOGO.A, LOGO.tx[3]],
  [LOGO.A, LOGO.tx[4]],
]

/**
 * The Koraa’ wordmark, drawn from the brand kit's geometry. Colour comes from
 * `currentColor`. The star is a cut-out of the o (a mask), so whatever is
 * behind the logo shows through it, as the brand rules require.
 */
export function KoraMark({ className }: { className?: string }) {
  const mask = `koraa-star-${useId().replace(/:/g, '')}`
  const letter = { fill: 'currentColor', stroke: 'currentColor', strokeWidth: 0.7, strokeLinejoin: 'round' } as const

  return (
    <svg
      className={className}
      viewBox="487.6 42.4 111.9 32.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Koraa’"
    >
      <mask id={mask} maskUnits="userSpaceOnUse" x="487.6" y="42.4" width="111.9" height="32.6">
        <rect x="487.6" y="42.4" width="111.9" height="32.6" fill="#fff" />
        <g transform={`translate(${STAR_CX} ${STAR_CY}) scale(${LOGO.ast.s}) translate(${LOGO.ast.bx} ${LOGO.ast.by})`} fill="#000">
          {[0, 60, 120].map((a) => (
            <path key={a} d={LOGO.bar} transform={`rotate(${a})`} />
          ))}
        </g>
      </mask>
      {/* K, o, r, a, a, then the apostrophe: direct children in reading
          order, so a stagger on `> path` runs left to right. */}
      {LETTERS.map(([d, dx], i) => (
        <path
          key={i}
          d={d}
          transform={`translate(${dx} 0)`}
          {...letter}
          mask={i === 1 ? `url(#${mask})` : undefined}
        />
      ))}
      <path d={LOGO.apos} {...letter} />
    </svg>
  )
}
