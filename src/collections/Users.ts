import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../lib/utils/revalidate'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (req.user) return true
      const { totalDocs } = await req.payload.find({ collection: 'users', limit: 1, depth: 0 })
      return totalDocs === 0
    },
    update: async ({ req }) => {
      if (req.user) return true
      const { totalDocs } = await req.payload.find({ collection: 'users', limit: 1, depth: 0 })
      return totalDocs === 0
    },
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateCollection(['blogs'])],
    afterDelete: [() => revalidateCollection(['blogs'])],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      access: {
        read: ({ req }) => Boolean(req.user),
      },
    },
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
