import { useEffect, useRef, type VideoHTMLAttributes } from 'react'

type LazyVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  'src' | 'poster' | 'preload' | 'autoPlay' | 'controls' | 'muted' | 'loop' | 'playsInline'
> & {
  src: string
  poster: string
}

function LazyVideo({ src, poster, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Keep both URLs off the element until it is actually visible. preload alone
    // cannot prevent an autoplay video from downloading outside the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio === 0) {
        video.pause()
        return
      }

      if (!video.hasAttribute('src')) {
        video.poster = poster
        video.src = src
        video.load()
      }

      // Autoplay restrictions can still block playback; the poster stays visible.
      void video.play().catch(() => {})
    }, { rootMargin: '0px', threshold: 0 })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
      video.removeAttribute('src')
      video.removeAttribute('poster')
      video.load()
    }
  }, [src, poster])

  return (
    <video
      {...props}
      ref={videoRef}
      preload="none"
      muted
      loop
      playsInline
      controls={false}
    />
  )
}

export default LazyVideo
