import { Resend } from 'resend';
import { serverEnv } from '../env';

/**
 * Resend access for server code. Returns null when the API key is missing so
 * endpoints can respond with a clear configuration error instead of faking
 * success.
 */
let instance: Resend | null = null;

export function getResend(): Resend | null {
  const { resendApiKey } = serverEnv();
  if (!resendApiKey) return null;
  if (!instance) instance = new Resend(resendApiKey);
  return instance;
}

export type ContactResult =
  | { status: 'subscribed' }
  | { status: 'already_subscribed' }
  | { status: 'error'; message: string; code?: string };

/**
 * Subscribe an address. Contacts live in Resend; when a segment id is
 * configured the contact is added to it (Resend's successor to audiences).
 */
export async function subscribeContact(email: string, resend: Resend): Promise<ContactResult> {
  const { resendSegmentId } = serverEnv();

  // Duplicate check first so the caller can show an honest "already subscribed".
  const existing = await resend.contacts.get({ email }).catch(() => null);
  if (existing?.data) {
    if (existing.data.unsubscribed) {
      const updated = await resend.contacts.update({ email, unsubscribed: false });
      if (updated.error) return { status: 'error', message: updated.error.message, code: updated.error.name };
      return { status: 'subscribed' };
    }
    return { status: 'already_subscribed' };
  }

  const created = await resend.contacts.create(
    resendSegmentId ? { email, segments: [{ id: resendSegmentId }] } : { email },
  );

  if (created.error) {
    if (/already exists|duplicate/i.test(created.error.message)) return { status: 'already_subscribed' };
    return { status: 'error', message: created.error.message, code: created.error.name };
  }
  return { status: 'subscribed' };
}
