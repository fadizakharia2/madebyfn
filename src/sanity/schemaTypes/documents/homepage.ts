import { defineArrayMember, defineField, defineType } from 'sanity';

const sectionHeading = (extra: ReturnType<typeof defineField>[] = []) => [
  defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'text',
    rows: 2,
    description: 'Line breaks are preserved.',
    validation: (rule) => rule.required(),
  }),
  ...extra,
];

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Sections' },
    { name: 'visibility', title: 'Visibility' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'e.g. "madebyfn — Product Engineering Studio"' }),
        defineField({
          name: 'title',
          title: 'Headline',
          type: 'text',
          rows: 2,
          description: 'Line breaks are preserved. Words listed in "Highlighted words" are rendered in italic brass.',
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: 'highlightedWords',
          title: 'Highlighted words',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          options: { layout: 'tags' },
        }),
        defineField({ name: 'copy', title: 'Positioning copy', type: 'text', rows: 4, validation: (rule) => rule.required() }),
        defineField({ name: 'primaryCta', title: 'Primary button', type: 'link' }),
        defineField({ name: 'secondaryCta', title: 'Secondary button', type: 'link' }),
        defineField({ name: 'availabilityText', title: 'Availability line', type: 'string', description: 'e.g. "Available for new engagements · {quarter}". {quarter} becomes the current quarter automatically. Falls back to site settings.' }),
        defineField({
          name: 'backgroundVideo',
          title: 'Background video',
          type: 'object',
          description:
            'A muted, looping clip behind the hero. Keep it dark and slow-moving; it plays at the opacity set below and is replaced by the poster image for visitors who prefer reduced motion.',
          fields: [
            defineField({ name: 'enabled', title: 'Show background video', type: 'boolean', initialValue: false }),
            defineField({
              name: 'file',
              title: 'Video file',
              type: 'file',
              description: 'Upload an MP4 (H.264) or WebM. Aim for under 5 MB, 1920×1080, 10–20 seconds.',
              options: { accept: 'video/mp4,video/webm' },
            }),
            defineField({
              name: 'url',
              title: 'Or video URL',
              type: 'url',
              description: 'Direct link to an .mp4/.webm file. Used when no file is uploaded.',
              validation: (rule) => rule.uri({ scheme: ['https'] }),
            }),
            defineField({ name: 'poster', title: 'Poster image', type: 'imageWithAlt', description: 'Shown while the video loads and instead of the video for reduced-motion visitors.' }),
            defineField({
              name: 'opacity',
              title: 'Opacity (%)',
              type: 'number',
              description: 'How strongly the video shows through the dark background. 50–70 works for dark clips; lower it for bright footage.',
              initialValue: 60,
              validation: (rule) => rule.min(5).max(100),
            }),
          ],
        }),
        defineField({
          name: 'visual',
          title: 'Floating visual',
          type: 'object',
          description: 'The technical composition at the right of the hero.',
          fields: [
            defineField({ name: 'enabled', title: 'Show visual', type: 'boolean', initialValue: true }),
            defineField({ name: 'codeSnippet', title: 'Code fragment', type: 'text', rows: 8, description: 'Rendered in a floating editor window with light syntax colouring.' }),
            defineField({
              name: 'metricCard',
              title: 'Metric card',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Meridian / Q3 2024"' }),
                defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "340%"' }),
                defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'e.g. "faster reporting ↑"' }),
                defineField({
                  name: 'bars',
                  title: 'Bar chart values (0–100)',
                  type: 'array',
                  of: [defineArrayMember({ type: 'number', validation: (rule) => rule.min(0).max(100) })],
                }),
              ],
            }),
            defineField({ name: 'stackLabel', title: 'Stack card label', type: 'string', initialValue: 'Stack' }),
            defineField({
              name: 'stackTechnologies',
              title: 'Stack card technologies',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })],
              validation: (rule) => rule.max(8),
            }),
            defineField({ name: 'watermark', title: 'Corner watermark', type: 'string', description: 'e.g. "fn / Studio / {year}"' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'stats',
      title: 'Credibility strip',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({ name: 'items', title: 'Stats', type: 'array', of: [defineArrayMember({ type: 'metric' })], validation: (rule) => rule.max(6) }),
        defineField({ name: 'note', title: 'Right-hand note', type: 'string', description: 'e.g. "Beirut, Lebanon · EST. 2022"' }),
      ],
    }),

    defineField({
      name: 'selectedWork',
      title: 'Selected work',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'linkLabel', title: 'Link label', type: 'string', initialValue: 'View all work' }),
        defineField({
          name: 'projects',
          title: 'Projects',
          type: 'array',
          description: 'Ordered list. When empty, featured projects are shown in their display order.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),

    defineField({
      name: 'featuredCase',
      title: 'Featured case story',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'project', title: 'Project', type: 'reference', to: [{ type: 'project' }] }),
        defineField({
          name: 'steps',
          title: 'Story steps',
          type: 'array',
          description: 'Challenge → Approach → Build → Result',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'storyStep',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (rule) => rule.required() }),
              ],
              preview: { select: { title: 'label', subtitle: 'heading' } },
            }),
          ],
          validation: (rule) => rule.min(2).max(6),
        }),
        defineField({ name: 'linkLabel', title: 'Link label', type: 'string', initialValue: 'Full case study' }),
        defineField({ name: 'metricsLabel', title: 'Metrics card label', type: 'string', description: 'e.g. "Q3 2024". The client name comes from the project.' }),
        defineField({
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          description: 'Falls back to the first three project metrics when empty.',
          of: [defineArrayMember({ type: 'metric' })],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'linkLabel', title: 'Link label', type: 'string', initialValue: 'All services' }),
        defineField({
          name: 'items',
          title: 'Services',
          type: 'array',
          description: 'When empty, featured services are shown in display order.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
        }),
      ],
    }),

    defineField({
      name: 'team',
      title: 'Developers',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
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
      name: 'technology',
      title: 'Technology',
      type: 'object',
      group: 'sections',
      fields: [...sectionHeading()],
    }),

    defineField({
      name: 'process',
      title: 'Process',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'processStep',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required() }),
              ],
              preview: { select: { title: 'label', subtitle: 'description' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'model',
      title: 'Why two developers',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'agencyLabel', title: 'Left column label', type: 'string', initialValue: 'Traditional Agency' }),
        defineField({ name: 'studioLabel', title: 'Right column label', type: 'string', description: 'Defaults to the studio name.' }),
        defineField({
          name: 'rows',
          title: 'Comparison rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonRow',
              fields: [
                defineField({ name: 'aspect', title: 'Aspect', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'agency', title: 'Traditional agency', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'studio', title: 'This studio', type: 'string', validation: (rule) => rule.required() }),
              ],
              preview: { select: { title: 'aspect', subtitle: 'studio' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          description: 'When empty, featured testimonials are shown in display order.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
        }),
      ],
    }),

    defineField({
      name: 'insights',
      title: 'Insights',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'linkLabel', title: 'Link label', type: 'string', initialValue: 'All articles' }),
        defineField({
          name: 'articles',
          title: 'Articles',
          type: 'array',
          description: 'When empty, the three latest articles are shown.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),

    defineField({
      name: 'finalCta',
      title: 'Final call to action',
      type: 'object',
      group: 'sections',
      fields: [
        ...sectionHeading(),
        defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 3 }),
        defineField({ name: 'primaryLabel', title: 'Button label', type: 'string', initialValue: 'Start a Project' }),
        defineField({ name: 'showEmail', title: 'Show direct email button', type: 'boolean', initialValue: true }),
        defineField({ name: 'backgroundText', title: 'Background text', type: 'string', description: 'Giant faint italic text behind the section, e.g. "Let\'s build."' }),
        defineField({ name: 'availabilityText', title: 'Availability line', type: 'string', description: 'e.g. "Available · Responding within 48 hours"' }),
      ],
    }),

    defineField({
      name: 'visibility',
      title: 'Section visibility',
      type: 'object',
      group: 'visibility',
      description: 'Toggle homepage sections without deleting their content.',
      fields: [
        'stats',
        'selectedWork',
        'featuredCase',
        'services',
        'team',
        'technology',
        'process',
        'model',
        'testimonials',
        'insights',
        'finalCta',
      ].map((name) =>
        defineField({
          name,
          title: `Show ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          type: 'boolean',
          initialValue: true,
        }),
      ),
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
