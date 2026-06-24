import ScrollReveal from './ScrollReveal.jsx'

/**
 * Clean, on-brand empty state for content not yet supplied. No invented copy —
 * just a quiet note so the slot reads as intentional during the presentation.
 */
export default function Placeholder({ note }) {
  return (
    <ScrollReveal>
      <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-lg
                      border border-dashed border-hairline bg-ink2/40 px-6 py-12 text-center">
        <span className="h-px w-8 bg-hairline" />
        <p className="font-body text-sm text-bone-faint">{note}</p>
      </div>
    </ScrollReveal>
  )
}
