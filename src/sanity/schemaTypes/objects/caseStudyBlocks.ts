import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Reusable case-study modules. Each block maps 1:1 to a renderer in
 * src/components/case-study/blocks. Adding a block here plus a renderer
 * there makes it available to every project without touching page code.
 */

const sectionIntro = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    description: 'Small mono label above the heading, e.g. "Architecture".',
  }),
  defineField({ name: 'heading', title: 'Heading', type: 'string' }),
];

export const blockRichText = defineType({
  name: 'blockRichText',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional section heading, e.g. "The challenge".',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Rich text', subtitle: 'Rich text' }),
  },
});

export const blockHeading = defineType({
  name: 'blockHeading',
  title: 'Statement heading',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({ name: 'text', title: 'Supporting text', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title, subtitle: 'Statement heading' }),
  },
});

export const blockFullWidthImage = defineType({
  name: 'blockFullWidthImage',
  title: 'Full-width image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (480px)', value: 'standard' },
          { title: 'Tall (70vh)', value: 'tall' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'standard',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'image.alt' },
    prepare: ({ media, title }) => ({ title: title || 'Image', subtitle: 'Full-width image', media }),
  },
});

export const blockContainedImage = defineType({
  name: 'blockContainedImage',
  title: 'Contained image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: 'image', title: 'image.alt' },
    prepare: ({ media, title }) => ({ title: title || 'Image', subtitle: 'Contained image', media }),
  },
});

export const blockVideo = defineType({
  name: 'blockVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoEmbed',
      validation: (rule) =>
        rule.required().custom((value) => {
          const video = value as { url?: string } | undefined;
          return video?.url ? true : 'Add a video URL, or remove this module.';
        }),
    }),
  ],
  preview: {
    select: { title: 'video.caption', url: 'video.url' },
    prepare: ({ title, url }) => ({ title: title || 'Video', subtitle: url }),
  },
});

export const blockTwoColumnMedia = defineType({
  name: 'blockTwoColumnMedia',
  title: 'Two-column media',
  type: 'object',
  fields: [
    defineField({ name: 'left', title: 'Left image', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({ name: 'right', title: 'Right image', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { media: 'left', title: 'caption' },
    prepare: ({ media, title }) => ({ title: title || 'Two-column media', subtitle: 'Two-column media', media }),
  },
});

export const blockGallery = defineType({
  name: 'blockGallery',
  title: 'Image gallery',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'images.0' },
    prepare: ({ title, media }) => ({ title: title || 'Gallery', subtitle: 'Image gallery', media }),
  },
});

export const blockQuote = defineType({
  name: 'blockQuote',
  title: 'Pull quote',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'attribution', title: 'Attribution', type: 'string' }),
  ],
  preview: { select: { title: 'quote', subtitle: 'attribution' } },
});

export const blockTestimonial = defineType({
  name: 'blockTestimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'testimonial.person', subtitle: 'testimonial.company' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Testimonial',
      subtitle: subtitle ? `Testimonial · ${subtitle}` : 'Testimonial',
    }),
  },
});

export const blockMetrics = defineType({
  name: 'blockMetrics',
  title: 'Metrics',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Results' }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [defineArrayMember({ type: 'metric' })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { title: 'eyebrow' },
    prepare: ({ title }) => ({ title: title || 'Metrics', subtitle: 'Metrics' }),
  },
});

export const blockArchitecture = defineType({
  name: 'blockArchitecture',
  title: 'Architecture diagram',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({
      name: 'image',
      title: 'Diagram image',
      type: 'imageWithAlt',
      description: 'Optional. When omitted, the layers below are drawn as a schematic.',
    }),
    defineField({
      name: 'layers',
      title: 'System layers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'layer',
          fields: [
            defineField({ name: 'name', title: 'Layer', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({
              name: 'technologies',
              title: 'Technologies',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              options: { layout: 'tags' },
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Architecture', subtitle: 'Architecture diagram' }),
  },
});

export const blockCode = defineType({
  name: 'blockCode',
  title: 'Code example',
  type: 'object',
  fields: [
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 2 }),
    defineField({ name: 'code', title: 'Code', type: 'codeBlock', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'code.filename' },
    prepare: ({ title }) => ({ title: title || 'Code', subtitle: 'Code example' }),
  },
});

export const blockFeatureGrid = defineType({
  name: 'blockFeatureGrid',
  title: 'Feature grid',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Feature grid', subtitle: 'Feature grid' }),
  },
});

export const blockTimeline = defineType({
  name: 'blockTimeline',
  title: 'Timeline',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({
      name: 'items',
      title: 'Milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'milestone',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Week 1" or "Q3 2024".',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'label' } },
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Timeline', subtitle: 'Timeline' }),
  },
});

export const blockProcess = defineType({
  name: 'blockProcess',
  title: 'Process section',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'label', subtitle: 'heading' } },
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Process', subtitle: 'Process section' }),
  },
});

export const blockStickyTextVisual = defineType({
  name: 'blockStickyTextVisual',
  title: 'Sticky text + visual',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({ name: 'body', title: 'Body', type: 'blockContent', validation: (rule) => rule.required() }),
    defineField({ name: 'image', title: 'Visual', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({
      name: 'visualSide',
      title: 'Visual position',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Sticky text + visual', subtitle: 'Sticky text + visual', media }),
  },
});

export const blockComparison = defineType({
  name: 'blockComparison',
  title: 'Comparison / before–after',
  type: 'object',
  fields: [
    ...sectionIntro,
    defineField({ name: 'beforeLabel', title: 'Before label', type: 'string', initialValue: 'Before' }),
    defineField({ name: 'afterLabel', title: 'After label', type: 'string', initialValue: 'After' }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({ name: 'aspect', title: 'Aspect', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'before', title: 'Before', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'after', title: 'After', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'aspect', subtitle: 'after' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Comparison', subtitle: 'Comparison' }),
  },
});

export const blockCallout = defineType({
  name: 'blockCallout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({ name: 'callout', title: 'Callout', type: 'callout', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'callout.heading', subtitle: 'callout.body' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Callout', subtitle }),
  },
});

export const blockRelatedProjects = defineType({
  name: 'blockRelatedProjects',
  title: 'Related projects',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Related work' }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (rule) => rule.required().min(1).max(3),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Related projects', subtitle: 'Related projects' }),
  },
});

export const blockCta = defineType({
  name: 'blockCta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'link', title: 'Button', type: 'link' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title, subtitle: 'Call to action' }),
  },
});

export const caseStudyBlockTypes = [
  blockRichText,
  blockHeading,
  blockFullWidthImage,
  blockContainedImage,
  blockVideo,
  blockTwoColumnMedia,
  blockGallery,
  blockQuote,
  blockTestimonial,
  blockMetrics,
  blockArchitecture,
  blockCode,
  blockFeatureGrid,
  blockTimeline,
  blockProcess,
  blockStickyTextVisual,
  blockComparison,
  blockCallout,
  blockRelatedProjects,
  blockCta,
];

export const caseStudyBlocks = defineType({
  name: 'caseStudyBlocks',
  title: 'Case study content',
  type: 'array',
  of: caseStudyBlockTypes.map((block) => defineArrayMember({ type: block.name })),
});
