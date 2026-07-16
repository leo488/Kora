import { useMemo, useState } from 'react'
import { PROJECTS } from '../data'
import { ArrowIcon } from '../components/icons'

export function Work() {
  const categories = useMemo(
    () => ['All', ...new Set(PROJECTS.map((project) => project.category))],
    [],
  )
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory)

  return (
    <section className="kora-page-work kora-container">
      <header className="kora-page-work-header">
        <span className="kora-page-work-label">Selected Work</span>
        <h1>Work that moves the needle.</h1>
      </header>

      <div className="kora-page-work-categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === activeCategory ? 'is-active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="kora-page-work-grid">
        {visibleProjects.map((project, i) => (
          <li key={project.name} style={{ animationDelay: `${0.08 * i}s` }}>
            <a href="#" className="kora-page-work-card">
              <div className="kora-page-work-thumb" aria-hidden="true" />

              <div className="kora-page-work-info">
                <span className="kora-page-work-index">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="kora-page-work-text">
                  <h2>{project.name}</h2>
                  <span className="kora-page-work-meta">
                    {project.category} &middot; {project.year}
                  </span>
                </div>

                <ArrowIcon className="kora-page-work-arrow" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
