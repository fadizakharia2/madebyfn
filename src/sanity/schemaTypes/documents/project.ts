import { defineArrayMember, defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'media', title: 'Media' },
    { name: 'story', title: 'Story summary' },
    { name: 'caseStudy', title: 'Case study' },
    { name: 'relations', title: 'People & links' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Project name', type: 'string', group: 'overview', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'client', title: 'Client', type: 'reference', group: 'overview', to: [{ type: 'client' }], validation: (rule) => rule.required() }),
    defineField({ name: 'statement', title: 'Statement', type: 'string', group: 'overview', description: 'One italic line under the case-study title, e.g. "Financial intelligence for institutional investment."' }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'text', rows: 2, group: 'overview', description: 'One sentence for cards and lists.', validation: (rule) => rule.required().max(200) }),
    defineField({ name: 'fullDescription', title: 'Full description', type: 'text', rows: 4, group: 'overview', description: 'Two or three sentences for the homepage feature.' }),
    defineField({ name: 'year', title: 'Year', type: 'string', group: 'overview', validation: (rule) => rule.required().regex(/^\d{4}$/, { name: 'year' }) }),
    defineField({ name: 'industry', title: 'Industry', type: 'reference', group: 'overview', to: [{ type: 'industry' }], validation: (rule) => rule.required() }),
    defineField({ name: 'industryLabel', title: 'Industry label override', type: 'string', group: 'overview', description: 'Optional longer label for the homepage, e.g. "Financial Technology".' }),
    defineField({ name: 'services', title: 'Services', type: 'array', group: 'overview', of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })], validation: (rule) => rule.required().min(1) }),
    defineField({ name: 'serviceTags', title: 'Service tags override', type: 'array', group: 'overview', description: 'Optional short tags shown on the homepage instead of the service names.', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'technologies', title: 'Technologies', type: 'array', group: 'overview', of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })] }),
    defineField({ name: 'headlineResult', title: 'Headline result', type: 'string', group: 'overview', description: 'e.g. "+340% faster reporting"', validation: (rule) => rule.required() }),
    defineField({ name: 'timeline', title: 'Timeline', type: 'string', group: 'overview', description: 'e.g. "14 weeks"' }),
    defineField({ name: 'role', title: 'Role', type: 'string', group: 'overview', description: 'e.g. "Full product engineering"' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'overview', initialValue: false, description: 'Featured projects appear on the homepage when no explicit list is set.' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'overview', initialValue: 100 }),

    defineField({ name: 'heroImage', title: 'Hero image', type: 'imageWithAlt', group: 'media', description: 'Landscape, at least 1800px wide.', validation: (rule) => rule.required() }),
    defineField({ name: 'mobileHeroImage', title: 'Mobile hero image', type: 'imageWithAlt', group: 'media', description: 'Optional portrait crop for small screens.' }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', group: 'media', of: [defineArrayMember({ type: 'imageWithAlt' })] }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoEmbed',
      group: 'media',
      description: 'Optional. Shown on the case study page after the story when no composed modules are used.',
    }),

    defineField({ name: 'challenge', title: 'Challenge', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'strategy', title: 'Strategy', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'solution', title: 'Solution', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'architecture', title: 'Architecture', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'design', title: 'Design', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'engineering', title: 'Engineering', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'results', title: 'Results', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'metrics', title: 'Metrics', type: 'array', group: 'story', of: [defineArrayMember({ type: 'metric' })], validation: (rule) => rule.max(6) }),

    defineField({
      name: 'caseStudy',
      title: 'Case study content',
      type: 'caseStudyBlocks',
      group: 'caseStudy',
      description:
        'Compose the case study from reusable modules. When empty, the story summary fields, gallery, metrics and testimonials are rendered in the default layout.',
    }),
    defineField({ name: 'nextProject', title: 'Next project', type: 'reference', group: 'caseStudy', to: [{ type: 'project' }], description: 'Optional. Defaults to the next project in display order.' }),

    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })] }),
    defineField({ name: 'developers', title: 'Developers', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'developer' }] })] }),
    defineField({ name: 'externalLink', title: 'Live site URL', type: 'url', group: 'relations' }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', client: 'client.name', year: 'year', media: 'heroImage', featured: 'featured' },
    prepare: ({ title, client, year, media, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [client, year].filter(Boolean).join(' · '),
      media,
    }),
  },
});
