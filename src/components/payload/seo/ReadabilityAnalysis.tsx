'use client'
import React from 'react'

interface ReadabilityAnalysisProps {
  results: any[]
  onDismiss: (ruleId: string) => void
}

export const ReadabilityAnalysis: React.FC<ReadabilityAnalysisProps> = ({ results, onDismiss }) => {
  const renderList = (status: 'pass' | 'warning' | 'fail', title: string, icon: React.ReactNode) => {
    const items = results.filter((r: any) => r.status === status && !r.isDismissed)
    if (items.length === 0) return null
    return (
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', margin: '0 0 12px 0' }}>{icon} {title}</h4>
        <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item: any) => (
            <li key={item.id} style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <strong style={{ fontWeight: '600' }}>{item.title}: </strong>
              <span style={{ color: 'var(--theme-elevation-400, #6b7280)' }}>{item.message}</span>
              {status !== 'pass' && status !== 'fail' && (
                <button 
                  onClick={(e) => { e.preventDefault(); onDismiss(item.id); }}
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

  return (
    <div style={{ marginTop: '24px', borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)', paddingTop: '16px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Readability</h3>
      {renderList('fail', 'Issues', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>)}
      {renderList('warning', 'Improvements Needed', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fb923c', display: 'inline-block' }}></span>)}
      {renderList('pass', 'Good Results', <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>)}
    </div>
  )
}
