export interface DocumentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'unknown'
  tag?: string // 'h1', 'h2', etc. for headings
  text: string
  wordCount: number
  sentences: number
  listItems?: number // for lists
}

export function extractBlocks(lexicalState: any): DocumentBlock[] {
  if (!lexicalState || !lexicalState.root || !lexicalState.root.children) return []

  const blocks: DocumentBlock[] = []

  const getText = (node: any): string => {
    if (node.type === 'text') return node.text || ''
    if (node.type === 'linebreak') return '\n'
    if (node.children) return node.children.map(getText).join('')
    return ''
  }

  const countWords = (txt: string) => txt.split(/\s+/).filter(w => w.length > 0).length
  const countSentences = (txt: string) => txt.split(/[.!?]+/).filter(s => s.trim().length > 0).length

  for (const node of lexicalState.root.children) {
    const text = getText(node).trim()
    const wordCount = countWords(text)
    const sentences = countSentences(text)

    if (node.type === 'heading') {
      blocks.push({
        type: 'heading',
        tag: node.tag, // usually 'h1', 'h2', 'h3'
        text,
        wordCount,
        sentences
      })
    } else if (node.type === 'paragraph') {
      if (wordCount > 0) {
        blocks.push({
          type: 'paragraph',
          text,
          wordCount,
          sentences
        })
      }
    } else if (node.type === 'list') {
      let listItems = 0
      if (node.children) {
        listItems = node.children.filter((c: any) => c.type === 'listitem').length
      }
      if (wordCount > 0 || listItems > 0) {
        blocks.push({
          type: 'list',
          text,
          wordCount,
          sentences,
          listItems
        })
      }
    } else if (node.type === 'quote') {
      if (wordCount > 0) {
        blocks.push({
          type: 'quote',
          text,
          wordCount,
          sentences
        })
      }
    } else {
      // Catch-all for other block types
      if (wordCount > 0) {
        blocks.push({
          type: 'unknown',
          text,
          wordCount,
          sentences
        })
      }
    }
  }

  return blocks
}
