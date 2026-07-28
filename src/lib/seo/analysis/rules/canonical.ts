import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'

export function analyzeCanonical(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const canonical = doc.canonicalUrl || ''
  const weight = config.weights.seo.canonical

  if (canonical && !canonical.startsWith('http')) {
    return {
      id: 'canonical-invalid',
      title: 'Canonical URL',
      status: 'fail',
      weight: 0,
      message: 'Custom Canonical URL must be a valid absolute URL (starting with http:// or https://).',
    }
  }

  return {
    id: 'canonical-pass',
    title: 'Canonical URL',
    status: 'pass',
    weight: weight,
    message: canonical 
      ? 'Custom Canonical URL provided.' 
      : 'Default Canonical URL will be auto-generated.',
  }
}
