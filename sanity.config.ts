import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, SINGLETON_TYPES } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

/**
 * Studio configuration shared by both ways of running the Studio:
 *
 *  - embedded in the website at /admin (bundled by Astro, which exposes
 *    PUBLIC_* variables), and
 *  - hosted by Sanity via `npx sanity deploy` (bundled by the Sanity CLI,
 *    which exposes SANITY_STUDIO_* variables).
 */
function readEnv(...names: string[]): string | undefined {
  const meta = import.meta.env as Record<string, string | undefined>;
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  for (const name of names) {
    const value = meta?.[name] ?? proc?.[name];
    if (value) return value;
  }
  return undefined;
}

const projectId = readEnv('PUBLIC_SANITY_PROJECT_ID', 'SANITY_STUDIO_PROJECT_ID') ?? '';
const dataset = readEnv('PUBLIC_SANITY_DATASET', 'SANITY_STUDIO_DATASET') ?? 'production';

const singletonTypes = new Set<string>(SINGLETON_TYPES);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'madebyfn',
  title: 'madebyfn',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons cannot be duplicated, deleted or unpublished.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
