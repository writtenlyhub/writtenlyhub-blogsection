'use client'
import React, { useState } from 'react'

interface SeoPreviewProps {
  title: string
  description: string
  url: string
  ogImage?: string
}

export const SeoPreview: React.FC<SeoPreviewProps> = ({ title, description, url, ogImage }) => {
  const [activeTab, setActiveTab] = useState<'google' | 'facebook' | 'twitter' | 'linkedin'>('google')

  const displayTitle = title || 'Your SEO Title Will Appear Here'
  const displayDesc = description || 'Your meta description will appear here. Make it compelling to encourage users to click.'
  const displayUrl = url || 'https://www.writtenlyhub.com/blog/your-post-slug'
  const displayImage = ogImage || 'https://via.placeholder.com/1200x630.png?text=Preview+Image'

  const tabs = [
    { id: 'google', label: 'Google' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'twitter', label: 'X (Twitter)' },
    { id: 'linkedin', label: 'LinkedIn' },
  ] as const

  return (
    <div style={{ padding: '0', border: '1px solid var(--theme-elevation-200, #d1d5db)', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '24px', background: 'var(--theme-elevation-0, #ffffff)', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '42rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--theme-elevation-200, #d1d5db)', background: 'var(--theme-elevation-50, #f9fafb)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              borderBottom: `2px solid ${activeTab === tab.id ? '#3b82f6' : 'transparent'}`,
              color: activeTab === tab.id ? '#3b82f6' : 'var(--theme-elevation-500, #6b7280)',
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {activeTab === 'google' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--theme-elevation-800, #202124)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--theme-elevation-150, #e2e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--theme-elevation-600, #475569)' }}>W</span>
              <span>{displayUrl}</span>
            </div>
            <div style={{ color: '#1a0dab', fontSize: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
              {displayTitle}
            </div>
            <div style={{ color: 'var(--theme-elevation-600, #4d5156)', fontSize: '14px', lineHeight: '1.58', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {displayDesc}
            </div>
          </div>
        )}

        {activeTab === 'facebook' && (
          <div style={{ border: '1px solid var(--theme-elevation-200, #d1d5db)', borderRadius: '8px', background: 'var(--theme-elevation-50, #f0f2f5)', overflow: 'hidden', maxWidth: '500px' }}>
            <img src={displayImage} alt="Facebook preview" style={{ width: '100%', height: '260px', objectFit: 'cover', borderBottom: '1px solid var(--theme-elevation-200, #d1d5db)' }} />
            <div style={{ padding: '12px', background: 'var(--theme-elevation-0, #ffffff)' }}>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{new URL(displayUrl).hostname}</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '4px', color: 'var(--theme-elevation-800, #1d2129)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayTitle}</div>
              <div style={{ fontSize: '13px', color: 'var(--theme-elevation-500, #6b7280)', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{displayDesc}</div>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div style={{ border: '1px solid var(--theme-elevation-200, #d1d5db)', borderRadius: '12px', background: 'var(--theme-elevation-0, #ffffff)', overflow: 'hidden', maxWidth: '500px' }}>
            <img src={displayImage} alt="Twitter preview" style={{ width: '100%', height: '260px', objectFit: 'cover', borderBottom: '1px solid var(--theme-elevation-200, #d1d5db)' }} />
            <div style={{ padding: '12px', background: 'var(--theme-elevation-0, #ffffff)' }}>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--theme-elevation-800, #000000)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayTitle}</div>
              <div style={{ fontSize: '15px', color: 'var(--theme-elevation-500, #6b7280)', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{displayDesc}</div>
              <div style={{ fontSize: '15px', color: 'var(--theme-elevation-500, #6b7280)', display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '16px', height: '16px', marginRight: '4px', fill: 'currentColor' }}><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.125-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.073 1.055-3.214 1.055z"></path></g></svg>
              {new URL(displayUrl).hostname}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'linkedin' && (
          <div style={{ border: '1px solid var(--theme-elevation-200, #d1d5db)', borderRadius: '8px', background: 'var(--theme-elevation-0, #ffffff)', overflow: 'hidden', maxWidth: '500px' }}>
            <img src={displayImage} alt="LinkedIn preview" style={{ width: '100%', height: '260px', objectFit: 'cover', borderBottom: '1px solid var(--theme-elevation-200, #d1d5db)' }} />
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--theme-elevation-800, #000000)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayTitle}</div>
              <div style={{ fontSize: '14px', color: 'var(--theme-elevation-500, #6b7280)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{new URL(displayUrl).hostname}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
