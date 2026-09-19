import type { PortableTextBlock, PortableTextSpan } from './types';

/** Split text on new lines so `\n` in CMS strings becomes explicit line breaks. */
export function lines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text.split(/\r?\n/).map((l) => l.trim()).filter((l, i, arr) => l.length > 0 || i < arr.length - 1);
}

export interface HeadlineSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Mark the words an editor listed as "highlighted" so the template can
 * wrap them in the italic brass emphasis used across the design.
 */
export function highlightWords(line: string, words: string[] | null | undefined): HeadlineSegment[] {
  if (!words || words.length === 0) return [{ text: line, highlighted: false }];
  const escaped = words
    .filter((w) => w.trim().length > 0)
    .map((w) => w.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) return [{ text: line, highlighted: false }];
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return line
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, highlighted: pattern.test(part) && new RegExp(`^(${escaped.join('|')})$`, 'i').test(part) }));
}

/** Two-digit index label ("01", "02", …). */
export function pad2(index: number): string {
  return String(index).padStart(2, '0');
}

/** Plain text from Portable Text (used for reading time and excerpts). */
export function portableTextToPlain(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child) => (child as PortableTextSpan).text ?? '').join('');
    })
    .join('\n');
}

/** Estimate reading time in minutes at ~220 wpm, minimum 1. */
export function estimateReadingTime(blocks: PortableTextBlock[] | null | undefined): number {
  const words = portableTextToPlain(blocks).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export interface TocItem {
  id: string;
  text: string;
}

/** URL-safe id from heading text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/** Table of contents from Heading 2 blocks. */
export function tableOfContents(blocks: PortableTextBlock[] | null | undefined): TocItem[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b._type === 'block' && b.style === 'h2')
    .map((b) => {
      const text = (b.children ?? []).map((c) => (c as PortableTextSpan).text ?? '').join('');
      return { id: slugify(text), text };
    })
    .filter((item) => item.text.length > 0);
}

const monthShort = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const monthLong = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const monthDayShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export function formatDateShort(iso: string | null | undefined): string {
  return iso ? monthShort.format(new Date(iso)) : '';
}
export function formatDateLong(iso: string | null | undefined): string {
  return iso ? monthLong.format(new Date(iso)) : '';
}
export function formatDateCard(iso: string | null | undefined): string {
  return iso ? monthDayShort.format(new Date(iso)) : '';
}

/** Compact "Backend, Frontend, Architecture" list from named items. */
export function joinNames(items: Array<{ name?: string | null } | null> | null | undefined, max = 3): string {
  if (!items) return '';
  return items
    .map((i) => i?.name)
    .filter((n): n is string => Boolean(n))
    .slice(0, max)
    .join(', ');
}

/** Ampersand-style join of developer first names: "Marcus + Soren". */
export function teamLabel(devs: Array<{ name?: string | null } | null> | null | undefined): string {
  if (!devs || devs.length === 0) return '';
  return devs
    .map((d) => d?.name?.split(' ')[0])
    .filter((n): n is string => Boolean(n))
    .join(' + ');
}

/** Guard for non-empty arrays that keeps TypeScript narrowing tidy. */
export function nonEmpty<T>(value: T[] | null | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0;
}
