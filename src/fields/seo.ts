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
              admin: {
                description: 'Override global robot meta tags for this specific page.',
              },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Basic Directives',
                  admin: {
                    initCollapsed: false,
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'index', type: 'checkbox', label: 'Index', admin: { description: 'Allow search engines to index pages', width: '25%' } },
                        { name: 'noindex', type: 'checkbox', label: 'Noindex', admin: { description: 'Prevent indexing', width: '25%' } },
                        { name: 'follow', type: 'checkbox', label: 'Follow', admin: { description: 'Allow following links', width: '25%' } },
                        { name: 'nofollow', type: 'checkbox', label: 'Nofollow', admin: { description: 'Prevent following links', width: '25%' } },
                      ]
                    }
                  ]
                },
                {
                  type: 'collapsible',
                  label: 'Advanced Directives',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'noarchive', type: 'checkbox', label: 'Noarchive', admin: { description: 'Do not show a cached link in search results', width: '33.33%' } },
                        { name: 'nosnippet', type: 'checkbox', label: 'Nosnippet', admin: { description: 'Do not show a text snippet or video preview', width: '33.33%' } },
                        { name: 'noimageindex', type: 'checkbox', label: 'Noimageindex', admin: { description: 'Do not index images on this page', width: '33.33%' } },
                      ]
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'maxSnippet', type: 'number', label: 'Max Snippet Length', admin: { description: 'Maximum text-snippet length (in characters)', width: '33.33%' } },
                        { name: 'maxImagePreview', type: 'select', label: 'Max Image Preview', options: [{ label: 'None', value: 'none' }, { label: 'Standard', value: 'standard' }, { label: 'Large', value: 'large' }], admin: { description: 'Maximum size of an image preview', width: '33.33%' } },
                        { name: 'maxVideoPreview', type: 'number', label: 'Max Video Preview', admin: { description: 'Maximum video snippet length (in seconds)', width: '33.33%' } },
                      ]
                    }
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
