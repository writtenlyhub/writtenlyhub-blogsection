import { DocumentState, AnalysisConfig, AnalysisResult } from '../../analysis/types'
import { extractBlocks } from '../../extractors/extractBlocks'
import { transitionWords } from '../transitionWords/en'

export function analyzeLanguage(doc: DocumentState, config: AnalysisConfig): AnalysisResult[] {
  const blocks = extractBlocks(doc.lexicalState)
  const results: AnalysisResult[] = []

  let totalSentences = 0
  let sentencesWithTransitions = 0

  // Pre-compile a regular expression with word boundaries for all transition words.
  // We sort by length descending so longer phrases are matched first, though with \b it matters less.
  const escapedWords = transitionWords
    .sort((a, b) => b.length - a.length)
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  
  const transitionRegex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'i')

  for (const block of blocks) {
    if (block.type === 'paragraph' || block.type === 'list') {
      // Split into sentences roughly
      const sentences = block.text.split(/[.!?]+/).filter(s => s.trim().length > 0)
      totalSentences += sentences.length

      for (const sentence of sentences) {
        if (transitionRegex.test(sentence)) {
          sentencesWithTransitions++
        }
      }
    }
  }

  // 1. Transition Words
  if (totalSentences === 0) {
    results.push({
      id: 'readability-transitions',
      title: 'Transition Words',
      status: 'warning',
      weight: config.weights.readability.transitionWords,
      message: `Not enough text to analyze transition words.`
    })
    return results
  }

  const percentage = (sentencesWithTransitions / totalSentences) * 100
  const targetPercentage = config.thresholds.transitionWords * 100

  // Aim for at least targetPercentage of sentences containing transition words
  if (percentage >= targetPercentage) {
    results.push({
      id: 'readability-transitions',
      title: 'Transition Words',
      status: 'pass',
      weight: config.weights.readability.transitionWords,
      message: `Good use of transition words (${Math.round(percentage)}% of sentences).`
    })
  } else {
    results.push({
      id: 'readability-transitions',
      title: 'Transition Words',
      status: 'warning',
      weight: config.weights.readability.transitionWords,
      message: `Only ${Math.round(percentage)}% of sentences contain transition words. Aim for at least ${targetPercentage}% to improve flow.`
    })
  }

  return results
}
