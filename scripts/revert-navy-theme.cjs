const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(frontend)/compare/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// Replace dark navy outer shells with white
c = c.replace(/bg-\[\#082653\]/g, 'bg-white');
// Restore page bg if any
c = c.replace(/bg-\[\#061D43\]/g, 'bg-writtenly-navy');
c = c.replace(/border-\[\#3678F6\]\/30/g, 'border-outline-variant/30');
c = c.replace(/border-\[\#3678F6\]\/20/g, 'border-outline-variant/20');
c = c.replace(/bg-\[\#FFF9F5\]/g, 'bg-white'); // WrittenlyHub column back to white
c = c.replace(/text-white/g, 'text-on-surface'); // Revert feature text to dark
c = c.replace(/text-white\/70/g, 'text-outline-variant');
c = c.replace(/text-slate-700/g, 'text-on-surface-variant');
c = c.replace(/bg-\[\#EEF4FF\]/g, 'bg-surface-container-low/90'); // Competitor column back

// Category headers need white text
c = c.replace(/<div className="bg-writtenly-navy text-on-surface/g, '<div className="bg-writtenly-navy text-white');

fs.writeFileSync(filePath, c);
console.log('Reverted to light theme');
