import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'
import { extractLinks } from '../../extractors/extractLinks'

export function analyzeInternalLinks(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const { internal } = extractLinks(doc.lexicalState)
  const weight = config.weights.seo.internalLinks

  if (internal === 0) {
    return {
      id: 'links-internal-missing',
      title: 'Internal Links',
      status: 'fail',
      weight: 0,
      message: 'No internal links found in the content.',
    }
  }

  return {
    id: 'links-internal-pass',
    title: 'Internal Links',
    status: 'pass',
    weight: weight,
    message: `Found ${internal} internal link(s).`,
  }
}
