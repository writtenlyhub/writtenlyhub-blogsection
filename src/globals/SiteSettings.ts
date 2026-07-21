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
      ],
    },
  ],
}
