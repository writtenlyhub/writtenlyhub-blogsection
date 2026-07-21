export function createTextNode(text: string, format: number = 0) {
  return {
    type: 'text',
    version: 1,
    text,
    format,
  };
}

export function createParagraph(text: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: [createTextNode(text)],
  };
}

export function createHeading(text: string, tag: 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    version: 1,
    tag,
    children: [createTextNode(text)],
  };
}

export function createList(items: string[], listType: 'bullet' | 'number' = 'bullet') {
  return {
    type: 'list',
    version: 1,
    listType,
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      children: [createTextNode(item)],
    })),
  };
}

export function createBlock(blockType: string, fields: any) {
  return {
    type: 'block',
    version: 2,
    fields: {
      blockType,
      ...fields,
    },
  };
}

export function generateRichText(nodes: any[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: nodes,
    },
  };
}
