import { DocumentState, AnalysisConfig, AnalysisResult } from '../types'
import { extractImages } from '../../extractors/extractImages'

export function analyzeImageAltText(doc: DocumentState, config: AnalysisConfig): AnalysisResult {
  const { count, missingAlt } = extractImages(doc.lexicalState)
  const weight = config.weights.seo.imageAltText

  if (count === 0) {
    return {
      id: 'images-missing',
      title: 'Image Alt Text',
      status: 'warning',
      weight: 0,
      message: 'No images found in the content. Consider adding images to improve engagement.',
    }
  }

  if (missingAlt > 0) {
    return {
      id: 'images-alt-missing',
      title: 'Image Alt Text',
      status: 'fail',
      weight: 0,
      message: `${missingAlt} image(s) missing alt text. Alt text is crucial for accessibility and SEO.`,
    }
  }

  return {
    id: 'images-alt-pass',
    title: 'Image Alt Text',
    status: 'pass',
    weight: weight,
    message: 'All images in the content have alt text.',
  }
}
