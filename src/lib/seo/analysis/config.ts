import { AnalysisConfig } from './types'

export const ANALYSIS_CONFIG: AnalysisConfig = {
  thresholds: {
    title: { min: 50, max: 60 },
    metaDescription: { min: 120, max: 160 },
    minWords: 300,
    sentenceLength: 20,
    paragraphLength: 150,
    headingDistance: 300,
    consecutiveListItems: 10,
    transitionWords: 0.15
  },
  categoryWeights: {
    seo: 0.75,
    readability: 0.25
  },
  weights: {
    seo: {
      title: 20,
      meta: 20,
      keywordTitle: 20,
      keywordFirstParagraph: 15,
      wordCount: 10,
      internalLinks: 5,
      imageAltText: 5,
      canonical: 5
    },
    readability: {
      sentenceLength: 15,
      paragraphLength: 15,
      headingDistribution: 15,
      consecutiveHeadings: 10,
      emptyHeadings: 5,
      singleSentenceParagraphs: 10,
      excessiveBulletLists: 10,
      longQuotations: 5,
      brokenHierarchy: 10,
      transitionWords: 5,
      multipleH1: 10
    }
  }
}
