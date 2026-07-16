import { Outlet } from 'react-router-dom'
import { Announcement } from './Announcement'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <main className="kora-app">
      <Announcement />
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}
