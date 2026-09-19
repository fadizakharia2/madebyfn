import { useState, useEffect } from 'react'
import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const projects = [
  {
    num: '01',
    name: 'Meridian',
    client: 'Meridian Capital',
    industry: 'Financial Technology',
    year: '2024',
    description: 'A real-time financial intelligence platform serving institutional investors. Complex data pipelines, sub-100ms query performance, and a precision-crafted interface managing $2.4B in assets.',
    services: ['Product Engineering', 'Backend Architecture', 'Frontend'],
    result: '+340% faster reporting',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&auto=format&q=90',
  },
  {
    num: '02',
    name: 'Vessel',
    client: 'Vessel Commerce',
    industry: 'Headless Commerce',
    year: '2024',
    description: 'A fully composable commerce platform built for DTC brands processing high-volume sales. Custom storefront, real-time inventory, and a headless checkout converting 28% better than industry average.',
    services: ['Commerce Engineering', 'Frontend', 'API Design'],
    result: '+28% conversion rate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&auto=format&q=90',
  },
  {
    num: '03',
    name: 'Orbital',
    client: 'Orbital Systems',
    industry: 'SaaS / Productivity',
    year: '2023',
    description: 'An AI-powered engineering project management tool. LLM-driven task decomposition, automated sprint planning, and deep integration with GitHub — built for teams that ship.',
    services: ['SaaS Engineering', 'AI Integration', 'Mobile'],
    result: '4.8★ Product Hunt launch',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&h=900&fit=crop&auto=format&q=90',
  },
]

const testimonials = [
  {
    quote: "Working with Marcus and Soren felt nothing like hiring a freelance team. They had the product instincts of a senior internal team and the technical depth to back it up. They shipped more in 8 weeks than our previous agency did in six months.",
    person: 'Elena Voss',
    role: 'Co-founder & CEO',
    company: 'Meridian Capital',
    project: 'Meridian Platform',
  },
  {
    quote: "The quality of thinking they brought to our architecture saved us from months of tech debt. Clear communication, fast delivery, and they never had to be told something twice. Exceptional.",
    person: 'James Okafor',
    role: 'Head of Product',
    company: 'Vessel Commerce',
    project: 'Vessel Platform',
  },
  {
    quote: "Most developers either write great code or think about the product — Axiom does both. They pushed back on specs that would have hurt us and suggested solutions we hadn't considered. Worth every penny.",
    person: 'Sasha Mendez',
    role: 'CTO',
    company: 'Orbital Systems',
    project: 'Orbital SaaS',
  },
]

const insights = [
  {
    category: 'Architecture',
    title: 'Why we stopped using microservices for early-stage SaaS',
    date: 'Nov 2024',
    readTime: '8 min',
    slug: 'article',
  },
  {
    category: 'AI',
    title: 'Practical LLM integration patterns that actually work in production',
    date: 'Oct 2024',
    readTime: '12 min',
    slug: 'article',
  },
  {
    category: 'Product',
    title: 'The spec review process that prevents expensive rework',
    date: 'Sep 2024',
    readTime: '6 min',
    slug: 'article',
  },
]

/* ── Hero ───────────────────────────────────────────── */
function Hero({ navigate }: { navigate: NavFn }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Full-bleed technical visual — spans entire hero */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#0A0A0B',
        opacity: 0, animation: 'fade-in 1.2s ease 0.2s forwards',
      }}>
        {/* Precision grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(240,237,232,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,237,232,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }} />

        {/* Vertical accent lines */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(240,237,232,0.04)' }} />
        <div style={{ position: 'absolute', left: '75%', top: 0, bottom: 0, width: 1, background: 'rgba(240,237,232,0.03)' }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(201,168,124,0.5) 60%, rgba(201,168,124,0.2) 80%, transparent 100%)',
          top: '30%',
        }} className="animate-scan" />

        {/* Code fragment — upper right quadrant */}
        <div className="animate-float-a" style={{
          position: 'absolute', top: '18%', right: '18%',
          background: 'rgba(16,16,20,0.95)', border: '1px solid rgba(240,237,232,0.08)',
          borderRadius: 4, padding: '18px 22px', backdropFilter: 'blur(12px)',
          maxWidth: 300,
        }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['#C0392B','#E67E22','#27AE60'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
            ))}
          </div>
          <pre style={{ ...S.mono, fontSize: 11, lineHeight: 1.75, color: '#5E5B56', margin: 0 }}>
            <span style={{ color: '#4A7A9B' }}>async</span>{' '}
            <span style={{ color: '#C9A87C' }}>function</span>{' '}
            <span style={{ color: '#B8B4AC' }}>shipProduct</span>
            {`() {\n`}
            {'  '}<span style={{ color: '#5E5B56' }}>// no middlemen</span>{'\n'}
            {'  '}<span style={{ color: '#4A7A9B' }}>return</span>{' await '}
            <span style={{ color: '#C9A87C' }}>build</span>
            {`({\n`}
            {'    '}<span style={{ color: '#B8B4AC' }}>direct</span>
            {': '}<span style={{ color: '#5CB85C' }}>true</span>
            {`,\n`}
            {'    '}<span style={{ color: '#B8B4AC' }}>quality</span>
            {': '}<span style={{ color: '#C9A87C' }}>"uncompromised"</span>
            {'\n  });\n}'}
          </pre>
        </div>

        {/* Meridian metric card — center-right */}
        <div className="animate-float-b" style={{
          position: 'absolute', top: '50%', right: '10%',
          transform: 'translateY(-50%)',
          background: 'rgba(16,16,20,0.95)', border: '1px solid rgba(240,237,232,0.09)',
          borderRadius: 4, padding: '22px 26px', backdropFilter: 'blur(16px)',
          minWidth: 200,
        }}>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.12em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 12 }}>
            Meridian / Q3 2024
          </div>
          <div style={{ ...S.serif, fontSize: 42, color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1 }}>
            340%
          </div>
          <div style={{ ...S.mono, fontSize: 10, color: '#C9A87C', marginTop: 8, letterSpacing: '0.04em' }}>
            faster reporting ↑
          </div>
          <div style={{ height: 1, background: 'rgba(240,237,232,0.07)', margin: '14px 0' }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
            {[65, 82, 78, 90, 88, 95].map((h, i) => (
              <div key={i} style={{
                width: 5, height: h * 0.42,
                background: i === 5 ? '#C9A87C' : 'rgba(240,237,232,0.12)',
                borderRadius: 2,
              }} />
            ))}
          </div>
        </div>

        {/* Stack tags — lower right */}
        <div className="animate-float-a" style={{
          position: 'absolute', bottom: '18%', right: '22%',
          background: 'rgba(16,16,20,0.95)', border: '1px solid rgba(240,237,232,0.08)',
          borderRadius: 4, padding: '16px 20px', backdropFilter: 'blur(12px)',
        }}>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.12em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 10 }}>
            Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['React', 'Node.js', 'NestJS', '.NET', 'PostgreSQL', 'AI/LLM'].map(t => (
              <span key={t} style={{
                ...S.mono, fontSize: 10, color: '#B8B4AC',
                padding: '3px 9px', border: '1px solid rgba(240,237,232,0.1)',
                borderRadius: 2,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Subtle vignette — keeps left content legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.6) 45%, rgba(10,10,11,0.1) 70%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Corner watermark */}
        <div style={{
          position: 'absolute', bottom: 24, right: 32,
          ...S.mono, fontSize: 9, letterSpacing: '0.1em',
          color: 'rgba(240,237,232,0.1)', textTransform: 'uppercase',
        }}>
          Axm / Studio / 2025
        </div>
      </div>

      {/* Content — left-anchored, floats above the visual */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(80px, 10vw, 140px) 48px',
        paddingTop: 'calc(clamp(80px, 10vw, 140px) + 80px)',
        maxWidth: 680,
        transform: `translateY(${scrollY * 0.1}px)`,
        transition: 'transform 0s linear',
      }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, opacity: 0, animation: 'fade-up 0.7s ease 0.1s forwards' }}>
          <div style={{ width: 24, height: 1, background: 'rgba(201,168,124,0.5)' }} />
          <span style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase' }}>
            Axiom — Product Engineering Studio
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          ...S.serif,
          fontSize: 'clamp(52px, 6.5vw, 96px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: '#F0EDE8',
          marginBottom: 32,
          opacity: 0,
          animation: 'fade-up 0.8s ease 0.2s forwards',
        }}>
          Senior engineers,<br />
          <em style={{ color: '#C9A87C' }}>serious</em>{' '}software.
        </h1>

        {/* Sub-copy */}
        <p style={{
          ...S.sans,
          fontSize: 16,
          lineHeight: 1.75,
          color: '#B8B4AC',
          maxWidth: 460,
          marginBottom: 52,
          opacity: 0,
          animation: 'fade-up 0.8s ease 0.3s forwards',
        }}>
          Two engineers. One focused team. We take complex digital products
          from concept to production — without the agency overhead,
          the account manager, or the handoff delays.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 64, opacity: 0, animation: 'fade-up 0.7s ease 0.4s forwards', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('start')}
            data-cursor="Start"
            data-cursor-light="true"
            style={{
              ...S.sans, fontSize: 13, fontWeight: 500,
              color: '#0A0A0B', background: '#F0EDE8',
              padding: '14px 28px', borderRadius: 2,
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A87C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F0EDE8' }}>
            Start a Project
            <span style={{ fontSize: 16 }}>→</span>
          </button>
          <button onClick={() => navigate('work')}
            data-cursor="Work"
            style={{
              ...S.sans, fontSize: 13, fontWeight: 400,
              color: '#B8B4AC',
              padding: '14px 28px', borderRadius: 2,
              border: '1px solid rgba(240,237,232,0.15)',
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.35)'; (e.currentTarget as HTMLElement).style.color = '#F0EDE8' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.15)'; (e.currentTarget as HTMLElement).style.color = '#B8B4AC' }}>
            View Work ↓
          </button>
        </div>

        {/* Availability */}
        <div style={{ opacity: 0, animation: 'fade-up 0.7s ease 0.5s forwards', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5CB85C', display: 'block' }} className="animate-pulse-dot" />
          <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.08em' }}>
            Available for new engagements · Q1 2025
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── Stats Strip ─────────────────────────────────────── */
function StatsStrip() {
  const ref = useReveal()
  const stats = [
    { value: '12+', label: 'Years combined' },
    { value: '40+', label: 'Projects shipped' },
    { value: '8', label: 'Industries served' },
    { value: '2', label: 'Direct engineers' },
    { value: '100%', label: 'Senior throughout' },
  ]
  return (
    <div ref={ref} className="reveal" style={{
      borderTop: '1px solid rgba(240,237,232,0.07)',
      borderBottom: '1px solid rgba(240,237,232,0.07)',
      padding: '24px 48px',
      display: 'flex', alignItems: 'center',
      background: '#0D0D10',
      overflowX: 'auto',
    }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
          <div style={{ textAlign: 'center', padding: '0 40px' }}>
            <div style={{ ...S.serif, fontSize: 28, color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {s.label}
            </div>
          </div>
          {i < stats.length - 1 && (
            <div style={{ width: 1, height: 32, background: 'rgba(240,237,232,0.07)' }} />
          )}
        </div>
      ))}
      <div style={{ marginLeft: 'auto', paddingLeft: 40, flex: '0 0 auto' }}>
        <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          London, UK · EST. 2022
        </span>
      </div>
    </div>
  )
}

/* ── Selected Work ───────────────────────────────────── */
function SelectedWork({ navigate }: { navigate: NavFn }) {
  const headerRef = useReveal()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
      {/* Header */}
      <div ref={headerRef} className="reveal" style={{
        padding: '0 48px', marginBottom: 64,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
            — Selected Work
          </div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
            Projects that moved<br />the needle.
          </h2>
        </div>
        <button onClick={() => navigate('work')}
          style={{
            ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10,
            transition: 'color 0.2s ease', borderBottom: '1px solid rgba(240,237,232,0.12)', paddingBottom: 4,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
          View all work →
        </button>
      </div>

      {/* Projects */}
      {projects.map((p, i) => {
        const isEven = i % 2 === 0
        return (
          <div key={p.num} style={{
            marginBottom: i < projects.length - 1 ? 2 : 0,
            borderTop: '1px solid rgba(240,237,232,0.07)',
          }}>
            {/* Full-width layout */}
            <div
              data-cursor="View"
              onClick={() => navigate('case-study')}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                height: i === 1 ? 'auto' : 520,
                cursor: 'none',
                display: i === 1 ? 'grid' : 'block',
                gridTemplateColumns: i === 1 ? '55% 45%' : 'auto',
              }}>

              {i === 1 ? (
                /* Side-by-side layout for project 2 */
                <>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 480 }}>
                    <img crossOrigin="anonymous" src={p.image} alt={p.name} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hovered === i ? 'scale(1.03)' : 'scale(1)',
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, transparent 60%, #0A0A0B)',
                    }} />
                  </div>
                  <div style={{
                    padding: '60px 48px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', background: '#0D0D10',
                    borderLeft: '1px solid rgba(240,237,232,0.07)',
                  }}>
                    <div style={{ ...S.serif, fontSize: 'clamp(18px, 1.5vw, 22px)', color: '#5E5B56', marginBottom: 8, fontStyle: 'italic' }}>
                      {p.num}
                    </div>
                    <h3 style={{ ...S.serif, fontSize: 'clamp(36px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 20 }}>
                      {p.name}
                    </h3>
                    <div style={{ height: 1, background: 'rgba(240,237,232,0.08)', marginBottom: 20, width: hovered === i ? '100%' : '40%', transition: 'width 0.6s ease' }} />
                    <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 28 }}>{p.description}</p>
                    <div style={{ ...S.mono, fontSize: 11, color: '#C9A87C', letterSpacing: '0.06em' }}>{p.result}</div>
                    <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.services.map(s => (
                        <span key={s} style={{ ...S.mono, fontSize: 9, color: '#5E5B56', padding: '4px 10px', border: '1px solid rgba(240,237,232,0.07)', borderRadius: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                        View case study →
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Full-width layout for projects 1 and 3 */
                <>
                  <img crossOrigin="anonymous" src={p.image} alt={p.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hovered === i ? 'scale(1.03)' : 'scale(1)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isEven
                      ? 'linear-gradient(to right, rgba(10,10,11,0.8) 40%, transparent)'
                      : 'linear-gradient(to left, rgba(10,10,11,0.8) 40%, transparent)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 40,
                    left: isEven ? 48 : 'auto',
                    right: isEven ? 'auto' : 48,
                    maxWidth: 480,
                  }}>
                    <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                      {p.industry} · {p.year}
                    </div>
                    <div style={{ ...S.serif, fontSize: 'clamp(28px, 3vw, 48px)', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {p.name}
                    </div>
                    <div style={{ height: 1, background: 'rgba(240,237,232,0.2)', marginBottom: 12, width: hovered === i ? '100%' : '60%', transition: 'width 0.6s ease' }} />
                    <div style={{ ...S.mono, fontSize: 11, color: '#C9A87C', letterSpacing: '0.04em' }}>{p.result}</div>
                  </div>
                  {/* Number */}
                  <div style={{
                    position: 'absolute', top: 40,
                    right: isEven ? 48 : 'auto',
                    left: isEven ? 'auto' : 48,
                    ...S.serif, fontSize: 'clamp(48px, 7vw, 96px)',
                    color: 'rgba(240,237,232,0.06)',
                    letterSpacing: '-0.04em', lineHeight: 1,
                    fontStyle: 'italic',
                  }}>
                    {p.num}
                  </div>
                  {/* Metadata floating */}
                  <div style={{
                    position: 'absolute', top: 40,
                    left: isEven ? 48 : 'auto',
                    right: isEven ? 'auto' : 48,
                  }}>
                    <span style={{ ...S.mono, fontSize: 9, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {p.client}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}

/* ── Featured Case Story ─────────────────────────────── */
function FeaturedCaseStory({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    {
      label: 'Challenge',
      heading: 'A trading firm locked inside a spreadsheet.',
      body: 'Meridian Capital was managing $2.4B in assets across 14 funds using a patchwork of Excel sheets, legacy VBA scripts, and manual reporting workflows. Decision-making was slow. Reporting was days behind. The risk was real.',
    },
    {
      label: 'Approach',
      heading: 'Architecture before a single line of code.',
      body: 'We spent the first two weeks mapping data flows, understanding the domain, and designing a system that would last. Not the easiest sell, but the most valuable thing we did. The resulting architecture reduced migration risk by an order of magnitude.',
    },
    {
      label: 'Build',
      heading: 'Real-time pipelines. Sub-100ms queries.',
      body: 'Event-driven ingestion from 7 data sources, a custom query engine optimised for portfolio analytics, and a React interface built around how analysts actually think — not how databases are structured.',
    },
    {
      label: 'Result',
      heading: '340% faster reporting. Zero data incidents.',
      body: 'Reports that took 3 days now take hours. The team made better decisions faster. Six months post-launch, zero critical incidents. The CTO called it the best technology investment the firm had made.',
    },
  ]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — Featured Case
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(36px, 4vw, 60px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          Inside the Meridian build.
        </h2>
      </div>

      {/* Full-bleed image with content overlay */}
      <div style={{ position: 'relative', minHeight: 600, overflow: 'hidden' }}>
        {/* Full-width background image */}
        <img
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&h=900&fit=crop&auto=format&q=90"
          alt="Meridian platform"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.45) saturate(0.65)',
          }}
        />
        {/* Directional vignette — heavier on left so content reads clearly */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(13,13,16,0.96) 0%, rgba(13,13,16,0.7) 45%, rgba(13,13,16,0.15) 75%, rgba(13,13,16,0.05) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,16,0.6) 0%, transparent 40%)',
        }} />

        {/* Story steps — overlaid on left */}
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 600 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {steps.map((step, i) => (
              <div key={step.label}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: '28px 0', borderTop: '1px solid rgba(240,237,232,0.1)',
                  cursor: 'pointer',
                  opacity: activeStep === i ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: activeStep === i ? 14 : 0 }}>
                  <span style={{ ...S.mono, fontSize: 9, letterSpacing: '0.1em', color: '#5E5B56', textTransform: 'uppercase' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: activeStep === i ? '#C9A87C' : '#5E5B56', textTransform: 'uppercase' }}>
                    {step.label}
                  </span>
                </div>
                {activeStep === i && (
                  <>
                    <h3 style={{ ...S.serif, fontSize: 'clamp(20px, 2.2vw, 30px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14 }}>
                      {step.heading}
                    </h3>
                    <p style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.7 }}>
                      {step.body}
                    </p>
                  </>
                )}
              </div>
            ))}
            <div style={{ paddingTop: 28 }}>
              <button onClick={() => navigate('case-study')}
                style={{
                  ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56',
                  textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.12)',
                  paddingBottom: 4, transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                Full case study →
              </button>
            </div>
          </div>

          {/* Right side — metrics card anchored to bottom-right */}
          <div style={{ display: 'flex', alignItems: 'flex-end', padding: '40px 48px 48px' }}>
            <div style={{
              width: '100%',
              background: 'rgba(10,10,11,0.75)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(240,237,232,0.1)', borderRadius: 4, padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Meridian Capital</span>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em' }}>Q3 2024</span>
              </div>
              <div style={{ display: 'flex', gap: 32 }}>
                {[{ v: '340%', l: 'Faster reporting' }, { v: '$2.4B', l: 'AUM managed' }, { v: '0', l: 'Data incidents' }].map(m => (
                  <div key={m.l}>
                    <div style={{ ...S.serif, fontSize: 24, color: '#C9A87C', letterSpacing: '-0.02em' }}>{m.v}</div>
                    <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em', marginTop: 4, textTransform: 'uppercase' }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Services ────────────────────────────────────────── */
function ServicesSection({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const services = [
    {
      num: '01', name: 'Product Engineering',
      desc: 'From technical spec to production system. We take full ownership of complex digital products — architecture, implementation, and delivery.',
      tech: ['React', 'Node.js', 'NestJS', 'PostgreSQL', 'AWS'],
      link: 'SaaS, platforms, MVPs, web applications',
    },
    {
      num: '02', name: 'Frontend Engineering',
      desc: 'Precision interfaces that perform as well as they look. We build component systems, design implementations, and complex UI that holds up at scale.',
      tech: ['React', 'Next.js', 'Astro', 'TypeScript', 'Animation'],
      link: 'Component systems, design implementation, performance',
    },
    {
      num: '03', name: 'Backend & Architecture',
      desc: 'Systems designed to last. APIs built for evolution, not just delivery. We design backend architecture that scales with your ambitions.',
      tech: ['Node.js', 'NestJS', '.NET', 'PostgreSQL', 'Redis'],
      link: 'APIs, databases, microservices, system design',
    },
    {
      num: '04', name: 'AI & Automation',
      desc: 'LLM integrations that solve real problems. AI workflows that fit how your team already works — not solutions in search of a problem.',
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Python'],
      link: 'LLM integration, AI workflows, business automation',
    },
    {
      num: '05', name: 'Mobile Engineering',
      desc: 'React Native products built with the care of native. Shared logic, platform-appropriate UX, and deployment pipelines that ship continuously.',
      tech: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android'],
      link: 'Cross-platform mobile, native performance',
    },
    {
      num: '06', name: 'Commerce Engineering',
      desc: 'Headless storefronts and custom checkout experiences. We build commerce systems that convert — not just look good in a Figma file.',
      tech: ['Shopify', 'Hydrogen', 'Next.js', 'Stripe', 'Sanity'],
      link: 'Headless commerce, custom storefronts, DTC',
    },
  ]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
            — Capabilities
          </div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
            What we build.
          </h2>
        </div>
        <button onClick={() => navigate('services')}
          style={{ ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56', textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.12)', paddingBottom: 4, transition: 'color 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
          All services →
        </button>
      </div>

      <div style={{ padding: '0 48px' }}>
        {services.map((svc, i) => (
          <div key={svc.num}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              borderTop: '1px solid rgba(240,237,232,0.07)',
              padding: '24px 0',
              cursor: 'pointer',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1 }}>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', minWidth: 24 }}>{svc.num}</span>
                <span style={{
                  ...S.serif, fontSize: 'clamp(24px, 3vw, 36px)',
                  color: openIdx === i ? '#F0EDE8' : '#B8B4AC',
                  letterSpacing: '-0.02em', lineHeight: 1.1,
                  transition: 'color 0.2s ease',
                }}>
                  {svc.name}
                </span>
                <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em', display: openIdx === i ? 'none' : 'block' }}>
                  {svc.link}
                </span>
              </div>
              <span style={{
                ...S.mono, fontSize: 16,
                color: openIdx === i ? '#C9A87C' : '#5E5B56',
                transform: openIdx === i ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease, color 0.2s ease',
              }}>
                +
              </span>
            </div>
            {openIdx === i && (
              <div style={{ paddingLeft: 56, paddingTop: 20, paddingBottom: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.7 }}>{svc.desc}</p>
                <div>
                  <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Technologies</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {svc.tech.map(t => (
                      <span key={t} style={{ ...S.mono, fontSize: 10, color: '#B8B4AC', padding: '4px 10px', border: '1px solid rgba(240,237,232,0.1)', borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Two Developers ─────────────────────────────────── */
function TwoDevelopers({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()
  const devs = [
    {
      num: '01', name: 'Marcus Chen',
      role: 'Backend & Architecture',
      bio: "Marcus brings 7 years of production backend engineering — from financial systems processing billions of transactions to AI infrastructure serving millions of requests. He thinks in systems before writing a single line.",
      skills: ['Node.js', 'NestJS', '.NET', 'PostgreSQL', 'Redis', 'AWS', 'System Design'],
      projects: ['Meridian Capital', 'Orbital AI', 'Forta API'],
      gh: 'mchen-dev', li: 'marcuschen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format&q=80',
    },
    {
      num: '02', name: 'Soren Larsen',
      role: 'Frontend & Product Engineering',
      bio: "Soren has spent 6 years building interfaces that teams are proud to use. He brings product instincts to every engineering decision — and writes frontend code that other developers want to work inside.",
      skills: ['React', 'Next.js', 'TypeScript', 'Astro', 'React Native', 'Design Systems'],
      projects: ['Vessel Commerce', 'Orbital SaaS', 'Pragma Design'],
      gh: 'slarsen', li: 'sorenlarsen',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&auto=format&q=80',
    },
  ]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 80 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — The Studio
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05, maxWidth: 600 }}>
          You work with the people building your product.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {devs.map((dev, i) => (
            <div key={dev.name} style={{
              borderRight: i === 0 ? '1px solid rgba(240,237,232,0.07)' : 'none',
              borderTop: '1px solid rgba(240,237,232,0.07)',
            }}>
              {/* Portrait */}
              <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
                <img crossOrigin="anonymous" src={dev.image} alt={dev.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%) brightness(0.7)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,16,1) 0%, transparent 50%)' }} />
                <div style={{
                  position: 'absolute', top: 24, right: 24,
                  ...S.mono, fontSize: 'clamp(48px, 6vw, 80px)',
                  color: 'rgba(240,237,232,0.06)', letterSpacing: '-0.04em', fontStyle: 'italic',
                }}>
                  {dev.num}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '40px 48px' }}>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ ...S.serif, fontSize: 'clamp(28px, 3vw, 40px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8 }}>
                    {dev.name}
                  </h3>
                  <div style={{ ...S.mono, fontSize: 10, color: '#C9A87C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {dev.role}
                  </div>
                </div>
                <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 28 }}>{dev.bio}</p>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Stack</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {dev.skills.map(s => (
                      <span key={s} style={{ ...S.mono, fontSize: 9, color: '#B8B4AC', padding: '3px 8px', border: '1px solid rgba(240,237,232,0.08)', borderRadius: 2 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <a href={`https://github.com/${dev.gh}`} target="_blank" rel="noopener"
                    style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.1)', paddingBottom: 2, transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                    GitHub ↗
                  </a>
                  <a href={`https://linkedin.com/in/${dev.li}`} target="_blank" rel="noopener"
                    style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.1)', paddingBottom: 2, transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}

/* ── Tech Ecosystem ──────────────────────────────────── */
function TechEcosystem() {
  const ref = useReveal()
  const tech = {
    Frontend: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind'],
    Backend: ['Node.js', 'NestJS', '.NET', 'Python', 'REST / GraphQL'],
    Mobile: ['React Native', 'Expo', 'iOS', 'Android'],
    Data: ['PostgreSQL', 'Redis', 'MongoDB', 'Supabase'],
    AI: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Python'],
    Commerce: ['Shopify', 'Hydrogen', 'Stripe', 'Sanity'],
    Infrastructure: ['AWS', 'Vercel', 'Cloudflare', 'Docker', 'CI/CD'],
    CMS: ['Sanity', 'Contentful', 'Payload'],
  }

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — Technology
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
          A deliberate stack,<br />not an exhaustive one.
        </h2>
      </div>

      <div style={{ padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {Object.entries(tech).map(([cat, items], ci) => (
              <div key={cat}
                style={{ padding: '32px 28px', borderRight: ci % 4 !== 3 ? '1px solid rgba(240,237,232,0.07)' : 'none', borderBottom: ci < 4 ? '1px solid rgba(240,237,232,0.07)' : 'none' }}>
                <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.14em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
                  {cat}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(item => (
                    <span key={item} style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.4 }}>{item}</span>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Process ─────────────────────────────────────────── */
function Process() {
  const ref = useReveal()
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { num: '01', label: 'Discover', desc: 'We map your domain, users, constraints, and goals. No assumptions. Two days of questions before a single technical decision.' },
    { num: '02', label: 'Architect', desc: 'We design the system before building it. Data models, API boundaries, infrastructure decisions, technology choices — documented clearly.' },
    { num: '03', label: 'Prototype', desc: 'Critical paths tested before they are built at scale. We validate product decisions early when changes are cheap.' },
    { num: '04', label: 'Build', desc: 'Iterative two-week cycles. Regular demos. Continuous deployment. You always have working software to evaluate.' },
    { num: '05', label: 'Launch', desc: 'Production readiness includes monitoring, alerting, documentation, and knowledge transfer — not just deployment.' },
    { num: '06', label: 'Iterate', desc: 'Software is never finished. We support post-launch evolution, performance improvements, and feature development.' },
  ]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — How we work
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
          A process built<br />for serious work.
        </h2>
      </div>

      <div style={{ padding: '0 48px' }}>
        {steps.map((step, i) => (
          <div key={step.num}
            onMouseEnter={() => setActiveStep(i)}
            style={{ borderTop: '1px solid rgba(240,237,232,0.07)', padding: '28px 0', display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 32, alignItems: 'center', cursor: 'default', transition: 'background 0.2s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${activeStep === i ? '#C9A87C' : 'rgba(240,237,232,0.2)'}`, background: activeStep === i ? '#C9A87C' : 'transparent', transition: 'all 0.3s ease' }} />
              <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em' }}>{step.num}</span>
            </div>
            <span style={{ ...S.serif, fontSize: 'clamp(20px, 2.5vw, 28px)', color: activeStep === i ? '#F0EDE8' : '#5E5B56', letterSpacing: '-0.01em', transition: 'color 0.3s ease' }}>
              {step.label}
            </span>
            <p style={{ ...S.sans, fontSize: 13, color: activeStep === i ? '#B8B4AC' : '#3D3A37', lineHeight: 1.6, transition: 'color 0.3s ease', maxWidth: 500 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Why Two Devs ────────────────────────────────────── */
function WhyTwoDevs() {
  const ref = useReveal()
  const comparisons = [
    { aspect: 'Communication', agency: 'Account manager → PM → Lead dev → Your team', axiom: 'You → Marcus & Soren' },
    { aspect: 'Ownership', agency: 'Distributed across roles, accounts, and timezones', axiom: 'Full. Both engineers own the outcome.' },
    { aspect: 'Decision speed', agency: 'Approval chains, scope calls, change requests', axiom: 'Same conversation, immediate resolution' },
    { aspect: 'Senior involvement', agency: 'Seniors pitch. Juniors build. You find out late.', axiom: 'Senior engineering throughout. Always.' },
    { aspect: 'Product thinking', agency: 'Deliver the spec. Ask no questions.', axiom: 'Challenge assumptions early. Ship better products.' },
  ]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — The model
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
          Small team.<br />Senior execution.
        </h2>
      </div>

      <div style={{ padding: '0 48px' }}>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 32, paddingBottom: 20, borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
          <div />
          <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Traditional Agency</div>
          <div style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Axiom Studio</div>
        </div>
        {comparisons.map((row) => (
          <div key={row.aspect}
            style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 32, padding: '24px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', alignItems: 'start' }}>
            <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: 2 }}>{row.aspect}</div>
            <div style={{ ...S.sans, fontSize: 14, color: '#5E5B56', lineHeight: 1.6 }}>{row.agency}</div>
            <div style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.6 }}>{row.axiom}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Testimonials ────────────────────────────────────── */
function Testimonials() {
  const ref = useReveal()
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
          — From clients
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
          What they say.
        </h2>
      </div>

      <div style={{ padding: '0 48px' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div style={{ ...S.serif, fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#F0EDE8', lineHeight: 1.5, letterSpacing: '-0.01em', fontStyle: 'italic', marginBottom: 32 }}>
            "{t.quote}"
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 1, height: 40, background: '#C9A87C' }} />
            <div>
              <div style={{ ...S.sans, fontSize: 14, color: '#F0EDE8', fontWeight: 500, marginBottom: 2 }}>{t.person}</div>
              <div style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>{t.role} · {t.company}</div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 28 : 8, height: 8,
                borderRadius: i === idx ? 4 : '50%',
                background: i === idx ? '#C9A87C' : 'rgba(240,237,232,0.15)',
                transition: 'all 0.3s ease',
              }} />
          ))}
          <div style={{ marginLeft: 16, display: 'flex', gap: 8 }}>
            <button onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
              style={{ ...S.mono, fontSize: 12, color: '#5E5B56', padding: '6px 14px', border: '1px solid rgba(240,237,232,0.1)', borderRadius: 2, transition: 'all 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.1)'}>
              ←
            </button>
            <button onClick={() => setIdx((idx + 1) % testimonials.length)}
              style={{ ...S.mono, fontSize: 12, color: '#5E5B56', padding: '6px 14px', border: '1px solid rgba(240,237,232,0.1)', borderRadius: 2, transition: 'all 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.1)'}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Insights Preview ────────────────────────────────── */
function InsightsSection({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()

  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
      <div ref={ref} className="reveal" style={{ padding: '0 48px', marginBottom: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 16 }}>
            — Insights
          </div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(42px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05 }}>
            Engineering without<br />the fluff.
          </h2>
        </div>
        <button onClick={() => navigate('insights')}
          style={{ ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56', textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.12)', paddingBottom: 4, transition: 'color 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A87C'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5B56'}>
          All articles →
        </button>
      </div>

      <div style={{ padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {insights.map((art, i) => (
          <div key={art.title}
            data-cursor="Read"
            onClick={() => navigate('article')}
            style={{
              borderRight: i < 2 ? '1px solid rgba(240,237,232,0.07)' : 'none',
              borderTop: '1px solid rgba(240,237,232,0.07)',
              padding: '40px 36px', cursor: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0D0D10'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{art.category}</span>
              <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em' }}>{art.readTime} read</span>
            </div>
            <h3 style={{ ...S.serif, fontSize: 'clamp(18px, 2vw, 24px)', color: '#F0EDE8', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 20 }}>
              {art.title}
            </h3>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em' }}>{art.date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Final CTA ───────────────────────────────────────── */
function FinalCTA({ navigate }: { navigate: NavFn }) {
  const ref = useReveal()

  return (
    <section style={{ padding: '160px 48px', position: 'relative', overflow: 'hidden', background: '#0D0D10' }}>
      {/* Background text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...S.serif, fontSize: 'clamp(80px, 15vw, 220px)', color: 'rgba(240,237,232,0.02)',
        letterSpacing: '-0.05em', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        fontStyle: 'italic',
      }}>
        Let's build.
      </div>

      <div ref={ref} className="reveal" style={{ position: 'relative', maxWidth: 720 }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 32 }}>
          — Start here
        </div>
        <h2 style={{ ...S.serif, fontSize: 'clamp(48px, 6vw, 88px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 32 }}>
          Have something<br />ambitious in mind?
        </h2>
        <p style={{ ...S.sans, fontSize: 16, color: '#B8B4AC', lineHeight: 1.7, maxWidth: 480, marginBottom: 52 }}>
          We take a small number of projects each quarter. Tell us about yours — we'll respond within 48 hours with honest thoughts on whether we're the right fit.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
          <button onClick={() => navigate('start')}
            data-cursor="Start"
            style={{
              ...S.sans, fontSize: 13, fontWeight: 500,
              color: '#0A0A0B', background: '#F0EDE8',
              padding: '16px 32px', borderRadius: 2,
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C9A87C'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F0EDE8'}>
            Start a Project →
          </button>
          <a href="mailto:hello@axiom.studio"
            style={{
              ...S.mono, fontSize: 11, color: '#B8B4AC',
              padding: '16px 28px', border: '1px solid rgba(240,237,232,0.15)',
              borderRadius: 2, letterSpacing: '0.04em',
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.35)'; el.style.color = '#F0EDE8' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,237,232,0.15)'; el.style.color = '#B8B4AC' }}>
            hello@axiom.studio ↗
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5CB85C', display: 'block' }} className="animate-pulse-dot" />
          <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.08em' }}>
            Available · Responding within 48 hours
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── Home (composed) ─────────────────────────────────── */
export default function Home({ navigate }: { navigate: NavFn }) {
  return (
    <>
      <Hero navigate={navigate} />
      <StatsStrip />
      <SelectedWork navigate={navigate} />
      <FeaturedCaseStory navigate={navigate} />
      <ServicesSection navigate={navigate} />
      <TwoDevelopers navigate={navigate} />
      <TechEcosystem />
      <Process />
      <WhyTwoDevs />
      <Testimonials />
      <InsightsSection navigate={navigate} />
      <FinalCTA navigate={navigate} />
    </>
  )
}
