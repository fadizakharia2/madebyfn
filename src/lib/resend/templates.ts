import type { InquiryInput } from '../forms/schemas';
import { escapeHtml } from '../forms/request';

/**
 * Transactional email templates. Plain, table-based HTML that renders in
 * every client, with a text alternative. Colours mirror the site palette.
 */

const shell = (title: string, body: string, footer: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0b;color:#f0ede8;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0b;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d0d10;border:1px solid rgba(240,237,232,0.09);border-radius:4px;">
<tr><td style="padding:28px 32px 20px;border-bottom:1px solid rgba(240,237,232,0.07);">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:-0.02em;color:#f0ede8;">madebyfn</span>
<span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#5e5b56;margin-left:10px;">Studio</span>
</td></tr>
<tr><td style="padding:32px;">${body}</td></tr>
<tr><td style="padding:20px 32px 28px;border-top:1px solid rgba(240,237,232,0.07);font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.06em;color:#5e5b56;">${footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const label = (text: string) =>
  `<div style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#5e5b56;margin-bottom:6px;">${escapeHtml(text)}</div>`;

const value = (text: string) =>
  `<div style="font-size:14px;line-height:1.6;color:#b8b4ac;margin-bottom:20px;white-space:pre-wrap;">${escapeHtml(text)}</div>`;

const heading = (text: string) =>
  `<h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;letter-spacing:-0.02em;line-height:1.15;color:#f0ede8;">${escapeHtml(text)}</h1>`;

export interface InquiryEmail {
  subject: string;
  html: string;
  text: string;
}

/** Notification to the studio inbox. */
export function inquiryNotification(input: InquiryInput, meta: { receivedAt: Date; ip: string; userAgent: string }): InquiryEmail {
  const rows: Array<[string, string | undefined]> = [
    ['Name', input.name],
    ['Email', input.email],
    ['Company', input.company || undefined],
    ['Website', input.companyWebsite || undefined],
    ['Project type', input.projectType],
    ['Budget', input.budget || undefined],
    ['Timeline', input.timeline || undefined],
    ['How they found us', input.referral || undefined],
  ];

  const fields = rows
    .filter((r): r is [string, string] => Boolean(r[1]))
    .map(([k, v]) => label(k) + value(v))
    .join('');

  const body =
    heading(`New project inquiry from ${input.name}`) +
    `<p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:#b8b4ac;">Reply directly to this email to respond — the reply-to is set to the sender.</p>` +
    fields +
    label('Project description') +
    `<div style="font-size:15px;line-height:1.75;color:#f0ede8;background:#111113;border:1px solid rgba(240,237,232,0.07);border-radius:4px;padding:20px;white-space:pre-wrap;">${escapeHtml(input.description)}</div>`;

  const footer = `Received ${meta.receivedAt.toISOString()} · IP ${escapeHtml(meta.ip)}<br>${escapeHtml(meta.userAgent.slice(0, 160))}`;

  const text = [
    `New project inquiry from ${input.name}`,
    '',
    ...rows.filter((r): r is [string, string] => Boolean(r[1])).map(([k, v]) => `${k}: ${v}`),
    '',
    'Project description:',
    input.description,
    '',
    `Received ${meta.receivedAt.toISOString()}`,
  ].join('\n');

  return {
    subject: `Project inquiry — ${input.name}${input.company ? ` (${input.company})` : ''} · ${input.projectType}`,
    html: shell('New project inquiry', body, footer),
    text,
  };
}

/** Confirmation to the person who wrote in. */
export function inquiryConfirmation(input: InquiryInput, opts: { studioName: string; responseTime: string; fromEmail: string }): InquiryEmail {
  const firstName = input.name.split(' ')[0] ?? input.name;
  const body =
    heading(`Thanks, ${firstName}. We've got it.`) +
    `<p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#b8b4ac;">Your inquiry has reached ${escapeHtml(opts.studioName)}. We read every message ourselves and reply with honest thoughts — including whether we're the right fit.</p>` +
    `<p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:#b8b4ac;">Expected response: <span style="color:#c9a87c;">${escapeHtml(opts.responseTime)}</span>.</p>` +
    label('What you sent') +
    `<div style="font-size:14px;line-height:1.7;color:#b8b4ac;background:#111113;border:1px solid rgba(240,237,232,0.07);border-radius:4px;padding:20px;white-space:pre-wrap;">${escapeHtml(input.description)}</div>`;

  const footer = `You are receiving this because you submitted the project form at ${escapeHtml(opts.studioName)}. Questions? Reply to this email.`;

  const text = [
    `Thanks, ${firstName}. We've got it.`,
    '',
    `Your inquiry has reached ${opts.studioName}. Expected response: ${opts.responseTime}.`,
    '',
    'What you sent:',
    input.description,
  ].join('\n');

  return { subject: `We received your inquiry — ${opts.studioName}`, html: shell('Inquiry received', body, footer), text };
}
