import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { KoraStar } from '../components/KoraStar'
import type { ContactSeed } from './useContact'
import { NEW_BUSINESS_EMAIL, briefMailto, sendBrief } from './sendBrief'
import type { Brief } from './sendBrief'
import './contact.css'

/* The project brief: three short steps in a modal, then what happens next.
   One question per step keeps each screen light; the draft is kept if the
   visitor closes the modal and comes back. */

const SERVICES = [
  'Brand identity',
  'Rebrand',
  'Website',
  'Product design',
  'Motion',
  'Packaging',
  'Not sure yet',
]
const TIMELINES = ['As soon as possible', 'In 1 to 3 months', 'Later than that', 'Just exploring']
const REPLY_BY = ['Email', 'A call', 'WhatsApp'] as const

const STEPS = ['What do you need?', 'About the project', 'Your details']

const EMPTY: Brief = {
  services: [],
  company: '',
  goal: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  prefer: 'Email',
  note: '',
}

type Status = 'idle' | 'sending' | 'error' | 'sent' | 'mail'
type Errors = Partial<Record<keyof Brief, string>>

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function check(step: number, brief: Brief): Errors {
  const errors: Errors = {}
  if (step === 0 && brief.services.length === 0) errors.services = 'Pick at least one.'
  if (step === 1 && !brief.company.trim()) errors.company = 'Tell us the brand or company name.'
  if (step === 2) {
    if (!brief.name.trim()) errors.name = 'Tell us your name.'
    if (!EMAIL_SHAPE.test(brief.email.trim())) errors.email = 'Enter an email we can reply to.'
    if (brief.prefer !== 'Email' && !brief.phone.trim())
      errors.phone = 'Add a number so we can reach you that way.'
  }
  return errors
}

export function ContactDialog({
  open,
  seed,
  onClose,
}: {
  open: boolean
  seed: ContactSeed
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [step, setStep] = useState(0)
  const [brief, setBrief] = useState<Brief>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  // A hidden field people never see. Anything that fills it in is a bot.
  const [trap, setTrap] = useState('')

  const done = status === 'sent' || status === 'mail'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.classList.add('kora-modal-open')
    } else if (!open && dialog.open) {
      dialog.close()
    }
    if (!open) document.documentElement.classList.remove('kora-modal-open')
  }, [open])

  // Each time it opens: take what the opener passed in, and start a fresh
  // brief if the last one was already sent.
  useEffect(() => {
    if (!open) return
    setBrief((current) => ({
      ...(done ? EMPTY : current),
      prefer: seed.prefer ?? (done ? 'Email' : current.prefer),
      note: seed.note ?? '',
    }))
    if (done) {
      setStep(0)
      setStatus('idle')
    }
    // `done` is read as it was when the modal opened, on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed])

  // Moving between steps puts focus on the new question, so a keyboard or
  // screen reader user lands where the content changed.
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open, step, done])

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const toggleService = (service: string) =>
    set(
      'services',
      brief.services.includes(service)
        ? brief.services.filter((s) => s !== service)
        : [...brief.services, service],
    )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const found = check(step, brief)
    setErrors(found)
    const firstBad = Object.keys(found)[0]
    if (firstBad) {
      dialogRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstBad}"] input, [data-field="${firstBad}"] textarea`)
        ?.focus()
      return
    }

    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }

    if (trap) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      setStatus(await sendBrief(brief))
    } catch {
      setStatus('error')
    }
  }

  const firstName = brief.name.trim().split(/\s+/)[0]

  return (
    <dialog
      ref={dialogRef}
      className="kora-dialog"
      aria-labelledby="kora-dialog-title"
      onClose={onClose}
      onMouseDown={(event) => {
        // The dialog element itself is only reachable as the backdrop.
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="kora-dialog-panel">
        <header className="kora-dialog-head">
          {done ? (
            <span className="kora-dialog-count">{status === 'sent' ? 'Sent' : 'Almost there'}</span>
          ) : (
            <>
              <span className="kora-dialog-count">
                Step {step + 1} of {STEPS.length}
              </span>
              <ol className="kora-dialog-steps" aria-hidden="true">
                {STEPS.map((label, index) => (
                  <li key={label} className={index <= step ? 'is-on' : undefined} />
                ))}
              </ol>
            </>
          )}
          <button type="button" className="kora-pill is-outline kora-dialog-close" onClick={onClose}>
            Close
          </button>
        </header>

        {done ? (
          <>
          <div className="kora-dialog-body kora-dialog-done" key="done">
            <KoraStar className="kora-dialog-star" />
            <h2 id="kora-dialog-title" ref={headingRef} tabIndex={-1}>
              {status === 'sent'
                ? `Got it${firstName ? `, ${firstName}` : ''}.`
                : 'One last step.'}
            </h2>
            {status === 'sent' ? (
              <p className="kora-dialog-lede">
                Your brief is with our team. Here is what happens next.
              </p>
            ) : (
              <p className="kora-dialog-lede">
                Your email app has opened with your brief written out. Press send and it
                is with our team.{' '}
                <a href={briefMailto(brief)}>Open the email again</a>
              </p>
            )}
            <ol className="kora-dialog-next">
              <li>
                <span>1</span>We read your brief, properly.
              </li>
              <li>
                <span>2</span>
                {brief.prefer === 'Email'
                  ? `We reply to ${brief.email.trim() || 'you'} within one working day.`
                  : `We reach you by ${brief.prefer === 'A call' ? 'phone' : 'WhatsApp'} within one working day.`}
              </li>
              <li>
                <span>3</span>We set up a short call to talk it through.
              </li>
            </ol>
          </div>
          <div className="kora-dialog-foot">
            <Link to="/brand-test" className="kora-pill is-outline is-large" onClick={onClose}>
              Take the brand test
            </Link>
            <button type="button" className="kora-pill is-solid is-large" onClick={onClose}>
              Done
            </button>
          </div>
          </>
        ) : (
          <form className="kora-dialog-form" onSubmit={onSubmit} noValidate>
            <div className="kora-dialog-body" key={step}>
              <h2 id="kora-dialog-title" ref={headingRef} tabIndex={-1}>
                {step === 0 && 'What can we help you with?'}
                {step === 1 && 'Tell us about the project.'}
                {step === 2 && 'Where should we reply?'}
              </h2>

              {step === 0 && (
                <>
                  <p className="kora-dialog-lede">Pick everything that applies.</p>
                  <Field name="services" error={errors.services}>
                    <div className="kora-chips" role="group" aria-label="What you need">
                      {SERVICES.map((service) => (
                        <label key={service} className="kora-chip">
                          <input
                            type="checkbox"
                            checked={brief.services.includes(service)}
                            onChange={() => toggleService(service)}
                          />
                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                  {brief.note && <p className="kora-dialog-note">Your brand test result will be sent with this.</p>}
                </>
              )}

              {step === 1 && (
                <>
                  <Field name="company" label="Brand or company name" error={errors.company}>
                    <input
                      value={brief.company}
                      onChange={(e) => set('company', e.target.value)}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.company)}
                    />
                  </Field>
                  <Field name="goal" label="What are you trying to achieve?" hint="Optional. A few lines is plenty.">
                    <textarea
                      rows={3}
                      value={brief.goal}
                      onChange={(e) => set('goal', e.target.value)}
                    />
                  </Field>
                  <Field name="timeline" label="When do you want to start?" plain>
                    <div className="kora-chips" role="radiogroup" aria-label="When do you want to start?">
                      {TIMELINES.map((timeline) => (
                        <label key={timeline} className="kora-chip">
                          <input
                            type="radio"
                            name="timeline"
                            checked={brief.timeline === timeline}
                            onChange={() => set('timeline', timeline)}
                          />
                          <span>{timeline}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field name="name" label="Your name" error={errors.name}>
                    <input
                      value={brief.name}
                      onChange={(e) => set('name', e.target.value)}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field name="email" label="Email" error={errors.email}>
                    <input
                      type="email"
                      inputMode="email"
                      value={brief.email}
                      onChange={(e) => set('email', e.target.value)}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                  <Field
                    name="phone"
                    label={brief.prefer === 'Email' ? 'Phone or WhatsApp (optional)' : 'Phone or WhatsApp'}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      inputMode="tel"
                      value={brief.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </Field>
                  <Field name="prefer" label="How should we reply?" plain>
                    <div className="kora-chips" role="radiogroup" aria-label="How should we reply?">
                      {REPLY_BY.map((way) => (
                        <label key={way} className="kora-chip">
                          <input
                            type="radio"
                            name="prefer"
                            checked={brief.prefer === way}
                            onChange={() => set('prefer', way)}
                          />
                          <span>{way}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                  <input
                    className="kora-dialog-trap"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    name="website"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                  />
                </>
              )}

              {status === 'error' && (
                <p className="kora-dialog-error" role="alert">
                  That did not send. Try again, or email us at{' '}
                  <a href={briefMailto(brief)}>{NEW_BUSINESS_EMAIL}</a>. Your answers are
                  still here.
                </p>
              )}
            </div>

            <div className="kora-dialog-foot">
              {step > 0 ? (
                <button
                  type="button"
                  className="kora-pill is-outline is-large"
                  onClick={() => {
                    setStatus('idle')
                    setStep(step - 1)
                  }}
                >
                  Back
                </button>
              ) : (
                <span className="kora-dialog-time">Takes about a minute</span>
              )}
              <button
                type="submit"
                className="kora-pill is-solid is-large"
                aria-disabled={status === 'sending'}
              >
                {step < STEPS.length - 1
                  ? 'Continue'
                  : status === 'sending'
                    ? 'Sending…'
                    : status === 'error'
                      ? 'Try again'
                      : 'Send brief'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}

function Field({
  name,
  label,
  hint,
  error,
  plain,
  children,
}: {
  name: string
  label?: string
  hint?: string
  error?: string
  /** A group of chips rather than one input: no wrapping <label>. */
  plain?: boolean
  children: ReactNode
}) {
  const body = (
    <>
      {label && <span className="kora-field-label">{label}</span>}
      {children}
      {error ? (
        <span className="kora-field-error" role="alert">
          {error}
        </span>
      ) : (
        hint && <span className="kora-field-hint">{hint}</span>
      )}
    </>
  )
  return plain || !label ? (
    <div className="kora-field" data-field={name}>
      {body}
    </div>
  ) : (
    <label className="kora-field" data-field={name}>
      {body}
    </label>
  )
}
