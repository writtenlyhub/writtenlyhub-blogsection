'use client'
import React from 'react'
import { useField } from '@payloadcms/ui'

export const CharacterCounter: React.FC<any> = (props) => {
  const { path, field } = props
  const min = field?.custom?.min || 0
  const max = field?.custom?.max || 100

  const { value } = useField<string>({ path })
  const length = (value || '').length

  let color = '#ef4444' // text-red-500
  if (length >= min && length <= max) {
    color = '#10b981' // text-green-500
  } else if ((length > 0 && length < min) || (length > max && length <= max + 20)) {
    color = '#f97316' // text-orange-500
  }

  // Draw a progress bar
  const percent = Math.min(100, Math.max(0, (length / max) * 100))
  let barColor = '#ef4444' // bg-red-500
  if (length >= min && length <= max) barColor = '#10b981' // bg-green-500
  else if (length > 0 && length < min) barColor = '#f97316' // bg-orange-500
  else if (length > max) barColor = '#f97316'

  return (
    <div style={{ marginTop: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
        <span style={{ color: 'var(--theme-elevation-400, #6b7280)' }}>Character count</span>
        <span style={{ fontWeight: '500', color: color }}>
          {length} / {max}
        </span>
      </div>
      <div style={{ width: '100%', backgroundColor: 'var(--theme-elevation-150, #e5e7eb)', height: '4px', borderRadius: '9999px', overflow: 'hidden' }}>
        <div 
          style={{ height: '100%', backgroundColor: barColor, transition: 'all 300ms', width: `${percent}%` }}
        ></div>
      </div>
    </div>
  )
}
