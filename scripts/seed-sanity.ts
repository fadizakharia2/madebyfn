/**
 * Seed a Sanity dataset directly through the API (alternative to the CLI
 * importer). Requires PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET and a
 * SANITY_API_TOKEN with Editor rights in .env.
 *
 *   npm run sanity:seed
 *   npm run sanity:seed -- --only=project-arc-recovery,client-arc-recovery
 *
 * Existing documents with the same _id are replaced. Images referenced by
 * `_sanityAsset` markers are downloaded and uploaded as assets first.
 *
 * With --only, just the listed documents are replaced; any document they
 * reference that the dataset lacks is created from the seed, and nothing
 * else in the dataset is touched. Use it against a live dataset.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';
import { seedDocuments, type SeedDocument } from './seed/content.ts';

function loadDotEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match) continue;
      const [, name, value] = match;
      if (name && process.env[name] === undefined) {
        process.env[name] = (value ?? '').replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    // no .env file — rely on the environment
  }
}

loadDotEnv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set (see .env.example).');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-06-01', useCdn: false });

const assetCache = new Map<string, string>();

async function uploadAsset(kind: 'image' | 'file', url: string): Promise<string> {
  const cacheKey = `${kind}:${url}`;
  const cached = assetCache.get(cacheKey);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = url.split('/').pop()?.split('?')[0] ?? (kind === 'image' ? 'image.jpg' : 'file.bin');
  const asset = await client.assets.upload(kind, buffer, { filename });
  assetCache.set(cacheKey, asset._id);
  console.log(`  uploaded ${kind} ${asset._id}`);
  return asset._id;
}

async function resolveAssets(value: unknown): Promise<unknown> {
  if (Array.isArray(value)) return Promise.all(value.map(resolveAssets));
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const marker = typeof obj._sanityAsset === 'string' ? obj._sanityAsset : null;
    if (marker && (marker.startsWith('image@') || marker.startsWith('file@'))) {
      const kind = marker.startsWith('image@') ? 'image' : 'file';
      const { _sanityAsset, ...rest } = obj;
      const assetId = await uploadAsset(kind, marker.slice(kind.length + 1));
      return { ...(await resolveAssets(rest) as object), asset: { _type: 'reference', _ref: assetId } };
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = await resolveAssets(v);
    return out;
  }
  return value;
}

const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',').filter(Boolean)) : null;

function referencedIds(value: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((v) => referencedIds(v, out));
  else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj._type === 'reference' && typeof obj._ref === 'string') out.add(obj._ref);
    Object.values(obj).forEach((v) => referencedIds(v, out));
  }
  return out;
}

async function main() {
  const byId = new Map(seedDocuments.map((doc) => [doc._id, doc]));
  let replace: SeedDocument[] = seedDocuments;
  let createMissing: SeedDocument[] = [];
  if (only) {
    const unknown = [...only].filter((id) => !byId.has(id));
    if (unknown.length) throw new Error(`Not in the seed: ${unknown.join(', ')}`);
    replace = [...only].map((id) => byId.get(id)!);
    const refs = new Set<string>();
    replace.forEach((doc) => referencedIds(doc, refs));
    const wanted = [...refs].filter((id) => !only.has(id) && byId.has(id));
    const existing = new Set<string>(await client.fetch('*[_id in $ids]._id', { ids: wanted }));
    createMissing = wanted.filter((id) => !existing.has(id)).map((id) => byId.get(id)!);
  }
  console.log(`Seeding ${replace.length} documents into ${projectId}/${dataset}…`);
  if (createMissing.length) console.log(`Creating missing references: ${createMissing.map((d) => d._id).join(', ')}`);
  const prepared: SeedDocument[] = [];
  for (const doc of replace) prepared.push((await resolveAssets(doc)) as SeedDocument);
  const missing: SeedDocument[] = [];
  for (const doc of createMissing) missing.push((await resolveAssets(doc)) as SeedDocument);
  // createOrReplace within one transaction tolerates forward refs.
  const tx = client.transaction();
  for (const doc of missing) tx.createIfNotExists(doc as SeedDocument & { _id: string; _type: string });
  for (const doc of prepared) tx.createOrReplace(doc as SeedDocument & { _id: string; _type: string });
  await tx.commit();
  console.log('Done. Open the Studio at /admin to review the content.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
