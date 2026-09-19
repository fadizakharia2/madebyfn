import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityEnv } from '../env';
import type { SanityImage } from './types';

/**
 * Image URL helpers.
 *
 * Real Sanity assets go through the Sanity image CDN with hotspot/crop
 * honoured. Seed documents that have not been imported yet carry a
 * `_sanityAsset: "image@https://…"` marker (the Sanity import convention);
 * those resolve to the remote URL so the local fallback dataset renders.
 */

export interface ImageOptions {
  width: number;
  height?: number;
  quality?: number;
  fit?: 'crop' | 'max';
}

const builder = createImageUrlBuilder({
  projectId: sanityEnv.projectId || 'placeholder',
  dataset: sanityEnv.dataset,
});

function externalUrl(image: SanityImage): string | null {
  const marker = image.externalUrl;
  if (!marker) return null;
  return marker.replace(/^image@/, '');
}

function withUnsplashParams(url: string, { width, height, quality = 80, fit = 'crop' }: ImageOptions): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('unsplash.com')) {
      u.searchParams.set('w', String(width));
      if (height) u.searchParams.set('h', String(height));
      u.searchParams.set('fit', fit === 'crop' ? 'crop' : 'max');
      u.searchParams.set('auto', 'format');
      u.searchParams.set('q', String(quality));
    }
    return u.toString();
  } catch {
    return url;
  }
}

/** True when the image has a usable source. */
export function hasImage(image: SanityImage | null | undefined): image is SanityImage {
  return Boolean(image && (image.asset?._id || image.externalUrl));
}

/** Build a single URL for an image at the requested size. */
export function imageUrl(image: SanityImage, options: ImageOptions): string {
  if (image.asset?._id) {
    let b = builder
      .image({ asset: image.asset, hotspot: image.hotspot ?? undefined, crop: image.crop ?? undefined })
      .width(options.width)
      .auto('format')
      .quality(options.quality ?? 80);
    if (options.height) b = b.height(options.height);
    b = b.fit(options.fit ?? 'crop');
    return b.url();
  }
  const url = externalUrl(image);
  if (url) return withUnsplashParams(url, options);
  return '';
}

export interface ResponsiveImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  objectPosition: string;
  lqip?: string;
}

/**
 * Produce src + srcset for a given rendered aspect ratio.
 * `widths` are the candidate pixel widths; `aspect` is width / height.
 */
export function responsiveImage(
  image: SanityImage,
  {
    widths = [480, 768, 1024, 1440, 1920],
    aspect,
    quality = 80,
  }: { widths?: number[]; aspect?: number; quality?: number } = {},
): ResponsiveImage {
  const naturalAspect = image.asset?.metadata?.dimensions?.aspectRatio ?? 1.5;
  const ratio = aspect ?? naturalAspect;
  const largest = widths[widths.length - 1] ?? 1440;
  const heightFor = (w: number) => Math.round(w / ratio);

  const srcset = widths
    .map((w) => `${imageUrl(image, { width: w, height: heightFor(w), quality })} ${w}w`)
    .join(', ');

  const hotspot = image.hotspot;
  const objectPosition = hotspot
    ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
    : '50% 50%';

  return {
    src: imageUrl(image, { width: largest, height: heightFor(largest), quality }),
    srcset,
    width: largest,
    height: heightFor(largest),
    alt: image.alt ?? '',
    objectPosition,
    lqip: image.asset?.metadata?.lqip ?? undefined,
  };
}

/** Absolute URL for OpenGraph images (1200×630). */
export function ogImageUrl(image: SanityImage | null | undefined): string | null {
  if (!hasImage(image)) return null;
  return imageUrl(image, { width: 1200, height: 630, quality: 85 });
}
