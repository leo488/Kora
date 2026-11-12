import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { KoraStar } from '../components/KoraStar'
import { useContact } from '../contact/useContact'
import { PILLARS, QUESTIONS, scoreTest } from '../brandTest/questions'
import { downloadReport } from '../brandTest/report'
import '../brandTest/brand-test.css'

/* The brand test.
   ---------------
   A stage in two halves. One half is a brand gradient carrying only the star
   and one very large number (the brand kit keeps body text off gradients);
   the other half is the question. Ten questions, one tap each, then a score,
   the weakest areas, a PDF, and a way to talk to the studio about it. */

type Stage = 'intro' | 'questions' | 'result'

const LETTERS = ['A', 'B', 'C', 'D']
const pad = (n: number) => String(n).padStart(2, '0')

export function BrandTest() {
  const openContact = useContact()
  const [stage, setStage] = useState<Stage>('intro')
  const [brand, setBrand] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [saving, setSaving] = useState<'idle' | 'busy' | 'failed'>('idle')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const advance = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => clearTimeout(advance.current)
  }, [])

  // The question changed: put focus on it, so the next thing read is the
  // new question rather than the button that was just pressed.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [stage, index])

  // A new stage starts from the top, so a phone that had scrolled down to the
  // last answer sees the score first.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stage])

  const question = QUESTIONS[index]
  const pillar = PILLARS.find((p) => p.id === question.pillar) ?? PILLARS[0]
  const result = stage === 'result' ? scoreTest(answers) : null

  const gradient = stage === 'intro' ? 'blue-hour' : stage === 'result' ? 'plantain-glow' : pillar.gradient
  // The star turns one notch with every answer.
  const turns = stage === 'intro' ? 0 : stage === 'result' ? QUESTIONS.length : index + 1

  const choose = (answer: number) => {
    clearTimeout(advance.current)
    setAnswers((current) => {
      const next = [...current]
      next[index] = answer
      return next
    })
    // A beat to see the choice land, then on.
    advance.current = setTimeout(() => {
      if (index < QUESTIONS.length - 1) setIndex(index + 1)
      else setStage('result')
    }, 320)
  }

  const back = () => {
    clearTimeout(advance.current)
    if (index === 0) setStage('intro')
    else setIndex(index - 1)
  }

  const restart = () => {
    setAnswers([])
    setIndex(0)
    setSaving('idle')
    setStage('intro')
  }

  const save = async () => {
    if (!result || saving === 'busy') return
    setSaving('busy')
    try {
      await downloadReport(result, brand.trim())
      setSaving('idle')
    } catch {
      setSaving('failed')
    }
  }

  const talk = () => {
    if (!result) return
    openContact({
      note: [
        `Brand test: ${result.score}/100 (${result.level.title})${brand.trim() ? ` for ${brand.trim()}` : ''}.`,
        ...result.pillars.map((p) => `${p.pillar.name}: ${p.score}/6`),
      ].join('\n'),
    })
  }

  return (
    <div className="kora-rx kora-rx-sub kora-bt">
      <section className="kora-bt-stage" aria-labelledby="kora-bt-heading">
        <div className={`kora-bt-panel is-${gradient}`} aria-hidden="true">
          {(['blue-hour', 'plantain-glow', 'zobo-heat', 'studio-day'] as const).map((name) => (
            <div key={name} className={`kora-bt-wash is-${name}${name === gradient ? ' is-on' : ''}`} />
          ))}
          <span className="kora-bt-star" style={{ '--kora-bt-turn': `${turns * 60}deg` } as CSSProperties}>
            <KoraStar />
          </span>
          <p className="kora-bt-figure" key={stage === 'questions' ? index : stage}>
            {stage === 'intro' && pad(QUESTIONS.length)}
            {stage === 'questions' && pad(index + 1)}
            {result && <Count to={result.score} />}
          </p>
        </div>

        <div className="kora-bt-main">
          {stage === 'intro' && (
            <form
              className="kora-bt-step"
              onSubmit={(event) => {
                event.preventDefault()
                setStage('questions')
              }}
            >
              <p className="kora-bt-label">The brand test</p>
              <h1 id="kora-bt-heading" ref={headingRef} tabIndex={-1}>
                How strong is your brand?
              </h1>
              <p className="kora-bt-lede">
                Ten questions, about three minutes. You get a score, your strongest and
                weakest areas, and a report to download.
              </p>
              <label className="kora-field kora-bt-brand">
                <span className="kora-field-label">What is your brand called?</span>
                <input
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  autoComplete="organization"
                  maxLength={40}
                />
                <span className="kora-field-hint">Optional. It goes on your report.</span>
              </label>
              <div className="kora-bt-actions">
                <button type="submit" className="kora-pill is-solid is-large">
                  Start the test
                </button>
              </div>
            </form>
          )}

          {stage === 'questions' && (
            <div className="kora-bt-step" key={index}>
              <ol className="kora-bt-progress" aria-hidden="true">
                {QUESTIONS.map((q, i) => (
                  <li key={q.text} className={i <= index ? 'is-on' : undefined} />
                ))}
              </ol>
              <p className="kora-bt-label">
                {pillar.name} <span>Question {index + 1} of {QUESTIONS.length}</span>
              </p>
              <h1 id="kora-bt-heading" ref={headingRef} tabIndex={-1}>
                {question.text}
              </h1>
              <ul className="kora-bt-answers">
                {question.answers.map((answer, i) => (
                  <li key={answer}>
                    <button
                      type="button"
                      className={answers[index] === i ? 'is-picked' : undefined}
                      aria-pressed={answers[index] === i}
                      onClick={() => choose(i)}
                    >
                      <span>{LETTERS[i]}</span>
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="kora-bt-actions">
                <button type="button" className="kora-pill is-outline is-large" onClick={back}>
                  Back
                </button>
              </div>
            </div>
          )}

          {result && (
            <div className="kora-bt-step">
              <p className="kora-bt-label">
                Your result{brand.trim() ? ` for ${brand.trim()}` : ''} <span>{result.score} out of 100</span>
              </p>
              <h1 id="kora-bt-heading" ref={headingRef} tabIndex={-1}>
                {result.level.title}
              </h1>
              <p className="kora-bt-lede">{result.level.summary}</p>

              <dl className="kora-bt-bars">
                {result.pillars.map(({ pillar: p, score }, i) => (
                  <div key={p.id}>
                    <dt>{p.name}</dt>
                    <dd>
                      <span
                        className="kora-bt-bar"
                        style={{ '--kora-bt-fill': score / 6, '--kora-bt-delay': `${i * 90}ms` } as CSSProperties}
                      />
                      <span className="kora-bt-mark">{score}/6</span>
                    </dd>
                  </div>
                ))}
              </dl>

              {result.focus.length > 0 && (
                <div className="kora-bt-focus">
                  <h2>Where to focus first</h2>
                  {result.focus.map(({ pillar: p }) => (
                    <p key={p.id}>
                      <strong>{p.name}.</strong> {p.advice}
                    </p>
                  ))}
                </div>
              )}

              <div className="kora-bt-actions">
                <button type="button" className="kora-pill is-solid is-large" onClick={save}>
                  {saving === 'busy' ? 'Preparing…' : 'Download the report'}
                </button>
                <button type="button" className="kora-pill is-outline is-large" onClick={talk}>
                  Talk to us about it
                </button>
                <button type="button" className="kora-pill is-outline is-large" onClick={restart}>
                  Take it again
                </button>
              </div>
              {saving === 'failed' && (
                <p className="kora-dialog-error" role="alert">
                  The report could not be made on this browser. Your result is above, and
                  you can still send it to us.
                </p>
              )}
              <p className="kora-bt-small">
                This is a self-assessment from your own answers, not an audit.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/** Counts up to the score once, when the result arrives. */
function Count({ to }: { to: number }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100)
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to])
  return <>{value}</>
}
