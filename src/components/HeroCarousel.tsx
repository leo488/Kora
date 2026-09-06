import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { HeroSlide } from '../data'

interface HeroCarouselProps {
  slides: HeroSlide[]
  index: number
  onIndexChange: (index: number) => void
  /** How long a frame holds before the reel moves on. */
  intervalMs?: number
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function HeroCarousel({
  slides,
  index,
  onIndexChange,
  intervalMs = 6500,
}: HeroCarouselProps) {
  const [playing, setPlaying] = useState(true)

  // Keeping the callback in a ref means the hold timer below restarts only when
  // the frame actually changes, not on every re-render of the page around it.
  const advance = useRef(onIndexChange)
  advance.current = onIndexChange

  // The pan outlasts the hold by a beat, so the picture is still drifting
  // underneath the crossfade. That overlap is what reads as footage rather than
  // a slideshow of stills.
  const panMs = intervalMs + 1800

  // A hidden tab banks nothing useful — returning to a burst of catch-up
  // transitions looks broken — so park the reel until it is on screen again.
  useEffect(() => {
    const sync = () => setPlaying(!document.hidden)
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  // Every frame is stacked inside the viewport, so `loading="lazy"` buys
  // nothing — the browser would pull the whole portfolio down before the first
  // frame paints. Mount the reel as it plays instead, one frame ahead of where
  // it is.
  const [mounted, setMounted] = useState(() => new Set([0, 1]))

  useEffect(() => {
    setMounted((current) => {
      const next = (index + 1) % slides.length
      if (current.has(index) && current.has(next)) return current
      return new Set(current).add(index).add(next)
    })
  }, [index, slides.length])

  useEffect(() => {
    if (!playing || slides.length <= 1 || prefersReducedMotion()) return

    const id = setTimeout(
      () => advance.current((index + 1) % slides.length),
      intervalMs,
    )
    return () => clearTimeout(id)
  }, [index, intervalMs, playing, slides.length])

  return (
    <div
      className="kora-carousel"
      style={{ '--kora-pan': `${panMs}ms` } as CSSProperties}
    >
      {slides.map((slide, i) =>
        !mounted.has(i) ? null : (
          <img
            key={slide.src}
            className={[
              'kora-carousel-slide',
              i === index && 'is-active',
              i % 2 === 1 && 'is-alt',
            ]
              .filter(Boolean)
              .join(' ')}
            src={slide.src}
            srcSet={slide.srcSet}
            /* The showcase is full-bleed, so the frame is always viewport-wide. */
            sizes="100vw"
            alt={
              i === index
                ? `${slide.project.brand} — frame ${slide.frame} of ${slide.frameCount}`
                : ''
            }
            aria-hidden={i === index ? undefined : true}
            fetchPriority={i === 0 ? 'high' : 'low'}
            draggable={false}
          />
        ),
      )}

      <div className="kora-carousel-progress">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={[
              'kora-carousel-tick',
              i === index && 'is-active',
              i < index && 'is-played',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onIndexChange(i)}
            aria-label={`Play ${slide.project.brand}, frame ${slide.frame} of ${slide.frameCount}`}
            aria-current={i === index}
          >
            <span
              className="kora-carousel-tick-fill"
              style={{
                animationDuration: `${intervalMs}ms`,
                animationPlayState: playing ? 'running' : 'paused',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
