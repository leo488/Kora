import type { PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS, srcSetFor } from '../data'
import type { Project } from '../data'
import { CASE_STUDY_DUE, caseLinkFor, caseStudyFor } from '../caseStudies'
import { NxArrow } from './NxHeader'
import { FilmAfterImage } from '../components/Sections'

/* The work list: one project per row, the picture on the left half, the
   name, line and a short story on the right half, an arrow in the corner. */

function RowLink({ to, children }: { to?: string; children: ReactNode }) {
  return to ? (
    <Link to={to} className="nx-row">
      {children}
    </Link>
  ) : (
    <div className="nx-row is-soon">{children}</div>
  )
}

/** Keeps the hover pill under the pointer while it is over a project image. */
function followCursor(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--kora-vx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--kora-vy', `${event.clientY - box.top}px`)
}

/** "Brand — Line" headlines lose the brand, which the row already names. */
const lineOf = (project: Project) => {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return (rest ?? project.headline).replace(/\.$/, '')
}

export function NxRow({ project }: { project: Project }) {
  const to = caseLinkFor(project.name)
  const study = caseStudyFor(project.name)
  const lead = project.images[0]
  const title = study?.tagline ?? lineOf(project)
  const story = study?.teaser ?? study?.summary ?? `${project.brand}: ${lineOf(project)}.`
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li>
      <RowLink to={to}>
        <div className="nx-row-media kora-rx-media" onPointerMove={followCursor}>
          <div className="kora-flare">
            {project.film?.afterImageMs ? (
              <FilmAfterImage
                src={project.film.src}
                delayMs={project.film.afterImageMs}
                still={lead}
                alt={project.brand}
              />
            ) : project.film ? (
              <video
                src={project.film.src}
                poster={project.film.poster.src}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={project.brand}
                disablePictureInPicture
              />
            ) : (
              <img
                src={lead.src}
                srcSet={srcSetFor(lead)}
                sizes="(max-width: 760px) 100vw, 50vw"
                alt={project.brand}
                loading="lazy"
                draggable={false}
              />
            )}
          </div>
          <span className="nx-view" aria-hidden={to ? true : undefined}>
            {to ? 'View' : `Case study out ${CASE_STUDY_DUE}`}
          </span>
        </div>

        <div className="nx-row-text">
          <div className="nx-row-head">
            <div>
              <h3>{title}</h3>
              <p className="nx-meta">
                {study?.title ?? project.brand} · {project.year} · {project.category}
              </p>
            </div>
            {to ? <NxArrow /> : <span className="nx-soon">Out {CASE_STUDY_DUE}</span>}
          </div>
          <div className="nx-row-foot">
            {hasStat && (
              <p className="nx-row-stat">
                {project.stat}
                {project.statNote && <span> · {project.statNote}</span>}
              </p>
            )}
            <p className="nx-row-story">{story}</p>
          </div>
        </div>
      </RowLink>
    </li>
  )
}

export function NxWorkList({ names }: { names?: string[] }) {
  const list = names
    ? names.map((n) => PROJECTS.find((p) => p.name === n)).filter((p): p is Project => !!p)
    : PROJECTS
  return (
    <ul className="nx-rows">
      {list.map((project) => (
        <NxRow key={project.name} project={project} />
      ))}
    </ul>
  )
}
