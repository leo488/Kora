import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PROJECTS, thumbOf } from '../data'
import { caseLinkFor, caseStudyFor } from '../caseStudies'
import { Block, Plate } from '../pages/CaseStudy'
import { Accordion } from './NxHome'
import { NxArrow } from './NxHeader'

/* One case study, after Nonstop's: the work runs down the left two thirds,
   and the story stays pinned on the right third, told as an accordion, with
   the next project waiting at the foot of the panel. */

export function NxCase() {
  const { slug } = useParams()
  const study = caseStudyFor(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!study || !caseLinkFor(study.slug)) return <Navigate to="/work" replace />

  const project = PROJECTS.find((p) => p.name.toLowerCase() === study.slug)
  const nextProject = PROJECTS.find((p) => p.name === study.next)
  const nextCandidate = caseStudyFor(study.next)
  // Only point at a next case study that is out.
  const nextStudy = nextCandidate && caseLinkFor(nextCandidate.slug) ? nextCandidate : undefined
  const year = study.facts.find((f) => f.label === 'Year')?.value ?? project?.year

  const items = [
    {
      title: 'Overview',
      body: [study.summary, ...study.highlights],
    },
    ...study.sections.map((s) => ({ title: s.heading, body: s.paragraphs })),
    {
      title: 'Credits',
      body: study.facts.map((f) => `${f.label}: ${f.value}`),
    },
  ]

  return (
    <article className="nx-page nx-case">
      <div className="nx-case-work">
        <Plate slot={study.hero} eager />
        {study.gallery
          .filter((block) => block.kind !== 'text')
          .map((block, i) => (
            <Block key={i} block={block} />
          ))}
      </div>

      <aside className="nx-case-panel">
        <div className="nx-case-top">
          <div className="nx-case-id">
            {project && <img src={thumbOf(project.images[0])} alt="" />}
            <h1>{study.title}</h1>
            <span className="nx-case-tag">{study.tagline}</span>
            <span className="nx-case-year">{year}</span>
          </div>
          <Accordion items={items} open={0} />
          {study.liveUrl && (
            <a className="nx-link" href={study.liveUrl} target="_blank" rel="noreferrer">
              Visit the live site <NxArrow />
            </a>
          )}
        </div>

        {nextProject && nextStudy && (
          <div className="nx-case-next">
            <p>Next project:</p>
            <Link to={`/work/${nextStudy.slug}`} className="nx-case-id is-link">
              <img src={thumbOf(nextProject.images[0])} alt="" />
              <strong>{nextStudy.title}</strong>
              <span className="nx-case-tag">{nextStudy.tagline}</span>
              <span className="nx-case-year">
                {nextProject.year} <NxArrow />
              </span>
            </Link>
          </div>
        )}
      </aside>
    </article>
  )
}
