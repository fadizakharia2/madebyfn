import { defineArrayMember, defineField, defineType } from 'sanity';

export const articleCategory = defineType({
  name: 'articleCategory',
  title: 'Article category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required().max(120) }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, group: 'content', description: 'Shown on cards and as the standfirst.', validation: (rule) => rule.required().max(300) }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'imageWithAlt', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'showTableOfContents', title: 'Show table of contents', type: 'boolean', group: 'content', initialValue: true, description: 'Generated automatically from Heading 2 blocks.' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', group: 'content', validation: (rule) => rule.required() }),

    defineField({ name: 'author', title: 'Author', type: 'reference', group: 'meta', to: [{ type: 'developer' }], validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', group: 'meta', to: [{ type: 'articleCategory' }], validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published date', type: 'datetime', group: 'meta', validation: (rule) => rule.required() }),
    defineField({ name: 'updatedAt', title: 'Updated date', type: 'datetime', group: 'meta' }),
    defineField({ name: 'readingTime', title: 'Reading time (minutes)', type: 'number', group: 'meta', description: 'Leave empty to estimate from the body.', validation: (rule) => rule.min(1).max(120) }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'meta', initialValue: false }),

    defineField({ name: 'relatedArticles', title: 'Related articles', type: 'array', group: 'relations', description: 'When empty, the two newest articles in the same category are shown.', of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })], validation: (rule) => rule.max(2) }),
    defineField({ name: 'relatedProjects', title: 'Related projects', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),
    defineField({ name: 'relatedServices', title: 'Related services', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })] }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Published, newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', category: 'category.title', author: 'author.name', media: 'coverImage' },
    prepare: ({ title, category, author, media }) => ({
      title,
      subtitle: [category, author].filter(Boolean).join(' · '),
      media,
    }),
  },
});

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Engagement', 'Process', 'Pricing', 'Technology', 'General'] },
      initialValue: 'General',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } },
});

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'updatedAt', title: 'Last updated', type: 'date' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', validation: (rule) => rule.required() }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
});
