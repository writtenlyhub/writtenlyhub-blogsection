import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Blogs } from './collections/Blogs'
import { Tags } from './collections/Tags'
import { Subscribers } from './collections/Subscribers'
import { SiteSettings } from './globals/SiteSettings'
import { HomepageSettings } from './globals/HomepageSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  cors: [process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean) as string[],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean) as string[],
  collections: [
    Users,
    Media,
    Categories,
    Tags,
    Blogs,
    Subscribers,
  ],
  globals: [
    SiteSettings,
    HomepageSettings,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false, // Enforce explicit migrations
  }),
})
