import type { CSSProperties, ReactNode } from 'react'
import { useEffect } from 'react'
import { Masthead } from './Masthead'
import { Contact } from './Contact'

/** Every page but Home: the lockup already docked at the top with the pills
 *  under it, a page heading set like the Home statement, the page's own
 *  content, and the contact block to close. */
export function InnerPage({
  label,
  heading,
  children,
}: {
  label: string
  heading: string
  children: ReactNode
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      className="kora-rx is-docked is-inner"
      style={{ '--kora-p': 1, '--kora-fade': 1 } as CSSProperties}
    >
      <Masthead docked />
      <div className="kora-rx-page">
        <header className="kora-rx-statement kora-rx-page-head">
          <p className="kora-rx-label">{label}</p>
          <h1>{heading}</h1>
        </header>
        {children}
        <Contact />
      </div>
    </div>
  )
}
