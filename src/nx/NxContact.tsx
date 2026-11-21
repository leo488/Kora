import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { NEW_BUSINESS_EMAIL, sendBrief } from '../contact/sendBrief'
import type { Brief } from '../contact/sendBrief'
import { NxArrow } from './NxHeader'

/* Contact, after Nonstop's: three short steps on the right half, a row of
   dots for where you are, one Next button. */

const SERVICES = ['Brand identity', 'Rebrand', 'Website', 'Product design', 'Motion', 'Packaging', 'Not sure yet']
const TIMELINES = ['As soon as possible', 'In 1 to 3 months', 'Later than that', 'Just exploring']
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'error' | 'done'

export function NxContact() {
  const seed = (useLocation().state ?? {}) as { prefer?: string; note?: string }
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [site, setSite] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [timeline, setTimeline] = useState('')
  const [goal, setGoal] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')
  const first = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const check = () => {
    if (step === 0) {
      if (!name.trim()) return 'Tell us your name.'
      if (!EMAIL_SHAPE.test(email.trim())) return 'Enter an email we can reply to.'
    }
    if (step === 1 && services.length === 0) return 'Pick at least one.'
    return ''
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const problem = check()
    setError(problem)
    if (problem) return
    if (step < 2) {
      setStep(step + 1)
      return
    }
    if (trap) {
      setStatus('done')
      return
    }
    const brief: Brief = {
      services,
      budget: '',
      company: site.trim() || name.trim(),
      goal,
      timeline,
      name,
      email,
      phone: '',
      prefer: seed.prefer ?? 'Email',
      note: [site && `Website: ${site}`, seed.note].filter(Boolean).join('\n'),
    }
    setStatus('sending')
    try {
      await sendBrief(brief)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const toggle = (s: string) =>
    setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]))

  return (
    <div className="nx-page nx-split nx-contact">
      <div />
      <div>
        <h1 className="nx-contact-title">{status === 'done' ? 'Thank you' : 'Contact us'}</h1>

        {status === 'done' ? (
          <p className="nx-lead">
            We’ve got your brief and will reply within two working days. Anything
            else, write to <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>.
          </p>
        ) : (
          <form className="nx-form" onSubmit={onSubmit} noValidate>
            <input
              className="kora-visually-hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />

            {step === 0 && (
              <div className="nx-fields">
                <input ref={first} aria-label="Name" placeholder="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input aria-label="Email" type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input aria-label="Website" placeholder="Website (if you have one)" autoComplete="url" value={site} onChange={(e) => setSite(e.target.value)} />
              </div>
            )}

            {step === 1 && (
              <fieldset className="nx-fields">
                <legend>What do you need?</legend>
                <div className="nx-chips">
                  {SERVICES.map((s) => (
                    <button key={s} type="button" aria-pressed={services.includes(s)} onClick={() => toggle(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <div className="nx-fields">
                <textarea aria-label="About the project" placeholder="Tell us about the project" rows={4} value={goal} onChange={(e) => setGoal(e.target.value)} />
                <fieldset>
                  <legend>When would you like to start?</legend>
                  <div className="nx-chips">
                    {TIMELINES.map((t) => (
                      <button key={t} type="button" aria-pressed={timeline === t} onClick={() => setTimeline(timeline === t ? '' : t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {(error || status === 'error') && (
              <p className="nx-error" role="alert">
                {error || `That didn’t send. Please write to ${NEW_BUSINESS_EMAIL}.`}
              </p>
            )}

            <div className="nx-form-foot">
              <div className="nx-dots" aria-label={`Step ${step + 1} of 3`}>
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === step ? 'is-on' : undefined}
                    aria-label={`Step ${i + 1}`}
                    disabled={i > step}
                    onClick={() => setStep(i)}
                  />
                ))}
              </div>
              <button type="submit" className="nx-btn" disabled={status === 'sending'}>
                {step < 2 ? 'Next' : status === 'sending' ? 'Sending' : 'Send'} <NxArrow />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
