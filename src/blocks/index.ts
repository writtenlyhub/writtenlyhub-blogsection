import { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Quote',
    },
  ],
}

export const ExpertInsightBlock: Block = {
  slug: 'expertInsight',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Expert Insight',
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
  ],
}

export const WatchLearnBlock: Block = {
  slug: 'watchLearn',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
  ],
}

export const KeyTakeawaysBlock: Block = {
  slug: 'keyTakeaways',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Key Takeaways',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const QuickFactsBlock: Block = {
  slug: 'quickFacts',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Quick Facts',
    },
    {
      name: 'facts',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'fact',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['info', 'warning', 'tip', 'pro-tip'],
      defaultValue: 'info',
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
