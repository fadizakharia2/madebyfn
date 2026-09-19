import { useState, useEffect } from 'react'
import { NavFn } from '../types'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

function useTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Footer({ navigate }: { navigate: NavFn }) {
  const time = useTime()

  const navLinks = [
    { label: 'Work', page: 'work' as const },
    { label: 'Services', page: 'services' as const },
    { label: 'Studio', page: 'studio' as const },
    { label: 'Insights', page: 'insights' as const },
    { label: 'Start a Project', page: 'start' as const },
  ]

  return (
    <footer style={{ background: '#0A0A0B', borderTop: '1px solid rgba(240,237,232,0.07)', position: 'relative', overflow: 'hidden' }}>

      {/* Giant wordmark */}
      <div style={{ padding: '80px 0 0', overflow: 'hidden', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{
          ...S.serif,
          fontSize: 'clamp(80px, 14vw, 200px)',
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(240,237,232,0.10)',
          lineHeight: 0.85,
          paddingLeft: '4vw',
          userSelect: 'none',
        }}>
          Axiom
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 48, padding: '60px 48px',
        borderBottom: '1px solid rgba(240,237,232,0.07)',
      }}>
        {/* Brand */}
        <div>
          <div style={{ ...S.serif, fontSize: 18, color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Axiom Studio
          </div>
          <p style={{ ...S.sans, fontSize: 13, color: '#5E5B56', lineHeight: 1.6, marginBottom: 24, maxWidth: 240 }}>
            Two senior engineers. One focused product team. Serious software, directly built.
          </p>
          <a href="mailto:hello@axiom.studio"
            style={{ ...S.mono, fontSize: 11, color: '#B8B4AC', letterSpacing: '0.02em', borderBottom: '1px solid rgba(240,237,232,0.15)', paddingBottom: 2 }}>
            hello@axiom.studio
          </a>
        </div>

        {/* Navigation */}
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.14em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
            Navigation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navLinks.map(l => (
              <button key={l.page} onClick={() => navigate(l.page)}
                style={{ ...S.sans, fontSize: 13, color: '#5E5B56', textAlign: 'left', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F0EDE8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Developers */}
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.14em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
            Developers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'Marcus Chen', role: 'Backend & Architecture', gh: 'mchen', li: 'marcus-chen-dev' },
              { name: 'Soren Larsen', role: 'Frontend & Product', gh: 'slarsen', li: 'soren-larsen-dev' },
            ].map(dev => (
              <div key={dev.name}>
                <div style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', marginBottom: 4 }}>{dev.name}</div>
                <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', marginBottom: 6 }}>{dev.role}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href={`https://github.com/${dev.gh}`} target="_blank" rel="noopener"
                    style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                    GitHub ↗
                  </a>
                  <a href={`https://linkedin.com/in/${dev.li}`} target="_blank" rel="noopener"
                    style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.14em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
            Status
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5CB85C', display: 'block' }} className="animate-pulse-dot" />
                <span style={{ ...S.mono, fontSize: 10, color: '#B8B4AC', letterSpacing: '0.06em' }}>Available</span>
              </div>
              <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                Taking on new projects<br />from Q1 2025
              </div>
            </div>
            <div>
              <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                London, UK
              </div>
              <div style={{ ...S.mono, fontSize: 10, color: '#B8B4AC' }}>{time} GMT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.06em' }}>
          © 2025 Axiom Studio Ltd. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms'].map(label => (
            <button key={label}
              style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.06em', transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#B8B4AC'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
