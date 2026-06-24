import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { PAGES } from '../lib/manifest.js'

/**
 * Part 2 — Creation ("Journey"). The process images pop in one-by-one (~3.5s
 * apart), then the finished black Capsule case fades in over everything and
 * stays — the sequence runs once and ends there (no repeat). This timed reveal
 * is the intended presentation behaviour, so it runs regardless of the
 * reduced-motion setting (the only motion is a gentle fade).
 */
export default function Creation() {
  const page = PAGES.creation
  const reveals = page.sequence
  const total = reveals.length + 1 // + the finale
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= total) return
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 3500)
    return () => clearTimeout(t)
  }, [step, total])

  const finaleShown = step >= total

  const pop = (show) =>
    `transition-all duration-[800ms] ease-cinematic ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`

  return (
    <main className="relative flex h-[100svh] flex-col overflow-hidden">
      <PageHeader title={page.title} compact />

      {/* Staggered composition: hero render + two supporting shots */}
      <div className="flex min-h-0 flex-1 items-stretch justify-center gap-8 px-8 pb-8 sm:px-12">
        <figure className={`flex min-h-0 h-[70%] flex-[1.9] items-center justify-center self-center ${pop(step > 0)}`}>
          <img src={reveals[0].src} alt={reveals[0].alt} className="max-h-full max-w-full object-contain" />
        </figure>
        <div className="flex flex-[1] flex-col justify-between py-1">
          <figure className={`flex min-h-0 h-[48%] items-center justify-center self-start ${pop(step > 1)}`}>
            <img src={reveals[1].src} alt={reveals[1].alt} className="max-h-full max-w-full object-contain" />
          </figure>
          <figure className={`flex min-h-0 h-[48%] items-center justify-center self-end ${pop(step > 2)}`}>
            <img src={reveals[2].src} alt={reveals[2].alt} className="max-h-full max-w-full object-contain" />
          </figure>
        </div>
      </div>

      {/* Finale — the finished black Capsule case, covering the page */}
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-ink transition-opacity duration-[1100ms] ease-cinematic ${finaleShown ? 'opacity-100' : 'opacity-0'}`}
      >
        <img src={page.finale.src} alt={page.finale.alt} className="h-full w-full object-cover" />
      </div>
    </main>
  )
}
