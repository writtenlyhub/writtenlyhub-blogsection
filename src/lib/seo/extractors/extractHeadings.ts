export function extractHeadings(lexicalState: any): string[] {
  if (!lexicalState || !lexicalState.root) return []

  const headings: string[] = []

  function traverse(node: any) {
    if (node.type === 'heading') {
      let text = ''
      const collectText = (n: any) => {
        if (n.type === 'text') text += n.text
        if (n.children) n.children.forEach(collectText)
      }
      collectText(node)
      if (text) headings.push(text.trim())
    }
    if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(lexicalState.root)
  return headings
}
