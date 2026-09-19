/**
 * Sliding-window rate limiter keyed by client address.
 *
 * State lives in the serverless instance's memory, so limits are enforced
 * per warm instance rather than globally. That is enough to blunt casual
 * abuse of the two form endpoints; pair it with Vercel's WAF rules or a
 * KV-backed limiter if traffic warrants it.
 */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0] ?? now;
    buckets.set(key, bucket);
    return { allowed: false, remaining: 0, retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.hits.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { allowed: true, remaining: limit - bucket.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client identifier behind Vercel's proxy. */
export function clientKey(request: Request, fallback: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || fallback || 'unknown';
  return ip;
}
