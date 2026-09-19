import { z } from 'zod';

/**
 * Server-side validation for the two Resend-backed forms.
 * The islands do lightweight client checks; these schemas are authoritative.
 */

/** Required string that reports a friendly message when the field is absent. */
const requiredString = (message: string, max = 120) => z.string().trim().min(1, message).max(max, 'That value is too long.').prefault('');

const email = z
  .string()
  .trim()
  .min(3, 'Enter your email address.')
  .max(254, 'That email address is too long.')
  .pipe(z.email('Enter a valid email address.'))
  .prefault('');

/** Fields every submission carries for abuse detection. */
const antiAbuse = {
  /** Honeypot — must stay empty. */
  website: z.string().max(0, 'Submission rejected.').optional().or(z.literal('')),
  /** Time the form was rendered; bots submit instantly. */
  renderedAt: z.number().int().positive().optional(),
};

export const newsletterSchema = z.object({
  email,
  source: z.string().trim().max(40).optional(),
  ...antiAbuse,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const inquirySchema = z.object({
  name: requiredString('Enter your name.').pipe(z.string().min(2, 'Enter your name.')),
  email,
  company: z.string().trim().max(120, 'Company is too long.').optional().or(z.literal('')),
  companyWebsite: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? (/^https?:\/\//i.test(v) ? v : `https://${v}`) : ''))
    .refine((v) => v === '' || z.url().safeParse(v).success, 'Enter a valid website URL.'),
  projectType: requiredString('Choose a project type.', 60),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  timeline: z.string().trim().max(60).optional().or(z.literal('')),
  description: requiredString('Tell us about your project.', 5000).pipe(
    z.string().min(20, 'Tell us a little more — at least a couple of sentences.'),
  ),
  referral: z.string().trim().max(200).optional().or(z.literal('')),
  ...antiAbuse,
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/** Flatten Zod issues into { field: message }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.map(String).join('.') || 'form';
    if (!out[path]) out[path] = issue.message;
  }
  return out;
}
