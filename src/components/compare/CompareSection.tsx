import React from 'react';
import Link from 'next/link';

export function CompareSection() {
  return (
    <section className="py-16 bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Alternative comparisons
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </span>
          <h3 className="text-2xl font-extrabold text-writtenly-navy mt-2">Still comparing your options?</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2">See how WrittenlyHub stacks up against specific competitors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Alt 1 */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 font-extrabold flex items-center justify-center text-lg mb-4">
                W
              </div>
              <h4 className="text-base font-bold text-writtenly-navy">WrittenlyHub vs [Competitor A]</h4>
              <p className="text-xs text-on-surface-variant font-body mt-2 leading-relaxed">
                See how our platform compares against [Competitor A]'s core feature set.
              </p>
            </div>
            <Link href="#" className="text-xs font-bold text-writtenly-orange hover:text-writtenly-orange/80 mt-6 flex items-center gap-1">
              Read full comparison →
            </Link>
          </div>

          {/* Alt 2 */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 font-extrabold flex items-center justify-center text-lg mb-4">
                W
              </div>
              <h4 className="text-base font-bold text-writtenly-navy">WrittenlyHub vs [Competitor B]</h4>
              <p className="text-xs text-on-surface-variant font-body mt-2 leading-relaxed">
                See how our platform compares against [Competitor B]'s core feature set.
              </p>
            </div>
            <Link href="#" className="text-xs font-bold text-writtenly-orange hover:text-writtenly-orange/80 mt-6 flex items-center gap-1">
              Read full comparison →
            </Link>
          </div>

          {/* Alt 3 */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 font-extrabold flex items-center justify-center text-lg mb-4">
                W
              </div>
              <h4 className="text-base font-bold text-writtenly-navy">WrittenlyHub vs [Competitor C]</h4>
              <p className="text-xs text-on-surface-variant font-body mt-2 leading-relaxed">
                See how our platform compares against [Competitor C]'s core feature set.
              </p>
            </div>
            <Link href="#" className="text-xs font-bold text-writtenly-orange hover:text-writtenly-orange/80 mt-6 flex items-center gap-1">
              Read full comparison →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
