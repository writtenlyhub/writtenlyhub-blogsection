const fs = require('fs');
const path = require('path');

const filePath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We need to add sticky positioning to all the category divs.
// The category divs look like: <div id="cat-pricing" className="divide-y divide-slate-100">
// We will replace them with: <div id="cat-pricing" className="divide-y divide-slate-100 sticky top-[230px] bg-white shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.08)] rounded-t-2xl border-t border-outline-variant z-10 transition-all duration-300">
// Wait, we need the container `overflow-hidden` to be removed so sticky works.
content = content.replace(/className="bg-white rounded-2xl border border-outline-variant shadow-elevated relative overflow-hidden"/, 'className="bg-white rounded-2xl border border-outline-variant shadow-elevated relative"');

const categories = ['pricing', 'features', 'workflow', 'integrations', 'collaboration', 'support'];
categories.forEach((cat, index) => {
    // Increase z-index and top offset slightly for a stacked deck effect if desired, or keep same.
    // Let's keep the same top offset so they perfectly overlay each other.
    const searchStr = `<div id="cat-${cat}" className="divide-y divide-slate-100">`;
    const zIndex = 10 + index; 
    // top-[220px] is roughly where the sticky header ends.
    const replaceStr = `<div id="cat-${cat}" className="divide-y divide-slate-100 sticky top-[210px] bg-white shadow-[0_-10px_25px_-5px_rgba(0,27,61,0.1)] rounded-t-2xl border-t border-outline-variant z-[${zIndex}] min-h-[50vh]">`;
    content = content.replace(searchStr, replaceStr);
});

fs.writeFileSync(filePath, content);
console.log('Sticky cards applied');
