import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const principles = [
  { num: '01', title: 'Architecture first', body: 'We spend more time designing systems than building them. A week of careful thinking prevents months of painful refactoring.' },
  { num: '02', title: 'Honest communication', body: "We tell you when something is a bad idea. That's not obstruction — it's the most valuable thing a technical partner can do." },
  { num: '03', title: 'Deliberate technology', body: "We choose boring technology when it's the right answer. We choose novel technology when it genuinely solves a problem. Never the reverse." },
  { num: '04', title: 'Ownership over delivery', body: 'Shipping code is not the goal. Shipping software that serves real people effectively is the goal. We hold ourselves to that distinction.' },
]

const devs = [
  {
    name: 'Marcus Chen',
    role: 'Backend & Systems Architecture',
    since: '2022',
    exp: '7 years',
    bio: "Before Axiom, Marcus led backend engineering at a Series B fintech, where he built the data infrastructure that processed $3B in transactions. Prior to that, 3 years building distributed systems at a scale-up infrastructure company. He thinks about data models the way architects think about load-bearing walls — as decisions that will outlast everything built on top of them.",
    approach: "I want to understand the business completely before I touch a database schema. The technical decisions we make in week one will constrain everything that follows.",
    skills: ['System Architecture', 'Node.js', 'NestJS', '.NET Core', 'PostgreSQL', 'Redis', 'Event-driven systems', 'AWS', 'Python'],
    projects: ['Meridian Capital', 'Forta Protocol', 'Orbital SaaS'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&auto=format&q=80',
  },
  {
    name: 'Soren Larsen',
    role: 'Frontend & Product Engineering',
    since: '2022',
    exp: '6 years',
    bio: "Soren spent 4 years building design systems and complex interfaces at a product design consultancy, then 2 years as frontend lead at an enterprise SaaS company. His background straddles engineering and design — he can read a Figma file and argue about a component API in the same conversation. He's the reason the interfaces we ship feel considered, not just functional.",
    approach: "I'm always thinking about the person on the other end of the interface. Every interaction is a conversation between the system and a human. That conversation should be clear.",
    skills: ['React', 'Next.js', 'Astro', 'TypeScript', 'React Native', 'Design Systems', 'Animation', 'Performance'],
    projects: ['Vessel Commerce', 'Pragma Design', 'Orbital SaaS'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop&auto=format&q=80',
  },
]

export default function Studio({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '80px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
          — The Studio
        </div>
        <h1 style={{ ...S.serif, fontSize: 'clamp(52px, 7vw, 100px)', color: '#F0EDE8', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 40 }}>
          Studio
        </h1>
        <p style={{ ...S.sans, fontSize: 16, color: '#B8B4AC', lineHeight: 1.8, maxWidth: 600 }}>
          Axiom is two engineers who chose to work together because they complement each other perfectly. Marcus brings systems thinking and backend depth. Soren brings product instinct and frontend craft. Together they form a complete product engineering team — without the overhead.
        </p>
      </div>

      {/* Philosophy */}
      <div style={{ padding: '80px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <div ref={ref} className="reveal">
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 40 }}>— Philosophy</div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 680, marginBottom: 0 }}>
            We started Axiom because we kept watching good products fail for avoidable technical reasons — and good engineers fail because they worked inside bad processes.
          </h2>
        </div>
      </div>

      {/* Principles */}
      <div style={{ padding: '80px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 48 }}>— Principles</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
          {principles.map((p, i) => (
            <div key={p.num}
              style={{
                padding: '40px',
                borderRight: i % 2 === 0 ? '1px solid rgba(240,237,232,0.07)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(240,237,232,0.07)' : 'none',
              }}>
              <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', marginBottom: 16, display: 'block' }}>{p.num}</span>
              <h3 style={{ ...S.serif, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#F0EDE8', letterSpacing: '-0.01em', marginBottom: 16, lineHeight: 1.2 }}>{p.title}</h3>
              <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Developers */}
      <div style={{ padding: '80px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 64 }}>— The Team</div>
        {devs.map((dev, i) => (
            <div key={dev.name}
              style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 0, marginBottom: i < devs.length - 1 ? 2 : 0, borderTop: '1px solid rgba(240,237,232,0.07)' }}>
              {/* Portrait */}
              <div style={{ position: 'relative', height: 480, overflow: 'hidden', borderRight: '1px solid rgba(240,237,232,0.07)' }}>
                <img crossOrigin="anonymous" src={dev.image} alt={dev.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) brightness(0.65)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,16,0.9) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
                  <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Since {dev.since} · {dev.exp} exp.</div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ ...S.serif, fontSize: 'clamp(28px, 3vw, 40px)', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 8 }}>{dev.name}</h3>
                <div style={{ ...S.mono, fontSize: 10, color: '#C9A87C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>{dev.role}</div>
                <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.75, marginBottom: 24 }}>{dev.bio}</p>
                <blockquote style={{ borderLeft: '2px solid #C9A87C', paddingLeft: 20, marginBottom: 28 }}>
                  <p style={{ ...S.serif, fontSize: 15, color: '#F0EDE8', fontStyle: 'italic', lineHeight: 1.6 }}>"{dev.approach}"</p>
                </blockquote>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Specialities</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {dev.skills.map(s => (
                      <span key={s} style={{ ...S.mono, fontSize: 9, color: '#B8B4AC', padding: '3px 8px', border: '1px solid rgba(240,237,232,0.08)', borderRadius: 2 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ ...S.serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', marginBottom: 24 }}>
          Ready to work together?
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
