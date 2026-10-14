const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(frontend)/compare/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Redesign outer containers
// Replace container with Navy styling
c = c.replace(
  /className="bg-white rounded-2xl border border-outline-variant shadow-elevated relative"/g,
  'className="bg-[#082653] rounded-[24px] border border-[#3678F6]/30 shadow-2xl relative overflow-hidden"'
);

// 2. Redesign header grid
// Replace the top sticky grid to match the reference
c = c.replace(
  /<div className="grid grid-cols-12 bg-white sticky top-\[72px\] z-30 h-\[130px\]">/g,
  '<div className="grid grid-cols-12 bg-transparent sticky top-[72px] z-30 h-[130px] border-b border-[#3678F6]/20">'
);

// 3. Redesign the left column header (Criteria)
c = c.replace(
  /<div className="col-span-4 p-5 sm:p-6 flex flex-col justify-end bg-white border-r border-outline-variant\/30">/g,
  '<div className="col-span-4 p-5 sm:p-6 flex flex-col justify-end bg-transparent border-r border-[#3678F6]/20">'
);

// Update Criteria text to white/secondary
c = c.replace(
  /<span className="text-xs font-bold uppercase tracking-wider text-outline-variant">CRITERIA \&amp; CAPABILITIES<\/span>/g,
  '<span className="text-xs font-bold uppercase tracking-wider text-white/70">CRITERIA &amp; CAPABILITIES</span>'
);

// 4. Redesign WrittenlyHub column header
c = c.replace(
  /<div className="col-span-4 p-5 sm:p-6 bg-white relative z-10 border-x border-orange-100 shadow-\[0_10px_25px_-5px_rgba\(244,84,0,0\.08\)\] flex flex-col justify-end border-t-4 border-t-writtenly-orange">/g,
  '<div className="col-span-4 p-5 sm:p-6 bg-[#FFF9F5] relative z-10 rounded-t-[16px] flex flex-col justify-end border-t-4 border-t-[#FF6A00] mt-2 mx-1">'
);

// 5. Redesign Competitor column header
c = c.replace(
  /<div className="col-span-4 p-5 sm:p-6 flex flex-col justify-end bg-surface-container-low\/90 border-l border-outline-variant\/60">/g,
  '<div className="col-span-4 p-5 sm:p-6 bg-[#EEF4FF] rounded-t-[16px] flex flex-col justify-end mt-2 mx-1 opacity-90">'
);

// 6. Redesign the category header bars (Navy bars to Premium Navy bars)
c = c.replace(
  /<div className="bg-writtenly-navy text-white px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white\/10 shadow-sm">/g,
  '<div className="bg-[#061D43] text-white px-6 sm:px-8 py-6 flex items-center justify-between border-b border-[#3678F6]/20">'
);

// 7. Redesign the sticky slide outer containers
c = c.replace(
  /bg-white shadow-\[0_-8px_30px_-5px_rgba\(0,0,0,0\.06\)\] rounded-t-\[24px\] border-t border-outline-variant\/50/g,
  'bg-[#082653] shadow-[0_-15px_40px_-5px_rgba(0,0,0,0.4)] rounded-t-[24px] border-t border-[#3678F6]/30'
);

// Also the first slide (pricing) needs background updated
c = c.replace(
  /id="cat-pricing" className="divide-y divide-outline-variant\/30 sticky top-\[202px\] bg-white z-\[10\] min-h-\[60vh\] pb-\[60vh\]"/g,
  'id="cat-pricing" className="divide-y divide-[#3678F6]/20 sticky top-[202px] bg-[#082653] z-[10] min-h-[60vh] pb-[60vh]"'
);

// 8. Update inner rows structure
// Left column (Feature names)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-6 font-bold text-on-surface border-r border-outline-variant\/30 bg-surface-bright\/50">/g,
  '<div className="col-span-4 px-5 sm:px-8 py-6 font-bold text-white border-r border-[#3678F6]/20 bg-transparent flex flex-col justify-center">'
);

// Middle column (WrittenlyHub values)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-6 bg-white border-x border-orange-100 shadow-\[0_4px_20px_-4px_rgba\(244,84,0,0\.06\)\] relative z-10">/g,
  '<div className="col-span-4 px-5 sm:px-8 py-6 bg-[#FFF9F5] mx-1 relative z-10 flex flex-col justify-center">'
);

// Right column (Competitor values)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-6 bg-surface-container-low\/90 text-on-surface-variant">/g,
  '<div className="col-span-4 px-5 sm:px-8 py-6 bg-[#EEF4FF] mx-1 text-slate-700 flex flex-col justify-center opacity-90">'
);

// Write changes
fs.writeFileSync(filePath, c);
console.log('UI structure rewritten for Navy theme');
