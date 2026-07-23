'use client';

import React, { useEffect, useState } from 'react';

export function UnsavedDraftMessage() {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // If the URL ends with /create, this is a brand-new unsaved document.
    if (window.location.pathname.endsWith('/create')) {
      setIsNew(true);
    }
  }, []);

  if (!isNew) return null;

  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: 'rgba(254, 107, 0, 0.1)',
      color: '#fe6b00',
      border: '1px solid rgba(254, 107, 0, 0.2)',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '14px',
      fontWeight: '600'
    }}>
      ⚠️ Save this article as a draft before previewing it.
    </div>
  );
}
