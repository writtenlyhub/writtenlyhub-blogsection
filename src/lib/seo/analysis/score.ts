import { DocumentState, AnalysisConfig, AnalysisResult } from './types'
import { analyzeTitle } from './rules/title'
import { analyzeMeta } from './rules/meta'
import { analyzeKeywordTitle, analyzeKeywordContent } from './rules/keyword'
import { analyzeWordCount } from './rules/content'
import { analyzeInternalLinks } from './rules/links'
import { analyzeImageAltText } from './rules/images'
import { analyzeCanonical } from './rules/canonical'

export interface SeoScoreSummary {
  score: number
  totalWeight: number
  passed: number
  warnings: number
  issues: number
  results: AnalysisResult[]
}

export function calculateSeoScore(doc: DocumentState, config: AnalysisConfig): SeoScoreSummary {
  let results: AnalysisResult[] = [
    analyzeTitle(doc, config),
    analyzeMeta(doc, config),
    analyzeKeywordTitle(doc, config),
    analyzeKeywordContent(doc, config),
    analyzeWordCount(doc, config),
    analyzeInternalLinks(doc, config),
    analyzeImageAltText(doc, config),
    analyzeCanonical(doc, config),
  ]

  // Filter out dismissed warnings removed to keep score immutable

  let earnedWeight = 0
  let passed = 0
  let warnings = 0
  let issues = 0

  for (const res of results) {
    earnedWeight += res.weight

    if (res.status === 'pass') passed++
    if (res.status === 'warning') warnings++
    if (res.status === 'fail') issues++
  }

  const maxPossibleWeight = Object.values(config.weights.seo).reduce((a, b) => a + b, 0)
  
  const score = Math.round((earnedWeight / maxPossibleWeight) * 100)

  return {
    score: Math.min(100, Math.max(0, score)),
    totalWeight: maxPossibleWeight,
    passed,
    warnings,
    issues,
    results,
  }
}
