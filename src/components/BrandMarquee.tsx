import type { CSSProperties } from 'react'
import { PARTNERS } from '../data'

/**
 * Two identical tracks side by side, each sliding left by its own full width.
 * As the first clears the viewport the second is exactly where it started, so
 * the loop has no seam — and no JS measuring widths on resize.
 */
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="kora-marquee-track" aria-hidden={hidden || undefined}>
      {PARTNERS.map((partner) => (
        <li key={partner.name} className="kora-marquee-item">
          <img
            src={partner.logo}
            // The second track is decoration; only the first is announced.
            alt={hidden ? '' : partner.name}
            style={{ '--kora-logo-scale': partner.scale } as CSSProperties}
            loading="lazy"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}

export function BrandMarquee() {
  return (
    <div className="kora-marquee">
      <Track />
      <Track hidden />
    </div>
  )
}
