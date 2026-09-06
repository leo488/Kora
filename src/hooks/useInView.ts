import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85) {
      setInView(true)
      return
    }

    // threshold 0 rather than a fraction of the element: a section taller than
    // about six screens can never show 15% of itself at once, so a percentage
    // threshold silently leaves it hidden forever as a section grows. The
    // bottom rootMargin is what holds the reveal back until the section is
    // properly on screen, and it does that independently of the height.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView] as const
}
