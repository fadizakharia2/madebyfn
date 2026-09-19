import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Rich text used by articles, case studies and legal pages.
 * The decoration set is deliberately small so editors produce consistent
 * typography that matches the design system.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({ scheme: ['https', 'http', 'mailto', 'tel'], allowRelative: true }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: 'imageWithAlt' }),
    defineArrayMember({ type: 'codeBlock' }),
    defineArrayMember({ type: 'callout' }),
    defineArrayMember({ type: 'videoEmbed' }),
  ],
});

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename / label',
      type: 'string',
      description: 'Shown above the code, e.g. "src/modules/billing/".',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          'typescript',
          'javascript',
          'tsx',
          'json',
          'bash',
          'sql',
          'python',
          'csharp',
          'yaml',
          'html',
          'css',
          'text',
        ],
      },
      initialValue: 'typescript',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { filename: 'filename', language: 'language' },
    prepare: ({ filename, language }) => ({ title: filename || 'Code block', subtitle: language }),
  },
});

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Note', value: 'note' },
          { title: 'Insight', value: 'insight' },
          { title: 'Warning', value: 'warning' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'insight',
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'body' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Callout', subtitle }),
  },
});
