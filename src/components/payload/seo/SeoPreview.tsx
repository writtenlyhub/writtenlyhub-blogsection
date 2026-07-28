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
    <div className="p-0 border rounded-md shadow-sm mb-6 bg-white dark:bg-gray-900 font-sans max-w-2xl overflow-hidden">
      <div className="flex border-b bg-gray-50 dark:bg-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'google' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#202124', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#475569' }}>W</span>
              <span>{displayUrl}</span>
            </div>
            <div style={{ color: '#1a0dab', fontSize: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
              {displayTitle}
            </div>
            <div style={{ color: '#4d5156', fontSize: '14px', lineHeight: '1.58', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {displayDesc}
            </div>
          </div>
        )}

        {activeTab === 'facebook' && (
          <div className="border rounded bg-[#f0f2f5] dark:bg-gray-800 overflow-hidden max-w-[500px]">
            <img src={displayImage} alt="Facebook preview" className="w-full h-[260px] object-cover border-b" />
            <div className="p-3 bg-white dark:bg-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{new URL(displayUrl).hostname}</div>
              <div className="text-base font-bold mt-1 text-[#1d2129] dark:text-gray-100 truncate">{displayTitle}</div>
              <div className="text-[13px] text-gray-500 dark:text-gray-300 mt-1 line-clamp-1">{displayDesc}</div>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="border rounded-xl bg-white dark:bg-black overflow-hidden max-w-[500px]">
            <img src={displayImage} alt="Twitter preview" className="w-full h-[260px] object-cover border-b dark:border-gray-800" />
            <div className="p-3 bg-white dark:bg-black">
              <div className="text-[15px] font-bold text-black dark:text-white truncate">{displayTitle}</div>
              <div className="text-[15px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{displayDesc}</div>
              <div className="text-[15px] text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-1 fill-current"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.125-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.073 1.055-3.214 1.055z"></path></g></svg>
                {new URL(displayUrl).hostname}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'linkedin' && (
          <div className="border rounded bg-white dark:bg-[#1b1f23] overflow-hidden max-w-[500px]">
            <img src={displayImage} alt="LinkedIn preview" className="w-full h-[260px] object-cover border-b dark:border-gray-700" />
            <div className="p-3">
              <div className="text-base font-bold text-black dark:text-white truncate">{displayTitle}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{new URL(displayUrl).hostname}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
