import type { ZodType } from 'zod';
import { fieldErrors } from './schemas';

/** Shared helpers for the JSON form endpoints. */

export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

/** Accepts JSON or classic form encoding so the endpoint also works without JS. */
export async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    try {
      const parsed = (await request.json()) as unknown;
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  if (type.includes('form')) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    form.forEach((value, key) => {
      out[key] = typeof value === 'string' ? value : '';
    });
    if (typeof out.renderedAt === 'string') out.renderedAt = Number(out.renderedAt) || undefined;
    return out;
  }
  return {};
}

export type Parsed<T> = { ok: true; data: T } | { ok: false; response: Response };

/** Validate the body and run the shared anti-abuse checks. */
export function parseSubmission<T extends { website?: string; renderedAt?: number }>(
  schema: ZodType<T>,
  body: Record<string, unknown>,
): Parsed<T> {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = fieldErrors(result.error);
    // A filled honeypot is a bot; answer generically without detail.
    if (errors.website) return { ok: false, response: json({ ok: false, message: 'Submission rejected.' }, 400) };
    return { ok: false, response: json({ ok: false, message: 'Please check the highlighted fields.', errors }, 422) };
  }

  const data = result.data;
  // Humans do not complete a form in under two seconds.
  if (typeof data.renderedAt === 'number' && Date.now() - data.renderedAt < 2000) {
    return { ok: false, response: json({ ok: false, message: 'Submission rejected.' }, 400) };
  }
  return { ok: true, data };
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
