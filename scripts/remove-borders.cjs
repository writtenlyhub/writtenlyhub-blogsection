const fs = require('fs');
const path = require('path');

const filePath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We want to remove border-b and border-t from section tags, or just generally anywhere the user might have meant the horizontal lines separating sections.
// E.g. className="relative py-16 lg:py-20 bg-[#f8f9ff] border-b border-slate-200"
content = content.replace(/border-b border-slate-200/g, '');
content = content.replace(/border-t border-slate-200/g, '');

fs.writeFileSync(filePath, content);
console.log('Removed borders');
