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
              name: 'defaultTitle',
              type: 'text',
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
            },
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
