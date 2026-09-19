import { defineField, defineType } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for screen readers and search engines.',
      validation: (rule) => rule.required().error('Alt text is required for accessibility.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption shown beneath the image where the layout supports it.',
    }),
  ],
});

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'A direct .mp4/.webm file URL, or a YouTube / Vimeo link. Leave empty for no video.',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({ name: 'poster', title: 'Poster image', type: 'imageWithAlt' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay (muted, looped)',
      type: 'boolean',
      initialValue: false,
      description: 'Only applies to direct video files. Visitors who prefer reduced motion get a paused video.',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare: ({ url, caption }) => ({ title: caption || 'Video', subtitle: url }),
  },
});

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The headline figure, e.g. "340%" or "<100ms".',
      validation: (rule) => rule.required().max(12),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'What the figure measures, e.g. "Faster reporting".',
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
});
