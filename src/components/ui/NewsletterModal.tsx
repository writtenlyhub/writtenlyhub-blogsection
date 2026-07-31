'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function NewsletterModal({ isOpen, onClose, source = 'Modal', triggerRef }: NewsletterModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useBodyScrollLock(isOpen);

  // ESC key
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow render
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input:not([type="hidden"])') as HTMLElement;
        if (firstInput) firstInput.focus();
      }, 50);
    } else if (triggerRef && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  // Focus trap
  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

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
        trackEvent('newsletter_subscribed', { source });
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              trackEvent('newsletter_closed', { source });
              onClose();
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onKeyDown={handleTab}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => {
                trackEvent('newsletter_closed', { source });
                onClose();
              }}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" id="modal-title">Awesome!</h3>
                  <p className="text-gray-600 font-medium">
                    {successMessage || "Check your email to confirm your subscription!"}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" id="modal-title">Join our newsletter</h2>
                    <p className="text-gray-600">Get the best marketing insights delivered straight to your inbox.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                      <label htmlFor="firstName" className="sr-only">First Name (Optional)</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name (Optional)"
                        disabled={status === 'loading'}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-writtenly-orange focus:ring-2 focus:ring-writtenly-orange/20 transition-all outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="sr-only">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Your work email"
                        disabled={status === 'loading'}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-writtenly-orange focus:ring-2 focus:ring-writtenly-orange/20 transition-all outline-none"
                      />
                    </div>

                    {errorMessage && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-500 text-sm font-medium pt-1"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-writtenly-orange text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {status === 'loading' ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
