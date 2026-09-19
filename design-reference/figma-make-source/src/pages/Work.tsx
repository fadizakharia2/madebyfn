import { useState } from 'react'
import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const allProjects = [
  { name: 'Meridian', client: 'Meridian Capital', industry: 'Fintech', service: 'Product Engineering', year: '2024', desc: 'Real-time financial intelligence platform for institutional investors.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80', result: '+340% reporting speed', tags: ['React', 'Node.js', 'PostgreSQL'] },
  { name: 'Vessel', client: 'Vessel Commerce', industry: 'Commerce', service: 'Commerce Engineering', year: '2024', desc: 'Headless commerce platform for high-volume DTC brands.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80', result: '+28% conversion', tags: ['Next.js', 'Shopify', 'Stripe'] },
  { name: 'Orbital', client: 'Orbital Systems', industry: 'SaaS', service: 'Product Engineering', year: '2023', desc: 'AI-powered project management for engineering teams.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&auto=format&q=80', result: '4.8★ PH launch', tags: ['React', 'AI/LLM', 'React Native'] },
  { name: 'Pragma', client: 'Pragma Design', industry: 'Design Tools', service: 'Frontend Engineering', year: '2023', desc: 'Design system tooling for distributed product teams.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80', result: '60+ teams onboarded', tags: ['React', 'TypeScript', 'Figma API'] },
  { name: 'Forta', client: 'Forta Protocol', industry: 'Web3', service: 'Backend Architecture', year: '2022', desc: 'Monitoring API infrastructure for blockchain security events.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format&q=80', result: '99.97% uptime', tags: ['Node.js', 'Redis', 'AWS'] },
  { name: 'Cadence', client: 'Cadence Health', industry: 'Healthcare', service: 'Mobile Engineering', year: '2022', desc: 'Patient-facing mobile app for remote care monitoring.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format&q=80', result: '12k MAU at launch', tags: ['React Native', 'Expo', '.NET'] },
]

const industries = ['All', 'Fintech', 'Commerce', 'SaaS', 'Design Tools', 'Web3', 'Healthcare']
const services = ['All', 'Product Engineering', 'Commerce Engineering', 'Frontend Engineering', 'Backend Architecture', 'Mobile Engineering']

export default function Work({ navigate }: { navigate: NavFn }) {
  const [activeIndustry, setActiveIndustry] = useState('All')
  const [activeService, setActiveService] = useState('All')
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useReveal()

  const filtered = allProjects.filter(p => {
    const iMatch = activeIndustry === 'All' || p.industry === activeIndustry
    const sMatch = activeService === 'All' || p.service === activeService
    return iMatch && sMatch
  })

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '80px 48px 64px', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
          — Selected Work
        </div>
        <h1 style={{ ...S.serif, fontSize: 'clamp(52px, 7vw, 100px)', color: '#F0EDE8', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 40 }}>
          Work
        </h1>
        <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, maxWidth: 540 }}>
          A selection of projects built with founders, product teams, and growth-stage companies across six industries.
        </p>
      </div>

      {/* Filters */}
      <div ref={ref} className="reveal" style={{ padding: '32px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Industry</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {industries.map(ind => (
                <button key={ind} onClick={() => setActiveIndustry(ind)}
                  style={{
                    ...S.mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 12px', borderRadius: 2,
                    border: `1px solid ${activeIndustry === ind ? 'rgba(201,168,124,0.5)' : 'rgba(240,237,232,0.08)'}`,
                    color: activeIndustry === ind ? '#C9A87C' : '#5E5B56',
                    background: activeIndustry === ind ? 'rgba(201,168,124,0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                  {ind}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Service</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {services.map(svc => (
                <button key={svc} onClick={() => setActiveService(svc)}
                  style={{
                    ...S.mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 12px', borderRadius: 2,
                    border: `1px solid ${activeService === svc ? 'rgba(201,168,124,0.5)' : 'rgba(240,237,232,0.08)'}`,
                    color: activeService === svc ? '#C9A87C' : '#5E5B56',
                    background: activeService === svc ? 'rgba(201,168,124,0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                  {svc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div style={{ padding: '0 48px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', color: '#5E5B56', ...S.mono, fontSize: 12, letterSpacing: '0.08em' }}>
            No projects match this filter.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
            {filtered.map((p, i) => (
              <div key={p.name}
                data-cursor="View"
                onClick={() => navigate('case-study')}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRight: i % 2 === 0 ? '1px solid rgba(240,237,232,0.07)' : 'none',
                  borderBottom: '1px solid rgba(240,237,232,0.07)',
                  cursor: 'none', overflow: 'hidden',
                }}>
                <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                  <img crossOrigin="anonymous" src={p.image} alt={p.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hovered === p.name ? 'scale(1.05)' : 'scale(1)',
                    filter: 'brightness(0.6) saturate(0.8)',
                  }} />
                  <div style={{ position: 'absolute', top: 24, left: 24 }}>
                    <span style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.industry}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 24, right: 24 }}>
                    <span style={{ ...S.mono, fontSize: 9, color: 'rgba(240,237,232,0.3)', letterSpacing: '0.08em' }}>{p.year}</span>
                  </div>
                </div>
                <div style={{ padding: '32px 36px' }}>
                  <h3 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 36px)', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 8 }}>{p.name}</h3>
                  <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', marginBottom: 14 }}>{p.client}</div>
                  <p style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ ...S.mono, fontSize: 11, color: '#C9A87C', letterSpacing: '0.04em' }}>{p.result}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ ...S.mono, fontSize: 8, color: '#5E5B56', padding: '3px 8px', border: '1px solid rgba(240,237,232,0.07)', borderRadius: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 48px', borderTop: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10', textAlign: 'center' }}>
        <h2 style={{ ...S.serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', marginBottom: 24 }}>
          Ready to be next?
        </h2>
        <button onClick={() => navigate('start')}
          style={{
            ...S.sans, fontSize: 13, fontWeight: 500,
            color: '#0A0A0B', background: '#F0EDE8',
            padding: '14px 32px', borderRadius: 2,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}>
          Start a Project →
        </button>
      </div>
    </div>
  )
}
