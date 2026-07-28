import { DocumentState, AnalysisConfig, AnalysisResult } from '../../analysis/types'
import { extractBlocks } from '../../extractors/extractBlocks'

export function analyzeHeadings(doc: DocumentState, config: AnalysisConfig): AnalysisResult[] {
  const blocks = extractBlocks(doc.lexicalState)
  const results: AnalysisResult[] = []

  let wordsSinceLastHeading = 0
  let maxWordsWithoutHeading = 0
  let consecutiveHeadings = 0
  let emptyHeadings = 0
  let brokenHierarchy = 0

  let previousHeadingLevel = 0 // 0 means no previous heading

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    if (block.type === 'heading') {
      // 1. Heading Distribution: Record max words between headings
      if (wordsSinceLastHeading > maxWordsWithoutHeading) {
        maxWordsWithoutHeading = wordsSinceLastHeading
      }
      wordsSinceLastHeading = 0

      // 2. Empty Headings
      if (block.text.trim() === '') {
        emptyHeadings++
      }

      // 3. Consecutive Headings
      if (i > 0 && blocks[i - 1].type === 'heading') {
        consecutiveHeadings++
      }

      // 4. Broken Hierarchy
      const currentLevel = parseInt(block.tag?.replace('h', '') || '2', 10)
      if (previousHeadingLevel > 0 && currentLevel > previousHeadingLevel + 1) {
        // e.g., H1 -> H3 (1 -> 3 is difference of 2)
        brokenHierarchy++
      }
      previousHeadingLevel = currentLevel
    } else {
      wordsSinceLastHeading += block.wordCount
    }
  }

  // Check the final segment after the last heading
  if (wordsSinceLastHeading > maxWordsWithoutHeading) {
    maxWordsWithoutHeading = wordsSinceLastHeading
  }

  const distanceLimit = config.thresholds.headingDistance || 300

  // Generate Results

  // 1. Heading Distribution
  if (maxWordsWithoutHeading <= distanceLimit) {
    results.push({
      id: 'readability-heading-dist',
      title: 'Heading Distribution',
      status: 'pass',
      weight: config.weights.readability.headingDistribution,
      message: `Content is well-structured with headings (max ${maxWordsWithoutHeading} words between headings).`
    })
  } else {
    results.push({
      id: 'readability-heading-dist',
      title: 'Heading Distribution',
      status: 'warning',
      weight: config.weights.readability.headingDistribution,
      message: `A section contains ${maxWordsWithoutHeading} words without a subheading. Keep it under ${distanceLimit}.`
    })
  }

  // 2. Consecutive Headings
  if (consecutiveHeadings === 0) {
    results.push({
      id: 'readability-consecutive-headings',
      title: 'Consecutive Headings',
      status: 'pass',
      weight: config.weights.readability.consecutiveHeadings,
      message: `No consecutive headings found without text in between.`
    })
  } else {
    results.push({
      id: 'readability-consecutive-headings',
      title: 'Consecutive Headings',
      status: 'warning',
      weight: config.weights.readability.consecutiveHeadings,
      message: `Found ${consecutiveHeadings} instance(s) of consecutive headings. Add introductory text between them.`
    })
  }

  // 3. Empty Headings
  if (emptyHeadings === 0) {
    results.push({
      id: 'readability-empty-headings',
      title: 'Empty Headings',
      status: 'pass',
      weight: config.weights.readability.emptyHeadings,
      message: `All headings contain text.`
    })
  } else {
    results.push({
      id: 'readability-empty-headings',
      title: 'Empty Headings',
      status: 'fail', // Empty headings are definitively bad
      weight: config.weights.readability.emptyHeadings,
      message: `Found ${emptyHeadings} empty heading(s). Remove them or add text.`
    })
  }

  // 4. Broken Hierarchy
  if (brokenHierarchy === 0) {
    results.push({
      id: 'readability-hierarchy',
      title: 'Heading Hierarchy',
      status: 'pass',
      weight: config.weights.readability.brokenHierarchy,
      message: `Heading levels flow logically (e.g., H2 -> H3).`
    })
  } else {
    results.push({
      id: 'readability-hierarchy',
      title: 'Heading Hierarchy',
      status: 'warning',
      weight: config.weights.readability.brokenHierarchy,
      message: `Found ${brokenHierarchy} instance(s) of skipped heading levels (e.g., H2 directly to H4).`
    })
  }

  return results
}
