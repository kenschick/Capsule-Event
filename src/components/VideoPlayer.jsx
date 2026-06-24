import { useEffect, useRef, useState } from 'react'

/**
 * Presentation video.
 *  - muted + loop + playsinline so it autoplays reliably, no sound.
 *  - Starts only when scrolled into view (IntersectionObserver); pauses when it
 *    leaves, so nothing plays off-screen (avoids multi-video stutter).
 *  - Poster shown before playback; preload="metadata".
 *  - Unobtrusive, brand-styled presenter toggle: play/pause + mute/unmute.
 */
export default function VideoPlayer({
  src,
  poster,
  alt = '',
  label,
  className = '',
  aspect = '16 / 9',
  rounded = true,
  objectFit = 'cover',
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Drive playback from in-view state (presenter can still override).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (inView) {
      el.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [inView])

  const togglePlay = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {})
    else {
      el.pause()
      setPlaying(false)
    }
  }
  const toggleMute = () => {
    const el = ref.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  return (
    <div
      className={`group relative overflow-hidden ${rounded ? 'rounded-lg' : ''} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <video
        ref={ref}
        className="h-full w-full"
        style={{ objectFit }}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />

      {/* Presenter controls — appear on hover/focus, stay reachable by keyboard */}
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-between gap-2 p-3
                   opacity-0 transition-opacity duration-200 group-hover:opacity-100
                   focus-within:opacity-100"
      >
        {label && (
          <span className="font-display text-[0.62rem] uppercase tracking-label text-bone
                           drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {label}
          </span>
        )}
        <div className="pointer-events-auto ml-auto flex items-center gap-2">
          <ControlButton onClick={togglePlay} label={playing ? 'Pause video' : 'Play video'}>
            {playing ? (
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" fill="currentColor" rx="1" />
                <rect x="14" y="5" width="4" height="14" fill="currentColor" rx="1" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 5l12 7-12 7V5z" fill="currentColor" />
              </svg>
            )}
          </ControlButton>
          <ControlButton onClick={toggleMute} label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </ControlButton>
        </div>
      </div>
    </div>
  )
}

function ControlButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focusable flex h-9 w-9 items-center justify-center rounded-md border
                 border-hairline/70 bg-ink/70 text-bone-dim backdrop-blur-md
                 transition-colors duration-200 ease-cinematic
                 hover:border-gold/70 hover:text-gold"
    >
      {children}
    </button>
  )
}
