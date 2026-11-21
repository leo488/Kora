import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContactContext } from './useContact'
import type { ContactSeed } from './useContact'

/* Every "contact" button on the site goes to the contact page, carrying any
   context (how to reply, a brand test result) along with it. */
export function ContactProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const openContact = useCallback((next?: ContactSeed) => navigate('/contact', { state: next ?? {} }), [navigate])
  return <ContactContext.Provider value={openContact}>{children}</ContactContext.Provider>
}
