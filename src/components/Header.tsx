import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, OFFICES, SERVICES } from '../data'
import { ChevronIcon, MenuIcon } from './icons'

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeService, setActiveService] = useState(SERVICES[0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false)
  const { pathname } = useLocation()

  // Tapping a link inside the drawer should feel like arriving somewhere, so the
  // drawer closes itself rather than sitting on top of the new page.
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // The drawer covers the viewport — letting the page scroll underneath it is
  // the classic mobile-menu bug, and on iOS it strands you mid-page on close.
  useEffect(() => {
    if (!drawerOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  return (
    <>
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

            <a href="#" className="kora-cta kora-header-cta">
              Book A Call
            </a>

            <button
              type="button"
              className={`kora-menu-toggle${drawerOpen ? ' is-open' : ''}`}
              aria-expanded={drawerOpen}
              aria-controls="kora-drawer"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
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
                <img src="/hero-01.jpg" alt="" />
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

      {/* Phone navigation, deliberately a sibling of the header rather than a
          child: the header's entrance animation leaves a transform on it, and a
          transformed ancestor becomes the containing block for `position:
          fixed`, which would pin the drawer inside the 53px header bar. */}
      <div
        id="kora-drawer"
        className={`kora-drawer${drawerOpen ? ' is-open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <nav className="kora-drawer-nav">
          {NAV_LINKS.map((item) =>
            item.mega ? (
              <div key={item.label} className="kora-drawer-group">
                <button
                  type="button"
                  className={`kora-drawer-link kora-drawer-trigger${
                    drawerServicesOpen ? ' is-open' : ''
                  }`}
                  aria-expanded={drawerServicesOpen}
                  onClick={() => setDrawerServicesOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronIcon />
                </button>

                {drawerServicesOpen && (
                  <ul className="kora-drawer-services">
                    {SERVICES.map((service) => (
                      <li key={service.name}>
                        <a href="#">{service.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  `kora-drawer-link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <a key={item.label} href="#" className="kora-drawer-link">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="kora-drawer-foot">
          <a href="#" className="kora-cta kora-drawer-cta">
            Book A Call
          </a>

          <div className="kora-drawer-contact">
            {OFFICES.map((office) => (
              <a key={office.code} href={`mailto:${office.email}`}>
                <span>{office.city}</span>
                {office.email}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
