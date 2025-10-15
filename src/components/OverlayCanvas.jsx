export default function OverlayCanvas({ overlays }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {overlays.filter(o => o.visible).map((o) => {
        const style = {
          left: `${o.x}%`,
          top: `${o.y}%`,
          width: `${o.w}%`,
          height: `${o.h}%`,
          opacity: o.opacity,
          color: o.type === 'text' ? o.color : undefined,
          borderColor: o.type === 'box' ? o.color : undefined,
          backgroundColor: o.type === 'box' ? `${o.color}22` : undefined, // subtle fill
        }
        return (
          <div
            key={o.id}
            className="absolute"
            style={style}
          >
            {o.type === 'text' && (
              <div className="pointer-events-none w-full h-full flex items-center justify-center text-white font-semibold drop-shadow">
                {o.content}
              </div>
            )}
            {o.type === 'box' && (
              <div className="pointer-events-none w-full h-full border-2 rounded" />
            )}
            {o.type === 'image' && o.content && (
              <img
                src={o.content}
                alt={o.name}
                className="pointer-events-none w-full h-full object-contain"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
