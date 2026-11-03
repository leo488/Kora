import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
]

/**
 * The home page's navigation: two groups of pills floating over the page. It
 * sits at the foot of the screen while the hero film is in view, then moves to
 * the top once the visitor scrolls into the page.
 */
export function PillNav({ docked }: { docked: 'bottom' | 'top' }) {
  return (
    <nav className={`kora-pills is-${docked}`} aria-label="Main">
      <div className="kora-pills-group">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) => `kora-pill${isActive ? ' is-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="kora-pills-group">
        <ThemeToggle />
        <a href="#contact" className="kora-pill">
          Contact
        </a>
        <a href="#" className="kora-pill is-solid">
          Book A Call
        </a>
      </div>
    </nav>
  )
}
