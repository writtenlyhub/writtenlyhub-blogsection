import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
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
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'index', type: 'checkbox', defaultValue: true },
                    { name: 'noindex', type: 'checkbox' },
                    { name: 'follow', type: 'checkbox', defaultValue: true },
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
      ],
    },
  ],
}
