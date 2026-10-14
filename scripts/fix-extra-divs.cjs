const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(frontend)/compare/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

c = c.replace(/<div className="grid grid-cols-12 bg-white sticky top-\[72px\][\s\S]*?<div id="cat-pricing"/m,
`<div className="grid grid-cols-12 bg-white sticky top-[72px] z-30 border-b border-outline-variant/30 shadow-sm">
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
    </div>
  </div>

  <div id="cat-pricing"`);

fs.writeFileSync(filePath, c);
