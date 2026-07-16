import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS, SERVICES } from '../data'
import { ChevronIcon } from './icons'

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeService, setActiveService] = useState(SERVICES[0])

  return (
    <header className="kora-header-wrap">
      <div className="kora-header kora-container">
        <Link to="/" className="kora-logo-link">
          <img className="kora-logo" src="/logo.svg" alt="Kora" />
        </Link>

        <div className="kora-header-right">
          <nav className="kora-nav">
            {NAV_LINKS.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="kora-nav-item"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={`kora-nav-trigger${servicesOpen ? ' is-open' : ''}`}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronIcon />
                  </button>
                </div>
              ) : item.to ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  className={({ isActive }) => (isActive ? 'is-active' : '')}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a key={item.label} href="#">
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <a href="#" className="kora-cta">
            Book A Call
          </a>
        </div>
      </div>

      <div
        className={`kora-mega${servicesOpen ? ' is-open' : ''}`}
        onMouseEnter={() => setServicesOpen(true)}
        onMouseLeave={() => setServicesOpen(false)}
      >
        <div className="kora-mega-inner kora-container">
          <div className="kora-mega-preview">
            <div className="kora-mega-image">
              <img src="/hero-01.png" alt="" />
            </div>

            <div className="kora-mega-preview-text">
              <h3>{activeService.name}</h3>
              <p>{activeService.description}</p>
            </div>

            <div className="kora-mega-preview-actions">
              <a href="#" className="kora-cta">
                Schedule A Call
              </a>
              <a href="#" className="kora-mega-talk-now">
                Talk To Someone Now
              </a>
            </div>
          </div>

          <ul className="kora-mega-list">
            {SERVICES.map((service) => (
              <li key={service.name}>
                <a href="#" onMouseEnter={() => setActiveService(service)}>
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
