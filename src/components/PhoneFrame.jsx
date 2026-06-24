/**
 * Front-on phone frame with content (a social post / video) shown inside the
 * screen, clipped to the exact screen shape via an alpha mask generated from
 * the frame — so nothing peeks past the rounded screen.
 */
const FRAME = '/assets/common/phone-frame.png'
const MASK = '/assets/common/phone-mask.png'
const FRAME_W = 900
const FRAME_H = 1736
const SCREEN = { left: 6.33, top: 1.67, width: 87.11, height: 95.39 }

export default function PhoneFrame({ src, video, poster, alt = '', fit = 'contain', bg = '#0b0b0c', className = '' }) {
  const maskStyle = {
    WebkitMaskImage: `url(${MASK})`,
    maskImage: `url(${MASK})`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}>
      <div className="absolute inset-0" style={maskStyle}>
        <div
          className="absolute"
          style={{
            left: `${SCREEN.left}%`,
            top: `${SCREEN.top}%`,
            width: `${SCREEN.width}%`,
            height: `${SCREEN.height}%`,
            background: bg,
          }}
        >
          {video ? (
            <video src={video} poster={poster} muted loop playsInline autoPlay aria-label={alt}
                   className={`h-full w-full ${fitClass}`} />
          ) : (
            <img src={src} alt={alt} className={`h-full w-full ${fitClass}`} />
          )}
        </div>
      </div>
      <img src={FRAME} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  )
}
