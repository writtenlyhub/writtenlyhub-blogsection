'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export function SeoValidationWarnings() {
  const title = useFormFields(([fields]) => (fields?.['seo.metaTitle']?.value as string) || (fields?.title?.value as string));
  const description = useFormFields(([fields]) => (fields?.['seo.metaDescription']?.value as string) || (fields?.excerpt?.value as string));
  const featuredImage = useFormFields(([fields]) => fields?.featuredImage?.value);
  const ogImage = useFormFields(([fields]) => fields?.['seo.ogImage']?.value);
  const canonicalUrl = useFormFields(([fields]) => fields?.['seo.canonicalUrl']?.value);
  const author = useFormFields(([fields]) => fields?.author?.value);
  const category = useFormFields(([fields]) => fields?.category?.value);
  const status = useFormFields(([fields]) => fields?._status?.value);

  const isPublished = status === 'published';
  
  const warnings = [];

  if (!title) warnings.push('Missing SEO Title or Post Title');
  if (!description) warnings.push('Missing Meta Description or Excerpt');
  if (!featuredImage) warnings.push('Missing Featured Image');
  if (!ogImage && !featuredImage) warnings.push('Missing Open Graph Image (and no Featured Image to fallback on)');
  if (!author) warnings.push('Missing Author');
  if (!category) warnings.push('Missing Category');
  
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', border: '1px solid #ffeeba' }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>⚠️ SEO Warnings</h4>
      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
        {warnings.map((warning, i) => (
          <li key={i}>{warning}</li>
        ))}
      </ul>
      {isPublished && <p style={{ margin: '10px 0 0 0', fontSize: '12px', fontWeight: 'bold' }}>Note: This post is published with missing SEO data.</p>}
    </div>
  )
}
