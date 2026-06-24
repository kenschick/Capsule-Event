import ScrollReveal from './ScrollReveal.jsx'

/**
 * Premium gallery grid on a consistent gutter. Items draw from the manifest.
 * `item.wide` spans full width; `item.contain` fits the whole render (for
 * transparent product cut-outs) instead of cropping.
 */
export default function Gallery({ items = [], columns = 3, gap = 'gap-3 sm:gap-4', className = '' }) {
  const colClass =
    { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns] ||
    'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-1 ${colClass} ${gap} ${className}`}>
      {items.map((it, i) => (
        <ScrollReveal
          key={it.src}
          index={i}
          className={it.wide ? 'sm:col-span-2 lg:col-span-3' : ''}
        >
          <figure
            className="group relative overflow-hidden rounded-lg border border-hairline/60 bg-ink2"
            style={{ aspectRatio: it.contain ? '16 / 10' : it.aspect || '4 / 3' }}
          >
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className={`h-full w-full transition-transform duration-[600ms] ease-cinematic
                ${it.contain ? 'object-contain p-6' : 'object-cover group-hover:scale-[1.03]'}`}
            />
          </figure>
          {it.caption && (
            <figcaption className="mt-2 font-body text-sm text-bone-faint">{it.caption}</figcaption>
          )}
        </ScrollReveal>
      ))}
    </div>
  )
}
