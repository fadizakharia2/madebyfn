/**
 * Date tokens editors can type into any text field in the Studio:
 *
 *   {quarter}  →  "Q3 2026"   (the current calendar quarter)
 *   {year}     →  "2026"
 *
 * They are resolved when the site is built, so "Available for {quarter}"
 * never goes stale as long as the site is rebuilt at least once a quarter
 * (any publish in Sanity triggers a rebuild).
 */

export function currentQuarter(date = new Date()): string {
  return `Q${Math.floor(date.getUTCMonth() / 3) + 1} ${date.getUTCFullYear()}`;
}

export function resolveTokenString(text: string, date = new Date()): string {
  if (!text.includes('{')) return text;
  return text
    .replace(/\{quarter\}/gi, currentQuarter(date))
    .replace(/\{year\}/gi, String(date.getUTCFullYear()));
}

/** Resolve tokens in every string of a query result. */
export function resolveTokens<T>(value: T, date = new Date()): T {
  if (typeof value === 'string') return resolveTokenString(value, date) as T;
  if (Array.isArray(value)) return value.map((item) => resolveTokens(item, date)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) out[key] = resolveTokens(v, date);
    return out as T;
  }
  return value;
}
