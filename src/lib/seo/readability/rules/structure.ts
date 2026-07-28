import { DocumentState, AnalysisConfig, AnalysisResult } from '../../analysis/types'
import { extractBlocks } from '../../extractors/extractBlocks'

export function analyzeStructure(doc: DocumentState, config: AnalysisConfig): AnalysisResult[] {
  const blocks = extractBlocks(doc.lexicalState)
  const results: AnalysisResult[] = []

  let longParagraphs = 0
  let longSentences = 0
  let singleSentenceParagraphs = 0
  let excessiveLists = 0
  let longQuotes = 0

  const pLengthLimit = config.thresholds.paragraphLength || 150
  const sLengthLimit = config.thresholds.sentenceLength || 20
  const maxListItems = config.thresholds.consecutiveListItems || 10

  for (const block of blocks) {
    if (block.type === 'paragraph') {
      if (block.wordCount > pLengthLimit) {
        longParagraphs++
      }
      if (block.sentences === 1 && block.wordCount > 5) { // Ensure it's an actual sentence
        singleSentenceParagraphs++
      }
      
      // Rough heuristic for long sentences inside paragraphs
      const avgWordsPerSentence = block.sentences > 0 ? block.wordCount / block.sentences : 0
      if (avgWordsPerSentence > sLengthLimit) {
        // If the average is high, we assume at least one sentence is too long
        longSentences += 1 
      }
    } else if (block.type === 'list' && block.listItems) {
      if (block.listItems > maxListItems) {
        excessiveLists++
      }
    } else if (block.type === 'quote') {
      if (block.wordCount > 100) { // arbitrary threshold for long quotes
        longQuotes++
      }
    }
  }

  // 1. Paragraph Length Rule
  if (longParagraphs === 0) {
    results.push({
      id: 'readability-paragraphs',
      title: 'Paragraph Length',
      status: 'pass',
      weight: config.weights.readability.paragraphLength,
      message: `All paragraphs are under ${pLengthLimit} words.`
    })
  } else {
    results.push({
      id: 'readability-paragraphs',
      title: 'Paragraph Length',
      status: 'warning',
      weight: config.weights.readability.paragraphLength,
      message: `${longParagraphs} paragraph(s) exceed ${pLengthLimit} words. Consider breaking them up.`
    })
  }

  // 2. Sentence Length Rule
  if (longSentences === 0) {
    results.push({
      id: 'readability-sentences',
      title: 'Sentence Length',
      status: 'pass',
      weight: config.weights.readability.sentenceLength,
      message: `Sentence lengths appear optimal.`
    })
  } else {
    results.push({
      id: 'readability-sentences',
      title: 'Sentence Length',
      status: 'warning',
      weight: config.weights.readability.sentenceLength,
      message: `Several sentences appear to be very long (averaging >${sLengthLimit} words). Try keeping sentences concise.`
    })
  }

  // 3. Single-Sentence Paragraphs
  // Excessive repetition threshold: say, more than 3 single-sentence paragraphs
  if (singleSentenceParagraphs <= 3) {
    results.push({
      id: 'readability-single-sentence',
      title: 'Paragraph Variation',
      status: 'pass',
      weight: config.weights.readability.singleSentenceParagraphs,
      message: `Good variation in paragraph lengths.`
    })
  } else {
    results.push({
      id: 'readability-single-sentence',
      title: 'Paragraph Variation',
      status: 'warning',
      weight: config.weights.readability.singleSentenceParagraphs,
      message: `Found ${singleSentenceParagraphs} single-sentence paragraphs. Too many can make text feel fragmented.`
    })
  }

  // 4. Excessive Bullet Lists
  if (excessiveLists === 0) {
    results.push({
      id: 'readability-lists',
      title: 'List Length',
      status: 'pass',
      weight: config.weights.readability.excessiveBulletLists,
      message: `List lengths are optimal.`
    })
  } else {
    results.push({
      id: 'readability-lists',
      title: 'List Length',
      status: 'warning',
      weight: config.weights.readability.excessiveBulletLists,
      message: `Found a list with more than ${maxListItems} items. Consider breaking long lists into sections.`
    })
  }

  // 5. Long Quotations
  if (longQuotes === 0) {
    results.push({
      id: 'readability-quotes',
      title: 'Quotation Length',
      status: 'pass',
      weight: config.weights.readability.longQuotations,
      message: `Quotations are reasonably sized.`
    })
  } else {
    results.push({
      id: 'readability-quotes',
      title: 'Quotation Length',
      status: 'warning',
      weight: config.weights.readability.longQuotations,
      message: `Found ${longQuotes} very long blockquote(s). Consider summarizing instead of quoting large chunks.`
    })
  }

  return results
}
