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
    format: '',
    indent: 0,
    direction: null,
    children: [createTextNode(text)],
  };
}

export function createHeading(text: string, tag: 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    version: 1,
    tag,
    format: '',
    indent: 0,
    direction: null,
    children: [createTextNode(text)],
  };
}

export function createList(items: string[], listType: 'bullet' | 'number' = 'bullet') {
  return {
    type: 'list',
    version: 1,
    listType,
    format: '',
    indent: 0,
    direction: null,
    start: 1,
    children: items.map((item, index) => ({
      type: 'listitem',
      version: 1,
      format: '',
      indent: 0,
      direction: null,
      value: index + 1,
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

export function generateRichText(children: any[] = []) {
  return {
    root: {
      type: 'root',
      direction: null,
      format: '' as const,
      indent: 0,
      version: 1,
      children,
    },
  };
}
