import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineCliConfig } from 'sanity/cli';

/**
 * Lets the Sanity CLI target this project, e.g.
 *
 *   npx sanity deploy                       # hosted Studio at <studioHost>.sanity.studio
 *   npx sanity dataset import seed.ndjson production --replace
 *
 * Values come from the same .env the website uses. The file is parsed here
 * as well because the CLI only auto-loads SANITY_STUDIO_* variables.
 */
function loadDotEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const line of readFileSync(resolve(process.cwd(), '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (match?.[1]) out[match[1]] = (match[2] ?? '').replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // no .env — rely on the environment
  }
  return out;
}

const file = loadDotEnv();
const env = (name: string) => process.env[name] || file[name] || undefined;

export default defineCliConfig({
  api: {
    projectId: env('SANITY_STUDIO_PROJECT_ID') ?? env('PUBLIC_SANITY_PROJECT_ID') ?? '',
    dataset: env('SANITY_STUDIO_DATASET') ?? env('PUBLIC_SANITY_DATASET') ?? 'production',
  },
  // Hostname of the Sanity-hosted Studio: https://<studioHost>.sanity.studio
  studioHost: env('SANITY_STUDIO_HOSTNAME') ?? 'madebyfn',
  // Application id assigned by Sanity on the first `sanity deploy`.
  deployment: { appId: 'kyn7bq2neyawq5fpif29k37m' },
});
