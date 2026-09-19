import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Overrides for search engines and social sharing. Leave blank to use sensible defaults.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
      validation: (rule) =>
        rule.max(70).warning('Titles over 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'A one or two sentence summary for search results. Aim for 120–160 characters.',
      validation: (rule) => rule.max(170).warning('Descriptions over 160 characters may be truncated.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social sharing image',
      type: 'image',
      description: 'Recommended 1200×630. Falls back to the page hero image, then the site default.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
