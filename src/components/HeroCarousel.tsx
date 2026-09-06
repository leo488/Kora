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

const SOUND_KEY = 'kora:hero-sound'

/* Muted is not a style choice, it is the price of autoplay: a browser will
   refuse to start a video that makes noise until the visitor has interacted
   with the page. So the reel opens silent and the toggle below turns it up —
   the click itself is the gesture that buys us the right to play sound. A
   stored preference is worth attempting on the next visit, because a browser
   that has seen enough engagement will allow it, but it can still be refused
   and we have to cope with that rather than end up with a stalled film. */
const storedSoundPref = () => {
  try {
    return localStorage.getItem(SOUND_KEY) === 'on'
  } catch {
    // Private mode, or site data blocked. Silence is the safe default.
    return false
  }
}

export function HeroCarousel({
  slides,
  index,
  onIndexChange,
  intervalMs = 6500,
}: HeroCarouselProps) {
  const [playing, setPlaying] = useState(true)
  const [soundOn, setSoundOn] = useState(storedSoundPref)

  // Whether any frame in the reel has audio to turn up in the first place.
  const hasFilm = slides.some((slide) => slide.video)

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

      film.muted = !soundOn
      film.currentTime = 0

      // A refused autoplay is not a failure here — the poster is already the
      // frame underneath, so the reel just shows a still and moves on. But a
      // refusal caused by the sound is worth one retry muted, otherwise asking
      // for audio would cost the visitor the picture as well.
      void film.play().catch(() => {
        if (film.muted) return
        film.muted = true
        setSoundOn(false)
        void film.play().catch(() => {})
      })
    }
  }, [index, playing, soundOn])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    try {
      localStorage.setItem(SOUND_KEY, next ? 'on' : 'off')
    } catch {
      // Preference just will not survive the visit; the toggle still works.
    }

    // Apply it to the frame that is playing right now rather than waiting for
    // the effect, so the click and the sound land together.
    const live = films.current.get(index)
    if (live) {
      live.muted = !next
      if (next) void live.play().catch(() => {})
    }
  }

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
              // Set on the element, not via the attribute: React does not
              // reliably reflect `muted`, and getting it wrong costs autoplay.
              el.muted = !soundOn
              films.current.set(i, el)
            }}
            className={className}
            src={slide.video}
            poster={slide.src}
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
          "slideshow" undoes that. It advances on its own or not at all.

          The sound toggle is the one exception — audio that cannot be turned
          off is worse than no audio, so it stays reachable at all times. */}
      {hasFilm && (
        <button
          type="button"
          className="kora-sound-toggle"
          onClick={toggleSound}
          aria-pressed={soundOn}
        >
          <SoundIcon on={soundOn} />
          <span>{soundOn ? 'Sound on' : 'Sound off'}</span>
        </button>
      )}
    </div>
  )
}

/** Speaker with either two arcs or a cross, drawn to the same weight as the
 *  arrow so the hero's two marks match. */
function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.4 6.1h2.1L8.6 3.5v9L5.5 9.9H3.4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {on ? (
        <path
          d="M10.7 5.8c1.4 1.2 1.4 3.2 0 4.4M12.6 3.8c2.4 2.2 2.4 6.2 0 8.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M11 6.2l3.4 3.6M14.4 6.2L11 9.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
