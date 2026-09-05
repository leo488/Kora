import { useEffect, useState } from 'react'

interface HeroCarouselProps {
  images: string[]
  /** Alt text base — the slide number is appended for screen readers. */
  label: string
  intervalMs?: number
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function HeroCarousel({ images, label, intervalMs = 3500 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)

  // Switching projects swaps the whole image set — start that set from its first
  // frame rather than wherever the previous project happened to be paused.
  useEffect(() => {
    setIndex(0)
  }, [images])

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion()) return

    const id = setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      intervalMs,
    )
    return () => clearInterval(id)
  }, [images, intervalMs])

  return (
    <div className="kora-carousel">
      {images.map((src, i) => (
        <img
          key={src}
          className={`kora-carousel-slide${i === index ? ' is-active' : ''}`}
          src={src}
          alt={i === index ? `${label} — slide ${i + 1} of ${images.length}` : ''}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? 'eager' : 'lazy'}
          draggable={false}
        />
      ))}

      {images.length > 1 && (
        <div className="kora-carousel-dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`kora-carousel-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${label} slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
