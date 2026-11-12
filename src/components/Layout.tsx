import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { THEME_KEY, ThemeContext, initialTheme } from '../theme/theme'
import type { Theme } from '../theme/theme'
import { DockedMasthead } from './Masthead'
import { useFlareController } from '../hooks/useFlareController'
import { Offices } from './Offices'
import { Footer } from './Footer'
import { CookieBar } from './CookieBar'
import { ContactProvider } from '../contact/ContactContext'

export function Layout() {
  // Dark by default, with a light mode the visitor can switch to. The choice is
  // remembered, and mirrored onto <html> so the document ground (what shows
  // during load and under an overscroll bounce) matches the page.
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const toggle = useCallback(
    () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    [],
  )
  const themeValue = useMemo(() => ({ theme, toggle }), [theme, toggle])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Not remembered across visits; the switch still works.
    }
  }, [theme])

  const isHome = useLocation().pathname === '/'
  // The bottom-of-screen image flare, for every image on every page.
  useFlareController()

  return (
    <ThemeContext.Provider value={themeValue}>
      <main className={`kora-app is-${theme}`}>
        {/* Every page wears the homepage masthead. Home drives it from its
            own scroll; the rest show it docked at the top. */}
        {/* The project brief modal lives here so every page can open it and
            it inherits the theme. */}
        <ContactProvider>
          {!isHome && <DockedMasthead />}
          <Outlet />
          <Offices />
          <Footer />
          <CookieBar />
        </ContactProvider>
      </main>
    </ThemeContext.Provider>
  )
}
