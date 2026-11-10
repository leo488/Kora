import { PROJECTS } from '../data'
import { InnerPage } from '../components/rx/InnerPage'
import { ClientRow } from '../components/rx/ClientRow'

/* Work index — every client, one per row, in the Home layout. */

export function Work() {
  return (
    <InnerPage
      label="Work"
      heading="Brands we’ve helped stand out, connect and grow, from fintech to culture."
    >
      <section className="kora-rx-work" aria-label="All work">
        <ul className="kora-rx-rows">
          {PROJECTS.map((project) => (
            <ClientRow key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </InnerPage>
  )
}
