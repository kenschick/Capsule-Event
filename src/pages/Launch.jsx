import PageHeader from '../components/PageHeader.jsx'
import VideoPlayer from '../components/VideoPlayer.jsx'
import LaptopScroll from '../components/LaptopScroll.jsx'
import PhoneFrame from '../components/PhoneFrame.jsx'
import { PAGES } from '../lib/manifest.js'

/**
 * Part 4 — Launch Assets. Laptop scrolling the product page (left), the social
 * video playing in the phone (centre), and a launch gallery on the right:
 * two tiles (ad + exploded) over the launch film over two more tiles.
 * Swap assets in PAGES.launch.
 */
export default function Launch() {
  const page = PAGES.launch

  const Tile = ({ src, alt }) => (
    <div className="aspect-square overflow-hidden rounded-lg">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  )

  return (
    <main className="flex h-[100svh] flex-col overflow-hidden pt-3">
      <PageHeader title={page.title} compact />

      <div className="flex min-h-0 flex-1 items-center justify-between pb-8 pl-10 pr-[60px]">
        {/* Left: laptop scrolling the product page (scaled up; left spacing kept) */}
        <LaptopScroll page={page.productPage.src} alt={page.productPage.alt} duration={42} className="w-[46%] max-h-full" />

        {/* Centre: social video in the phone (kept the same size; contain so no sides cropped) */}
        <PhoneFrame video={page.phoneVideo.src} poster={page.phoneVideo.poster} alt={page.phoneVideo.alt} fit="contain" className="h-[82%]" />

        {/* Right: gallery — two tiles, film, two tiles. A fixed 12px gap (same
            as the horizontal gap between the tiles) keeps every gap identical
            at any viewport scale — no justify-between, which would grow the
            gaps on larger/fullscreen layouts. The group is centred on the film,
            so the top tiles sit just above it and the bottom tiles just below. */}
        <div className="flex min-h-0 w-[27%] flex-col justify-center gap-3 self-stretch">
          <div className="grid grid-cols-2 gap-3">
            {page.topTiles.map((t) => <Tile key={t.src} src={t.src} alt={t.alt} />)}
          </div>
          {/* The launch film is a 16:9 clip — full column width at its original
              ratio with `contain` so it is never cropped; rounded corners. */}
          <VideoPlayer
            src={page.film.src}
            poster={page.film.poster}
            alt={page.film.alt}
            label={page.film.label}
            aspect="16 / 9"
            objectFit="contain"
            rounded
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-3">
            {page.bottomTiles.map((t) => <Tile key={t.src} src={t.src} alt={t.alt} />)}
          </div>
        </div>
      </div>
    </main>
  )
}
