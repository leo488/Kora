import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PROJECTS } from '../data'
import { caseStudyFor } from '../caseStudies'
import type { CaseBlock, CaseSlot } from '../caseStudies'
import { Contact } from '../components/Sections'
import { ScreenOverlay } from '../components/ipaybtc/ScreenOverlay'
import type { PhoneScreen } from '../components/ipaybtc/ScreenOverlay'
import { Steam } from '../components/ipaybtc/Steam'
import { IconGrid, IconTile, KeypadCard, LogoTile, Merch, WallPoster, PhoneBoard, PhonePlate, PostWall, SocialCarousel, TypePoster, TypeSwap, ZoomImg, Onboarding, TypeReel } from '../components/ipaybtc/Scenes'
import { Chip } from '../components/refreeg/Chip'
import { ColourCards, MerchReel, MockupBoard, OnboardTap, WebsiteHero } from '../components/ipaybtc/Extras'
import ipaybtcLogo from '../assets/ipaybtc-logo.svg?raw'
import ladyCut from '../assets/figx/ipaybtc-lady-cutout-2400.webp'
import ilCoinFan from '../assets/ipaybtc-ill/ipaybtc-coin-fan.svg?raw'
import ilStacks from '../assets/ipaybtc-ill/ipaybtc-coin-stacks.svg?raw'

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

export function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'full':
      return <Plate slot={block.slot} inset={block.inset} wide={block.wide} gapAfter={block.gapAfter} />
    case 'pair':
      return (
        <div
          className={`kora-case-pair${block.inset ? ' is-inset' : ''}${block.wide ? ' is-wide' : ''}${block.cols ? ' has-cols' : ''}`}
          style={{ ...(block.gapAfter ? { marginBottom: '100vh' } : null), ...(block.cols ? { ['--pair-cols' as string]: block.cols } : null) }}
        >
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
    case 'text':
      return (
        <section className="kora-case-note">
          <h2>{block.heading}</h2>
          <p>{block.body}</p>
        </section>
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
export function Plate({ slot, eager = false, inset = false, wide = false, gapAfter = false }: { slot: CaseSlot; eager?: boolean; inset?: boolean; wide?: boolean; gapAfter?: boolean | 'end' }) {
  return (
    <figure
      className={`kora-case-plate kora-rx-media${inset ? ' is-inset' : ''}${wide ? ' is-wide' : ''}${slot.frameFit ? ' is-framefit' : ''}`}
      style={{ aspectRatio: slot.ratio, marginBottom: gapAfter === 'end' ? '100vh' : gapAfter ? 'clamp(96px, 16vw, 320px)' : undefined }}
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
        ) : slot.art === 'ipaybtc-social' ? (
          <SocialCarousel />
        ) : slot.art === 'ipaybtc-wall' ? (
          <PostWall />
        ) : slot.art === 'ipaybtc-icons' ? (
          <IconGrid />
        ) : slot.art === 'ipaybtc-coin' ? (
          <IconTile icon="coin" bg="#fff9c4" />
        ) : slot.art === 'ipaybtc-cap' ? (
          <Merch kind="cap" />
        ) : slot.art === 'ipaybtc-tote' ? (
          <Merch kind="tote" />
        ) : slot.art === 'ipaybtc-wallposter' ? (
          <WallPoster post={1} />
        ) : slot.art === 'ipaybtc-onboard-phone' ? (
          <OnboardTap />
        ) : slot.art === 'ipaybtc-onboard' ? (
          <Onboarding />
        ) : slot.art === 'ipaybtc-logo-blue' ? (
          <LogoTile tone="blue" />
        ) : slot.art === 'ipaybtc-logo-navy' ? (
          <LogoTile tone="navy" />
        ) : slot.art === 'ipaybtc-phone' ? (
          <PhonePlate flow="buy" />
        ) : slot.art === 'ipaybtc-phones' ? (
          <PhoneBoard />
        ) : slot.art === 'ipaybtc-type-reel' ? (
          <TypeReel />
        ) : slot.art === 'ipaybtc-poster-border' ? (
          <TypePoster tone="navy" size={9} lines={['No bank opening hours.', 'No border.', 'No permission.']} />
        ) : slot.art === 'ipaybtc-poster-tea' ? (
          <TypePoster tone="yellow" lines={['Buy Bitcoin', 'before your', 'tea gets cold.']} />
        ) : slot.art === 'ipaybtc-merch-reel' && slot.reel ? (
          <MerchReel frames={slot.reel} />
        ) : slot.art === 'ipaybtc-mockups' ? (
          <MockupBoard />
        ) : slot.art === 'ipaybtc-colour-cards' ? (
          <ColourCards />
        ) : slot.art === 'ipaybtc-website' ? (
          <WebsiteHero />
        ) : slot.art === 'ipaybtc-poster-spend' ? (
          <TypePoster tone="blue" lines={['Bitcoin was', 'never meant', 'to sit still.', 'Spend it.']} />
        ) : slot.src ? (
          /* The picture sits in the visible frame, never under the flare
             reach, so nothing is cropped at rest. */
          <div className="kora-case-frame">{slot.video ? (
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
                  className={slot.fit ? 'kora-case-fit' : undefined}
                  src={slot.src}
                  srcSet={slot.srcSet}
                  sizes="(max-width: 760px) 100vw, 100vw"
                  alt={slot.label}
                  loading={eager ? 'eager' : 'lazy'}
                />
              )}
              {slot.screen && (slot.then ? <ScreenThen screen={slot.screen} then={slot.then} /> : <ScreenOverlay screen={slot.screen} />)}
              {slot.steam && <Steam spot={slot.steam} />}
              {slot.top && <img className="kora-case-top" src={slot.top} alt="" aria-hidden />}
              {slot.keypad && <KeypadCard />}
              {slot.overlay === 'cn-poster' && (
                <>
                <div className="kora-cnposter-bg" aria-hidden />
                <div className="kora-cnposter-ills" aria-hidden>
                  <span className="is-fan" dangerouslySetInnerHTML={{ __html: ilCoinFan }} />
                  <span className="is-stacks" dangerouslySetInnerHTML={{ __html: ilStacks }} />
                </div>
                <img className="kora-cnposter-cut" src={ladyCut} alt="" aria-hidden />
                </>
              )}
            </>
          )}</div>
        ) : (
          <figcaption>{slot.label}</figcaption>
        )}
      </div>
      {slot.chip && <Chip chip={slot.chip} />}
    </figure>
  )
}


/** The live screen plays once through, then the plate cuts (no fades) to
    each picture in turn and back to the phone, which starts over. */
const SCREEN_MS = 9800
const CUT_MS = 2200

function ScreenThen({ screen, then }: { screen: PhoneScreen; then: Array<{ src: string; label: string }> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)
  const [i, setI] = useState(-1) // -1: the phone
  const [round, setRound] = useState(0)

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!onScreen) return
    const t = window.setTimeout(
      () => {
        if (i + 1 < then.length) setI(i + 1)
        else {
          setI(-1)
          setRound((r) => r + 1)
        }
      },
      i < 0 ? SCREEN_MS : CUT_MS,
    )
    return () => clearTimeout(t)
  }, [onScreen, i, then.length])

  return (
    <>
      <div ref={ref} hidden />
      <ScreenOverlay key={round} screen={screen} />
      {then.map((p, k) => (
        <img
          key={p.src}
          className="kora-case-then"
          src={p.src}
          alt={k === i ? p.label : ''}
          loading="lazy"
          style={{ visibility: k === i ? 'visible' : 'hidden' }}
        />
      ))}
    </>
  )
}
