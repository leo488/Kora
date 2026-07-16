import { useInView } from '../hooks/useInView'

export function About() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section
      className={`kora-page-about${visible ? ' is-visible' : ''}`}
      ref={ref}
    >
      <div className="kora-page-about-inner kora-container">
        <h1 className="kora-page-about-heading">About Us</h1>

        <div className="kora-page-about-copy">
          <p>
            Kora is a global creative studio. We partner with founders and
            teams who are building something worth paying attention to, and
            give them the brand, the story, and the design system to back it
            up.
          </p>
          <p>
            We work across brand strategy, identity, digital product, and
            motion &mdash; but the through-line on every project is the same:
            clarity first, craft always. No templates, no shortcuts, no
            generic &ldquo;creative agency&rdquo; filler.
          </p>
          <p>
            Small team, senior hands on every brief, and offices close to the
            markets we work in &mdash; from fintech in Lagos to lifestyle
            brands in New York.
          </p>
        </div>
      </div>
    </section>
  )
}
