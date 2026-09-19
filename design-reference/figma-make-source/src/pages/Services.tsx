import { useState } from 'react'
import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const services = [
  {
    num: '01', name: 'Product Engineering',
    tagline: 'Concept to production. No handoffs.',
    what: 'Full ownership of complex digital products — from technical specification through to deployment and iteration. We work as a complete product engineering team, not a development resource.',
    problems: ['You need to move fast without accumulating debt', 'Your product is too complex for generalist developers', 'You need engineers who think about the product, not just the spec'],
    tech: ['React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'AWS', 'TypeScript'],
    projects: ['Meridian Capital', 'Orbital SaaS'],
    engagement: 'Sprint-based engagement, full ownership model, technical co-founder dynamic',
  },
  {
    num: '02', name: 'Frontend Engineering',
    tagline: 'Interfaces worth using.',
    what: 'Component systems, design implementations, and complex UI built with the precision your product deserves. We build frontend that holds up at scale — technically and visually.',
    problems: ['Your design deserves better implementation', 'Your component system is becoming a liability', 'Performance is affecting conversion and experience'],
    tech: ['React', 'Next.js', 'Astro', 'TypeScript', 'Framer Motion', 'Design Systems', 'WebGL'],
    projects: ['Pragma Design', 'Vessel Commerce'],
    engagement: 'Component system audit, design handoff, performance sprint, ongoing feature development',
  },
  {
    num: '03', name: 'Backend & Architecture',
    tagline: 'Systems that scale beyond your current imagination.',
    what: 'Backend architecture designed to last. APIs built for evolution. Infrastructure that handles the growth you haven\'t planned for yet.',
    problems: ['Your backend is becoming a bottleneck', 'You need a real API — not a collection of endpoints', 'Your data architecture is slowing development'],
    tech: ['Node.js', 'NestJS', '.NET Core', 'PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'AWS', 'Cloudflare'],
    projects: ['Meridian Capital', 'Forta Protocol'],
    engagement: 'Architecture review, greenfield build, scaling sprint, API design consultation',
  },
  {
    num: '04', name: 'AI & Automation',
    tagline: 'LLM integrations that solve real problems.',
    what: 'AI integrations that fit how your business actually works — not theoretical pipelines. Automation that replaces friction, not jobs.',
    problems: ['You want to use AI but aren\'t sure where it actually adds value', 'Your current AI implementation is brittle in production', 'Manual processes are slowing your team down'],
    tech: ['OpenAI', 'Anthropic', 'LangChain', 'LlamaIndex', 'Pinecone', 'Python', 'TypeScript'],
    projects: ['Orbital SaaS', 'Custom automation projects'],
    engagement: 'AI audit, proof-of-concept build, production integration, agent development',
  },
  {
    num: '05', name: 'Mobile Engineering',
    tagline: 'React Native done properly.',
    what: 'Cross-platform mobile applications with native-quality performance and platform-appropriate UX. Not a web app in a shell.',
    problems: ['You need iOS and Android without two separate codebases', 'Your current mobile app feels like a web app', 'Performance is hurting your app store ratings'],
    tech: ['React Native', 'Expo', 'TypeScript', 'React Navigation', 'iOS', 'Android', 'Fastlane'],
    projects: ['Cadence Health', 'Orbital mobile'],
    engagement: 'Native audit, greenfield build, performance sprint, App Store deployment',
  },
  {
    num: '06', name: 'Commerce Engineering',
    tagline: 'Storefronts that convert.',
    what: 'Headless commerce implementations, custom checkout experiences, and performance-first storefronts for serious DTC brands.',
    problems: ['Your Shopify theme is limiting your product vision', 'Checkout performance is hurting conversion', 'You need commerce logic that your platform can\'t support'],
    tech: ['Shopify', 'Hydrogen', 'Next.js', 'Sanity', 'Stripe', 'Algolia', 'Cloudflare'],
    projects: ['Vessel Commerce'],
    engagement: 'Platform migration, custom storefront, checkout optimization, headless architecture',
  },
]

export default function Services({ navigate }: { navigate: NavFn }) {
  const [expanded, setExpanded] = useState<number | null>(0)
  const ref = useReveal()

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '80px 48px 64px', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
          — Capabilities
        </div>
        <h1 style={{ ...S.serif, fontSize: 'clamp(52px, 7vw, 100px)', color: '#F0EDE8', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 40 }}>
          Services
        </h1>
        <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, maxWidth: 540 }}>
          We don't do everything. We do six things very well — and we're direct about which one fits your situation.
        </p>
      </div>

      {/* Services list */}
      <div style={{ padding: '0 48px' }}>
        {services.map((svc, i) => (
            <div key={svc.num}
              style={{ borderTop: '1px solid rgba(240,237,232,0.07)' }}>
              {/* Header row */}
              <div onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ padding: '36px 0', cursor: 'pointer', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 24, alignItems: 'center' }}>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em' }}>{svc.num}</span>
                <div>
                  <h2 style={{ ...S.serif, fontSize: 'clamp(28px, 3.5vw, 44px)', color: expanded === i ? '#F0EDE8' : '#B8B4AC', letterSpacing: '-0.02em', lineHeight: 1.1, transition: 'color 0.2s ease' }}>
                    {svc.name}
                  </h2>
                  <p style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', marginTop: 6, display: expanded === i ? 'none' : 'block' }}>
                    {svc.tagline}
                  </p>
                </div>
                <span style={{
                  ...S.mono, fontSize: 18, color: expanded === i ? '#C9A87C' : '#5E5B56',
                  transform: expanded === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease, color 0.2s ease',
                }}>+</span>
              </div>

              {/* Expanded content */}
              {expanded === i && (
                <div style={{ paddingBottom: 48, display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 32 }}>
                  <div />
                  <div>
                    <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.75, marginBottom: 32 }}>{svc.what}</p>
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Typical problems</div>
                      {svc.problems.map(p => (
                        <div key={p} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                          <span style={{ color: '#C9A87C', marginTop: 2 }}>–</span>
                          <span style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.5 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: 28 }}>
                      <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Engagement</div>
                      {svc.engagement}
                    </div>
                    <button onClick={() => navigate('start')}
                      style={{
                        ...S.mono, fontSize: 9, letterSpacing: '0.1em', color: '#C9A87C',
                        textTransform: 'uppercase', borderBottom: '1px solid rgba(201,168,124,0.3)',
                        paddingBottom: 3, transition: 'border-color 0.2s ease',
                      }}>
                      Discuss this service →
                    </button>
                  </div>
                  <div>
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Technologies</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {svc.tech.map(t => (
                          <span key={t} style={{ ...S.mono, fontSize: 9, color: '#B8B4AC', padding: '4px 10px', border: '1px solid rgba(240,237,232,0.1)', borderRadius: 2 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Related projects</div>
                      {svc.projects.map(p => (
                        <div key={p} onClick={() => navigate('case-study')}
                          style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', marginBottom: 6, cursor: 'pointer', transition: 'color 0.2s ease' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#B8B4AC'}>
                          {p} ↗
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
        ))}
      </div>

      {/* CTA */}
      <div ref={ref} className="reveal" style={{ padding: '80px 48px', borderTop: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <h2 style={{ ...S.serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', marginBottom: 16 }}>
          Not sure what you need?
        </h2>
        <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
          Tell us about your project. We'll tell you honestly whether we're the right fit — and if not, point you toward someone who is.
        </p>
        <button onClick={() => navigate('start')}
          style={{ ...S.sans, fontSize: 13, fontWeight: 500, color: '#0A0A0B', background: '#F0EDE8', padding: '14px 28px', borderRadius: 2, transition: 'background 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}>
          Start a Conversation →
        </button>
      </div>
    </div>
  )
}
