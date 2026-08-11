import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'
import { extractPlainText } from '../../extractors/extractPlainText'
import { extractBlocks } from '../../extractors/extractBlocks'

export function analyzeKeywordTitle(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const keyword = (doc.focusKeyword || '').toLowerCase().trim()
  const title = (doc.metaTitle || doc.title || '').toLowerCase()
  const weight = config.weights.seo.keywordTitle

  if (!keyword) {
    return {
      id: 'keyword-title-missing-keyword',
      title: 'Keyword in Title',
      status: 'fail',
      weight: 0,
      message: 'No focus keyword set.',
    }
  }

  if (title.includes(keyword)) {
    return {
      id: 'keyword-title-pass',
      title: 'Keyword in Title',
      status: 'pass',
      weight: weight,
      message: 'Focus keyword appears in the SEO title.',
    }
  }

  return {
    id: 'keyword-title-fail',
    title: 'Keyword in Title',
    status: 'fail',
    weight: 0,
    message: 'Focus keyword does not appear in the SEO title.',
  }
}

export function analyzeKeywordContent(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const keyword = (doc.focusKeyword || '').toLowerCase().trim()
  const weight = config.weights.seo.keywordFirstParagraph

  if (!keyword) {
    return {
      id: 'keyword-content-missing-keyword',
      title: 'Keyword in Content',
      status: 'fail',
      weight: 0,
      message: 'No focus keyword set.',
    }
  }

  const blocks = extractBlocks(doc.lexicalState)
  let firstMeaningfulText = ''
  let fullText = ''

  for (const block of blocks) {
    if (block.type === 'paragraph' && block.text.trim().length > 10) {
      if (!firstMeaningfulText) {
        firstMeaningfulText = block.text.toLowerCase()
      }
    }
    fullText += block.text.toLowerCase() + ' '
  }

  if (!fullText.trim()) {
    return {
      id: 'keyword-content-empty',
      title: 'Keyword in Content',
      status: 'fail',
      weight: 0,
      message: 'Post content is empty.',
    }
  }

  if (firstMeaningfulText.includes(keyword)) {
    return {
      id: 'keyword-content-pass',
      title: 'Keyword in Content',
      status: 'pass',
      weight: weight,
      message: 'Focus keyword appears in the beginning of the content.',
    }
  }
  
  if (fullText.includes(keyword)) {
    return {
      id: 'keyword-content-warn',
      title: 'Keyword in Content',
      status: 'warning',
      weight: weight * 0.5,
      message: 'Focus keyword appears in the content, but not near the beginning.',
    }
  }

  return {
    id: 'keyword-content-fail',
    title: 'Keyword in Content',
    status: 'fail',
    weight: 0,
    message: 'Focus keyword does not appear anywhere in the content.',
  }
}
