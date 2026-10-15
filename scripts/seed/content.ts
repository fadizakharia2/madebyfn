/**
 * Seed dataset for madebyfn.
 *
 * This is the placeholder content from the Figma Make design, rebranded to
 * madebyfn and shaped exactly like Sanity documents. It is used in two ways:
 *
 *  1. `npm run sanity:export-seed` writes it as NDJSON for
 *     `npx sanity dataset import`, where every `_sanityAsset` image marker is
 *     uploaded as a real asset.
 *  2. Until a Sanity project id is configured, the site evaluates its GROQ
 *     queries against this array in-process (see src/lib/sanity/client.ts).
 *
 * Replace everything here from the Studio once the project is live — nothing
 * in the frontend depends on these specific values.
 */

export interface SeedDocument {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

let keyCounter = 0;
const key = () => `k${(++keyCounter).toString(36)}`;

const ref = (id: string) => ({ _type: 'reference', _ref: id, _key: key() });
const refs = (ids: string[]) => ids.map((id) => ref(id));

const unsplash = (id: string, w = 2000, h = 1300) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=90`;

/** Screenshots committed under public/work, served from the public repo so the importer can fetch them. */
const shot = (path: string) => `https://raw.githubusercontent.com/fadizakharia2/madebyfn/main/public/work/${path}`;

const image = (url: string, alt: string, caption?: string) => ({
  _type: 'imageWithAlt',
  _key: key(),
  alt,
  ...(caption ? { caption } : {}),
  _sanityAsset: `image@${url}`,
});

const metric = (value: string, label: string) => ({ _type: 'metric', _key: key(), value, label });

const internalLink = (label: string, id: string) => ({
  _type: 'link',
  _key: key(),
  label,
  linkType: 'internal',
  internal: ref(id),
});

/* ── Portable Text helpers ──────────────────────────────────────────── */

const span = (text: string, marks: string[] = []) => ({ _type: 'span', _key: key(), text, marks });

const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
});

const bullet = (text: string) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [span(text)],
});

const codeBlock = (filename: string, language: string, code: string) => ({
  _type: 'codeBlock',
  _key: key(),
  filename,
  language,
  code,
});

const callout = (tone: 'note' | 'insight' | 'warning', heading: string, body: string) => ({
  _type: 'callout',
  _key: key(),
  tone,
  heading,
  body,
});

/* ── Images ─────────────────────────────────────────────────────────── */

const IMG = {
  meridian: 'photo-1551288049-bebda4e38f71',
  vessel: 'photo-1460925895917-afdab827c52f',
  orbital: 'photo-1555066931-4365d14bab8c',
  pragma: 'photo-1558618666-fcd25c85cd64',
  forta: 'photo-1518770660439-4636190af475',
  cadence: 'photo-1512941937669-90a1b58e7e9c',
  marcus: 'photo-1507003211169-0a1dd7228f2d',
  soren: 'photo-1472099645785-5658abf4ff4e',
};

/* ── Taxonomies ─────────────────────────────────────────────────────── */

const industries: SeedDocument[] = [
  { _id: 'industry-fintech', _type: 'industry', name: 'Fintech', slug: { current: 'fintech' }, description: 'Financial technology, trading and investment platforms.', order: 1 },
  { _id: 'industry-commerce', _type: 'industry', name: 'Commerce', slug: { current: 'commerce' }, description: 'Headless and direct-to-consumer commerce.', order: 2 },
  { _id: 'industry-saas', _type: 'industry', name: 'SaaS', slug: { current: 'saas' }, description: 'Software-as-a-service and productivity tools.', order: 3 },
  { _id: 'industry-design-tools', _type: 'industry', name: 'Design Tools', slug: { current: 'design-tools' }, description: 'Tooling for product and design teams.', order: 4 },
  { _id: 'industry-web3', _type: 'industry', name: 'Web3', slug: { current: 'web3' }, description: 'Blockchain infrastructure and security.', order: 5 },
  { _id: 'industry-healthcare', _type: 'industry', name: 'Healthcare', slug: { current: 'healthcare' }, description: 'Patient-facing and clinical software.', order: 6 },
  { _id: 'industry-publishing', _type: 'industry', name: 'Publishing', slug: { current: 'publishing' }, description: 'Authors, books and media.', order: 7 },
  { _id: 'industry-marketplace', _type: 'industry', name: 'Marketplace', slug: { current: 'marketplace' }, description: 'Two-sided platforms connecting customers and providers.', order: 8 },
  { _id: 'industry-sports', _type: 'industry', name: 'Sports & Equestrian', slug: { current: 'sports' }, description: 'Clubs, racing and sporting bodies.', order: 9 },
];

const articleCategories: SeedDocument[] = [
  { _id: 'category-architecture', _type: 'articleCategory', title: 'Architecture', slug: { current: 'architecture' }, order: 1 },
  { _id: 'category-ai', _type: 'articleCategory', title: 'AI', slug: { current: 'ai' }, order: 2 },
  { _id: 'category-product', _type: 'articleCategory', title: 'Product', slug: { current: 'product' }, order: 3 },
  { _id: 'category-frontend', _type: 'articleCategory', title: 'Frontend', slug: { current: 'frontend' }, order: 4 },
  { _id: 'category-performance', _type: 'articleCategory', title: 'Performance', slug: { current: 'performance' }, order: 5 },
];

/* ── Technologies ───────────────────────────────────────────────────── */

const techList: Array<[string, string, string]> = [
  ['react', 'React', 'frontend'],
  ['nextjs', 'Next.js', 'frontend'],
  ['astro', 'Astro', 'frontend'],
  ['typescript', 'TypeScript', 'frontend'],
  ['tailwind', 'Tailwind', 'frontend'],
  ['framer-motion', 'Framer Motion', 'frontend'],
  ['design-systems', 'Design Systems', 'frontend'],
  ['webgl', 'WebGL', 'frontend'],
  ['nodejs', 'Node.js', 'backend'],
  ['nestjs', 'NestJS', 'backend'],
  ['dotnet', '.NET', 'backend'],
  ['python', 'Python', 'backend'],
  ['rest-graphql', 'REST / GraphQL', 'backend'],
  ['react-native', 'React Native', 'mobile'],
  ['expo', 'Expo', 'mobile'],
  ['ios', 'iOS', 'mobile'],
  ['android', 'Android', 'mobile'],
  ['fastlane', 'Fastlane', 'mobile'],
  ['postgresql', 'PostgreSQL', 'data'],
  ['redis', 'Redis', 'data'],
  ['mongodb', 'MongoDB', 'data'],
  ['supabase', 'Supabase', 'data'],
  ['openai', 'OpenAI', 'ai'],
  ['anthropic', 'Anthropic', 'ai'],
  ['langchain', 'LangChain', 'ai'],
  ['llamaindex', 'LlamaIndex', 'ai'],
  ['pinecone', 'Pinecone', 'ai'],
  ['ai-llm', 'AI/LLM', 'ai'],
  ['shopify', 'Shopify', 'commerce'],
  ['hydrogen', 'Hydrogen', 'commerce'],
  ['stripe', 'Stripe', 'commerce'],
  ['algolia', 'Algolia', 'commerce'],
  ['aws', 'AWS', 'infrastructure'],
  ['vercel', 'Vercel', 'infrastructure'],
  ['cloudflare', 'Cloudflare', 'infrastructure'],
  ['docker', 'Docker', 'infrastructure'],
  ['ci-cd', 'CI/CD', 'infrastructure'],
  ['sanity', 'Sanity', 'cms'],
  ['contentful', 'Contentful', 'cms'],
  ['payload', 'Payload', 'cms'],
  ['figma-api', 'Figma API', 'design'],
];

const technologies: SeedDocument[] = techList.map(([id, name, category], i) => ({
  _id: `tech-${id}`,
  _type: 'technology',
  name,
  category,
  order: i + 1,
}));

const T = (id: string) => `tech-${id}`;

/* ── Clients ────────────────────────────────────────────────────────── */

const clients: SeedDocument[] = [
  { _id: 'client-meridian', _type: 'client', name: 'Meridian Capital', website: 'https://example.com/meridian', industry: ref('industry-fintech') },
  { _id: 'client-vessel', _type: 'client', name: 'Vessel Commerce', website: 'https://example.com/vessel', industry: ref('industry-commerce') },
  { _id: 'client-orbital', _type: 'client', name: 'Orbital Systems', website: 'https://example.com/orbital', industry: ref('industry-saas') },
  { _id: 'client-pragma', _type: 'client', name: 'Pragma Design', website: 'https://example.com/pragma', industry: ref('industry-design-tools') },
  { _id: 'client-forta', _type: 'client', name: 'Forta Protocol', website: 'https://example.com/forta', industry: ref('industry-web3') },
  { _id: 'client-cadence', _type: 'client', name: 'Cadence Health', website: 'https://example.com/cadence', industry: ref('industry-healthcare') },
  { _id: 'client-arc-recovery', _type: 'client', name: 'ARC Recovery', website: 'https://arcrecovery.ai', industry: ref('industry-healthcare') },
  { _id: 'client-thaleon', _type: 'client', name: 'THALÉON', website: 'https://thaleonnutrition.com', industry: ref('industry-commerce') },
  { _id: 'client-yg-garcia', _type: 'client', name: 'Y.G. García', industry: ref('industry-publishing') },
  { _id: 'client-inservice', _type: 'client', name: 'InService', industry: ref('industry-marketplace') },
  { _id: 'client-qrec', _type: 'client', name: 'Qatar Racing and Equestrian Club', website: 'https://qrec.gov.qa', industry: ref('industry-sports') },
];

/* ── Developers ─────────────────────────────────────────────────────── */

const developers: SeedDocument[] = [
  {
    _id: 'developer-fadi-zakharia',
    _type: 'developer',
    name: 'Fadi Zakharia',
    slug: { current: 'fadi-zakharia' },
    title: 'Backend & Systems Architecture',
    shortTitle: 'Backend & Architecture',
    portrait: image(unsplash(IMG.marcus, 1200, 1600), 'Portrait of Fadi Zakharia'),
    shortBio:
      'Fadi brings 7 years of production backend engineering — from financial systems processing billions of transactions to AI infrastructure serving millions of requests. He thinks in systems before writing a single line.',
    longBio:
      'Before madebyfn, Fadi led backend engineering at a Series B fintech, where he built the data infrastructure that processed $3B in transactions. Prior to that, 3 years building distributed systems at a scale-up infrastructure company. He thinks about data models the way architects think about load-bearing walls — as decisions that will outlast everything built on top of them.',
    approachQuote:
      'I want to understand the business completely before I touch a database schema. The technical decisions we make in week one will constrain everything that follows.',
    yearsOfExperience: 7,
    since: '2022',
    location: 'Beirut, Lebanon',
    languages: ['English', 'Arabic'],
    order: 1,
    specializations: ['System architecture', 'Event-driven systems', 'Data infrastructure'],
    skills: ['System Architecture', 'Node.js', 'NestJS', '.NET Core', 'PostgreSQL', 'Redis', 'Event-driven systems', 'AWS', 'Python'],
    technologies: refs([T('nodejs'), T('nestjs'), T('dotnet'), T('postgresql'), T('redis'), T('aws'), T('python')]),
    featuredProjects: refs(['project-meridian', 'project-forta', 'project-orbital']),
    github: 'https://github.com/fadizakharia2',
  },
  {
    _id: 'developer-nad-ghantous',
    _type: 'developer',
    name: 'Nad Ghantous',
    slug: { current: 'nad-ghantous' },
    title: 'Frontend & Product Engineering',
    shortTitle: 'Frontend & Product',
    portrait: image(unsplash(IMG.soren, 1200, 1600), 'Portrait of Nad Ghantous'),
    shortBio:
      'Nad has spent 6 years building interfaces that teams are proud to use. He brings product instincts to every engineering decision — and writes frontend code that other developers want to work inside.',
    longBio:
      'Nad spent 4 years building design systems and complex interfaces at a product design consultancy, then 2 years as frontend lead at an enterprise SaaS company. His background straddles engineering and design — he can read a Figma file and argue about a component API in the same conversation. He is the reason the interfaces we ship feel considered, not just functional.',
    approachQuote:
      'I am always thinking about the person on the other end of the interface. Every interaction is a conversation between the system and a human. That conversation should be clear.',
    yearsOfExperience: 6,
    since: '2022',
    location: 'Beirut, Lebanon',
    languages: ['English', 'Arabic'],
    order: 2,
    specializations: ['Design systems', 'Interaction engineering', 'Mobile'],
    skills: ['React', 'Next.js', 'Astro', 'TypeScript', 'React Native', 'Design Systems', 'Animation', 'Performance'],
    technologies: refs([T('react'), T('nextjs'), T('astro'), T('typescript'), T('react-native'), T('design-systems')]),
    featuredProjects: refs(['project-vessel', 'project-pragma', 'project-orbital']),
  },
];

/* ── Services ───────────────────────────────────────────────────────── */

const services: SeedDocument[] = [
  {
    _id: 'service-product-engineering',
    _type: 'service',
    name: 'Product Engineering',
    slug: { current: 'product-engineering' },
    tagline: 'Concept to production. No handoffs.',
    shortDescription:
      'From technical spec to production system. We take full ownership of complex digital products — architecture, implementation, and delivery.',
    longDescription:
      'Full ownership of complex digital products — from technical specification through to deployment and iteration. We work as a complete product engineering team, not a development resource.',
    summary: 'SaaS, platforms, MVPs, web applications',
    capabilities: ['SaaS platforms', 'Internal tools', 'MVPs that survive contact with users', 'Web applications'],
    typicalProblems: [
      'You need to move fast without accumulating debt',
      'Your product is too complex for generalist developers',
      'You need engineers who think about the product, not just the spec',
    ],
    engagement: 'Sprint-based engagement, full ownership model, technical co-founder dynamic',
    featured: true,
    order: 1,
    technologies: refs([T('react'), T('nextjs'), T('nodejs'), T('nestjs'), T('postgresql'), T('redis'), T('aws'), T('typescript')]),
    homepageTechnologies: refs([T('react'), T('nodejs'), T('nestjs'), T('postgresql'), T('aws')]),
    projects: refs(['project-meridian', 'project-orbital']),
  },
  {
    _id: 'service-frontend-engineering',
    _type: 'service',
    name: 'Frontend Engineering',
    slug: { current: 'frontend-engineering' },
    tagline: 'Interfaces worth using.',
    shortDescription:
      'Precision interfaces that perform as well as they look. We build component systems, design implementations, and complex UI that holds up at scale.',
    longDescription:
      'Component systems, design implementations, and complex UI built with the precision your product deserves. We build frontend that holds up at scale — technically and visually.',
    summary: 'Component systems, design implementation, performance',
    capabilities: ['Design system implementation', 'Complex interactive UI', 'Performance engineering', 'Marketing sites that convert'],
    typicalProblems: [
      'Your design deserves better implementation',
      'Your component system is becoming a liability',
      'Performance is affecting conversion and experience',
    ],
    engagement: 'Component system audit, design handoff, performance sprint, ongoing feature development',
    featured: true,
    order: 2,
    technologies: refs([T('react'), T('nextjs'), T('astro'), T('typescript'), T('framer-motion'), T('design-systems'), T('webgl')]),
    homepageTechnologies: refs([T('react'), T('nextjs'), T('astro'), T('typescript'), T('framer-motion')]),
    projects: refs(['project-pragma', 'project-vessel']),
  },
  {
    _id: 'service-backend-architecture',
    _type: 'service',
    name: 'Backend & Architecture',
    slug: { current: 'backend-architecture' },
    tagline: 'Systems that scale beyond your current imagination.',
    shortDescription:
      'Systems designed to last. APIs built for evolution, not just delivery. We design backend architecture that scales with your ambitions.',
    longDescription:
      'Backend architecture designed to last. APIs built for evolution. Infrastructure that handles the growth you have not planned for yet.',
    summary: 'APIs, databases, microservices, system design',
    capabilities: ['API design', 'Data architecture', 'Event-driven systems', 'Infrastructure and observability'],
    typicalProblems: [
      'Your backend is becoming a bottleneck',
      'You need a real API — not a collection of endpoints',
      'Your data architecture is slowing development',
    ],
    engagement: 'Architecture review, greenfield build, scaling sprint, API design consultation',
    featured: true,
    order: 3,
    technologies: refs([T('nodejs'), T('nestjs'), T('dotnet'), T('postgresql'), T('redis'), T('mongodb'), T('docker'), T('aws'), T('cloudflare')]),
    homepageTechnologies: refs([T('nodejs'), T('nestjs'), T('dotnet'), T('postgresql'), T('redis')]),
    projects: refs(['project-meridian', 'project-forta']),
  },
  {
    _id: 'service-ai-automation',
    _type: 'service',
    name: 'AI & Automation',
    slug: { current: 'ai-automation' },
    tagline: 'LLM integrations that solve real problems.',
    shortDescription:
      'LLM integrations that solve real problems. AI workflows that fit how your team already works — not solutions in search of a problem.',
    longDescription:
      'AI integrations that fit how your business actually works — not theoretical pipelines. Automation that replaces friction, not jobs.',
    summary: 'LLM integration, AI workflows, business automation',
    capabilities: ['LLM-powered product features', 'Retrieval and search', 'Agentic workflows', 'Back-office automation'],
    typicalProblems: [
      'You want to use AI but are not sure where it actually adds value',
      'Your current AI implementation is brittle in production',
      'Manual processes are slowing your team down',
    ],
    engagement: 'AI audit, proof-of-concept build, production integration, agent development',
    featured: true,
    order: 4,
    technologies: refs([T('openai'), T('anthropic'), T('langchain'), T('llamaindex'), T('pinecone'), T('python'), T('typescript')]),
    homepageTechnologies: refs([T('openai'), T('anthropic'), T('langchain'), T('pinecone'), T('python')]),
    projects: refs(['project-orbital']),
  },
  {
    _id: 'service-mobile-engineering',
    _type: 'service',
    name: 'Mobile Engineering',
    slug: { current: 'mobile-engineering' },
    tagline: 'React Native done properly.',
    shortDescription:
      'React Native products built with the care of native. Shared logic, platform-appropriate UX, and deployment pipelines that ship continuously.',
    longDescription:
      'Cross-platform mobile applications with native-quality performance and platform-appropriate UX. Not a web app in a shell.',
    summary: 'Cross-platform mobile, native performance',
    capabilities: ['iOS and Android from one codebase', 'Native modules where it matters', 'App Store and Play deployment', 'Offline-first data'],
    typicalProblems: [
      'You need iOS and Android without two separate codebases',
      'Your current mobile app feels like a web app',
      'Performance is hurting your app store ratings',
    ],
    engagement: 'Native audit, greenfield build, performance sprint, App Store deployment',
    featured: true,
    order: 5,
    technologies: refs([T('react-native'), T('expo'), T('typescript'), T('ios'), T('android'), T('fastlane')]),
    homepageTechnologies: refs([T('react-native'), T('expo'), T('typescript'), T('ios'), T('android')]),
    projects: refs(['project-cadence', 'project-orbital']),
  },
  {
    _id: 'service-commerce-engineering',
    _type: 'service',
    name: 'Commerce Engineering',
    slug: { current: 'commerce-engineering' },
    tagline: 'Storefronts that convert.',
    shortDescription:
      'Headless storefronts and custom checkout experiences. We build commerce systems that convert — not just look good in a Figma file.',
    longDescription:
      'Headless commerce implementations, custom checkout experiences, and performance-first storefronts for serious DTC brands.',
    summary: 'Headless commerce, custom storefronts, DTC',
    capabilities: ['Headless Shopify storefronts', 'Custom checkout flows', 'Subscription and bundle logic', 'Search and merchandising'],
    typicalProblems: [
      'Your Shopify theme is limiting your product vision',
      'Checkout performance is hurting conversion',
      'You need commerce logic that your platform cannot support',
    ],
    engagement: 'Platform migration, custom storefront, checkout optimization, headless architecture',
    featured: true,
    order: 6,
    technologies: refs([T('shopify'), T('hydrogen'), T('nextjs'), T('sanity'), T('stripe'), T('algolia'), T('cloudflare')]),
    homepageTechnologies: refs([T('shopify'), T('hydrogen'), T('nextjs'), T('stripe'), T('sanity')]),
    projects: refs(['project-vessel']),
  },
];

/* ── Testimonials ───────────────────────────────────────────────────── */

const testimonials: SeedDocument[] = [
  {
    _id: 'testimonial-elena-voss',
    _type: 'testimonial',
    quote:
      'Working with Fadi and Nad felt nothing like hiring a freelance team. They had the product instincts of a senior internal team and the technical depth to back it up. They shipped more in 8 weeks than our previous agency did in six months.',
    person: 'Elena Voss',
    role: 'Co-founder & CEO',
    company: 'Meridian Capital',
    client: ref('client-meridian'),
    project: ref('project-meridian'),
    featured: true,
    order: 1,
  },
  {
    _id: 'testimonial-james-okafor',
    _type: 'testimonial',
    quote:
      'The quality of thinking they brought to our architecture saved us from months of tech debt. Clear communication, fast delivery, and they never had to be told something twice. Exceptional.',
    person: 'James Okafor',
    role: 'Head of Product',
    company: 'Vessel Commerce',
    client: ref('client-vessel'),
    project: ref('project-vessel'),
    featured: true,
    order: 2,
  },
  {
    _id: 'testimonial-sasha-mendez',
    _type: 'testimonial',
    quote:
      'Most developers either write great code or think about the product — madebyfn does both. They pushed back on specs that would have hurt us and suggested solutions we had not considered. Worth every penny.',
    person: 'Sasha Mendez',
    role: 'CTO',
    company: 'Orbital Systems',
    client: ref('client-orbital'),
    project: ref('project-orbital'),
    featured: true,
    order: 3,
  },
];

/* ── Projects ───────────────────────────────────────────────────────── */

const meridianCaseStudy = [
  {
    _type: 'blockRichText',
    _key: key(),
    heading: 'The challenge',
    content: [
      block(
        'Meridian Capital was managing $2.4 billion in assets across 14 funds using a fragile patchwork of Excel spreadsheets, legacy VBA macros, and manual reporting workflows built up over a decade of institutional inertia. Report generation took three working days. Risk calculations ran nightly. Decision-makers were always behind the data.',
      ),
    ],
  },
  {
    _type: 'blockRichText',
    _key: key(),
    heading: 'Our approach',
    content: [
      block(
        'We began with two weeks of domain immersion before writing a single line of code. Understanding how portfolio managers think, what decisions they actually make, and where the system was creating friction — not just technical friction, but cognitive friction. The architecture emerged from this understanding, not from a generic technical playbook.',
      ),
    ],
  },
  {
    _type: 'blockArchitecture',
    _key: key(),
    eyebrow: 'Architecture',
    heading: 'Seven sources, one query engine.',
    caption: 'Event-driven ingestion feeding a purpose-built analytics store.',
    layers: [
      { _type: 'layer', _key: key(), name: 'Ingestion', description: 'Event-driven pipelines from seven independent data sources with conflict resolution and audit trails.', technologies: ['Node.js', 'Redis Streams'] },
      { _type: 'layer', _key: key(), name: 'Analytics store', description: 'A custom query engine optimised for portfolio analytics workloads rather than general-purpose SQL.', technologies: ['PostgreSQL', 'TimescaleDB'] },
      { _type: 'layer', _key: key(), name: 'API', description: 'A typed GraphQL layer shaped around analyst questions, not table structures.', technologies: ['NestJS', 'GraphQL'] },
      { _type: 'layer', _key: key(), name: 'Interface', description: 'A React interface designed around analyst mental models.', technologies: ['React', 'TypeScript'] },
    ],
  },
  {
    _type: 'blockRichText',
    _key: key(),
    heading: 'Engineering',
    content: [
      block(
        'Event-driven data ingestion from seven independent data sources with conflict resolution and audit trails. A custom query engine optimized specifically for portfolio analytics workloads — not general-purpose SQL. A React interface designed around analyst mental models rather than database schemas.',
      ),
    ],
  },
  {
    _type: 'blockFullWidthImage',
    _key: key(),
    image: image(unsplash(IMG.vessel, 2000, 800), 'Meridian analytics dashboard'),
    height: 'standard',
  },
  {
    _type: 'blockCode',
    _key: key(),
    intro: 'Every ingested event is validated and versioned before it can influence a position.',
    code: codeBlock(
      'src/ingestion/pipeline.ts',
      'typescript',
      `export async function ingest(event: MarketEvent) {\n  const validated = schema.parse(event)\n  const version = await ledger.append(validated)\n  await positions.recompute(version)\n}`,
    ),
  },
  {
    _type: 'blockRichText',
    _key: key(),
    heading: 'The result',
    content: [
      block(
        'Reports that once took three days now run in hours. Real-time risk calculations replaced overnight batch jobs. The team made faster, better-informed decisions from day one. Six months post-launch: zero critical incidents, and a CTO who called it the best technology investment the firm had made.',
      ),
    ],
  },
  {
    _type: 'blockMetrics',
    _key: key(),
    eyebrow: 'Results',
    metrics: [metric('340%', 'Faster reporting'), metric('$2.4B', 'AUM managed'), metric('<100ms', 'Query latency'), metric('0', 'Data incidents')],
  },
  { _type: 'blockTestimonial', _key: key(), testimonial: ref('testimonial-elena-voss') },
];

const vesselCaseStudy = [
  {
    _type: 'blockHeading',
    _key: key(),
    eyebrow: 'Overview',
    heading: 'A storefront built for the checkout, not the homepage.',
    text: 'Vessel sells high-volume consumables direct to consumers. Their Shopify theme had become a bottleneck for merchandising, search and — critically — checkout speed.',
  },
  {
    _type: 'blockStickyTextVisual',
    _key: key(),
    eyebrow: 'Strategy',
    heading: 'Decouple the storefront from the platform.',
    visualSide: 'right',
    image: image(unsplash(IMG.orbital, 1400, 1600), 'Vessel product detail page'),
    body: [
      block(
        'We moved presentation to a headless storefront while keeping Shopify as the system of record for orders and inventory. That let the team ship merchandising changes daily without touching checkout logic.',
      ),
      block('Search and filtering moved to Algolia. Content moved to Sanity. Shopify kept doing what it is best at: taking money reliably.'),
    ],
  },
  {
    _type: 'blockComparison',
    _key: key(),
    eyebrow: 'Before / after',
    heading: 'What changed for the team.',
    beforeLabel: 'Theme',
    afterLabel: 'Headless',
    rows: [
      { _type: 'row', _key: key(), aspect: 'Time to first byte', before: '1.9s on product pages', after: '180ms, edge-cached' },
      { _type: 'row', _key: key(), aspect: 'Merchandising', before: 'Developer ticket per change', after: 'Editors publish in Sanity' },
      { _type: 'row', _key: key(), aspect: 'Checkout', before: 'Six steps, no address lookup', after: 'Two steps, one-tap wallets' },
    ],
  },
  {
    _type: 'blockGallery',
    _key: key(),
    eyebrow: 'Screens',
    heading: 'Collection, product, checkout.',
    images: [
      image(unsplash(IMG.vessel, 1200, 900), 'Collection page'),
      image(unsplash(IMG.pragma, 1200, 900), 'Product page'),
      image(unsplash(IMG.cadence, 1200, 900), 'Checkout'),
    ],
  },
  {
    _type: 'blockMetrics',
    _key: key(),
    eyebrow: 'Results',
    metrics: [metric('+28%', 'Checkout conversion'), metric('180ms', 'TTFB'), metric('4×', 'Merchandising velocity')],
  },
  { _type: 'blockTestimonial', _key: key(), testimonial: ref('testimonial-james-okafor') },
  {
    _type: 'blockCta',
    _key: key(),
    heading: 'Running a storefront that fights you?',
    body: 'We will tell you honestly whether headless is the right move — and what it would take.',
    link: internalLink('Start a Project', 'startProjectPage'),
  },
];

const projects: SeedDocument[] = [
  {
    _id: 'project-arc-recovery',
    _type: 'project',
    name: 'ARC Recovery',
    slug: { current: 'arc-recovery' },
    client: ref('client-arc-recovery'),
    statement: 'Robotic recovery sessions, booked in seconds.',
    shortDescription: 'Marketing site, booking flow and AI chat assistant for a robotic massage studio in Chicago and Miami.',
    fullDescription:
      'The full web presence for ARC Recovery: an Astro site with Zenoti booking for every location, an HSA/FSA savings calculator, a recovery quiz, server-decided promotions and a Claude-powered assistant that answers from the studio’s own knowledge base.',
    year: '2026',
    industry: ref('industry-healthcare'),
    industryLabel: 'Wellness & Recovery',
    services: refs(['service-product-engineering', 'service-frontend-engineering', 'service-ai-automation']),
    serviceTags: ['Web Platform', 'Frontend', 'AI Assistant'],
    technologies: refs([T('astro'), T('typescript'), T('sanity'), T('anthropic'), T('vercel')]),
    headlineResult: 'Live in Chicago and Miami',
    role: 'Design implementation, engineering and AI integration',
    featured: true,
    order: 1,
    heroImage: image(shot('arc-recovery/home.jpg'), 'ARC Recovery homepage: personalized recovery sessions, booked in seconds'),
    mobileHeroImage: image(shot('arc-recovery/mobile.jpg'), 'ARC Recovery homepage on a phone'),
    gallery: [
      image(shot('arc-recovery/hsa-calculator.jpg'), 'HSA/FSA calculator showing the real cost per session'),
      image(shot('arc-recovery/sports-recovery.jpg'), 'Sports recovery landing page'),
      image(shot('arc-recovery/faq.jpg'), 'Searchable FAQ grouped by topic'),
    ],
    challenge:
      'A new kind of service, robotic massage, needed a site that explains it plainly, gets people booked at the right location and answers the same questions a front desk would, around the clock.',
    solution:
      'A static Astro site with one booking chooser for every location, an HSA/FSA calculator, a ten-screen recovery quiz and a chat assistant grounded in an approved knowledge base. Editable copy lives in Sanity.',
    engineering:
      'Promotions are decided on the server, never in the browser. The only server code is a handful of routes for chat, sign-ups and webhooks, and Playwright tests drive the chat widget, booking and key flows at three screen widths.',
    results: 'Live at arcrecovery.ai, serving both cities from one codebase with a self-serve CMS for the owner.',
    metrics: [metric('2', 'Cities served'), metric('56', 'FAQ answers'), metric('24/7', 'AI assistant')],
    developers: refs(['developer-fadi-zakharia']),
    externalLink: 'https://arcrecovery.ai',
  },
  {
    _id: 'project-thaleon',
    _type: 'project',
    name: 'THALÉON',
    slug: { current: 'thaleon' },
    client: ref('client-thaleon'),
    statement: 'A Mediterranean wellness brand, launched headless.',
    shortDescription: 'Headless Shopify storefront and pre-sale for a Mediterranean botanical supplements brand.',
    fullDescription:
      'A Next.js storefront on the Shopify Storefront API with a NestJS service for newsletter, reviews and pre-sale reservations. Day and night themes, a five-formulation catalogue and a pre-sale where every price comes from Shopify.',
    year: '2026',
    industry: ref('industry-commerce'),
    industryLabel: 'DTC Wellness Commerce',
    services: refs(['service-commerce-engineering', 'service-frontend-engineering', 'service-backend-architecture']),
    serviceTags: ['Commerce Engineering', 'Frontend', 'API Design'],
    technologies: refs([T('nextjs'), T('react'), T('typescript'), T('nestjs'), T('postgresql'), T('shopify')]),
    headlineResult: 'Pre-sale launched on Shopify',
    role: 'Full-stack commerce engineering',
    featured: true,
    order: 2,
    heroImage: image(shot('thaleon/home.jpg'), 'THALÉON storefront homepage with the five formulations'),
    mobileHeroImage: image(shot('thaleon/mobile.jpg'), 'THALÉON storefront on a phone'),
    gallery: [
      image(shot('thaleon/shop.jpg'), 'Collection page with family and form filters'),
      image(shot('thaleon/product.jpg'), 'Olive Leaf product page with bottle-quantity pricing'),
      image(shot('thaleon/journal.jpg'), 'Journal: the stories behind the ingredients'),
      image(shot('thaleon/mobile-product.jpg'), 'Product page on a phone'),
    ],
    challenge:
      'A new supplements brand wanted a storefront that matched a premium photographic design and could open a pre-sale before launch, without duplicating its catalogue or pricing outside Shopify.',
    solution:
      'Shopify stays the source of truth for products, prices, cart and checkout, called server-side from Next.js. A NestJS API with PostgreSQL owns only what Shopify does not: newsletter, reviews and reservations, with Klaviyo handling email.',
    engineering:
      'Pre-sale figures are always read from Shopify and checkout is withheld unless every line is priced correctly. A local catalogue keeps the storefront fully runnable without Shopify credentials.',
    results: 'Pre-sale storefront live, with the full post-launch store ready on its own branch.',
    metrics: [metric('5', 'Formulations'), metric('2', 'Themes'), metric('0', 'Hardcoded prices')],
    developers: refs(['developer-fadi-zakharia']),
    externalLink: 'https://thaleonnutrition.com',
  },
  {
    _id: 'project-yg-garcia',
    _type: 'project',
    name: 'Y.G. García',
    slug: { current: 'yg-garcia' },
    client: ref('client-yg-garcia'),
    statement: 'A home for a debut novelist and his universe.',
    shortDescription: 'Author website, shop and admin dashboard for a debut tokusatsu novelist.',
    fullDescription:
      'A three-part platform for author Y.G. García: a Next.js site for his books, characters, events and blog, a Shopify-backed shop, and an Auth0-secured admin dashboard on a GraphQL API where he manages every book and character himself.',
    year: '2021',
    industry: ref('industry-publishing'),
    industryLabel: 'Publishing & Media',
    services: refs(['service-product-engineering', 'service-frontend-engineering', 'service-backend-architecture']),
    serviceTags: ['Web Platform', 'Admin Dashboard', 'GraphQL API'],
    technologies: refs([T('nextjs'), T('react'), T('typescript'), T('rest-graphql'), T('postgresql'), T('shopify'), T('aws')]),
    headlineResult: 'Site, shop and admin in one',
    role: 'Full-stack engineering',
    featured: false,
    order: 3,
    heroImage: image(shot('yg-garcia/hero.jpg'), 'Y.G. García logo beside two characters from his novels'),
    mobileHeroImage: image(shot('yg-garcia/mobile.jpg'), 'Y.G. García logo above a character illustration'),
    gallery: [
      image(shot('yg-garcia/characters.jpg'), 'Character art featured on the site'),
      image(shot('yg-garcia/logo.jpg'), 'The Y.G. García wordmark'),
    ],
    challenge:
      'A self-published author needed one place to present his books and the characters behind them, sell editions and merchandise, and publish news, without asking a developer for every update.',
    solution:
      'A Next.js site that pulls books and characters from a GraphQL API, posts from a WordPress blog and products from Shopify. A React admin dashboard lets the author manage books, characters, images and purchase options.',
    architecture:
      'TypeGraphQL and Apollo Server on PostgreSQL through TypeORM, with role-based access control, Auth0 tokens verified by JWKS, and image uploads to S3.',
    results: 'Three connected apps that put the author in charge of his own catalogue.',
    metrics: [metric('3', 'Connected apps'), metric('3', 'Content sources')],
    developers: refs(['developer-fadi-zakharia']),
  },
  {
    _id: 'project-inservice',
    _type: 'project',
    name: 'InService',
    slug: { current: 'inservice' },
    client: ref('client-inservice'),
    statement: 'Stay home, get serviced.',
    shortDescription: 'Mobile marketplace connecting customers with nearby home-service providers.',
    fullDescription:
      'A React Native app where customers find services near them, book events and chat with providers, and providers publish and manage their own services, backed by a Node.js API on MongoDB and Redis.',
    year: '2022',
    industry: ref('industry-marketplace'),
    industryLabel: 'Home Services Marketplace',
    services: refs(['service-mobile-engineering', 'service-backend-architecture']),
    serviceTags: ['Mobile', 'API Design'],
    technologies: refs([T('react-native'), T('expo'), T('typescript'), T('nodejs'), T('mongodb'), T('redis'), T('aws')]),
    headlineResult: 'Customer and provider app in one',
    role: 'Mobile and backend engineering',
    featured: false,
    order: 4,
    heroImage: image(shot('inservice/hero.jpg'), 'InService logo beside the app login screen'),
    mobileHeroImage: image(shot('inservice/mobile.jpg'), 'InService splash screen'),
    gallery: [
      image(shot('inservice/screens.jpg'), 'InService splash and login screens'),
      image(shot('inservice/login.jpg'), 'InService login screen'),
    ],
    challenge: 'Customers struggle to find trusted home-service providers nearby, and small providers have no simple way to list and schedule their work.',
    solution:
      'One Expo app with two modes: customers browse nearby services by location, book events and message providers in-app; providers create and update services and manage their events.',
    architecture:
      'An Express API in TypeScript on MongoDB with Redis-backed sessions, Argon2 password hashing, and photo uploads to S3. In-app chat runs on TalkJS.',
    results: 'A complete two-sided marketplace, from sign-up to chat, built by one engineer.',
    metrics: [metric('2', 'User roles'), metric('2', 'Apps: mobile + API')],
    developers: refs(['developer-fadi-zakharia']),
  },
  {
    _id: 'project-qrec',
    _type: 'project',
    name: 'QREC',
    slug: { current: 'qrec' },
    client: ref('client-qrec'),
    statement: 'Qatar’s racing and equestrian season, online.',
    shortDescription: 'Bilingual public website for the Qatar Racing and Equestrian Club, where Fadi was Senior Team Lead Backend Engineer at Mannai Corporation.',
    fullDescription:
      'The Qatar Racing and Equestrian Club’s website in Arabic and English: the race calendar with full race cards, the Arabian horse show section, the online studbook, auctions and e-services for owners and trainers.',
    year: '2024',
    industry: ref('industry-sports'),
    industryLabel: 'Horse Racing & Equestrian',
    services: refs(['service-backend-architecture', 'service-product-engineering']),
    serviceTags: ['Government Website', 'Backend', 'Team Lead'],
    headlineResult: 'Live at qrec.gov.qa',
    role: 'Senior Team Lead Backend Engineer at Mannai Corporation',
    featured: false,
    order: 5,
    heroImage: image(shot('qrec/home.jpg'), 'QREC homepage with the race meeting banner and race calendar'),
    mobileHeroImage: image(shot('qrec/mobile.jpg'), 'QREC homepage on a phone'),
    gallery: [
      image(shot('qrec/race-calendar.jpg'), 'Race card for an Al Rayyan race meeting'),
      image(shot('qrec/horse-show.jpg'), 'Arabian Horse Show section'),
      image(shot('qrec/stud-book.jpg'), 'Online studbook search with bilingual columns'),
    ],
    challenge:
      'The club runs a full racing season, Arabian horse shows, auctions and a horse registry, and owners, trainers and the public need all of it in one place, in Arabic and English.',
    solution:
      'One bilingual site that brings together the race calendar and race cards, the horse show programme, the online studbook, media, auctions and e-services, with a login for owners and a separate trainer portal.',
    results: 'Live at qrec.gov.qa.',
    developers: refs(['developer-fadi-zakharia']),
    externalLink: 'https://qrec.gov.qa',
  },
  {
    _id: 'project-meridian',
    _type: 'project',
    name: 'Meridian',
    slug: { current: 'meridian' },
    client: ref('client-meridian'),
    statement: 'Financial intelligence for institutional investment.',
    shortDescription: 'Real-time financial intelligence platform for institutional investors.',
    fullDescription:
      'A real-time financial intelligence platform serving institutional investors. Complex data pipelines, sub-100ms query performance, and a precision-crafted interface managing $2.4B in assets.',
    year: '2024',
    industry: ref('industry-fintech'),
    industryLabel: 'Financial Technology',
    services: refs(['service-product-engineering', 'service-backend-architecture', 'service-frontend-engineering']),
    serviceTags: ['Product Engineering', 'Backend Architecture', 'Frontend'],
    technologies: refs([T('react'), T('nodejs'), T('postgresql')]),
    headlineResult: '+340% faster reporting',
    timeline: '14 weeks',
    role: 'Full product engineering',
    featured: true,
    order: 5,
    heroImage: image(unsplash(IMG.meridian), 'Meridian portfolio analytics interface'),
    challenge:
      'Meridian Capital was managing $2.4B in assets across 14 funds using a patchwork of Excel sheets, legacy VBA scripts, and manual reporting workflows. Decision-making was slow. Reporting was days behind.',
    strategy: 'Two weeks of domain immersion before a single line of code, so the architecture emerged from how analysts actually work.',
    solution: 'Event-driven ingestion from 7 data sources, a custom query engine for portfolio analytics, and a React interface built around analyst mental models.',
    results: 'Reports that took 3 days now take hours. Real-time risk replaced overnight batches. Zero critical incidents six months post-launch.',
    metrics: [metric('340%', 'Faster reporting'), metric('$2.4B', 'AUM managed'), metric('<100ms', 'Query latency'), metric('0', 'Data incidents')],
    testimonials: refs(['testimonial-elena-voss']),
    developers: refs(['developer-fadi-zakharia', 'developer-nad-ghantous']),
    caseStudy: meridianCaseStudy,
    nextProject: ref('project-vessel'),
  },
  {
    _id: 'project-vessel',
    _type: 'project',
    name: 'Vessel',
    slug: { current: 'vessel' },
    client: ref('client-vessel'),
    statement: 'Composable commerce for a high-volume DTC brand.',
    shortDescription: 'Headless commerce platform for high-volume DTC brands.',
    fullDescription:
      'A fully composable commerce platform built for DTC brands processing high-volume sales. Custom storefront, real-time inventory, and a headless checkout converting 28% better than industry average.',
    year: '2024',
    industry: ref('industry-commerce'),
    industryLabel: 'Headless Commerce',
    services: refs(['service-commerce-engineering', 'service-frontend-engineering', 'service-backend-architecture']),
    serviceTags: ['Commerce Engineering', 'Frontend', 'API Design'],
    technologies: refs([T('nextjs'), T('shopify'), T('stripe')]),
    headlineResult: '+28% conversion rate',
    timeline: '10 weeks',
    role: 'Storefront and checkout engineering',
    featured: true,
    order: 6,
    heroImage: image(unsplash(IMG.vessel), 'Vessel storefront on desktop and mobile'),
    challenge: 'A Shopify theme that had become a bottleneck for merchandising, search and checkout speed.',
    solution: 'Headless storefront with Shopify as system of record, Algolia search and Sanity content.',
    results: 'Checkout conversion up 28%. Merchandising changes ship daily without engineering.',
    metrics: [metric('+28%', 'Checkout conversion'), metric('180ms', 'TTFB'), metric('4×', 'Merchandising velocity')],
    testimonials: refs(['testimonial-james-okafor']),
    developers: refs(['developer-nad-ghantous', 'developer-fadi-zakharia']),
    caseStudy: vesselCaseStudy,
  },
  {
    _id: 'project-orbital',
    _type: 'project',
    name: 'Orbital',
    slug: { current: 'orbital' },
    client: ref('client-orbital'),
    statement: 'AI-assisted project management for engineering teams.',
    shortDescription: 'AI-powered project management for engineering teams.',
    fullDescription:
      'An AI-powered engineering project management tool. LLM-driven task decomposition, automated sprint planning, and deep integration with GitHub — built for teams that ship.',
    year: '2023',
    industry: ref('industry-saas'),
    industryLabel: 'SaaS / Productivity',
    services: refs(['service-product-engineering', 'service-ai-automation', 'service-mobile-engineering']),
    serviceTags: ['SaaS Engineering', 'AI Integration', 'Mobile'],
    technologies: refs([T('react'), T('ai-llm'), T('react-native')]),
    headlineResult: '4.8★ Product Hunt launch',
    timeline: '16 weeks',
    role: 'Product engineering and AI integration',
    featured: true,
    order: 7,
    heroImage: image(unsplash(IMG.orbital), 'Orbital sprint planning board'),
    challenge: 'Engineering managers were spending a day a week turning specs into tickets and re-planning sprints by hand.',
    strategy: 'Treat the LLM as a drafting assistant with strict schemas, never as the source of truth.',
    solution: 'Structured task decomposition with human review, GitHub-native sync, and a companion mobile app for standups.',
    results: 'Launched to a 4.8★ Product Hunt reception; planning time per sprint dropped from a day to under an hour.',
    metrics: [metric('4.8★', 'Product Hunt rating'), metric('-85%', 'Planning time'), metric('12k', 'Tickets generated')],
    testimonials: refs(['testimonial-sasha-mendez']),
    developers: refs(['developer-fadi-zakharia', 'developer-nad-ghantous']),
    gallery: [image(unsplash(IMG.orbital, 1400, 900), 'Task decomposition view'), image(unsplash(IMG.pragma, 1400, 900), 'Sprint timeline')],
  },
  {
    _id: 'project-pragma',
    _type: 'project',
    name: 'Pragma',
    slug: { current: 'pragma' },
    client: ref('client-pragma'),
    statement: 'Design system tooling for distributed product teams.',
    shortDescription: 'Design system tooling for distributed product teams.',
    fullDescription:
      'Tooling that keeps Figma libraries and code components in lockstep, with automated drift detection and documentation generated from real usage.',
    year: '2023',
    industry: ref('industry-design-tools'),
    services: refs(['service-frontend-engineering']),
    technologies: refs([T('react'), T('typescript'), T('figma-api')]),
    headlineResult: '60+ teams onboarded',
    timeline: '12 weeks',
    role: 'Frontend and Figma platform engineering',
    featured: false,
    order: 8,
    heroImage: image(unsplash(IMG.pragma), 'Pragma component inventory'),
    challenge: 'Design and code drifted apart within weeks of every library release.',
    solution: 'A sync engine over the Figma API that diffs tokens and variants against the published component package.',
    results: 'Sixty teams onboarded in the first quarter; drift alerts replaced quarterly audits.',
    metrics: [metric('60+', 'Teams onboarded'), metric('0', 'Manual audits'), metric('3 min', 'Sync latency')],
    developers: refs(['developer-nad-ghantous']),
  },
  {
    _id: 'project-forta',
    _type: 'project',
    name: 'Forta',
    slug: { current: 'forta' },
    client: ref('client-forta'),
    statement: 'Monitoring infrastructure for blockchain security events.',
    shortDescription: 'Monitoring API infrastructure for blockchain security events.',
    fullDescription:
      'A high-throughput event API that ingests security signals from thousands of detection bots and serves them to downstream consumers with strict latency guarantees.',
    year: '2022',
    industry: ref('industry-web3'),
    services: refs(['service-backend-architecture']),
    technologies: refs([T('nodejs'), T('redis'), T('aws')]),
    headlineResult: '99.97% uptime',
    timeline: '9 weeks',
    role: 'Backend architecture',
    featured: false,
    order: 9,
    heroImage: image(unsplash(IMG.forta), 'Forta event throughput dashboard'),
    challenge: 'Bursty event volume was overwhelming a single-node API during market volatility.',
    solution: 'Partitioned ingestion with Redis streams, backpressure-aware consumers and regional failover on AWS.',
    results: '99.97% measured uptime over the following year with a 40% lower infrastructure bill.',
    metrics: [metric('99.97%', 'Uptime'), metric('-40%', 'Infra cost'), metric('50k/s', 'Peak events')],
    developers: refs(['developer-fadi-zakharia']),
  },
  {
    _id: 'project-cadence',
    _type: 'project',
    name: 'Cadence',
    slug: { current: 'cadence' },
    client: ref('client-cadence'),
    statement: 'Patient-facing remote care, done with care.',
    shortDescription: 'Patient-facing mobile app for remote care monitoring.',
    fullDescription:
      'A React Native app that lets patients log vitals, message care teams and receive medication reminders — with offline support and clinical-grade audit trails.',
    year: '2022',
    industry: ref('industry-healthcare'),
    services: refs(['service-mobile-engineering', 'service-backend-architecture']),
    technologies: refs([T('react-native'), T('expo'), T('dotnet')]),
    headlineResult: '12k MAU at launch',
    timeline: '18 weeks',
    role: 'Mobile engineering and API design',
    featured: false,
    order: 10,
    heroImage: image(unsplash(IMG.cadence), 'Cadence patient app'),
    challenge: 'A clinical pilot needed a patient app that worked in low-connectivity homes and satisfied audit requirements.',
    solution: 'Offline-first sync with conflict resolution, a .NET API with immutable audit logging, and accessibility-first UI.',
    results: 'Twelve thousand monthly active patients at launch and a successful pilot extension.',
    metrics: [metric('12k', 'MAU at launch'), metric('4.7★', 'App Store rating'), metric('100%', 'Audit coverage')],
    developers: refs(['developer-nad-ghantous', 'developer-fadi-zakharia']),
  },
];

/* ── Articles ───────────────────────────────────────────────────────── */

const articles: SeedDocument[] = [
  {
    _id: 'article-microservices',
    _type: 'article',
    title: 'Why we stopped using microservices for early-stage SaaS',
    slug: { current: 'why-we-stopped-using-microservices-for-early-stage-saas' },
    excerpt:
      'Microservices solve problems you do not have yet — and create problems you do not expect. A case for starting with a well-structured monolith.',
    coverImage: image(unsplash(IMG.pragma, 2000, 900), 'Abstract architecture diagram'),
    author: ref('developer-fadi-zakharia'),
    category: ref('category-architecture'),
    publishedAt: '2024-11-14T09:00:00Z',
    readingTime: 8,
    featured: true,
    showTableOfContents: true,
    body: [
      block(
        'We have declined several project inquiries in the past year from companies who wanted us to "microservice-ify" their application. In most cases, we told them the same thing: you do not have a microservices problem. You have an architecture problem that microservices will make significantly worse.',
      ),
      block('The microservices trap', 'h2'),
      block(
        'Microservices became fashionable because Netflix, Amazon, and Google used them successfully at enormous scale. What the blog posts conveniently omitted was that these companies had hundreds of engineers, mature DevOps organizations, and years of operational experience before they moved to that architecture.',
      ),
      block(
        "A 14-person startup with one DevOps-adjacent engineer does not have Netflix's operational maturity. They have Netflix's architecture documentation — which is a very different thing.",
      ),
      block(
        'Premature distribution is the root of much evil in software architecture. The cost of network calls, data consistency challenges, and service orchestration rarely pays dividends until you have genuinely outgrown a monolith.',
        'blockquote',
      ),
      block('What a monolith actually means', 'h2'),
      block(
        'When we recommend a monolith, we are not recommending a Big Ball of Mud. We are recommending a well-structured, domain-separated codebase with clear module boundaries, that happens to be deployed as a single unit.',
      ),
      block(
        'The modularity exists in the code. The simplicity exists in the deployment. You get both — and you defer the operational complexity of service orchestration until your actual scale demands it.',
      ),
      codeBlock(
        'src/modules/billing/',
        'typescript',
        `// Clear module boundaries. Single deployment.\nimport { BillingService } from '@/modules/billing'\nimport { CustomerService } from '@/modules/customers'\n\n// Domain logic stays together.\n// Network hops: zero.\n// Deployment complexity: minimal.`,
      ),
      block('When the refactor conversation starts', 'h2'),
      block(
        'The right moment to extract a service is when one part of the system has a measurably different scaling profile, deployment cadence or team ownership from the rest. Not before. If you cannot name the specific pain, you are not there yet.',
      ),
      callout('insight', 'A useful test', 'If extracting the service would not let you delete a pager alert, a deploy step or a meeting, it is probably not time.'),
      block('The practical path forward', 'h2'),
      block(
        'Start with a well-structured monolith. Deploy it as a single unit. Identify the seams in your domain model carefully. When — and only when — a specific service faces genuine scaling pressure, extract that service. Not the whole application. Not because your architecture looks like Netflix\'s. Because that specific service has a real problem that extraction will solve.',
      ),
      block(
        'Most early-stage products will never need to make that extraction. And that is fine. The goal is software that serves users effectively, not architectures that impress conference audiences.',
      ),
    ],
    relatedProjects: refs(['project-orbital']),
    relatedServices: refs(['service-backend-architecture']),
  },
  {
    _id: 'article-llm-patterns',
    _type: 'article',
    title: 'Practical LLM integration patterns that actually work in production',
    slug: { current: 'practical-llm-integration-patterns' },
    excerpt: 'Beyond the prototype. The architectural patterns, failure modes, and trade-offs of building LLM-powered features at scale.',
    coverImage: image(unsplash(IMG.forta, 2000, 900), 'Circuit board close-up'),
    author: ref('developer-fadi-zakharia'),
    category: ref('category-ai'),
    publishedAt: '2024-10-28T09:00:00Z',
    readingTime: 12,
    featured: false,
    showTableOfContents: true,
    body: [
      block('Every LLM feature we have shipped to production shares the same shape: a narrow task, a strict output schema, and a human-visible fallback. Everything else is detail.'),
      block('Constrain the output before you trust it', 'h2'),
      block('We never let free-form model output reach a database. Every call is validated against a schema, and validation failures are treated as a first-class outcome with their own UI, not an exception.'),
      bullet('Define the schema first, then write the prompt around it.'),
      bullet('Log every rejected response — they are your best prompt-improvement dataset.'),
      bullet('Cap retries at two. Beyond that, show the user the fallback.'),
      block('Design for the failure mode, not the demo', 'h2'),
      block('Latency spikes, rate limits and silent quality regressions are the three things that will page you. Budget for all three in the architecture: queue the work, cache aggressively, and keep an evaluation set that runs on every prompt change.'),
      callout('warning', 'Do not fine-tune first', 'In three years we have needed fine-tuning exactly once. Retrieval plus a well-shaped prompt covers almost everything.'),
      block('Where it pays off', 'h2'),
      block('Task decomposition, classification and summarisation over your own data are reliably valuable. Open-ended generation shown directly to customers rarely is. Start with the former.'),
    ],
    relatedProjects: refs(['project-orbital']),
    relatedServices: refs(['service-ai-automation']),
  },
  {
    _id: 'article-spec-review',
    _type: 'article',
    title: 'The technical spec review that prevents expensive rework',
    slug: { current: 'the-technical-spec-review-that-prevents-expensive-rework' },
    excerpt: 'A structured process for finding product specification problems before they become engineering problems.',
    coverImage: image(unsplash(IMG.vessel, 2000, 900), 'Notebook and laptop on a desk'),
    author: ref('developer-nad-ghantous'),
    category: ref('category-product'),
    publishedAt: '2024-09-15T09:00:00Z',
    readingTime: 6,
    featured: false,
    showTableOfContents: false,
    body: [
      block('Most rework we have seen traces back to a spec that was internally consistent but disconnected from how the product would actually be used. Our review is designed to surface that gap in an afternoon rather than a sprint.'),
      block('Three questions per feature', 'h2'),
      bullet('What does the user see when this fails?'),
      bullet('What existing data does this depend on, and who owns it?'),
      bullet('What would we have to undo if we shipped this and were wrong?'),
      block('Any feature without a crisp answer to all three goes back to the product owner with the questions attached. It sounds slow. It is the fastest thing we do.'),
    ],
    relatedServices: refs(['service-product-engineering']),
  },
  {
    _id: 'article-component-api',
    _type: 'article',
    title: 'Component API design: the decisions that outlast your designs',
    slug: { current: 'component-api-design' },
    excerpt: 'The choices you make when designing component interfaces will constrain your team for years. Here is how to make them carefully.',
    coverImage: image(unsplash(IMG.orbital, 2000, 900), 'Code on a screen'),
    author: ref('developer-nad-ghantous'),
    category: ref('category-frontend'),
    publishedAt: '2024-08-30T09:00:00Z',
    readingTime: 10,
    featured: false,
    showTableOfContents: true,
    body: [
      block('Visual design changes every eighteen months. Component APIs stick around for the life of the codebase. Optimise for the second.'),
      block('Props are a contract, not a configuration panel', 'h2'),
      block('A boolean prop for every visual variant is the fastest way to a component nobody can change. Prefer a small number of semantic variants over a large number of independent switches.'),
      codeBlock('Button.tsx', 'tsx', `// Prefer\n<Button intent="primary" size="lg" />\n\n// Avoid\n<Button primary large rounded shadow />`),
      block('Composition beats configuration', 'h2'),
      block('When a component needs more than five props to cover its use cases, split it. Slots and children keep the surface area small and the layouts flexible.'),
      block('Name for behaviour, not appearance', 'h2'),
      block('A prop called danger will still make sense when the brand colour changes. A prop called red will not.'),
    ],
    relatedProjects: refs(['project-pragma']),
    relatedServices: refs(['service-frontend-engineering']),
  },
  {
    _id: 'article-postgres-optimisation',
    _type: 'article',
    title: 'PostgreSQL query optimization: the patterns we use every week',
    slug: { current: 'postgresql-query-optimization-patterns' },
    excerpt: 'Not theoretical. The specific index strategies, query patterns, and diagnostic approaches we apply to real production databases.',
    coverImage: image(unsplash(IMG.meridian, 2000, 900), 'Analytics charts on a monitor'),
    author: ref('developer-fadi-zakharia'),
    category: ref('category-performance'),
    publishedAt: '2024-08-12T09:00:00Z',
    readingTime: 14,
    featured: false,
    showTableOfContents: true,
    body: [
      block('Nine times out of ten the slow query is not slow because Postgres is slow. It is slow because it is doing more work than the question requires.'),
      block('Read the plan before you add an index', 'h2'),
      block('EXPLAIN (ANALYZE, BUFFERS) is the only tool that tells you what actually happened. An index that looks obvious on paper is frequently ignored because of a type mismatch or a function wrapping the column.'),
      codeBlock('psql', 'sql', `EXPLAIN (ANALYZE, BUFFERS)\nSELECT * FROM positions\nWHERE fund_id = $1 AND valued_at > now() - interval '1 day';`),
      block('Composite and partial indexes', 'h2'),
      block('Most analytics queries filter on a tenant column and a time range. A composite index in that order, sometimes partial on the active rows, removes the majority of sequential scans we encounter.'),
      block('Know when to stop', 'h2'),
      block('If a query runs in under fifty milliseconds and is not on the hot path, leave it alone. Optimisation has a maintenance cost too.'),
    ],
    relatedProjects: refs(['project-meridian']),
    relatedServices: refs(['service-backend-architecture']),
  },
];

/* ── FAQs & legal ───────────────────────────────────────────────────── */

const faqs: SeedDocument[] = [
  { _id: 'faq-engagement', _type: 'faq', question: 'How do engagements usually work?', answer: 'Most projects run as fixed-scope sprints of two weeks with a demo at the end of each. Ongoing work moves to a monthly retainer once the product is live.', category: 'Engagement', order: 1 },
  { _id: 'faq-team', _type: 'faq', question: 'Who will actually build my product?', answer: 'The two of us. We do not subcontract and we do not hand your project to juniors. You talk to the engineers writing the code.', category: 'Process', order: 2 },
  { _id: 'faq-budget', _type: 'faq', question: 'What budgets do you work with?', answer: 'Focused engagements start around $10k. Full product builds typically land between $25k and $50k+. We will tell you early if the scope and budget do not line up.', category: 'Pricing', order: 3 },
  { _id: 'faq-existing', _type: 'faq', question: 'Can you take over an existing codebase?', answer: 'Yes. We start with a short architecture review so you get an honest picture of the state of things before committing to a larger engagement.', category: 'Technology', order: 4 },
  { _id: 'faq-response', _type: 'faq', question: 'How quickly will you reply?', answer: 'Within 48 hours, usually sooner. If we are not the right fit we will say so and point you toward someone who is.', category: 'General', order: 5 },
];

const legalPages: SeedDocument[] = [
  {
    _id: 'legal-privacy-policy',
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { current: 'privacy-policy' },
    updatedAt: '2025-01-01',
    body: [
      block('What we collect', 'h2'),
      block('When you send a project inquiry or subscribe to our newsletter we store the details you provide — typically your name, email address, company and the message you write. We do not buy data about you and we do not sell yours.'),
      block('How we use it', 'h2'),
      block('Inquiry details are used only to respond to you. Newsletter addresses are stored with our email provider, Resend, and used only to send the newsletter. Every email includes an unsubscribe link.'),
      block('Analytics', 'h2'),
      block('We use privacy-respecting, cookieless analytics to understand aggregate traffic. No personal data is shared with advertisers.'),
      block('Your rights', 'h2'),
      block('Email hello@madebyfn.com at any time to see, correct or delete the data we hold about you.'),
    ],
  },
  {
    _id: 'legal-terms',
    _type: 'legalPage',
    title: 'Terms',
    slug: { current: 'terms' },
    updatedAt: '2025-01-01',
    body: [
      block('Use of this site', 'h2'),
      block('The content on this website is provided for general information about the studio and its work. Case studies describe past engagements and do not guarantee similar results.'),
      block('Engagements', 'h2'),
      block('Any project we take on is governed by a separate written agreement. Nothing on this site constitutes an offer to provide services.'),
      block('Intellectual property', 'h2'),
      block('Copy, imagery and code on this site belong to madebyfn Ltd. or their respective owners and may not be reused without permission.'),
    ],
  },
];

/* ── Singletons ─────────────────────────────────────────────────────── */

const siteSettings: SeedDocument = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'madebyfn',
  studioName: 'madebyfn',
  studioDescriptor: 'Studio',
  legalName: 'madebyfn Ltd.',
  siteUrl: 'https://madebyfn.com',
  establishedYear: 2022,
  primaryEmail: 'hello@madebyfn.com',
  location: 'Beirut, Lebanon',
  timezone: 'Asia/Beirut',
  availability: {
    status: 'available',
    label: 'Available',
    detail: 'Taking on new projects\nfrom {quarter}',
    menuLabel: 'Available for {quarter}',
    responseTime: 'Within 48 hours, usually sooner',
  },
  socialLinks: [
    { _type: 'socialLink', _key: key(), platform: 'github', label: 'GitHub', url: 'https://github.com/madebyfn' },
    { _type: 'socialLink', _key: key(), platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/madebyfn' },
  ],
  footerDescription: 'Two senior engineers. One focused product team. Serious software, directly built.',
  footerNavigationLabel: 'Navigation',
  footerDevelopersLabel: 'Developers',
  footerStatusLabel: 'Status',
  copyrightNote: 'All rights reserved.',
  newsletter: {
    enabled: true,
    heading: 'Engineering notes, occasionally.',
    copy: 'One email when we publish something worth your time. No launches, no drip sequences.',
    placeholder: 'you@company.com',
    buttonLabel: 'Subscribe',
    successMessage: 'You are on the list. We only write when there is something worth reading.',
    duplicateMessage: 'That address is already subscribed — thank you.',
    privacyNote: 'Unsubscribe with one click, any time.',
  },
  defaultSeo: {
    metaTitle: 'madebyfn — Senior engineers, serious software.',
    metaDescription:
      'madebyfn is a two-person product engineering studio. We take complex digital products from concept to production — without the agency overhead.',
  },
};

const navigation: SeedDocument = {
  _id: 'navigation',
  _type: 'navigation',
  mainItems: [
    internalLink('Work', 'workPage'),
    internalLink('Services', 'servicesPage'),
    internalLink('Studio', 'studioPage'),
    internalLink('Insights', 'insightsPage'),
  ],
  cta: internalLink('Start a Project', 'startProjectPage'),
  footerItems: [
    internalLink('Work', 'workPage'),
    internalLink('Services', 'servicesPage'),
    internalLink('Studio', 'studioPage'),
    internalLink('Insights', 'insightsPage'),
    internalLink('Start a Project', 'startProjectPage'),
  ],
  legalItems: [internalLink('Privacy Policy', 'legal-privacy-policy'), internalLink('Terms', 'legal-terms')],
};

const homepage: SeedDocument = {
  _id: 'homepage',
  _type: 'homepage',
  hero: {
    eyebrow: 'madebyfn — Product Engineering Studio',
    title: 'Senior engineers,\nserious software.',
    highlightedWords: ['serious'],
    copy:
      'Two engineers. One focused team. We take complex digital products from concept to production — without the agency overhead, the account manager, or the handoff delays.',
    primaryCta: internalLink('Start a Project', 'startProjectPage'),
    secondaryCta: internalLink('View Work', 'workPage'),
    availabilityText: 'Available for new engagements · {quarter}',
    backgroundVideo: {
      enabled: true,
      // Placeholder loop (Pexels licence). Replace with the studio's own clip in the Studio.
      file: { _type: 'file', _sanityAsset: 'file@https://videos.pexels.com/video-files/2611250/2611250-hd_1280_720_30fps.mp4' },
      opacity: 65,
    },
    visual: {
      enabled: true,
      codeSnippet: `async function shipProduct() {\n  // no middlemen\n  return await build({\n    direct: true,\n    quality: "uncompromised"\n  });\n}`,
      metricCard: { label: 'Meridian / Q3 2024', value: '340%', caption: 'faster reporting ↑', bars: [65, 82, 78, 90, 88, 95] },
      stackLabel: 'Stack',
      stackTechnologies: refs([T('react'), T('nodejs'), T('nestjs'), T('dotnet'), T('postgresql'), T('ai-llm')]),
      watermark: 'fn / Studio / {year}',
    },
  },
  stats: {
    items: [metric('12+', 'Years combined'), metric('8', 'Projects shipped'), metric('6', 'Industries served'), metric('2', 'Direct engineers'), metric('100%', 'Senior throughout')],
    note: 'Beirut, Lebanon · EST. 2022',
  },
  selectedWork: {
    eyebrow: 'Selected Work',
    heading: 'Projects that moved\nthe needle.',
    linkLabel: 'View all work',
    projects: refs(['project-meridian', 'project-vessel', 'project-orbital']),
  },
  featuredCase: {
    eyebrow: 'Featured Case',
    heading: 'Inside the Meridian build.',
    project: ref('project-meridian'),
    linkLabel: 'Full case study',
    metricsLabel: 'Q3 2024',
    steps: [
      { _type: 'storyStep', _key: key(), label: 'Challenge', heading: 'A trading firm locked inside a spreadsheet.', body: 'Meridian Capital was managing $2.4B in assets across 14 funds using a patchwork of Excel sheets, legacy VBA scripts, and manual reporting workflows. Decision-making was slow. Reporting was days behind. The risk was real.' },
      { _type: 'storyStep', _key: key(), label: 'Approach', heading: 'Architecture before a single line of code.', body: 'We spent the first two weeks mapping data flows, understanding the domain, and designing a system that would last. Not the easiest sell, but the most valuable thing we did. The resulting architecture reduced migration risk by an order of magnitude.' },
      { _type: 'storyStep', _key: key(), label: 'Build', heading: 'Real-time pipelines. Sub-100ms queries.', body: 'Event-driven ingestion from 7 data sources, a custom query engine optimised for portfolio analytics, and a React interface built around how analysts actually think — not how databases are structured.' },
      { _type: 'storyStep', _key: key(), label: 'Result', heading: '340% faster reporting. Zero data incidents.', body: 'Reports that took 3 days now take hours. The team made better decisions faster. Six months post-launch, zero critical incidents. The CTO called it the best technology investment the firm had made.' },
    ],
    metrics: [metric('340%', 'Faster reporting'), metric('$2.4B', 'AUM managed'), metric('0', 'Data incidents')],
  },
  services: { eyebrow: 'Capabilities', heading: 'What we build.', linkLabel: 'All services', items: [] },
  team: { eyebrow: 'The Studio', heading: 'You work with the people building your product.', developers: [] },
  technology: { eyebrow: 'Technology', heading: 'A deliberate stack,\nnot an exhaustive one.' },
  process: {
    eyebrow: 'How we work',
    heading: 'A process built\nfor serious work.',
    steps: [
      { _type: 'processStep', _key: key(), label: 'Discover', description: 'We map your domain, users, constraints, and goals. No assumptions. Two days of questions before a single technical decision.' },
      { _type: 'processStep', _key: key(), label: 'Architect', description: 'We design the system before building it. Data models, API boundaries, infrastructure decisions, technology choices — documented clearly.' },
      { _type: 'processStep', _key: key(), label: 'Prototype', description: 'Critical paths tested before they are built at scale. We validate product decisions early when changes are cheap.' },
      { _type: 'processStep', _key: key(), label: 'Build', description: 'Iterative two-week cycles. Regular demos. Continuous deployment. You always have working software to evaluate.' },
      { _type: 'processStep', _key: key(), label: 'Launch', description: 'Production readiness includes monitoring, alerting, documentation, and knowledge transfer — not just deployment.' },
      { _type: 'processStep', _key: key(), label: 'Iterate', description: 'Software is never finished. We support post-launch evolution, performance improvements, and feature development.' },
    ],
  },
  model: {
    eyebrow: 'The model',
    heading: 'Small team.\nSenior execution.',
    agencyLabel: 'Traditional Agency',
    studioLabel: 'madebyfn',
    rows: [
      { _type: 'comparisonRow', _key: key(), aspect: 'Communication', agency: 'Account manager → PM → Lead dev → Your team', studio: 'You → Fadi & Nad' },
      { _type: 'comparisonRow', _key: key(), aspect: 'Ownership', agency: 'Distributed across roles, accounts, and timezones', studio: 'Full. Both engineers own the outcome.' },
      { _type: 'comparisonRow', _key: key(), aspect: 'Decision speed', agency: 'Approval chains, scope calls, change requests', studio: 'Same conversation, immediate resolution' },
      { _type: 'comparisonRow', _key: key(), aspect: 'Senior involvement', agency: 'Seniors pitch. Juniors build. You find out late.', studio: 'Senior engineering throughout. Always.' },
      { _type: 'comparisonRow', _key: key(), aspect: 'Product thinking', agency: 'Deliver the spec. Ask no questions.', studio: 'Challenge assumptions early. Ship better products.' },
    ],
  },
  testimonials: { eyebrow: 'From clients', heading: 'What they say.', items: [] },
  insights: { eyebrow: 'Insights', heading: 'Engineering without\nthe fluff.', linkLabel: 'All articles', articles: [] },
  finalCta: {
    eyebrow: 'Start here',
    heading: 'Have something\nambitious in mind?',
    copy: 'We take a small number of projects each quarter. Tell us about yours — we will respond within 48 hours with honest thoughts on whether we are the right fit.',
    primaryLabel: 'Start a Project',
    showEmail: true,
    backgroundText: "Let's build.",
    availabilityText: 'Available · Responding within 48 hours',
  },
  visibility: {
    stats: true,
    selectedWork: true,
    featuredCase: true,
    services: true,
    team: true,
    technology: true,
    process: true,
    model: true,
    testimonials: true,
    insights: true,
    finalCta: true,
  },
  seo: {
    metaTitle: 'madebyfn — Senior engineers, serious software.',
    metaDescription:
      'Two engineers. One focused team. We take complex digital products from concept to production — without the agency overhead, the account manager, or the handoff delays.',
  },
};

const workPage: SeedDocument = {
  _id: 'workPage',
  _type: 'workPage',
  eyebrow: 'Selected Work',
  title: 'Work',
  intro: 'A selection of projects built with founders, product teams, and growth-stage companies across six industries.',
  industryFilterLabel: 'Industry',
  serviceFilterLabel: 'Service',
  developerFilterLabel: 'Built by',
  allLabel: 'All',
  emptyMessage: 'No projects match this filter.',
  cta: { heading: 'Ready to be next?', buttonLabel: 'Start a Project' },
  seo: { metaTitle: 'Work — madebyfn', metaDescription: 'Case studies from madebyfn: fintech, commerce, SaaS, design tools, web3 and healthcare products taken from concept to production.' },
};

const servicesPage: SeedDocument = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  eyebrow: 'Capabilities',
  title: 'Services',
  intro: 'We do not do everything. We do six things very well — and we are direct about which one fits your situation.',
  problemsLabel: 'Typical problems',
  engagementLabel: 'Engagement',
  technologiesLabel: 'Technologies',
  projectsLabel: 'Related projects',
  discussLabel: 'Discuss this service',
  cta: {
    heading: 'Not sure what you need?',
    copy: 'Tell us about your project. We will tell you honestly whether we are the right fit — and if not, point you toward someone who is.',
    buttonLabel: 'Start a Conversation',
  },
  seo: { metaTitle: 'Services — madebyfn', metaDescription: 'Product engineering, frontend, backend & architecture, AI & automation, mobile and commerce engineering from a two-person senior studio.' },
};

const studioPage: SeedDocument = {
  _id: 'studioPage',
  _type: 'studioPage',
  eyebrow: 'The Studio',
  title: 'Studio',
  intro:
    'madebyfn is two engineers who chose to work together because they complement each other perfectly. Fadi brings systems thinking and backend depth. Nad brings product instinct and frontend craft. Together they form a complete product engineering team — without the overhead.',
  philosophy: {
    eyebrow: 'Philosophy',
    statement:
      'We started madebyfn because we kept watching good products fail for avoidable technical reasons — and good engineers fail because they worked inside bad processes.',
  },
  principles: {
    eyebrow: 'Principles',
    items: [
      { _type: 'principle', _key: key(), title: 'Architecture first', body: 'We spend more time designing systems than building them. A week of careful thinking prevents months of painful refactoring.' },
      { _type: 'principle', _key: key(), title: 'Honest communication', body: 'We tell you when something is a bad idea. That is not obstruction — it is the most valuable thing a technical partner can do.' },
      { _type: 'principle', _key: key(), title: 'Deliberate technology', body: 'We choose boring technology when it is the right answer. We choose novel technology when it genuinely solves a problem. Never the reverse.' },
      { _type: 'principle', _key: key(), title: 'Ownership over delivery', body: 'Shipping code is not the goal. Shipping software that serves real people effectively is the goal. We hold ourselves to that distinction.' },
    ],
  },
  team: { eyebrow: 'The Team', specialitiesLabel: 'Specialities', developers: [] },
  cta: { heading: 'Ready to work together?', buttonLabel: 'Start a Project' },
  seo: { metaTitle: 'Studio — madebyfn', metaDescription: 'Meet the two engineers behind madebyfn, the principles we work by and why a two-person senior team is an advantage.' },
};

const insightsPage: SeedDocument = {
  _id: 'insightsPage',
  _type: 'insightsPage',
  eyebrow: 'Knowledge',
  title: 'Insights',
  intro: 'Technical writing from two engineers with production experience. No thought leadership. No content marketing. Just things we have learned by building.',
  allLabel: 'All',
  featuredLabel: 'Featured',
  showNewsletter: true,
  seo: { metaTitle: 'Insights — madebyfn', metaDescription: 'Articles on architecture, AI, product, frontend and performance from the engineers at madebyfn.' },
};

const startProjectPage: SeedDocument = {
  _id: 'startProjectPage',
  _type: 'startProjectPage',
  eyebrow: "Let's talk",
  title: 'Tell us about your project.',
  intro: 'We take a small number of projects each quarter. Tell us about yours and we will respond with honest thoughts — including whether we are the right fit.',
  infoItems: [
    { _type: 'infoItem', _key: key(), icon: 'filled', label: 'Availability', value: 'Taking projects from {quarter}' },
    { _type: 'infoItem', _key: key(), icon: 'half', label: 'Response time', value: 'Within 48 hours, usually sooner' },
    { _type: 'infoItem', _key: key(), icon: 'outline', label: 'Engagements', value: 'Project-based and ongoing retainer' },
  ],
  emailLabel: 'Or email directly',
  projectTypes: ['Web Application', 'Mobile Application', 'SaaS Platform', 'AI / Automation', 'E-commerce', 'API / Backend', 'Existing Product', 'Other'],
  budgetRanges: ['Under $5k', '$5k – $10k', '$10k – $25k', '$25k – $50k', '$50k+'],
  timelines: ['As soon as possible', 'Within 3 months', 'Within 6 months', 'Flexible'],
  descriptionPlaceholder: 'Tell us what you are building, where you are in the process, and what kind of engagement you are looking for...',
  referralPlaceholder: 'Word of mouth, Google, etc.',
  submitLabel: 'Send Project Inquiry',
  footnote: 'We read every inquiry. Expect a response within 48 hours.',
  faq: { enabled: true, eyebrow: 'Before you write', heading: 'Common questions.' },
  successHeading: "We'll be in touch.",
  successCopy: 'We read every inquiry carefully. Expect a thoughtful response within 48 hours — usually sooner.',
  successLinkLabel: 'Back to home',
  errorMessage: 'Something went wrong sending your inquiry. Please try again, or email us directly.',
  seo: { metaTitle: 'Start a Project — madebyfn', metaDescription: 'Tell madebyfn about your project. We respond within 48 hours with honest thoughts on whether we are the right fit.' },
};

const notFoundPage: SeedDocument = {
  _id: 'notFoundPage',
  _type: 'notFoundPage',
  eyebrow: 'Error 404',
  title: "This page doesn't exist.",
  copy: 'It may have moved, or you may have followed an outdated link. Either way, we can get you somewhere useful.',
  links: [internalLink('Home', 'homepage'), internalLink('View Work', 'workPage'), internalLink('Start a Project', 'startProjectPage')],
};

/* ── Export ─────────────────────────────────────────────────────────── */

export const seedDocuments: SeedDocument[] = [
  siteSettings,
  navigation,
  homepage,
  workPage,
  servicesPage,
  studioPage,
  insightsPage,
  startProjectPage,
  notFoundPage,
  ...industries,
  ...articleCategories,
  ...technologies,
  ...clients,
  ...developers,
  ...services,
  ...testimonials,
  ...projects,
  ...articles,
  ...faqs,
  ...legalPages,
];
