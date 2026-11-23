import { useEffect, useState } from 'react'

/* On a phone, before the cookie notice: a short note that the site is made
   for larger screens, with a button that switches to the desktop layout.

   A page cannot flip Chrome's own "Desktop site" setting, so the switch is
   done here: the viewport is set to a desktop width (1280 px), which is what
   that setting does too. It lasts until the page is reloaded: a reload, a
   new tab or a later visit opens on the phone layout again, with the note
   (index.html applies it before the first paint). A "Mobile view" button
   stays on screen to undo it sooner. The note comes first; the cookie notice
   waits for it. */

const PHONE = '(max-width: 760px)'

/** True when the visitor is on a phone-sized screen, whatever the layout. */
export const onSmallScreen = () => Math.min(screen.width, screen.height) <= 760

export const inDesktopView = () => document.documentElement.classList.contains('kora-desktop-view')

/** Fired once the phone note is out of the way, so the cookie notice can show. */
export const NOTE_DONE = 'kora-desktop-note-done'

/** Whether the cookie notice should wait for the phone note first. */
let noteDone = false
export const noteStillPending = () => window.matchMedia(PHONE).matches && !inDesktopView() && !noteDone

export function setDesktopView(on: boolean) {
  // A fresh load of the same address (a plain reload would keep the zoom).
  const url = new URL(window.location.href)
  if (on) url.searchParams.set('view', 'desktop')
  else url.searchParams.delete('view')
  window.location.replace(url.toString())
}

export function DesktopViewNotice() {
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!noteStillPending()) return
    const timer = window.setTimeout(() => setOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  if (!open) return null

  const close = () => {
    noteDone = true
    window.dispatchEvent(new Event(NOTE_DONE))
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

/** In desktop view on a phone: a small button to go back, always on screen. */
export function MobileViewButton() {
  if (!onSmallScreen() || !inDesktopView()) return null
  return (
    <button type="button" className="kora-mobileview" onClick={() => setDesktopView(false)}>
      Mobile view
    </button>
  )
}
