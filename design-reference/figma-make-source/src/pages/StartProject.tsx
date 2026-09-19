import { useState } from 'react'
import { NavFn } from '../types'

const S = {
  mono: { fontFamily: "'JetBrains Mono', monospace" } as const,
  serif: { fontFamily: "'Instrument Serif', serif" } as const,
  sans: { fontFamily: "'Inter', sans-serif" } as const,
}

const projectTypes = [
  'Web Application', 'Mobile Application', 'SaaS Platform', 'AI / Automation',
  'E-commerce', 'API / Backend', 'Existing Product', 'Other',
]

const budgets = [
  'Under $5k', '$5k – $10k', '$10k – $25k', '$25k – $50k', '$50k+',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function StartProject({ navigate }: { navigate: NavFn }) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', website: '',
    projectType: '', budget: '', description: '', referral: '',
  })
  const [status, setStatus] = useState<FormState>('idle')
  const [focused, setFocused] = useState('')

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...S.sans, fontSize: 14, color: '#F0EDE8',
    background: 'transparent',
    border: `1px solid ${focused === name ? 'rgba(201,168,124,0.5)' : 'rgba(240,237,232,0.1)'}`,
    borderRadius: 2, padding: '14px 16px', width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    appearance: 'none',
  })

  const labelStyle: React.CSSProperties = {
    ...S.mono, fontSize: 9, letterSpacing: '0.12em', color: '#5E5B56',
    textTransform: 'uppercase', display: 'block', marginBottom: 8,
  }

  if (status === 'success') {
    return (
      <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid #5CB85C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: '#5CB85C', fontSize: 20 }}>
            ✓
          </div>
          <h1 style={{ ...S.serif, fontSize: 'clamp(36px, 5vw, 56px)', color: '#F0EDE8', letterSpacing: '-0.03em', marginBottom: 20 }}>
            We'll be in touch.
          </h1>
          <p style={{ ...S.sans, fontSize: 15, color: '#B8B4AC', lineHeight: 1.7, marginBottom: 40 }}>
            We read every inquiry carefully. Expect a thoughtful response within 48 hours — usually sooner.
          </p>
          <button onClick={() => navigate('home')}
            style={{ ...S.mono, fontSize: 10, letterSpacing: '0.1em', color: '#5E5B56', textTransform: 'uppercase', borderBottom: '1px solid rgba(240,237,232,0.12)', paddingBottom: 3 }}>
            Back to home →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', minHeight: 'calc(100vh - 80px)' }}>
        {/* Left: info */}
        <div style={{ padding: '80px 48px', background: '#0D0D10', borderRight: '1px solid rgba(240,237,232,0.07)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...S.mono, fontSize: 9, letterSpacing: '0.18em', color: '#5E5B56', textTransform: 'uppercase', marginBottom: 24 }}>— Let's talk</div>
          <h1 style={{ ...S.serif, fontSize: 'clamp(36px, 4vw, 52px)', color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
            Tell us about your project.
          </h1>
          <p style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', lineHeight: 1.75, marginBottom: 48 }}>
            We take a small number of projects each quarter. Tell us about yours and we'll respond with honest thoughts — including whether we're the right fit.
          </p>

          <div style={{ marginBottom: 40 }}>
            {[
              { icon: '●', label: 'Availability', value: 'Taking projects from Q1 2025' },
              { icon: '◐', label: 'Response time', value: 'Within 48 hours, usually sooner' },
              { icon: '○', label: 'Engagements', value: 'Project-based and ongoing retainer' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <span style={{ ...S.mono, fontSize: 12, color: '#C9A87C', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ ...S.sans, fontSize: 13, color: '#B8B4AC' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Or email directly</div>
            <a href="mailto:hello@axiom.studio"
              style={{ ...S.sans, fontSize: 14, color: '#B8B4AC', borderBottom: '1px solid rgba(240,237,232,0.12)', paddingBottom: 2 }}>
              hello@axiom.studio
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div style={{ padding: '80px 64px', overflowY: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                  placeholder="Jane Smith"
                  style={{ ...fieldStyle('name'), color: form.name ? '#F0EDE8' : '#5E5B56' }} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  placeholder="jane@company.com"
                  style={{ ...fieldStyle('email'), color: form.email ? '#F0EDE8' : '#5E5B56' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
              <div>
                <label style={labelStyle}>Company</label>
                <input type="text" value={form.company} onChange={e => set('company', e.target.value)}
                  onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                  placeholder="Acme Inc."
                  style={{ ...fieldStyle('company'), color: form.company ? '#F0EDE8' : '#5E5B56' }} />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input type="url" value={form.website} onChange={e => set('website', e.target.value)}
                  onFocus={() => setFocused('website')} onBlur={() => setFocused('')}
                  placeholder="https://acme.com"
                  style={{ ...fieldStyle('website'), color: form.website ? '#F0EDE8' : '#5E5B56' }} />
              </div>
            </div>

            {/* Project type — large selectable tiles */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Project type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {projectTypes.map(type => (
                  <button key={type} type="button" onClick={() => set('projectType', type)}
                    style={{
                      ...S.sans, fontSize: 12, fontWeight: form.projectType === type ? 500 : 400,
                      padding: '12px 8px', borderRadius: 2, textAlign: 'center',
                      border: `1px solid ${form.projectType === type ? 'rgba(201,168,124,0.6)' : 'rgba(240,237,232,0.1)'}`,
                      color: form.projectType === type ? '#C9A87C' : '#B8B4AC',
                      background: form.projectType === type ? 'rgba(201,168,124,0.08)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget — large selectable tiles */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Budget range</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {budgets.map(b => (
                  <button key={b} type="button" onClick={() => set('budget', b)}
                    style={{
                      ...S.mono, fontSize: 10, letterSpacing: '0.02em',
                      padding: '12px 8px', borderRadius: 2, textAlign: 'center',
                      border: `1px solid ${form.budget === b ? 'rgba(201,168,124,0.6)' : 'rgba(240,237,232,0.1)'}`,
                      color: form.budget === b ? '#C9A87C' : '#B8B4AC',
                      background: form.budget === b ? 'rgba(201,168,124,0.08)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Describe your project *</label>
              <textarea required value={form.description} onChange={e => set('description', e.target.value)}
                onFocus={() => setFocused('description')} onBlur={() => setFocused('')}
                rows={5}
                placeholder="Tell us what you're building, where you are in the process, and what kind of engagement you're looking for..."
                style={{ ...fieldStyle('description'), resize: 'vertical', color: form.description ? '#F0EDE8' : '#5E5B56' }} />
            </div>

            <div style={{ marginBottom: 40 }}>
              <label style={labelStyle}>How did you find us?</label>
              <input type="text" value={form.referral} onChange={e => set('referral', e.target.value)}
                onFocus={() => setFocused('referral')} onBlur={() => setFocused('')}
                placeholder="Word of mouth, Google, etc."
                style={{ ...fieldStyle('referral'), color: form.referral ? '#F0EDE8' : '#5E5B56' }} />
            </div>

            <button type="submit" disabled={status === 'loading'}
              style={{
                ...S.sans, fontSize: 13, fontWeight: 500,
                color: '#0A0A0B',
                background: status === 'loading' ? '#B8B4AC' : '#F0EDE8',
                padding: '16px 40px', borderRadius: 2,
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'background 0.2s ease',
                cursor: status === 'loading' ? 'wait' : 'pointer',
              }}
              onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#C9A87C' }}
              onMouseLeave={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#F0EDE8' }}>
              {status === 'loading' ? (
                <>Sending…</>
              ) : (
                <>Send Project Inquiry →</>
              )}
            </button>

            <p style={{ ...S.mono, fontSize: 9, color: '#5E5B56', letterSpacing: '0.06em', marginTop: 16 }}>
              We read every inquiry. Expect a response within 48 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
