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
    <nav className="bg-writtenly-navy w-full top-0 fixed z-50 transition-all h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto">
        <div className="font-display-lg text-headline-md font-bold text-white flex items-center gap-2">
          <Link href="/">
              <Image
                alt="WrittenlyHub Logo"
                src="/images/logos/logo.svg"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">About</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Services</Link>
          
          <div className="relative group">
            <button className="text-white group-hover:text-writtenly-orange transition-colors font-label-md text-label-md flex items-center gap-1 h-16">
              Resources
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-scale-y-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="w-[750px] bg-writtenly-navy rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 flex overflow-hidden">
                
                {/* Left Side: Resources List */}
                <div className="w-2/3 p-8 flex flex-col bg-writtenly-navy">
                  <span className="font-label-md text-[11px] font-bold text-white/50 uppercase tracking-widest mb-6">Resources</span>
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

                    <Link href="/success-stories" className="group/item flex items-start gap-4">
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

          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Career</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Write For Us</Link>
        </div>
        <div className="flex items-center gap-2 md:gap-stack-md">
          {/* CTA removed as requested */}
          <MobileMenu contactEmail={contactEmail} />
        </div>
      </div>
    </nav>
  );
}
