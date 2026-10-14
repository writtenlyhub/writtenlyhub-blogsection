
"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedMetric from '@/components/ui/AnimatedMetric';

export default function ServicesPage() {
  const [calcType, setCalcType] = useState(3.00);
  const [wordCount, setWordCount] = useState(1500);
  const [speed, setSpeed] = useState('standard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const speedMultiplier = speed === 'priority' ? 1.15 : 1.0;
  const totalCost = Math.round(wordCount * calcType * speedMultiplier);
  const formattedTotal = new Intl.NumberFormat('en-IN').format(totalCost);
  const effectiveRate = (totalCost / wordCount).toFixed(2);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: #f97316;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: #f97316;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}} />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/bold/style.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/fill/style.css" />
      
      <div className="bg-white text-slate-800 antialiased font-sans pb-16">
        {/*  BEGIN: HeroSection  */}
<section className="relative bg-white text-writtenly-navy pt-12 pb-20 overflow-hidden border-b border-slate-200/80" data-purpose="hero-overview">
{/*  Background subtle ambient circles  */}
<div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/*  Hero Left Column: Copy & Metrics  */}
<div className="lg:col-span-7 flex flex-col justify-center h-full text-center lg:text-left">
<div className="space-y-6 pt-8 lg:pt-16">
<h1 className="font-display-lg text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1] text-writtenly-navy">
            Content Engineered for <span className="text-writtenly-orange">Authority</span> &amp; Organic Growth
          </h1>
<p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Data-backed SEO articles, thought leadership, and high-converting marketing copy for fast-moving B2B SaaS and enterprise tech brands.
          </p>
</div>
{/*  Metrics Bar  */}
<div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 px-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto lg:mx-0 mt-12">
<div className="text-center lg:text-left">
<p className="text-2xl sm:text-3xl font-extrabold text-writtenly-navy"><AnimatedMetric value="150+" /></p>
<p className="text-xs sm:text-sm text-slate-500 font-medium">B2B Clients</p>
</div>
<div className="text-center lg:text-left border-x border-slate-200 px-2 sm:px-4">
<p className="text-2xl sm:text-3xl font-extrabold text-writtenly-navy"><AnimatedMetric value="18+" /></p>
<p className="text-xs sm:text-sm text-slate-500 font-medium">Countries</p>
</div>
<div className="text-center lg:text-left">
<p className="text-2xl sm:text-3xl font-extrabold text-writtenly-navy"><AnimatedMetric value="10M+" /></p>
<p className="text-xs sm:text-sm text-slate-500 font-medium">Words Written</p>
</div>
</div>

</div>
{/*  Hero Right Column: 3-field Quick Form  */}
<div className="lg:col-span-5" id="contact-inquiry">
<div className="bg-white text-writtenly-navy rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 relative">

<h3 className="font-display-lg text-2xl font-bold tracking-tight text-writtenly-navy">Get a Content Sprint Quote</h3>
<p className="text-sm text-slate-500 mb-6">Receive a custom scope &amp; sample within 24 hours.</p>
<form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Inquiry received! Our team will contact you shortly.'); }}>
{/*  Field 1: Name  */}
<div>
<label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="hero-name">Your Name</label>
<div className="relative">
<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
<i className="ph ph-user"></i>
</span>
<input className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-writtenly-navy text-sm focus:bg-white focus:ring-2 focus:ring-writtenly-orange focus:border-writtenly-orange outline-none transition" id="hero-name"  required type="text" />
</div>
</div>
{/*  Field 2: Email  */}
<div>
<label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="hero-email">Work Email</label>
<div className="relative">
<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
<i className="ph ph-envelope"></i>
</span>
<input className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-writtenly-navy text-sm focus:bg-white focus:ring-2 focus:ring-writtenly-orange focus:border-writtenly-orange outline-none transition" id="hero-email"  required type="email" />
</div>
</div>
{/*  Field 3: Content Focus  */}
<div>
<label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="hero-focus">Content Focus</label>
<div className="relative">
<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
<i className="ph ph-article"></i>
</span>
<select className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-writtenly-navy text-sm focus:bg-white focus:ring-2 focus:ring-writtenly-orange focus:border-writtenly-orange outline-none transition" id="hero-focus">
<option>SEO Strategy &amp; Long-Form Articles</option>
<option>Executive Ghostwriting &amp; Thought Leadership</option>
<option>Website &amp; High-Intent Landing Page Copy</option>
<option>Omnichannel Content Repurposing</option>
</select>
</div>
</div>
{/*  Form CTA Button  */}
<button className="w-full mt-2 py-2.5 px-5 rounded-lg bg-writtenly-orange hover:bg-orange-600 font-semibold text-white text-sm shadow-md transition-all active:scale-[0.98]" type="submit">
                Request Free Consultation
              </button>
<p className="text-[11px] text-center text-slate-400">No pushy sales. Under strict NDA if required.</p>
</form>
</div>
</div>
</div>
{/*  Hero Category Filter Pills  */}
<div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-medium text-slate-600">
<span className="text-slate-500 uppercase tracking-widest text-[11px] font-medium">Popular Specialties:</span>
<span className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-default">SaaS Bottom-of-Funnel</span>
<span className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-default">FinTech Documentation</span>
<span className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-default">Technical Whitepapers</span>
<span className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-default">Founder LinkedIn Ghostwriting</span>
</div>
</div>
</section>
{/*  END: HeroSection  */}
{/*  BEGIN: BenefitGrid  */}
<section className="py-20 bg-slate-50" data-purpose="benefits-3x2-grid" id="benefits">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-3xl mx-auto mb-16">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          How We Can Benefit You?
        </h2>
<div className="w-16 h-1 bg-writtenly-orange mx-auto mt-4 rounded-full"></div>
<p className="mt-4 text-base sm:text-lg text-slate-600">
          Built from the ground up to eliminate typical agency bottlenecks: low factual accuracy, missed deadlines, and generic AI output.
        </p>
</div>
{/*  Wireframe 3x2 Grid (6 Clean Cards)  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{/*  Benefit Card 1  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-orange-50 text-writtenly-orange flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-users-three"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Domain Subject Matter Writers</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            We pair your account with writers who actually understand your vertical—whether developer APIs, regulatory tech, or supply chain.
          </p>
</div>
{/*  Benefit Card 2  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-magnifying-glass-plus"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Search Intent &amp; Keyword Clusters</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            Every brief is backed by deep SERP analysis, user journey mapping, and keyword clusters to rank and convert target decision-makers.
          </p>
</div>
{/*  Benefit Card 3  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-checks"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Two-Tier Editorial Quality Check</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            Drafts undergo a 2-step review: first by an industry peer for technical accuracy, then by a senior copy editor for tone and readability.
          </p>
</div>
{/*  Benefit Card 4  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-certificate"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">100% Originality &amp; Turnitin Certified</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            Zero plagiarism, zero raw robotic regurgitation. Every piece includes verified Turnitin and originality audit certificates.
          </p>
</div>
{/*  Benefit Card 5  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-clock-countdown"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Reliable Sprint Delivery Timelines</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            Predictable fortnightly or monthly content calendars. Our guaranteed deadlines keep your publishing cadence ahead of competitors.
          </p>
</div>
{/*  Benefit Card 6  */}
<div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
<i className="ph ph-cloud-arrow-up"></i>
</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Direct CMS Publishing Integration</h3>
<p className="text-sm text-slate-600 leading-relaxed">
            We format, tag, and publish directly to Webflow, WordPress, Ghost, or HubSpot with custom featured images and metadata pre-staged.
          </p>
</div>
</div>
</div>
</section>
{/*  END: BenefitGrid  */}
{/*  BEGIN: PricingCalculator  */}
<section className="py-20 bg-white border-y border-slate-200" data-purpose="interactive-pricing-calculator" id="pricing">
<div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-2xl mx-auto mb-14">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          Pricing Calculator
        </h2>
<p className="mt-2 text-slate-600 text-base">
          Transparent, per-word pricing with no hidden retainer traps.
        </p>
</div>
{/*  Two-Column Card Container matching Wireframe 1 & Reference Layout  */}
<div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
{/*  Left Panel: Calculator Controls  */}
<div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-white">
<div className="flex items-center justify-between border-b border-slate-100 pb-4">
<h3 className="font-display-lg text-xl font-bold text-writtenly-navy">Calculate Your Price for Content</h3>
<span className="text-xs bg-orange-100 text-writtenly-orange font-semibold px-2.5 py-1 rounded-full">Self-Serve Estimator</span>
</div>
{/*  Control 1: Content Type  */}
<div>
<label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" htmlFor="calc-type">Content Format</label>
<select className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-writtenly-orange focus:border-writtenly-orange outline-none bg-white" id="calc-type" value={calcType} onChange={(e) => setCalcType(parseFloat(e.target.value))}>
<option value="3.00">SEO Blog Post &amp; Guides (₹ 3.00 / word)</option>
<option value="4.00">Technical Case Studies &amp; Whitepapers (₹ 4.00 / word)</option>
<option value="3.50">Thought Leadership / Founder Op-Eds (₹ 3.50 / word)</option>
<option value="4.50">High-Conversion Landing Page Copy (₹ 4.50 / word)</option>
</select>
</div>
{/*  Control 2: Quantity Slider + Input  */}
<div>
<div className="flex items-center justify-between mb-2">
<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="word-slider">Word Count</label>
<div className="flex items-center gap-2">
<span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Recommended</span>
<span className="text-sm font-bold text-writtenly-navy bg-slate-100 px-3 py-1 rounded-md" id="word-count-display">{new Intl.NumberFormat("en-IN").format(wordCount)} words</span>
</div>
</div>
<input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-writtenly-orange" id="word-slider" max="5000" min="500" step="250" type="range" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value, 10))} />
<div className="flex justify-between text-[11px] text-slate-400 mt-2">
<span className="">500 wds</span>
<span className="">1,500 wds</span>
<span className="">3,000 wds</span>
<span className="">5,000 wds</span>
</div>
</div>
{/*  Control 3: Speed Delivery Options  */}
<div>
<span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Turnaround Speed</span>
<div className="grid grid-cols-2 gap-4">
<label className="flex items-center p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:border-writtenly-orange has-[:checked]:bg-orange-50/50 transition">
<input className="text-writtenly-orange focus:ring-writtenly-orange h-4 w-4" name="speed" type="radio" value="standard" checked={speed === "standard"} onChange={() => setSpeed("standard")} />
<div className="ml-3">
<p className="text-xs font-bold text-writtenly-navy">Standard Delivery</p>
<p className="text-[11px] text-slate-500">3 - 5 business days</p>
</div>
</label>
<label className="flex items-center p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:border-writtenly-orange has-[:checked]:bg-orange-50/50 transition">
<input className="text-writtenly-orange focus:ring-writtenly-orange h-4 w-4" name="speed" type="radio" value="priority" checked={speed === "priority"} onChange={() => setSpeed("priority")} />
<div className="ml-3">
<p className="text-xs font-bold text-writtenly-navy">Priority Sprint</p>
<p className="text-[11px] text-slate-500">48 hours (+15%)</p>
</div>
</label>
</div>
</div>
{/*  Price Callout & CTA  */}
<div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
<div>
<p className="text-xs text-slate-500 font-semibold uppercase">Estimated Total Cost</p>
<div className="flex items-baseline gap-1 mt-1">
<span className="text-3xl sm:text-4xl font-black text-writtenly-navy" id="price-total">₹ {formattedTotal}</span>
<span className="text-xs text-slate-500" id="price-unit-desc">(~₹{effectiveRate} / word)</span>
</div>
</div>
<a className="w-full sm:w-auto px-7 py-3 bg-writtenly-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 text-center transition" href="#contact-inquiry">
              Get Started
            </a>
</div>
</div>
{/*  Right Panel: "What's Included" Wireframe Checklist  */}
<div className="lg:col-span-5 p-6 sm:p-10 bg-brandNavy text-white flex flex-col justify-between">
<div>
<h4 className="text-xl font-bold tracking-tight mb-2">What's Included</h4>
<p className="text-sm text-slate-400 mb-6">Complete end-to-end production with zero surprise charges.</p>
{/*  Checklist Items  */}
<ul className="space-y-4 text-sm text-slate-200">
<li className="flex items-start gap-3">
<div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
<i className="ph ph-check font-bold text-xs"></i>
</div>
<span className="">In-depth search intent mapping &amp; keyword research</span>
</li>
<li className="flex items-start gap-3">
<div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
<i className="ph ph-check font-bold text-xs"></i>
</div>
<span className="">Turnitin &amp; AI originality report attached</span>
</li>
<li className="flex items-start gap-3">
<div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
<i className="ph ph-check font-bold text-xs"></i>
</div>
<span className="">2 rounds of free iterative editorial revisions</span>
</li>
<li className="flex items-start gap-3">
<div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
<i className="ph ph-check font-bold text-xs"></i>
</div>
<span className="">Title tags, meta descriptions, &amp; internal linking</span>
</li>
<li className="flex items-start gap-3">
<div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
<i className="ph ph-check font-bold text-xs"></i>
</div>
<span className="">Dedicated industry editor assigned to your account</span>
</li>
</ul>
</div>
{/*  Bottom Trust Proof  */}
<div className="pt-8 mt-8 border-t border-slate-800">
<div className="flex items-center gap-3">
<div className="flex -space-x-2 overflow-hidden">
<div className="inline-block h-8 w-8 rounded-full ring-2 ring-brandNavy bg-writtenly-orange text-white text-xs font-bold flex items-center justify-center">S</div>
<div className="inline-block h-8 w-8 rounded-full ring-2 ring-brandNavy bg-blue-600 text-white text-xs font-bold flex items-center justify-center">F</div>
<div className="inline-block h-8 w-8 rounded-full ring-2 ring-brandNavy bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">T</div>
</div>
<p className="text-xs text-slate-300">
                Trusted by <strong className="text-white">150+ teams</strong> in SaaS, DevTools, and Modern Tech.
              </p>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  END: PricingCalculator  */}
{/*  BEGIN: ServicesOffered  */}
<section className="py-20 bg-slate-50" data-purpose="services-alternating-rows" id="services">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-3xl mx-auto mb-16">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          Services We Offer
        </h2>
<div className="w-16 h-1 bg-writtenly-orange mx-auto mt-4 rounded-full"></div>
<p className="mt-4 text-base sm:text-lg text-slate-600">
          Precision crafted content formats designed to capture high-intent searches and establish industry leadership.
        </p>
</div>
{/*  Alternating Rows (Matches Wireframe 1 & 2 Blueprint)  */}
<div className="space-y-16">
{/*  Service 1: Left Illustration + Right Text  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200">
<div className="lg:col-span-5 bg-sky-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-sky-100">
<div className="w-20 h-20 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center text-4xl mb-4">
<i className="ph ph-newspaper"></i>
</div>
<span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">Organic Growth Engine</span>
</div>
<div className="lg:col-span-7 space-y-4">
<h3 className="font-display-lg text-2xl font-bold text-writtenly-navy">1. SEO Articles &amp; Long-Form Industry Guides</h3>
<p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Comprehensive 1,500 to 4,000-word guides that target commercial keywords. We build search-engine friendly outlines, weave in primary and semantic LSI keywords, and insert custom charts to ensure high dwell time and zero bounce back to Google.
            </p>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 pt-2">
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Search Intent Optimization</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Competitor Gap Analysis</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Custom Visual Graphics</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Featured Snippet Targets</li>
</ul>
</div>
</div>
{/*  Service 2: Left Text + Right Illustration  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200">
<div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
<h3 className="font-display-lg text-2xl font-bold text-writtenly-navy">2. Executive Thought Leadership &amp; Op-Eds</h3>
<p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Position your founders, CTOs, and product leaders as definitive voices in your niche. Through rapid 30-minute interviews, we extract raw founder perspectives and transform them into ghostwritten Forbes, TechCrunch, and LinkedIn essays.
            </p>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 pt-2">
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Async Voice Capture</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Executive Persona Alignment</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Tier-1 Media Ready Standards</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Viral LinkedIn Formatting</li>
</ul>
</div>
<div className="lg:col-span-5 bg-amber-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-amber-100 order-1 lg:order-2">
<div className="w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-4xl mb-4">
<i className="ph ph-lightbulb-filament"></i>
</div>
<span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Executive Branding</span>
</div>
</div>
{/*  Service 3: Left Illustration + Right Text  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200">
<div className="lg:col-span-5 bg-emerald-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-emerald-100">
<div className="w-20 h-20 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-4xl mb-4">
<i className="ph ph-browsers"></i>
</div>
<span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Conversion Rate Focus</span>
</div>
<div className="lg:col-span-7 space-y-4">
<h3 className="font-display-lg text-2xl font-bold text-writtenly-navy">3. High-Converting Website Copy &amp; Landing Pages</h3>
<p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Turn cold traffic into booked demos and pipeline revenue. We write razor-sharp value propositions, benefit-led headers, and conversion-optimized microcopy for homepage redesigns, product landing pages, and PPC campaigns.
            </p>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 pt-2">
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Clear Value Props</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Objection Preemption</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> High-Intent CTA Testing</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Wireframe-Ready Structure</li>
</ul>
</div>
</div>
{/*  Service 4: Left Text + Right Illustration  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200">
<div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
<h3 className="font-display-lg text-2xl font-bold text-writtenly-navy">4. Omnichannel Content Repurposing Engine</h3>
<p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Extract 5x more leverage from every asset. We take your podcasts, webinars, and hero articles, fragmenting them into multi-slide LinkedIn carousels, newsletter editions, Twitter/X threads, and email nurture drips.
            </p>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 pt-2">
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> 1 Asset = 8 Deliverables</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Newsletter Curations</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Slide Deck Scripts</li>
<li className="flex items-center gap-2"><i className="ph ph-check text-writtenly-orange font-bold"></i> Consistent Brand Voice</li>
</ul>
</div>
<div className="lg:col-span-5 bg-purple-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-purple-100 order-1 lg:order-2">
<div className="w-20 h-20 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-4xl mb-4">
<i className="ph ph-arrows-clockwise"></i>
</div>
<span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">5x Distribution Leverage</span>
</div>
</div>
</div>
</div>
</section>
{/*  END: ServicesOffered  */}
{/*  BEGIN: MidPageBanner  */}
<section className="bg-gradient-to-r from-orange-500 to-amber-500 py-6 sm:py-8 shadow-inner" data-purpose="orange-ribbon-cta">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
<div className="text-white">
<p className="text-lg sm:text-xl font-bold tracking-tight">Ready to scale your content output this quarter?</p>
<p className="text-orange-100 text-sm">Claim a free 5-article content audit &amp; SEO gap review.</p>
</div>
<a className="px-6 py-3 rounded-xl bg-brandNavy text-white hover:bg-slate-900 font-bold text-sm shadow-md transition whitespace-nowrap" href="#contact-inquiry">
          Claim Free Audit
        </a>
</div>
</div>
</section>
{/*  END: MidPageBanner  */}
{/*  BEGIN: ProcessTimeline  */}
<section className="py-20 bg-white" data-purpose="process-timeline-wireframe2" id="timeline">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-2xl mx-auto mb-16">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          Process Timeline
        </h2>
<div className="w-16 h-1 bg-writtenly-orange mx-auto mt-4 rounded-full"></div>
<p className="mt-4 text-slate-600 text-sm sm:text-base">
          From ideation to CMS upload, our 4-step agile sprint keeps stakeholders aligned at every gate.
        </p>
</div>
{/*  Animated/Step Horizontal Process (Wireframe 2 layout)  */}
<div className="relative">
{/*  Connecting Line (Desktop)  */}
<div className="hidden md:block absolute top-8 left-12 right-12 h-1 bg-slate-200 -z-0"></div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
{/*  Step 1  */}
<div className="text-center space-y-3 bg-white p-4">
<div className="w-16 h-16 rounded-2xl bg-brandNavy text-white font-extrabold text-xl flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              01
            </div>
<h3 className="font-display-lg text-base font-bold text-writtenly-navy">Discovery &amp; Strategy</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              We audit existing rankings, target ICP persona pain points, and define monthly cluster objectives.
            </p>
</div>
{/*  Step 2  */}
<div className="text-center space-y-3 bg-white p-4">
<div className="w-16 h-16 rounded-2xl bg-writtenly-orange text-white font-extrabold text-xl flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              02
            </div>
<h3 className="font-display-lg text-base font-bold text-writtenly-navy">Outline Approval</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Detailed briefs with H2/H3 headers, target search terms, and references sent for quick client sign-off.
            </p>
</div>
{/*  Step 3  */}
<div className="text-center space-y-3 bg-white p-4">
<div className="w-16 h-16 rounded-2xl bg-brandNavy text-white font-extrabold text-xl flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              03
            </div>
<h3 className="font-display-lg text-base font-bold text-writtenly-navy">Drafting &amp; Review</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Subject matter writers craft the draft followed by internal senior copy editing and fact validation.
            </p>
</div>
{/*  Step 4  */}
<div className="text-center space-y-3 bg-white p-4">
<div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              04
            </div>
<h3 className="font-display-lg text-base font-bold text-writtenly-navy">QA &amp; CMS Delivery</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Turnitin plagiarism check, meta-tag staging, and direct upload into your CMS ready to publish.
            </p>
</div>
</div>
</div>
</div>
</section>
{/*  END: ProcessTimeline  */}
{/*  BEGIN: IndustriesAndClients  */}
<section className="py-16 bg-slate-100 border-y border-slate-200" data-purpose="industries-and-logos">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
{/*  Industries Badges  */}
<div className="text-center mb-10">
<h3 className="font-display-lg text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Industries We Specialize In</h3>
<div className="flex flex-wrap items-center justify-center gap-3">
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-cpu text-writtenly-orange"></i> B2B SaaS
          </span>
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-bank text-emerald-600"></i> FinTech
          </span>
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-graduation-cap text-blue-600"></i> EdTech
          </span>
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-heartbeat text-rose-500"></i> HealthTech
          </span>
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-terminal-window text-purple-600"></i> DevTools &amp; Cloud
          </span>
<span className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 font-semibold text-sm flex items-center gap-2">
<i className="ph ph-shopping-bag text-amber-500"></i> Modern E-Commerce
          </span>
</div>
</div>
{/*  Companies / Client Logos Strip  */}
<div className="pt-8 border-t border-slate-200/80">
<p className="text-center text-xs uppercase tracking-widest text-slate-400 font-medium mb-6">Trusted by Growth Leaders Globally</p>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition duration-300">
<div className="font-black text-lg text-slate-700 tracking-tighter">HYPERSCALE<span className="text-writtenly-orange">.IO</span></div>
<div className="font-extrabold text-lg text-slate-700 tracking-tight">KUBEFENCE</div>
<div className="font-black text-lg text-slate-700 tracking-wide">FINVERA</div>
<div className="font-bold text-lg text-slate-700 tracking-tight">TALENTFLOW</div>
<div className="font-black text-lg text-slate-700 tracking-tighter">PULSE<span className="text-blue-500">AI</span></div>
<div className="font-bold text-lg text-slate-700 tracking-tight">DEVSPARK</div>
</div>
</div>
</div>
</section>
{/*  END: IndustriesAndClients  */}
{/*  BEGIN: AdvantageSection  */}
<section className="py-20 bg-white" data-purpose="the-wh-advantage-4-columns" id="advantage">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-2xl mx-auto mb-16">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          The WrittenlyHub Advantage
        </h2>
<div className="w-16 h-1 bg-writtenly-orange mx-auto mt-4 rounded-full"></div>
<p className="mt-4 text-slate-600 text-sm sm:text-base">
          Why leading CMOs and heads of demand generation switch their content retainers to us.
        </p>
</div>
{/*  4 Columns Card Grid (Wireframe 2)  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Card 1  */}
<div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-writtenly-orange transition">
<div className="text-2xl font-black text-slate-300 mb-4">01</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Zero AI Fluff</h3>
<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We don't sell unedited ChatGPT outputs. Every article contains proprietary analysis, real expert quotes, and nuanced industry insights.
          </p>
</div>
{/*  Card 2  */}
<div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-writtenly-orange transition">
<div className="text-2xl font-black text-slate-300 mb-4">02</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Dedicated Editor</h3>
<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            One single point of contact who acts as your in-house managing editor, guarding your brand tone and voice guidelines zealously.
          </p>
</div>
{/*  Card 3  */}
<div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-writtenly-orange transition">
<div className="text-2xl font-black text-slate-300 mb-4">03</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Revenue Focus</h3>
<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We prioritize keywords that drive demos, signups, and trial activations—not empty vanity traffic that bounces after 3 seconds.
          </p>
</div>
{/*  Card 4  */}
<div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-writtenly-orange transition">
<div className="text-2xl font-black text-slate-300 mb-4">04</div>
<h3 className="font-display-lg text-lg font-bold text-writtenly-navy mb-2">Elastic Scalability</h3>
<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you need 4 articles this month or 40 articles for an aggressive funding launch, ramp up or down without penalty fees.
          </p>
</div>
</div>
</div>
</section>
{/*  END: AdvantageSection  */}
{/*  BEGIN: TestimonialsSection  */}
<section className="py-20 bg-brandNavy text-white" data-purpose="testimonials-video-scroll" id="case-studies">
<div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-writtenly-orange text-xs font-bold uppercase tracking-wider">Social Proof</span>
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
          Client Stories &amp; Testimonials
        </h2>
<p className="mt-3 text-slate-400 text-sm sm:text-base">
          Real results achieved for high-growth tech ventures across North America, Europe, and Asia.
        </p>
</div>
{/*  Testimonial Spotlight Container  */}
<div className="max-w-4xl mx-auto bg-brandNavyLight rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
{/*  Mock Video Player Thumbnail (Wireframe 2 & 3: [videos] (scroll))  */}
<div className="md:col-span-6 relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 aspect-video flex items-center justify-center group cursor-pointer">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
{/*  Video Play Button  */}
<div className="relative z-10 w-16 h-16 rounded-full bg-writtenly-orange/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-writtenly-orange transition-transform">
<i className="ph ph-play-fill text-2xl ml-1"></i>
</div>
{/*  Video Label  */}
<div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-200">
<span className="font-medium">Watch: SaaS Scaled to 350k Mo. Visits</span>
<span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">03:14</span>
</div>
</div>
{/*  Testimonial Quote & Metrics  */}
<div className="md:col-span-6 space-y-5">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
<i className="ph ph-trend-up"></i> +291% Organic Traffic in 6 Mos
            </div>
<p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
              "WrittenlyHub transformed our blog from a deserted graveyard into our primary pipeline driver. Their writers grasp complex cloud infrastructure concepts with minimal revision cycles."
            </p>
<div className="pt-2 border-t border-slate-700 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-writtenly-orange text-white font-bold flex items-center justify-center text-sm">
                MK
              </div>
<div>
<p className="text-sm font-bold text-white leading-tight">Marcus Keller</p>
<p className="text-xs text-slate-400">Head of Growth, DevCloud Inc.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  END: TestimonialsSection  */}
{/*  BEGIN: PastWorkCTA  */}
<section className="py-12 bg-white" data-purpose="check-out-past-work-banner">
<div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
{/*  Wireframe 3: "CTA - Check out our past work"  */}
<div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 sm:p-12 text-center bg-slate-50 hover:bg-orange-50/20 transition flex flex-col sm:flex-row items-center justify-between gap-6">
<div className="text-left">
<span className="text-xs font-bold uppercase tracking-wider text-writtenly-orange">Proof in the Pudding</span>
<h3 className="font-display-lg text-2xl font-bold text-writtenly-navy mt-1">Check Out Our Past Work</h3>
<p className="text-sm text-slate-600 mt-1">Browse un-gated samples of live articles ranking on Page 1 for client targets.</p>
</div>
<a className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-sm whitespace-nowrap transition shadow-md" href="#contact-inquiry">
          Explore Portfolio Archive →
        </a>
</div>
</div>
</section>
{/*  END: PastWorkCTA  */}
{/*  BEGIN: FAQSection  */}
<section className="py-20 bg-slate-50 border-t border-slate-200" data-purpose="faq-accordion-wireframe3" id="faq">
<div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
<div className="text-center mb-14">
<h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-writtenly-navy tracking-tight">
          Frequently Asked Questions
        </h2>
<div className="w-16 h-1 bg-writtenly-orange mx-auto mt-4 rounded-full"></div>
<p className="mt-4 text-slate-600 text-sm sm:text-base">Everything you need to know about working with WrittenlyHub.</p>
</div>
{/*  FAQ Accordion List  */}
<div className="space-y-4">
{/*  FAQ Item 1  */}
<div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
<button className="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between font-bold text-writtenly-navy hover:text-writtenly-orange transition">
<span className="">How do you ensure domain accuracy in complex technical niches?</span>
<i className="ph ph-caret-down text-lg transition-transform duration-200"></i>
</button>
<div className="faq-content hidden px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            We rigorously screen our writers for niche competency. For topics like DevOps, FinTech, or AI architecture, we deploy writers who are active engineers or technical writers. Furthermore, every draft is peer-reviewed by an editor with specific domain familiarity before it reaches your desk.
          </div>
</div>
{/*  FAQ Item 2  */}
<div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
<button className="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between font-bold text-writtenly-navy hover:text-writtenly-orange transition">
<span className="">What is your typical turnaround time for a 2,000-word piece?</span>
<i className="ph ph-caret-down text-lg transition-transform duration-200"></i>
</button>
<div className="faq-content hidden px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            Our standard turnaround is 3 to 5 business days from outline approval. For rapid launch schedules or breaking product updates, we offer priority 48-hour sprint turnaround options.
          </div>
</div>
{/*  FAQ Item 3  */}
<div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
<button className="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between font-bold text-writtenly-navy hover:text-writtenly-orange transition">
<span className="">Are revisions included in the calculated price?</span>
<i className="ph ph-caret-down text-lg transition-transform duration-200"></i>
</button>
<div className="faq-content hidden px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            Yes, every single order includes up to 2 iterative revision rounds free of charge within 14 days of delivery, ensuring the copy aligns flawlessly with your company's tone and requirements.
          </div>
</div>
{/*  FAQ Item 4  */}
<div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
<button className="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between font-bold text-writtenly-navy hover:text-writtenly-orange transition">
<span className="">Can you directly publish to our Webflow or WordPress CMS?</span>
<i className="ph ph-caret-down text-lg transition-transform duration-200"></i>
</button>
<div className="faq-content hidden px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            Absolutely. We regularly work inside client CMS environments (Webflow, WordPress, Ghost, HubSpot). We set up proper typography tags, embed custom visuals, compress images, input meta-titles, and leave the post as a draft for final one-click publication.
          </div>
</div>
{/*  FAQ Item 5  */}
<div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
<button className="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between font-bold text-writtenly-navy hover:text-writtenly-orange transition">
<span className="">How does your pricing scale for bulk monthly commitments?</span>
<i className="ph ph-caret-down text-lg transition-transform duration-200"></i>
</button>
<div className="faq-content hidden px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            For teams publishing over 15,000 words per month, we offer dedicated volume tiers that include complementary SEO cluster strategy sessions, custom infographics, and direct Slack channel access with your managing editor.
          </div>
</div>
</div>
</div>
</section>
{/*  END: FAQSection  */}
{/*  BEGIN: FinalCTA  */}
<section className="py-20 bg-brandNavy text-white relative overflow-hidden" data-purpose="final-call-to-action">
<div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 text-center relative z-10 space-y-8">
<h2 className="font-display-lg text-3xl sm:text-5xl font-black tracking-tight leading-tight">
        Ready to Dominate Search &amp; Win High-Value Buyers?
      </h2>
<p className="text-slate-300 text-lg max-w-2xl mx-auto">
        Join 150+ tech leaders who trust WrittenlyHub to drive pipeline and search dominance month after month.
      </p>
<div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
<a className="w-full sm:w-auto px-9 py-4 rounded-xl bg-writtenly-orange text-white font-bold text-lg hover:bg-orange-600 shadow-xl shadow-orange-500/30 transition transform hover:-translate-y-0.5" href="#contact-inquiry">
          Get Started with WrittenlyHub
        </a>
<a className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 text-slate-200 font-bold text-base hover:bg-slate-700 transition" href="#pricing">
          Recalculate Estimate
        </a>
</div>
</div>
</section>
{/*  END: FinalCTA  */}

      </div>
    </>
  );
}
