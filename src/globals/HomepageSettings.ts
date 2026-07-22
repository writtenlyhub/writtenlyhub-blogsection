import type { GlobalConfig } from 'payload'
import { revalidateCollection } from '../lib/utils/revalidate'

export const HomepageSettings: GlobalConfig = {
  slug: 'homepage-settings',
  label: 'Homepage Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => {
      revalidateCollection(['homepage-settings', 'blogs', 'categories']);
    }],
  },
  fields: [
    {
      name: 'curatedCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      minRows: 1,
      maxRows: 3,
      required: true,
      admin: {
        description: 'Select up to 3 categories to display on the blog homepage.',
      },
    },
  ],
}
