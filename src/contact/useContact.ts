import { createContext, useContext } from 'react'

export interface ContactSeed {
  /** Pre-selects how the visitor wants to be answered. */
  prefer?: 'Email' | 'A call' | 'WhatsApp'
  /** Context to send along with the brief, such as a brand test result. */
  note?: string
}

export const ContactContext = createContext<(seed?: ContactSeed) => void>(() => {})

/** Opens the project brief from anywhere on the site. */
export const useContact = () => useContext(ContactContext)
