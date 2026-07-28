import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })
  
  console.log('Payload initialized. Finding an author to assign...')
  const users = await payload.find({ collection: 'users', limit: 1 })
  const authorId = users.docs[0]?.id

  if (!authorId) {
    console.log('No author found. Skipping database persistence test.')
    process.exit(0)
  }

  const categories = await payload.find({ collection: 'categories', limit: 1 })
  let categoryId = categories.docs[0]?.id
  if (!categoryId) {
    const cat = await payload.create({ collection: 'categories', data: { title: 'Test' } })
    categoryId = cat.id
  }

  const media = await payload.find({ collection: 'media', limit: 1 })
  let mediaId = media.docs[0]?.id
  if (!mediaId) {
    console.log('No media found, creating a dummy one...')
    const dummyMedia = await payload.create({ 
      collection: 'media', 
      data: { alt: 'Dummy' }, 
      filePath: './src/app/favicon.ico' 
    })
    mediaId = dummyMedia.id
  }

  console.log('Creating a test blog post with a focusKeyword...')
  const doc = await payload.create({
    collection: 'blogs',
    data: {
      title: 'Testing SEO Persistence',
      excerpt: 'Short excerpt',
      author: authorId,
      category: categoryId,
      featuredImage: mediaId,
      _status: 'draft',
      seo: {
        focusKeyword: 'Persistence Test'
      },
      content: {
        root: {
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'Some text' }] }
          ]
        }
      }
    } as any // Bypassing TS strictness for featuredImage if it fails
  }).catch(err => {
    console.log('Failed to create doc, maybe missing featuredImage?', err.message)
    return null
  })

  if (doc) {
    console.log('Document created with ID:', doc.id)
    console.log('Retrieving document...')
    const fetchedDoc = await payload.findByID({ collection: 'blogs', id: doc.id })
    console.log('Fetched SEO object:', fetchedDoc.seo)
    if (fetchedDoc.seo?.focusKeyword === 'Persistence Test') {
      console.log('✅ focusKeyword successfully persisted in the database!')
    } else {
      console.error('❌ focusKeyword failed to persist!')
    }

    // Cleanup
    await payload.delete({ collection: 'blogs', id: doc.id })
    console.log('Test post deleted.')
  }
  process.exit(0)
}

run()
