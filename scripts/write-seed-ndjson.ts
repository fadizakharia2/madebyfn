/**
 * Emit the seed dataset as NDJSON for the Sanity CLI importer:
 *
 *   npm run sanity:export-seed
 *   npx sanity dataset import seed.ndjson production --replace
 *
 * Image objects carry `_sanityAsset: "image@https://…"`, which the importer
 * downloads and uploads as real assets.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedDocuments } from './seed/content.ts';

const out = resolve(process.cwd(), 'seed.ndjson');
const lines = seedDocuments.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
writeFileSync(out, lines, 'utf8');
console.log(`Wrote ${seedDocuments.length} documents to ${out}`);
