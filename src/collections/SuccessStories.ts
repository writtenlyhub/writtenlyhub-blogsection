import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'
import { revalidateCollection } from '../lib/utils/revalidate'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientName', 'category', '_status'],
    preview: (doc) => {
      if (doc?.slug) {
        return `/api/draft?slug=${doc.slug}&collection=success-stories`
      }
      return null
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (data._status === 'published') {
          if (!data.slug) {
            throw new Error('Validation Error: A slug is required to publish this success story.')
          }
          if (data.slug) {
            const existing = await req.payload.find({
              collection: 'success-stories',
              where: {
                slug: { equals: data.slug },
                id: { not_equals: originalDoc?.id },
              },
              limit: 1,
            })
            if (existing.docs.length > 0) {
              throw new Error(`Validation Error: The slug "${data.slug}" is already in use by another success story.`)
            }
          }
        }
        data.lastUpdated = new Date().toISOString()
        if (
          data._status === 'published' &&
          (!originalDoc?._status || originalDoc._status !== 'published') &&
          !originalDoc?.publishedDate
        ) {
          data.publishedDate = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        if (doc._status === 'published' || previousDoc?._status === 'published') {
          await revalidateCollection(['success-stories', `success-story-${doc.slug}`])
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc._status === 'published') {
          await revalidateCollection(['success-stories', `success-story-${doc.slug}`])
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'clientName',
              type: 'text',
              required: true,
            },
            {
              name: 'clientLogo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'success-story-categories',
              required: true,
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          label: 'Summary & Metrics',
          fields: [
            {
              name: 'summaryHeading',
              type: 'text',
              defaultValue: 'SUMMARY',
            },
            {
              name: 'summaryBullets',
              type: 'array',
              fields: [
                {
                  name: 'point',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'metrics',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'optionalVisual',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Strategy',
          fields: [
            {
              name: 'strategyEyebrow',
              type: 'text',
            },
            {
              name: 'strategyHeading',
              type: 'text',
            },
            {
              name: 'strategyDescription',
              type: 'textarea',
            },
            {
              name: 'strategyVisual',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Problem',
          fields: [
            {
              name: 'problemHeading',
              type: 'text',
            },
            {
              name: 'problemDescription',
              type: 'textarea',
            },
            {
              name: 'problemPoints',
              type: 'array',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'beforeImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'afterImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Impact & Solution',
          fields: [
            {
              name: 'impactHeading',
              type: 'text',
            },
            {
              name: 'impactDescription',
              type: 'textarea',
            },
            {
              name: 'impactVisual',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'solutionBlocks',
              type: 'array',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bodyCopy',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Client',
          fields: [
            {
              name: 'clientDescription',
              type: 'textarea',
            },
            {
              name: 'clientVisual',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'testimonial',
              type: 'group',
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                },
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields],
        },
      ],
    },
    slugField('title'),
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
