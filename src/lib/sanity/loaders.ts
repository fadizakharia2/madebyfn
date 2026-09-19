import { fetchQuery } from './client';
import * as q from './queries';
import type {
  Article,
  ArticleCard,
  ArticleCategory,
  Developer,
  Faq,
  Homepage,
  InsightsPage,
  LegalPage,
  Navigation,
  NotFoundPage,
  Project,
  ProjectCard,
  Service,
  ServicesPage,
  SiteSettings,
  StartProjectPage,
  StudioPage,
  Technology,
  Testimonial,
  WorkPage,
} from './types';

/**
 * Typed loaders. Pages call these; nothing else touches GROQ directly.
 * Singleton loaders throw a descriptive error when the document is missing
 * so a mis-seeded dataset fails the build instead of rendering blank pages.
 */

async function required<T>(query: string, what: string, params?: Record<string, unknown>): Promise<T> {
  const result = await fetchQuery<T | null>(query, params);
  if (!result) {
    throw new Error(`Sanity is missing the "${what}" document. Open the Studio at /admin and create it, or run the seed script.`);
  }
  return result;
}

export const getSiteSettings = () => required<SiteSettings>(q.siteSettingsQuery, 'Site settings');
export const getNavigation = () => required<Navigation>(q.navigationQuery, 'Navigation');
export const getHomepage = () => required<Homepage>(q.homepageQuery, 'Homepage');
export const getWorkPage = () => required<WorkPage>(q.workPageQuery, 'Work page');
export const getServicesPage = () => required<ServicesPage>(q.servicesPageQuery, 'Services page');
export const getStudioPage = () => required<StudioPage>(q.studioPageQuery, 'Studio page');
export const getInsightsPage = () => required<InsightsPage>(q.insightsPageQuery, 'Insights page');
export const getStartProjectPage = () => required<StartProjectPage>(q.startProjectPageQuery, 'Start a Project page');
export const getNotFoundPage = () => fetchQuery<NotFoundPage | null>(q.notFoundPageQuery);

export const getDevelopers = () => fetchQuery<Developer[]>(q.developersQuery);
export const getDeveloperBySlug = (slug: string) => fetchQuery<Developer | null>(q.developerBySlugQuery, { slug });

export const getProjects = () => fetchQuery<ProjectCard[]>(q.projectsQuery);
export const getProjectSlugs = () => fetchQuery<string[]>(q.projectSlugsQuery);
export const getProjectBySlug = (slug: string) => fetchQuery<Project | null>(q.projectBySlugQuery, { slug });

export const getServices = () => fetchQuery<Service[]>(q.servicesQuery);
export const getTechnologies = () => fetchQuery<Technology[]>(q.technologiesQuery);
export const getTestimonials = () => fetchQuery<Testimonial[]>(q.testimonialsQuery);

export const getArticles = () => fetchQuery<ArticleCard[]>(q.articlesQuery);
export const getArticleSlugs = () => fetchQuery<string[]>(q.articleSlugsQuery);
export const getArticleBySlug = (slug: string) => fetchQuery<Article | null>(q.articleBySlugQuery, { slug });
export const getArticleCategories = () => fetchQuery<ArticleCategory[]>(q.articleCategoriesQuery);

export const getFaqs = () => fetchQuery<Faq[]>(q.faqsQuery);

export const getLegalPageSlugs = () => fetchQuery<string[]>(q.legalPageSlugsQuery);
export const getLegalPageBySlug = (slug: string) => fetchQuery<LegalPage | null>(q.legalPageBySlugQuery, { slug });

let globalsPromise: Promise<{ settings: SiteSettings; navigation: Navigation; developers: Developer[] }> | null = null;

/**
 * Everything the global layout needs. Memoised for the lifetime of the build
 * (or dev-server module instance) so the header/footer data is fetched once,
 * not once per page.
 */
export function getGlobals() {
  if (!globalsPromise) {
    globalsPromise = Promise.all([getSiteSettings(), getNavigation(), getDevelopers()]).then(
      ([settings, navigation, developers]) => ({ settings, navigation, developers }),
    );
    globalsPromise.catch(() => {
      globalsPromise = null;
    });
  }
  return globalsPromise;
}

export type Globals = Awaited<ReturnType<typeof getGlobals>>;
