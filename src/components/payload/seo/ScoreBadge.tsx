'use client'
import React from 'react'

interface ScoreBadgeProps {
  score: number
  passed: number
  warnings: number
  issues: number
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, passed, warnings, issues }) => {
  let color = '#ef4444' // bg-red-500
  let label = 'Poor'

  if (score >= 90) {
    color = '#10b981' // bg-green-500
    label = 'Excellent'
  } else if (score >= 75) {
    color = '#4ade80' // bg-green-400
    label = 'Good'
  } else if (score >= 50) {
    color = '#fb923c' // bg-orange-400
    label = 'Needs Improvement'
  }

  return (
    <div style={{ padding: '16px', border: '1px solid var(--theme-elevation-150, #e5e7eb)', borderRadius: '6px', marginBottom: '24px', backgroundColor: 'var(--theme-elevation-50, #f9fafb)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>SEO Score</h3>
          <span style={{ fontSize: '14px', color: 'var(--theme-elevation-400, #6b7280)' }}>{label}</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', padding: '8px 16px', borderRadius: '9999px', backgroundColor: color }}>
          {score} / 100
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
          <span>{passed} Passed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fb923c', display: 'inline-block' }}></span>
          <span>{warnings} Warnings</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>
          <span>{issues} Issues</span>
        </div>
      </div>
    </div>
  )
}
