import ScrollReveal from './ScrollReveal.jsx'

/**
 * Consistent page header: eyebrow label + display title + hairline.
 * `compact` is used by the one-screen content pages — smaller title and tight
 * spacing (and top padding that clears the fixed HomeButton) so the assets
 * below fit in a single viewport without scrolling.
 */
export default function PageHeader({ eyebrow, title, compact = false }) {
  if (compact) {
    // Title integrated into the design: large display title + short gold rule
    // (matches the PDF layouts). No eyebrow.
    return (
      <header className="mx-auto w-full max-w-content shrink-0 px-6 pb-3 pt-[4.75rem] sm:px-10">
        <ScrollReveal index={0}>
          <h1
            className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-tight tracking-tight2"
            style={{ color: 'var(--pfg)' }}
          >
            {title}
          </h1>
        </ScrollReveal>
        <ScrollReveal index={1}>
          <div className="mt-3 h-[2px] w-16 rounded-full bg-gold" />
        </ScrollReveal>
      </header>
    )
  }

  return (
    <header className="mx-auto max-w-content px-6 pb-10 pt-24 sm:px-10 sm:pt-28 md:pt-32">
      {eyebrow && (
        <ScrollReveal index={0}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </ScrollReveal>
      )}
      <ScrollReveal index={1}>
        <h1 className="display-xl text-bone text-[clamp(2.4rem,6vw,5rem)]">{title}</h1>
      </ScrollReveal>
      <ScrollReveal index={2}>
        <div className="mt-8 h-px w-full bg-hairline" />
      </ScrollReveal>
    </header>
  )
}
