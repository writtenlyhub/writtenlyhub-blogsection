import { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO Settings',
  admin: {
    position: 'sidebar',
  },
  fields: [

    // --- NEW FIELDS ---
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      custom: { min: 50, max: 60 },
      admin: {
        description: 'Recommended length: 50-60 characters. Falls back to post title.',
        components: {
          afterInput: ['@/components/payload/seo/CharacterCounter#CharacterCounter'],
        }
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      custom: { min: 120, max: 160 },
      admin: {
        description: 'Recommended length: 150-160 characters. Falls back to excerpt.',
        components: {
          afterInput: ['@/components/payload/seo/CharacterCounter#CharacterCounter'],
        }
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL (Override)',
      admin: {
        description: 'Leave blank to auto-generate from site URL and slug.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Analysis',
          fields: [
            {
              name: 'focusKeyword',
              type: 'text',
              label: 'Focus Keyword',
              admin: {
                description: 'Enter the main keyword you want this page to rank for.',
              }
            },
            {
              name: 'dismissedWarnings',
              type: 'array',
              admin: {
                hidden: true, // Managed by custom UI components
              },
              fields: [
                { name: 'ruleId', type: 'text' }
              ]
            },
            {
              name: 'seoAnalysis',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload/seo/SeoAnalysis#SeoAnalysis',
                }
              }
            }
          ]
        },
        {
          label: 'Social (OG/Twitter)',
          fields: [
            {
              name: 'ogTitle',
              type: 'text',
              label: 'Open Graph Title',
              admin: { description: 'Falls back to Meta Title' },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'Open Graph Description',
              admin: { description: 'Falls back to Meta Description' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              label: 'Open Graph Image',
              relationTo: 'media',
              admin: { description: 'Falls back to Featured Image, then Global Default, then Generated Image' },
            },
            {
              name: 'twitterTitle',
              type: 'text',
              label: 'Twitter Title',
              admin: { description: 'Falls back to Open Graph Title' },
            },
            {
              name: 'twitterDescription',
              type: 'textarea',
              label: 'Twitter Description',
              admin: { description: 'Falls back to Open Graph Description' },
            },
            {
              name: 'twitterImage',
              type: 'upload',
              label: 'Twitter Image',
              relationTo: 'media',
              admin: { description: 'Falls back to Open Graph Image' },
            },
          ]
        },
        {
          label: 'Robots',
          fields: [
            {
              name: 'robots',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'index', type: 'checkbox' },
                    { name: 'noindex', type: 'checkbox' },
                    { name: 'follow', type: 'checkbox' },
                    { name: 'nofollow', type: 'checkbox' },
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'noarchive', type: 'checkbox' },
                    { name: 'nosnippet', type: 'checkbox' },
                    { name: 'noimageindex', type: 'checkbox' },
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'maxSnippet', type: 'number' },
                    { name: 'maxImagePreview', type: 'select', options: ['none', 'standard', 'large'] },
                    { name: 'maxVideoPreview', type: 'number' },
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'JSON-LD (Structured Data)',
          fields: [
            {
              name: 'jsonLd',
              type: 'group',
              fields: [
                {
                  name: 'faq',
                  type: 'array',
                  label: 'FAQ Schema',
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
                  ]
                },
                {
                  name: 'howTo',
                  type: 'group',
                  label: 'HowTo Schema',
                  fields: [
                    { name: 'name', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    {
                      name: 'step',
                      type: 'array',
                      fields: [
                        { name: 'name', type: 'text', required: true },
                        { name: 'text', type: 'textarea', required: true },
                        { name: 'url', type: 'text' },
                        { name: 'image', type: 'upload', relationTo: 'media' },
                      ]
                    }
                  ]
                },
                {
                  name: 'advancedOverride',
                  type: 'textarea',
                  label: 'Advanced JSON-LD Override',
                  admin: {
                    description: 'Valid JSON array or object to merge/append with generated schemas.',
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
}
