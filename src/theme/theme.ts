import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'kora:theme'

/** Every visit opens in dark. The light switch still works for the visit,
    but a saved light choice is no longer restored. */
export function initialTheme(): Theme {
  return 'dark'
}

export const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
