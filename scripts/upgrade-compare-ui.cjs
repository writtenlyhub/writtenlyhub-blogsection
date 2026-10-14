const fs = require('fs');
const path = require('path');

const filePath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Slow down the animation by adding mb-[45vh] to every sticky slide (and giving them rounded-t-[24px] instead of 16px).
// For the first slide (pricing), add mb-[45vh].
content = content.replace(/sticky top-\[202px\] bg-white z-\[10\] min-h-\[60vh\]/, 
                          'sticky top-[202px] bg-white z-[10] min-h-[60vh] mb-[45vh]');

// For the rest of the slides, add mb-[45vh] and upgrade shadow and border radius.
content = content.replace(/sticky top-\[202px\] bg-white shadow-\[0_-12px_20px_-5px_rgba\(0,27,61,0\.08\)\] rounded-t-\[16px\] border-t border-outline-variant z-\[(\d+)\] min-h-\[60vh\]/g, 
                          (match, zIndex) => {
                              return `sticky top-[202px] bg-white shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.06)] rounded-t-[24px] border-t border-outline-variant/50 z-[${zIndex}] min-h-[60vh] mb-[45vh]`;
                          });

// The last slide doesn't strictly need the full mb-[45vh], but the script added it globally. That's actually fine, it just gives a pleasant scroll buffer before the page footer.

// 2. Upgrade the Section Header Bars (Navy bars)
// They are currently: bg-writtenly-navy text-white px-6 py-3 flex items-center justify-between border-y border-[#0f274a] shadow-inner
content = content.replace(/bg-writtenly-navy text-white px-6 py-3 flex items-center justify-between border-y border-\[\#0f274a\] shadow-inner/g, 
                          'bg-writtenly-navy text-white px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shadow-sm');

// 3. Upgrade table rows
// Replace divide-slate-100 with divide-outline-variant/30
content = content.replace(/divide-slate-100/g, 'divide-outline-variant/30');

// Replace border-slate-100 with border-outline-variant/30
content = content.replace(/border-slate-100/g, 'border-outline-variant/30');

// Upgrade padding and layout for rows: p-4 sm:p-5 -> px-6 sm:px-8 py-5 sm:py-6
content = content.replace(/p-4 sm:p-5/g, 'px-5 sm:px-8 py-5 sm:py-6');

// Improve the "Alternative / Standard" box background
content = content.replace(/bg-surface-container-low\/70/g, 'bg-surface-container-low/90');

// Add subtle styling to the feature title rows (the leftmost column)
content = content.replace(/font-bold text-on-surface border-r border-outline-variant\/30 bg-white/g, 'font-bold text-on-surface border-r border-outline-variant/30 bg-surface-bright/50');

fs.writeFileSync(filePath, content);
console.log('UI upgrades and animation pacing applied');
