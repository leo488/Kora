/* The earlier manifesto layout is kept, commented out, at the end of this
   file, with the AboutMarks import and the `.kora-page-about*` rules. */

import { SERVICES } from '../data'
import { InnerPage } from '../components/rx/InnerPage'

/* About — the studio in one line, then what we do, one service per row with
   hairlines between, as Ragged Edge sets its Approach. */

export function About() {
  return (
    <InnerPage
      label="About"
      heading="Kora is a global creative studio. We give founders and teams the brand, the story, and the design system to back it up."
    >
      <section className="kora-rx-services" aria-labelledby="kora-rx-services-heading">
        <h2 id="kora-rx-services-heading" className="kora-rx-label">
          What we do
        </h2>
        <ol className="kora-rx-services-list">
          {SERVICES.map((service, i) => (
            <li key={service.name}>
              <span className="kora-rx-services-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </InnerPage>
  )
}

/*
import { useInView } from '../hooks/useInView'
import { Reveal, Shape } from '../components/AboutMarks'
import { PROJECTS, thumbOf } from '../data'

// The reveals glimpse real work. Small variants only — these render a few
// hundred pixels wide at most, so the 2000px plates would be waste.
const [ipaybtc, escro, tagmi] = PROJECTS

export function About() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section
      className={`kora-page-about${visible ? ' is-visible' : ''}`}
      ref={ref}
    >
      <div className="kora-page-about-inner kora-container">
        {/* The page is one continuous statement, which would make a 500-character
            heading if it were marked up as one. The heading stays for structure
            and screen readers; the statement itself is body text. *\/}
        <h1 className="kora-visually-hidden">About Kora</h1>

        <p className="kora-page-about-manifesto">
          Kora is a global creative studio{' '}
          <Shape kind="blade" tone="blue" /> We partner with founders and teams
          building something worth paying attention to{' '}
          <Reveal src={thumbOf(ipaybtc.images[0])} /> and give them the brand, the
          story, and the design system to back it up{' '}
          <Shape kind="asterisk" tone="amber" /> Brand strategy, identity,
          digital product, motion <Reveal src={thumbOf(escro.images[0])} /> and on
          every project the same through-line: clarity first, craft always. No
          templates, no shortcuts, no generic &ldquo;creative agency&rdquo;
          filler <Shape kind="arrow-circle" tone="violet" /> Small team, senior
          hands on every brief <Reveal src={thumbOf(tagmi.images[0])} /> and
          offices close to the markets we work in{' '}
          <Shape kind="arrow-square" tone="coral" /> from fintech in Lagos to
          lifestyle brands in Abuja.
        </p>
      </div>
    </section>
  )
}

*/
