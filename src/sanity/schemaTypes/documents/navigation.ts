import { defineArrayMember, defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'mainItems',
      title: 'Main navigation',
      type: 'array',
      group: 'header',
      description: 'Links shown in the header and the mobile menu. Keep it to four or five.',
      of: [defineArrayMember({ type: 'link' })],
      validation: (rule) => rule.max(6).warning('More than six items will crowd the header.'),
    }),
    defineField({
      name: 'cta',
      title: 'Header call to action',
      type: 'link',
      group: 'header',
      description: 'The filled button at the right of the header, e.g. "Start a Project".',
    }),
    defineField({
      name: 'footerItems',
      title: 'Footer navigation',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'legalItems',
      title: 'Legal links',
      type: 'array',
      group: 'footer',
      description: 'Shown in the footer bottom bar, e.g. Privacy Policy and Terms.',
      of: [defineArrayMember({ type: 'link' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
});
