import { LOGO } from '../brand/logoData'

/** The star from the Koraa’ wordmark, on its own. Colour is `currentColor`. */
export function KoraStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-52 -52 104 104" aria-hidden="true">
      <g transform={`translate(${LOGO.ast.bx} ${LOGO.ast.by})`} fill="currentColor">
        {[0, 60, 120].map((angle) => (
          <path key={angle} d={LOGO.bar} transform={`rotate(${angle})`} />
        ))}
      </g>
    </svg>
  )
}
