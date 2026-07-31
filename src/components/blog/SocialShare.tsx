"use client";

import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

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
    if (typeof navigator.share === 'function') {
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
    if (typeof navigator.share === 'function') {
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
          rel="noopener noreferrer nofollow"
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
          ) : link.name === 'WhatsApp' ? (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
               <path d="M12.031 0C5.385 0 0 5.385 0 12.035C0 14.159 0.556 16.208 1.583 17.989L0.001 23.999L6.155 22.384C7.871 23.326 9.897 23.834 12.025 23.834H12.03C18.675 23.834 24 18.449 24 11.803C24 8.577 22.744 5.549 20.463 3.268C18.181 0.987 15.154 0 12.031 0ZM12.031 21.844H12.025C10.155 21.844 8.358 21.341 6.804 20.419L6.444 20.205L2.793 21.162L3.766 17.608L3.531 17.234C2.502 15.6 1.956 13.684 1.956 11.803C1.956 6.242 6.478 1.72 12.04 1.72C14.733 1.72 17.257 2.769 19.162 4.674C21.066 6.579 22.115 9.103 22.115 11.796C22.114 17.359 17.592 21.844 12.031 21.844ZM17.561 14.28C17.258 14.128 15.772 13.396 15.495 13.295C15.218 13.195 15.016 13.144 14.814 13.447C14.612 13.749 14.032 14.43 13.855 14.631C13.679 14.833 13.502 14.858 13.199 14.707C12.897 14.556 11.922 14.237 10.771 13.212C9.876 12.415 9.268 11.417 9.092 11.114C8.916 10.812 9.073 10.648 9.225 10.497C9.362 10.362 9.528 10.145 9.68 9.969C9.831 9.792 9.881 9.666 9.982 9.465C10.083 9.263 10.033 9.087 9.957 8.936C9.881 8.784 9.275 7.298 9.023 6.694C8.777 6.104 8.525 6.183 8.343 6.171C8.172 6.159 7.97 6.158 7.768 6.158C7.567 6.158 7.239 6.234 6.962 6.536C6.685 6.838 5.88 7.594 5.88 9.131C5.88 10.668 6.987 12.155 7.138 12.357C7.289 12.558 9.345 15.719 12.522 17.092C13.278 17.419 13.869 17.616 14.333 17.763C15.092 18.004 15.782 17.97 16.326 17.892C16.936 17.805 18.257 17.1 18.535 16.344C18.812 15.588 18.812 14.933 18.736 14.781C18.66 14.63 18.459 14.555 18.156 14.404" />
             </svg>
          ) : null}
        </a>
      ))}
      


      <button
        onClick={handleCopyLink}
        className="text-on-surface-variant hover:text-secondary-container transition-colors flex items-center gap-2 relative group"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? <Check size={20} /> : <LinkIcon size={20} />}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface font-label-md text-label-md py-1 px-2 rounded opacity-100 transition-opacity">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
