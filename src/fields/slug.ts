import { Field } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const slugField = (fallbackField: string = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: `Auto-generated from ${fallbackField} if left blank.`,
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, value }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }
        
        const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField]
        if (typeof fallbackData === 'string') {
          return formatSlug(fallbackData)
        }
        
        return value
      },
    ],
  },
})
