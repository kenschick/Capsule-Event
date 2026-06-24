import ScrollReveal from './ScrollReveal.jsx'

/** Small composed display label that opens a section, on the baseline grid. */
export default function SectionLabel({ children, className = '' }) {
  return (
    <ScrollReveal>
      <div className={`flex items-center gap-4 ${className}`}>
        <span className="h-px w-8 bg-gold/70" />
        <h2 className="eyebrow text-bone-dim">{children}</h2>
      </div>
    </ScrollReveal>
  )
}
