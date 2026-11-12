import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Drives the bottom-of-screen flare on every FlareMedia; see Flare.tsx. */

const FLARE_MAX = 80

/** One controller for the whole page, mounted once in Layout. */
export function useFlareController() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight

      document.querySelectorAll<HTMLElement>('.kora-flare').forEach((layer) => {
        const frameEl = layer.parentElement
        if (!frameEl) return
        const box = layer.getBoundingClientRect()
        const W = box.width
        const H = box.height
        // The reach either side, as laid out by CSS.
        const m = (W - frameEl.clientWidth) / 2
        const r = Math.min(FLARE_MAX, m, H)
        const zoneTop = vh - r - box.top // where the bend starts, in layer px
        const edge = vh - box.top // the bottom of the screen, in layer px

        if (r <= 0 || box.top >= vh || zoneTop >= H || box.bottom < 0) {
          layer.style.clipPath = ''
          return
        }

        const right: string[] = []
        const left: string[] = []
        const at = (y: number) => {
          const d = Math.min(Math.max(y - zoneTop, 0), r)
          return r - Math.sqrt(r * r - d * d)
        }
        const STEPS = 14
        const ys: number[] = [Math.max(zoneTop, 0)]
        for (let i = 1; i <= STEPS; i++) ys.push(zoneTop + (r * i) / STEPS)
        ys.push(H)

        for (const raw of ys) {
          const y = Math.min(Math.max(raw, 0), H)
          const f = y >= edge ? r : at(y)
          right.push(`${(W - m + f).toFixed(1)}px ${y.toFixed(1)}px`)
          left.push(`${(m - f).toFixed(1)}px ${y.toFixed(1)}px`)
        }

        layer.style.clipPath = `polygon(${m}px 0px, ${W - m}px 0px, ${right.join(', ')}, ${left
          .reverse()
          .join(', ')})`
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    // Images and fonts settle the layout after the first paint.
    const late = window.setTimeout(schedule, 400)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('load', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
      window.clearTimeout(late)
      cancelAnimationFrame(frame)
    }
  }, [pathname])
}
