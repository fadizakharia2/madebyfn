import { useId, useRef, useState, type SubmitEvent } from 'react';
import { routes } from '@/lib/routes';
import './forms.css';

export interface InquiryFormProps {
  projectTypes: string[];
  budgetRanges: string[];
  timelines: string[];
  descriptionPlaceholder: string;
  referralPlaceholder: string;
  submitLabel: string;
  footnote?: string;
  successHeading: string;
  successCopy?: string;
  successLinkLabel: string;
  errorMessage: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  company: string;
  companyWebsite: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  referral: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  companyWebsite: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  referral: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Project intake form island. Large selectable tiles for project type,
 * budget and timeline; inline validation; submits to /api/inquiry which
 * delivers the inquiry through Resend.
 */
export default function InquiryForm(props: InquiryFormProps) {
  const id = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const renderedAt = useRef(Date.now());
  const firstErrorRef = useRef<HTMLElement | null>(null);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!form.projectType) next.projectType = 'Choose a project type.';
    if (form.description.trim().length < 20) next.description = 'Tell us a little more — at least a couple of sentences.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    if (!validate()) {
      requestAnimationFrame(() => firstErrorRef.current?.focus());
      return;
    }

    setStatus('loading');
    setServerMessage('');
    const honeypot = (event.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    try {
      const res = await fetch(routes.api.inquiry, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot, renderedAt: renderedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };

      if (res.ok && data.ok) {
        setStatus('success');
        return;
      }
      if (data.errors) setErrors(data.errors as Partial<Record<keyof FormState, string>>);
      setStatus('error');
      setServerMessage(data.message || props.errorMessage);
    } catch {
      setStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="form-success__icon" aria-hidden="true">✓</div>
        <h2 className="form-success__title">{props.successHeading}</h2>
        {props.successCopy && <p className="form-success__copy">{props.successCopy}</p>}
        <a href={routes.home} className="text-link">
          {props.successLinkLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  const field = (key: keyof FormState, label: string, opts: { type?: string; placeholder?: string; required?: boolean; autoComplete?: string } = {}) => {
    const error = errors[key];
    const inputId = `${id}-${key}`;
    return (
      <div>
        <label htmlFor={inputId} className="field-label">
          {label}
          {opts.required && <span className="field-label__required"> *</span>}
        </label>
        <input
          id={inputId}
          name={key}
          type={opts.type ?? 'text'}
          className="field"
          placeholder={opts.placeholder}
          autoComplete={opts.autoComplete}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-required={opts.required || undefined}
          ref={(el) => {
            if (error && !firstErrorRef.current) firstErrorRef.current = el;
          }}
          disabled={status === 'loading'}
        />
        {error && (
          <p id={`${inputId}-error`} className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };

  const tiles = (key: 'projectType' | 'budget' | 'timeline', label: string, options: string[], cols: 4 | 5, mono = false, required = false) => {
    const error = errors[key];
    const groupId = `${id}-${key}`;
    return (
      <div className="inquiry__group" role="group" aria-labelledby={`${groupId}-label`} aria-describedby={error ? `${groupId}-error` : undefined}>
        <p id={`${groupId}-label`} className="field-label">
          {label}
          {required && <span className="field-label__required"> *</span>}
        </p>
        <div className={`tiles tiles--${cols}`} data-requires-js>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`tile${mono ? ' tile--mono' : ''}`}
              aria-pressed={form[key] === opt}
              onClick={() => set(key, form[key] === opt && !required ? '' : opt)}
              disabled={status === 'loading'}
            >
              {opt}
            </button>
          ))}
        </div>
        {/* Without JavaScript the tiles are inert, so offer a plain select. */}
        <noscript>
          <select name={key} className="field" aria-labelledby={`${groupId}-label`} required={required} defaultValue="">
            <option value="">{required ? 'Choose one' : 'No preference'}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </noscript>
        {error && (
          <p id={`${groupId}-error`} className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };

  firstErrorRef.current = null;

  return (
    <form className="inquiry" action={routes.api.inquiry} method="post" onSubmit={onSubmit} noValidate>
      {/* Read by the server when the form posts without JavaScript. */}
      <input type="hidden" name="renderedAt" value={renderedAt.current} suppressHydrationWarning readOnly />
      <div className="inquiry__grid">
        {field('name', 'Name', { placeholder: 'Jane Smith', required: true, autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', placeholder: 'jane@company.com', required: true, autoComplete: 'email' })}
      </div>
      <div className="inquiry__grid inquiry__group">
        {field('company', 'Company', { placeholder: 'Acme Inc.', autoComplete: 'organization' })}
        {field('companyWebsite', 'Website', { type: 'url', placeholder: 'https://acme.com', autoComplete: 'url' })}
      </div>

      {tiles('projectType', 'Project type', props.projectTypes, 4, false, true)}
      {props.budgetRanges.length > 0 && tiles('budget', 'Budget range', props.budgetRanges, 5, true)}
      {props.timelines.length > 0 && tiles('timeline', 'Timeline', props.timelines, 4, false)}

      <div className="inquiry__group inquiry__group--tight">
        <label htmlFor={`${id}-description`} className="field-label">
          Describe your project<span className="field-label__required"> *</span>
        </label>
        <textarea
          id={`${id}-description`}
          name="description"
          className="field"
          rows={5}
          placeholder={props.descriptionPlaceholder}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? `${id}-description-error` : undefined}
          aria-required
          disabled={status === 'loading'}
        />
        {errors.description && (
          <p id={`${id}-description-error`} className="field-error" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div className="inquiry__group" style={{ marginBottom: 'var(--space-10)' }}>
        {field('referral', 'How did you find us?', { placeholder: props.referralPlaceholder })}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--primary btn--xl inquiry__submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="inquiry__spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            {props.submitLabel} <span className="btn__arrow" aria-hidden="true">→</span>
          </>
        )}
      </button>

      {status === 'error' && serverMessage && (
        <p className="inquiry__error" role="alert">
          {serverMessage}
        </p>
      )}

      {props.footnote && <p className="form-note">{props.footnote}</p>}
    </form>
  );
}
