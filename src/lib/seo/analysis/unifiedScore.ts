import { DocumentState, AnalysisConfig, UnifiedScoreSummary, AnalysisResult } from './types'
import { calculateSeoScore } from './score'
import { analyzeStructure } from '../readability/rules/structure'
import { analyzeHeadings } from '../readability/rules/headings'
import { analyzeLanguage } from '../readability/rules/language'
import { extractPlainText } from '../extractors/extractPlainText'

export function calculateUnifiedScore(doc: DocumentState, config: AnalysisConfig): UnifiedScoreSummary {
  // 1. Calculate SEO Score using existing engine (which returns raw points based on weight)
  const seoSummary = calculateSeoScore(doc, config)

  // 2. Calculate Readability Score
  const readabilityResults: AnalysisResult[] = [
    ...analyzeStructure(doc, config),
    ...analyzeHeadings(doc, config),
    ...analyzeLanguage(doc, config)
  ]

  let earnedReadabilityWeight = 0
  let readPassed = 0
  let readWarnings = 0
  let readIssues = 0

  for (const res of readabilityResults) {
    earnedReadabilityWeight += res.weight
    if (res.status === 'pass') readPassed++
    if (res.status === 'warning') readWarnings++
    if (res.status === 'fail') readIssues++
  }

  const maxReadabilityWeight = Object.values(config.weights.readability).reduce((a, b) => a + b, 0)
  
  // Check if content is entirely empty
  const plainText = extractPlainText(doc.lexicalState)
  const isContentEmpty = plainText.trim().length === 0

  let readabilityScore = 0
  if (!isContentEmpty) {
    readabilityScore = maxReadabilityWeight > 0 ? Math.round((earnedReadabilityWeight / maxReadabilityWeight) * 100) : 100
  } else {
    // If content is empty, readability rules cannot be evaluated correctly and should contribute 0.
    // We can also override the results to fail.
    for (const res of readabilityResults) {
      res.status = 'fail'
      res.weight = 0
      res.message = 'Content is empty.'
    }
    readPassed = 0
    readWarnings = 0
    readIssues = readabilityResults.length
  }

  // 3. Aggregate Overall Score
  const overallScore = Math.round(
    (seoSummary.score * config.categoryWeights.seo) + 
    (readabilityScore * config.categoryWeights.readability)
  )

  const seoMaxWeight = Object.values(config.weights.seo).reduce((a, b) => a + b, 0)
  const readMaxWeight = Object.values(config.weights.readability).reduce((a, b) => a + b, 0)

  const getRuleMaxWeight = (id: string, category: 'seo' | 'readability'): number => {
    const map: Record<string, number> = {
      'seo-title': config.weights.seo.title,
      'seo-meta': config.weights.seo.meta,
      'seo-keyword-title': config.weights.seo.keywordTitle,
      'seo-keyword-content': config.weights.seo.keywordFirstParagraph,
      'seo-wordcount': config.weights.seo.wordCount,
      'seo-links': config.weights.seo.internalLinks,
      'seo-images': config.weights.seo.imageAltText,
      'seo-canonical': config.weights.seo.canonical,
      'readability-sentences': config.weights.readability.sentenceLength,
      'readability-paragraphs': config.weights.readability.paragraphLength,
      'readability-single-sentence': config.weights.readability.singleSentenceParagraphs,
      'readability-lists': config.weights.readability.excessiveBulletLists,
      'readability-quotes': config.weights.readability.longQuotations,
      'readability-heading-dist': config.weights.readability.headingDistribution,
      'readability-consecutive-headings': config.weights.readability.consecutiveHeadings,
      'readability-empty-headings': config.weights.readability.emptyHeadings,
      'readability-hierarchy': config.weights.readability.brokenHierarchy,
      'readability-transitions': config.weights.readability.transitionWords,
      'readability-multiple-h1': config.weights.readability.multipleH1,
    }
    return map[id] || 0
  }

  const computeImpact = (res: AnalysisResult, category: 'seo' | 'readability') => {
    const maxPossible = getRuleMaxWeight(res.id, category)
    const categoryMax = category === 'seo' ? seoMaxWeight : readMaxWeight
    const categoryCategoryWeight = category === 'seo' ? config.categoryWeights.seo : config.categoryWeights.readability
    
    const maxRuleTotalPoints = (maxPossible / categoryMax) * categoryCategoryWeight * 100
    const earnedRuleTotalPoints = (res.weight / categoryMax) * categoryCategoryWeight * 100

    if (res.status === 'pass') {
      return Math.round(earnedRuleTotalPoints)
    } else {
      // Points missed
      return -Math.round(maxRuleTotalPoints - earnedRuleTotalPoints)
    }
  }

  const enhancedSeoResults = seoSummary.results.map(res => ({
    ...res,
    scoreImpact: computeImpact(res, 'seo')
  }))

  const enhancedReadabilityResults = readabilityResults.map(res => ({
    ...res,
    scoreImpact: computeImpact(res, 'readability')
  }))

  return {
    seoScore: seoSummary.score,
    readabilityScore,
    overallScore,
    seoResults: enhancedSeoResults,
    readabilityResults: enhancedReadabilityResults,
    passed: seoSummary.passed + readPassed,
    warnings: seoSummary.warnings + readWarnings,
    issues: seoSummary.issues + readIssues
  }
}
