import { useEffect, useState } from 'react'

const empty = {
  name: '',
  type: 'text',
  x: 10,
  y: 10,
  w: 20,
  h: 10,
  opacity: 1,
  color: '#ff0000',
  content: '',
  visible: true,
}

export default function OverlayForm({ selected, onSave, onCancel }) {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (selected) setForm({ ...selected })
    else setForm(empty)
  }, [selected])

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Type</label>
          <select
            className="w-full rounded border px-3 py-2"
            value={form.type}
            onChange={(e) => update('type', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="box">Box</option>
          </select>
        </div>
      </div>

      {form.type !== 'box' && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Content {form.type === 'text' ? '(Text)' : '(Image URL)'} </label>
          <input
            className="w-full rounded border px-3 py-2"
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
          />
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {['x','y','w','h'].map((k) => (
          <div key={k}>
            <label className="block text-xs text-gray-500 mb-1">{k.toUpperCase()} (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              className="w-full rounded border px-3 py-2"
              value={form[k]}
              onChange={(e) => update(k, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Opacity</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            className="w-full"
            value={form.opacity}
            onChange={(e) => update('opacity', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Color</label>
          <input
            type="color"
            className="w-full h-10 rounded border"
            value={form.color}
            onChange={(e) => update('color', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="visible"
          type="checkbox"
          checked={form.visible}
          onChange={(e) => update('visible', e.target.checked)}
        />
        <label htmlFor="visible" className="text-sm text-gray-700">Visible</label>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          {selected ? 'Update' : 'Add'} Overlay
        </button>
        {selected && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
