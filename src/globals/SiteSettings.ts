import type { GlobalConfig } from 'payload'
import { revalidateCollection } from '../lib/utils/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => {
      revalidateCollection(['site-settings']);
    }],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Blog Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Insights & Strategies',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Global SEO',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              defaultValue: 'WrittenlyHub',
              admin: { description: 'The default site name used in SEO titles.' },
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              admin: { description: 'The default meta description for the site.' },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'The default Open Graph image used when a page lacks a specific image.' },
            },
            {
              name: 'defaultTwitterCard',
              type: 'select',
              defaultValue: 'summary_large_image',
              options: [
                { label: 'Summary', value: 'summary' },
                { label: 'Summary Large Image', value: 'summary_large_image' },
              ],
            },
            {
              name: 'defaultRobots',
              type: 'group',
              admin: {
                description: 'Configure default robots meta tags for search engines.',
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
                        { name: 'index', type: 'checkbox', defaultValue: true, label: 'Index', admin: { description: 'Allow search engines to index pages', width: '25%' } },
                        { name: 'noindex', type: 'checkbox', label: 'Noindex', admin: { description: 'Prevent indexing', width: '25%' } },
                        { name: 'follow', type: 'checkbox', defaultValue: true, label: 'Follow', admin: { description: 'Allow following links', width: '25%' } },
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
            },
            {
              name: 'verificationTags',
              type: 'group',
              fields: [
                { name: 'google', type: 'text', admin: { description: 'Google Search Console verification ID' } },
                { name: 'bing', type: 'text', admin: { description: 'Bing Webmaster Tools verification ID' } },
              ]
            },
            {
              name: 'organizationSchema',
              type: 'group',
              fields: [
                { name: 'name', type: 'text', defaultValue: 'WrittenlyHub' },
                { name: 'url', type: 'text' },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                { name: 'sameAs', type: 'array', fields: [{ name: 'url', type: 'text' }] },
              ]
            }
          ],
        },
        {
          label: 'Social & Footer',
          fields: [
            {
              name: 'contactEmail',
              type: 'text',
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Newsletter Popup',
          fields: [
            {
              name: 'newsletterPopup',
              type: 'group',
              fields: [
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Enable Newsletter Popup on Blog Posts',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Subscribe to Newsletter',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue: 'Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and digital writing.',
                  required: true,
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  defaultValue: 'Subscribe Now',
                  required: true,
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  defaultValue: '#newsletter',
                  required: true,
                },
              ]
            }
          ]
        },
        {
          label: 'Trusted Brands',
          fields: [
            {
              name: 'trustedBrands',
              type: 'group',
              fields: [
                {
                  name: 'logos',
                  type: 'array',
                  fields: [
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'alt',
                      type: 'text',
                    }
                  ],
                }
              ]
            }
          ]
        },
      ],
    },
  ],
}
