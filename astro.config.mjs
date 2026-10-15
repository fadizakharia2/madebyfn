// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';
import path from 'node:path';
import { createRequire } from 'node:module';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2025-06-01';
const site = env.PUBLIC_SITE_URL || 'https://www.madebyfn.dev';

/**
 * The Sanity Studio is embedded at /admin. It can only be mounted when a
 * project id is configured; without one the site still builds from the
 * local seed dataset (see src/lib/sanity/client.ts) so the frontend can be
 * developed and QA'd before the Sanity project exists.
 */
const sanityIntegration = projectId
  ? [
      sanity({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        studioBasePath: '/admin',
      }),
    ]
  : [];

/**
 * Dev-only fix for the embedded Studio under Vite 8 (Astro 7).
 *
 * `@sanity/astro` aliases the bare `sanity` import (and `styled-components`)
 * to the package *directory* so only one copy is bundled. Vite 6's optimizer
 * resolved a directory through its package.json; Vite 8's rolldown-based
 * optimizer treats it as a file and fails with hundreds of MISSING_EXPORT
 * errors, leaving /admin blank. Pointing the alias at the real entry file
 * keeps the single-copy guarantee and lets the optimizer bundle the Studio.
 */
function sanityStudioAliasFix() {
  const require = createRequire(import.meta.url);
  const sanityEntry = require.resolve('sanity'); // …/node_modules/sanity/lib/index.js
  const styledEntry = path.join(
    path.dirname(require.resolve('styled-components/package.json')),
    'dist',
    'styled-components.browser.esm.js',
  );
  const aliases = [
    { find: /^sanity$/, replacement: sanityEntry },
    { find: /^styled-components$/, replacement: styledEntry },
  ];

  /** @param {unknown} list */
  const rewrite = (list) => {
    if (!Array.isArray(list)) return;
    for (const entry of list) {
      if (typeof entry.replacement !== 'string') continue;
      if (/[\\/]node_modules[\\/]sanity$/.test(entry.replacement)) entry.replacement = sanityEntry;
      else if (/[\\/]node_modules[\\/]styled-components$/.test(entry.replacement)) entry.replacement = styledEntry;
    }
  };

  /** @type {import('vite').Plugin} */
  const plugin = {
    name: 'madebyfn:sanity-studio-alias-fix',
    apply: 'serve',
    // Runs after @sanity/astro's "pre" plugin; later aliases are matched first.
    config: () => ({ resolve: { alias: aliases } }),
    configResolved(config) {
      rewrite(config.resolve?.alias);
      for (const env of Object.values(config.environments ?? {})) {
        rewrite(/** @type {{ alias?: unknown }} */ (env.resolve).alias);
      }
    },
  };
  return plugin;
}

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  prefetch: { defaultStrategy: 'hover' },
  vite: {
    plugins: [sanityStudioAliasFix()],
  },
  integrations: [
    react(),
    ...sanityIntegration,
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/api/'),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: ['300 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
});
