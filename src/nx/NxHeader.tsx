import { Link, NavLink } from 'react-router-dom'
import { KoraMark } from '../components/KoraMark'
import { ThemeToggle } from '../components/ThemeToggle'

/* The bar on every page, after Nonstop's: the logo far left, the links
   starting on the page's centre line, one action far right. */

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export function NxHeader() {
  return (
    <>
      <header className="nx-head">
        <Link to="/" className="nx-head-logo" aria-label="Koraa’ — home">
          <KoraMark />
        </Link>
        <nav className="nx-head-nav" aria-label="Main">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="nx-head-end">
          <ThemeToggle className="nx-head-theme" />
          <Link to="/contact" className="nx-head-cta">
            Start a project
          </Link>
        </div>
      </header>
      <div className="nx-head-spacer" aria-hidden="true" />
    </>
  )
}

/** The small arrow Nonstop puts on every link out. */
export function NxArrow() {
  return (
    <svg className="nx-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
