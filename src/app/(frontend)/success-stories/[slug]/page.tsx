import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { DataGraphBlock } from '@/components/blog/DataGraphBlock';
import { AnalyticsChartBlock } from '@/components/blog/AnalyticsChartBlock';
import AnimatedMetric from '@/components/ui/AnimatedMetric';
import { getCachedSuccessStoryBySlug, getCachedSiteSettings } from '@/lib/api/cache';
import { getPayloadClient } from '@/lib/api/payload';
import { isMedia, getMediaUrl } from '@/lib/utils/blogMapper';
import { SuccessStory } from '@/payload-types';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCachedSuccessStoryBySlug(slug);

  if (!story) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `${story.title} | Success Story | WrittenlyHub`,
    description: story.shortDescription || `Read how we helped ${story.clientName} achieve success.`,
    alternates: {
      canonical: `${SITE_URL}/success-stories/${slug}`,
    }
  };
}

export default async function SuccessStoryDetail({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  let rawStory: SuccessStory | null = null;
  if (isDraftMode) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'success-stories',
        where: { slug: { equals: slug } },
        overrideAccess: true,
        draft: true,
        depth: 2,
        limit: 1,
      });
      rawStory = (result.docs[0] as SuccessStory) || null;
    } catch (err) {
      console.error('[SuccessStoryDetail] Draft Mode Payload fetch failed:', err);
    }
  } else {
    rawStory = await getCachedSuccessStoryBySlug(slug) as SuccessStory;
  }

  if (!rawStory) {
    notFound();
  }

  const siteSettings = await getCachedSiteSettings();
  const trustedBrands = siteSettings?.trustedBrands?.logos || [];

  const clientLogo = isMedia(rawStory.clientLogo) ? rawStory.clientLogo : null;
  const clientLogoUrl = clientLogo ? getMediaUrl(clientLogo.url) : null;
  
  const featuredImage = isMedia(rawStory.featuredImage) ? rawStory.featuredImage : null;
  const featuredImageUrl = featuredImage ? getMediaUrl(featuredImage.url) : null;
  
  const categoryName = rawStory.category && typeof rawStory.category !== 'number' ? rawStory.category.name : '';
  
  const beforeImage = isMedia(rawStory.beforeImage) ? rawStory.beforeImage : null;
  const beforeImageUrl = beforeImage ? getMediaUrl(beforeImage.url) : null;
  
  const afterImage = isMedia(rawStory.afterImage) ? rawStory.afterImage : null;
  const afterImageUrl = afterImage ? getMediaUrl(afterImage.url) : null;
  
  const testimonialImage = rawStory.testimonial?.image && isMedia(rawStory.testimonial.image) ? rawStory.testimonial.image : null;
  const testimonialImageUrl = testimonialImage ? getMediaUrl(testimonialImage.url) : null;
  
  // New fields
  const strategyVisual = isMedia(rawStory.strategyVisual) ? rawStory.strategyVisual : null;
  const strategyVisualUrl = strategyVisual ? getMediaUrl(strategyVisual.url) : null;
  
  const impactVisual = isMedia(rawStory.impactVisual) ? rawStory.impactVisual : null;
  const impactVisualUrl = impactVisual ? getMediaUrl(impactVisual.url) : null;
  
  const clientVisual = isMedia(rawStory.clientVisual) ? rawStory.clientVisual : null;
  const clientVisualUrl = clientVisual ? getMediaUrl(clientVisual.url) : null;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-surface-lavender py-24">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <nav className="flex items-center gap-2 text-on-surface-variant text-sm mb-24">
            <Link className="hover:text-secondary transition-colors" href="/">Home</Link>
            <span className="text-outline-variant">/</span>
            <Link className="hover:text-secondary transition-colors" href="/success-stories">Success Stories</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-medium">{rawStory.clientName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col gap-y-8">
              <div>
                <span className="inline-block bg-primary-container text-white font-label-md text-xs px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-10">
                  CASE STUDY
                </span>
                <h1 className="font-display-lg text-[30px] md:text-[40px] lg:text-[50px] text-on-background leading-tight max-w-2xl font-extrabold line-clamp-3">
                  {rawStory.title}
                </h1>
              </div>
              <p className="font-body-lg text-on-surface-variant max-w-xl leading-relaxed font-medium text-base md:text-lg">
                {rawStory.shortDescription}
              </p>
              
              <div className="flex flex-col gap-3 pt-8">
                <span className="font-label-md text-xs text-outline uppercase tracking-widest font-bold">CLIENT</span>
                <div className="flex items-center gap-4">
                  {clientLogoUrl && (
                    <div className="h-10 md:h-12 flex items-center justify-start overflow-visible mix-blend-multiply">
                      <img 
                        src={clientLogoUrl} 
                        alt={clientLogo?.alt || rawStory.clientName} 
                        className="h-20 md:h-24 w-auto max-w-[150px] object-contain object-left" 
                      />
                    </div>
                  )}
                  <span className="text-xl font-bold text-on-background">{rawStory.clientName}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex items-center justify-center">
              {clientLogoUrl && (
                <Image src={clientLogoUrl} alt={clientLogo?.alt || rawStory.clientName || "Client Logo"} width={600} height={600} className="w-full max-w-md h-auto object-contain mix-blend-multiply" />
              )}
            </div>
          </div>
          
          {rawStory.metrics && rawStory.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 bg-primary-container rounded-2xl border border-white/10 py-10 mt-12">
              {rawStory.metrics.map((metric, index) => (
                <div key={index} className={`flex flex-col items-center text-center px-4 ${index !== rawStory.metrics!.length - 1 && index !== 1 ? 'md:border-r border-white/10' : ''} ${index === 1 ? 'md:border-r border-white/10' : ''} ${index > 1 ? 'mt-8 md:mt-0' : ''}`}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <AnimatedMetric value={metric.value} className="text-3xl md:text-4xl font-extrabold text-white" />
                  </div>
                  <span className="font-bold text-[10px] md:text-xs text-surface-dim uppercase tracking-widest">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {rawStory.summaryBullets && rawStory.summaryBullets.length > 0 && (
            <div className="mb-12 p-8 mt-12 bg-surface-container-lowest rounded-2xl shadow-lg border-t border-outline-variant/20">
              <span className="font-label-md text-xs text-secondary-container uppercase tracking-widest font-bold mb-2 block">
                {rawStory.summaryHeading || 'SUMMARY'}
              </span>
              <ul className="space-y-4 mt-4">
                {rawStory.summaryBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-secondary-container font-bold">•</span>
                    <span className="font-body-lg text-on-surface-variant leading-relaxed text-xl">{bullet.point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Strategy */}
      {(rawStory.strategyHeading || rawStory.strategyDescription || strategyVisualUrl) && (
        <section className="bg-surface py-16 md:py-24">
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center text-center">
                <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block">
                  {rawStory.strategyEyebrow || 'STRATEGY'}
                </span>
                <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 flex flex-row gap-3 justify-center w-full">
                  <span className="text-[#fd5a0a] font-extrabold">The</span>
                  <span className="text-[#001b3d] font-extrabold">Digital Strategy</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
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
      )}

      {/* The Problem */}
      {(rawStory.problemHeading || rawStory.problemDescription || (rawStory.problemPoints && rawStory.problemPoints.length > 0)) && (
        <section className="bg-surface-container-lowest py-16 md:py-24 border-y border-border-subtle overflow-hidden">
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col items-center text-center">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-bold mb-4">THE PROBLEM</span>
                <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                  <span className="text-[#F45400] font-extrabold">The</span>
                  <span className="text-[#001b3d] font-extrabold"> {rawStory.problemHeading || 'Digital Problem'}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="flex flex-col gap-8 max-w-xl">
                  {rawStory.problemDescription && (
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-xl">
                      {rawStory.problemDescription}
                    </p>
                  )}
                  
                  {rawStory.problemPoints && rawStory.problemPoints.length > 0 && (
                    <ul className="list-disc pl-6 space-y-6 mt-4 marker:text-[#fd5a0a] marker:text-2xl">
                      {rawStory.problemPoints.map((point, index) => (
                        <li key={index} className="pl-2">
                          <h4 className="font-headline-md text-xl text-[#001b3d] font-bold inline mr-2">{point.heading}:</h4>
                          <span className="font-body-md text-on-surface-variant leading-relaxed text-lg">{point.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="relative flex items-center justify-center py-12">
                  <div className="relative w-full max-w-md flex items-center">
                    <div className="relative z-10 w-2/3 transform -translate-x-4">
                      <div className="relative bg-white rounded-2xl shadow-lg border border-border-subtle overflow-hidden aspect-[848/1264]">
                        <Image src="/images/success-stories/traffic_before.png" alt="Traffic Before" fill className="object-cover" />
                      </div>
                    </div>
                    
                    <div className="relative z-20 w-2/3 -ml-[20%] transform translate-y-8">
                      <div className="relative bg-white rounded-2xl shadow-2xl border border-secondary-container overflow-hidden aspect-[848/1264]">
                        <Image src="/images/success-stories/traffic_after.png" alt="Traffic After" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The Impact */}
      {rawStory.impactHeading && (
        <section className="bg-surface border-b border-border-subtle py-12">
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 py-12">
            <div className="flex flex-col items-center gap-8">
              <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 text-center block">The Impact</span>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-12 flex flex-row gap-3 justify-center w-full">
                <span className="text-[#fd5a0a] font-extrabold">The</span>
                <span className="text-[#001b3d] font-extrabold"> {rawStory.impactHeading}</span>
              </h2>
              
              {rawStory.metrics && rawStory.metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                  {rawStory.metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-2">
                      <AnimatedMetric value={metric.value} className="text-4xl md:text-5xl font-extrabold text-on-background" />
                      <span className="font-bold text-xs md:text-sm text-on-surface-variant uppercase tracking-widest leading-tight">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {rawStory.metrics && rawStory.metrics.length > 0 && (
                <div className="w-full mt-16 flex justify-center">
                  <div className="w-full max-w-[900px]">
                    <AnalyticsChartBlock />
                  </div>
                </div>
              )}
              
              {rawStory.impactDescription && (
                <p className="font-body-md text-on-surface-variant text-center max-w-3xl mt-12 text-xl">
                  {rawStory.impactDescription}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solution Blocks */}
      {rawStory.solutionBlocks && rawStory.solutionBlocks.length > 0 && (
        <section className="py-16 md:py-24 bg-surface-container-lowest">
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto mb-24 flex flex-col items-center text-center">
              <span className="font-label-md text-label-md text-secondary-container uppercase tracking-widest font-bold mb-4 block text-center">The Execution</span>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-12 flex flex-row gap-3 justify-center w-full">
                <span className="text-[#fd5a0a] font-extrabold">How</span>
                <span className="text-[#001b3d] font-extrabold">We Achieved It</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-32">
              {rawStory.solutionBlocks.map((block, index) => {
                const isReversed = index % 2 !== 0;
                const blockImage = isMedia(block.image) ? block.image : null;
                const cmsImageUrl = blockImage ? getMediaUrl(blockImage.url) : null;
                // Override CMS image with high-quality relatable AI image based on block index
                const finalImageUrl = `/images/success-stories/execution_${Math.min(index + 1, 3)}.png`;

                return (
                  <div key={index} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
                    <div className="lg:w-1/2 flex flex-col gap-6">
                      <div className={`max-w-[500px] ${isReversed ? 'ml-auto' : 'mr-auto'}`}>
                        <h3 className="font-headline-lg text-3xl md:text-4xl text-on-background font-bold mb-6">{block.heading}</h3>
                        <p className="font-body-lg text-on-surface-variant leading-relaxed text-xl">{block.bodyCopy}</p>
                      </div>
                    </div>
                    <div className="lg:w-1/2 w-full flex justify-center">
                      {finalImageUrl && (
                        <div className={`relative w-full max-w-[600px] aspect-video ${isReversed ? 'mr-auto' : 'ml-auto'}`}>
                          <Image src={finalImageUrl} alt={blockImage?.alt || block.heading} fill className="object-cover rounded-3xl shadow-xl border border-border-subtle" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Meet The Client */}
      {(rawStory.clientDescription || clientVisualUrl) && (() => {
        // Override with high-quality relatable team photo
        const finalClientVisualUrl = '/images/success-stories/client_team.jpg';
        return (
        <section className="py-24 bg-[#fafafa] border-y border-border-subtle overflow-hidden relative">
          {/* Dotted Background */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, #001b3d 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="font-label-md text-label-md text-[#fd5a0a] uppercase tracking-widest font-bold mb-4 block">Meet The Client</span>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 flex flex-row gap-3 justify-center w-full">
                <span className="text-[#fd5a0a] font-extrabold">Meet</span>
                <span className="text-[#001b3d] font-extrabold">The Client</span>
              </h2>
              {rawStory.clientDescription && (
                <p className="font-body-lg text-[#4b5563] leading-relaxed text-lg md:text-xl max-w-4xl">
                  {rawStory.clientDescription}
                </p>
              )}
            </div>

            {finalClientVisualUrl && (
              <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-16">
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl bg-white border border-border-subtle">
                  <Image src={finalClientVisualUrl} alt={clientVisual?.alt || rawStory.clientName} fill className="object-cover" />
                </div>
                
                {/* Floating Logo Badge */}
                {clientLogoUrl && (
                  <div className="absolute -top-6 left-6 md:-top-8 md:left-12 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-border-subtle w-16 h-16 md:w-24 md:h-24 flex items-center justify-center z-10">
                    <Image src={clientLogoUrl} alt={clientLogo?.alt || rawStory.clientName} width={64} height={64} className="object-contain w-full h-full" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        );
      })()}

      {/* Testimonial */}
      {(rawStory.testimonial?.quote || true) && (
        <section className="bg-[#001b3d] text-white py-10 md:py-16 relative overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-4 left-6 md:left-16 text-[100px] md:text-[150px] font-serif text-[#ffffff] opacity-5 select-none leading-none">“</div>
            <div className="absolute top-10 right-10 w-32 h-32 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="absolute bottom-10 right-20 w-24 h-24 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fd5a0a 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
          </div>
          
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full">
            <div className="max-w-4xl lg:max-w-[80%]">
              <blockquote className="font-body-lg text-white leading-[1.5] font-medium mb-6 text-xl md:text-2xl">
                "{rawStory.testimonial?.quote || "WrittenlyHub has been instrumental in growing our organic presence. Their content strategy and execution helped us connect with thousands of students and build real trust."}"
              </blockquote>
              <div className="w-12 h-[3px] bg-[#fd5a0a] mb-6"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {testimonialImageUrl ? (
                  <Image src={testimonialImageUrl} alt={testimonialImage?.alt || rawStory.testimonial?.name || 'Mayank Kumar'} width={44} height={44} className="w-[44px] h-[44px] rounded-full object-cover border-2 border-white/20 shadow-lg" />
                ) : (
                  <div className="w-[44px] h-[44px] rounded-full bg-white/20 border-2 border-white/20 shadow-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MK</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <cite className="not-italic font-headline-md text-base font-semibold text-white">
                    {rawStory.testimonial?.name || "Mayank Kumar"}
                  </cite>
                  <span className="text-xs text-gray-300">
                    {rawStory.testimonial?.role || "Co-Founder and MD - upGrad, upGrad Abroad"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trusted Brands */}
      {(trustedBrands.length > 0 || true) && (
        <section className="py-24 bg-white border-y border-border-subtle overflow-hidden relative">
          <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="font-label-md text-label-md text-[#fd5a0a] uppercase tracking-widest font-bold mb-4 block">TRUSTED BY LEADING BRANDS</span>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-tight flex flex-row gap-3 justify-center w-full">
                <span className="text-[#fd5a0a] font-extrabold">Trusted</span>
                <span className="text-[#001b3d] font-extrabold">By Brands</span>
              </h2>
            </div>
            
            <div className="w-full overflow-hidden relative pointer-events-none select-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="flex animate-marquee w-max">
                {/* First Set */}
                <div className="flex items-center gap-16 md:gap-24 justify-center shrink-0 pr-16 md:pr-24">
                  {trustedBrands.length > 0 ? trustedBrands.map((brand, i) => {
                    const logo = brand.logo && typeof brand.logo !== 'number' ? brand.logo : null;
                    return logo?.url ? (
                      <Image key={i} src={logo.url} alt={brand.alt || logo.alt || 'Brand logo'} width={160} height={60} className="h-12 object-contain" />
                    ) : null;
                  }) : (
                    <>
                       <span className="font-extrabold text-2xl md:text-3xl text-[#fd5a0a]">up<span className="text-[#001b3d]">Grad</span></span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">Razorpay</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">Float</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">OMRON</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#fd5a0a]">Tata <span className="text-[#001b3d]">1mg</span></span>
                       <span className="font-bold text-2xl md:text-3xl text-[#10b981]">Medlife</span>
                    </>
                  )}
                </div>
                {/* Duplicated Set for Seamless Loop */}
                <div className="flex items-center gap-16 md:gap-24 justify-center shrink-0 pr-16 md:pr-24">
                  {trustedBrands.length > 0 ? trustedBrands.map((brand, i) => {
                    const logo = brand.logo && typeof brand.logo !== 'number' ? brand.logo : null;
                    return logo?.url ? (
                      <Image key={`dup-${i}`} src={logo.url} alt={brand.alt || logo.alt || 'Brand logo'} width={160} height={60} className="h-12 object-contain" />
                    ) : null;
                  }) : (
                    <>
                       <span className="font-extrabold text-2xl md:text-3xl text-[#fd5a0a]">up<span className="text-[#001b3d]">Grad</span></span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">Razorpay</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">Float</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#0052cc]">OMRON</span>
                       <span className="font-bold text-2xl md:text-3xl text-[#fd5a0a]">Tata <span className="text-[#001b3d]">1mg</span></span>
                       <span className="font-bold text-2xl md:text-3xl text-[#10b981]">Medlife</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#fd5a0a]/5 rounded-full blur-3xl"></div>
          
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[1.5px] border-[#fd5a0a]/10"></div>
          <div className="absolute top-20 right-20 w-20 h-20 rounded-full border-[1.5px] border-[#001b3d]/10"></div>
          
          <svg className="absolute bottom-0 right-0 w-56 md:w-72 h-56 md:h-72 text-[#fd5a0a]/5" viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,100 C0,44.77 44.77,0 100,0 L100,100 Z" />
          </svg>
        </div>

        <div className="max-w-[1152px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display-lg font-extrabold text-[#001b3d] leading-tight max-w-3xl mx-auto tracking-tight mb-8">
            Ready to achieve similar results?
          </h2>
          <p className="text-xl md:text-2xl text-on-surface-variant font-body-lg mb-10">
            Let's build content that ranks, engages, and converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#fd5a0a] rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-[#fd5a0a]/20">
              <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#fd5a0a] to-[#ff7b3a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
