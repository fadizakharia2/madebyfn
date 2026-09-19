/**
 * Result types for the GROQ projections in ./queries.ts.
 * Keep these in sync with the fragments; every field here is selected there.
 */

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio: number };
    lqip?: string;
  } | null;
}

export interface SanityImage {
  _type?: string;
  alt?: string | null;
  caption?: string | null;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  asset?: SanityImageAsset | null;
  /** Seed-only marker "image@https://…" before the asset is imported. */
  externalUrl?: string | null;
}

export type Maybe<T> = T | null | undefined;

export interface Link {
  label?: string | null;
  linkType?: 'internal' | 'external' | null;
  href?: string | null;
  openInNewTab?: boolean | null;
  internal?: { _type?: string; slug?: string | null } | null;
}

export interface Seo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  noIndex?: boolean | null;
  ogImage?: SanityImage | null;
}

export interface Metric {
  _key?: string;
  value: string;
  label: string;
}

export interface Video {
  url?: string | null;
  caption?: string | null;
  autoplay?: boolean | null;
  poster?: SanityImage | null;
}

export interface Technology {
  _id: string;
  name: string;
  category: string;
  description?: string | null;
  url?: string | null;
  order?: number | null;
  logo?: SanityImage | null;
}

export interface Industry {
  _id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
}

export interface NamedRef {
  _id: string;
  name: string;
  slug?: string | null;
}

export interface ProjectCard {
  _id: string;
  name: string;
  slug: string;
  statement?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  year?: string | null;
  headlineResult?: string | null;
  featured?: boolean | null;
  order?: number | null;
  client?: { _id: string; name: string } | null;
  industry?: Industry | null;
  industryLabel?: string | null;
  services?: NamedRef[] | null;
  serviceTags?: string[] | null;
  technologies?: NamedRef[] | null;
  heroImage?: SanityImage | null;
  mobileHeroImage?: SanityImage | null;
}

export interface Testimonial {
  _id: string;
  quote: string;
  person: string;
  role?: string | null;
  company?: string | null;
  featured?: boolean | null;
  order?: number | null;
  avatar?: SanityImage | null;
  companyLogo?: SanityImage | null;
  clientLogo?: SanityImage | null;
  project?: NamedRef | null;
}

export interface Developer {
  _id: string;
  name: string;
  slug: string;
  title?: string | null;
  shortTitle?: string | null;
  shortBio?: string | null;
  longBio?: string | null;
  approachQuote?: string | null;
  yearsOfExperience?: number | null;
  since?: string | null;
  location?: string | null;
  languages?: string[] | null;
  availability?: string | null;
  order?: number | null;
  specializations?: string[] | null;
  skills?: string[] | null;
  github?: string | null;
  linkedin?: string | null;
  website?: string | null;
  resumeUrl?: string | null;
  email?: string | null;
  portrait?: SanityImage | null;
  alternatePortrait?: SanityImage | null;
  technologies?: Array<{ _id: string; name: string; category?: string | null }> | null;
  featuredProjects?: NamedRef[] | null;
  seo?: Seo | null;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  summary?: string | null;
  capabilities?: string[] | null;
  typicalProblems?: string[] | null;
  engagement?: string | null;
  featured?: boolean | null;
  order?: number | null;
  icon?: SanityImage | null;
  technologies?: NamedRef[] | null;
  homepageTechnologies?: NamedRef[] | null;
  projects?: NamedRef[] | null;
  seo?: Seo | null;
}

/* ── Portable Text ──────────────────────────────────────────────────── */

export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  href?: string;
  openInNewTab?: boolean;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Array<PortableTextSpan | Record<string, unknown>>;
  markDefs?: PortableTextMarkDef[];
  [key: string]: unknown;
}

export interface CodeBlock {
  _type?: 'codeBlock';
  filename?: string | null;
  language?: string | null;
  code: string;
}

export interface Callout {
  _type?: 'callout';
  tone?: 'note' | 'insight' | 'warning' | null;
  heading?: string | null;
  body: string;
}

export interface ArticleCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  readingTime?: number | null;
  featured?: boolean | null;
  coverImage?: SanityImage | null;
  author?: { _id: string; name: string; slug?: string | null; title?: string | null; shortTitle?: string | null; portrait?: SanityImage | null } | null;
  category?: { _id: string; title: string; slug?: string | null } | null;
  body?: PortableTextBlock[] | null;
}

export interface Article extends ArticleCard {
  showTableOfContents?: boolean | null;
  author: Developer | null;
  relatedArticles?: ArticleCard[] | null;
  relatedProjects?: ProjectCard[] | null;
  relatedServices?: NamedRef[] | null;
  seo?: Seo | null;
}

export interface ArticleCategory {
  _id: string;
  title: string;
  slug?: string | null;
}

/* ── Case study blocks ──────────────────────────────────────────────── */

interface BlockBase {
  _key: string;
  _type: string;
}

export interface BlockRichText extends BlockBase {
  _type: 'blockRichText';
  heading?: string | null;
  content: PortableTextBlock[];
}
export interface BlockHeading extends BlockBase {
  _type: 'blockHeading';
  eyebrow?: string | null;
  heading?: string | null;
  text?: string | null;
}
export interface BlockFullWidthImage extends BlockBase {
  _type: 'blockFullWidthImage';
  image: SanityImage;
  height?: 'standard' | 'tall' | null;
}
export interface BlockContainedImage extends BlockBase {
  _type: 'blockContainedImage';
  image: SanityImage;
}
export interface BlockVideo extends BlockBase {
  _type: 'blockVideo';
  video: Video;
}
export interface BlockTwoColumnMedia extends BlockBase {
  _type: 'blockTwoColumnMedia';
  left: SanityImage;
  right: SanityImage;
  caption?: string | null;
}
export interface BlockGallery extends BlockBase {
  _type: 'blockGallery';
  eyebrow?: string | null;
  heading?: string | null;
  images: SanityImage[];
}
export interface BlockQuote extends BlockBase {
  _type: 'blockQuote';
  quote: string;
  attribution?: string | null;
}
export interface BlockTestimonial extends BlockBase {
  _type: 'blockTestimonial';
  testimonial: Testimonial | null;
}
export interface BlockMetrics extends BlockBase {
  _type: 'blockMetrics';
  eyebrow?: string | null;
  metrics: Metric[];
}
export interface BlockArchitecture extends BlockBase {
  _type: 'blockArchitecture';
  eyebrow?: string | null;
  heading?: string | null;
  image?: SanityImage | null;
  layers?: Array<{ _key: string; name: string; description?: string | null; technologies?: string[] | null }> | null;
  caption?: string | null;
}
export interface BlockCode extends BlockBase {
  _type: 'blockCode';
  intro?: string | null;
  code: CodeBlock;
}
export interface BlockFeatureGrid extends BlockBase {
  _type: 'blockFeatureGrid';
  eyebrow?: string | null;
  heading?: string | null;
  features: Array<{ _key: string; title: string; body?: string | null }>;
}
export interface BlockTimeline extends BlockBase {
  _type: 'blockTimeline';
  eyebrow?: string | null;
  heading?: string | null;
  items: Array<{ _key: string; label: string; title: string; body?: string | null }>;
}
export interface BlockProcess extends BlockBase {
  _type: 'blockProcess';
  eyebrow?: string | null;
  heading?: string | null;
  steps: Array<{ _key: string; label: string; heading?: string | null; body?: string | null }>;
}
export interface BlockStickyTextVisual extends BlockBase {
  _type: 'blockStickyTextVisual';
  eyebrow?: string | null;
  heading?: string | null;
  body: PortableTextBlock[];
  image: SanityImage;
  visualSide?: 'left' | 'right' | null;
}
export interface BlockComparison extends BlockBase {
  _type: 'blockComparison';
  eyebrow?: string | null;
  heading?: string | null;
  beforeLabel?: string | null;
  afterLabel?: string | null;
  rows: Array<{ _key: string; aspect: string; before: string; after: string }>;
}
export interface BlockCallout extends BlockBase {
  _type: 'blockCallout';
  callout: Callout;
}
export interface BlockRelatedProjects extends BlockBase {
  _type: 'blockRelatedProjects';
  heading?: string | null;
  projects: ProjectCard[];
}
export interface BlockCta extends BlockBase {
  _type: 'blockCta';
  heading: string;
  body?: string | null;
  link?: Link | null;
}

export type CaseStudyBlock =
  | BlockRichText
  | BlockHeading
  | BlockFullWidthImage
  | BlockContainedImage
  | BlockVideo
  | BlockTwoColumnMedia
  | BlockGallery
  | BlockQuote
  | BlockTestimonial
  | BlockMetrics
  | BlockArchitecture
  | BlockCode
  | BlockFeatureGrid
  | BlockTimeline
  | BlockProcess
  | BlockStickyTextVisual
  | BlockComparison
  | BlockCallout
  | BlockRelatedProjects
  | BlockCta;

export interface Project extends ProjectCard {
  timeline?: string | null;
  role?: string | null;
  challenge?: string | null;
  strategy?: string | null;
  solution?: string | null;
  architecture?: string | null;
  design?: string | null;
  engineering?: string | null;
  results?: string | null;
  externalLink?: string | null;
  metrics?: Metric[] | null;
  gallery?: SanityImage[] | null;
  video?: Video | null;
  testimonials?: Testimonial[] | null;
  developers?: Array<{ _id: string; name: string; slug?: string | null; title?: string | null; shortTitle?: string | null }> | null;
  caseStudy?: CaseStudyBlock[] | null;
  nextProject?: ProjectCard | null;
  seo?: Seo | null;
}

/* ── Singletons ─────────────────────────────────────────────────────── */

export interface Availability {
  status?: 'available' | 'limited' | 'unavailable' | null;
  label?: string | null;
  detail?: string | null;
  menuLabel?: string | null;
  responseTime?: string | null;
}

export interface NewsletterSettings {
  enabled?: boolean | null;
  heading?: string | null;
  copy?: string | null;
  placeholder?: string | null;
  buttonLabel?: string | null;
  successMessage?: string | null;
  duplicateMessage?: string | null;
  privacyNote?: string | null;
}

export interface SiteSettings {
  siteName: string;
  studioName: string;
  studioDescriptor?: string | null;
  legalName?: string | null;
  siteUrl?: string | null;
  establishedYear?: number | null;
  primaryEmail: string;
  location?: string | null;
  timezone?: string | null;
  timezoneLabel?: string | null;
  availability?: Availability | null;
  socialLinks?: Array<{ _key: string; platform: string; label: string; url: string }> | null;
  footerDescription?: string | null;
  footerNavigationLabel?: string | null;
  footerDevelopersLabel?: string | null;
  footerStatusLabel?: string | null;
  copyrightNote?: string | null;
  newsletter?: NewsletterSettings | null;
  logo?: SanityImage | null;
  alternateLogo?: SanityImage | null;
  favicon?: string | null;
  defaultSeo?: Seo | null;
}

export interface Navigation {
  mainItems?: Link[] | null;
  cta?: Link | null;
  footerItems?: Link[] | null;
  legalItems?: Link[] | null;
}

export interface SectionHeading {
  eyebrow?: string | null;
  heading?: string | null;
}

export interface HeroBackgroundVideo {
  enabled?: boolean | null;
  url?: string | null;
  /** Sanity file asset URL once uploaded. */
  fileUrl?: string | null;
  /** Seed-only marker "file@https://…" before the asset is imported. */
  externalFile?: string | null;
  opacity?: number | null;
  poster?: SanityImage | null;
}

export interface Homepage {
  hero?: {
    eyebrow?: string | null;
    title?: string | null;
    highlightedWords?: string[] | null;
    copy?: string | null;
    availabilityText?: string | null;
    primaryCta?: Link | null;
    secondaryCta?: Link | null;
    backgroundVideo?: HeroBackgroundVideo | null;
    visual?: {
      enabled?: boolean | null;
      codeSnippet?: string | null;
      metricCard?: { label?: string | null; value?: string | null; caption?: string | null; bars?: number[] | null } | null;
      stackLabel?: string | null;
      watermark?: string | null;
      stackTechnologies?: NamedRef[] | null;
    } | null;
  } | null;
  stats?: { items?: Metric[] | null; note?: string | null } | null;
  selectedWork?: (SectionHeading & { linkLabel?: string | null; projects?: ProjectCard[] | null }) | null;
  featuredCase?:
    | (SectionHeading & {
        linkLabel?: string | null;
        metricsLabel?: string | null;
        steps?: Array<{ _key: string; label: string; heading: string; body: string }> | null;
        project?: (ProjectCard & { metrics?: Metric[] | null }) | null;
        metrics?: Metric[] | null;
      })
    | null;
  services?: (SectionHeading & { linkLabel?: string | null; items?: Service[] | null }) | null;
  team?: (SectionHeading & { developers?: Developer[] | null }) | null;
  technology?: SectionHeading | null;
  process?: (SectionHeading & { steps?: Array<{ _key: string; label: string; description: string }> | null }) | null;
  model?:
    | (SectionHeading & {
        agencyLabel?: string | null;
        studioLabel?: string | null;
        rows?: Array<{ _key: string; aspect: string; agency: string; studio: string }> | null;
      })
    | null;
  testimonials?: (SectionHeading & { items?: Testimonial[] | null }) | null;
  insights?: (SectionHeading & { linkLabel?: string | null; articles?: ArticleCard[] | null }) | null;
  finalCta?:
    | (SectionHeading & {
        copy?: string | null;
        primaryLabel?: string | null;
        showEmail?: boolean | null;
        backgroundText?: string | null;
        availabilityText?: string | null;
      })
    | null;
  visibility?: Record<string, boolean | null | undefined> | null;
  seo?: Seo | null;
}

export interface PageHeader {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  seo?: Seo | null;
}

export interface WorkPage extends PageHeader {
  industryFilterLabel?: string | null;
  serviceFilterLabel?: string | null;
  allLabel?: string | null;
  emptyMessage?: string | null;
  cta?: { heading?: string | null; buttonLabel?: string | null } | null;
}

export interface ServicesPage extends PageHeader {
  problemsLabel?: string | null;
  engagementLabel?: string | null;
  technologiesLabel?: string | null;
  projectsLabel?: string | null;
  discussLabel?: string | null;
  cta?: { heading?: string | null; copy?: string | null; buttonLabel?: string | null } | null;
}

export interface StudioPage extends PageHeader {
  philosophy?: { eyebrow?: string | null; statement?: string | null } | null;
  principles?: { eyebrow?: string | null; items?: Array<{ _key: string; title: string; body: string }> | null } | null;
  team?: { eyebrow?: string | null; specialitiesLabel?: string | null; developers?: Developer[] | null } | null;
  cta?: { heading?: string | null; buttonLabel?: string | null } | null;
}

export interface InsightsPage extends PageHeader {
  allLabel?: string | null;
  featuredLabel?: string | null;
  showNewsletter?: boolean | null;
  featuredArticle?: ArticleCard | null;
}

export interface StartProjectPage extends PageHeader {
  infoItems?: Array<{ _key: string; icon?: 'filled' | 'half' | 'outline' | null; label: string; value: string }> | null;
  emailLabel?: string | null;
  projectTypes?: string[] | null;
  budgetRanges?: string[] | null;
  timelines?: string[] | null;
  descriptionPlaceholder?: string | null;
  referralPlaceholder?: string | null;
  submitLabel?: string | null;
  footnote?: string | null;
  faq?: { enabled?: boolean | null; eyebrow?: string | null; heading?: string | null } | null;
  successHeading?: string | null;
  successCopy?: string | null;
  successLinkLabel?: string | null;
  errorMessage?: string | null;
}

export interface NotFoundPage {
  eyebrow?: string | null;
  title?: string | null;
  copy?: string | null;
  links?: Link[] | null;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  category?: string | null;
}

export interface LegalPage {
  _id: string;
  title: string;
  slug: string;
  updatedAt?: string | null;
  body: PortableTextBlock[];
  seo?: Seo | null;
}
