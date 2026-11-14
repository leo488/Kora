import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { ContactDialog } from './ContactDialog'
import { ContactContext } from './useContact'
import type { ContactSeed } from './useContact'

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [seed, setSeed] = useState<ContactSeed>({})

  const openContact = useCallback((next?: ContactSeed) => {
    setSeed(next ?? {})
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <ContactContext.Provider value={openContact}>
      {children}
      <ContactDialog open={open} seed={seed} onClose={close} />
    </ContactContext.Provider>
  )
}
