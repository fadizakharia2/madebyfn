/**
 * Single source of truth for internal URLs. Components never build paths by
 * hand, so renaming a route is a one-line change.
 */
export const routes = {
  home: '/',
  work: '/work',
  project: (slug: string) => `/work/${slug}`,
  services: '/services',
  service: (slug: string) => `/services#${slug}`,
  studio: '/studio',
  developer: (slug: string) => `/studio#${slug}`,
  insights: '/insights',
  article: (slug: string) => `/insights/${slug}`,
  start: '/start-a-project',
  legal: (slug: string) => `/legal/${slug}`,
  admin: '/admin',
  api: {
    newsletter: '/api/newsletter',
    inquiry: '/api/inquiry',
  },
} as const;

/** Resolve a CMS navigation item to an href. */
export function resolveNavHref(item: {
  linkType?: 'internal' | 'external' | null;
  internal?: { _type?: string; slug?: string | null } | null;
  href?: string | null;
}): string {
  if (item.linkType === 'external' && item.href) return item.href;
  const ref = item.internal;
  if (!ref) return item.href ?? routes.home;
  switch (ref._type) {
    case 'homepage':
      return routes.home;
    case 'workPage':
      return routes.work;
    case 'servicesPage':
      return routes.services;
    case 'studioPage':
      return routes.studio;
    case 'insightsPage':
      return routes.insights;
    case 'startProjectPage':
      return routes.start;
    case 'project':
      return ref.slug ? routes.project(ref.slug) : routes.work;
    case 'service':
      return ref.slug ? routes.service(ref.slug) : routes.services;
    case 'developer':
      return ref.slug ? routes.developer(ref.slug) : routes.studio;
    case 'article':
      return ref.slug ? routes.article(ref.slug) : routes.insights;
    case 'legalPage':
      return ref.slug ? routes.legal(ref.slug) : routes.home;
    default:
      return item.href ?? routes.home;
  }
}
