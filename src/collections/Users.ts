import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
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
      // Payload v3 limitation:
      // During create-first-user, the Media relationship drawer requires an authenticated
      // session and throws UnauthorizedError. Hide this field until the first admin
      // has been created and logged in.
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData, { user }) => Boolean(user),
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Author', value: 'author' },
      ],
      defaultValue: 'author',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
    {
      name: 'twitter',
      type: 'text',
    },
  ],
}
