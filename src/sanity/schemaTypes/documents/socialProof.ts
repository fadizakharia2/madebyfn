import { defineArrayMember, defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 5, validation: (rule) => rule.required().max(600) }),
    defineField({ name: 'person', title: 'Person', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Co-founder & CEO"' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'client', title: 'Client record', type: 'reference', to: [{ type: 'client' }], description: 'Optional link to the client for its logo.' }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'imageWithAlt' }),
    defineField({ name: 'companyLogo', title: 'Company logo', type: 'imageWithAlt' }),
    defineField({ name: 'project', title: 'Related project', type: 'reference', to: [{ type: 'project' }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: true, description: 'Featured testimonials appear on the homepage carousel.' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'person', company: 'company', quote: 'quote', media: 'avatar' },
    prepare: ({ title, company, quote, media }) => ({
      title: company ? `${title} · ${company}` : title,
      subtitle: quote,
      media,
    }),
  },
});

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'imageWithAlt' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'industry', title: 'Industry', type: 'reference', to: [{ type: 'industry' }] }),
    defineField({ name: 'projects', title: 'Projects', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'website', media: 'logo' },
  },
});

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'description' } },
});
