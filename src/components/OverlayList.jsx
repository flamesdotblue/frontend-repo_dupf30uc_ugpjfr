import { Fragment } from 'react'

export default function OverlayList({ overlays, onToggle, onEdit, onDelete }) {
  if (!overlays.length) {
    return (
      <div className="text-sm text-gray-500">No overlays yet. Add one on the right.</div>
    )
  }

  return (
    <div className="space-y-2">
      {overlays.map((o) => (
        <div key={o.id} className="flex items-center justify-between gap-2 rounded border p-2">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => onToggle(o)}
              className={`h-5 w-5 rounded-full border flex items-center justify-center ${o.visible ? 'bg-green-500 border-green-600' : 'bg-gray-200'}`}
              title={o.visible ? 'Visible' : 'Hidden'}
            >
              <span className="sr-only">Toggle</span>
            </button>
            <div className="truncate">
              <div className="font-medium text-gray-800 truncate">{o.name}</div>
              <div className="text-xs text-gray-500 truncate">{o.type} • {Math.round(o.x)}%,{Math.round(o.y)}% • {Math.round(o.w)}x{Math.round(o.h)}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onEdit(o)} className="px-3 py-1.5 rounded border hover:bg-gray-50">Edit</button>
            <button onClick={() => onDelete(o)} className="px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
