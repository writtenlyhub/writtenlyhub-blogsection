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
  TableBlock,
  DataGraphBlock,
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
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status'],
    preview: (doc) => {
      if (doc?.slug) {
        return `/api/draft?slug=${doc.slug}`;
      }
      return null;
    },
  },
  access: {
    read: ({ req }) => {
      // Authenticated users can read everything (including drafts)
      if (req.user) return true;

      // Unauthenticated users can only read published posts
      return {
        _status: {
          equals: 'published',
        },
      };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        // Publish validation checks
        if (data._status === 'published') {
          // 1. Missing Slug
          if (!data.slug) {
            throw new Error('Validation Error: A slug is required to publish this post.');
          }

          // 2. Duplicate Slug
          if (data.slug) {
            const existing = await req.payload.find({
              collection: 'blogs',
              where: {
                slug: { equals: data.slug },
                id: { not_equals: originalDoc?.id },
              },
              limit: 1,
            });
            if (existing.docs.length > 0) {
              throw new Error(`Validation Error: The slug "${data.slug}" is already in use by another post.`);
            }
          }

          // 3. Check invalid canonical URL
          if (data.seo?.canonicalUrl) {
            try {
              new URL(data.seo.canonicalUrl);
            } catch (e) {
              throw new Error('Validation Error: The provided Canonical URL is not a valid URL.');
            }
          }

          // 4. JSON-LD Validation
          const advancedOverride = data.seo?.jsonLd?.advancedOverride;
          if (advancedOverride) {
            try {
              const parsed = JSON.parse(advancedOverride);
              if (typeof parsed !== 'object' || parsed === null) {
                throw new Error('Must be a valid JSON object or array of objects.');
              }
              const items = Array.isArray(parsed) ? parsed : [parsed];
              for (const item of items) {
                if (!item['@context'] || !item['@type']) {
                  throw new Error('Each JSON-LD object must contain "@context" and "@type".');
                }
              }
            } catch (e: any) {
              throw new Error(`Validation Error: Invalid JSON-LD in Advanced Override. ${e.message}`);
            }
          }
        }

        // Redirect Deduplication & Flattening
        const oldSlug = originalDoc?.slug;
        if (oldSlug && data.slug && oldSlug !== data.slug) {
          if (!data.previousSlugs) {
            data.previousSlugs = originalDoc?.previousSlugs || [];
          }
          const prevSlugsSet = new Set(data.previousSlugs.map((s: any) => s.slug));
          if (!prevSlugsSet.has(oldSlug)) {
            data.previousSlugs.push({ slug: oldSlug });
          }
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

        // 5. Populate searchDocument for unified full-text search
        try {
          const title = data.title || '';
          const excerpt = data.excerpt || '';
          
          let authorName = '';
          if (data.author && req?.payload) {
             const authorDoc = typeof data.author === 'object' && data.author !== null
                ? data.author
                : await req.payload.findByID({ collection: 'users', id: data.author });
             authorName = authorDoc?.name || '';
          }
          
          let categoryName = '';
          if (data.category && req?.payload) {
             const catDoc = typeof data.category === 'object' && data.category !== null
                ? data.category
                : await req.payload.findByID({ collection: 'categories', id: data.category });
             categoryName = catDoc?.title || '';
          }

          let tagsString = '';
          if (data.tags && Array.isArray(data.tags)) {
            tagsString = data.tags.map((t: any) => t.tag || '').join(' ');
          }

          let plainText = '';
          if (data.content && data.content.root) {
            plainText = extractText(data.content.root);
          }

          const rawSearchString = `${title} ${excerpt} ${authorName} ${categoryName} ${tagsString} ${plainText}`;
          
          // Normalize: lowercase, remove extra spaces, trim, remove diacritics
          data.searchDocument = rawSearchString
             .toLowerCase()
             .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
             .replace(/\s+/g, ' ')
             .trim();
             
        } catch (e) {
           console.error('[Blogs Hook] Error generating searchDocument', e);
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
                      TableBlock,
                      DataGraphBlock,
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
    {
      name: 'seoValidationWarnings',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/payload/SeoValidationWarnings#SeoValidationWarnings',
        },
      },
    },
    {
      name: 'previousSlugs',
      type: 'array',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      fields: [
        {
          name: 'slug',
          type: 'text',
        },
      ],
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
      index: true,
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
    {
      name: 'searchDocument',
      type: 'text',
      admin: {
        hidden: true,
      },
      index: false,
    },
  ],
}
