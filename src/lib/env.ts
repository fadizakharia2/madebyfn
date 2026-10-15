/**
 * Centralised, validated access to environment variables.
 *
 * Public values are inlined at build time by Vite. Secrets are read lazily
 * through `serverEnv()` so on-demand API routes pick them up from the
 * runtime environment on Vercel as well as from `.env` locally.
 */

const publicEnv = import.meta.env;

export const SITE_URL = (publicEnv.PUBLIC_SITE_URL || 'https://www.madebyfn.dev').replace(/\/$/, '');

export const sanityEnv = {
  projectId: publicEnv.PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: publicEnv.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: publicEnv.PUBLIC_SANITY_API_VERSION || '2025-06-01',
} as const;

/** True when a real Sanity project is configured. */
export const hasSanityProject = sanityEnv.projectId.length > 0;

function read(name: keyof ImportMetaEnv): string | undefined {
  const fromProcess =
    typeof process !== 'undefined' && process.env ? process.env[name as string] : undefined;
  return fromProcess || (publicEnv[name] as string | undefined) || undefined;
}

export interface ServerEnv {
  resendApiKey?: string;
  resendSegmentId?: string;
  resendFromEmail: string;
  contactEmail?: string;
  sanityToken?: string;
}

/** Secrets for server-side code (API routes, scripts). Never import in client code. */
export function serverEnv(): ServerEnv {
  return {
    resendApiKey: read('RESEND_API_KEY'),
    resendSegmentId: read('RESEND_SEGMENT_ID') ?? read('RESEND_AUDIENCE_ID'),
    resendFromEmail: read('RESEND_FROM_EMAIL') ?? 'madebyfn <onboarding@resend.dev>',
    contactEmail: read('CONTACT_EMAIL'),
    sanityToken: read('SANITY_API_TOKEN'),
  };
}
