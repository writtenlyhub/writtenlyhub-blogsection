import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      const isBootstrap = (await req.payload.count({ collection: 'users' })).totalDocs === 0
      return req.user ? true : isBootstrap
    },
    update: async ({ req }) => {
      const isBootstrap = (await req.payload.count({ collection: 'users' })).totalDocs === 0
      return req.user ? true : isBootstrap
    },
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code (e.g., #FF0000)',
      },
    },
    seoFields,
  ],
}
