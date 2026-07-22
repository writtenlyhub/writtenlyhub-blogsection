"use client";

import React, { useState, useEffect } from 'react';

export interface SocialShareProps {
  title: string;
  url?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export function SocialShare({ title, url: propUrl, className = '', layout = 'horizontal' }: SocialShareProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setUrl(propUrl || window.location.href);
    if (navigator.share) {
      setCanShare(true);
    }
  }, [propUrl]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'LinkedIn',
      icon: 'share_windows',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      showNative: false,
    },
    {
      name: 'X (Twitter)',
      icon: 'chat',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      showNative: false,
    },
    {
      name: 'Facebook',
      icon: 'facebook', // using a generic icon or custom SVG if preferred, here fallback to material symbol
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      showNative: false,
    },
    {
      name: 'WhatsApp',
      icon: 'forum',
      href: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
      showNative: false,
    }
  ];

  const layoutClass = layout === 'vertical' ? 'flex-col items-start' : 'flex-row items-center';

  return (
    <div className={`flex ${layoutClass} gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-variant hover:text-secondary-container transition-colors flex items-center gap-2"
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
        >
          {link.name === 'X (Twitter)' ? (
             <svg width="20" height="20" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
               <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
             </svg>
          ) : link.name === 'LinkedIn' ? (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
               <path d="M20.447 20.452H16.892V14.88C16.892 13.551 16.868 11.841 15.044 11.841C13.197 11.841 12.913 13.283 12.913 14.786V20.452H9.363V8.995H12.775V10.562H12.823C13.297 9.664 14.457 8.718 16.182 8.718C19.775 8.718 20.447 11.082 20.447 14.17V20.452ZM5.337 7.433C4.195 7.433 3.272 6.509 3.272 5.37C3.272 4.232 4.195 3.308 5.337 3.308C6.476 3.308 7.4 4.232 7.4 5.37C7.4 6.509 6.476 7.433 5.337 7.433ZM7.118 20.452H3.556V8.995H7.118V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.225 0Z" />
             </svg>
          ) : link.name === 'Facebook' ? (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
               <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.388 11.916 4.717 14.657 4.717C15.97 4.717 17.344 4.954 17.344 4.954V7.935H15.83C14.339 7.935 13.875 8.868 13.875 9.827V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z" />
             </svg>
          ) : (
             <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
          )}
        </a>
      ))}
      
      {canShare && (
        <button
          onClick={handleNativeShare}
          className="text-on-surface-variant hover:text-secondary-container transition-colors flex items-center gap-2"
          aria-label="Share via device"
          title="Share via device"
        >
          <span className="material-symbols-outlined text-[20px]">ios_share</span>
        </button>
      )}

      <button
        onClick={handleCopyLink}
        className="text-on-surface-variant hover:text-secondary-container transition-colors flex items-center gap-2 relative group"
        aria-label="Copy link"
        title="Copy link"
      >
        <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'link'}</span>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-xs py-1 px-2 rounded opacity-100 transition-opacity">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
