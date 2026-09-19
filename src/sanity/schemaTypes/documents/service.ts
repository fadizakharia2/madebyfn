import { defineArrayMember, defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'content', description: 'One line shown when the row is collapsed, e.g. "Concept to production. No handoffs."', validation: (rule) => rule.required().max(80) }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'text', rows: 3, group: 'content', description: 'Used on the homepage accordion.', validation: (rule) => rule.required().max(300) }),
    defineField({ name: 'longDescription', title: 'Long description', type: 'text', rows: 5, group: 'content', description: 'Used on the Services page.' }),
    defineField({ name: 'summary', title: 'Scope summary', type: 'string', group: 'content', description: 'Short list shown next to the name on the homepage, e.g. "SaaS, platforms, MVPs, web applications".' }),
    defineField({ name: 'capabilities', title: 'What we build', type: 'array', group: 'content', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'typicalProblems', title: 'Typical problems', type: 'array', group: 'content', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'engagement', title: 'Engagement possibilities', type: 'text', rows: 2, group: 'content', description: 'e.g. "Sprint-based engagement, full ownership model, technical co-founder dynamic"' }),
    defineField({ name: 'icon', title: 'Icon / visual', type: 'imageWithAlt', group: 'content' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'content', initialValue: true, description: 'Featured services appear on the homepage when no explicit list is set.' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'content', initialValue: 100 }),

    defineField({ name: 'technologies', title: 'Related technologies', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })] }),
    defineField({ name: 'homepageTechnologies', title: 'Homepage technologies', type: 'array', group: 'relations', description: 'Optional shorter list for the homepage accordion. Falls back to the first five related technologies.', of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })], validation: (rule) => rule.max(6) }),
    defineField({ name: 'projects', title: 'Related projects', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'icon' },
  },
});

export const TECHNOLOGY_CATEGORIES = [
  { title: 'Frontend', value: 'frontend' },
  { title: 'Backend', value: 'backend' },
  { title: 'Mobile', value: 'mobile' },
  { title: 'Data', value: 'data' },
  { title: 'AI', value: 'ai' },
  { title: 'Commerce', value: 'commerce' },
  { title: 'Infrastructure', value: 'infrastructure' },
  { title: 'CMS', value: 'cms' },
  { title: 'Design', value: 'design' },
  { title: 'Other', value: 'other' },
];

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: TECHNOLOGY_CATEGORIES },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'logo', title: 'Logo / icon', type: 'imageWithAlt' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'url', title: 'Website', type: 'url' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [
    { title: 'Category, then order', name: 'categoryOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo' },
  },
});
