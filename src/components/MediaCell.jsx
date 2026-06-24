/**
 * A single media asset for the one-screen layouts. No frame/box — the asset
 * floats on the dark background and is shown whole (object-contain), scaled to
 * fit its space at its native proportions so nothing is ever cropped.
 */
export default function MediaCell({ src, alt, className = '' }) {
  return (
    <figure className={`flex min-h-0 min-w-0 items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    </figure>
  )
}
