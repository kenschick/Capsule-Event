import PageHeader from '../components/PageHeader.jsx'
import Carousel from '../components/Carousel.jsx'
import LaptopScroll from '../components/LaptopScroll.jsx'
import { PAGES } from '../lib/manifest.js'

/**
 * Part 5 — Updated Amazon Page. The new listing carousel auto-rotates (left);
 * the TuxMat Capsule Amazon product page scrolls inside the laptop (right).
 * Swap assets in PAGES.amazon.
 */
export default function Amazon() {
  const page = PAGES.amazon

  return (
    <main className="flex h-[100svh] flex-col overflow-hidden">
      <PageHeader title={page.title} compact />

      <div className="flex min-h-0 flex-1 items-center justify-end gap-14 pb-10 pl-10 pr-20">
        {/* Left: auto-rotating square carousel (bigger) */}
        <div className="w-[28%] min-w-0 shrink-0 self-center">
          <Carousel
            items={page.carousel}
            className="w-full"
            autoPlay
            interval={3500}
            slideAspect="1 / 1"
          />
        </div>

        {/* Right: laptop scrolling the Amazon page (bigger); group shifted right */}
        <LaptopScroll page={page.page.src} alt={page.page.alt} duration={62} className="w-[52%] max-h-full" />
      </div>
    </main>
  )
}
