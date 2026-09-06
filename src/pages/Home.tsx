import { useMemo, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { HeroCarousel } from '../components/HeroCarousel'
import { BrandMarquee } from '../components/BrandMarquee'
import { KoraMark } from '../components/KoraMark'
import { buildHeroReel } from '../data'

/* Immersive hero experiment.
   ---------------------------
   The category row and the project rail are parked, not deleted: the hero is
   now a single full-viewport frame that the visitor lands inside, so anything
   that framed it as a panel on a page works against that. Restore these two
   blocks together with the CATEGORY_TABS list, the activeTab state, jumpTo()
   and the ArrowIcon import to put the old layout back. */

// const CATEGORY_TABS = [
//   { label: 'Our Work', count: 24 },
//   { label: 'Fintech', count: 8 },
//   { label: 'E-commerce', count: 6 },
//   { label: 'Sports & Lifestyle', count: 5 },
//   { label: 'Web3', count: 4 },
//   { label: 'Healthcare', count: 3 },
// ]

export function Home() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [aboutRef, aboutVisible] = useInView<HTMLElement>()
  const [brandsRef, brandsVisible] = useInView<HTMLElement>()

  // A short fixed reel rather than the whole portfolio — see HERO_REEL.
  const slides = useMemo(() => buildHeroReel(), [])
  const slide = slides[slideIndex]

  return (
    <>
      {/* <div className="kora-subnav kora-container">
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
      </div> */}

      <section className="kora-hero">
        {/* <nav className="kora-worklist kora-container" aria-label="Featured projects">
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
        </nav> */}

        <article className="kora-showcase-media">
          <HeroCarousel
            slides={slides}
            index={slideIndex}
            onIndexChange={setSlideIndex}
          />

          {/* The closing film runs without a caption — it belongs to no
              project, and a bare plate is the point of it. */}
          {slide.caption && (
            <div className="kora-showcase-overlay">
              <div className="kora-showcase-divider" aria-hidden="true" />
              {/* Keyed on the frame so the copy re-cuts with the picture. */}
              <div className="kora-showcase-copy" key={slide.key}>
                <div className="kora-showcase-tags">
                  <span>{slide.caption.category}</span>
                  <span>{slide.caption.year}</span>
                  <span className="kora-showcase-stat">{slide.caption.stat}</span>
                </div>
                <h1>{slide.caption.headline}</h1>
              </div>
            </div>
          )}
        </article>
      </section>

      <section
        className={`kora-brands${brandsVisible ? ' is-visible' : ''}`}
        aria-label="Brands we have worked with"
        ref={brandsRef}
      >
        <span className="kora-brands-label">Brands we have worked with</span>
        <BrandMarquee />
      </section>

      <section
        className={`kora-about${aboutVisible ? ' is-visible' : ''}`}
        ref={aboutRef}
      >
        <KoraMark className="kora-about-mark" />

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
