const fs = require('fs');
const path = require('path');

const filePath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Colors mapping
content = content.replace(/bg-\[\#f8f9ff\]/g, 'bg-background');
content = content.replace(/border-slate-200/g, 'border-outline-variant');
content = content.replace(/border-slate-300/g, 'border-outline');
content = content.replace(/text-slate-900/g, 'text-on-surface');
content = content.replace(/text-slate-800/g, 'text-on-surface');
content = content.replace(/text-slate-700/g, 'text-on-surface-variant');
content = content.replace(/text-slate-600/g, 'text-on-surface-variant');
content = content.replace(/text-slate-500/g, 'text-outline');
content = content.replace(/text-slate-400/g, 'text-outline-variant');
content = content.replace(/text-slate-300/g, 'text-surface-dim');
content = content.replace(/bg-slate-50/g, 'bg-surface-container-low');
content = content.replace(/bg-slate-100/g, 'bg-surface-container');
content = content.replace(/bg-slate-200/g, 'bg-surface-variant');

// Typography mapping
content = content.replace(/text-4xl sm:text-5xl lg:text-\[48px\] font-extrabold tracking-tight text-writtenly-navy leading-\[1\.15\] mb-4/g, 'text-display-lg font-display-lg text-writtenly-navy mb-4');
content = content.replace(/text-2xl sm:text-3xl font-medium text-on-surface-variant mt-2\.5 leading-snug/g, 'text-headline-lg font-headline-lg text-on-surface-variant mt-2.5');
content = content.replace(/text-base sm:text-lg text-on-surface-variant font-body leading-relaxed max-w-lg mb-6/g, 'text-body-lg font-body-lg text-on-surface-variant max-w-lg mb-6');

fs.writeFileSync(filePath, content);
console.log('Design tokens applied successfully.');
