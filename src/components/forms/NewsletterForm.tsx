import { useId, useRef, useState, type SubmitEvent } from 'react';
import { routes } from '@/lib/routes';
import './forms.css';

interface Props {
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
  duplicateMessage?: string;
  privacyNote?: string;
  source?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup island. Submits to /api/newsletter (Resend contacts) and
 * reports every outcome honestly: success, duplicate, validation and provider
 * errors. Includes a honeypot and a render timestamp for abuse detection.
 */
export default function NewsletterForm({ placeholder, buttonLabel, successMessage, duplicateMessage, privacyNote, source = 'site' }: Props) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const renderedAt = useRef(Date.now());

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    const form = event.currentTarget;
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    const honeypot = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    try {
      const res = await fetch(routes.api.newsletter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: trimmed, website: honeypot, renderedAt: renderedAt.current, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; message?: string };

      if (res.ok && data.ok) {
        setStatus('success');
        setMessage(data.code === 'already_subscribed' ? duplicateMessage || successMessage : successMessage);
        setEmail('');
        return;
      }

      setStatus('error');
      setMessage(data.message || 'Something went wrong. Please try again in a moment.');
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <p className="form-status form-status--success" role="status" aria-live="polite">
        <span className="form-status__dot" aria-hidden="true" />
        {message}
      </p>
    );
  }

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="visually-hidden">
        Email address
      </label>
      <div className="newsletter__row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          className="field newsletter__input"
          aria-invalid={status === 'error' ? true : undefined}
          aria-describedby={message ? `${id}-message` : undefined}
          disabled={status === 'loading'}
        />
        <button type="submit" className="btn btn--primary btn--sm newsletter__submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      {/* Honeypot: hidden from humans, filled by bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {message && (
        <p id={`${id}-message`} className={`form-status ${status === 'error' ? 'form-status--error' : ''}`} role="alert">
          {message}
        </p>
      )}
      {!message && privacyNote && <p className="form-note">{privacyNote}</p>}
    </form>
  );
}
