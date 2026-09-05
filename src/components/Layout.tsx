import { Outlet, useLocation } from 'react-router-dom'
import { Announcement } from './Announcement'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  // The home page runs dark end-to-end — header and footer included. Other
  // routes keep the light shell, so the theme is scoped rather than global.
  const isDark = pathname === '/'

  return (
    <main className={`kora-app${isDark ? ' is-dark' : ''}`}>
      <Announcement />
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}
