import { defineArrayMember, defineField, defineType } from 'sanity';

export const developer = defineType({
  name: 'developer',
  title: 'Developer',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'expertise', title: 'Expertise' },
    { name: 'links', title: 'Links' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', group: 'profile', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'profile', description: 'e.g. "Backend & Systems Architecture"', validation: (rule) => rule.required() }),
    defineField({ name: 'shortTitle', title: 'Short title', type: 'string', group: 'profile', description: 'Used in tight spaces such as the footer, e.g. "Backend & Architecture".' }),
    defineField({ name: 'portrait', title: 'Portrait', type: 'imageWithAlt', group: 'profile', description: 'Portrait orientation, at least 1200px tall.', validation: (rule) => rule.required() }),
    defineField({ name: 'alternatePortrait', title: 'Alternate portrait', type: 'imageWithAlt', group: 'profile' }),
    defineField({ name: 'shortBio', title: 'Short bio', type: 'text', rows: 4, group: 'profile', description: 'Two or three sentences for the homepage.', validation: (rule) => rule.required().max(400) }),
    defineField({ name: 'longBio', title: 'Long bio', type: 'text', rows: 8, group: 'profile', description: 'Used on the Studio page.' }),
    defineField({ name: 'approachQuote', title: 'Approach quote', type: 'text', rows: 3, group: 'profile', description: 'A first-person line shown as a pull quote on the Studio page.' }),
    defineField({ name: 'yearsOfExperience', title: 'Years of experience', type: 'number', group: 'profile', validation: (rule) => rule.min(0).max(60) }),
    defineField({ name: 'since', title: 'With the studio since', type: 'string', group: 'profile', description: 'e.g. "2022"' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'profile' }),
    defineField({ name: 'languages', title: 'Languages', type: 'array', group: 'profile', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'availability', title: 'Availability note', type: 'string', group: 'profile' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'profile', initialValue: 1 }),

    defineField({ name: 'specializations', title: 'Specializations', type: 'array', group: 'expertise', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'skills', title: 'Skills', type: 'array', group: 'expertise', description: 'Shown as the "Stack" / "Specialities" tags.', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
    defineField({ name: 'technologies', title: 'Technologies', type: 'array', group: 'expertise', of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })] }),
    defineField({ name: 'featuredProjects', title: 'Featured projects', type: 'array', group: 'expertise', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),

    defineField({ name: 'github', title: 'GitHub URL', type: 'url', group: 'links' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'links' }),
    defineField({ name: 'website', title: 'Personal website', type: 'url', group: 'links' }),
    defineField({ name: 'resumeUrl', title: 'Résumé URL', type: 'url', group: 'links' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'links', validation: (rule) => rule.email() }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'portrait' },
  },
});
