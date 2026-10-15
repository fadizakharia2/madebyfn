# madebyfn

Marketing and portfolio website for **madebyfn**, a two-person product engineering studio. Built with Astro, TypeScript, Sanity, Resend and Vercel from the Figma Make design **"Implement Website Design Prompt"** (`figma.com/make/89IOWwxFXPNjxzkmcyIjBC`).

- Every page is statically generated from Sanity content.
- The two forms (newsletter, project inquiry) run as on-demand API routes backed by Resend.
- Sanity Studio is embedded at `/admin`.

---

## Contents

1. [Architecture](#architecture)
2. [Design reference](#design-reference)
3. [Project structure](#project-structure)
4. [Environment variables](#environment-variables)
5. [Local development](#local-development)
6. [Sanity](#sanity)
7. [Editing content](#editing-content)
8. [Resend: newsletter and inquiries](#resend-newsletter-and-inquiries)
9. [Deployment on Vercel](#deployment-on-vercel)
10. [Publishing flow: Sanity → production](#publishing-flow-sanity--production)
11. [Quality checks](#quality-checks)

---

## Architecture

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Astro 7, `output: 'static'` | Pages prerender at build time. Only `/api/*` routes run on demand. |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) | No `any`. Query results are typed in `src/lib/sanity/types.ts`. |
| CMS | Sanity 6 | Schemas in `src/sanity/schemaTypes`, Studio embedded via `@sanity/astro` at `/admin`. |
| Islands | React 19, three islands | `Testimonials` (Embla carousel), `NewsletterForm`, `InquiryForm`. Everything else is `.astro` with small vanilla scripts. |
| Motion | CSS + IntersectionObserver + `requestAnimationFrame` | Scroll reveals, hero parallax, floating cards, cursor. No animation library. |
| Email | Resend | Contacts API for the newsletter, Emails API for inquiries. |
| Hosting | Vercel via `@astrojs/vercel` | Static output + serverless functions for the API routes. |
| Fonts | Astro Fonts API (Google provider) | Instrument Serif, Inter, JetBrains Mono self-hosted at build time with optimised fallbacks. |

Astro-to-island ratio is roughly 90/10 by component count. Client JavaScript on a typical page is the reveal observer, header, cursor and (on the homepage) the carousel island.

### Local seed fallback

Until `PUBLIC_SANITY_PROJECT_ID` is set, the data layer evaluates the **same GROQ queries** in-process with `groq-js` against `scripts/seed/content.ts`. That is how the site runs from a fresh clone. Production builds refuse this fallback unless `ALLOW_SEED_FALLBACK=true` is set explicitly, so a mis-configured deploy fails loudly instead of shipping placeholder content.

---

## Design reference

The Figma Make source (React/Tailwind) is archived verbatim in `design-reference/figma-make-source/` for comparison. The design brief that produced it is at `design-reference/figma-make-source/src/imports/pasted_text/figma-design-prompt.md`.

Design tokens extracted from the source live in `src/styles/tokens.css` (colours, type scale, spacing, radii, motion). Components reference tokens only.

Deliberate deviations from the Make prototype:

- The wordmark and copy say **madebyfn** instead of the prototype's placeholder studio name.
- A **newsletter signup** (required by the implementation brief, absent from the prototype) is placed in the footer brand column and at the foot of Insights, styled in the same language. It can be switched off in Site settings.
- A **FAQ** section (required schema) renders under the Start a Project form when FAQs exist. It can be switched off on the Start a Project page document.
- The prototype had no privacy/terms pages behind its footer links; these are real `legalPage` documents at `/legal/[slug]`.
- Sanity Studio lives at `/admin` because `/studio` is the design's About page.

---

## Project structure

```text
astro.config.mjs          Astro config: Vercel adapter, React, Sanity Studio, sitemap, fonts
sanity.config.ts          Embedded Studio (structure, singletons, Vision)
sanity.cli.ts             Lets `npx sanity ...` target the project (dataset import/export)
scripts/
  seed/content.ts         Seed dataset (also the local fallback content)
  write-seed-ndjson.ts    Emits seed.ndjson for `sanity dataset import`
  seed-sanity.ts          Seeds directly via the API (needs SANITY_API_TOKEN)
  query-smoke.ts          Evaluates every GROQ query against the seed
src/
  layouts/BaseLayout.astro
  pages/                  index, work/, services, studio, insights/, start-a-project, legal/, 404, api/
  components/
    global/               Header, Footer, CustomCursor
    home/                 Hero, StatsStrip, SelectedWork, FeaturedCase, Developers, TechEcosystem,
                          Process, WhyTwoDevs, Testimonials (island), InsightsPreview, FinalCta
    services/             ServicesAccordion (homepage + services page variants)
    work/                 ProjectCard, WorkGrid (filters)
    case-study/           CaseStudyBlocks renderer, DefaultCaseStudy, blocks/* (20 modules)
    insights/             ArticleCard
    content/              PortableText renderer + custom blocks (image, code, callout, video)
    forms/                NewsletterForm, InquiryForm (islands)
    faq/                  FaqList
    seo/                  Seo
    ui/                   Button, Eyebrow, SectionHeader, PageHeader, CtaBand, MetricGrid,
                          SanityPicture, TestimonialQuote
  lib/
    env.ts                Validated env access
    routes.ts             Every internal URL + CMS link resolution
    seo.ts                Meta builder + JSON-LD (Organization, WebSite, Person, Article, CreativeWork, Breadcrumb, FAQ)
    highlight.ts          Tiny syntax colouring for code cards
    sanity/               client (Sanity or groq-js fallback), queries, loaders, types, image, helpers
    forms/                zod schemas, rate limiter, request helpers
    resend/               Resend client, contact subscription, email templates
  sanity/
    schemaTypes/          objects/* and documents/*
    structure.ts          Studio navigation
  styles/                 tokens.css, global.css
```

---

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `PUBLIC_SANITY_PROJECT_ID` | public | Sanity project id. When empty the seed fallback is used. |
| `PUBLIC_SANITY_DATASET` | public | Dataset name, default `production`. |
| `PUBLIC_SANITY_API_VERSION` | public | API date, default `2025-06-01`. |
| `SANITY_API_TOKEN` | secret | Editor token. Only needed for `npm run sanity:seed`. |
| `RESEND_API_KEY` | secret | Resend API key. |
| `RESEND_SEGMENT_ID` | secret | Segment (formerly audience) that newsletter contacts join. `RESEND_AUDIENCE_ID` is accepted as an alias. |
| `RESEND_FROM_EMAIL` | secret | Verified sender, e.g. `madebyfn <hello@madebyfn.com>`. Defaults to `onboarding@resend.dev` for testing. |
| `CONTACT_EMAIL` | secret | Inbox that receives project inquiries. |
| `PUBLIC_SITE_URL` | public | Canonical origin, used for canonicals, OpenGraph, sitemap and robots. |
| `ALLOW_SEED_FALLBACK` | build | Set `true` to allow a production build without Sanity (local QA only). |

Never put a secret in a `PUBLIC_` variable.

---

## Local development

```bash
npm install
cp .env.example .env      # fill in what you have; the site runs without Sanity/Resend
npm run dev               # http://localhost:4321
```

Other scripts:

```bash
npm run build             # production build to dist/ and .vercel/output
npm run preview           # serve the production build
npm run check             # astro check (types + templates)
node --experimental-strip-types scripts/query-smoke.ts   # evaluate all GROQ against the seed
```

---

## Sanity

### 1. Create the project

Sign in at https://www.sanity.io/manage, create a project (e.g. **madebyfn**) with a dataset named **production**, and put the project id in `.env` as `PUBLIC_SANITY_PROJECT_ID`. Add the same value to Vercel later.

The embedded Studio at `/admin` only mounts when `PUBLIC_SANITY_PROJECT_ID` is present **at server start**, so restart `npm run dev` after editing `.env`.

### 2. Seed the content model

Either import through the CLI (recommended; uploads images from the seed markers):

```bash
npm run sanity:export-seed
npx sanity dataset import seed.ndjson production --replace
```

or seed through the API with an Editor token in `.env`:

```bash
npm run sanity:seed
```

Against a dataset that already holds real content, never run the full seed: it replaces every seed document and wipes Studio edits. Load only the documents you need, for example `npm run sanity:seed -- --only=project-arc-recovery,client-arc-recovery`. Writes made through the API may not trigger the Sanity webhook, so redeploy in Vercel afterwards if the site doesn't update.

### Removing the placeholder content

Sanity will not delete a document while anything still references it, and the seed is heavily cross-linked, so deleting it by hand in the Studio fails. Use the script instead:

```bash
npm run sanity:unseed -- --dry   # show what would happen
npm run sanity:unseed            # delete seed projects, developers, clients, testimonials, articles, FAQs
npm run sanity:unseed -- --all   # also delete seed industries, technologies, services, categories, legal pages and page documents
```

Only documents with the seed's own ids are removed; documents you created stay, and so do the real projects, clients and Fadi's profile listed in `REAL_IDS` in the script. Links to deleted documents are cleared from everything else (including your documents and drafts) in the same transaction, and images left unreferenced are removed.

### 3. Open the Studio

Run `npm run dev` and open `http://localhost:4321/admin`. Sign in with the Sanity account that owns the project. The first visit asks you to add the origin to the project's CORS list; accept it (or add `http://localhost:4321` under manage → API → CORS origins with credentials allowed). Do the same for the production domain.

Note: `astro.config.mjs` contains a small dev-only Vite plugin (`sanityStudioAliasFix`) that repoints two aliases set by `@sanity/astro`. Without it Vite 8's dependency optimizer fails on the Studio bundle and `/admin` renders blank. Production builds are unaffected.

### 4. Optional: a Sanity-hosted Studio

The embedded Studio is not listed under "Studios" on manage.sanity.io because Sanity does not host it. If you also want a Studio at its own `*.sanity.studio` address (listed on manage, independent of the website), the same configuration deploys there:

```bash
# .env: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET and SANITY_STUDIO_HOSTNAME
npx sanity login          # once
npm run studio:deploy     # → https://<SANITY_STUDIO_HOSTNAME>.sanity.studio
```

`npm run studio:build` builds it locally into `studio-dist/` without deploying. The hostname must be globally unique; change `SANITY_STUDIO_HOSTNAME` if the deploy reports it is taken. Both Studios edit the same dataset, so use whichever is convenient. Re-run the deploy after changing any schema.

### Studio organisation

- **Website** — Homepage, Site settings, Navigation, and one document per page (Work, Services, Studio, Insights, Start a Project, 404).
- **Portfolio** — Projects, Developers, Services, Technologies.
- **Social proof** — Clients, Testimonials.
- **Content** — Insights (articles), Article categories, FAQs, Legal pages.
- **Taxonomies** — Industries.

Singletons cannot be created twice or deleted. Every field has a label and, where useful, a description, character guidance and validation. Images require alt text.

---

## Editing content

### Creating a developer

Portfolio → Developers → New. Required: name, slug, title, portrait, short bio. Add long bio and approach quote for the Studio page, skills for the "Stack" tags, links for GitHub/LinkedIn/site. `Display order` controls ordering everywhere. Developers appear automatically on the homepage, Studio page and footer.

### Creating a project

Portfolio → Projects → New. Required: name, slug, client, year, industry, at least one service, short description, headline result, hero image. Set **Featured** to have it on the homepage automatically (or pick projects explicitly on Homepage → Selected work). The project appears on `/work` and gets its own page at `/work/<slug>` with no code changes.

### Building a case study

On a project, open the **Case study** tab and add modules from the list: rich text, statement heading, full-width image, contained image, video, two-column media, gallery, pull quote, testimonial, metrics, architecture diagram, code example, feature grid, timeline, process, sticky text + visual, comparison, callout, related projects, call to action. Reorder by drag. If the tab is left empty, the page falls back to the **Story summary** fields (challenge, approach, solution, architecture, design, engineering, results), gallery, metrics and testimonials.

### Adding services

Portfolio → Services → New. `Tagline` and `Scope summary` are the one-liners shown when a row is collapsed. Typical problems, engagement, technologies and related projects fill the expanded row on `/services`. Featured services show on the homepage.

### Adding technologies

Portfolio → Technologies → New. Choose a category; the homepage "Technology" grid groups by it. Technologies are referenced from services, developers, projects and the hero stack card.

### Adding testimonials

Social proof → Testimonials → New. Featured testimonials populate the homepage carousel; any testimonial can be referenced from a project or placed in a case study.

### Adding articles

Content → Insights → New. Required: title, slug, excerpt, cover image, author, category, published date, body. Reading time is estimated when left empty. Heading 2 blocks generate the table of contents. Mark one article **Featured** or choose it on the Insights page document.

### Editing the homepage

Website → Homepage. The Hero tab holds the eyebrow, headline (+ highlighted words), copy, buttons, availability line, the **background video** (upload an MP4/WebM or paste a direct URL, set a poster and the opacity; it plays muted and looped, pauses off-screen, and shows only the poster for reduced-motion visitors) and the floating visual (code fragment, metric card, stack technologies, watermark). The Sections tab holds each section's eyebrow/heading and any explicit picks. The Visibility tab toggles sections.

### Editing navigation

Website → Navigation. Main items, the header button, footer items and legal links. Items link to internal documents (pages, projects, services, developers, articles, legal pages) or external URLs.

### Site settings

Website → Site settings. Names, wordmark descriptor, email, location and time zone (footer clock), availability status/labels, social links, footer copy, newsletter copy and default SEO.

---

## Resend: newsletter and inquiries

1. Create an API key at resend.com and set `RESEND_API_KEY`.
2. Create a **segment** (Resend's replacement for audiences) and set `RESEND_SEGMENT_ID`. Contacts are stored in Resend, not in Sanity.
3. Verify your sending domain, then set `RESEND_FROM_EMAIL` to an address on it. Until a domain is verified, the free tier only delivers to the account owner's own address, so use `onboarding@resend.dev` and set `CONTACT_EMAIL` to that owner address.

### Newsletter (`POST /api/newsletter`)

Validates with Zod, rejects filled honeypots and sub-two-second submissions, rate limits per IP (5 / 10 min), then looks the address up in Resend. Existing contacts get an honest "already subscribed" response (and are re-subscribed if they had unsubscribed); new ones are created in the segment. Provider and configuration failures return real errors, never a fake success. Copy for the form is in Site settings → Newsletter.

### Project inquiry (`POST /api/inquiry`)

Same protections (3 / 10 min). Sends an HTML + text notification to `CONTACT_EMAIL` with reply-to set to the sender, then a best-effort confirmation to the sender. Field options (project types, budgets, timelines), labels and success copy are on the Start a Project page document.

Both endpoints also accept `application/x-www-form-urlencoded` so they work if JavaScript fails to load.

---

## Deployment on Vercel

1. Import the repository in Vercel. The framework preset is detected as Astro.
2. Add the environment variables from the table above (Production and Preview).
3. Deploy. `@astrojs/vercel` emits the static pages plus one serverless function for `/api/*`.

Because pages are static, content only changes when a build runs — see below.

---

## Publishing flow: Sanity → production

Editors publish in Sanity; Vercel must rebuild for the change to reach the site.

1. In Vercel: Project → Settings → Git → **Deploy Hooks** → create a hook for the production branch. Copy its URL.
2. In Sanity: manage.sanity.io → project → API → **Webhooks** → Create:
   - URL: the deploy hook URL
   - Trigger on: create, update, delete
   - Filter (optional): `_type in ["siteSettings","navigation","homepage","workPage","servicesPage","studioPage","insightsPage","startProjectPage","notFoundPage","project","developer","service","technology","client","testimonial","industry","article","articleCategory","faq","legalPage"]`
   - Include drafts: off
3. Publish a document. Vercel starts a build within seconds and the site updates in about a minute.

If a build ever fails, Vercel keeps the last good deploy live.

---

## Quality checks

- `npm run check` — zero errors.
- `npm run build` — must succeed; prerendered pages are listed in the output.
- Accessibility: skip link, semantic landmarks, labelled controls, visible focus, keyboard-operable accordion/tabs/carousel/filters, `prefers-reduced-motion` disables parallax, floating cards, reveals and the custom cursor.
- SEO: per-page titles/descriptions/canonicals, OpenGraph and Twitter cards, `sitemap-index.xml`, `robots.txt`, JSON-LD for Organization, WebSite, Person, Article, CreativeWork, BreadcrumbList and FAQPage.
