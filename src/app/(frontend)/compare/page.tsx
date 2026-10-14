
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, ArrowLeft, ChevronDown, Plus, Minus, Star } from 'lucide-react';

const topComparisons = [
  { id: 'upwork', name: 'Upwork', letter: 'U', color: 'bg-[#14a800] text-white' },
  { id: 'fiverr', name: 'Fiverr', letter: 'F', color: 'bg-[#1dbf73] text-white' },
  { id: 'clearvoice', name: 'ClearVoice', letter: 'C', color: 'bg-[#ff5a00] text-white' },
];

const competitors = [
  { id: 'upwork', name: 'Upwork', category: 'Freelance Marketplaces', letter: 'U', color: 'bg-slate-100 text-slate-600' },
  { id: 'fiverr', name: 'Fiverr', category: 'Freelance Marketplaces', letter: 'F', color: 'bg-slate-100 text-slate-600' },
  { id: 'clearvoice', name: 'ClearVoice', category: 'Content Platforms', letter: 'C', color: 'bg-slate-100 text-slate-600' },
  { id: 'verblio', name: 'Verblio', category: 'Content Platforms', letter: 'V', color: 'bg-slate-100 text-slate-600' },
  { id: 'pepper-content', name: 'Pepper Content', category: 'Managed Services', letter: 'P', color: 'bg-slate-100 text-slate-600' },
  { id: 'contentwriters', name: 'ContentWriters', category: 'Managed Services', letter: 'C', color: 'bg-slate-100 text-slate-600' },
  { id: 'scripted', name: 'Scripted', category: 'Content Platforms', letter: 'S', color: 'bg-slate-100 text-slate-600' },
  { id: 'writeraccess', name: 'WriterAccess', category: 'Freelance Marketplaces', letter: 'W', color: 'bg-slate-100 text-slate-600' },
  { id: 'brafton', name: 'Brafton', category: 'Managed Services', letter: 'B', color: 'bg-slate-100 text-slate-600' },
  { id: 'jasper-ai', name: 'Jasper AI', category: 'AI Tools', letter: 'J', color: 'bg-slate-100 text-slate-600' },
  { id: 'copy-ai', name: 'Copy.ai', category: 'AI Tools', letter: 'C', color: 'bg-slate-100 text-slate-600' },
  { id: 'surfer-seo', name: 'Surfer SEO', category: 'SEO Content', letter: 'S', color: 'bg-slate-100 text-slate-600' },
];

const categories = [
  'Freelance Marketplaces', 'Content Platforms', 'Managed Services', 'AI Tools', 'SEO Content'
];

const faqs = [
  {
    q: "What is WrittenlyHub Compare?",
    a: "WrittenlyHub Compare is our directory evaluating how WrittenlyHub's features, pricing, and quality match up against other popular writing platforms and freelance marketplaces."
  },
  {
    q: "How are platforms compared?",
    a: "We evaluate platforms based on editorial workflow, pricing transparency, SEO capabilities, revision policies, and the caliber of writing talent available."
  },
  {
    q: "Which platforms can I compare?",
    a: "You can compare WrittenlyHub against freelance marketplaces (like Upwork or Fiverr), managed content platforms (like ClearVoice or Verblio), and AI writing assistants."
  },
  {
    q: "Are the comparisons updated?",
    a: "Yes, our team periodically reviews competitor pricing and feature sets to ensure our comparisons reflect the current market landscape."
  }
];

export default function CompareDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCompetitors = competitors.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? comp.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const visibleCompetitors = filteredCompetitors.slice(0, visibleCount);

  return (
    <div className="bg-[#f8f9fc] min-h-screen text-slate-900 font-sans pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-writtenly-navy overflow-hidden -mt-16 pt-28 pb-24 lg:pt-36 lg:pb-32 px-6 min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/compare-bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center lg:px-8">
          {/* Left: Copy */}
          <div className="w-full lg:w-[550px] shrink-0 text-center lg:text-left mx-auto lg:mx-0 relative z-20">
            <h1 className="font-display text-3xl sm:text-4xl md:text-[42px] lg:text-[45px] font-bold tracking-tight text-white leading-[1.15] mb-6">
              <span className="text-writtenly-orange">Compare</span> content<br className="hidden sm:block" /> platforms — without the<br className="hidden sm:block" /> guesswork.
            </h1>
            <p className="font-body-md text-base md:text-lg lg:text-[17px] text-blue-100/90 leading-relaxed mb-8 max-w-[600px]">
              Compare WrittenlyHub to top freelance marketplaces and content agencies — and see why leading marketing teams choose predictable quality over unpredictable freelancers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="#search" className="bg-writtenly-orange hover:bg-orange-600 text-white font-bold text-[14px] px-6 py-3 rounded-xl transition shadow-lg shadow-orange-500/20 w-full sm:w-auto text-center">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="relative w-full aspect-[4/3] max-w-[260px] lg:max-w-[300px] mx-auto lg:ml-auto lg:mr-4 mt-8 lg:mt-0">
            {/* Base Blob */}
            <div className="absolute inset-2 bg-[#eafdf6] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl"></div>
            
            {/* Other Platform Bubble */}
            <div className="absolute top-[20%] left-[10%] w-[35%] aspect-square bg-writtenly-navy rounded-[40%_60%_70%_30%/50%_40%_60%_50%] flex items-center justify-center shadow-lg transform -rotate-6 transition-transform hover:scale-105">
              <span className="text-white font-extrabold text-sm md:text-base">Others</span>
            </div>

            {/* VS Bubble */}
            <div className="absolute top-[50%] left-[40%] w-10 h-10 bg-writtenly-navy rounded-full flex items-center justify-center shadow-lg z-10 text-white font-bold text-xs border-2 border-[#eafdf6]">
              vs.
            </div>

            {/* WrittenlyHub Bubble */}
            <div className="absolute top-[10%] right-[10%] w-[45%] aspect-square bg-white rounded-full flex items-center justify-center shadow-xl transform rotate-3 transition-transform hover:-translate-y-2">
              <Image src="/images/logos/bird-accent.svg" alt="WH" width={50} height={50} className="object-contain" />
            </div>

            {/* Decorative small bubbles */}
            <div className="absolute top-[45%] left-[5%] w-10 h-10 bg-white rounded-full opacity-90 shadow-sm"></div>
            <div className="absolute bottom-[20%] right-[15%] w-8 h-8 bg-white rounded-full opacity-90 shadow-sm"></div>
            <div className="absolute bottom-[10%] right-[25%] w-12 h-12 bg-white rounded-full opacity-90 shadow-sm"></div>
          </div>
        </div>
      </section>
      {/* Popular Comparisons Strip */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16 pb-8">
        <h3 className="font-bold text-writtenly-navy text-[17px] mb-6 text-left">Top comparisons nonprofits search for:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {topComparisons.map((comp) => (
            <div key={comp.id} className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 transition hover:shadow-md">
              {/* Logo block */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl shrink-0 ${comp.color}`}>
                {comp.letter}
              </div>
              
              {/* Text block */}
              <div className="flex flex-col items-start text-left">
                <span className="text-slate-500 font-medium text-[13px] mb-0.5">WrittenlyHub vs.</span>
                <h4 className="font-bold text-[15px] text-writtenly-navy mb-1.5">{comp.name}</h4>
                <Link href={`/compare/competitor`} className="text-[#5a5ce6] font-semibold text-[14px] flex items-center gap-1.5 hover:gap-2 transition-all">
                  Compare <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Directory & Search */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 text-center">
        <h2 className="font-display-lg text-4xl md:text-5xl lg:text-[54px] font-black text-writtenly-navy leading-[1.1] tracking-tight max-w-4xl mx-auto mb-10">
          See how <span className="text-writtenly-orange">WrittenlyHub</span> stacks up against top content platforms
        </h2>

        <div className="max-w-2xl mx-auto relative mb-8">
          <input 
            type="text" 
            placeholder="Search content platforms..." 
            className="w-full h-14 pl-6 pr-14 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-writtenly-orange/50 focus:border-writtenly-orange text-slate-800 text-lg placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-2 bottom-2 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-200 transition">
            <Search size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-4">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition border ${activeCategory === cat ? 'bg-writtenly-orange text-white border-writtenly-orange' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {activeCategory && (
          <button onClick={() => setActiveCategory(null)} className="text-writtenly-orange text-[13px] font-medium hover:underline">
            Clear filter
          </button>
        )}
      </section>

      {/* Competitors Grid */}
      <section className="max-w-[1000px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visibleCompetitors.map((comp) => (
            <div key={comp.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 transition hover:shadow-md group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 ${comp.color}`}>
                {comp.letter}
              </div>
              <div className="flex-1 text-left">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">WrittenlyHub vs.</div>
                <h4 className="font-bold text-[16px] text-slate-900 leading-snug mb-1">{comp.name}</h4>
                <Link href={`/compare/competitor`} className="text-writtenly-orange font-semibold text-[13px] flex items-center gap-1 group-hover:gap-1.5 transition-all w-max">
                  Compare <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < filteredCompetitors.length && (
          <div className="text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-6 py-2 rounded-full border border-slate-300 text-slate-700 font-semibold text-[14px] hover:bg-slate-50 transition"
            >
              Load more
            </button>
          </div>
        )}
        <div className="text-center mt-6">
          <Link href="#categories" className="text-writtenly-orange text-[13px] font-medium hover:underline flex items-center justify-center gap-1">
            See how other platforms compare to each other <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Categories Carousel */}
      <section id="categories" className="max-w-[1000px] mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
            <span className="text-[#fd5a0a] font-extrabold">Compare</span>
            <span className="text-[#001b3d] font-extrabold">Categories</span>
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant font-body mt-2 max-w-3xl mx-auto">
            Compare WrittenlyHub across every category of content tool.
          </p>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-writtenly-orange transition shrink-0">
            <ArrowLeft size={18} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { title: 'Freelance Marketplaces', desc: 'Compare WrittenlyHub to the most popular Freelance Marketplaces.' },
              { title: 'Content Platforms', desc: 'Compare WrittenlyHub to the most popular Content Platforms.' },
              { title: 'AI Writing Tools', desc: 'Compare WrittenlyHub to the most popular AI Writing Tools.' }
            ].map((cat, idx) => (
              <div key={idx} className="bg-orange-50 rounded-2xl p-8 text-left border border-orange-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-writtenly-navy mb-4 shadow-sm">
                    <Search size={18} />
                  </div>
                  <div className="text-[12px] font-medium text-slate-600 mb-1">WrittenlyHub vs.</div>
                  <h4 className="font-bold text-[18px] text-writtenly-navy mb-3">{cat.title}</h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-6">{cat.desc}</p>
                </div>
                <Link href="#search" className="text-writtenly-orange font-semibold text-[14px] flex items-center gap-1 hover:gap-2 transition-all">
                  Compare <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-writtenly-orange hover:bg-orange-50 transition shrink-0">
            <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-writtenly-orange"></div>
          {[1,2,3,4,5,6,7].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-300"></div>)}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
            SUPPORT & INFO
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
            <span className="text-[#fd5a0a] font-extrabold">Common</span>
            <span className="text-[#001b3d] font-extrabold">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant font-body mt-2 max-w-3xl mx-auto">
            Everything you need to know about how we compare to the rest.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-orange-50 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center gap-4 text-left font-bold text-[15px] text-writtenly-orange"
              >
                {openFaq === i ? <Minus size={20} className="shrink-0" /> : <Plus size={20} className="shrink-0" />}
                {faq.q}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 pl-14 text-[14px] text-slate-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#eafdf6] py-24 px-6 text-center">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
              TRUSTED WORLDWIDE
            </span>
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
              <span className="text-[#fd5a0a] font-extrabold">100+ Teams</span>
              <span className="text-[#001b3d] font-extrabold">Trust Us</span>
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant font-body mt-2 max-w-3xl mx-auto">
              100+ growth teams trust WrittenlyHub to elevate their content output. For 4+ years, we've supported B2B teams with free, user-friendly editorial workflows.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-16">
            <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm border border-emerald-100">
              <div className="w-6 h-6 bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center rounded">G2</div>
              <span className="font-bold text-writtenly-navy">4.9</span>
              <div className="flex text-amber-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm border border-emerald-100">
              <div className="w-6 h-6 bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center rounded">C</div>
              <span className="font-bold text-writtenly-navy">4.8</span>
              <div className="flex text-amber-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-900/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center text-left gap-10 relative overflow-hidden">
            <div className="w-full md:w-5/12 relative aspect-square md:aspect-auto md:h-64 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
              <Image src="/images/bento/bento1.webp" alt="Trust" fill className="object-cover" />
            </div>
            <div className="w-full md:w-7/12">
              <h3 className="text-2xl font-bold text-writtenly-navy leading-snug mb-6">
                "As a startup with a small marketing team, we needed high-quality content without the agency retainer fees. WrittenlyHub was a dream come true."
              </h3>
              <p className="text-[14px] text-slate-500 font-medium mb-6">Masey, Marketing Director.</p>
              <button className="bg-writtenly-navy hover:bg-writtenly-navy-light text-white font-bold text-[14px] px-6 py-3 rounded-xl transition">
                Read the full story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center mb-12">
            <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
              CASE STUDIES
            </span>
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
              <span className="text-[#fd5a0a] font-extrabold">The</span>
              <span className="text-[#001b3d] font-extrabold">Real Results</span>
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant font-body mt-2 max-w-3xl mx-auto">
              Real verifiable growth achieved by teams using our unified methodology.
            </p>
            <a href="/our-work" className="mt-6 text-sm font-bold text-writtenly-orange hover:text-writtenly-orange-hover flex items-center gap-1">
              Explore all case studies →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:px-12 xl:px-16 text-left">
            
            {/* Case Study 1 - Blog Style */}
            <div className="group flex flex-col cursor-pointer h-full">
              <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-surface-variant relative mb-4">
                <Image 
                  src="/images/bento/bento1.png" 
                  alt="upGrad Abroad Case Study"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="flex flex-col flex-1 px-1 mt-1">
                <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2 font-medium uppercase tracking-wider">
                  EdTech • Full Funnel SEO
                </div>
                <h3 className="font-headline-md text-[19px] md:text-[22px] leading-[1.35] font-black text-writtenly-navy tracking-tight mb-2 group-hover:text-writtenly-orange transition-colors">
                  Boosting digital presence and search dominance
                </h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed line-clamp-2">
                  Scaled high-intent topical authority clusters, increasing qualified student inquiries while lowering customer acquisition costs.
                </p>
              </div>
            </div>

            {/* Case Study 2 - Blog Style */}
            <div className="group flex flex-col cursor-pointer h-full">
              <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-surface-variant relative mb-4">
                <Image 
                  src="/images/bento/bento2.png" 
                  alt="FinServ Capital Case Study"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="flex flex-col flex-1 px-1 mt-1">
                <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2 font-medium uppercase tracking-wider">
                  FinTech • Compliance Briefs
                </div>
                <h3 className="font-headline-md text-[19px] md:text-[22px] leading-[1.35] font-black text-writtenly-navy tracking-tight mb-2 group-hover:text-writtenly-orange transition-colors">
                  Scaling customer acquisition with financial literacy funnels
                </h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed line-clamp-2">
                  Deployed compliant content models that doubled verified loan inquiries and built long-term borrower trust.
                </p>
              </div>
            </div>

            {/* Case Study 3 - Blog Style */}
            <div className="group flex flex-col cursor-pointer h-full">
              <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-surface-variant relative mb-4">
                <Image 
                  src="/images/bento/bento3.png" 
                  alt="CloudOps Tech Case Study"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="flex flex-col flex-1 px-1 mt-1">
                <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2 font-medium uppercase tracking-wider">
                  B2B SaaS • Technical Content
                </div>
                <h3 className="font-headline-md text-[19px] md:text-[22px] leading-[1.35] font-black text-writtenly-navy tracking-tight mb-2 group-hover:text-writtenly-orange transition-colors">
                  Establishing uncontested thought leadership in cloud tooling
                </h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed line-clamp-2">
                  Developed technical benchmark whitepapers and engineering teardowns that converted developers into enterprise contracts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-10 mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-writtenly-navy rounded-[32px] border border-border-subtle ambient-shadow p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            {/* Subtle background glow for the banner */}
            <div className="absolute inset-0 bg-gradient-to-b from-writtenly-orange/10 to-transparent pointer-events-none"></div>

            <div className="max-w-2xl relative z-10 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                Ready to get started for free?
              </h3>
              <p className="font-body-md text-white/80 text-base mb-8 max-w-xl mx-auto">
                Let&apos;s build an authoritative content ecosystem that drives qualified traffic, buyer trust, and measurable revenue.
              </p>
              
              {/* Ultra Premium Button with Avatars */}
              <Link 
                href="/contact" 
                className="relative flex items-center justify-between pl-6 pr-1.5 py-1.5 bg-gradient-to-br from-[#f8651c] to-[#e65005] shadow-[0_8px_20px_-6px_rgba(230,80,5,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(230,80,5,0.7)] border border-white/20 rounded-full group transition-all duration-300 transform hover:-translate-y-1 w-max"
              >
                <span className="font-label-md text-[12px] uppercase tracking-[0.15em] font-bold text-white ml-2 mr-5 whitespace-nowrap">SIGN UP FOR FREE</span>
                
                <div className="flex -space-x-2.5 bg-white/15 rounded-full p-1 backdrop-blur-sm shadow-inner transition-transform group-hover:scale-105">
                  <img src="/images/authors/alex.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-30" />
                  <img src="/images/authors/elena.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-20" />
                  <img src="/images/authors/david.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-10" />
                  <div className="w-7 h-7 rounded-full border border-white/60 bg-white/20 flex items-center justify-center backdrop-blur-md shadow-sm relative z-0 group-hover:bg-white group-hover:text-[#e65005] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#e65005] transition-colors" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
