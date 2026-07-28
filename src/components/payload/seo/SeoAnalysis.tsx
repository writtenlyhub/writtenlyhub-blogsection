'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useFormFields, useDocumentInfo } from '@payloadcms/ui'
import { calculateUnifiedScore } from '../../../lib/seo/analysis/unifiedScore'
import { ANALYSIS_CONFIG } from '../../../lib/seo/analysis/config'
import { DocumentState, UnifiedScoreSummary } from '../../../lib/seo/analysis/types'
import { SeoPreview } from './SeoPreview'
import { ReadabilityAnalysis } from './ReadabilityAnalysis'

export const SeoAnalysis: React.FC = () => {
  const { id: docId } = useDocumentInfo()
  const storageKey = `seo-dismissed-warnings-${docId || 'new'}`

  const title = useFormFields(([fields]) => fields.title?.value as string)
  const metaTitle = useFormFields(([fields]) => fields['seo.metaTitle']?.value as string)
  const metaDescription = useFormFields(([fields]) => fields['seo.metaDescription']?.value as string)
  const focusKeyword = useFormFields(([fields]) => fields['seo.focusKeyword']?.value as string)
  const canonicalUrl = useFormFields(([fields]) => fields['seo.canonicalUrl']?.value as string)
  const lexicalState = useFormFields(([fields]) => fields.content?.value as any)
  const featuredImage = useFormFields(([fields]) => fields.featuredImage?.value as string)
  const author = useFormFields(([fields]) => fields.author?.value as string)
  const category = useFormFields(([fields]) => fields.category?.value as string)

  const [dismissedRuleIds, setDismissedRuleIds] = useState<string[]>([])
  const [summary, setSummary] = useState<UnifiedScoreSummary | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

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

  const renderList = (results: any[], status: 'pass' | 'warning' | 'fail', listTitle: string, icon: React.ReactNode) => {
    const items = results.filter((r: any) => r.status === status && !dismissedRuleIds.includes(r.id))
    if (items.length === 0) return null
    return (
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', margin: '0 0 12px 0' }}>{icon} {listTitle}</h4>
        <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item: any) => (
            <li key={item.id} style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <strong style={{ fontWeight: '600' }}>{item.title}: </strong>
              <span style={{ color: 'var(--theme-elevation-400, #6b7280)' }}>{item.message}</span>
              {status !== 'pass' && status !== 'fail' && (
                <button 
                  onClick={(e) => { e.preventDefault(); handleDismiss(item.id); }}
                  style={{ marginLeft: '8px', fontSize: '12px', background: 'transparent', border: '1px solid var(--theme-elevation-200, #d1d5db)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', color: 'var(--theme-elevation-500, #4b5563)' }}
                >
                  Ignore
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const dismissedItems = [...summary.seoResults, ...summary.readabilityResults].filter(r => dismissedRuleIds.includes(r.id))

  const ChecklistItem = ({ checked, label }: { checked: boolean, label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
      <span style={{ filter: checked ? 'none' : 'grayscale(100%) opacity(50%)' }}>{checked ? '✅' : '⏳'}</span>
      <span style={{ color: checked ? 'inherit' : 'var(--theme-elevation-400, #9ca3af)', textDecoration: checked ? 'none' : 'line-through' }}>{label}</span>
    </div>
  )

  const resolvedCanonical = canonicalUrl || 'https://www.writtenlyhub.com/blog/...' // Fallback for preview

  return (
    <div style={{ marginTop: '32px', marginBottom: '16px' }}>
      <div style={{ padding: '16px', border: '1px solid var(--theme-elevation-150, #e5e7eb)', borderRadius: '6px', marginBottom: '24px', backgroundColor: 'var(--theme-elevation-50, #f9fafb)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>SEO Health</h3>
          <button 
            onClick={(e) => { e.preventDefault(); setShowExplanation(!showExplanation); }}
            style={{ fontSize: '12px', textDecoration: 'underline', color: '#3b82f6', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {showExplanation ? 'Hide Explanation' : 'Explain Score'}
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: showExplanation ? '16px' : '0' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400, #6b7280)' }}>Overall</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: summary.overallScore >= 75 ? '#10b981' : (summary.overallScore >= 50 ? '#fb923c' : '#ef4444') }}>{summary.overallScore}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400, #6b7280)' }}>SEO</span>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>{summary.seoScore}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400, #6b7280)' }}>Readability</span>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>{summary.readabilityScore}</span>
          </div>
        </div>

        {showExplanation && (
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '16px', fontSize: '13px' }}>
            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Score Breakdown (How the Overall Score is derived)</h4>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <strong style={{ color: '#10b981' }}>Positive Impacts</strong>
                <ul style={{ padding: '0', listStyle: 'none', margin: '8px 0 0 0' }}>
                  {[...summary.seoResults, ...summary.readabilityResults]
                    .filter(r => (r.scoreImpact || 0) > 0)
                    .map(r => (
                      <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
                        <span>✔ {r.title}</span>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>+{r.scoreImpact}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <strong style={{ color: '#ef4444' }}>Negative Impacts</strong>
                <ul style={{ padding: '0', listStyle: 'none', margin: '8px 0 0 0' }}>
                  {[...summary.seoResults, ...summary.readabilityResults]
                    .filter(r => (r.scoreImpact || 0) < 0)
                    .map(r => (
                      <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
                        <span>✖ {r.title}</span>
                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{r.scoreImpact}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '12px', color: 'var(--theme-elevation-400, #6b7280)', fontSize: '12px' }}>
              <em>Note: The scores are weighted {ANALYSIS_CONFIG.categoryWeights.seo * 100}% SEO and {ANALYSIS_CONFIG.categoryWeights.readability * 100}% Readability. Ignored warnings are omitted from lists below but still affect your score.</em>
            </div>
          </div>
        )}
      </div>
      
      <SeoPreview 
        title={metaTitle || title || ''}
        description={metaDescription || ''}
        url={resolvedCanonical}
      />

      <div style={{ marginTop: '24px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Content SEO</h3>
        {renderList(summary.seoResults, 'fail', 'Issues', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>)}
        {renderList(summary.seoResults, 'warning', 'Improvements Needed', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fb923c', display: 'inline-block' }}></span>)}
        {renderList(summary.seoResults, 'pass', 'Good Results', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>)}
      </div>

      <ReadabilityAnalysis 
        results={summary.readabilityResults.filter(r => !dismissedRuleIds.includes(r.id))} 
        onDismiss={handleDismiss} 
      />

      {dismissedItems.length > 0 && (
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontWeight: '600', fontSize: '14px', color: 'var(--theme-elevation-400, #6b7280)', margin: '0' }}>Ignored Warnings</h4>
            <button 
              onClick={handleResetDismissed}
              style={{ fontSize: '12px', textDecoration: 'underline', color: '#3b82f6', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Reset All
            </button>
          </div>
          <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dismissedItems.map((item: any) => (
              <li key={item.id} style={{ fontSize: '12px', color: 'var(--theme-elevation-400, #6b7280)' }}>
                {item.title} 
                <button 
                  onClick={(e) => { e.preventDefault(); handleRestore(item.id); }}
                  style={{ marginLeft: '8px', fontSize: '11px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#3b82f6', textDecoration: 'underline' }}
                >
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '32px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '16px' }}>
        <h3 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '16px' }}>Basic SEO Checklist</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
          <ChecklistItem checked={!!(metaTitle || title)} label="SEO Title" />
          <ChecklistItem checked={!!metaDescription} label="Meta Description" />
          <ChecklistItem checked={!!featuredImage} label="Featured Image" />
          <ChecklistItem checked={!!focusKeyword} label="Focus Keyword" />
          <ChecklistItem checked={!!author} label="Author" />
          <ChecklistItem checked={!!category} label="Category" />
        </div>
      </div>
    </div>
  )
}
