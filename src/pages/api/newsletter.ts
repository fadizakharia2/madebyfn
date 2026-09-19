import type { APIRoute } from 'astro';
import { newsletterSchema } from '@/lib/forms/schemas';
import { json, parseSubmission, readBody } from '@/lib/forms/request';
import { clientKey, rateLimit } from '@/lib/forms/rateLimit';
import { getResend, subscribeContact } from '@/lib/resend/client';

export const prerender = false;

/**
 * POST /api/newsletter — subscribe an address to the Resend contact list.
 * Responses are always JSON: { ok, code?, message? }.
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const limit = rateLimit(`newsletter:${clientKey(request, clientAddress)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return json({ ok: false, code: 'rate_limited', message: 'Too many attempts. Please try again in a few minutes.' }, 429, {
      'Retry-After': String(limit.retryAfterSeconds),
    });
  }

  const parsed = parseSubmission(newsletterSchema, await readBody(request));
  if (!parsed.ok) return parsed.response;

  const resend = getResend();
  if (!resend) {
    console.error('[newsletter] RESEND_API_KEY is not configured.');
    return json({ ok: false, code: 'not_configured', message: 'Newsletter signup is not available right now. Please email us instead.' }, 503);
  }

  try {
    const result = await subscribeContact(parsed.data.email, resend);
    switch (result.status) {
      case 'subscribed':
        return json({ ok: true, code: 'subscribed' });
      case 'already_subscribed':
        return json({ ok: true, code: 'already_subscribed' });
      case 'error':
        console.error('[newsletter] Resend error:', result.code, result.message);
        return json({ ok: false, code: result.code ?? 'provider_error', message: 'We could not subscribe that address right now. Please try again shortly.' }, 502);
    }
  } catch (error) {
    console.error('[newsletter] Unexpected error:', error);
    return json({ ok: false, code: 'server_error', message: 'Something went wrong on our side. Please try again shortly.' }, 500);
  }
};

export const GET: APIRoute = () => json({ ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
