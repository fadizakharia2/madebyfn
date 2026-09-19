/**
 * Every GROQ query used by the site lives here. Components import typed
 * loader functions from `./loaders` rather than writing GROQ inline.
 */

const groq = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');

/* ── Fragments ──────────────────────────────────────────────────────── */

export const IMAGE = groq`{
  _type,
  alt,
  caption,
  hotspot,
  crop,
  asset->{
    _id,
    url,
    metadata { dimensions { width, height, aspectRatio }, lqip }
  },
  "externalUrl": _sanityAsset
}`;

export const LINK = groq`{
  label,
  linkType,
  href,
  openInNewTab,
  internal->{ _type, "slug": slug.current }
}`;

export const SEO = groq`{
  metaTitle,
  metaDescription,
  noIndex,
  ogImage ${IMAGE}
}`;

export const METRIC = groq`{ _key, value, label }`;

export const VIDEO = groq`{ url, caption, autoplay, poster ${IMAGE} }`;

export const TECHNOLOGY = groq`{ _id, name, category, description, url, order, logo ${IMAGE} }`;

export const INDUSTRY = groq`{ _id, name, "slug": slug.current, description }`;

export const PROJECT_CARD = groq`{
  _id,
  name,
  "slug": slug.current,
  statement,
  shortDescription,
  fullDescription,
  year,
  headlineResult,
  featured,
  order,
  "client": client->{ _id, name },
  "industry": industry->${INDUSTRY},
  industryLabel,
  "services": services[]->{ _id, name, "slug": slug.current },
  serviceTags,
  "technologies": technologies[]->{ _id, name },
  heroImage ${IMAGE},
  mobileHeroImage ${IMAGE}
}`;

export const TESTIMONIAL = groq`{
  _id,
  quote,
  person,
  role,
  company,
  featured,
  order,
  avatar ${IMAGE},
  companyLogo ${IMAGE},
  "clientLogo": client->logo ${IMAGE},
  "project": project->{ _id, name, "slug": slug.current }
}`;

export const DEVELOPER = groq`{
  _id,
  name,
  "slug": slug.current,
  title,
  shortTitle,
  shortBio,
  longBio,
  approachQuote,
  yearsOfExperience,
  since,
  location,
  languages,
  availability,
  order,
  specializations,
  skills,
  github,
  linkedin,
  website,
  resumeUrl,
  email,
  portrait ${IMAGE},
  alternatePortrait ${IMAGE},
  "technologies": technologies[]->{ _id, name, category },
  "featuredProjects": featuredProjects[]->{ _id, name, "slug": slug.current },
  seo ${SEO}
}`;

export const SERVICE = groq`{
  _id,
  name,
  "slug": slug.current,
  tagline,
  shortDescription,
  longDescription,
  summary,
  capabilities,
  typicalProblems,
  engagement,
  featured,
  order,
  icon ${IMAGE},
  "technologies": technologies[]->{ _id, name },
  "homepageTechnologies": select(
    count(homepageTechnologies) > 0 => homepageTechnologies[]->{ _id, name },
    technologies[0...5]->{ _id, name }
  ),
  "projects": projects[]->{ _id, name, "slug": slug.current },
  seo ${SEO}
}`;

export const ARTICLE_CARD = groq`{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  featured,
  coverImage ${IMAGE},
  "author": author->{ _id, name, "slug": slug.current, title, shortTitle, portrait ${IMAGE} },
  "category": category->{ _id, title, "slug": slug.current },
  body
}`;

export const BLOCK_CONTENT = groq`[] {
  ...,
  _type == "imageWithAlt" => ${IMAGE},
  markDefs[] { ... }
}`;

export const CASE_STUDY_BLOCKS = groq`caseStudy[] {
  ...,
  _type == "blockRichText" => { content ${BLOCK_CONTENT} },
  _type == "blockFullWidthImage" => { image ${IMAGE} },
  _type == "blockContainedImage" => { image ${IMAGE} },
  _type == "blockVideo" => { video ${VIDEO} },
  _type == "blockTwoColumnMedia" => { left ${IMAGE}, right ${IMAGE} },
  _type == "blockGallery" => { images[] ${IMAGE} },
  _type == "blockTestimonial" => { "testimonial": testimonial->${TESTIMONIAL} },
  _type == "blockArchitecture" => { image ${IMAGE} },
  _type == "blockStickyTextVisual" => { image ${IMAGE}, body ${BLOCK_CONTENT} },
  _type == "blockRelatedProjects" => { "projects": projects[]->${PROJECT_CARD} },
  _type == "blockCta" => { link ${LINK} }
}`;

/* ── Site-wide ──────────────────────────────────────────────────────── */

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  siteName,
  studioName,
  studioDescriptor,
  legalName,
  siteUrl,
  establishedYear,
  primaryEmail,
  location,
  timezone,
  timezoneLabel,
  availability,
  socialLinks[] { _key, platform, label, url },
  footerDescription,
  footerNavigationLabel,
  footerDevelopersLabel,
  footerStatusLabel,
  copyrightNote,
  newsletter,
  logo ${IMAGE},
  alternateLogo ${IMAGE},
  "favicon": favicon.asset->url,
  defaultSeo ${SEO}
}`;

export const navigationQuery = groq`*[_type == "navigation"][0] {
  mainItems[] ${LINK},
  cta ${LINK},
  footerItems[] ${LINK},
  legalItems[] ${LINK}
}`;

export const developersQuery = groq`*[_type == "developer"] | order(order asc, name asc) ${DEVELOPER}`;

export const developerBySlugQuery = groq`*[_type == "developer" && slug.current == $slug][0] ${DEVELOPER}`;

/* ── Homepage ───────────────────────────────────────────────────────── */

export const homepageQuery = groq`*[_type == "homepage"][0] {
  hero {
    eyebrow,
    title,
    highlightedWords,
    copy,
    availabilityText,
    primaryCta ${LINK},
    secondaryCta ${LINK},
    backgroundVideo {
      enabled,
      url,
      opacity,
      "fileUrl": file.asset->url,
      "externalFile": file._sanityAsset,
      poster ${IMAGE}
    },
    visual {
      enabled,
      codeSnippet,
      metricCard,
      stackLabel,
      watermark,
      "stackTechnologies": stackTechnologies[]->{ _id, name }
    }
  },
  stats { items[] ${METRIC}, note },
  selectedWork {
    eyebrow, heading, linkLabel,
    "projects": select(
      count(projects) > 0 => projects[]->${PROJECT_CARD},
      *[_type == "project" && featured == true] | order(order asc) [0...3] ${PROJECT_CARD}
    )
  },
  featuredCase {
    eyebrow, heading, linkLabel, metricsLabel,
    steps[] { _key, label, heading, body },
    "project": coalesce(
      project->{ ...${PROJECT_CARD}, "metrics": metrics[] ${METRIC} },
      *[_type == "project" && featured == true] | order(order asc) [0] { ...${PROJECT_CARD}, "metrics": metrics[] ${METRIC} }
    ),
    "metrics": select(count(metrics) > 0 => metrics[] ${METRIC}, null)
  },
  services {
    eyebrow, heading, linkLabel,
    "items": select(
      count(items) > 0 => items[]->${SERVICE},
      *[_type == "service" && featured == true] | order(order asc) ${SERVICE}
    )
  },
  team {
    eyebrow, heading,
    "developers": select(
      count(developers) > 0 => developers[]->${DEVELOPER},
      *[_type == "developer"] | order(order asc) ${DEVELOPER}
    )
  },
  technology { eyebrow, heading },
  process { eyebrow, heading, steps[] { _key, label, description } },
  model { eyebrow, heading, agencyLabel, studioLabel, rows[] { _key, aspect, agency, studio } },
  testimonials {
    eyebrow, heading,
    "items": select(
      count(items) > 0 => items[]->${TESTIMONIAL},
      *[_type == "testimonial" && featured == true] | order(order asc) ${TESTIMONIAL}
    )
  },
  insights {
    eyebrow, heading, linkLabel,
    "articles": select(
      count(articles) > 0 => articles[]->${ARTICLE_CARD},
      *[_type == "article"] | order(publishedAt desc) [0...3] ${ARTICLE_CARD}
    )
  },
  finalCta { eyebrow, heading, copy, primaryLabel, showEmail, backgroundText, availabilityText },
  visibility,
  seo ${SEO}
}`;

export const technologiesQuery = groq`*[_type == "technology"] | order(order asc, name asc) ${TECHNOLOGY}`;

/* ── Work / projects ────────────────────────────────────────────────── */

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(order asc, year desc) ${PROJECT_CARD}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)].slug.current`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  ...${PROJECT_CARD},
  timeline,
  role,
  challenge,
  strategy,
  solution,
  architecture,
  design,
  engineering,
  results,
  externalLink,
  "metrics": metrics[] ${METRIC},
  gallery[] ${IMAGE},
  video ${VIDEO},
  "testimonials": testimonials[]->${TESTIMONIAL},
  "developers": developers[]->{ _id, name, "slug": slug.current, title, shortTitle },
  ${CASE_STUDY_BLOCKS},
  "nextProject": coalesce(
    nextProject->${PROJECT_CARD},
    *[_type == "project" && defined(slug.current) && order > ^.order] | order(order asc) [0] ${PROJECT_CARD},
    *[_type == "project" && defined(slug.current) && _id != ^._id] | order(order asc) [0] ${PROJECT_CARD}
  ),
  seo ${SEO}
}`;

export const workPageQuery = groq`*[_type == "workPage"][0] {
  eyebrow, title, intro, industryFilterLabel, serviceFilterLabel, allLabel, emptyMessage, cta, seo ${SEO}
}`;

/* ── Services ───────────────────────────────────────────────────────── */

export const servicesQuery = groq`*[_type == "service" && defined(slug.current)] | order(order asc) ${SERVICE}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  eyebrow, title, intro, problemsLabel, engagementLabel, technologiesLabel, projectsLabel, discussLabel, cta, seo ${SEO}
}`;

/* ── Studio ─────────────────────────────────────────────────────────── */

export const studioPageQuery = groq`*[_type == "studioPage"][0] {
  eyebrow, title, intro,
  philosophy,
  principles { eyebrow, items[] { _key, title, body } },
  team {
    eyebrow, specialitiesLabel,
    "developers": select(
      count(developers) > 0 => developers[]->${DEVELOPER},
      *[_type == "developer"] | order(order asc) ${DEVELOPER}
    )
  },
  cta,
  seo ${SEO}
}`;

/* ── Insights ───────────────────────────────────────────────────────── */

export const articlesQuery = groq`*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${ARTICLE_CARD}`;

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current)].slug.current`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0] {
  ...${ARTICLE_CARD},
  showTableOfContents,
  body ${BLOCK_CONTENT},
  "author": author->${DEVELOPER},
  "relatedArticles": select(
    count(relatedArticles) > 0 => relatedArticles[]->${ARTICLE_CARD},
    count(*[_type == "article" && _id != ^._id && category._ref == ^.category._ref]) > 0 =>
      *[_type == "article" && _id != ^._id && category._ref == ^.category._ref] | order(publishedAt desc) [0...2] ${ARTICLE_CARD},
    *[_type == "article" && _id != ^._id] | order(publishedAt desc) [0...2] ${ARTICLE_CARD}
  ),
  "relatedProjects": relatedProjects[]->${PROJECT_CARD},
  "relatedServices": relatedServices[]->{ _id, name, "slug": slug.current },
  seo ${SEO}
}`;

export const articleCategoriesQuery = groq`*[_type == "articleCategory"] | order(order asc, title asc) { _id, title, "slug": slug.current }`;

export const insightsPageQuery = groq`*[_type == "insightsPage"][0] {
  eyebrow, title, intro, allLabel, featuredLabel, showNewsletter,
  "featuredArticle": coalesce(
    featuredArticle->${ARTICLE_CARD},
    *[_type == "article" && featured == true] | order(publishedAt desc) [0] ${ARTICLE_CARD},
    *[_type == "article"] | order(publishedAt desc) [0] ${ARTICLE_CARD}
  ),
  seo ${SEO}
}`;

/* ── Start a project ────────────────────────────────────────────────── */

export const startProjectPageQuery = groq`*[_type == "startProjectPage"][0] {
  eyebrow, title, intro,
  infoItems[] { _key, icon, label, value },
  emailLabel,
  projectTypes,
  budgetRanges,
  timelines,
  descriptionPlaceholder,
  referralPlaceholder,
  submitLabel,
  footnote,
  faq,
  successHeading,
  successCopy,
  successLinkLabel,
  errorMessage,
  seo ${SEO}
}`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc) { _id, question, answer, category }`;

/* ── Misc ───────────────────────────────────────────────────────────── */

export const notFoundPageQuery = groq`*[_type == "notFoundPage"][0] { eyebrow, title, copy, links[] ${LINK} }`;

export const legalPageSlugsQuery = groq`*[_type == "legalPage" && defined(slug.current)].slug.current`;

export const legalPageBySlugQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, updatedAt, body ${BLOCK_CONTENT}, seo ${SEO}
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) ${TESTIMONIAL}`;

export const faqCountQuery = groq`count(*[_type == "faq"])`;
