import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { THEME_KEY, ThemeContext, initialTheme } from '../theme/theme'
import type { Theme } from '../theme/theme'
import { Offices } from './Offices'
import { Footer } from './Footer'
import { CookieBar } from './CookieBar'
import { useFlareController } from './rx/useFlareController'

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

  // Every page carries the floating pill navigation and the docking lockup,
  // so the old top bars are gone.
  useFlareController()

  return (
    <ThemeContext.Provider value={themeValue}>
      <main className={`kora-app is-${theme}`}>
        <Outlet />
        <Offices />
        <Footer />
        <CookieBar />
      </main>
    </ThemeContext.Provider>
  )
}
