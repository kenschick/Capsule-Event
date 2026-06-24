import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ROUTES } from './lib/manifest.js'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import Creation from './pages/Creation.jsx'
import PreLaunch from './pages/PreLaunch.jsx'
import Launch from './pages/Launch.jsx'
import Amazon from './pages/Amazon.jsx'

export default function App() {
  const location = useLocation()

  // Always start a route at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.home} element={<SiteLayout><Home /></SiteLayout>} />
        <Route path={ROUTES.creation} element={<SiteLayout><Creation /></SiteLayout>} />
        <Route path={ROUTES.prelaunch} element={<SiteLayout><PreLaunch /></SiteLayout>} />
        <Route path={ROUTES.launch} element={<SiteLayout><Launch /></SiteLayout>} />
        <Route path={ROUTES.amazon} element={<SiteLayout><Amazon /></SiteLayout>} />
      </Routes>
    </AnimatePresence>
  )
}
