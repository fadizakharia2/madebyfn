import { SITE_URL } from './env';
import { routes } from './routes';
import { ogImageUrl } from './sanity/image';
import type { ArticleCard, Developer, Faq, ProjectCard, SanityImage, Seo, SiteSettings } from './sanity/types';

/**
 * SEO utilities: page metadata resolution and JSON-LD builders.
 * Every page passes the result of `buildMeta` to <Seo />.
 */

export interface MetaInput {
  settings: SiteSettings;
  /** Per-document SEO overrides from Sanity. */
  seo?: Seo | null;
  /** Human title of the page (without the site name). */
  title?: string | null;
  description?: string | null;
  /** Path beginning with "/". */
  path: string;
  /** Fallback social image when the document has none. */
  image?: SanityImage | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedAt?: string | null;
  modifiedAt?: string | null;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  siteName: string;
  ogImage: string | null;
  ogType: 'website' | 'article';
  noIndex: boolean;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  twitterHandle?: string | null;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMeta(input: MetaInput): PageMeta {
  const { settings, seo, path } = input;
  const siteName = settings.siteName;
  const defaults = settings.defaultSeo;

  const title = seo?.metaTitle
    ? seo.metaTitle
    : input.title
      ? `${input.title} — ${siteName}`
      : defaults?.metaTitle || siteName;

  const description =
    seo?.metaDescription || input.description || defaults?.metaDescription || settings.footerDescription || '';

  const image = seo?.ogImage ?? input.image ?? defaults?.ogImage ?? null;
  const twitter = settings.socialLinks?.find((l) => l.platform === 'x');

  return {
    title,
    description,
    canonical: absoluteUrl(path === '/' ? '/' : path.replace(/\/$/, '')),
    siteName,
    ogImage: ogImageUrl(image),
    ogType: input.type ?? 'website',
    noIndex: Boolean(seo?.noIndex || input.noIndex),
    publishedAt: input.publishedAt ?? null,
    modifiedAt: input.modifiedAt ?? null,
    twitterHandle: twitter ? `@${twitter.url.split('/').filter(Boolean).pop()}` : null,
  };
}

/* ── JSON-LD ────────────────────────────────────────────────────────── */

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(settings: SiteSettings): JsonLd {
  return {
    '@context': 'https://schema.org',
    // madebyfn is a shared brand for two freelance developers, not a
    // registered company, so it is described as a Brand with no legal name.
    '@type': 'Brand',
    '@id': `${SITE_URL}/#organization`,
    name: settings.studioName,
    url: SITE_URL,
    sameAs: settings.socialLinks?.map((l) => l.url) ?? [],
    logo: settings.logo ? ogImageUrl(settings.logo) : undefined,
  };
}

export function websiteJsonLd(settings: SiteSettings): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: settings.siteName,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function personJsonLd(dev: Developer, settings: SiteSettings): JsonLd {
  const sameAs = [dev.github, dev.linkedin, dev.website].filter((v): v is string => Boolean(v));
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}${routes.developer(dev.slug)}`,
    name: dev.name,
    jobTitle: dev.title ?? undefined,
    description: dev.shortBio ?? undefined,
    image: dev.portrait ? ogImageUrl(dev.portrait) : undefined,
    url: `${SITE_URL}${routes.developer(dev.slug)}`,
    sameAs,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: dev.skills ?? undefined,
    homeLocation: dev.location ? { '@type': 'Place', name: dev.location } : undefined,
    email: dev.email ?? settings.primaryEmail,
  };
}

export function articleJsonLd(article: ArticleCard & { author?: { name: string; slug?: string | null } | null }, settings: SiteSettings): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? undefined,
    image: article.coverImage ? ogImageUrl(article.coverImage) : undefined,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
    author: article.author
      ? {
          '@type': 'Person',
          name: article.author.name,
          url: article.author.slug ? `${SITE_URL}${routes.developer(article.author.slug)}` : undefined,
        }
      : undefined,
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}${routes.article(article.slug)}`,
    articleSection: article.category?.title ?? undefined,
    keywords: settings.siteName,
  };
}

export function creativeWorkJsonLd(project: ProjectCard): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.shortDescription ?? undefined,
    image: project.heroImage ? ogImageUrl(project.heroImage) : undefined,
    dateCreated: project.year ?? undefined,
    url: `${SITE_URL}${routes.project(project.slug)}`,
    creator: { '@id': `${SITE_URL}/#organization` },
    sourceOrganization: project.client ? { '@type': 'Organization', name: project.client.name } : undefined,
    genre: project.industry?.name ?? undefined,
    keywords: project.technologies?.map((t) => t.name).join(', ') || undefined,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Strip undefined values so the emitted JSON is tidy. */
export function compactJsonLd(data: JsonLd): string {
  return JSON.stringify(data, (_key, value) => (value === undefined ? undefined : value)).replace(/</g, '\\u003c');
}
