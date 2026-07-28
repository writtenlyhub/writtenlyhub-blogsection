export function extractLinks(lexicalState: any): { internal: number; external: number } {
  let internal = 0
  let external = 0
  
  if (!lexicalState || !lexicalState.root) return { internal, external }

  function traverse(node: any) {
    if (node.type === 'link' || node.type === 'autolink') {
      const url = node.fields?.url || node.url || ''
      if (url.startsWith('http') && !url.includes('writtenlyhub')) {
        external++
      } else {
        internal++
      }
    }
    
    if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(lexicalState.root)
  return { internal, external }
}
