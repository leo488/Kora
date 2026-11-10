import type { ReactNode } from 'react'

/* The image animation, after Ragged Edge.

   Where an image crosses the bottom of the screen, its two sides flare out:
   just above the screen's edge each side bends outward in a quarter curve, so
   the picture looks as if it is being drawn up and unfolded from under the
   bottom of the screen. The bend is tied to the screen, not to the image, so
   it travels up each image as the page scrolls and is gone once the image is
   fully in view.

   Each flaring image sits in a layer a little wider than its frame (by the
   flare's reach on either side). Normally that layer is clipped back to the
   frame; near the bottom of the screen the clip follows the curve instead. */

export function FlareMedia({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`kora-rx-media ${className}`}>
      <div className="kora-flare">{children}</div>
    </div>
  )
}
