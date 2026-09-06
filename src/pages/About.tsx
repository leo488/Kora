import { useInView } from '../hooks/useInView'
import { Reveal, Shape } from '../components/AboutMarks'
import { PROJECTS } from '../data'

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
            and screen readers; the statement itself is body text. */}
        <h1 className="kora-visually-hidden">About Kora</h1>

        <p className="kora-page-about-manifesto">
          Kora is a global creative studio{' '}
          <Shape kind="blade" tone="blue" /> We partner with founders and teams
          building something worth paying attention to{' '}
          <Reveal src={ipaybtc.images[0].small} /> and give them the brand, the
          story, and the design system to back it up{' '}
          <Shape kind="asterisk" tone="amber" /> Brand strategy, identity,
          digital product, motion <Reveal src={escro.images[0].small} /> and on
          every project the same through-line: clarity first, craft always. No
          templates, no shortcuts, no generic &ldquo;creative agency&rdquo;
          filler <Shape kind="arrow-circle" tone="violet" /> Small team, senior
          hands on every brief <Reveal src={tagmi.images[0].small} /> and
          offices close to the markets we work in{' '}
          <Shape kind="arrow-square" tone="coral" /> from fintech in Lagos to
          lifestyle brands in Abuja.
        </p>
      </div>
    </section>
  )
}
