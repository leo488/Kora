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

  // A film runs to its own last frame; a still takes the reel's interval.
  const holdMs = slides[index]?.holdMs ?? intervalMs

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

  // Film frames are driven by hand rather than left on `autoplay`: the reel
  // decides which frame is live, so the active film restarts from its first
  // frame each time round and every other one sits paused.
  const films = useRef(new Map<number, HTMLVideoElement>())

  useEffect(() => {
    for (const [i, film] of films.current) {
      if (i !== index || !playing || prefersReducedMotion()) {
        film.pause()
        continue
      }
      film.currentTime = 0
      // A refused autoplay is not a failure here — the poster is already the
      // frame underneath, so the reel just shows a still and moves on.
      void film.play().catch(() => {})
    }
  }, [index, playing])

  useEffect(() => {
    if (!playing || slides.length <= 1 || prefersReducedMotion()) return

    const id = setTimeout(
      () => advance.current((index + 1) % slides.length),
      holdMs,
    )
    return () => clearTimeout(id)
  }, [index, holdMs, playing, slides.length])

  return (
    <div
      className="kora-carousel"
      style={{ '--kora-pan': `${panMs}ms` } as CSSProperties}
    >
      {slides.map((slide, i) => {
        if (!mounted.has(i)) return null

        const isActive = i === index
        const className = [
          'kora-carousel-slide',
          isActive && 'is-active',
          i % 2 === 1 && 'is-alt',
          slide.video && 'is-film',
        ]
          .filter(Boolean)
          .join(' ')
        const label = slide.caption
          ? `${slide.caption.brand} — frame ${slide.frame} of ${slide.frameCount}`
          : `Kora — frame ${slide.frame} of ${slide.frameCount}`

        // A film already carries its own camera move, so it gets no pan and no
        // srcSet — just the poster underneath it until the first frame paints.
        return slide.video ? (
          <video
            key={slide.key}
            ref={(el) => {
              if (!el) {
                films.current.delete(i)
                return
              }
              // Set on the element, not via the attribute: an unmuted video is
              // refused autoplay outright.
              el.muted = true
              films.current.set(i, el)
            }}
            className={className}
            src={slide.video}
            poster={slide.src}
            muted
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            aria-label={isActive ? label : undefined}
            aria-hidden={isActive ? undefined : true}
            disablePictureInPicture
            tabIndex={-1}
          />
        ) : (
          <img
            key={slide.key}
            className={className}
            src={slide.src}
            srcSet={slide.srcSet}
            /* The showcase is full-bleed, so the frame is always viewport-wide. */
            sizes="100vw"
            alt={isActive ? label : ''}
            aria-hidden={isActive ? undefined : true}
            fetchPriority={i === 0 ? 'high' : 'low'}
            draggable={false}
          />
        )
      })}

      {/* No progress ticks, no dots, no arrows: the reel is meant to read as a
          film the visitor has walked into, and every affordance that says
          "slideshow" undoes that. It advances on its own or not at all. */}
    </div>
  )
}
