import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'
import {
  QuoteBlock,
  ExpertInsightBlock,
  CTABlock,
  WatchLearnBlock,
  KeyTakeawaysBlock,
  QuickFactsBlock,
  CalloutBlock,
  FAQBlock,
} from '../blocks'
import { revalidateCollection } from '../lib/utils/revalidate'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractText = (node: any): string => {
  if (!node) return ''
  if (node.type === 'text') return node.text || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join(' ')
  }
  return ''
}

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  versions: {
    drafts: {
      autosave: {
        interval: 10000, // Autosave every 10 seconds
      },
    },
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status'],
    preview: (doc) => {
      if (doc?.slug) {
        return `/api/draft?slug=${doc.slug}`
      }
      return null
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // 1. Slug Generation
        if (data.title && !data.slug) {
          data.slug = formatSlug(data.title)
        } else if (data.slug) {
          data.slug = formatSlug(data.slug)
        }

        // 2. Read Time Calculation
        if (data.content && data.content.root) {
          const text = extractText(data.content.root)
          const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length
          const minutes = Math.ceil(wordCount / 200) || 1
          data.readTime = `${minutes} min read`
        } else {
          data.readTime = '1 min read'
        }

        // 3. Last Updated Timestamp
        data.lastUpdated = new Date().toISOString()

        // 4. Published Date (only on first publish)
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
      async ({ doc, req, previousDoc, operation }) => {
        console.log(`[Blogs Hook] afterChange triggered. Operation: ${operation}, Current Status: ${doc._status}, Previous Status: ${previousDoc?._status}`);
        
        // Ensure only one Featured Hero
        if (doc.featuredHero === true && previousDoc?.featuredHero !== true) {
          console.log(`[Blogs Hook] Enforcing single featuredHero`);
          const { payload } = req
          const otherHeroes = await payload.find({
            collection: 'blogs',
            where: {
              and: [
                { id: { not_equals: doc.id } },
                { featuredHero: { equals: true } },
              ],
            },
          })
          
          for (const other of otherHeroes.docs) {
            await payload.update({
              collection: 'blogs',
              id: other.id,
              data: { featuredHero: false },
              req,
            })
          }
        }
        // Revalidate cache on publish or update
        if (doc._status === 'published' || previousDoc?._status === 'published') {
          console.log(`[Blogs Hook] Conditions met for revalidation. Slug: ${doc.slug}`);
          await revalidateCollection(['blogs', `blog-${doc.slug}`]);
        } else {
          console.log(`[Blogs Hook] Conditions NOT met for revalidation. Skip.`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        console.log(`[Blogs Hook] afterDelete triggered. Status: ${doc._status}, Slug: ${doc.slug}`);
        if (doc._status === 'published') {
          await revalidateCollection(['blogs', `blog-${doc.slug}`]);
        }
      }
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BlocksFeature({
                    blocks: [
                      QuoteBlock,
                      ExpertInsightBlock,
                      CTABlock,
                      WatchLearnBlock,
                      KeyTakeawaysBlock,
                      QuickFactsBlock,
                      CalloutBlock,
                      FAQBlock,
                    ],
                  }),
                ],
              }),
              required: true,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields],
        },
      ],
    },
    // Sidebar fields (Editorial & Homepage Flags)
    {
      name: 'unsavedPreviewMessage',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/payload/UnsavedDraftMessage#UnsavedDraftMessage',
        },
      },
    },
    slugField('title'),
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
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
    {
      name: 'readTime',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Estimated read time (auto-calculated)',
        readOnly: true,
      },
    },
    {
      name: 'featuredHero',
      type: 'checkbox',
      label: 'Featured Hero',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredArticle',
      type: 'checkbox',
      label: 'Featured Article',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sticky',
      type: 'checkbox',
      label: 'Sticky Article (Pin to Top)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
