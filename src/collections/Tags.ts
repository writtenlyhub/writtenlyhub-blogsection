import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../lib/utils/revalidate'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateCollection(['tags', 'blogs'])],
    afterDelete: [() => revalidateCollection(['tags', 'blogs'])],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField('name'),
  ],
}
