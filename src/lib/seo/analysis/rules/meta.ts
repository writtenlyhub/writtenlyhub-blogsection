import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'

export function analyzeMeta(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const meta = doc.metaDescription || ''
  const length = meta.length
  const { min, max } = config.thresholds.metaDescription
  const weight = config.weights.seo.meta

  if (length === 0) {
    return {
      id: 'meta-missing',
      title: 'Meta Description',
      status: 'fail',
      weight: 0,
      message: 'No Meta Description provided.',
    }
  }

  if (length < min) {
    return {
      id: 'meta-too-short',
      title: 'Meta Description',
      status: 'warning',
      weight: weight * 0.5,
      message: `Meta Description is too short (${length} characters). Aim for ${min}-${max} characters.`,
    }
  }

  if (length > max) {
    return {
      id: 'meta-too-long',
      title: 'Meta Description',
      status: 'warning',
      weight: weight * 0.5,
      message: `Meta Description is too long (${length} characters). It may be truncated in search results.`,
    }
  }

  return {
    id: 'meta-optimal',
    title: 'Meta Description',
    status: 'pass',
    weight: weight,
    message: 'Meta Description length is optimal.',
  }
}
