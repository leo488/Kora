import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { ArrowIcon } from '../components/icons'
import { HeroCarousel } from '../components/HeroCarousel'
import { PROJECTS } from '../data'

const CATEGORY_TABS = [
  { label: 'Our Work', count: 24 },
  { label: 'Fintech', count: 8 },
  { label: 'E-commerce', count: 6 },
  { label: 'Sports & Lifestyle', count: 5 },
  { label: 'Web3', count: 4 },
  { label: 'Healthcare', count: 3 },
]

export function Home() {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].label)
  const [activeProject, setActiveProject] = useState(PROJECTS[0].name)
  const [aboutRef, aboutVisible] = useInView<HTMLElement>()

  const project = PROJECTS.find((p) => p.name === activeProject) ?? PROJECTS[0]

  return (
    <>
      <div className="kora-subnav kora-container">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={tab.label === activeTab ? 'is-active' : ''}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
            <sup>{tab.count}</sup>
          </button>
        ))}
      </div>

      <section className="kora-hero">
        <nav className="kora-worklist kora-container" aria-label="Featured projects">
          {PROJECTS.map((item) => {
            const isActive = item.name === activeProject
            return (
              <button
                key={item.name}
                type="button"
                className={isActive ? 'is-active' : ''}
                aria-current={isActive}
                onClick={() => setActiveProject(item.name)}
              >
                {isActive && <ArrowIcon />}
                {item.brand}
              </button>
            )
          })}
        </nav>

        <article className="kora-showcase-media">
          <HeroCarousel
            key={project.name}
            images={project.images}
            label={project.brand}
          />

          <div className="kora-showcase-overlay">
            <div className="kora-showcase-divider" aria-hidden="true" />
            <div className="kora-showcase-tags">
              <span>{project.category}</span>
              <span>{project.year}</span>
              <span className="kora-showcase-stat">{project.stat}</span>
            </div>
            <h1>{project.headline}</h1>
          </div>
        </article>
      </section>

      <section className="kora-brands">
        <span className="kora-brands-label">Brands we have worked with</span>
        <ul className="kora-brands-list">
          {PROJECTS.map((item) => (
            <li key={item.name}>{item.brand}</li>
          ))}
        </ul>
      </section>

      <section
        className={`kora-about${aboutVisible ? ' is-visible' : ''}`}
        ref={aboutRef}
      >
        <img className="kora-about-mark" src="/logo.svg" alt="Kora" />

        <span className="kora-about-badge">This Is Kora</span>

        <h2 className="kora-about-heading">
          Through strategic
          <br />
          branding and
          <br />
          storytelling, we help
          <br />
          businesses stand out,
          <br />
          connect, and grow.
        </h2>

        <div className="kora-about-collage" aria-hidden="true">
          <img className="kora-about-photo kora-about-photo-1" src="/image.png" alt="" />
          <img className="kora-about-photo kora-about-photo-2" src="/image-1.png" alt="" />
          <img className="kora-about-photo kora-about-photo-3" src="/image-2.png" alt="" />
        </div>
      </section>
    </>
  )
}
