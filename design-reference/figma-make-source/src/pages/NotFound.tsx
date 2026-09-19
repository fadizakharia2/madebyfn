import { NavFn } from '../types'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

export default function NotFound({ navigate }: { navigate: NavFn }) {
  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
      {/* Background number */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...S.serif, fontSize: 'clamp(200px, 35vw, 480px)',
        color: 'rgba(240,237,232,0.02)', letterSpacing: '-0.06em',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>
        404
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(240,237,232,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(240,237,232,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 480 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 24 }}>
          Error 404
        </div>
        <h1 style={{ ...S.serif, fontSize: 'clamp(36px, 5vw, 60px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
          This page doesn't exist.
        </h1>
        <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 48 }}>
          It may have moved, or you may have followed an outdated link. Either way, we can get you somewhere useful.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('home')}
            style={{
              ...S.sans, fontSize: 13, fontWeight: 500,
              color: '#0A0A0B', background: '#F0EDE8',
              padding: '12px 24px', borderRadius: 2,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}>
            Home
          </button>
          <button onClick={() => navigate('work')}
            style={{
              ...S.sans, fontSize: 13, color: '#B8B4AC',
              padding: '12px 24px', borderRadius: 2,
              border: '1px solid rgba(240,237,232,0.12)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.3)'; el.style.color = '#F0EDE8' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.12)'; el.style.color = '#B8B4AC' }}>
            View Work
          </button>
          <button onClick={() => navigate('start')}
            style={{
              ...S.sans, fontSize: 13, color: '#B8B4AC',
              padding: '12px 24px', borderRadius: 2,
              border: '1px solid rgba(240,237,232,0.12)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.3)'; el.style.color = '#F0EDE8' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.12)'; el.style.color = '#B8B4AC' }}>
            Start a Project
          </button>
        </div>
      </div>
    </div>
  )
}
