export interface AnalysisResult {
  id: string
  title: string
  status: 'pass' | 'warning' | 'fail'
  weight: number
  message: string
  scoreImpact?: number
  isDismissed?: boolean // Still kept for UI type compatibility if needed, but not part of DocumentState
}

export interface AnalysisConfig {
  thresholds: {
    title: { min: number; max: number }
    metaDescription: { min: number; max: number }
    minWords: number
    sentenceLength: number
    paragraphLength: number
    headingDistance: number
    consecutiveListItems: number
    transitionWords: number
  }
  categoryWeights: {
    seo: number
    readability: number
  }
  weights: {
    seo: {
      title: number
      meta: number
      keywordTitle: number
      keywordFirstParagraph: number
      wordCount: number
      internalLinks: number
      imageAltText: number
      canonical: number
    }
    readability: {
      sentenceLength: number
      paragraphLength: number
      headingDistribution: number
      consecutiveHeadings: number
      emptyHeadings: number
      singleSentenceParagraphs: number
      excessiveBulletLists: number
      longQuotations: number
      brokenHierarchy: number
      transitionWords: number
      multipleH1: number
    }
  }
}

export interface DocumentState {
  title?: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  canonicalUrl?: string
  lexicalState?: any
  featuredImage?: any
}

export interface UnifiedScoreSummary {
  seoScore: number
  readabilityScore: number
  overallScore: number
  seoResults: AnalysisResult[]
  readabilityResults: AnalysisResult[]
  passed: number
  warnings: number
  issues: number
}
