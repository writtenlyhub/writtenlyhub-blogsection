import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WrittenlyHub vs Competitors | Compare',
  description: 'See how WrittenlyHub compares to other content platforms.',
};

const comparisonData = [
  {
    id: 1,
    title: "PRICING & SEATS",
    subtitle: "Predictable flat rate vs seat penalties",
    features: [
      {
        name: "Starting price",
        desc: "Entry-level baseline cost",
        wh: { value: "$49 / month", desc: "Full core feature access for growing teams", color: "text-writtenly-navy font-extrabold text-xl" },
        comp: { value: "$99+ / month", desc: "Limited feature tier requiring quick upgrade", color: "text-slate-700 text-xl" }
      },
      {
        name: "Free plan / trial",
        desc: "Test drive without commitment",
        wh: { value: "✓ 14-day full feature trial", desc: "No credit card required to explore", color: "text-emerald-700 font-bold" },
        comp: { value: "– 7-day trial or limited sandbox", desc: "Credit card mandatory on signup", color: "text-slate-500 font-semibold" }
      },
      {
        name: "Per-user pricing & seats",
        desc: "Seat expansion friction",
        wh: { value: "Generous seat bundles + Free guest review", desc: "Clients and reviewers can comment and approve at $0", color: "text-writtenly-navy font-black" },
        comp: { value: "$25–$40 /user/mo", desc: "Bills for every viewer or editor seat", color: "text-slate-600 font-semibold" }
      }
    ]
  },
  {
    id: 2,
    title: "COMMERCIAL TRANSPARENCY",
    subtitle: "No hidden fees or surprise invoices",
    features: [
      {
        name: "Hidden or additional fees",
        desc: "Surprise charges on invoices",
        wh: { value: "✓ $0 hidden charges", desc: "No API overage penalties, no export fees", color: "text-emerald-700 font-bold" },
        comp: { value: "✕ Frequent token & storage add-ons", desc: "Extra costs for advanced export formats", color: "text-rose-600 font-semibold" }
      },
      {
        name: "Pricing transparency",
        desc: "Clarity before purchasing",
        wh: { value: "10 / 10", desc: "Public pricing matrix with predictable billing", color: "text-writtenly-navy font-extrabold text-lg" },
        comp: { value: "6 / 10", desc: "Requires sales call for custom tier limits", color: "text-slate-700 font-semibold text-lg" }
      }
    ]
  },
  {
    id: 3,
    title: "CORE PLATFORM & AI WORKFLOW",
    subtitle: "End-to-end editorial capability",
    features: [
      {
        name: "AI content generation",
        desc: "Brand-trained generative models",
        wh: { value: "✓ Multi-model AI (GPT-4o, Claude 3.5, Gemini Pro)", desc: "Contextualized with custom voice & brand memory", color: "text-emerald-700 font-bold" },
        comp: { value: "– Single model wrapper or basic prompts", desc: "Generic outputs with frequent token throttles", color: "text-slate-500 font-semibold" }
      },
      {
        name: "Native SEO & SERP optimization",
        desc: "Real-time keyword intent scoring",
        wh: { value: "✓ Real-time content grading & intent clustering", desc: "Integrated keyword volume, LSI terms & readability scoring", color: "text-emerald-700 font-bold" },
        comp: { value: "✕ Requires separate Surfer/Semrush plugin", desc: "No native competitive SERP analysis included", color: "text-rose-600 font-semibold" }
      },
      {
        name: "Automated content briefs",
        desc: "Writer guidance blueprints",
        wh: { value: "✓ 1-click competitor brief generator", desc: "Generates H2/H3 scaffolds, research questions & citations", color: "text-emerald-700 font-bold" },
        comp: { value: "– Manual template builder", desc: "Basic outline generator without SERP insights", color: "text-slate-500 font-semibold" }
      }
    ]
  },
  {
    id: 4,
    title: "DISTRIBUTION & ANALYTICS",
    subtitle: "Post-publish workflow & tracking",
    features: [
      {
        name: "Omni-channel repurposing",
        desc: "Transform long-form into assets",
        wh: { value: "✓ Convert 1 article into 15+ formats", desc: "Auto-creates LinkedIn carousels, X threads & email digests", color: "text-emerald-700 font-bold" },
        comp: { value: "✕ Limited or manual copy-paste workflow", desc: "Requires third-party repurposing tools", color: "text-rose-600 font-semibold" }
      },
      {
        name: "Performance analytics & ROI",
        desc: "Post-publish impact tracking",
        wh: { value: "✓ Integrated Google Search Console sync", desc: "Tracks ranking shifts, traffic velocity & conversion rates", color: "text-emerald-700 font-bold" },
        comp: { value: "– Basic pageview counts only", desc: "No attribution reporting or organic growth modeling", color: "text-slate-500 font-semibold" }
      }
    ]
  },
  {
    id: 5,
    title: "EDITORIAL WORKFLOW & AUTOMATION",
    subtitle: "Ideation to production cycle time",
    features: [
      {
        name: "Approval stage gates",
        desc: "Multi-tier sign-off controls",
        wh: { value: "✓ Customizable multi-stage approvals", desc: "Draft → Legal / Compliance → SEO Check → Client Sign-off", color: "text-emerald-700 font-bold" },
        comp: { value: "– Linear single-approver status", desc: "Rigid workflow without conditional steps", color: "text-slate-500 font-semibold" }
      },
      {
        name: "Automated 1-click publishing",
        desc: "Push directly into production CMS",
        wh: { value: "✓ Direct formatted webhook & CMS push", desc: "Preserves headings, image alt-tags & meta schemas perfectly", color: "text-emerald-700 font-bold" },
        comp: { value: "– Manual copy/paste or basic HTML export", desc: "Frequent formatting breaks when transferring to CMS", color: "text-slate-500 font-semibold" }
      }
    ]
  },
  {
    id: 6,
    title: "ECOSYSTEM & CMS INTEGRATIONS",
    subtitle: "Seamless stack connectivity",
    features: [
      {
        name: "CMS connectivity",
        desc: "WordPress, Webflow, Ghost, Shopify",
        wh: { value: "✓ 30+ native 2-way CMS connectors", desc: "Includes Webflow collections, WordPress REST, Shopify blogs", color: "text-emerald-700 font-bold" },
        comp: { value: "– WordPress & Webflow only", desc: "Requires Zapier middleware for custom headless stacks", color: "text-slate-500 font-semibold" }
      },
      {
        name: "Developer API & webhooks",
        desc: "Headless programmatic generation",
        wh: { value: "✓ Full REST & GraphQL APIs included", desc: "No separate enterprise paywall for programmatic creation", color: "text-emerald-700 font-bold" },
        comp: { value: "✕ Locked behind Enterprise tier", desc: "High threshold minimum contract for API keys", color: "text-rose-600 font-semibold" }
      }
    ]
  },
  {
    id: 7,
    title: "TEAM COLLABORATION & AGENCY SCALING",
    subtitle: "Multi-tenant client workspaces",
    features: [
      {
        name: "Client & guest portals",
        desc: "Isolated client review spaces",
        wh: { value: "✓ Dedicated white-label portals", desc: "Clients can review and sign off with your agency domain", color: "text-emerald-700 font-bold" },
        comp: { value: "✕ Shared login or extra client seat fees", desc: "No white-label client portal capability", color: "text-rose-600 font-semibold" }
      },
      {
        name: "Real-time multiplayer editing",
        desc: "Simultaneous multi-writer cursor",
        wh: { value: "✓ Live multi-cursor & threaded comments", desc: "Zero file locking conflicts or overwritten drafts", color: "text-emerald-700 font-bold" },
        comp: { value: "– Asynchronous draft checking", desc: "Frequent document locks when one team member edits", color: "text-slate-500 font-semibold" }
      }
    ]
  },
  {
    id: 8,
    title: "CUSTOMER SUCCESS & SERVICE LEVEL",
    subtitle: "Real human response times",
    features: [
      {
        name: "Support access & speed",
        desc: "Average live chat turnaround",
        wh: { value: "< 15 min live chat response", desc: "Direct access to editorial and technical specialists", color: "text-writtenly-navy font-black text-lg" },
        comp: { value: "24–48 hour ticket backlog", desc: "Automated chatbot barrier on non-enterprise tiers", color: "text-slate-700 font-semibold text-lg" }
      },
      {
        name: "Onboarding & migration",
        desc: "Switching friction support",
        wh: { value: "✓ 1-on-1 guided migration assistance", desc: "We import your existing content templates and brand voice", color: "text-emerald-700 font-bold" },
        comp: { value: "– Self-serve docs only", desc: "Paid onboarding packages start at $1,500+", color: "text-slate-500 font-semibold" }
      }
    ]
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Switching to WrittenlyHub completely transformed our content pipeline. We retired three fragmented tools and doubled our publishing velocity without adding headcount.",
    author: "Sarah Jenkins",
    role: "VP of Marketing, CloudOps Tech",
    image: "/images/bento/bento2.png"
  },
  {
    id: 2,
    quote: "The live SERP optimization alone is worth the investment. We've seen a 291% increase in organic traffic since migrating our entire editorial team to this unified workspace.",
    author: "David Chen",
    role: "Head of Content, upGrad Abroad",
    image: "/images/bento/bento1.png"
  },
  {
    id: 3,
    quote: "Finally, a platform that understands enterprise compliance. Our financial literacy funnels are now scaling faster and safer than ever before thanks to the built-in guardrails.",
    author: "Michael Ross",
    role: "CMO, FinServ Capital",
    image: "/images/bento/bento3.png"
  },
  {
    id: 4,
    quote: "WrittenlyHub bridges the gap between our strategists, writers, and compliance officers seamlessly. It's not just a tool, it's a completely optimized methodology.",
    author: "Elena Rodriguez",
    role: "Director of SEO, SaaS Growth",
    image: "/images/bento/bento4.png"
  }
];

export default function ComparePage() {
  return (
    <main className="w-full relative">







      <section id="hero" className="relative py-16 lg:py-20 bg-white">
        <div className="max-w-[1150px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-stretch">


            <div className="lg:col-span-7 flex flex-col lg:pt-6 pb-2">



              <div className="my-auto py-6 lg:py-8">
                {/* Comparison illustration badge */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                  <Image
                    src="/images/compare-vs.png"
                    alt="WrittenlyHub vs Competitors Comparison"
                    width={280}
                    height={180}
                    priority
                    className="h-28 sm:h-32 md:h-36 w-auto object-contain -ml-2"
                  />
                </div>

                <h1 className="text-display-lg font-display-lg text-writtenly-navy mb-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                  Writtenly<span className="text-writtenly-orange">Hub</span> vs [Competitor]
                </h1>

                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Compare pricing, AI workflows, collaboration, and publishing in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <a href="#table" className="inline-flex shrink-0 items-center justify-center px-7 py-3.5 rounded-full bg-writtenly-orange hover:bg-[#e65005] text-white text-sm font-bold shadow-sm transition-colors text-center">
                    Get Started with WrittenlyHub
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </a>
                  
                  <div className="hidden sm:flex items-center ml-2 shrink-0">
                    <svg className="w-12 h-10 text-[#3b2e5a] mt-1 -ml-1 transform -rotate-6" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M85 45 C 60 65, 30 55, 10 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M84 44 C 62 66, 28 54, 11 41" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" className="opacity-60" />
                      <path d="M10 40 C 20 40, 25 30, 28 25 M10 40 C 15 48, 18 55, 20 60" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-['Caveat',_cursive] text-[#3b2e5a] text-[20px] md:text-[24px] tracking-wide whitespace-nowrap mt-1 transform -rotate-2 -ml-2">
                      We get booked fast🔥
                    </span>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-t border-slate-100 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">Comparing</p>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                      <img src="/images/logos/bird-accent.svg" alt="WrittenlyHub Icon" className="h-8 sm:h-9 w-auto" />
                    </div>
                    <span className="text-slate-300 font-bold text-sm">VS</span>
                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity">
                      <span className="font-bold text-slate-500 text-lg sm:text-xl tracking-tight">[Competitor Logo]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-5 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-outline-variant/60 shadow-[0_12px_35px_rgba(0,27,61,0.08),0_4px_12px_rgba(0,0,0,0.03)]">
                <h2 className="text-[22px] sm:text-[26px] font-bold text-writtenly-navy text-center leading-tight mb-6">
                  How much are you losing to <span className="text-writtenly-orange">[Competitor]</span> platform fees?
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[15px] font-semibold text-writtenly-navy mb-1">
                      Annual Spending Amount
                    </label>
                    <p className="text-[13px] text-slate-500 mb-2">
                      Total amount you spend on the platform in a year.
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. 10,000"
                        className="w-full h-12 pl-4 pr-16 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-writtenly-orange/50 focus:border-writtenly-orange text-[15px] transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-600">
                        ($) USD
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-writtenly-navy mb-1">
                      Average Project Size
                    </label>
                    <p className="text-[13px] text-slate-500 mb-2">
                      Optional: Helps calculate how much you lose per project.
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. 100"
                        className="w-full h-12 pl-4 pr-16 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-writtenly-orange/50 focus:border-writtenly-orange text-[15px] transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-slate-600">
                        ($) USD
                      </span>
                    </div>
                  </div>

                  <button type="button" className="w-full py-3 rounded-xl bg-writtenly-orange hover:bg-[#e65005] text-white text-[15px] font-bold transition-colors mt-2">
                    Discover What You're Losing
                  </button>

                  <p className="text-[12px] text-slate-500 text-center mt-4 leading-relaxed">
                    We use standard competitor platform fees for this calculation. This doesn't include their monthly subscription or premium add-on options.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>






      <section id="table" className="py-24 bg-surface-container-lowest relative scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-label-md text-label-md text-[#F4772B] uppercase tracking-widest font-bold mb-3 block text-xs md:text-sm">
              COMPARE FEATURES
            </span>
            <h2 className="font-display-lg text-3xl md:text-4xl lg:text-[42px] leading-tight mb-4 text-center w-full">
              <span className="text-[#F4772B] font-extrabold">WrittenlyHub</span>
              <span className="text-writtenly-navy font-bold mx-2.5 md:mx-3 text-2xl md:text-3xl opacity-80">vs</span>
              <span className="text-writtenly-navy font-extrabold">[Competitor]</span>
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant font-body mt-2 max-w-xl mx-auto">
              See how the two platforms compare across the features that matter most to your team.
            </p>
          </div>

          {/* Master Comparison Table */}
          <div className="relative pb-16">
            {/* Top Brand Logo Header Cards (protruding above the category bar) */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-end">
              {/* Col 1: Empty space above Category 1 */}
              <div className="hidden md:block"></div>

              {/* Col 2: WrittenlyHub Elevated Card (Soft Light Orange #FFF0E5) */}
              <div className="bg-[#FFF0E5] rounded-t-2xl md:rounded-t-3xl pt-5 pb-4 px-5 flex items-center justify-center border-t border-x border-[#E1E6EF]">
                <div className="flex items-center justify-center gap-2.5">
                  <img src="/images/logos/bird-accent.svg" alt="WrittenlyHub Icon" className="h-6 sm:h-7 w-auto" />
                  <span className="text-lg sm:text-[21px] font-black tracking-tight text-writtenly-navy">
                    Writtenly<span className="text-[#F4772B]">Hub</span>
                  </span>
                </div>
              </div>

              {/* Col 3: Competitor Elevated Card */}
              <div className="bg-white rounded-t-2xl md:rounded-t-3xl pt-5 pb-4 px-5 flex items-center justify-center border-t border-x border-[#E1E6EF]">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg border border-[#E1E6EF] bg-[#F8FAFC] shadow-xs">
                  <span className="w-4 h-4 rounded border border-[#E1E6EF] bg-white flex items-center justify-center text-slate-400 font-bold text-[10px]">
                    VS
                  </span>
                  <span className="text-sm sm:text-[16px] font-bold text-writtenly-navy tracking-tight">
                    [Competitor]
                  </span>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="border border-[#E1E6EF] rounded-b-2xl md:rounded-b-3xl md:rounded-tl-2xl overflow-hidden shadow-sm bg-white">
              {comparisonData.map((category, index) => (
                <div key={category.id} className="flex flex-col">
                  {/* Category Bar - Exact Navbar Color (bg-writtenly-navy) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 bg-writtenly-navy text-white">
                    {/* Col 1: Category Name */}
                    <div className={`p-4 md:p-5 flex items-center border-b md:border-b-0 md:border-r border-white/10 ${index === 0 ? 'md:rounded-tl-2xl' : ''}`}>
                      <h3 className="text-sm md:text-[16px] font-bold flex items-center gap-2.5 text-white">
                        <svg className="w-5 h-5 opacity-90 shrink-0 text-[#F4772B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {index === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          )}
                        </svg>
                        {category.title}
                      </h3>
                    </div>

                    {/* Col 2: WrittenlyHub Category Summary */}
                    <div className="p-4 md:p-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                      {index === 0 ? (
                        <>
                          <div className="text-2xl md:text-[25px] font-black text-white mb-1 tracking-tight">
                            <span className="text-[#F4772B]">$49</span> <span className="text-xs font-normal text-white/80">/ month</span>
                          </div>
                          <div className="text-xs md:text-[12px] font-medium text-white/95 flex items-center gap-1.5 justify-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#45B982] flex items-center justify-center text-white shrink-0">
                              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                            <span>{category.subtitle}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs md:text-[12px] font-medium text-white/95 flex items-center gap-1.5 justify-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#45B982] flex items-center justify-center text-white shrink-0">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </div>
                          <span>{category.subtitle}</span>
                        </div>
                      )}
                    </div>

                    {/* Col 3: Competitor Category Summary */}
                    <div className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
                      {index === 0 ? (
                        <>
                          <div className="text-2xl md:text-[25px] font-bold text-white mb-1 tracking-tight">
                            $99+ <span className="text-xs font-normal text-white/80">/ month</span>
                          </div>
                          <div className="text-xs md:text-[12px] font-medium text-white/95 flex items-center gap-1.5 justify-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#E86C6C] flex items-center justify-center text-white shrink-0">
                              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </div>
                            <span>Legacy alternative with seat penalties</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs md:text-[12px] font-medium text-white/95 flex items-center gap-1.5 justify-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#E86C6C] flex items-center justify-center text-white shrink-0">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                          </div>
                          <span>Legacy alternative limitations</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Table Body (Features) */}
                  <div className="flex flex-col">
                    {category.features.map((feature, fIdx) => (
                      <div key={fIdx} className="grid grid-cols-1 md:grid-cols-3 border-t border-[#E1E6EF]">
                        
                        {/* Feature Name */}
                        <div className="p-4 md:p-5 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E1E6EF]">
                          <div className="text-[13px] md:text-[14px] text-writtenly-navy font-semibold">
                            {feature.name}
                          </div>
                          {feature.desc && (
                            <div className="text-[10px] md:text-[11px] text-slate-500 mt-0.5">
                              {feature.desc}
                            </div>
                          )}
                        </div>

                        {/* WrittenlyHub Value (Continuous Soft Light Orange #FFF0E5 background) */}
                        <div className="p-4 md:p-5 bg-[#FFF0E5] border-b md:border-b-0 md:border-r border-[#E1E6EF] flex flex-col justify-center">
                          <div className="flex flex-col gap-2">
                            {feature.wh.value && !feature.wh.value.startsWith('✓') && !feature.wh.value.startsWith('✕') && !feature.wh.value.startsWith('–') && (
                              <div className="text-lg md:text-[21px] font-extrabold text-writtenly-navy text-center mb-0.5">
                                {feature.wh.value.includes('$') ? (
                                  <>
                                    <span className="text-[#F4772B]">{feature.wh.value.split(' ')[0]}</span>{' '}
                                    <span className="text-xs md:text-sm font-medium text-writtenly-navy/80">{feature.wh.value.substring(feature.wh.value.indexOf(' ') + 1)}</span>
                                  </>
                                ) : (
                                  feature.wh.value
                                )}
                              </div>
                            )}
                            <div className="flex items-start gap-2.5">
                              <div className="mt-0.5 shrink-0 w-[15px] h-[15px] rounded-full bg-[#45B982] flex items-center justify-center text-white">
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              </div>
                              <div className="text-writtenly-navy leading-relaxed text-[11px] md:text-[12px]">
                                {(feature.wh.value.startsWith('✓') || feature.wh.value.startsWith('✕') || feature.wh.value.startsWith('–')) && (
                                  <span className="font-bold text-writtenly-navy mr-1.5">{feature.wh.value.replace(/^[✓✕–]\s*/, '')}</span>
                                )}
                                {feature.wh.desc}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Competitor Value (#FFFFFF Background) */}
                        <div className="p-4 md:p-5 bg-white flex flex-col justify-center">
                          <div className="flex flex-col gap-2">
                            {feature.comp.value && !feature.comp.value.startsWith('✓') && !feature.comp.value.startsWith('✕') && !feature.comp.value.startsWith('–') && (
                              <div className="text-lg md:text-[21px] font-bold text-writtenly-navy text-center mb-0.5">
                                {feature.comp.value}
                              </div>
                            )}
                            <div className="flex items-start gap-2.5">
                              <div className={`mt-0.5 shrink-0 w-[15px] h-[15px] rounded-full flex items-center justify-center text-white ${feature.comp.value.startsWith('✓') ? 'bg-[#45B982]' : 'bg-[#E86C6C]'}`}>
                                {feature.comp.value.startsWith('✓') ? (
                                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                ) : (
                                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                )}
                              </div>
                              <div className="text-slate-600 leading-relaxed text-[11px] md:text-[12px]">
                                {(feature.comp.value.startsWith('✓') || feature.comp.value.startsWith('✕') || feature.comp.value.startsWith('–')) && (
                                  <span className="font-semibold text-slate-800 mr-1.5">{feature.comp.value.replace(/^[✓✕–]\s*/, '')}</span>
                                )}
                                {feature.comp.desc}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>





      <section id="ui-preview" className="bg-white py-16 md:py-24">
        <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-12">

            <div className="flex flex-col items-center text-center">
              <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
                MODERN PRODUCT EXPERIENCE
              </span>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
                <span className="text-[#fd5a0a] font-extrabold">The</span>
                <span className="text-[#001b3d] font-extrabold">Product Experience</span>
              </h2>
              <p className="text-on-surface-variant font-body text-lg max-w-3xl mx-auto leading-relaxed mt-2">
                While [Competitor] relies on fragmented screens and external browser extensions, WrittenlyHub integrates editorial composition, live SERP optimization, brand guideline enforcement, and automated publishing into a singular, fluid canvas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] mt-8">
              {/* Box 1 (Spans 2 columns) */}
              <div className="md:col-span-2 relative bg-white rounded-3xl shadow-lg border border-border-subtle overflow-hidden group">
                <Image src="/images/bento/bento1.png" alt="Strategic Approach Visual" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>

              {/* Box 2 (Spans 1 column, 2 rows) */}
              <div className="md:col-span-1 md:row-span-2 relative bg-white rounded-3xl shadow-lg border border-border-subtle overflow-hidden group">
                <Image src="/images/bento/bento2.png" alt="Strategy Execution Visual" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>

              {/* Box 3 */}
              <div className="md:col-span-1 relative bg-white rounded-3xl shadow-lg border border-border-subtle overflow-hidden group">
                <Image src="/images/bento/bento3.png" alt="High-Intent Mapping Visual" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>

              {/* Box 4 */}
              <div className="md:col-span-1 relative bg-white rounded-3xl shadow-lg border border-border-subtle overflow-hidden group">
                <Image src="/images/bento/bento4.png" alt="Content Ecosystem Visual" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>











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
            <a href="#demo" className="mt-6 text-sm font-bold text-writtenly-orange hover:text-writtenly-orange-hover flex items-center gap-1">
              Explore all case studies →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:px-12 xl:px-16">

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

      {/* Testimonial Section */}
      <section className="py-20 md:py-32 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
        {/* Modern ambient gradients */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-writtenly-orange/[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-writtenly-navy/[0.04] rounded-full blur-3xl pointer-events-none"></div>

        <style dangerouslySetInnerHTML={{
          __html: `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 50s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-writtenly-navy/[0.03] border border-writtenly-navy/[0.06] text-[11px] font-bold text-writtenly-navy uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-writtenly-orange"></span>
            Customer Success
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
            <span className="text-[#fd5a0a] font-extrabold">Trusted by</span>
            <span className="text-[#001b3d] font-extrabold">top teams</span>
          </h2>
        </div>

        <div className="flex overflow-hidden relative z-10 w-full group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pb-8 pt-4">
          <div className="flex w-max animate-marquee">
            {/* We map twice to create the seamless infinite loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 md:gap-6 pr-4 md:pr-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-[360px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex flex-col h-full">
                      <div className="flex gap-1 text-[#fdb022] mb-5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </svg>
                        ))}
                      </div>

                      <p className="text-[15px] md:text-[16px] leading-[1.65] text-slate-700 font-normal mb-8">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0 border-[2px] border-[#fdb022]">
                        <Image src={testimonial.image} alt={testimonial.author} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="font-medium text-slate-900 text-[14px] leading-tight">{testimonial.author}</div>
                        <div className="text-[13px] font-normal text-slate-500 mt-0.5 line-clamp-1">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col items-center text-center mb-10">
            <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
              ALTERNATIVE COMPARISONS
            </span>
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
              <span className="text-[#fd5a0a] font-extrabold">The</span>
              <span className="text-[#001b3d] font-extrabold">Alternative Options</span>
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant font-body mt-2 max-w-3xl mx-auto">
              See how WrittenlyHub stacks up against specific competitors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-outline-variant/50">

            {/* Card 1 */}
            <div className="group relative bg-white transition-all duration-0 group-hover:duration-500 h-[380px] cursor-pointer p-2 sm:p-4 border-outline-variant/50 border-b sm:border-r lg:border-b-0">
              {/* Base Content */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-0 ease-in-out group-hover:duration-[1600ms] group-hover:opacity-0 group-hover:scale-95">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 font-extrabold flex items-center justify-center text-2xl shrink-0 transition-transform duration-0 group-hover:duration-[1600ms] group-hover:scale-110 mb-4">
                  W
                </div>
                <h4 className="text-[16px] font-bold text-writtenly-navy leading-snug text-center">Competitor A</h4>
              </div>

              {/* Hover Overlay Panel */}
              <div className="absolute inset-1 sm:inset-3 bg-writtenly-navy rounded-[24px] p-8 flex flex-col z-10 transition-all duration-0 ease-out group-hover:duration-[1600ms] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]">
                <div className="flex flex-col h-full opacity-0 transition-all duration-0 delay-0 group-hover:duration-[1000ms] group-hover:delay-[250ms] group-hover:opacity-100">
                  <h4 className="text-[22px] font-bold text-white mb-3 tracking-tight">Competitor A</h4>

                  <p className="text-[15px] text-blue-100/70 font-body leading-relaxed">
                    A collaborative GRC risk assessment platform trusted by leading institutions.
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">Platform</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">SAAS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white transition-all duration-0 group-hover:duration-500 h-[380px] cursor-pointer p-2 sm:p-4 border-outline-variant/50 border-b lg:border-b-0 sm:border-r-0 lg:border-r">
              {/* Base Content */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-0 ease-in-out group-hover:duration-[1600ms] group-hover:opacity-0 group-hover:scale-95">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-500 font-extrabold flex items-center justify-center text-2xl shrink-0 transition-transform duration-0 group-hover:duration-[1600ms] group-hover:scale-110 mb-4">
                  W
                </div>
                <h4 className="text-[16px] font-bold text-writtenly-navy leading-snug text-center">Competitor B</h4>
              </div>

              {/* Hover Overlay Panel */}
              <div className="absolute inset-1 sm:inset-3 bg-writtenly-navy rounded-[24px] p-8 flex flex-col z-10 transition-all duration-0 ease-out group-hover:duration-[1600ms] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]">
                <div className="flex flex-col h-full opacity-0 transition-all duration-0 delay-0 group-hover:duration-[1000ms] group-hover:delay-[250ms] group-hover:opacity-100">
                  <h4 className="text-[22px] font-bold text-white mb-3 tracking-tight">Competitor B</h4>

                  <p className="text-[15px] text-blue-100/70 font-body leading-relaxed">
                    A collaborative GRC risk assessment platform trusted by leading institutions.
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">Platform</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">SAAS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white transition-all duration-0 group-hover:duration-500 h-[380px] cursor-pointer p-2 sm:p-4 border-outline-variant/50 border-b sm:border-b-0 sm:border-r">
              {/* Base Content */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-0 ease-in-out group-hover:duration-[1600ms] group-hover:opacity-0 group-hover:scale-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 font-extrabold flex items-center justify-center text-2xl shrink-0 transition-transform duration-0 group-hover:duration-[1600ms] group-hover:scale-110 mb-4">
                  W
                </div>
                <h4 className="text-[16px] font-bold text-writtenly-navy leading-snug text-center">Competitor C</h4>
              </div>

              {/* Hover Overlay Panel */}
              <div className="absolute inset-1 sm:inset-3 bg-writtenly-navy rounded-[24px] p-8 flex flex-col z-10 transition-all duration-0 ease-out group-hover:duration-[1600ms] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]">
                <div className="flex flex-col h-full opacity-0 transition-all duration-0 delay-0 group-hover:duration-[1000ms] group-hover:delay-[250ms] group-hover:opacity-100">
                  <h4 className="text-[22px] font-bold text-white mb-3 tracking-tight">Competitor C</h4>

                  <p className="text-[15px] text-blue-100/70 font-body leading-relaxed">
                    A collaborative GRC risk assessment platform trusted by leading institutions.
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">Platform</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">SAAS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-white transition-all duration-0 group-hover:duration-500 h-[380px] cursor-pointer p-2 sm:p-4">
              {/* Base Content */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-0 ease-in-out group-hover:duration-[1600ms] group-hover:opacity-0 group-hover:scale-95">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 font-extrabold flex items-center justify-center text-2xl shrink-0 transition-transform duration-0 group-hover:duration-[1600ms] group-hover:scale-110 mb-4">
                  W
                </div>
                <h4 className="text-[16px] font-bold text-writtenly-navy leading-snug text-center">Competitor D</h4>
              </div>

              {/* Hover Overlay Panel */}
              <div className="absolute inset-1 sm:inset-3 bg-writtenly-navy rounded-[24px] p-8 flex flex-col z-10 transition-all duration-0 ease-out group-hover:duration-[1600ms] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]">
                <div className="flex flex-col h-full opacity-0 transition-all duration-0 delay-0 group-hover:duration-[1000ms] group-hover:delay-[250ms] group-hover:opacity-100">
                  <h4 className="text-[22px] font-bold text-white mb-3 tracking-tight">Competitor D</h4>

                  <p className="text-[15px] text-blue-100/70 font-body leading-relaxed">
                    A collaborative GRC risk assessment platform trusted by leading institutions.
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">Platform</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-2 rounded-md">SAAS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="cta" className="py-10 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-writtenly-navy rounded-[32px] border border-border-subtle ambient-shadow p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">

            {/* Subtle background glow for the banner */}
            <div className="absolute inset-0 bg-gradient-to-b from-writtenly-orange/10 to-transparent pointer-events-none"></div>

            <div className="max-w-2xl relative z-10 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                Ready to achieve similar results for your brand?
              </h3>
              <p className="font-body-md text-white/80 text-base mb-8 max-w-xl mx-auto">
                Let&apos;s build an authoritative content ecosystem that drives qualified traffic, buyer trust, and measurable revenue.
              </p>

              {/* Ultra Premium Button with Avatars */}
              <Link
                href="/contact"
                className="relative flex items-center justify-between pl-6 pr-1.5 py-1.5 bg-gradient-to-br from-[#f8651c] to-[#e65005] shadow-[0_8px_20px_-6px_rgba(230,80,5,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(230,80,5,0.7)] border border-white/20 rounded-full group transition-all duration-300 transform hover:-translate-y-1 w-max"
              >
                <span className="font-label-md text-[12px] uppercase tracking-[0.15em] font-bold text-white ml-2 mr-5 whitespace-nowrap">LET'S TALK</span>

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




































    </main>
  );
}
