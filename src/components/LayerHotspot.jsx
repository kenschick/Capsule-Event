import { useNavigate } from 'react-router-dom'

/**
 * Clickable hit-area + refined label for one exploded-hero layer.
 * Sits above the (pointer-inert) layer image. Hover/focus lifts the mapped
 * layer and golds its label; click/Enter routes to the mapped page.
 */
export default function LayerHotspot({ layer, band, center, active, onHover, onLeave }) {
  const navigate = useNavigate()
  const go = () => navigate(layer.route)

  // Position the label at the layer's true visual centre, expressed as a
  // percentage within this band, so it sits directly under its art.
  const labelLeft = ((center - band[0]) / (band[1] - band[0])) * 100

  return (
    <button
      type="button"
      onClick={go}
      onMouseEnter={() => onHover(layer.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(layer.id)}
      onBlur={onLeave}
      aria-label={`${layer.label} — ${layer.sublabel}. ${layer.alt}`}
      className="focusable group absolute bottom-0 top-0 z-30"
      style={{ left: `${band[0]}%`, width: `${band[1] - band[0]}%` }}
    >
      <span
        className={`pointer-events-none absolute bottom-[8%] flex -translate-x-1/2 flex-col items-center gap-1
          transition-all duration-300 ease-cinematic
          ${active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-70'}`}
        style={{ left: `${labelLeft}%` }}
      >
        <span
          className={`whitespace-nowrap font-display text-[0.7rem] uppercase tracking-label transition-colors duration-300
            ${active ? 'text-gold' : 'text-bone-dim'}`}
        >
          {layer.label}
        </span>
        <span className="font-body text-[0.66rem] text-bone-faint">{layer.sublabel}</span>
      </span>
    </button>
  )
}
