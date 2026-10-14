const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(frontend)/compare/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Replace the sticky header
const oldHeaderRegex = /<div className="grid grid-cols-12 bg-transparent sticky top-\[72px\] z-30 h-\[130px\] border-b border-outline-variant\/20">[\s\S]*?(?=<!--|id="cat-pricing"|<div id="cat-pricing")/m;
const newHeader = `<div className="grid grid-cols-12 bg-white sticky top-[72px] z-30 h-[120px] border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
    <div className="col-span-4 p-5 sm:p-6 flex flex-col justify-end bg-white border-r border-outline-variant/20">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline-variant">CRITERIA &amp; CAPABILITIES</span>
    </div>
    
    <div className="col-span-4 p-5 sm:p-6 bg-[#FFF9F5] relative z-10 rounded-t-2xl flex flex-col justify-end border-t-4 border-t-[#FF6A00] mt-3 mx-1">
      <div>
        <div className="text-xl sm:text-2xl font-black text-writtenly-navy leading-tight">Writtenly<span className="text-writtenly-orange">Hub</span></div>
        <p className="text-[11px] font-bold text-writtenly-orange mt-1 uppercase tracking-wider">Modern Editorial OS</p>
      </div>
    </div>
    
    <div className="col-span-4 p-5 sm:p-6 bg-slate-50 rounded-t-2xl flex flex-col justify-end mt-3 mx-1">
      <div>
        <div className="text-xl sm:text-2xl font-bold text-slate-700 leading-tight">[Competitor]</div>
        <p className="text-[11px] font-bold text-outline-variant mt-1 uppercase tracking-wider">Legacy Platform</p>
      </div>
    </div>
  </div>

  `;
c = c.replace(oldHeaderRegex, newHeader);

// 2. Replace Category Wrappers
c = c.replace(
  /<div id="(cat-[^"]+)" className="divide-y divide-outline-variant\/30 sticky top-\[202px\] bg-white (?:shadow-[^ ]+ )?(?:rounded-t-[^ ]+ )?(?:border-t [^ ]+ )?(?:z-\[\d+\]\s*)?">/g,
  '<div id="$1" className="sticky top-[192px] bg-white z-[10] rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] border-t border-outline-variant/20 overflow-hidden">'
);
// Handle the pricing category which had different classes
c = c.replace(
  /<div id="cat-pricing" className="divide-y divide-\[\#3678F6\]\/20 sticky top-\[202px\] bg-white z-\[10\]\s*">/g,
  '<div id="cat-pricing" className="sticky top-[192px] bg-white z-[10] rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] border-t border-outline-variant/20 overflow-hidden">'
);

// 3. Replace Category Headers
c = c.replace(
  /<div className="bg-writtenly-navy text-white px-6 sm:px-8 py-6 flex items-center justify-between border-b border-outline-variant\/20">\s*<div className="flex items-center gap-2">\s*<span className="w-2 h-2 rounded-full bg-writtenly-orange"><\/span>\s*<span className="text-xs md:text-sm font-bold tracking-wider uppercase text-on-surface">(\d+)\. ([^<]+)<\/span>\s*<\/div>\s*<span className="text-xs text-surface-dim font-normal hidden sm:inline">([^<]+)<\/span>\s*<\/div>/g,
  `<div className="bg-writtenly-navy text-white px-6 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 rounded flex items-center justify-center bg-writtenly-orange text-[10px] font-bold shadow-sm">$1</span>
        <h3 className="text-[13px] font-bold tracking-widest uppercase">$2</h3>
      </div>
      <span className="text-[13px] text-white/70 font-medium hidden sm:inline">$3</span>
    </div>
    <div className="divide-y divide-outline-variant/20">`
);

// Fix unclosed div at end of sections due to the divide-y div addition
// For each category section end, we need an extra </div>
c = c.replace(/<\/div>\s*<div id="cat-/g, '</div>\n  </div>\n\n  <div id="cat-');
c = c.replace(/<\/div>\s*<div className="grid grid-cols-12 bg-surface-container-low\/90/g, '</div>\n  </div>\n\n  <div className="grid grid-cols-12 bg-surface-container-low/90');

// 4. Update row wrappers
c = c.replace(/<div className="grid grid-cols-12 text-sm hover:bg-surface-container-low\/40 transition-colors">/g, '<div className="grid grid-cols-12 group">');

// 5. Update Column 1 (Feature)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-6 font-bold text-on-surface border-r border-outline-variant\/20 bg-transparent">([^<]+)<span className="block text-xs font-normal text-outline mt-0\.5">([^<]+)<\/span><\/div>/g,
  '<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 border-r border-outline-variant/20 bg-white group-hover:bg-slate-50/50 transition-colors"><div className="font-bold text-writtenly-navy text-[15px]">$1</div><div className="text-[13px] text-outline-variant mt-1.5 leading-relaxed">$2</div></div>'
);

// 6. Update Column 2 (WrittenlyHub)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-6 bg-white mx-1 relative z-10">(.*?)<\/div>/g,
  (match, inner) => {
    // We need to inject text-[15px] and text-[13px]
    let newInner = inner.replace(/text-base/g, 'text-[15px]')
                        .replace(/text-xs/g, 'text-[13px]')
                        .replace(/mt-1/g, 'mt-1.5 leading-relaxed');
    return `<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 bg-[#FFF9F5] mx-1 relative z-10 border-x border-orange-50/30">${newInner}</div>`;
  }
);

// 7. Update Column 3 (Competitor)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-6 bg-surface-container-low\/90 mx-1 text-on-surface-variant opacity-90">(.*?)<\/div>/g,
  (match, inner) => {
    let newInner = inner.replace(/text-base/g, 'text-[15px]')
                        .replace(/text-xs/g, 'text-[13px]')
                        .replace(/mt-1/g, 'mt-1.5 leading-relaxed');
    return `<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 bg-slate-50 mx-1">${newInner}</div>`;
  }
);

fs.writeFileSync(filePath, c);
console.log('UI structure rewritten properly');
