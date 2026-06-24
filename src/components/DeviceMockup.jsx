import VideoPlayer from './VideoPlayer.jsx'

/**
 * Shows media inside a device context.
 *
 *  - variant="asis": the provided media ALREADY contains the device (e.g. an
 *    email composited inside a phone, or a laptop render). Shown in a clean
 *    container with no extra frame.
 *  - variant="phone" / "laptop": a bare screen recording/image is placed inside
 *    a CSS device frame, masked to the screen's rounded-rect (object-fit: cover).
 *
 * `media` is either { image, alt } or { video, poster, alt }.
 */
export default function DeviceMockup({ variant = 'asis', media = {}, className = '' }) {
  const { image, video, poster, alt = '' } = media

  const Screen = ({ radius, fit = 'cover' }) =>
    video ? (
      <VideoPlayer
        src={video}
        poster={poster}
        alt={alt}
        rounded={false}
        objectFit={fit}
        aspect="auto"
        className="h-full w-full"
      />
    ) : (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-full w-full"
        style={{ objectFit: fit, borderRadius: radius }}
      />
    )

  // Provided media already includes the device — present it cleanly, no frame.
  if (variant === 'asis') {
    return (
      <figure className={`relative ${className}`}>
        {video ? (
          <VideoPlayer src={video} poster={poster} alt={alt} aspect="auto" />
        ) : (
          <img src={image} alt={alt} loading="lazy" className="h-auto w-full" />
        )}
      </figure>
    )
  }

  if (variant === 'phone') {
    return (
      <figure className={`relative mx-auto w-full max-w-[300px] ${className}`}>
        <div className="relative rounded-[2.4rem] border border-hairline bg-ink2 p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink3" />
          <div className="relative overflow-hidden rounded-[1.9rem]" style={{ aspectRatio: '9 / 19.5' }}>
            <Screen radius="0" />
          </div>
        </div>
      </figure>
    )
  }

  // laptop
  return (
    <figure className={`relative mx-auto w-full max-w-[920px] ${className}`}>
      <div className="rounded-t-xl border border-hairline bg-ink2 p-3">
        <div className="relative overflow-hidden rounded-md bg-ink" style={{ aspectRatio: '16 / 10' }}>
          <Screen radius="0" />
        </div>
      </div>
      <div className="mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl border border-t-0 border-hairline bg-ink3" />
    </figure>
  )
}
