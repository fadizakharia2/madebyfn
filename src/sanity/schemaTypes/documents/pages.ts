import { defineArrayMember, defineField, defineType } from 'sanity';

const pageHeader = [
  defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small mono label above the title.' }),
  defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 4 }),
];

const seoField = defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' });

const groups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'seo', title: 'SEO' },
];

export const workPage = defineType({
  name: 'workPage',
  title: 'Work page',
  type: 'document',
  groups,
  fields: [
    ...pageHeader.map((f) => ({ ...f, group: 'content' })),
    defineField({ name: 'industryFilterLabel', title: 'Industry filter label', type: 'string', group: 'content', initialValue: 'Industry' }),
    defineField({ name: 'serviceFilterLabel', title: 'Service filter label', type: 'string', group: 'content', initialValue: 'Service' }),
    defineField({ name: 'allLabel', title: '"All" filter label', type: 'string', group: 'content', initialValue: 'All' }),
    defineField({ name: 'emptyMessage', title: 'Empty state message', type: 'string', group: 'content', initialValue: 'No projects match this filter.' }),
    defineField({
      name: 'cta',
      title: 'Bottom call to action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'buttonLabel', title: 'Button label', type: 'string', initialValue: 'Start a Project' }),
      ],
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: 'Work page' }) },
});

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  groups,
  fields: [
    ...pageHeader.map((f) => ({ ...f, group: 'content' })),
    defineField({ name: 'problemsLabel', title: '"Typical problems" label', type: 'string', group: 'content', initialValue: 'Typical problems' }),
    defineField({ name: 'engagementLabel', title: '"Engagement" label', type: 'string', group: 'content', initialValue: 'Engagement' }),
    defineField({ name: 'technologiesLabel', title: '"Technologies" label', type: 'string', group: 'content', initialValue: 'Technologies' }),
    defineField({ name: 'projectsLabel', title: '"Related projects" label', type: 'string', group: 'content', initialValue: 'Related projects' }),
    defineField({ name: 'discussLabel', title: 'Per-service link label', type: 'string', group: 'content', initialValue: 'Discuss this service' }),
    defineField({
      name: 'cta',
      title: 'Bottom call to action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 3 }),
        defineField({ name: 'buttonLabel', title: 'Button label', type: 'string', initialValue: 'Start a Conversation' }),
      ],
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: 'Services page' }) },
});

export const studioPage = defineType({
  name: 'studioPage',
  title: 'Studio page',
  type: 'document',
  groups,
  fields: [
    ...pageHeader.map((f) => ({ ...f, group: 'content' })),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Philosophy' }),
        defineField({ name: 'statement', title: 'Statement', type: 'text', rows: 4, validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: 'principles',
      title: 'Principles',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Principles' }),
        defineField({
          name: 'items',
          title: 'Principles',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'principle',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
              ],
              preview: { select: { title: 'title', subtitle: 'body' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'The Team' }),
        defineField({ name: 'specialitiesLabel', title: '"Specialities" label', type: 'string', initialValue: 'Specialities' }),
        defineField({
          name: 'developers',
          title: 'Developers',
          type: 'array',
          description: 'When empty, all developers are shown in display order.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'developer' }] })],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom call to action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'buttonLabel', title: 'Button label', type: 'string', initialValue: 'Start a Project' }),
      ],
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: 'Studio page' }) },
});

export const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights page',
  type: 'document',
  groups,
  fields: [
    ...pageHeader.map((f) => ({ ...f, group: 'content' })),
    defineField({ name: 'allLabel', title: '"All" filter label', type: 'string', group: 'content', initialValue: 'All' }),
    defineField({ name: 'featuredLabel', title: 'Featured badge label', type: 'string', group: 'content', initialValue: 'Featured' }),
    defineField({
      name: 'featuredArticle',
      title: 'Featured article',
      type: 'reference',
      group: 'content',
      to: [{ type: 'article' }],
      description: 'When empty, the newest article marked "featured" is used, then the newest article.',
    }),
    defineField({ name: 'showNewsletter', title: 'Show newsletter signup at the bottom', type: 'boolean', group: 'content', initialValue: true }),
    seoField,
  ],
  preview: { prepare: () => ({ title: 'Insights page' }) },
});

export const startProjectPage = defineType({
  name: 'startProjectPage',
  title: 'Start a Project page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'form', title: 'Form options' },
    { name: 'success', title: 'Success state' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    ...pageHeader.map((f) => ({ ...f, group: 'content' })),
    defineField({
      name: 'infoItems',
      title: 'Info items',
      type: 'array',
      group: 'content',
      description: 'The short facts in the left column (availability, response time, engagements).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'infoItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '● Filled', value: 'filled' },
                  { title: '◐ Half', value: 'half' },
                  { title: '○ Outline', value: 'outline' },
                ],
              },
              initialValue: 'filled',
            }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({ name: 'emailLabel', title: 'Direct email label', type: 'string', group: 'content', initialValue: 'Or email directly' }),

    defineField({
      name: 'projectTypes',
      title: 'Project types',
      type: 'array',
      group: 'form',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'budgetRanges',
      title: 'Budget ranges',
      type: 'array',
      group: 'form',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'timelines',
      title: 'Timeline options',
      type: 'array',
      group: 'form',
      description: 'Optional. Leave empty to hide the timeline question.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'descriptionPlaceholder', title: 'Description placeholder', type: 'text', rows: 3, group: 'form' }),
    defineField({ name: 'referralPlaceholder', title: 'Referral placeholder', type: 'string', group: 'form', initialValue: 'Word of mouth, Google, etc.' }),
    defineField({ name: 'submitLabel', title: 'Submit button label', type: 'string', group: 'form', initialValue: 'Send Project Inquiry' }),
    defineField({ name: 'footnote', title: 'Footnote under the button', type: 'string', group: 'form' }),
    defineField({
      name: 'faq',
      title: 'FAQ section',
      type: 'object',
      group: 'form',
      fields: [
        defineField({ name: 'enabled', title: 'Show FAQs under the form', type: 'boolean', initialValue: true }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Before you write' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Common questions.' }),
      ],
    }),

    defineField({ name: 'successHeading', title: 'Success heading', type: 'string', group: 'success', validation: (rule) => rule.required() }),
    defineField({ name: 'successCopy', title: 'Success copy', type: 'text', rows: 3, group: 'success' }),
    defineField({ name: 'successLinkLabel', title: 'Success link label', type: 'string', group: 'success', initialValue: 'Back to home' }),
    defineField({ name: 'errorMessage', title: 'Generic error message', type: 'string', group: 'success' }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Start a Project page' }) },
});

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: '404 page',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Error 404' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 3 }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: { prepare: () => ({ title: '404 page' }) },
});
