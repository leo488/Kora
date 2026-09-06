import { useMemo, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { ArrowIcon } from '../components/icons'
import { HeroCarousel } from '../components/HeroCarousel'
import { BrandMarquee } from '../components/BrandMarquee'
import { PROJECTS, buildHeroReel } from '../data'

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
  const [slideIndex, setSlideIndex] = useState(0)
  const [aboutRef, aboutVisible] = useInView<HTMLElement>()

  // One reel over every project, so the hero plays the portfolio through rather
  // than sitting on whichever project happens to be selected.
  const slides = useMemo(() => buildHeroReel(PROJECTS), [])
  const project = slides[slideIndex].project

  // Clicking a name in the rail skips the reel to that project's first frame and
  // lets it keep rolling from there.
  const jumpTo = (name: string) =>
    setSlideIndex(slides.findIndex((slide) => slide.project.name === name))

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
            const isActive = item.name === project.name
            return (
              <button
                key={item.name}
                type="button"
                className={isActive ? 'is-active' : ''}
                aria-current={isActive}
                onClick={() => jumpTo(item.name)}
              >
                {isActive && <ArrowIcon />}
                {item.brand}
              </button>
            )
          })}
        </nav>

        <article className="kora-showcase-media">
          <HeroCarousel
            slides={slides}
            index={slideIndex}
            onIndexChange={setSlideIndex}
          />

          <div className="kora-showcase-overlay">
            <div className="kora-showcase-divider" aria-hidden="true" />
            {/* Keyed on the project so the copy re-cuts with the picture. */}
            <div className="kora-showcase-copy" key={project.name}>
              <div className="kora-showcase-tags">
                <span>{project.category}</span>
                <span>{project.year}</span>
                <span className="kora-showcase-stat">{project.stat}</span>
              </div>
              <h1>{project.headline}</h1>
            </div>
          </div>
        </article>
      </section>

      <section className="kora-brands" aria-label="Brands we have worked with">
        <span className="kora-brands-label">Brands we have worked with</span>
        <BrandMarquee />
      </section>

      <section
        className={`kora-about${aboutVisible ? ' is-visible' : ''}`}
        ref={aboutRef}
      >
        <img className="kora-about-mark" src="/logo.svg" alt="Kora" />

        <span className="kora-about-badge">This Is Kora</span>

        {/* The explicit breaks set the measure on a wide screen and are hidden
            on a phone, so each fragment keeps the space that follows it — drop
            the {' '} and the words run together once the breaks go. */}
        <h2 className="kora-about-heading">
          Through strategic{' '}
          <br />
          branding and{' '}
          <br />
          storytelling, we help{' '}
          <br />
          businesses stand out,{' '}
          <br />
          connect, and grow.
        </h2>

        <div className="kora-about-collage" aria-hidden="true">
          <img className="kora-about-photo kora-about-photo-1" src="/about-01.jpg" alt="" />
          <img className="kora-about-photo kora-about-photo-2" src="/about-02.jpg" alt="" />
          <img className="kora-about-photo kora-about-photo-3" src="/about-03.jpg" alt="" />
        </div>
      </section>
    </>
  )
}
