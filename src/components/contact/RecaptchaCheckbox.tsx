'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (cb: () => void) => void;
        render: (
          container: HTMLElement | string,
          parameters: {
            sitekey: string;
            action?: string;
            theme?: 'light' | 'dark';
            size?: 'normal' | 'compact';
            callback?: (token: string) => void;
            'expired-callback'?: () => void;
            'error-callback'?: () => void;
          }
        ) => number;
        reset: (opt_widget_id?: number) => void;
        getResponse: (opt_widget_id?: number) => string;
      };
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          action?: string;
          theme?: 'light' | 'dark';
          size?: 'normal' | 'compact';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => number;
      reset: (opt_widget_id?: number) => void;
      getResponse: (opt_widget_id?: number) => string;
    };
    __recaptchaLoaded?: boolean;
    onRecaptchaLoadCallback?: () => void;
  }
}

interface RecaptchaCheckboxProps {
  onVerify: (token: string) => void;
  onExpired: () => void;
  onError?: () => void;
  resetSignal?: number;
}

export function RecaptchaCheckbox({
  onVerify,
  onExpired,
  onError,
  resetSignal,
}: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // 1. Script injection and callback setup for reCAPTCHA Enterprise
  useEffect(() => {
    if (!siteKey) return;

    const grecaptchaClient = window.grecaptcha?.enterprise || window.grecaptcha;
    if (grecaptchaClient && typeof grecaptchaClient.render === 'function') {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = 'google-recaptcha-enterprise-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    window.onRecaptchaLoadCallback = () => {
      window.__recaptchaLoaded = true;
      setIsScriptLoaded(true);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/enterprise.js?onload=onRecaptchaLoadCallback&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [siteKey]);

  // 2. Render reCAPTCHA widget once script & container are ready
  useEffect(() => {
    if (!siteKey || !isScriptLoaded || !containerRef.current) return;

    if (widgetIdRef.current !== null) return;
    if (containerRef.current.children.length > 0) return;

    try {
      const grecaptchaClient = window.grecaptcha?.enterprise || window.grecaptcha;
      if (grecaptchaClient && typeof grecaptchaClient.render === 'function') {
        const id = grecaptchaClient.render(containerRef.current, {
          sitekey: siteKey,
          action: 'CONTACT_FORM',
          theme: 'light',
          size: 'normal',
          callback: (token: string) => {
            onVerify(token);
          },
          'expired-callback': () => {
            onExpired();
          },
          'error-callback': () => {
            onError?.();
          },
        });
        widgetIdRef.current = id;
      }
    } catch (err) {
      console.error('[reCAPTCHA Enterprise] Failed to render widget:', err);
    }
  }, [isScriptLoaded, siteKey, onVerify, onExpired, onError]);

  // 3. Handle external reset signals
  useEffect(() => {
    if (resetSignal && widgetIdRef.current !== null) {
      const grecaptchaClient = window.grecaptcha?.enterprise || window.grecaptcha;
      if (grecaptchaClient && typeof grecaptchaClient.reset === 'function') {
        try {
          grecaptchaClient.reset(widgetIdRef.current);
        } catch (err) {
          console.error('[reCAPTCHA Enterprise] Reset error:', err);
        }
      }
    }
  }, [resetSignal]);

  // Missing site key state
  if (!siteKey) {
    return (
      <div className="w-full sm:w-[304px] min-h-[78px] p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex flex-col justify-center">
        <div className="font-semibold flex items-center gap-1.5 text-amber-900">
          <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          reCAPTCHA Key Required
        </div>
        <p className="mt-1 text-[11px] text-amber-700 leading-tight">
          Set <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-[304px] min-h-[78px] flex items-center">
      <div ref={containerRef} id="recaptcha-enterprise-container" />
    </div>
  );
}
