import { useEffect, useRef, useState } from 'react'

type CursorMode = {
  label: string
  expanded: boolean
  light: boolean
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<CursorMode>({ label: '', expanded: false, light: false })
  const pos = useRef({ x: -200, y: -200 })
  const raf = useRef(0)
  const sampleCtx = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    // Persistent 1×1 canvas — reused on every mousemove to avoid allocation
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    sampleCtx.current = canvas.getContext('2d', { willReadFrequently: true })

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!el) return

      const cursorEl = el.closest('[data-cursor]') as HTMLElement | null
      const label = cursorEl?.getAttribute('data-cursor') ?? ''
      let expanded = !!label
      let light = false

      // Explicit light signal — highest priority
      if (el.closest('[data-cursor-light]')) {
        light = true
        setMode({ label, expanded, light })
        return
      }

      // Image pixel sampling — expand cursor on images and sample actual pixel color
      const imgEl = (el.tagName === 'IMG' ? el : el.closest('img')) as HTMLImageElement | null
      if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
        expanded = true
        const ctx = sampleCtx.current
        if (ctx) {
          try {
            const rect = imgEl.getBoundingClientRect()
            const sx = Math.max(0, Math.min(imgEl.naturalWidth - 1,
              (e.clientX - rect.left) * (imgEl.naturalWidth / rect.width)
            ))
            const sy = Math.max(0, Math.min(imgEl.naturalHeight - 1,
              (e.clientY - rect.top) * (imgEl.naturalHeight / rect.height)
            ))
            ctx.clearRect(0, 0, 1, 1)
            ctx.drawImage(imgEl, sx, sy, 1, 1, 0, 0, 1, 1)
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
            light = isLightColor(r, g, b)
          } catch {
            // CORS or tainted canvas — default to dark mode
          }
        }
      } else if (expanded) {
        // Non-image: walk up the DOM for computed background color
        let node: HTMLElement | null = el
        while (node && node !== document.body) {
          const bg = getComputedStyle(node).backgroundColor
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
            if (m) light = isLightColor(+m[1], +m[2], +m[3])
            break
          }
          node = node.parentElement
        }
      }

      setMode({ label, expanded, light })
    }

    const loop = () => {
      const el = cursorRef.current
      if (el) {
        el.style.left = pos.current.x + 'px'
        el.style.top = pos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const { label, expanded, light } = mode

  const ringBg = expanded
    ? light
      ? 'rgba(240, 237, 232, 0.88)'
      : 'transparent'
    : 'transparent'

  const ringBorder = expanded
    ? light
      ? '1.5px solid rgba(10,10,11,0.2)'
      : '1px solid rgba(201,168,124,0.5)'
    : 'none'

  const dotColor = expanded
    ? 'transparent'
    : light
      ? '#0A0A0B'
      : '#C9A87C'

  const textColor = light ? '#0A0A0B' : '#C9A87C'

  return (
    <>
      {/* Expanding ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          width: expanded ? 76 : 0,
          height: expanded ? 76 : 0,
          borderRadius: '50%',
          background: ringBg,
          border: ringBorder,
          backdropFilter: expanded && light ? 'blur(10px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: expanded && light ? 'blur(10px) saturate(1.5)' : 'none',
          boxShadow: expanded && light ? '0 2px 24px rgba(0,0,0,0.15)' : 'none',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.18s ease, border 0.18s ease',
        }}
      >
        {expanded && label && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: textColor,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            transition: 'color 0.18s ease',
          }}>
            {label}
          </span>
        )}
      </div>

      {/* Small trailing dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: pos.current.x,
          top: pos.current.y,
          width: expanded ? 0 : 6,
          height: expanded ? 0 : 6,
          borderRadius: '50%',
          background: dotColor,
          transition: 'width 0.25s ease, height 0.25s ease, background 0.18s ease',
        }}
      />
    </>
  )
}

// sRGB luminance from raw 0–255 channel values
function isLightColor(r: number, g: number, b: number): boolean {
  const luminance =
    0.2126 * linearize(r / 255) +
    0.7152 * linearize(g / 255) +
    0.0722 * linearize(b / 255)
  return luminance > 0.35
}

function linearize(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
