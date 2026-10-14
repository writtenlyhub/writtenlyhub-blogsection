const fs = require('fs');
const path = require('path');

const sourcePath = 'v:\\All Projects\\writtenlyhub\\ui design\\compare section\\code.html';
const destPath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';

let html = fs.readFileSync(sourcePath, 'utf8');

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) {
  console.error("Could not find body tag");
  process.exit(1);
}
let bodyContent = bodyMatch[1];

// Remove header and footer as Next.js layout handles them
bodyContent = bodyContent.replace(/<header[\s\S]*?<\/header>/g, '');
bodyContent = bodyContent.replace(/<footer[\s\S]*?<\/footer>/g, '');
// Remove script tags
bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '');

// JSX conversions
bodyContent = bodyContent.replace(/class=/g, 'className=');
bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');

// Self close tags
bodyContent = bodyContent.replace(/<img([^>]*[^/])>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<input([^>]*[^/])>/g, '<input$1 />');
bodyContent = bodyContent.replace(/<br>/g, '<br />');

// Remove HTML comments
bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, '');

// Convert brand-orange to writtenly-orange etc based on the CSS
bodyContent = bodyContent.replace(/brand-orange/g, 'writtenly-orange');
bodyContent = bodyContent.replace(/brand-navy/g, 'writtenly-navy');

const jsxTemplate = `import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WrittenlyHub vs Competitors | Compare',
  description: 'See how WrittenlyHub compares to other content platforms.',
};

export default function ComparePage() {
  return (
    <main className="w-full relative pb-section-gap">
      ${bodyContent}
    </main>
  );
}
`;

fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.writeFileSync(destPath, jsxTemplate);
console.log('Successfully created page.tsx');
