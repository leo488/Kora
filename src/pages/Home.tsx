import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { ArrowIcon } from '../components/icons'
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
  const [aboutRef, aboutVisible] = useInView<HTMLElement>()

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

      <section className="kora-hero kora-container">
        <aside className="kora-worklist">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href="#"
              className={project.active ? 'is-active' : ''}
            >
              {project.active && <ArrowIcon />}
              {project.name}
            </a>
          ))}
        </aside>

        <article className="kora-showcase-media">
          <img
            className="kora-showcase-image"
            src="/hero-01.png"
            alt="iPayBTC branded t-shirt on a tennis court"
          />

          <div className="kora-showcase-overlay">
            <div className="kora-showcase-divider" aria-hidden="true" />
            <div className="kora-showcase-tags">
              <span>Categories/Industrues</span>
              <span>Categories/Industrues</span>
              <span className="kora-showcase-stat">12TRN</span>
            </div>
            <h1>iPayBTC &mdash; re&#8209;Designing a Bitcoin Brand for Everyday Use</h1>
          </div>
        </article>
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
