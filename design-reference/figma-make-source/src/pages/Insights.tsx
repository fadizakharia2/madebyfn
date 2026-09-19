import { useState } from 'react'
import { NavFn } from '../types'
import { useReveal } from '../hooks/useReveal'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const articles = [
  { cat: 'Architecture', title: 'Why we stopped using microservices for early-stage SaaS', excerpt: "Microservices solve problems you don't have yet — and create problems you don't expect. A case for starting with a well-structured monolith.", date: 'Nov 14, 2024', read: '8 min', author: 'Marcus Chen', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=80', featured: true },
  { cat: 'AI', title: 'Practical LLM integration patterns that actually work in production', excerpt: 'Beyond the prototype. The architectural patterns, failure modes, and trade-offs of building LLM-powered features at scale.', date: 'Oct 28, 2024', read: '12 min', author: 'Marcus Chen', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format&q=80', featured: false },
  { cat: 'Product', title: 'The technical spec review that prevents expensive rework', excerpt: 'A structured process for finding product specification problems before they become engineering problems.', date: 'Sep 15, 2024', read: '6 min', author: 'Soren Larsen', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80', featured: false },
  { cat: 'Frontend', title: 'Component API design: the decisions that outlast your designs', excerpt: "The choices you make when designing component interfaces will constrain your team for years. Here's how to make them carefully.", date: 'Aug 30, 2024', read: '10 min', author: 'Soren Larsen', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format&q=80', featured: false },
  { cat: 'Performance', title: 'PostgreSQL query optimization: the patterns we use every week', excerpt: 'Not theoretical. The specific index strategies, query patterns, and diagnostic approaches we apply to real production databases.', date: 'Aug 12, 2024', read: '14 min', author: 'Marcus Chen', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80', featured: false },
]

const categories = ['All', 'Architecture', 'AI', 'Product', 'Frontend', 'Performance']

export default function Insights({ navigate }: { navigate: NavFn }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useReveal()

  const filtered = articles.filter(a => activeCategory === 'All' || a.cat === activeCategory)
  const featured = articles.find(a => a.featured)
  const rest = filtered.filter(a => !a.featured || activeCategory !== 'All')

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '80px 48px 64px', borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 20 }}>
          — Knowledge
        </div>
        <h1 style={{ ...S.serif, fontSize: 'clamp(52px, 7vw, 100px)', color: '#F0EDE8', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 40 }}>
          Insights
        </h1>
        <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, maxWidth: 540 }}>
          Technical writing from two engineers with production experience. No thought leadership. No content marketing. Just things we've learned by building.
        </p>
      </div>

      {/* Categories */}
      <div ref={ref} className="reveal" style={{ padding: '24px 48px', borderBottom: '1px solid rgba(240,237,232,0.07)', background: '#0D0D10', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{
              ...S.mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 2,
              border: `1px solid ${activeCategory === cat ? 'rgba(201,168,124,0.5)' : 'rgba(240,237,232,0.08)'}`,
              color: activeCategory === cat ? '#C9A87C' : '#5E5B56',
              background: activeCategory === cat ? 'rgba(201,168,124,0.08)' : 'transparent',
              transition: 'all 0.2s ease',
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {activeCategory === 'All' && featured && (
        <div
          data-cursor="Read"
          onClick={() => navigate('article')}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', cursor: 'none', borderBottom: '1px solid rgba(240,237,232,0.07)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0D0D10'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
          <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
            <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(0.7)' }} />
            <div style={{ position: 'absolute', top: 24, left: 24 }}>
              <span style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(10,10,11,0.6)', borderRadius: 2 }}>
                Featured
              </span>
            </div>
          </div>
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(240,237,232,0.07)' }}>
            <div style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{featured.cat}</div>
            <h2 style={{ ...S.serif, fontSize: 'clamp(24px, 3vw, 38px)', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20 }}>{featured.title}</h2>
            <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 32 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>{featured.author}</span>
              <span style={{ width: 1, height: 12, background: 'rgba(240,237,232,0.15)' }} />
              <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>{featured.date}</span>
              <span style={{ width: 1, height: 12, background: 'rgba(240,237,232,0.15)' }} />
              <span style={{ ...S.mono, fontSize: 10, color: '#5E5B56', letterSpacing: '0.04em' }}>{featured.read} read</span>
            </div>
          </div>
        </div>
      )}

      {/* Article grid */}
      <div style={{ padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
          {(activeCategory === 'All' ? rest : filtered).map((art, i) => (
            <div key={art.title}
              data-cursor="Read"
              onClick={() => navigate('article')}
              style={{
                borderRight: i % 2 === 0 ? '1px solid rgba(240,237,232,0.07)' : 'none',
                borderBottom: '1px solid rgba(240,237,232,0.07)',
                padding: '40px 36px', cursor: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0D0D10'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ ...S.mono, fontSize: 9, color: '#C9A87C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{art.cat}</span>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em' }}>{art.read} read</span>
              </div>
              <h3 style={{ ...S.serif, fontSize: 'clamp(18px, 2vw, 24px)', color: '#F0EDE8', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 14 }}>{art.title}</h3>
              <p style={{ ...S.sans, fontSize: 13, color: '#B8B4AC', lineHeight: 1.65, marginBottom: 20 }}>{art.excerpt}</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.04em' }}>{art.author}</span>
                <span style={{ ...S.mono, fontSize: 9, color: '#3D3A37' }}>·</span>
                <span style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.04em' }}>{art.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
