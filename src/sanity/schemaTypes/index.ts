import { seo } from './objects/seo';
import { imageWithAlt, metric, videoEmbed } from './objects/media';
import { link, socialLink } from './objects/link';
import { blockContent, callout, codeBlock } from './objects/blockContent';
import { caseStudyBlockTypes, caseStudyBlocks } from './objects/caseStudyBlocks';
import { siteSettings } from './documents/siteSettings';
import { navigation } from './documents/navigation';
import { homepage } from './documents/homepage';
import {
  insightsPage,
  notFoundPage,
  servicesPage,
  startProjectPage,
  studioPage,
  workPage,
} from './documents/pages';
import { developer } from './documents/developer';
import { project } from './documents/project';
import { service, technology } from './documents/service';
import { client, industry, testimonial } from './documents/socialProof';
import { article, articleCategory, faq, legalPage } from './documents/content';

/** Documents that exist exactly once. The Studio hides "create new" for these. */
export const SINGLETON_TYPES = [
  'siteSettings',
  'navigation',
  'homepage',
  'workPage',
  'servicesPage',
  'studioPage',
  'insightsPage',
  'startProjectPage',
  'notFoundPage',
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes = [
  // objects
  seo,
  imageWithAlt,
  videoEmbed,
  metric,
  link,
  socialLink,
  blockContent,
  codeBlock,
  callout,
  ...caseStudyBlockTypes,
  caseStudyBlocks,
  // singletons
  siteSettings,
  navigation,
  homepage,
  workPage,
  servicesPage,
  studioPage,
  insightsPage,
  startProjectPage,
  notFoundPage,
  // portfolio
  project,
  developer,
  service,
  technology,
  // social proof
  client,
  testimonial,
  industry,
  // content
  article,
  articleCategory,
  faq,
  legalPage,
];
