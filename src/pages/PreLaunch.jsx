import MediaCell from '../components/MediaCell.jsx'
import MarqueeBanner from '../components/MarqueeBanner.jsx'
import LaptopScroll from '../components/LaptopScroll.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import { PAGES } from '../lib/manifest.js'

/**
 * Part 3 — Pre-Launch. Title integrated as a left column (per the PDF), phone +
 * front-facing laptop (waitlist landing page scrolling) to its right, and a
 * continuously moving, edge-faded banner of teaser photos + a looping teaser
 * film across the bottom. Swap assets in PAGES.prelaunch.
 */
export default function PreLaunch() {
  const page = PAGES.prelaunch

  return (
    <main className="flex h-[100svh] flex-col overflow-hidden px-8 pb-8 pt-[4.5rem] sm:px-12">
      {/* Top: integrated title (left) + devices (right) */}
      <div className="flex min-h-0 flex-[1.55] gap-6">
        <div className="flex w-[26%] shrink-0 items-center pl-4">
          <ScrollReveal>
            <h1
              className="whitespace-nowrap font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-tight tracking-tight2"
              style={{ color: 'var(--pfg)' }}
            >
              {page.title}
            </h1>
            <div className="mt-4 h-[2px] w-16 rounded-full bg-gold" />
          </ScrollReveal>
        </div>

        <div className="flex min-h-0 flex-1 gap-10">
          {/* Phone — smaller so the whole mockup is visible */}
          <div className="flex min-h-0 min-w-0 flex-[0.7] items-center justify-center">
            <MediaCell src={page.phone.src} alt={page.phone.alt} className="h-[94%]" />
          </div>
          {/* Front-facing laptop scrolling the waitlist landing page */}
          <div className="flex min-h-0 min-w-0 flex-[1.9] items-center justify-center">
            <LaptopScroll page={page.landingPage.src} alt={page.landingPage.alt} duration={32} className="w-full max-h-full" />
          </div>
        </div>
      </div>

      {/* Bottom: continuously moving, edge-faded banner (photos + looping film) */}
      <div className="min-h-0 flex-[0.85] pt-3">
        <MarqueeBanner items={page.banner} speed={38} className="h-full w-full" />
      </div>
    </main>
  )
}
