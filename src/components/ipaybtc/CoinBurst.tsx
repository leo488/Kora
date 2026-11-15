import './coin-burst.css'

/* When the swap lands on the phone in the hero photo, a painted iPayBTC coin
   pops up out of the screen and a spray of smaller coins flies out over the
   table, arcs, and drops away. Drawn in SVG with a crayon-grain filter so the
   coins read as painted 3D objects. Plays once per mount; the overlay remounts
   it (new key) every time the swap completes. */

const COINS = [
  { a: -150, d: 1.35, s: 0.9, r: -260, t: 0 },
  { a: -120, d: 1.6, s: 0.7, r: 300, t: 40 },
  { a: -95, d: 1.15, s: 1.0, r: -200, t: 0 },
  { a: -70, d: 1.55, s: 0.75, r: 340, t: 60 },
  { a: -40, d: 1.3, s: 0.95, r: -300, t: 20 },
  { a: -15, d: 1.7, s: 0.6, r: 220, t: 90 },
  { a: -170, d: 1.75, s: 0.6, r: 280, t: 110 },
  { a: 10, d: 1.25, s: 0.8, r: -240, t: 70 },
  { a: -55, d: 0.95, s: 0.65, r: 180, t: 130 },
]

export function CoinBurst({ pts }: { pts: [number, number][] }) {
  const cx = pts.reduce((a, p) => a + p[0], 0) / 4
  const cy = pts.reduce((a, p) => a + p[1], 0) / 4
  const w = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return null

  return (
    <div className="kb" style={{ left: cx, top: cy, ['--w' as string]: `${w}px` }} aria-hidden>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="kb-paint" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8 0.04" numOctaves="3" seed="2" result="streak" />
            <feColorMatrix in="streak" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.35" result="streakA" />
            <feComposite in="streakA" in2="SourceAlpha" operator="in" result="streakIn" />
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" result="blotch" />
            <feDisplacementMap in="SourceGraphic" in2="blotch" scale="4" result="wobble" />
            <feBlend in="streakIn" in2="wobble" mode="soft-light" result="tex" />
            <feComposite in="tex" in2="SourceAlpha" operator="in" />
          </filter>
          <radialGradient id="kb-gold" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fff6b0" />
            <stop offset=".35" stopColor="#f7c64a" />
            <stop offset=".75" stopColor="#d9861c" />
            <stop offset="1" stopColor="#9a5a12" />
          </radialGradient>
          <linearGradient id="kb-edge" x1="0" x2="1">
            <stop offset="0" stopColor="#b56d14" />
            <stop offset=".5" stopColor="#e9a733" />
            <stop offset="1" stopColor="#8a4f0e" />
          </linearGradient>
        </defs>
      </svg>

      {/* The hero coin: pops up out of the screen, hangs, then drops back in. */}
      <span className="kb-hero">
        <Coin big />
      </span>

      {COINS.map((c, i) => {
        const rad = (c.a * Math.PI) / 180
        return (
          <span
            key={i}
            className="kb-x"
            style={{
              ['--tx' as string]: `calc(var(--w) * ${(Math.cos(rad) * c.d).toFixed(3)})`,
              ['--delay' as string]: `${c.t + 120}ms`,
            }}
          >
            <span
              className="kb-y"
              style={{
                ['--up' as string]: `calc(var(--w) * ${(Math.sin(rad) * c.d * 0.9).toFixed(3)})`,
                ['--delay' as string]: `${c.t + 120}ms`,
              }}
            >
              <span className="kb-coin" style={{ ['--s' as string]: c.s, ['--r' as string]: `${c.r}deg`, ['--delay' as string]: `${c.t + 120}ms` }}>
                <Coin />
              </span>
            </span>
          </span>
        )
      })}
    </div>
  )
}

function Coin({ big = false }: { big?: boolean }) {
  return (
    <svg viewBox="0 0 120 150" className={big ? 'kb-svg is-big' : 'kb-svg'}>
      <g transform="rotate(28 60 75)" filter="url(#kb-paint)">
        <ellipse cx="66" cy="78" rx="44" ry="62" fill="url(#kb-edge)" />
        <ellipse cx="60" cy="75" rx="44" ry="62" fill="url(#kb-gold)" />
        <ellipse cx="60" cy="75" rx="32" ry="47" fill="none" stroke="#c27a17" strokeWidth="3.5" opacity=".7" />
        <path
          d="M52 55h12a10 10 0 0 1 0 20H52zM52 75h15a10.5 10.5 0 0 1 0 21H52zM55 49v53M61 49v6M61 96v6"
          fill="none"
          stroke="#a8620f"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
          transform="rotate(-28 60 75)"
        />
      </g>
    </svg>
  )
}
