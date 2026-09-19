/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly SANITY_API_TOKEN?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_SEGMENT_ID?: string;
  readonly RESEND_AUDIENCE_ID?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
