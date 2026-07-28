import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'

export function analyzeTitle(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const title = doc.metaTitle || doc.title || ''
  const length = title.length
  const { min, max } = config.thresholds.title
  const weight = config.weights.seo.title

  if (length === 0) {
    return {
      id: 'title-missing',
      title: 'SEO Title',
      status: 'fail',
      weight: 0,
      message: 'No SEO Title or post title provided.',
    }
  }

  if (length < min) {
    return {
      id: 'title-too-short',
      title: 'SEO Title',
      status: 'warning',
      weight: weight * 0.5,
      message: `SEO Title is too short (${length} characters). Aim for ${min}-${max} characters.`,
    }
  }

  if (length > max) {
    return {
      id: 'title-too-long',
      title: 'SEO Title',
      status: 'warning',
      weight: weight * 0.5,
      message: `SEO Title is too long (${length} characters). It may be truncated in search results.`,
    }
  }

  return {
    id: 'title-optimal',
    title: 'SEO Title',
    status: 'pass',
    weight: weight,
    message: 'SEO Title length is optimal.',
  }
}
