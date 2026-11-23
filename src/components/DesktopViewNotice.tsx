import { useEffect, useState } from 'react'

/* On a phone, after the cookie notice: a short note that the site is made
   for larger screens, with a button that switches to the desktop layout.

   A page cannot flip Chrome's own "Desktop site" setting, so the switch is
   done here: the viewport is set to a desktop width (1280 px), which is what
   that setting does too. The choice is remembered (index.html applies it
   before the first paint) and can be undone from the footer. */

export const VIEW_KEY = 'kora-view'
const SEEN_KEY = 'kora-desktop-note'
const COOKIE_KEY = 'kora-cookie-notice'
const PHONE = '(max-width: 760px)'

const read = (store: Storage, key: string) => {
  try {
    return store.getItem(key)
  } catch {
    return null
  }
}
const write = (store: Storage, key: string, value: string | null) => {
  try {
    if (value === null) store.removeItem(key)
    else store.setItem(key, value)
  } catch {
    // Not remembering is a worse experience, not a broken one.
  }
}

/** True when the visitor is on a phone-sized screen, whatever the layout. */
export const onSmallScreen = () => Math.min(screen.width, screen.height) <= 760

export const inDesktopView = () => read(localStorage, VIEW_KEY) === 'desktop'

export function setDesktopView(on: boolean) {
  write(localStorage, VIEW_KEY, on ? 'desktop' : null)
  // Load the page again so it lays out at the new width. A plain reload
  // would keep the old zoom, so this is a fresh load of the same address.
  const url = new URL(window.location.href)
  url.searchParams.set('view', on ? 'desktop' : 'mobile')
  window.location.replace(url.toString())
}

export function DesktopViewNotice() {
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!window.matchMedia(PHONE).matches || inDesktopView()) return
    if (read(sessionStorage, SEEN_KEY) === 'yes') return
    // Wait for the cookie notice to be dealt with, then show.
    let timer = 0
    const check = () => {
      if (read(localStorage, COOKIE_KEY) !== 'acknowledged') return
      window.clearInterval(timer)
      window.setTimeout(() => setOpen(true), 900)
    }
    timer = window.setInterval(check, 500)
    check()
    return () => window.clearInterval(timer)
  }, [])

  if (!open) return null

  const close = () => {
    write(sessionStorage, SEEN_KEY, 'yes')
    setLeaving(true)
    setTimeout(() => setOpen(false), 300)
  }

  return (
    <div
      className={`kora-cookiebar kora-desktopnote${leaving ? ' is-leaving' : ''}`}
      role="region"
      aria-label="Best viewed on desktop"
    >
      <p>
        This site is made for larger screens. For the full experience, open it
        on a laptop, or switch to the desktop view.
      </p>
      <div className="kora-desktopnote-actions">
        <button type="button" className="kora-pill is-solid" onClick={() => setDesktopView(true)}>
          Desktop view
        </button>
        <button type="button" className="kora-pill is-outline" onClick={close}>
          Not now
        </button>
      </div>
    </div>
  )
}
