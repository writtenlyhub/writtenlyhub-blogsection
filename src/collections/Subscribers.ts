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
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'First name of the subscriber (optional)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Where this subscriber signed up from (e.g., Blog Popup, Inline Form, Footer, Article CTA)',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'confirmationToken',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'confirmationTokenExpiresAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'confirmedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
