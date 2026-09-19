import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const related = [
  { cat: 'AI', title: 'Practical LLM integration patterns that actually work in production', date: 'Oct 2024', read: '12 min' },
  { cat: 'Architecture', title: 'The spec review process that prevents expensive rework', date: 'Sep 2024', read: '6 min' },
]

export default function Article({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '60px 48px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
            <span style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Architecture</span>
            <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em' }}>8 min read</span>
          </div>
          <h1 style={{ ...S.serif, fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28 }}>
            Why we stopped using microservices for early-stage SaaS
          </h1>
          <p style={{ ...S.sans, fontSize: 17, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 36 }}>
            Microservices solve problems you don't have yet — and create problems you don't expect. A case for starting with a well-structured monolith.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format"
                alt="Marcus Chen" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
              <span style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', fontWeight: 500 }}>Marcus Chen</span>
            </div>
            <span style={{ width: 1, height: 16, background: 'rgba(240,237,232,0.1)' }} />
            <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>November 14, 2024</span>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div style={{ height: 400, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&h=600&fit=crop&auto=format&q=90"
          alt="Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.7)' }} />
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 48px' }}>
        {/* TOC */}
        <div style={{ background: '#0D0D10', border: '1px solid rgba(240,237,232,0.07)', borderRadius: 4, padding: '24px 28px', marginBottom: 48 }}>
          <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Contents</div>
          {['The microservices trap', 'What a monolith actually means', 'When the refactor conversation starts', 'The practical path forward'].map((item, i) => (
            <div key={item} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
              <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ ...S.sans, fontSize: 13, color: '#B8B4AC' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ ...S.sans, fontSize: 16, color: '#B8B4AC', lineHeight: 1.85 }}>
          <p style={{ marginBottom: 28 }}>
            We have declined several project inquiries in the past year from companies who wanted us to "microservice-ify" their application. In most cases, we told them the same thing: you don't have a microservices problem. You have an architecture problem that microservices will make significantly worse.
          </p>

          <h2 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 32px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20, marginTop: 48 }}>
            The microservices trap
          </h2>
          <p style={{ marginBottom: 28 }}>
            Microservices became fashionable because Netflix, Amazon, and Google used them successfully at enormous scale. What the blog posts conveniently omitted was that these companies had hundreds of engineers, mature DevOps organizations, and years of operational experience before they moved to that architecture.
          </p>
          <p style={{ marginBottom: 28 }}>
            A 14-person startup with one DevOps-adjacent engineer does not have Netflix's operational maturity. They have Netflix's architecture documentation — which is a very different thing.
          </p>

          {/* Callout */}
          <div style={{ borderLeft: '3px solid #C9A87C', paddingLeft: 24, margin: '40px 0' }}>
            <p style={{ ...S.serif, fontSize: 18, color: '#F0EDE8', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
              "Premature distribution is the root of much evil in software architecture. The cost of network calls, data consistency challenges, and service orchestration rarely pays dividends until you have genuinely outgrown a monolith."
            </p>
          </div>

          <h2 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 32px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20, marginTop: 48 }}>
            What a monolith actually means
          </h2>
          <p style={{ marginBottom: 28 }}>
            When we recommend a monolith, we are not recommending a Big Ball of Mud. We are recommending a well-structured, domain-separated codebase with clear module boundaries, that happens to be deployed as a single unit.
          </p>
          <p style={{ marginBottom: 28 }}>
            The modularity exists in the code. The simplicity exists in the deployment. You get both — and you defer the operational complexity of service orchestration until your actual scale demands it.
          </p>

          {/* Code block */}
          <div style={{ background: '#111113', border: '1px solid rgba(240,237,232,0.07)', borderRadius: 4, padding: '24px', margin: '36px 0', overflow: 'auto' }}>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>src/modules/billing/</div>
            <pre style={{ ...S.mono, fontSize: 12, lineHeight: 1.7, color: '#B8B4AC', margin: 0 }}>
              <span style={{ color: '#5E5B56' }}>// Clear module boundaries. Single deployment.</span>{'\n'}
              <span style={{ color: '#4A7A9B' }}>import</span>{' { BillingService }'}{' '}<span style={{ color: '#4A7A9B' }}>from</span>{' '}<span style={{ color: '#C9A87C' }}>'@/modules/billing'</span>{'\n'}
              <span style={{ color: '#4A7A9B' }}>import</span>{' { CustomerService }'}{' '}<span style={{ color: '#4A7A9B' }}>from</span>{' '}<span style={{ color: '#C9A87C' }}>'@/modules/customers'</span>{'\n\n'}
              <span style={{ color: '#5E5B56' }}>// Domain logic stays together.</span>{'\n'}
              <span style={{ color: '#5E5B56' }}>// Network hops: zero.</span>{'\n'}
              <span style={{ color: '#5E5B56' }}>// Deployment complexity: minimal.</span>
            </pre>
          </div>

          <h2 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 32px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20, marginTop: 48 }}>
            The practical path forward
          </h2>
          <p style={{ marginBottom: 28 }}>
            Start with a well-structured monolith. Deploy it as a single unit. Identify the seams in your domain model carefully. When — and only when — a specific service faces genuine scaling pressure, extract that service. Not the whole application. Not because your architecture looks like Netflix's. Because that specific service has a real problem that extraction will solve.
          </p>
          <p style={{ marginBottom: 0 }}>
            Most early-stage products will never need to make that extraction. And that's fine. The goal is software that serves users effectively, not architectures that impress conference audiences.
          </p>
        </div>

        {/* Author bio */}
        <div style={{ borderTop: '1px solid rgba(240,237,232,0.07)', paddingTop: 48, marginTop: 64, display: 'flex', gap: 24 }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
            alt="Marcus Chen" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(20%)', flexShrink: 0 }} />
          <div>
            <div style={{ ...S.sans, fontSize: 14, color: '#F0EDE8', fontWeight: 500, marginBottom: 4 }}>Marcus Chen</div>
            <div style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Backend & Systems Architecture · Axiom Studio</div>
            <p style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.65 }}>
              Marcus has spent 7 years building backend systems in fintech and infrastructure. He writes about architecture, distributed systems, and the practical decisions behind production software.
            </p>
          </div>
        </div>
      </div>

      {/* Related articles */}
      <div ref={ref} className="reveal" style={{ borderTop: '1px solid rgba(240,237,232,0.07)', padding: '64px 48px', background: '#0D0D10' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 40 }}>— Related</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
          {related.map((art, i) => (
            <div key={art.title}
              onClick={() => navigate('article')}
              style={{
                borderRight: i === 0 ? '1px solid rgba(240,237,232,0.07)' : 'none',
                padding: '40px 36px', cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#111113'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <div style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{art.cat}</div>
              <h3 style={{ ...S.serif, fontSize: 'clamp(18px, 2vw, 22px)', color: '#F0EDE8', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 12 }}>{art.title}</h3>
              <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em' }}>{art.date} · {art.read} read</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 48px', borderTop: '1px solid rgba(240,237,232,0.07)', textAlign: 'center' }}>
        <h2 style={{ ...S.serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', marginBottom: 24 }}>
          Want these principles applied to your project?
        </h2>
        <button onClick={() => navigate('start')}
          style={{ ...S.sans, fontSize: 13, fontWeight: 500, color: '#0A0A0B', background: '#F0EDE8', padding: '14px 32px', borderRadius: 2, transition: 'background 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}>
          Start a Project →
        </button>
      </div>
    </div>
  )
}
