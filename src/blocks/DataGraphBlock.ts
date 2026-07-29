import { Block } from 'payload'

export const DataGraphBlock: Block = {
  slug: 'dataGraph',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'chartType',
      type: 'select',
      options: [
        { label: 'Bar Chart', value: 'bar' },
        { label: 'Line Chart', value: 'line' },
        { label: 'Pie Chart', value: 'pie' },
      ],
      defaultValue: 'bar',
      required: true,
    },
    {
      name: 'xAxisLabel',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.chartType !== 'pie',
      },
    },
    {
      name: 'yAxisLabel',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.chartType !== 'pie',
      },
    },
    {
      name: 'dataPoints',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
