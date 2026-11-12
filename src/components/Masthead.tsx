import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { KoraMark } from './KoraMark'
import { PillNav } from './PillNav'

/** The lockup and the pills, fixed over everything. On Home their positions
 *  are driven from --kora-p in CSS, so they glide with the scroll; every other
 *  page shows them already docked at the top. */
export function Masthead({ docked }: { docked: boolean }) {
  // One frame after mount, so the lockup's starting pose paints first and the
  // build-in has something to run from.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <div className="kora-rx-masthead-bar" aria-hidden="true" />
      <Link
        to="/"
        className={`kora-rx-masthead-logo${ready ? ' is-ready' : ''}`}
        aria-label="Koraa’ — home"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <KoraMark className="kora-rx-logo" />
      </Link>
      <PillNav docked={docked ? 'top' : 'bottom'} />
    </>
  )
}

/** The same masthead for every page but Home, docked from the start, with a
 *  spacer so the page begins below it. */
export function DockedMasthead() {
  return (
    <div className="kora-rx is-docked kora-site-head" style={{ '--kora-p': 1 } as CSSProperties}>
      <Masthead docked />
      <div className="kora-site-head-spacer" aria-hidden="true" />
    </div>
  )
}
