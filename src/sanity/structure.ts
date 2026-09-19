import type { StructureResolver } from 'sanity/structure';
import { SINGLETON_TYPES } from './schemaTypes';

/**
 * Studio navigation. Editors see content grouped by purpose rather than by
 * schema name, and singleton documents open directly instead of as lists.
 */
export const structure: StructureResolver = (S) => {
  const singleton = (type: string, title: string) =>
    S.listItem()
      .title(title)
      .id(type)
      .schemaType(type)
      .child(S.document().schemaType(type).documentId(type).title(title));

  const list = (type: string, title: string) =>
    S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title));

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Website')
        .child(
          S.list()
            .title('Website')
            .items([
              singleton('homepage', 'Homepage'),
              singleton('siteSettings', 'Site settings'),
              singleton('navigation', 'Navigation'),
              S.divider(),
              singleton('workPage', 'Work page'),
              singleton('servicesPage', 'Services page'),
              singleton('studioPage', 'Studio page'),
              singleton('insightsPage', 'Insights page'),
              singleton('startProjectPage', 'Start a Project page'),
              singleton('notFoundPage', '404 page'),
            ]),
        ),
      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              list('project', 'Projects'),
              list('developer', 'Developers'),
              list('service', 'Services'),
              list('technology', 'Technologies'),
            ]),
        ),
      S.listItem()
        .title('Social proof')
        .child(
          S.list()
            .title('Social proof')
            .items([list('client', 'Clients'), list('testimonial', 'Testimonials')]),
        ),
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              list('article', 'Insights'),
              list('articleCategory', 'Article categories'),
              list('faq', 'FAQs'),
              list('legalPage', 'Legal pages'),
            ]),
        ),
      S.listItem()
        .title('Taxonomies')
        .child(S.list().title('Taxonomies').items([list('industry', 'Industries')])),
    ]);
};

/** Exported for tests and tooling that need to know which types are singletons. */
export const singletonTypeIds: readonly string[] = SINGLETON_TYPES;
