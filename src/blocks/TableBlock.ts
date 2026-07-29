import { Block } from 'payload'

export const TableBlock: Block = {
  slug: 'tableBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title or caption for the table',
      },
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Define up to 5 columns',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'col1',
          type: 'text',
        },
        {
          name: 'col2',
          type: 'text',
        },
        {
          name: 'col3',
          type: 'text',
        },
        {
          name: 'col4',
          type: 'text',
        },
        {
          name: 'col5',
          type: 'text',
        },
      ],
    },
  ],
}
