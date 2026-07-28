import test from 'node:test'
import assert from 'node:assert'
import { calculateSeoScore } from './src/lib/seo/analysis/score.js'
import { SEO_CONFIG } from './src/lib/seo/analysis/config.js'

// Simple mock lexical tree for testing extraction
const mockPoorLexical = {
  root: {
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'This is a very short and poor article.' }]
      }
    ]
  }
}

const mockGoodLexical = {
  root: {
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Welcome to an optimized article about Payload SEO' }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'When writing about Payload SEO, it is important to include the focus keyword early on. We will write at least 300 words to ensure we pass the content length checks. ' + 'word '.repeat(300) }]
      },
      {
        type: 'link',
        url: 'https://www.writtenlyhub.com/about',
        children: [{ type: 'text', text: 'About WrittenlyHub' }]
      },
      {
        type: 'upload',
        relationTo: 'media',
        fields: { alt: 'An optimized image' }
      }
    ]
  }
}

test('SEO Analysis Engine - Poor Article', (t) => {
  const doc = {
    title: 'Poor',
    metaDescription: '', // Missing
    focusKeyword: '', // Missing
    canonicalUrl: '',
    lexicalState: mockPoorLexical
  }
  
  const result = calculateSeoScore(doc, SEO_CONFIG)
  
  // Title is 4 chars (too short) -> Warning (10 pts)
  // Meta missing -> Fail (0 pts)
  // Keyword missing -> Fail (0 pts)
  // Word count low (8 words) -> Warning (partial pts, near 0)
  // Links missing -> Fail (0 pts)
  // Images missing -> Warn (0 pts)
  
  console.log('Poor Article Score:', result.score)
  assert.ok(result.score < 40, 'Score should be less than 40')
  assert.ok(result.issues >= 3, 'Should have multiple issues')
})

test('SEO Analysis Engine - Optimized Article', (t) => {
  const doc = {
    title: 'How to Master Payload SEO: A Comprehensive Guide for 2026', // 58 chars (optimal 50-60)
    metaDescription: 'Discover the ultimate guide to mastering Payload SEO. Learn how to configure rules, lexical extractors, and build a powerful custom analysis engine.', // 150 chars (optimal 120-160)
    focusKeyword: 'Payload SEO',
    canonicalUrl: 'https://www.writtenlyhub.com/blog/payload-seo',
    lexicalState: mockGoodLexical
  }

  const result = calculateSeoScore(doc, SEO_CONFIG)
  
  console.log('Optimized Article Score:', result.score)
  console.log('Issues:', result.issues)
  console.log('Warnings:', result.warnings)
  
  assert.ok(result.score > 90, 'Score should be > 90')
  assert.strictEqual(result.issues, 0, 'Should have zero issues')
})
