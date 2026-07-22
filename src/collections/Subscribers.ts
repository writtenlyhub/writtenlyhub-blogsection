import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'source', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true, // Anyone can subscribe
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Where this subscriber signed up from (e.g., homepage, footer)',
      },
    },
  ],
}
