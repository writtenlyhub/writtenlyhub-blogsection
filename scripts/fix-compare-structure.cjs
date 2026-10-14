const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(frontend)/compare/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Fix the top Header Grid
// Remove fixed height `h-[120px]`, remove `mx-1`, remove `mt-3`, keep it clean.
const oldHeaderRegex = /<div className="grid grid-cols-12 bg-white sticky top-\[72px\] z-30 h-\[120px\] border-b border-outline-variant\/30 shadow-\[0_4px_20px_rgba\(0,0,0,0\.02\)\]">[\s\S]*?(?=<\/div>\n  <\/div>)/m;
const newHeader = `<div className="grid grid-cols-12 bg-white sticky top-[72px] z-30 border-b border-outline-variant/30 shadow-sm">
    <div className="col-span-4 p-5 sm:p-6 flex flex-col justify-end bg-white">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline-variant">CRITERIA &amp; CAPABILITIES</span>
    </div>
    
    <div className="col-span-4 p-5 sm:p-6 bg-[#FFF9F5] relative z-10 flex flex-col justify-end border-t-4 border-t-[#FF6A00] border-x border-orange-100/50">
      <div>
        <div className="text-xl sm:text-2xl font-black text-writtenly-navy leading-tight">Writtenly<span className="text-writtenly-orange">Hub</span></div>
        <p className="text-[11px] font-bold text-writtenly-orange mt-1 uppercase tracking-wider">Modern Editorial OS</p>
      </div>
    </div>
    
    <div className="col-span-4 p-5 sm:p-6 bg-slate-50 flex flex-col justify-end border-t-4 border-t-transparent">
      <div>
        <div className="text-xl sm:text-2xl font-bold text-slate-700 leading-tight">[Competitor]</div>
        <p className="text-[11px] font-bold text-outline-variant mt-1 uppercase tracking-wider">Legacy Platform</p>
      </div>
    </div>`;
c = c.replace(oldHeaderRegex, newHeader);

// 2. Fix the Category Wrappers
// Change top-[192px] to top-[180px] or top-[190px]. Actually, since the header is naturally tall, let's use `top-[185px]`. 
// Remove the weird shadows that look like gray bands.
c = c.replace(
  /className="sticky top-\[192px\] bg-white z-\[10\] rounded-t-2xl shadow-\[0_-8px_30px_rgba\(0,0,0,0\.04\)\] border-t border-outline-variant\/20 overflow-hidden"/g,
  'className="sticky top-[185px] bg-white z-[10] border-t border-outline-variant/30 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]"'
);

// 3. Fix the Category Headers
// Make them compact and readable.
c = c.replace(
  /<div className="bg-writtenly-navy text-white px-6 sm:px-8 py-4 flex items-center justify-between">/g,
  '<div className="bg-writtenly-navy text-white px-5 sm:px-6 py-2.5 flex items-center justify-between">'
);
c = c.replace(
  /<span className="w-5 h-5 rounded flex items-center justify-center bg-writtenly-orange text-\[10px\] font-bold shadow-sm">/g,
  '<span className="w-5 h-5 rounded flex items-center justify-center bg-writtenly-orange text-[11px] font-extrabold shadow-sm">'
);
c = c.replace(
  /<h3 className="text-\[13px\] font-bold tracking-widest uppercase">/g,
  '<h3 className="text-[12px] font-bold tracking-widest uppercase">'
);
c = c.replace(
  /<span className="text-\[13px\] text-white\/70 font-medium hidden sm:inline">/g,
  '<span className="text-[12px] text-blue-100 font-medium hidden sm:inline">'
);

// 4. Fix row wrapper classes (remove borders from the row if they cause gaps)
// Keep the group hover.
// Already using `<div className="grid grid-cols-12 group">`

// 5. Fix Column 1 (Feature)
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 border-r border-outline-variant\/20 bg-white group-hover:bg-slate-50\/50 transition-colors">/g,
  '<div className="col-span-4 p-5 sm:p-6 border-b border-outline-variant/20 bg-white transition-colors">'
);

// 6. Fix Column 2 (WrittenlyHub)
// Remove `mx-1`, add `border-x` and `border-b`
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 bg-\[\#FFF9F5\] mx-1 relative z-10 border-x border-orange-50\/30">/g,
  '<div className="col-span-4 p-5 sm:p-6 bg-[#FFF9F5] relative z-10 border-x border-b border-orange-100/50">'
);
// Fix typography
c = c.replace(/<div className="font-black text-writtenly-navy text-\[15px\]">/g, '<div className="font-extrabold text-writtenly-navy text-[15px]">');

// 7. Fix Column 3 (Competitor)
// Remove `mx-1`, add `border-b`
c = c.replace(
  /<div className="col-span-4 px-5 sm:px-8 py-5 sm:py-7 bg-slate-50 mx-1">/g,
  '<div className="col-span-4 p-5 sm:p-6 bg-slate-50 border-b border-outline-variant/20">'
);

fs.writeFileSync(filePath, c);
console.log('Fixed structure and typography');
