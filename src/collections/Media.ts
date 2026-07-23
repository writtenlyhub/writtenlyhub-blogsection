import type { CollectionConfig } from 'payload'
import { revalidateCollection } from '../lib/utils/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'feature',
        width: 1024,
        height: 768,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
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
  hooks: {
    afterChange: [() => revalidateCollection(['blogs'])],
    afterDelete: [() => revalidateCollection(['blogs'])],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
