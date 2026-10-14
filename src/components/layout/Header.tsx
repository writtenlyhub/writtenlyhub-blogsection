import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { getCachedSiteSettings } from '@/lib/api';
import { BookOpen, Newspaper, Briefcase, PlayCircle, ArrowRight } from 'lucide-react';

export async function Header() {
  const siteSettings = await getCachedSiteSettings();
  const contactEmail = siteSettings.contactEmail || 'hello@writtenlyhub.com';

  return (
    <nav id="main-header" data-scrolled="false" className="group bg-writtenly-navy w-full top-0 fixed z-50 transition-all duration-300 h-[80px] lg:h-[90px] flex items-center left-1/2 -translate-x-1/2 data-[scrolled=true]:top-4 data-[scrolled=true]:rounded-[24px] data-[scrolled=true]:w-[calc(100%-2rem)] data-[scrolled=true]:max-w-[1400px] data-[scrolled=true]:shadow-lg">
      <div className="absolute inset-0 pointer-events-none rounded-[0px] group-data-[scrolled=true]:rounded-[24px] overflow-hidden transition-all duration-300">
        <div id="reading-progress-container" className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-data-[scrolled=true]:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex justify-between items-center w-full px-6 lg:px-12 xl:px-16 max-w-container-max mx-auto gap-4 relative z-10">
        <div className="font-display-lg text-headline-md font-bold text-white flex items-center shrink-0">
          <Link href="/">
            <Image
              alt="WrittenlyHub Logo"
              src="/images/logos/logo.svg"
              width={220}
              height={73}
              className="h-9 lg:h-11 w-auto object-contain transition-all duration-300 group-data-[scrolled=true]:h-8 group-data-[scrolled=true]:lg:h-9"
              priority
            />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/about/">About Us</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/services/">Services</Link>
          <div className="relative group/compare">
            <Link href="/compare" className="text-white group-hover/compare:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px] flex items-center gap-1 h-16">
              Compare
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/compare:-scale-y-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/compare:opacity-100 group-hover/compare:visible transition-all duration-200 z-50">
              <div className="w-[850px] bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border border-slate-200 flex overflow-hidden">
                
                {/* Left Side: Compare Grid */}
                <div className="w-[60%] p-8 flex flex-col bg-white">
                  <span className="font-label-md text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Compare WrittenlyHub to...</span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    
                    {[
                      { name: 'Upwork', color: 'bg-blue-100 text-blue-600', letter: 'U' },
                      { name: 'Fiverr', color: 'bg-green-100 text-green-600', letter: 'F' },
                      { name: 'ClearVoice', color: 'bg-orange-100 text-orange-600', letter: 'C' },
                      { name: 'Verblio', color: 'bg-purple-100 text-purple-600', letter: 'V' },
                      { name: 'Pepper Content', color: 'bg-red-100 text-red-600', letter: 'P' },
                      { name: 'ContentWriters', color: 'bg-teal-100 text-teal-600', letter: 'C' }
                    ].map((comp, idx) => (
                      <Link key={idx} href="/compare/competitor" className="group/item flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg ${comp.color} flex items-center justify-center font-bold shrink-0 text-sm`}>
                          {comp.letter}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-headline-md text-[14px] font-bold text-slate-900 group-hover/item:text-writtenly-orange transition-colors">{comp.name}</h4>
                          <p className="font-body-sm text-[12px] text-slate-500 leading-snug">See how WrittenlyHub compares to {comp.name}</p>
                        </div>
                      </Link>
                    ))}

                  </div>
                </div>

                {/* Right Side: Visual & CTA */}
                <div className="w-[40%] bg-slate-50 p-8 flex flex-col justify-center items-center text-center border-l border-slate-100 relative">
                  <div className="w-32 h-32 mb-6 relative">
                    <div className="absolute inset-0 bg-writtenly-orange/10 rounded-full blur-xl"></div>
                    <img src="/images/logos/bird-accent.svg" alt="Illustration" className="w-full h-full object-contain relative z-10" />
                  </div>
                  <h4 className="font-headline-md text-[16px] leading-snug font-bold text-slate-900 mb-6 px-4">
                    See how WrittenlyHub stacks up against top content platforms
                  </h4>
                  <Link href="/compare" className="bg-orange-50 hover:bg-orange-100 text-writtenly-orange font-bold text-[13px] px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
                    View all comparisons <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </div>
          </div>

          <div className="relative group/resources">
            <button className="text-white group-hover/resources:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px] flex items-center gap-1 h-16">
              Resources
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/resources:-scale-y-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/resources:opacity-100 group-hover/resources:visible transition-all duration-200 z-50">
              <div className="w-[750px] bg-writtenly-navy rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 flex overflow-hidden">

                {/* Left Side: Resources List */}
                <div className="w-2/3 p-8 flex flex-col bg-writtenly-navy">
                  <span className="font-label-md text-[11px] font-bold text-white/50 uppercase tracking-widest mb-6">Resources</span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">

                    <Link href="/blog" className="group/item flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/80 group-hover/item:bg-white group-hover/item:text-writtenly-navy transition-colors shrink-0">
                        <BookOpen size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-headline-md text-[15px] font-bold text-white mb-1 group-hover/item:text-writtenly-orange transition-colors">Blog</h4>
                        <p className="font-body-sm text-[13px] text-white/70 leading-snug">Expert guides, SEO & Content Marketing strategies.</p>
                      </div>
                    </Link>

                    <Link href="/news" className="group/item flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/80 group-hover/item:bg-white group-hover/item:text-writtenly-navy transition-colors shrink-0">
                        <Newspaper size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-headline-md text-[15px] font-bold text-white mb-1 group-hover/item:text-writtenly-orange transition-colors">News</h4>
                        <p className="font-body-sm text-[13px] text-white/70 leading-snug">Latest updates, milestones, and announcements.</p>
                      </div>
                    </Link>

                    <Link href="/our-work" className="group/item flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/80 group-hover/item:bg-white group-hover/item:text-writtenly-navy transition-colors shrink-0">
                        <Briefcase size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-headline-md text-[15px] font-bold text-white mb-1 group-hover/item:text-writtenly-orange transition-colors">Our Work</h4>
                        <p className="font-body-sm text-[13px] text-white/70 leading-snug">Discover how we drive measurable revenue for brands.</p>
                      </div>
                    </Link>

                  </div>
                </div>

                {/* Right Side: Featured */}
                <div className="w-1/3 bg-white/5 p-8 flex flex-col justify-between border-l border-white/10 group/feat relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-writtenly-orange/5 to-transparent opacity-0 group-hover/feat:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="flex-1 relative z-10 mb-6 flex items-center justify-center">
                    <img src="/images/logos/bird-accent.svg" alt="WrittenlyHub Accent" className="w-28 h-auto object-contain group-hover/feat:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <h4 className="font-headline-md text-[17px] leading-tight font-bold text-white mb-3">
                      Ready to scale your content?
                    </h4>
                    <Link href="/contact" className="font-label-md text-[13px] font-bold text-writtenly-orange flex items-center gap-1.5 hover:gap-2.5 transition-all w-max">
                      Let's Talk <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/career/">Career</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/write-for-us">Write For Us</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-2 md:gap-stack-md">
          {/* CTA removed as requested */}
          <MobileMenu contactEmail={contactEmail} />
        </div>
      </div>
    </nav>
  );
}
