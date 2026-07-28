export function extractImages(lexicalState: any): { count: number; missingAlt: number } {
  let count = 0
  let missingAlt = 0
  
  if (!lexicalState || !lexicalState.root) return { count, missingAlt }

  function traverse(node: any) {
    if (node.type === 'upload' && node.relationTo === 'media') {
      count++
      // Payload Lexical upload node usually stores alt text either in fields.alt or within the related document
      // We'll check fields if they exist inline
      const alt = node.fields?.alt || ''
      if (!alt || alt.trim() === '') {
        missingAlt++
      }
    }
    
    if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(lexicalState.root)
  return { count, missingAlt }
}
