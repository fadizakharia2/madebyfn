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
      else u.searchParams.delete('h');
      u.searchParams.set('fit', height && fit === 'crop' ? 'crop' : 'max');
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
  width?: number;
  height?: number;
  alt: string;
  objectPosition: string;
  lqip?: string;
}

/**
 * Produce src + srcset.
 *
 * By default the image keeps its natural proportions (nothing is cropped).
 * Pass `aspect` (width / height) only where a crop is genuinely wanted,
 * such as circular avatars.
 */
export function responsiveImage(
  image: SanityImage,
  {
    widths = [480, 768, 1024, 1440, 1920],
    aspect,
    quality = 80,
  }: { widths?: number[]; aspect?: number; quality?: number } = {},
): ResponsiveImage {
  const naturalAspect = image.asset?.metadata?.dimensions?.aspectRatio ?? null;
  const largest = widths[widths.length - 1] ?? 1440;
  // A height is only sent to the image CDN when a crop was asked for; otherwise
  // the source is resized by width alone and nothing is cut off.
  const cropHeight = (w: number) => (aspect ? Math.round(w / aspect) : undefined);
  // width/height attributes reserve layout space; they describe proportions only.
  const attrRatio = aspect ?? naturalAspect;

  const srcset = widths
    .map((w) => `${imageUrl(image, { width: w, height: cropHeight(w), quality })} ${w}w`)
    .join(', ');

  const hotspot = image.hotspot;
  const objectPosition = hotspot
    ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
    : '50% 50%';

  return {
    src: imageUrl(image, { width: largest, height: cropHeight(largest), quality }),
    srcset,
    width: attrRatio ? largest : undefined,
    height: attrRatio ? Math.round(largest / attrRatio) : undefined,
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
