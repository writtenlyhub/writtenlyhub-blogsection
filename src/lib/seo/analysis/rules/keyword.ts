import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'
import { extractPlainText } from '../../extractors/extractPlainText'

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

  const text = extractPlainText(doc.lexicalState).toLowerCase()
  
  if (!text) {
    return {
      id: 'keyword-content-empty',
      title: 'Keyword in Content',
      status: 'fail',
      weight: 0,
      message: 'Post content is empty.',
    }
  }

  // Very simplistic check: does it appear in the first 300 characters (approx first paragraph)?
  const firstParagraph = text.substring(0, 300)
  
  if (firstParagraph.includes(keyword)) {
    return {
      id: 'keyword-content-pass',
      title: 'Keyword in Content',
      status: 'pass',
      weight: weight,
      message: 'Focus keyword appears in the beginning of the content.',
    }
  }
  
  if (text.includes(keyword)) {
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
