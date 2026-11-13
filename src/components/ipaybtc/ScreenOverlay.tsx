import { useEffect, useRef, useState } from 'react'
import { AppScreen } from './AppScreen'
import { WebDash } from './Scenes'
import type { AppFlow } from './AppScreen'

/* Puts the live app screen onto the phone in a still photo.

   The photo fills its layer with object-fit: cover, so the overlay works out
   the same crop, then maps the 390 × 844 screen onto the four screen corners
   measured in the photo with one perspective transform (matrix3d). */

export interface PhoneScreen {
  flow: AppFlow
  /** The photo's own size in px. */
  size: [number, number]
  /** Screen corners in photo px: top-left, top-right, bottom-right, bottom-left
   *  (as the app reads, so top-left is the corner beside the status bar). */
  corners: [number, number][]
  /** Screen corner radius, in app points. */
  radius?: number
  /** Light falling across the glass, as a CSS background. */
  glare?: string
  /** A laptop: the web app at 1440 × 900 instead of the phone app. */
  web?: boolean
}


export function ScreenOverlay({ screen }: { screen: PhoneScreen }) {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<[number, number] | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const measure = () => setBox([el.clientWidth, el.clientHeight])
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  let transform = 'scale(0)'
  if (box) {
    const [lw, lh] = box
    const [iw, ih] = screen.size
    const s = Math.max(lw / iw, lh / ih)
    const ox = (lw - iw * s) / 2
    const oy = (lh - ih * s) / 2
    const pts = screen.corners.map(([x, y]) => [ox + x * s, oy + y * s] as [number, number])
    transform = screen.web ? matrix3d(pts, 1440, 900) : matrix3d(pts, 390, 844)
  }

  return (
    <div ref={ref} className="kora-screen" aria-hidden>
      <div
        className="kora-screen-glass"
        style={{
          transform,
          borderRadius: screen.radius ?? 52,
          ['--glare' as string]: screen.glare,
          ...(screen.web ? { width: 1440, height: 900 } : null),
        }}
      >
        {screen.web ? <WebDash playing={playing} /> : <AppScreen flow={screen.flow} playing={playing} />}
      </div>
    </div>
  )
}

/** The matrix3d that sends the W × H box to the quad p0..p3. */
function matrix3d(p: [number, number][], W: number, H: number) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = p
  // Unit square -> quad (Heckbert).
  const dx1 = x1 - x2
  const dx2 = x3 - x2
  const dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2
  const dy2 = y3 - y2
  const dy3 = y0 - y1 + y2 - y3
  const den = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / den
  const h = (dx1 * dy3 - dx3 * dy1) / den
  const a = x1 - x0 + g * x1
  const b = x3 - x0 + h * x3
  const c = x0
  const d = y1 - y0 + g * y1
  const e = y3 - y0 + h * y3
  const f = y0
  // Scale the source box down to the unit square first.
  const A = a / W
  const B = b / H
  const D = d / W
  const E = e / H
  const G = g / W
  const Hh = h / H
  // Column-major 4x4 for CSS.
  const m = [A, D, 0, G, B, E, 0, Hh, 0, 0, 1, 0, c, f, 0, 1]
  return `matrix3d(${m.map((v) => +v.toFixed(10)).join(',')})`
}
