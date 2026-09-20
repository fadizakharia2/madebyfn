import type { APIRoute } from 'astro';
import { inquirySchema } from '@/lib/forms/schemas';
import { json, parseSubmission, readBody } from '@/lib/forms/request';
import { clientKey, rateLimit } from '@/lib/forms/rateLimit';
import { getResend } from '@/lib/resend/client';
import { inquiryConfirmation, inquiryNotification } from '@/lib/resend/templates';
import { serverEnv } from '@/lib/env';
import { getSiteSettings } from '@/lib/sanity/loaders';

export const prerender = false;

/**
 * POST /api/inquiry — deliver a project inquiry to the studio inbox through
 * Resend and send a confirmation to the sender (best effort).
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const key = clientKey(request, clientAddress);
  const limit = rateLimit(`inquiry:${key}`, { limit: 3, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return json({ ok: false, code: 'rate_limited', message: 'Too many submissions. Please try again in a few minutes or email us directly.' }, 429, {
      'Retry-After': String(limit.retryAfterSeconds),
    });
  }

  const parsed = parseSubmission(inquirySchema, await readBody(request));
  if (!parsed.ok) return parsed.response;
  const input = parsed.data;

  const resend = getResend();
  const { contactEmail, resendFromEmail } = serverEnv();
  if (!resend || !contactEmail) {
    // Names only, never values. Pinpoints a typo, a missing Production scope,
    // or variables added after this deployment was built.
    const missing = [!resend && 'RESEND_API_KEY', !contactEmail && 'CONTACT_EMAIL'].filter(Boolean).join(', ');
    const visible = Object.keys(process.env).filter((k) => /^(RESEND_|CONTACT_)/.test(k)).join(', ') || 'none';
    console.error(`[inquiry] Missing environment variables: ${missing}. Visible RESEND_/CONTACT_ names in this deployment: ${visible}. VERCEL_ENV=${process.env.VERCEL_ENV ?? 'n/a'}`);
    return json({ ok: false, code: 'not_configured', message: 'The inquiry form is not available right now. Please email us directly.' }, 503);
  }

  const settings = await getSiteSettings().catch(() => null);
  const studioName = settings?.studioName ?? 'madebyfn';
  const responseTime = settings?.availability?.responseTime ?? 'within 48 hours';

  try {
    const notification = inquiryNotification(input, {
      receivedAt: new Date(),
      ip: key,
      userAgent: request.headers.get('user-agent') ?? '',
    });

    const sent = await resend.emails.send({
      from: resendFromEmail,
      to: [contactEmail],
      replyTo: input.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      headers: { 'X-Entity-Ref-ID': `inquiry-${Date.now()}` },
    });

    if (sent.error) {
      console.error('[inquiry] Resend error:', sent.error.name, sent.error.message);
      return json({ ok: false, code: sent.error.name, message: 'We could not send your inquiry right now. Please try again shortly or email us directly.' }, 502);
    }

    // Confirmation to the sender. On Resend's free tier without a verified
    // domain this is only deliverable to the account owner, so failure here
    // must not fail the inquiry itself.
    const confirmation = inquiryConfirmation(input, { studioName, responseTime, fromEmail: resendFromEmail });
    const confirmed = await resend.emails.send({
      from: resendFromEmail,
      to: [input.email],
      replyTo: contactEmail,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (confirmed.error) console.warn('[inquiry] Confirmation not sent:', confirmed.error.name, confirmed.error.message);

    return json({ ok: true, id: sent.data?.id ?? null, confirmationSent: !confirmed.error });
  } catch (error) {
    console.error('[inquiry] Unexpected error:', error);
    return json({ ok: false, code: 'server_error', message: 'Something went wrong on our side. Please try again shortly or email us directly.' }, 500);
  }
};

export const GET: APIRoute = () => json({ ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
