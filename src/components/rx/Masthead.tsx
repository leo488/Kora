import { Link } from 'react-router-dom'
import { KoraMark } from '../KoraMark'
import { PillNav } from '../PillNav'
import { useEffect, useState } from 'react'

/** The lockup and the pills, fixed over everything. Their positions are driven
 *  from --kora-p in CSS, so on Home they glide with the scroll; on the other
 *  pages they sit docked at the top from the start. */
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
        aria-label="Kora — home"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <KoraMark className="kora-rx-logo" />
      </Link>
      <PillNav docked={docked ? 'top' : 'bottom'} />
    </>
  )
}
