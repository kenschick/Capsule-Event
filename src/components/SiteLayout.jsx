import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../lib/manifest.js'
import { themeFor } from '../lib/themes.js'
import HomeButton from './HomeButton.jsx'
import PageTransition from './PageTransition.jsx'

/**
 * Wraps every page. Applies the route's background (black or a brand metallic
 * gradient) and exposes the matching foreground colours as CSS variables
 * (--pfg / --pfg-dim / --pfg-faint / --pline / --pchip) so themed components
 * adapt to light vs dark pages. Holds the persistent HomeButton + transition.
 */
export default function SiteLayout({ children }) {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home
  const theme = themeFor(pathname)

  // Paint the page background on <body> so it always covers the full canvas
  // (black, or a brand metallic gradient per route).
  useEffect(() => {
    const html = document.documentElement
    html.style.background = theme.bg
    html.style.backgroundAttachment = 'fixed'
    document.body.style.background = theme.bg
    document.body.style.backgroundAttachment = 'fixed'
    return () => {
      html.style.background = ''
      html.style.backgroundAttachment = ''
      document.body.style.background = ''
      document.body.style.backgroundAttachment = ''
    }
  }, [theme.bg])

  return (
    <div className="relative min-h-[100svh]" style={{ ...theme.vars }}>
      {!isHome && <HomeButton />}
      <PageTransition>{children}</PageTransition>
    </div>
  )
}
