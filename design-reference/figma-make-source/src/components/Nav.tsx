import { useState, useEffect } from 'react'
import { NavFn, Page } from '../types'

const links: { label: string; page: Page }[] = [
  { label: 'Work', page: 'work' },
  { label: 'Services', page: 'services' },
  { label: 'Studio', page: 'studio' },
  { label: 'Insights', page: 'insights' },
]

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

export default function Nav({ page, navigate }: { page: Page; navigate: NavFn }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => { setMenuOpen(false) }, [page])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '14px 48px' : '22px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,11,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,237,232,0.07)' : '1px solid transparent',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Logo */}
        <button onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ ...S.serif, fontSize: 22, letterSpacing: '-0.02em', color: '#F0EDE8' }}>
            Axiom
          </span>
          <span style={{ ...S.mono, fontSize: 9, letterSpacing: '0.14em', color: '#5E5B56', textTransform: 'uppercase' }}>
            Studio
          </span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {links.map(l => (
              <button key={l.page} onClick={() => navigate(l.page)}
                style={{
                  ...S.sans, fontSize: 13, letterSpacing: '0.01em',
                  color: page === l.page ? '#F0EDE8' : '#5E5B56',
                  transition: 'color 0.2s ease', position: 'relative', padding: '4px 0',
                }}
                onMouseEnter={e => { if (page !== l.page) (e.currentTarget as HTMLElement).style.color = '#B8B4AC' }}
                onMouseLeave={e => { if (page !== l.page) (e.currentTarget as HTMLElement).style.color = '#5E5B56' }}
              >
                {l.label}
                {page === l.page && (
                  <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: '#C9A87C' }} />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Right: availability + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5CB85C', display: 'block' }} className="animate-pulse-dot" />
              <span style={{ ...S.mono, fontSize: 9, letterSpacing: '0.12em', color: '#5E5B56', textTransform: 'uppercase' }}>
                Available
              </span>
            </div>
          )}

          {!isMobile && (
            <button onClick={() => navigate('start')}
              style={{
                ...S.sans, fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
                color: '#0A0A0B', background: '#F0EDE8', padding: '9px 20px', borderRadius: 2,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}
            >
              Start a Project
            </button>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 4, background: 'transparent' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1, background: '#F0EDE8',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen && i === 0 ? 'translateY(6px) rotate(45deg)' :
                             menuOpen && i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99, background: '#0A0A0B',
          display: 'flex', flexDirection: 'column', padding: '100px 36px 60px',
          overflowY: 'auto',
        }}>
          {links.map((l, i) => (
            <button key={l.page} onClick={() => navigate(l.page)}
              style={{
                ...S.serif, fontSize: 'clamp(36px, 10vw, 68px)',
                color: '#F0EDE8', textAlign: 'left',
                padding: '14px 0', borderBottom: '1px solid rgba(240,237,232,0.07)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
                opacity: 0, animation: `fade-up 0.5s ease ${i * 0.08}s forwards`,
              }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => navigate('start')}
            style={{
              ...S.serif, fontSize: 'clamp(36px, 10vw, 68px)',
              color: '#C9A87C', textAlign: 'left',
              padding: '14px 0', letterSpacing: '-0.02em', lineHeight: 1.1,
              marginTop: 20, opacity: 0,
              animation: `fade-up 0.5s ease ${links.length * 0.08}s forwards`,
            }}>
            Start a Project
          </button>

          <div style={{
            marginTop: 'auto', paddingTop: 40, opacity: 0,
            animation: 'fade-up 0.5s ease 0.45s forwards',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5CB85C', display: 'block' }} />
              <span style={{ ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56', textTransform: 'uppercase' }}>
                Available for Q1 2025
              </span>
            </div>
            <a href="mailto:hello@axiom.studio"
              style={{ ...S.mono, fontSize: 11, color: '#5E5B56', letterSpacing: '0.02em' }}>
              hello@axiom.studio
            </a>
          </div>
        </div>
      )}
    </>
  )
}
