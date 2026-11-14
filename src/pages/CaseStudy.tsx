import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PROJECTS } from '../data'
import { caseStudyFor } from '../caseStudies'
import type { CaseBlock, CaseSlot } from '../caseStudies'
import { Contact } from '../components/Sections'
import { ScreenOverlay } from '../components/ipaybtc/ScreenOverlay'
import { KeypadCard, LogoTile, PhoneBoard, PhonePlate, TypePoster, TypeSwap, ZoomImg } from '../components/ipaybtc/Scenes'
import ipaybtcLogo from '../assets/ipaybtc-logo.svg?raw'

/* One case study: hero plate, intro with the facts beside it, the work told
   in images, then the next project and the contact block. */

export function CaseStudy() {
  const { slug } = useParams()
  const study = caseStudyFor(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!study) return <Navigate to="/work" replace />

  const next = PROJECTS.find((p) => p.name === study.next)
  const nextStudy = caseStudyFor(study.next)

  return (
    <article className="kora-case">
      <div className="kora-case-hero">
        <Plate slot={study.hero} eager />
      </div>

      <section className="kora-case-intro">
        <aside className="kora-case-facts">
          <dl>
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="kora-case-copy">
          <h1>{study.title}</h1>
          <p className="kora-case-summary">{study.summary}</p>

          {study.highlights.length > 0 && (
            <ul className="kora-case-highlights">
              {study.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}

          {study.sections.map((section) => (
            <section key={section.heading} className="kora-case-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text) => (
                <p key={text.slice(0, 32)}>{text}</p>
              ))}
            </section>
          ))}

          {study.liveUrl && (
            <a
              className="kora-case-live"
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit the live site
            </a>
          )}
        </div>
      </section>

      <div className="kora-case-gallery">
        {study.gallery.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {next && (
        <Link
          to={nextStudy ? `/work/${nextStudy.slug}` : '/work'}
          className="kora-case-next"
        >
          <div className="kora-case-next-text">
            <span>Next project</span>
            <strong>{next.brand}</strong>
          </div>
          <div className="kora-case-next-media">
            <img src={next.images[0].src} alt="" loading="lazy" />
          </div>
        </Link>
      )}

      <Contact />
    </article>
  )
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'full':
      return <Plate slot={block.slot} inset={block.inset} />
    case 'pair':
      return (
        <div className={`kora-case-pair${block.inset ? ' is-inset' : ''}`}>
          <Plate slot={block.slots[0]} />
          <Plate slot={block.slots[1]} />
        </div>
      )
    case 'grid':
      return (
        <div
          className="kora-case-grid"
          style={{ gridTemplateColumns: `repeat(${block.columns}, minmax(0, 1fr))` }}
        >
          {block.slots.map((s) => (
            <Plate key={s.label} slot={s} />
          ))}
        </div>
      )
    case 'collage':
      return (
        <div className="kora-case-collage">
          {block.slots.map((s) => (
            <Plate key={s.label} slot={s} />
          ))}
        </div>
      )
  }
}

/** An image or loop — or, until it exists, a grey panel naming what goes
 *  there. */
function Plate({ slot, eager = false, inset = false }: { slot: CaseSlot; eager?: boolean; inset?: boolean }) {
  return (
    <figure
      className={`kora-case-plate kora-rx-media${inset ? ' is-inset' : ''}`}
      style={{ aspectRatio: slot.ratio }}
    >
      <div className="kora-flare">
        {slot.art === 'ipaybtc-logo' ? (
          <div
            className="kora-case-art kora-case-art-ipaybtc"
            role="img"
            aria-label={slot.label}
            dangerouslySetInnerHTML={{ __html: ipaybtcLogo }}
          />
        ) : slot.art === 'ipaybtc-type' ? (
          <TypeSwap />
        ) : slot.art === 'ipaybtc-logo-navy' ? (
          <LogoTile tone="navy" />
        ) : slot.art === 'ipaybtc-phone' ? (
          <PhonePlate flow="buy" />
        ) : slot.art === 'ipaybtc-phones' ? (
          <PhoneBoard />
        ) : slot.art === 'ipaybtc-poster-border' ? (
          <TypePoster tone="navy" size={9} lines={['No bank opening hours.', 'No border.', 'No permission.']} />
        ) : slot.art === 'ipaybtc-poster-tea' ? (
          <TypePoster tone="yellow" lines={['Buy Bitcoin', 'before your', 'tea gets cold.']} />
        ) : slot.art === 'ipaybtc-poster-spend' ? (
          <TypePoster tone="blue" lines={['Bitcoin was', 'never meant', 'to sit still.', 'Spend it.']} />
        ) : slot.src ? (
          slot.video ? (
            <>
              <video src={slot.src} poster={slot.poster} muted loop autoPlay playsInline aria-label={slot.label} />
              {slot.overlay === 'ipaybtc-card' && (
                <div className="kora-paycard" aria-hidden>
                  <span className="kora-paycard-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
                  <span className="kora-paycard-chip" />
                  <svg className="kora-paycard-tap" viewBox="0 0 24 24">
                    <path d="M8 7.5a6.5 6.5 0 0 1 0 9M11.5 5a10 10 0 0 1 0 14M15 2.8a13 13 0 0 1 0 18.4" />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <>
              {slot.zoom ? (
                <ZoomImg src={slot.src} srcSet={slot.srcSet} alt={slot.label} eager={eager} />
              ) : (
                <img
                  src={slot.src}
                  srcSet={slot.srcSet}
                  sizes="(max-width: 760px) 100vw, 100vw"
                  alt={slot.label}
                  loading={eager ? 'eager' : 'lazy'}
                />
              )}
              {slot.screen && <ScreenOverlay screen={slot.screen} />}
              {slot.keypad && <KeypadCard />}
            </>
          )
        ) : (
          <figcaption>{slot.label}</figcaption>
        )}
      </div>
    </figure>
  )
}

