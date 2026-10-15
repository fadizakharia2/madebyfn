/**
 * Remove the placeholder (seed) content from a Sanity dataset.
 *
 *   npm run sanity:unseed            # delete seed content documents
 *   npm run sanity:unseed -- --dry   # report only
 *   npm run sanity:unseed -- --all   # also delete seed taxonomies, legal pages and singletons
 *
 * Only documents whose _id appears in scripts/seed/content.ts are removed, so
 * anything created by hand in the Studio is never deleted.
 *
 * By default the seed's *content* goes (projects, developers, clients,
 * testimonials, articles, FAQs) while its *vocabulary* stays (industries,
 * technologies, services, article categories), as do the legal pages and the
 * settings/page singletons.
 *
 * Sanity refuses to delete a document that is still referenced. So, in the
 * same transaction, every other document that points at a deleted one (your
 * own documents, their drafts, the singletons) has those references removed
 * first. Assets left unreferenced by the removal are deleted afterwards.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';
import { seedDocuments } from './seed/content.ts';

const SINGLETON_TYPES = new Set([
  'siteSettings',
  'navigation',
  'homepage',
  'workPage',
  'servicesPage',
  'studioPage',
  'insightsPage',
  'startProjectPage',
  'notFoundPage',
]);
const VOCABULARY_TYPES = new Set(['industry', 'technology', 'service', 'articleCategory', 'legalPage']);

function loadDotEnv() {
  try {
    for (const line of readFileSync(resolve(process.cwd(), '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (match?.[1] && process.env[match[1]] === undefined) {
        process.env[match[1]] = (match[2] ?? '').replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    // no .env — rely on the environment
  }
}

loadDotEnv();

const dry = process.argv.includes('--dry');
const all = process.argv.includes('--all');
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set (see .env.example).');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-06-01', useCdn: false });

// Real studio content that also lives in the seed. It is loaded into the live
// dataset, so it is never removed, even with --all.
const REAL_IDS = new Set([
  'developer-fadi-zakharia',
  'project-arc-recovery', 'project-thaleon', 'project-yg-garcia', 'project-inservice',
  'client-arc-recovery', 'client-thaleon', 'client-yg-garcia', 'client-inservice',
  'industry-publishing', 'industry-marketplace',
  'project-qrec', 'client-qrec', 'industry-sports',
]);

const targetIds = seedDocuments
  .filter((d) => !REAL_IDS.has(d._id))
  .filter((d) => all || (!SINGLETON_TYPES.has(d._type) && !VOCABULARY_TYPES.has(d._type)))
  .map((d) => d._id);

type Doc = Record<string, unknown> & { _id: string; _type: string };

/** Remove every reference to an id in `gone` from a value; returns undefined if the value itself is such a reference. */
function strip(value: unknown, gone: Set<string>, removed: { count: number }): unknown {
  if (Array.isArray(value)) {
    const out: unknown[] = [];
    for (const item of value) {
      const cleaned = strip(item, gone, removed);
      if (cleaned !== undefined) out.push(cleaned);
    }
    return out;
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj._ref === 'string' && gone.has(obj._ref)) {
      removed.count += 1;
      return undefined;
    }
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(obj)) {
      const cleaned = strip(v, gone, removed);
      if (cleaned !== undefined) out[key] = cleaned;
    }
    return out;
  }
  return value;
}

async function main() {
  console.log(`${dry ? '[dry run] ' : ''}Dataset ${projectId}/${dataset}`);

  const allIds = [...targetIds, ...targetIds.map((id) => `drafts.${id}`)];
  const existing: Array<{ _id: string; _type: string }> = await client.fetch('*[_id in $ids]{_id,_type}', { ids: allIds });
  if (existing.length === 0) {
    console.log('No seed documents found. Nothing to remove.');
    return;
  }

  const byType = new Map<string, number>();
  for (const d of existing) byType.set(d._type, (byType.get(d._type) ?? 0) + 1);
  console.log(`  deleting ${existing.length} seed documents:`);
  for (const [type, count] of [...byType].sort()) console.log(`    - ${type}: ${count}`);

  const gone = new Set(existing.map((d) => d._id));
  const referrers: Doc[] = await client.fetch('*[references($ids) && !(_id in $ids)]', { ids: [...gone] });

  const cleaned: Doc[] = [];
  for (const doc of referrers) {
    const removed = { count: 0 };
    const next = strip(doc, gone, removed) as Doc;
    if (removed.count === 0) continue;
    delete next._rev;
    delete next._updatedAt;
    delete next._createdAt;
    cleaned.push(next);
    const label = String(doc.name ?? doc.title ?? doc._type);
    console.log(`  unlinking ${removed.count} reference(s) from ${doc._type} "${label}" (${doc._id})`);
  }

  if (dry) return;

  const tx = client.transaction();
  for (const doc of cleaned) tx.createOrReplace(doc);
  for (const id of gone) tx.delete(id);
  await tx.commit();
  console.log(`Deleted ${gone.size} documents; updated ${cleaned.length} referencing documents.`);

  const orphanAssets: string[] = await client.fetch(
    '*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id)]) == 0]._id',
  );
  if (orphanAssets.length > 0) {
    const assetTx = client.transaction();
    for (const id of orphanAssets) assetTx.delete(id);
    await assetTx.commit();
    console.log(`Deleted ${orphanAssets.length} unreferenced assets.`);
  }

  console.log(
    all
      ? 'All seed documents removed. Run `npm run sanity:seed` to restore the seed, or create documents in the Studio.'
      : 'Seed content removed. Industries, technologies, services, article categories, legal pages and the page/settings documents were kept.',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
