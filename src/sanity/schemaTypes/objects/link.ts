import { defineField, defineType } from 'sanity';

/** Document types that a navigation item can point at. */
export const INTERNAL_LINK_TARGETS = [
  { type: 'homepage' },
  { type: 'workPage' },
  { type: 'servicesPage' },
  { type: 'studioPage' },
  { type: 'insightsPage' },
  { type: 'startProjectPage' },
  { type: 'project' },
  { type: 'service' },
  { type: 'developer' },
  { type: 'article' },
  { type: 'legalPage' },
];

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: INTERNAL_LINK_TARGETS,
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === 'internal' && !value) return 'Choose a page to link to.';
          return true;
        }),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['https', 'http', 'mailto', 'tel'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === 'external' && !value) return 'Enter a URL.';
          return true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      href: 'href',
      internalTitle: 'internal.title',
      internalName: 'internal.name',
    },
    prepare: ({ title, linkType, href, internalTitle, internalName }) => ({
      title,
      subtitle: linkType === 'external' ? href : `→ ${internalTitle || internalName || 'internal page'}`,
    }),
  },
});

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'X / Twitter', value: 'x' },
          { title: 'Dribbble', value: 'dribbble' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Shown to visitors, e.g. "GitHub".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https', 'http'] }),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'url' } },
});
