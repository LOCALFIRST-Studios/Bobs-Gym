import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

/** Scrolls to the top on navigation, or to the #hash target when one is present. */
function useScrollManagement() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // The target may live in a lazily loaded page, so retry for ~1s until it renders.
    const id = decodeURIComponent(hash.slice(1))
    let frame
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (attempts++ < 60) frame = requestAnimationFrame(tryScroll)
    }
    tryScroll()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}

export default function Layout() {
  useScrollManagement()

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteHeader overlay />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" aria-label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
