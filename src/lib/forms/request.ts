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

export interface ReplyBody {
  ok: boolean;
  code?: string;
  message?: string;
  errors?: Record<string, string>;
  [key: string]: unknown;
}

export type Reply = (body: ReplyBody, status?: number, headers?: Record<string, string>) => Response;

/**
 * Pick the response format for a submission. The islands post JSON and get
 * JSON back; a plain HTML form post (JavaScript unavailable) gets a small
 * HTML page with the outcome and a link back to the page it came from.
 */
export function replier(request: Request): Reply {
  const type = request.headers.get('content-type') ?? '';
  const accept = request.headers.get('accept') ?? '';
  if (type.includes('application/json') || accept.includes('application/json')) return json;

  const back = sameOriginReferer(request);
  return (body, status = 200, headers = {}) =>
    new Response(resultPage(body, back), {
      status,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
    });
}

function sameOriginReferer(request: Request): string {
  const referer = request.headers.get('referer');
  if (!referer) return '/';
  try {
    const from = new URL(referer);
    return from.origin === new URL(request.url).origin ? `${from.pathname}${from.search}` : '/';
  } catch {
    return '/';
  }
}

function resultPage(body: ReplyBody, back: string): string {
  const title = body.ok ? 'Thank you' : 'Something went wrong';
  const message = body.message ?? (body.ok ? 'Your submission was received.' : 'Please try again.');
  const errors = body.errors ? Object.values(body.errors) : [];
  const list = errors.length
    ? `<ul>${errors.map((e) => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0b;color:#f0ede8;font:16px/1.7 Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;padding:24px;box-sizing:border-box}
main{max-width:520px}
h1{font:400 36px/1.15 Georgia,'Times New Roman',serif;letter-spacing:-0.02em;margin:0 0 16px}
p,li{color:#b8b4ac}
a{color:#c9a87c}
</style>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)}</p>
${list}
<p><a href="${escapeHtml(body.ok ? '/' : back)}">${body.ok ? 'Back to the site' : 'Go back and try again'}</a></p>
</main>
</body>
</html>`;
}

export type Parsed<T> = { ok: true; data: T } | { ok: false; response: Response };

/** Validate the body and run the shared anti-abuse checks. */
export function parseSubmission<T extends { website?: string; renderedAt: number }>(
  schema: ZodType<T>,
  body: Record<string, unknown>,
  reply: Reply = json,
): Parsed<T> {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = fieldErrors(result.error);
    // A filled honeypot or a missing render timestamp is a bot; answer
    // generically without detail.
    if (errors.website || errors.renderedAt) return { ok: false, response: reply({ ok: false, message: 'Submission rejected.' }, 400) };
    return { ok: false, response: reply({ ok: false, message: 'Please check the highlighted fields.', errors }, 422) };
  }

  const data = result.data;
  // Humans do not complete a form in under two seconds (or before it rendered).
  if (Date.now() - data.renderedAt < 2000) {
    return { ok: false, response: reply({ ok: false, message: 'Submission rejected.' }, 400) };
  }
  return { ok: true, data };
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
