import { ContactDialog } from '../contact/ContactDialog'
import type { ContactSeed } from '../contact/useContact'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'
import { PageStatement } from '../components/PageStatement'

/* Contact: the project brief laid out in the page, one question at a time,
   with the studio's inbox and address beside it. */

const SEED: ContactSeed = {}
const noop = () => {}

export function ContactPage() {
  return (
    <div className="kora-rx kora-rx-sub">
      <PageStatement title="Contact">
        Tell us what you’re building. A few quick questions, about a minute, and we
        reply within one working day.
      </PageStatement>

      <section className="kora-contact-page" aria-label="Start a project">
        <ContactDialog open seed={SEED} onClose={noop} inline />
        <aside className="kora-contact-side">
          <div>
            <span>Rather write?</span>
            <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
          </div>
          <div>
            <span>Studio</span>
            <address>
              10C Momoh Close, Freedom Avenue
              <br />
              Abuja, Nigeria
            </address>
          </div>
        </aside>
      </section>
    </div>
  )
}
