import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const metrics = [
  { value: '340%', label: 'Faster reporting' },
  { value: '$2.4B', label: 'AUM managed' },
  { value: '<100ms', label: 'Query latency' },
  { value: '0', label: 'Data incidents' },
]

const modules = [
  { heading: 'The challenge', body: 'Meridian Capital was managing $2.4 billion in assets across 14 funds using a fragile patchwork of Excel spreadsheets, legacy VBA macros, and manual reporting workflows built up over a decade of institutional inertia. Report generation took three working days. Risk calculations ran nightly. Decision-makers were always behind the data.' },
  { heading: 'Our approach', body: 'We began with two weeks of domain immersion before writing a single line of code. Understanding how portfolio managers think, what decisions they actually make, and where the system was creating friction — not just technical friction, but cognitive friction. The architecture emerged from this understanding, not from a generic technical playbook.' },
  { heading: 'Architecture', body: 'Event-driven data ingestion from seven independent data sources with conflict resolution and audit trails. A custom query engine optimized specifically for portfolio analytics workloads — not general-purpose SQL. A React interface designed around analyst mental models rather than database schemas.' },
  { heading: 'The result', body: 'Reports that once took three days now run in hours. Real-time risk calculations replaced overnight batch jobs. The team made faster, better-informed decisions from day one. Six months post-launch: zero critical incidents, and a CTO who called it the best technology investment the firm had made.' },
]

export default function CaseStudy({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden', minHeight: 400 }}>
        <img
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&h=900&fit=crop&auto=format&q=90"
          alt="Meridian Platform"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) saturate(0.6)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0B 20%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 48, right: 48 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            {['Fintech', 'Product Engineering', '2024'].map(tag => (
              <span key={tag} style={{ ...S.mono, fontSize: 9, color: 'rgba(240,237,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid rgba(240,237,232,0.15)', borderRadius: 2 }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ ...S.serif, fontSize: 'clamp(40px, 6vw, 80px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.0 }}>
            Meridian Capital
          </h1>
          <p style={{ ...S.serif, fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#B8B4AC', letterSpacing: '-0.01em', fontStyle: 'italic', marginTop: 12 }}>
            Financial intelligence for institutional investment.
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div style={{ borderBottom: '1px solid rgba(240,237,232,0.07)', padding: '28px 48px', display: 'flex', gap: 60, background: '#0D0D10', overflowX: 'auto' }}>
        {[
          { label: 'Client', value: 'Meridian Capital' },
          { label: 'Timeline', value: '14 weeks' },
          { label: 'Team', value: 'Marcus + Soren' },
          { label: 'Services', value: 'Backend, Frontend, Architecture' },
          { label: 'Year', value: '2024' },
        ].map(m => (
          <div key={m.label} style={{ flex: '0 0 auto' }}>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
            <div style={{ ...S.sans, fontSize: 13, color: '#B8B4AC' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px' }}>
        {modules.map((mod) => (
          <div key={mod.heading} style={{ marginBottom: 60 }}>
            <h2 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 36px)', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 20 }}>{mod.heading}</h2>
            <p style={{ ...S.sans, fontSize: 16, color: '#B8B4AC', lineHeight: 1.8 }}>{mod.body}</p>
          </div>
        ))}
      </div>

      {/* Full-width image */}
      <div style={{ height: 480, overflow: 'hidden', margin: '0 0 2px' }}>
        <img
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&h=700&fit=crop&auto=format&q=90"
          alt="Dashboard"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.7)' }}
        />
      </div>

      {/* Metrics */}
      <div ref={ref} className="reveal" style={{ padding: '80px 48px', borderTop: '1px solid rgba(240,237,232,0.07)', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 48 }}>— Results</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {metrics.map((m, i) => (
            <div key={m.label} className={`reveal reveal-delay-${i}`}>
              <div style={{ ...S.serif, fontSize: 'clamp(36px, 5vw, 56px)', color: '#C9A87C', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12 }}>
                {m.value}
              </div>
              <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div style={{ padding: '80px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <div style={{ maxWidth: 680 }}>
          <p style={{ ...S.serif, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F0EDE8', lineHeight: 1.5, letterSpacing: '-0.01em', fontStyle: 'italic', marginBottom: 32 }}>
            "Working with Axiom felt nothing like hiring a freelance team. They had the product instincts of a senior internal team and the technical depth to back every decision up."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 1, height: 40, background: '#C9A87C' }} />
            <div>
              <div style={{ ...S.sans, fontSize: 14, color: '#F0EDE8', fontWeight: 500, marginBottom: 2 }}>Elena Voss</div>
              <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>Co-founder & CEO · Meridian Capital</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div
        data-cursor="Next"
        onClick={() => navigate('case-study')}
        style={{ padding: '80px 48px', cursor: 'none', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(240,237,232,0.07)' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0D0D10'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
        <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Next project</div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(36px, 5vw, 68px)', color: '#F0EDE8', letterSpacing: '-0.03em' }}>
          Vessel Commerce →
        </h2>
      </div>
    </div>
  )
}
