import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'
import { extractPlainText } from '../../extractors/extractPlainText'

export function analyzeWordCount(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const text = extractPlainText(doc.lexicalState)
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const min = config.thresholds.minWords
  const weight = config.weights.seo.wordCount

  if (words === 0) {
    return {
      id: 'word-count-empty',
      title: 'Word Count',
      status: 'fail',
      weight: 0,
      message: 'Content is empty.',
    }
  }

  if (words < min) {
    return {
      id: 'word-count-low',
      title: 'Word Count',
      status: 'warning',
      weight: weight * (words / min), // Partial credit
      message: `Word count is low (${words} words). Recommended minimum is ${min} words.`,
    }
  }

  return {
    id: 'word-count-optimal',
    title: 'Word Count',
    status: 'pass',
    weight: weight,
    message: `Word count is optimal (${words} words).`,
  }
}
