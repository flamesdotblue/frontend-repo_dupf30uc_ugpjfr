import { useEffect, useMemo, useState } from 'react'
import StreamPlayer from './components/StreamPlayer'
import OverlayCanvas from './components/OverlayCanvas'
import OverlayForm from './components/OverlayForm'
import OverlayList from './components/OverlayList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  if (res.status === 204) return null
  return res.json()
}

export default function App() {
  const [streamUrl, setStreamUrl] = useState('')
  const [overlays, setOverlays] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load overlays
  useEffect(() => {
    let mounted = true
    setLoading(true)
    api('/api/overlays')
      .then((data) => mounted && setOverlays(data))
      .catch((e) => mounted && setError(String(e)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const saveOverlay = async (data) => {
    try {
      setError('')
      if (selected) {
        const updated = await api(`/api/overlays/${selected.id}`, { method: 'PUT', body: JSON.stringify(data) })
        setOverlays((list) => list.map((o) => (o.id === updated.id ? updated : o)))
        setSelected(null)
      } else {
        const created = await api('/api/overlays', { method: 'POST', body: JSON.stringify(data) })
        setOverlays((list) => [...list, created])
      }
    } catch (e) {
      setError(String(e))
    }
  }

  const toggleOverlay = async (o) => {
    try {
      const updated = await api(`/api/overlays/${o.id}`, { method: 'PUT', body: JSON.stringify({ visible: !o.visible }) })
      setOverlays((list) => list.map((x) => (x.id === updated.id ? updated : x)))
    } catch (e) {
      setError(String(e))
    }
  }

  const deleteOverlay = async (o) => {
    try {
      await api(`/api/overlays/${o.id}`, { method: 'DELETE' })
      setOverlays((list) => list.filter((x) => x.id !== o.id))
      if (selected?.id === o.id) setSelected(null)
    } catch (e) {
      setError(String(e))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">RTSP Livestream with Overlays</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Backend:</span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 border">{API_BASE}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <input
              placeholder="Enter stream URL (HLS .m3u8, MP4, WebM). For RTSP, use a gateway to HLS/WebRTC."
              className="flex-1 rounded border px-3 py-2"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
            />
            <button
              onClick={() => setStreamUrl(streamUrl)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Load
            </button>
          </div>

          <div className="relative">
            <StreamPlayer url={streamUrl} />
            <OverlayCanvas overlays={overlays} />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h2 className="font-medium mb-3">Overlays</h2>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : (
              <OverlayList
                overlays={overlays}
                onToggle={toggleOverlay}
                onEdit={(o) => setSelected(o)}
                onDelete={deleteOverlay}
              />
            )}
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h2 className="font-medium mb-3">{selected ? 'Edit Overlay' : 'Add Overlay'}</h2>
            <OverlayForm
              selected={selected}
              onSave={saveOverlay}
              onCancel={() => setSelected(null)}
            />
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-xs text-gray-500">
        Note: Browsers cannot play RTSP directly. Use a media server to convert RTSP to HLS/DASH/WebRTC and paste the resulting URL above.
      </footer>
    </div>
  )
}
