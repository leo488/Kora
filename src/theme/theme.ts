import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'kora:theme'

/** Dark is the studio's default; a saved choice wins on the next visit. */
export function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // Storage blocked; fall through to the default.
  }
  return 'dark'
}

export const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
