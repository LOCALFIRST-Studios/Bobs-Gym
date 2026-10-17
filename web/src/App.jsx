import { lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { legacyRedirects, pages } from './data/routes'

// Inner pages are code-split so the home page loads only what it needs.
const routeComponents = [
  [pages.about, lazy(() => import('./pages/about/About'))],
  [pages.history, lazy(() => import('./pages/about/History'))],
  [pages.founder, lazy(() => import('./pages/about/FoundersMessage'))],
  [pages.mantra, lazy(() => import('./pages/about/BobsMantra'))],
  [pages.equipment, lazy(() => import('./pages/facilities/Equipment'))],
  [pages.aerobics, lazy(() => import('./pages/facilities/Aerobics'))],
  [pages.yoga, lazy(() => import('./pages/facilities/Yoga'))],
  [pages.healthBar, lazy(() => import('./pages/facilities/HealthBar'))],
  [pages.spa, lazy(() => import('./pages/facilities/MassageSpa'))],
  [pages.bmi, lazy(() => import('./pages/facilities/BmiCalculatorPage'))],
  [pages.membership, lazy(() => import('./pages/join/Membership'))],
  [pages.careers, lazy(() => import('./pages/join/Careers'))],
  [pages.gallery, lazy(() => import('./pages/photos/Gallery'))],
  [pages.moments, lazy(() => import('./pages/photos/MomentsOfGlory'))],
  [pages.packages, lazy(() => import('./pages/Packages'))],
  [pages.contact, lazy(() => import('./pages/Contact'))],
]
const NotFound = lazy(() => import('./pages/NotFound'))

/** Sends old ASP.NET URLs (e.g. /About.aspx) to their new route; otherwise 404. */
function LegacyOrNotFound() {
  const { pathname, hash } = useLocation()
  const target = legacyRedirects[pathname.toLowerCase()]
  if (target) return <Navigate to={target + hash} replace />
  return <NotFound />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {routeComponents.map(([page, Component]) => (
            <Route key={page.path} path={page.path} element={<Component />} />
          ))}
          <Route path="*" element={<LegacyOrNotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
