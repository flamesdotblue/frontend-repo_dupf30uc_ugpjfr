import { useRef, useEffect } from 'react'

export default function StreamPlayer({ url }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Reset source when URL changes
    if (!url) {
      video.removeAttribute('src')
      video.load()
      return
    }

    // For simplicity, rely on native playback (HLS works natively on Safari; MP4/WebM everywhere)
    // RTSP is not supported natively in browsers — use a gateway that outputs HLS/DASH/WebRTC.
    video.src = url
    // Attempt autoplay (may be blocked depending on browser policies)
    const play = async () => {
      try {
        await video.play()
      } catch (_) {
        // Autoplay might be blocked; user can click to play
      }
    }
    play()
  }, [url])

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow relative">
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        controls
        playsInline
        muted
      />
      {!url && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
          Enter a stream URL to start playing (HLS/MP4/WebM). For RTSP, use a gateway.
        </div>
      )}
    </div>
  )
}
