import { Link } from 'react-router-dom'
import { ROUTES } from '../lib/manifest.js'

/**
 * Fixed top-left home control. Present on every page except the main page.
 * Adapts to the page theme via CSS variables (dark text on light pages, light
 * text on dark pages); clear gold hover + focus states.
 */
export default function HomeButton() {
  return (
    <Link
      to={ROUTES.home}
      aria-label="Return to the main page"
      className="focusable group fixed left-3 top-3 z-50 flex items-center gap-2 rounded-md
                 border px-3 py-2 backdrop-blur-md transition-colors duration-200 ease-cinematic
                 hover:border-gold/70 sm:left-5 sm:top-5"
      style={{ borderColor: 'var(--pline)', background: 'var(--pchip)' }}
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        className="transition-colors duration-200 group-hover:!text-gold"
        style={{ color: 'var(--pfg-dim)' }}
        aria-hidden="true"
      >
        <path d="M3 11.2 12 4l9 7.2" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 9.5V20h13V9.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className="font-display text-[0.64rem] font-medium uppercase tracking-label
                   transition-colors duration-200 group-hover:!text-gold"
        style={{ color: 'var(--pfg-dim)' }}
      >
        Home
      </span>
    </Link>
  )
}
