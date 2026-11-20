import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/** A slim purple bar that slides down from the top once the visitor starts
    scrolling, to say the site is still being finished. */
export function Announcement() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`kora-wip-bar${shown ? ' is-shown' : ''}`}
      role="status"
      aria-hidden={!shown}
    >
      We&rsquo;re still working on our website. Thanks for stopping by.{' '}
      <Link to="/work/ipaybtc" className="kora-wip-link" tabIndex={shown ? 0 : -1}>
        See the iPayBTC case study
      </Link>
    </div>
  )
}
