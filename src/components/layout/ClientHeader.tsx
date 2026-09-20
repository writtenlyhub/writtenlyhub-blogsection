'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';
import { BookOpen, Newspaper, Briefcase, ArrowRight } from 'lucide-react';

export function ClientHeader({ contactEmail }: { contactEmail: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4 px-4' : ''}`}>
      <nav 
        className={`bg-writtenly-navy transition-all duration-300 flex items-center shadow-sm w-full ${
          scrolled 
            ? 'min-h-[70px] lg:min-h-[80px] rounded-[24px] max-w-[1400px] shadow-lg' 
            : 'min-h-[80px] lg:min-h-[90px] max-w-full'
        }`}
      >
        <div className={`flex justify-between items-center w-full px-6 lg:px-12 xl:px-16 mx-auto gap-4`}>
          <div className="font-display-lg text-headline-md font-bold text-white flex items-center shrink-0">
            <Link href="/">
              <Image
                alt="WrittenlyHub Logo"
                src="/images/logos/logo.svg"
                width={220}
                height={73}
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8 lg:h-9' : 'h-9 lg:h-11'}`}
                priority
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-6 lg:gap-8 xl:gap-10">
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="#">About Us</Link>
              <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="#">Services</Link>
              
              <div className="relative group">
                <button className="text-white group-hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px] flex items-center gap-1 py-4">
                  Resources
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:-scale-y-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-[750px] bg-writtenly-navy rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 flex overflow-hidden">
                    
                    <div className="w-2/3 p-8 flex flex-col bg-writtenly-navy">
                      <span className="font-bold text-[11px] text-white/50 uppercase tracking-widest mb-6">Resources</span>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                        <Link href="/" className="group/item flex items-start gap-4">
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

              <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="#">Career</Link>
              <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="#">Write For Us</Link>
              <Link className="text-white hover:text-writtenly-orange transition-colors font-medium text-[14px] lg:text-[15px]" href="/contact">Contact</Link>
            </div>
            
            <div className="flex items-center">
              <MobileMenu contactEmail={contactEmail} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
