'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useFormFields, useDocumentInfo, useForm } from '@payloadcms/ui'
import { calculateUnifiedScore } from '../../../lib/seo/analysis/unifiedScore'
import { ANALYSIS_CONFIG } from '../../../lib/seo/analysis/config'
import { DocumentState, UnifiedScoreSummary } from '../../../lib/seo/analysis/types'
import { SeoPreview } from './SeoPreview'
import { ReadabilityAnalysis } from './ReadabilityAnalysis'

export const SeoAnalysis: React.FC = () => {
  const { id: docId } = useDocumentInfo()
  const { dispatchFields } = useForm()
  const storageKey = `seo-dismissed-warnings-${docId || 'new'}`

  const title = useFormFields(([fields]) => fields.title?.value as string)
  const excerpt = useFormFields(([fields]) => fields.excerpt?.value as string)
  const metaTitle = useFormFields(([fields]) => fields['seo.metaTitle']?.value as string)
  const metaDescription = useFormFields(([fields]) => fields['seo.metaDescription']?.value as string)
  const focusKeyword = useFormFields(([fields]) => fields['seo.focusKeyword']?.value as string)
  const canonicalUrl = useFormFields(([fields]) => fields['seo.canonicalUrl']?.value as string)
  const lexicalState = useFormFields(([fields]) => fields.content?.value as any)
  const featuredImage = useFormFields(([fields]) => fields.featuredImage?.value as string)
  const author = useFormFields(([fields]) => fields.author?.value as string)
  const category = useFormFields(([fields]) => fields.category?.value as string)

  // Debugging fields
  const allFields = useFormFields((state) => state)
  useEffect(() => {
    console.log('SeoAnalysis Form State:', allFields)
  }, [allFields])

  const [dismissedRuleIds, setDismissedRuleIds] = useState<string[]>([])
  const [summary, setSummary] = useState<UnifiedScoreSummary | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [autofillStatus, setAutofillStatus] = useState<string | null>(null)

  const handleAutofill = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Generate text fallbacks
    const generatedTitle = title ? (title.length > 60 ? title.substring(0, 57) + '...' : title) : ''
    const generatedDesc = excerpt ? (excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt) : ''
    
    const updates = []
    
    // Primary SEO
    if (generatedTitle) updates.push({ path: 'seo.metaTitle', value: generatedTitle })
    if (generatedDesc) updates.push({ path: 'seo.metaDescription', value: generatedDesc })
    
    // Social / Open Graph
    if (generatedTitle) {
      updates.push({ path: 'seo.ogTitle', value: generatedTitle })
      updates.push({ path: 'seo.twitterTitle', value: generatedTitle })
    }
    if (generatedDesc) {
      updates.push({ path: 'seo.ogDescription', value: generatedDesc })
      updates.push({ path: 'seo.twitterDescription', value: generatedDesc })
    }
    
    // Images (use featured hero/article image)
    if (featuredImage) {
      updates.push({ path: 'seo.ogImage', value: featuredImage })
      updates.push({ path: 'seo.twitterImage', value: featuredImage })
    }
    
    // Default Robots Settings (Index, Follow)
    updates.push({ path: 'seo.robots.index', value: true })
    updates.push({ path: 'seo.robots.follow', value: true })
    updates.push({ path: 'seo.robots.noindex', value: false })
    updates.push({ path: 'seo.robots.nofollow', value: false })
    updates.push({ path: 'seo.robots.maxImagePreview', value: 'large' })

    // Dispatch all updates
    updates.forEach(update => {
      dispatchFields({ type: 'UPDATE', path: update.path, value: update.value })
    })
    
    setAutofillStatus('All SEO Fields Autofilled!')
    setTimeout(() => setAutofillStatus(null), 2500)
  }

  // Load dismissed warnings from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored) {
        setDismissedRuleIds(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Failed to load dismissed warnings', e)
    }
  }, [storageKey])

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(dismissedRuleIds))
    } catch (e) {
      console.warn('Failed to save dismissed warnings', e)
    }
  }, [dismissedRuleIds, storageKey])

  const docState: DocumentState = useMemo(() => ({
    title,
    metaTitle,
    metaDescription,
    focusKeyword,
    canonicalUrl,
    lexicalState,
    featuredImage,
  }), [title, metaTitle, metaDescription, focusKeyword, canonicalUrl, lexicalState, featuredImage])

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = calculateUnifiedScore(docState, ANALYSIS_CONFIG)
      setSummary(result)
    }, 400)
    return () => clearTimeout(timer)
  }, [docState])

  const handleDismiss = (ruleId: string) => {
    setDismissedRuleIds(prev => Array.from(new Set([...prev, ruleId])))
  }

  const handleRestore = (ruleId: string) => {
    setDismissedRuleIds(prev => prev.filter(id => id !== ruleId))
  }

  const handleResetDismissed = (e: React.MouseEvent) => {
    e.preventDefault()
    setDismissedRuleIds([])
  }

  if (!summary) return <div className="p-4 text-gray-500">Initializing Analysis...</div>

  const dismissedItems = [...summary.seoResults, ...summary.readabilityResults].filter(r => dismissedRuleIds.includes(r.id))

  const resolvedCanonical = canonicalUrl || 'https://www.writtenlyhub.com/blog/...' // Fallback for preview

  // Helper for Circular Progress
  const CircularProgress = ({ score, size = 80, strokeWidth = 8 }: { score: number, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 75 ? '#10b981' : score >= 50 ? '#fb923c' : '#ef4444';

    return (
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={radius} stroke="var(--theme-elevation-150, #e5e7eb)" strokeWidth={strokeWidth} fill="none" />
          <circle 
            cx={size/2} cy={size/2} r={radius} 
            stroke={color} strokeWidth={strokeWidth} fill="none" 
            strokeDasharray={circumference} strokeDashoffset={offset} 
            strokeLinecap="round" 
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <span style={{ position: 'absolute', fontSize: '22px', fontWeight: '800', color: 'var(--theme-elevation-800, #1f2937)' }}>{score}</span>
      </div>
    );
  };

  const ScoreCard = ({ label, score, icon }: { label: string, score: number, icon: string }) => {
    const color = score >= 75 ? '#10b981' : score >= 50 ? '#fb923c' : '#ef4444';
    return (
      <div style={{ flex: 1, padding: '16px', background: 'var(--theme-elevation-0, #ffffff)', border: '1px solid var(--theme-elevation-150, #e5e7eb)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--theme-elevation-500, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--theme-elevation-800, #1f2937)' }}>{score}<span style={{ fontSize: '14px', color: 'var(--theme-elevation-400, #9ca3af)', fontWeight: '500' }}>/100</span></div>
        </div>
      </div>
    );
  };

  const ChecklistItem = ({ checked, label }: { checked: boolean, label: string }) => (
    <div style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', padding: '12px 16px', 
      background: checked ? 'rgba(16, 185, 129, 0.05)' : 'var(--theme-elevation-50, #f9fafb)', 
      border: `1px solid ${checked ? 'rgba(16, 185, 129, 0.2)' : 'var(--theme-elevation-150, #e5e7eb)'}`, 
      borderRadius: '8px', fontWeight: '500', transition: 'all 0.2s ease'
    }}>
      <div style={{ 
        width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: checked ? '#10b981' : 'var(--theme-elevation-200, #d1d5db)', color: '#fff', fontSize: '12px'
      }}>
        {checked ? '✓' : '!'}
      </div>
      <span style={{ color: checked ? 'var(--theme-elevation-800, #1f2937)' : 'var(--theme-elevation-500, #6b7280)' }}>{label}</span>
    </div>
  )

  const renderList = (results: any[], status: 'pass' | 'warning' | 'fail', listTitle: string, icon: React.ReactNode, bgColor: string, borderColor: string, iconColor: string) => {
    const items = results.filter((r: any) => r.status === status && !dismissedRuleIds.includes(r.id))
    if (items.length === 0) return null
    return (
      <div style={{ marginBottom: '24px', background: bgColor, border: `1px solid ${borderColor}`, borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: iconColor, display: 'flex' }}>{icon}</span>
          <h4 style={{ fontWeight: '700', fontSize: '16px', margin: 0, color: 'var(--theme-elevation-800, #1f2937)' }}>{listTitle} <span style={{ background: iconColor, color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '8px' }}>{items.length}</span></h4>
        </div>
        <div style={{ padding: '8px' }}>
          {items.map((item: any) => (
            <div key={item.id} style={{ padding: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', borderRadius: '8px' }}>
              <div style={{ flex: 1 }}>
                <strong style={{ fontWeight: '600', color: 'var(--theme-elevation-800, #1f2937)', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                <span style={{ color: 'var(--theme-elevation-600, #4b5563)', fontSize: '14px', lineHeight: '1.5' }}>{item.message}</span>
              </div>
              {status !== 'pass' && status !== 'fail' && (
                <button type="button" 
                  onClick={(e) => { e.preventDefault(); handleDismiss(item.id); }}
                  style={{ background: 'var(--theme-elevation-0, #ffffff)', border: '1px solid var(--theme-elevation-200, #d1d5db)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: 'var(--theme-elevation-600, #4b5563)', fontSize: '12px', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                >
                  Ignore
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '32px', marginBottom: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      


      {/* Header / Score Overview */}
      <div style={{ padding: '24px', border: '1px solid var(--theme-elevation-150, #e5e7eb)', borderRadius: '16px', marginBottom: '32px', background: 'linear-gradient(to bottom right, var(--theme-elevation-0, #ffffff), var(--theme-elevation-50, #f9fafb))', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0', color: 'var(--theme-elevation-800, #1f2937)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            SEO & Readability Health
          </h3>
          <button type="button" 
            onClick={(e) => { e.preventDefault(); setShowExplanation(!showExplanation); }}
            style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            {showExplanation ? 'Hide Details' : 'View Details'}
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingRight: '24px', borderRight: '1px solid var(--theme-elevation-150, #e5e7eb)' }}>
            <CircularProgress score={summary.overallScore} size={90} strokeWidth={8} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--theme-elevation-500, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Overall Score</div>
              <div style={{ fontSize: '14px', color: 'var(--theme-elevation-400, #9ca3af)' }}>Weighted average</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flex: 1, gap: '16px', minWidth: '300px' }}>
            <ScoreCard label="SEO Score" score={summary.seoScore} icon="🔍" />
            <ScoreCard label="Readability" score={summary.readabilityScore} icon="📖" />
          </div>
        </div>

        {showExplanation && (
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '24px', fontSize: '14px' }}>
            <h4 style={{ fontWeight: '700', marginBottom: '16px', color: 'var(--theme-elevation-800, #1f2937)' }}>Score Breakdown</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <strong style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Positive Impacts</strong>
                <ul style={{ padding: '0', listStyle: 'none', margin: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[...summary.seoResults, ...summary.readabilityResults].filter(r => (r.scoreImpact || 0) > 0).map(r => (
                      <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                        <span style={{ color: 'var(--theme-elevation-600, #4b5563)' }}>{r.title}</span>
                        <span style={{ color: '#10b981', fontWeight: '700' }}>+{r.scoreImpact}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Negative Impacts</strong>
                <ul style={{ padding: '0', listStyle: 'none', margin: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[...summary.seoResults, ...summary.readabilityResults].filter(r => (r.scoreImpact || 0) < 0).map(r => (
                      <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                        <span style={{ color: 'var(--theme-elevation-600, #4b5563)' }}>{r.title}</span>
                        <span style={{ color: '#ef4444', fontWeight: '700' }}>{r.scoreImpact}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Preview */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: 'var(--theme-elevation-800, #1f2937)' }}>Search Engine Preview</h3>
        <SeoPreview 
          title={metaTitle || title || ''}
          description={metaDescription || ''}
          url={resolvedCanonical}
        />
      </div>

      {/* Basic Requirements Checklist */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: 'var(--theme-elevation-800, #1f2937)' }}>Basic Requirements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          <ChecklistItem checked={!!(metaTitle || title)} label="SEO Title" />
          <ChecklistItem checked={!!metaDescription} label="Meta Description" />
          <ChecklistItem checked={!!featuredImage} label="Featured Image" />
          <ChecklistItem checked={!!focusKeyword} label="Focus Keyword" />
          <ChecklistItem checked={!!author} label="Author Assigned" />
          <ChecklistItem checked={!!category} label="Category Assigned" />
        </div>
      </div>

      {/* Analysis Lists */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: 'var(--theme-elevation-800, #1f2937)' }}>Detailed Analysis</h3>
        
        {renderList(
          summary.seoResults, 'fail', 'Critical Issues', 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>, 
          'rgba(239, 68, 68, 0.04)', 'rgba(239, 68, 68, 0.2)', '#ef4444'
        )}
        
        {renderList(
          summary.seoResults, 'warning', 'Improvements Needed', 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>, 
          'rgba(245, 158, 11, 0.04)', 'rgba(245, 158, 11, 0.2)', '#f59e0b'
        )}
        
        {renderList(
          summary.seoResults, 'pass', 'Good Results', 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>, 
          'rgba(16, 185, 129, 0.04)', 'rgba(16, 185, 129, 0.2)', '#10b981'
        )}
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: 'var(--theme-elevation-800, #1f2937)' }}>Readability Feedback</h3>
        <div style={{ background: 'var(--theme-elevation-0, #ffffff)', border: '1px solid var(--theme-elevation-150, #e5e7eb)', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <ReadabilityAnalysis 
            results={summary.readabilityResults.filter(r => !dismissedRuleIds.includes(r.id))} 
            onDismiss={handleDismiss} 
          />
        </div>
      </div>

      {/* Ignored Warnings */}
      {dismissedItems.length > 0 && (
        <div style={{ background: 'var(--theme-elevation-50, #f9fafb)', border: '1px solid var(--theme-elevation-200, #d1d5db)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--theme-elevation-200, #d1d5db)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontWeight: '600', fontSize: '15px', color: 'var(--theme-elevation-600, #4b5563)', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              Ignored Warnings
            </h4>
            <button type="button" 
              onClick={handleResetDismissed}
              style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563', background: '#e5e7eb', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s ease' }}
            >
              Reset All
            </button>
          </div>
          <div style={{ padding: '8px' }}>
            {dismissedItems.map((item: any) => (
              <div key={item.id} style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--theme-elevation-500, #6b7280)', fontWeight: '500' }}>{item.title}</span>
                <button type="button" 
                  onClick={(e) => { e.preventDefault(); handleRestore(item.id); }}
                  style={{ fontSize: '12px', fontWeight: '600', background: 'transparent', border: '1px solid #d1d5db', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#3b82f6' }}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
