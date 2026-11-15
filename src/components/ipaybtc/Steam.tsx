import { useEffect, useRef, useState } from 'react'
import './steam.css'

/* Steam curling off a hot drink in a still photo. The photo is shot from
   above, so the wisps swirl out over the cup and drift away rather than
   climbing straight up. Pure CSS motion; each wisp gets its own speed,
   drift and delay so the loop never looks mechanical. */

export interface SteamSpot {
  /** Centre of the drink, as a % of the plate's width and height. */
  x: number
  y: number
  /** Size of the steam cloud, as a % of the plate's width. */
  size: number
  /** Which way the steam drifts, in degrees (0 = up the photo). */
  drift?: number
}

const WISPS = [
  { dur: 5.2, delay: 0, dx: -18, dy: -46, rot: -30, s: 1.0 },
  { dur: 6.4, delay: 1.1, dx: 14, dy: -52, rot: 24, s: 0.85 },
  { dur: 5.8, delay: 2.3, dx: -6, dy: -60, rot: -12, s: 1.15 },
  { dur: 7.0, delay: 3.0, dx: 22, dy: -38, rot: 40, s: 0.75 },
  { dur: 6.0, delay: 4.1, dx: -26, dy: -34, rot: -48, s: 0.9 },
  { dur: 6.8, delay: 0.6, dx: 4, dy: -56, rot: 8, s: 1.05 },
]

export function Steam({ spot }: { spot: SteamSpot }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  // Only animate while the plate is on screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`kora-steam${on ? ' is-on' : ''}`}
      aria-hidden
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        width: `${spot.size}%`,
        transform: `translate(-50%, -50%) rotate(${spot.drift ?? 0}deg)`,
      }}
    >
      {WISPS.map((w, i) => (
        <span
          key={i}
          style={{
            ['--dur' as string]: `${w.dur}s`,
            ['--delay' as string]: `${w.delay}s`,
            ['--dx' as string]: `${w.dx}%`,
            ['--dy' as string]: `${w.dy}%`,
            ['--rot' as string]: `${w.rot}deg`,
            ['--s' as string]: w.s,
          }}
        />
      ))}
    </div>
  )
}
