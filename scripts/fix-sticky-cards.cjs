const fs = require('fs');
const path = require('path');

const filePath = 'v:\\All Projects\\writtenlyhub\\writtenlyhub blog section\\src\\app\\(frontend)\\compare\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Give the table header a fixed height so we can calculate the sticky offset perfectly.
// <div className="grid grid-cols-12 bg-white  sticky top-[72px] z-30">
content = content.replace(/className="grid grid-cols-12 bg-white\s*sticky top-\[72px\] z-30"/, 'className="grid grid-cols-12 bg-white sticky top-[72px] z-30 h-[130px]"');

// 2. The new offset is 72 + 130 = 202px.
// Wait, the first slide should not have a top rounded corner and shadow because it's visually contiguous with the header initially, OR it should?
// Actually, if it has a rounded corner, it looks disconnected from the header. The header has no bottom rounded corners.
// So all slides should just be square at the top, OR the header should have a rounded bottom?
// In the original design, it's just a table. Let's remove the rounded-t-2xl and shadow from the sticky slides so they look like table sections sliding over each other. 
// Or, if we want the "deck" effect, they need a top shadow to separate them.
// Let's use `top-[202px] bg-white shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.05)] border-t border-outline-variant` without rounded corners, or maybe a tiny `rounded-t-lg`.

const replaceRegex = /sticky top-\[210px\] bg-white shadow-\[0_-10px_25px_-5px_rgba\(0,27,61,0\.1\)\] rounded-t-2xl border-t border-outline-variant z-\[(\d+)\] min-h-\[50vh\]/g;
content = content.replace(replaceRegex, (match, zIndex) => {
    return `sticky top-[202px] bg-white shadow-[0_-12px_20px_-5px_rgba(0,27,61,0.08)] rounded-t-[16px] border-t border-outline-variant z-[${zIndex}] min-h-[60vh]`;
});

// To fix the first slide jump: 
// The first slide is cat-pricing. If it has rounded-t-[16px] and top-[202px], when the page loads, the header is h-[130px], so the slide is exactly at 202px. It won't jump!
// But wait, the table header has `p-5 sm:p-6`. This might cause its content to overflow if h-[130px] is too short.
// Let's make sure the content inside the header fits in 130px.
// `h-[130px]` is enough for 68px of content + 48px padding = 116px. Yes.

// 3. For the very first slide (cat-pricing), let's remove the top border radius and shadow so it seamlessly connects to the header initially, and only the subsequent slides look like overlapping cards.
// Wait, if the subsequent slides overlap it, they will have the shadow. The first slide doesn't need to overlap anything!
// It just needs to be sticky so it stays there while slide 2 overlaps it.
content = content.replace(/<div id="cat-pricing" className="divide-y divide-slate-100 sticky top-\[202px\] bg-white shadow-\[0_-12px_20px_-5px_rgba\(0,27,61,0\.08\)\] rounded-t-\[16px\] border-t border-outline-variant z-\[10\] min-h-\[60vh\]">/, 
                          '<div id="cat-pricing" className="divide-y divide-slate-100 sticky top-[202px] bg-white z-[10] min-h-[60vh]">');

// 4. To fix the final slide transition:
// If the final slide (cat-support) is min-h-[60vh], when it sticks, the user keeps scrolling. The container ends, and the whole block scrolls up naturally! That is exactly what happens.
// But wait, if the last slide doesn't have enough content below it, the page might end. We need some padding at the bottom of the container.
// The container has `<div className="bg-white rounded-2xl border border-outline-variant shadow-elevated relative">`
// Let's add pb-20 to it so the last slide can fully enter before the container ends? No, the container's height is the sum of all slides. The last slide will scroll up to top-[202px] when the bottom of the container is still far below. Then the user scrolls to the bottom of the container, and the whole thing un-sticks.

fs.writeFileSync(filePath, content);
console.log('Fixed sticky offsets and first slide.');
