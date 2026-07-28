'use client';

import { useState, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function Newsletter({ source = 'Inline Form' }: { source?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || 'Something went wrong.');
        setStatus('idle');
      } else {
        setSuccessMessage(result.message);
        setStatus('success');
        formRef.current?.reset();
        trackEvent('newsletter_subscribed', { source });
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section id="newsletter" className="w-full px-gutter py-section-gap mb-16">
      <div className="max-w-container-max mx-auto bg-writtenly-navy rounded-[2rem] md:rounded-3xl overflow-hidden relative shadow-lg">
        <div className="p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 md:gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="font-display-lg text-display-lg text-white mb-5 font-bold tracking-tight">
              Stay ahead of the curve.
            </h3>
            <p className="font-body-xl text-body-xl text-white/80">
              Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and the future of digital writing.
            </p>
          </div>
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center lg:items-start">
            <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0">
              {/* Honeypot field - hidden from users but visible to bots */}
              <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                <label htmlFor="inline-website">Website</label>
                <input type="text" id="inline-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <input 
                name="email"
                className="w-full md:min-w-[300px] px-5 py-3 md:px-6 md:py-3.5 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:bg-white/15 focus:border-writtenly-orange focus:ring-2 focus:ring-writtenly-orange/50 font-body-md text-body-md transition-all outline-none" 
                placeholder="Your work email" 
                required 
                type="email" 
                disabled={status === 'loading'}
              />
              <button 
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3.5 bg-writtenly-orange text-white rounded-full font-label-md text-label-md font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-[1px] outline-none min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <div className="h-6 mt-4 w-full max-w-md flex items-center justify-center lg:justify-start">
              {errorMessage && (
                <p className="font-body-sm text-body-sm text-red-400">{errorMessage}</p>
              )}
              {status === 'success' && (
                <p className="font-body-sm text-body-sm text-green-400">{successMessage}</p>
              )}
              {!errorMessage && status !== 'success' && (
                <p className="font-body-sm text-body-sm text-white/60">No spam. Unsubscribe anytime.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
