import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

/**
 * Flip to true to show the curtain only on the first load in a tab. Off by
 * default: sessionStorage survives a reload, so with this on the intro appears
 * once and then never again in that tab — which reads as "it stopped working".
 */
const PLAY_ONCE_PER_TAB = false
const STORAGE_KEY = 'kora-intro-played'

/**
 * Reduced motion still gets the curtain — the preference is for less movement,
 * not for less of the site. It arrives without the rise and wipe, so it does
 * not need as long on screen.
 */
const HOLD_MS = { full: 2600, reduced: 1400 }
const EXIT_MS = { full: 800, reduced: 300 }

type Phase = 'playing' | 'leaving' | 'done'

const alreadyPlayed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'yes'
  } catch {
    // Storage is unavailable in some privacy modes; playing the intro again is
    // a smaller cost than failing to render the site.
    return false
  }
}

export function Intro() {
  // Both decisions are read during the first render rather than in an effect —
  // deciding later would flash the landing page for a frame before the curtain
  // dropped over it. Held in state so they stay stable across re-renders and
  // the timer effect below runs exactly once.
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [willPlay] = useState(() => !(PLAY_ONCE_PER_TAB && alreadyPlayed()))
  const [phase, setPhase] = useState<Phase>(willPlay ? 'playing' : 'done')

  const holdMs = reduced ? HOLD_MS.reduced : HOLD_MS.full
  const exitMs = reduced ? EXIT_MS.reduced : EXIT_MS.full

  useEffect(() => {
    if (!willPlay) return

    if (PLAY_ONCE_PER_TAB) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'yes')
      } catch {
        // Not remembering it is survivable.
      }
    }

    const lift = setTimeout(() => setPhase('leaving'), holdMs)
    const finish = setTimeout(() => setPhase('done'), holdMs + exitMs)

    return () => {
      clearTimeout(lift)
      clearTimeout(finish)
    }
  }, [willPlay, holdMs, exitMs])

  // The lock is keyed on the phase, not on the component's lifetime: the intro
  // finishes by rendering null, which is not an unmount, so a cleanup hung off
  // the timer effect above would never run and the page would be left
  // permanently unscrollable.
  const locked = phase !== 'done'

  useEffect(() => {
    if (!locked) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])

  if (phase === 'done') return null

  return (
    // Hidden from screen readers: it is a curtain, and every word on it is
    // repeated in the page it uncovers.
    <div
      className={`kora-intro${phase === 'leaving' ? ' is-leaving' : ''}`}
      // The exit duration lives here rather than being written twice — the CSS
      // reads it, so the timer that unmounts the curtain cannot drift out of
      // sync with the animation that slides it away.
      style={{ '--kora-intro-exit': `${exitMs}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="kora-intro-inner">
        <img className="kora-intro-mark" src="/logo.svg" alt="" />

        <p className="kora-intro-line">
          <span>A global</span>
        </p>
        <p className="kora-intro-line">
          <span>creative studio.</span>
        </p>

        <p className="kora-intro-places">
          <span>Lagos &mdash; Abuja</span>
        </p>
      </div>
    </div>
  )
}
