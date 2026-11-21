import { useEffect, useRef } from 'react'
import { INTRO_END, makeRenderer } from '../components/Intro'

/* The Koraa’ logo animation from the brand kit, looping quietly in grey
   across the top of Home: full width, no curtain, a short hold on the
   finished logo between runs. Stops while off screen. */

const HOLD = 2.6 // seconds on the settled logo before the next run
const UNIT_W = 111.9 // the wordmark's width in logo units
const UNIT_H = 32.6

export function NxHeroLoop() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const styles = getComputedStyle(canvas)
    const fg = styles.getPropertyValue('--nx-loop').trim() || '#2e2e2e'
    const fly = styles.getPropertyValue('--nx-loop-fly').trim() || fg
    const render = makeRenderer(ctx, { fg, fly, scale: (W) => (W / UNIT_W) * 0.985 })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) render(INTRO_END, w, h)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(canvas)
    if (reduced) return () => ro.disconnect()

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      if (visible) {
        const t = ((now - start) / 1000) % (INTRO_END + HOLD)
        render(Math.min(t, INTRO_END), w, h)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="nx-loop"
      style={{ aspectRatio: `${UNIT_W} / ${UNIT_H * 1.5}` }}
      role="img"
      aria-label="Koraa’"
    />
  )
}
