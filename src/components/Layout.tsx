import { Outlet } from 'react-router-dom'
import { Announcement } from './Announcement'
import { Header } from './Header'
import { Offices } from './Offices'
import { Footer } from './Footer'
import { CookieBar } from './CookieBar'

export function Layout() {
  // Every route runs dark now — the light shell is gone. Kept as a class rather
  // than folded into the base styles so the sections that are deliberately not
  // black (the contact band, for one) still have something to opt out of.
  const isDark = true

  return (
    <main
      className={`kora-app${isDark ? ' is-dark' : ''}`}
    >
      <div className="kora-topbar">
        <Announcement />
        <Header />
      </div>
      <Outlet />
      <Offices />
      <Footer />
      <CookieBar />
    </main>
  )
}
