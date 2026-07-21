import { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO Settings',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Recommended length: 50-60 characters.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Recommended length: 150-160 characters.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'OpenGraph Image',
      relationTo: 'media',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL (Override)',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Disable Indexing (noindex)',
      defaultValue: false,
    },
  ],
}
