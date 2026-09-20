import { createClient, type SanityClient } from '@sanity/client';
import { hasSanityProject, sanityEnv } from '../env';
import { resolveTokens } from '../tokens';

/**
 * Content access for the whole site.
 *
 * With a configured Sanity project every query goes to the Content Lake.
 * Without one (fresh clone, CI preview) the same GROQ queries are evaluated
 * in-process by groq-js against the seed dataset in scripts/seed, so the
 * frontend exercises identical projections either way. Production builds
 * refuse the fallback unless ALLOW_SEED_FALLBACK=true is set explicitly.
 */

type Params = Record<string, unknown>;

let client: SanityClient | null = null;
let warned = false;

function getClient(): SanityClient {
  if (!client) {
    client = createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: false,
      perspective: 'published',
    });
  }
  return client;
}

async function evaluateLocally<T>(query: string, params: Params): Promise<T> {
  const allowFallback =
    !import.meta.env.PROD ||
    (typeof process !== 'undefined' && process.env.ALLOW_SEED_FALLBACK === 'true');

  if (!allowFallback) {
    throw new Error(
      'PUBLIC_SANITY_PROJECT_ID is not set. Configure Sanity (see README) or set ALLOW_SEED_FALLBACK=true to build from the local seed dataset.',
    );
  }

  if (!warned) {
    warned = true;
    console.warn(
      '[sanity] PUBLIC_SANITY_PROJECT_ID is not set — evaluating GROQ against the local seed dataset (scripts/seed/content.ts).',
    );
  }

  const [{ parse, evaluate }, { seedDocuments }] = await Promise.all([
    import('groq-js'),
    import('../../../scripts/seed/content.ts'),
  ]);

  const tree = parse(query);
  const value = await evaluate(tree, { dataset: seedDocuments, params });
  return (await value.get()) as T;
}

/** Run a GROQ query and return its typed result. */
export async function fetchQuery<T>(query: string, params: Params = {}): Promise<T> {
  const result = hasSanityProject
    ? await getClient().fetch<T>(query, params)
    : await evaluateLocally<T>(query, params);
  // {quarter} / {year} tokens typed in the Studio become real dates here.
  return resolveTokens(result);
}

export { hasSanityProject };
