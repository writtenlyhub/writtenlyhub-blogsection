export function extractPlainText(lexicalState: any): string {
  if (!lexicalState || !lexicalState.root) return ''

  let text = ''
  
  function traverse(node: any) {
    if (node.type === 'text') {
      text += node.text
    } else if (node.type === 'linebreak') {
      text += '\n'
    } else if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
      if (node.type === 'paragraph' || node.type === 'heading') {
        text += '\n\n'
      }
    }
  }

  traverse(lexicalState.root)
  return text.trim()
}
