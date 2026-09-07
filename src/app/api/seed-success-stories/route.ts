import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';

export const dynamic = 'force-dynamic';

const IMAGES = {
  upgradLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsih-9xXCw-6HrZn9I557YQnsD94_3UFMt0TTwuyOqfw-Vbxt2q8A-95NKgSb5pBBzRhGqgq41L1iWY-E3ZeD2CCMFRk_yrX-c8GmY6bEkoHlIboat1xFlDT2W2iqBpMsikGg5uoXBIj72VMqL__IUr2SY0rbdxarFkLLhiZRnZ8h57WnqmKvTfOkhceWCFywzrw-1_IDHCpY4zCpFkuXRzk80fCARD4zecuVjF9_ZdfdhquZVeuXv',
  brandIdentity: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUhCMK04ejGBQiusI56eLrWvna3XoatrWUvTtiObxYZHiuq3FqHAd1PL2W6kE3W40n5fPyaGYUeZRfrA5Nm-9T_8ftx7v0nVn4GfVXjZjQKLVY97aRo9zMA9M603EhMXGZI2gUjpG59thmz_xpMew4MuNmQ0Str0kiEYuT-L18lpNlqh8R9_2SkAaCLvx7QgHigU_shGipwIvq34OhfO-bd269ecK08jPb3tUv12TGY7gQ4humNr2HaBgGb6BEherSfm6TEQBbDHPs1g',
  before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCck1NDOuo-MpsJU2l_R8GgCxxS0V31bqCIcEWT6mo5SDnekgx3vB-vPzy3k2Kw7lFRupDFKG8FbGNpA8_ABeboxCzr8_CTfAvmz53SiDnqOAoLTGmyiGqUe5ooe9VejfTWcM-G4UEfexRR1AlUfYlw_jsXw12asB2Fc4cO7Ds0nnQShXVd50RfbAJ847miZeF2N06QIosVUlD1ZK-G17e1c6wWsqotJVjhcrSqBJu-ltxeuQS1b1EgyLIkJ1CN4oTBIYUIy_m_loAyEQ',
  after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQSHRPg1j6G337TPcJ7Hh4KVwK-PO7thz0JkIR3btHjwKFkjVQFJWf8ZUXcSYl0PSjuccE7jXS3_ZzTT64pd8DdKynYYj4nT1GZjyKMi1d_w6hHznWLkmQMJeAf_NDzPqeqokS2z3SOBovCkXTC8J6aEjdvq5I9gotNl3LKfp2rPsjs2Gp8QWTyrMj2H3xDKW4nIpufPTcm54E9cWVcWxaUQwNsgcxKjIIB71FCWARSevlwHk6KWmp_EdKu0YHemf2noSea--j1_TjA',
  solution1: 'https://lh3.googleusercontent.com/aida/AEtjO1XJE_zBbB5dehLX7HnOwG2k27aULoSPPwYLUAXYMzQ7uf2OEeGinbEftRwVdpobdZjTiIIfLXc8YrnI_sDWYPTO_0KmXXF_UBZfTMhAA7NOO9JT9savjvsvXB6cSjVIQw7rL5Jw455vhlQx48V5wje3r_wDNjG-fq5GvO9Lo6n2ZPgZoSj02V3hWFL93ddZDSuDbeqf3_0-WutAx5uOEZz71M5nFoHg0lSr7-8UoE4PjSn8lRAgghhNNw',
  solution2: 'https://lh3.googleusercontent.com/aida/AEtjO1WFEwSeaSrctGCVu-RxRVzhLcNQa2YXBMSAXxd-YNHIBlaa_9jY7EMrozj_WO3r121HDpOQSJBGiAnlMxOKmXXcNJOA9-v1BES7ujfF31Qx8beg4coM2qyA0aE2tWC02uLK8s8HxaFaa-5XAWRqqbv9dSjcDypeQG5qDXH8doJx1sxKLSiOFAMwETsoB2VErJQD8tfpzegl61sJbjE5nihoL_bct7z0TnrZ5Ln62f4LceUBK1VbALe_jus',
  solution3: 'https://lh3.googleusercontent.com/aida/AEtjO1Vc_LnykV6AHFCHYWwrzexSMAQENfibvqxsTFvJMSvKs9bPJoaN8ZvIsOLbB2x7oEQSP39ZPOb6aBhjeaLUqRIKJC-i6h_iaErKwmrjqtrQMaLDONXjKUJyHjAjKj64wzec-ee6fbzyzYagfvJSlLeAW88MEtasJxiHRtbQTeOVqQbwaKH9uTCp5kYJGZyOFsL1HbIwFemtk51bFHlTsvW1iBZsFg8PVvWg79D2bKXvD0mPxMU7KPAMNw',
  testimonial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Z3UCOrtrPZTHJXrk20_utoWX3JRaaGV5y27ZUFbQo3nlpYe_E8KvbW5vG5tKpvt3unqtOaIw5reMCLE5TZyg_3K6fdR8J3kNMuZYdYfahFe1_6nSNjq7av4sN_guxPAeM15PceQ-Y9jUAoHv2_TLcC7YhiHrhEoxWM24D78Kybet39hLGhOiK8yIYDrhT7UbLhxGrKODYA8V7LnefHLwcTJl2EPYWwIEUkdOxHUhv8uf969uCx65'
};

async function createMedia(payload: any, url: string, alt: string) {
  try {
    console.log(`Downloading ${url}`);
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';
    
    // Some googleusercontent links return html wrapper. Let's just catch this.
    if (contentType.includes('text/html') || contentType.includes('text/plain')) {
      throw new Error('Invalid content type for image');
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const mimeType = contentType || 'image/jpeg';
    const ext = mimeType.split('/')[1] || 'jpg';
    
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: mimeType,
        name: `${alt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.${ext}`,
        size: buffer.length,
      },
    });
    return media.id;
  } catch (error) {
    console.error(`Failed to create media for ${url}`, error);
    // If it fails, fallback to the upgradLogo or brandIdentity if possible?
    // We'll return null and handle it below.
    return null;
  }
}

export async function GET() {
  try {
    const payload = await getPayloadClient();

    // 1. Create Category
    const categoryQuery = await payload.find({
      collection: 'success-story-categories',
      where: { name: { equals: 'EdTech' } }
    });
    
    let categoryId;
    if (categoryQuery.docs.length > 0) {
      categoryId = categoryQuery.docs[0].id;
    } else {
      const category = await payload.create({
        collection: 'success-story-categories',
        data: { name: 'EdTech', slug: 'edtech' }
      });
      categoryId = category.id;
    }

    // 2. Check if Success Story already exists
    const storyQuery = await payload.find({
      collection: 'success-stories',
      where: { slug: { equals: 'upgrad-abroad' } }
    });

    if (storyQuery.docs.length > 0) {
      return NextResponse.json({ message: 'Success story already exists', id: storyQuery.docs[0].id });
    }

    // 3. Upload Media
    const mediaIds = {
      upgradLogo: await createMedia(payload, IMAGES.upgradLogo, 'UpGrad Abroad Logo'),
      brandIdentity: await createMedia(payload, IMAGES.brandIdentity, 'UpGrad Abroad Brand Identity'),
    };
    
    // We need at least brandIdentity for fallback
    const fallbackId = mediaIds.brandIdentity || mediaIds.upgradLogo;
    if (!fallbackId) {
      return NextResponse.json({ error: 'Failed to upload required fallback images' }, { status: 500 });
    }

    const otherMedia = {
      before: await createMedia(payload, IMAGES.before, 'Before Initial State') || fallbackId,
      after: await createMedia(payload, IMAGES.after, 'After Our Solution') || fallbackId,
      solution1: await createMedia(payload, IMAGES.solution1, 'Content Strategy SEO') || fallbackId,
      solution2: await createMedia(payload, IMAGES.solution2, 'High Quality Editorial Content') || fallbackId,
      solution3: await createMedia(payload, IMAGES.solution3, 'Premium Digital Platform Execution') || fallbackId,
      testimonial: await createMedia(payload, IMAGES.testimonial, 'Mayank Kumar Testimonial') || fallbackId
    };

    // 4. Create Success Story
    const successStory = await payload.create({
      collection: 'success-stories',
      data: {
        title: 'Boosting the Digital Presence of a Leading EdTech Brand',
        slug: 'upgrad-abroad',
        clientName: 'upGrad Abroad',
        clientLogo: mediaIds.upgradLogo,
        category: categoryId,
        shortDescription: 'How we helped UpGrad Abroad strengthen their online visibility, attract quality traffic, and build a trusted content ecosystem.',
        featuredImage: mediaIds.brandIdentity,
        
        metrics: [
          { value: '291%', label: 'Organic Traffic Growth' },
          { value: '+50%', label: 'Increase in Sign-ups' },
          { value: '34.3%', label: 'Keyword Rankings' },
          { value: '+49%', label: 'Cart Conversion Rate' }
        ],
        
        summaryHeading: 'SUMMARY',
        summaryBullets: [
          { point: 'Replaced fragmented content with a cohesive, intent-driven ecosystem.' },
          { point: 'Delivered a 291% surge in organic traffic growth.' },
          { point: 'Significantly strengthened brand authority in the international education sector.' }
        ],
        
        problemHeading: 'Digital Problem',
        problemDescription: 'UpGrad Abroad possessed immense domain knowledge and valuable information for prospective international students. However, they struggled with low search visibility, poor keyword rankings for high-intent searches, and a disconnected content experience that failed to convert readers into applicants.',
        problemPoints: [
          { heading: 'Low Organic Visibility', description: 'Poor rankings for critical, high-intent keywords in the study abroad sector.' },
          { heading: 'Inconsistent Content', description: 'Lack of engaging, SEO-friendly content that addressed real student concerns.' },
          { heading: 'Conversion Bottlenecks', description: 'Existing organic traffic was not translating into meaningful sign-ups or leads.' }
        ],
        beforeImage: otherMedia.before,
        afterImage: otherMedia.after,

        impactHeading: 'Impact Achieved',
        impactDescription: 'By pivoting from a fragmented approach to a cohesive, intent-driven content ecosystem, we delivered measurable growth across all key performance indicators, establishing UpGrad Abroad as a dominant authority in the international education sector.',
        
        solutionBlocks: [
          { 
            heading: 'Content Strategy & SEO Optimization', 
            bodyCopy: 'We developed a robust content roadmap structured around core pillars. This interlinked cluster approach established topical authority and guided users seamlessly through the funnel.', 
            image: otherMedia.solution1 
          },
          { 
            heading: 'High-Quality Editorial Content', 
            bodyCopy: 'We produced long-form, expert-led guides, university reviews, and actionable blogs. The focus was on readability, actionable advice, and aligning perfectly with the brand\'s premium positioning.', 
            image: otherMedia.solution2 
          },
          { 
            heading: 'Premium Digital Platform Execution', 
            bodyCopy: 'Beyond content, we ensured the digital touchpoints reflected a sophisticated, modern education interface with clean UI, high-end visual design, and optimized user journeys.', 
            image: otherMedia.solution3 
          }
        ],
        
        testimonial: {
          quote: 'WrittenlyHub has been instrumental in growing our organic presence. Their content strategy and execution helped us connect with thousands of students and build real trust.',
          name: 'Mayank Kumar',
          role: 'Associate Director – Marketing, upGrad Abroad',
          image: otherMedia.testimonial
        },
        _status: 'published'
      }
    });

    return NextResponse.json({ message: 'Success story seeded successfully', id: successStory.id });
  } catch (error) {
    console.error('Error seeding success story:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
