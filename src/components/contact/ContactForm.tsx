'use client';

import { useState, useTransition, useId, useCallback } from 'react';
import { submitContactForm } from '@/app/(frontend)/contact/actions';
import { RecaptchaCheckbox } from './RecaptchaCheckbox';

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: 'idle' });
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [resetCount, setResetCount] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const formId = useId();

  const handleVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setState((prev) => {
      if (prev.status === 'error' && prev.message?.toLowerCase().includes('robot')) {
        return { status: 'idle' };
      }
      return prev;
    });
  }, []);

  const handleExpired = useCallback(() => {
    setCaptchaToken('');
    setState({
      status: 'error',
      message: 'Verification expired. Please complete the "I\'m not a robot" box again.',
    });
  }, []);

  const handleError = useCallback(() => {
    setCaptchaToken('');
    setState({
      status: 'error',
      message: 'reCAPTCHA service error. Please refresh the page and try again.',
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!captchaToken) {
      setState({
        status: 'error',
        message: 'Please complete the "I\'m not a robot" verification.',
      });
      return;
    }

    formData.set('g-recaptcha-response', captchaToken);

    startTransition(async () => {
      setState({ status: 'submitting' });
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          setState({ status: 'success', message: result.message });
          form.reset();
          setCaptchaToken('');
          setResetCount((prev) => prev + 1);
        } else {
          setState({ status: 'error', message: result.message });
          if (
            result.message?.toLowerCase().includes('recaptcha') ||
            result.message?.toLowerCase().includes('robot') ||
            result.message?.toLowerCase().includes('token')
          ) {
            setCaptchaToken('');
            setResetCount((prev) => prev + 1);
          }
        }
      } catch {
        setState({ status: 'error', message: 'Something went wrong. Please try again.' });
      }
    });
  }

  const isSubmitting = isPending || state.status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="w-full"
    >
      {/* Status Messages */}
      {state.status === 'success' && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3"
        >
          <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-green-800">{state.message}</p>
        </div>
      )}

      {state.status === 'error' && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3"
        >
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <p className="text-sm font-medium text-red-800">{state.message}</p>
        </div>
      )}

      <div className="space-y-5 sm:space-y-6">
        {/* Field 1: Name & Company */}
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-2"
          >
            Name &amp; Company
          </label>
          <input
            id={`${formId}-name`}
            name="name_and_company"
            type="text"
            placeholder="e.g. Sarah from Acme Corp"
            required
            disabled={isSubmitting}
            className="w-full h-14 px-5 rounded-2xl text-writtenly-navy placeholder:text-slate-400 placeholder:font-normal text-[15px] bg-[#F3F4F8] border border-transparent hover:border-slate-300 focus:bg-white focus:border-writtenly-orange focus:outline-none focus:ring-4 focus:ring-writtenly-orange/15 transition-all duration-200 disabled:opacity-60"
          />
        </div>

        {/* Field 2 & 3: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              disabled={isSubmitting}
              className="w-full h-14 px-5 rounded-2xl text-writtenly-navy placeholder:text-slate-400 placeholder:font-normal text-[15px] bg-[#F3F4F8] border border-transparent hover:border-slate-300 focus:bg-white focus:border-writtenly-orange focus:outline-none focus:ring-4 focus:ring-writtenly-orange/15 transition-all duration-200 disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              placeholder="(555) 555-5555"
              disabled={isSubmitting}
              className="w-full h-14 px-5 rounded-2xl text-writtenly-navy placeholder:text-slate-400 placeholder:font-normal text-[15px] bg-[#F3F4F8] border border-transparent hover:border-slate-300 focus:bg-white focus:border-writtenly-orange focus:outline-none focus:ring-4 focus:ring-writtenly-orange/15 transition-all duration-200 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Field 4: Project Description */}
        <div>
          <label
            htmlFor={`${formId}-description`}
            className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-2"
          >
            Project Description
          </label>
          <textarea
            id={`${formId}-description`}
            name="project_description"
            rows={5}
            required
            disabled={isSubmitting}
            placeholder="Tell us about your project, goals, and any specific requirements..."
            className="w-full p-5 rounded-2xl text-writtenly-navy placeholder:text-slate-400 placeholder:font-normal text-[15px] resize-y min-h-[140px] bg-[#F3F4F8] border border-transparent hover:border-slate-300 focus:bg-white focus:border-writtenly-orange focus:outline-none focus:ring-4 focus:ring-writtenly-orange/15 transition-all duration-200 disabled:opacity-60"
          />
        </div>

        {/* Careers Info Notice */}
        <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm text-slate-500">
          <span className="text-slate-400 text-sm">ⓘ</span>
          <p>
            Joining our team instead? Applications go{' '}
            <a
              href="https://www.writtenlyhub.com/career/"
              className="text-writtenly-navy font-bold underline hover:text-writtenly-orange transition-colors"
            >
              here
            </a>
            .
          </p>
        </div>

        {/* reCAPTCHA + Submit */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-full sm:w-auto flex justify-center sm:justify-start">
            <RecaptchaCheckbox
              onVerify={handleVerify}
              onExpired={handleExpired}
              onError={handleError}
              resetSignal={resetCount}
            />
          </div>

          <input type="hidden" name="g-recaptcha-response" value={captchaToken} />

          <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-writtenly-orange hover:bg-[#e65005] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_10px_25px_-3px_rgba(254,107,0,0.35)] hover:shadow-[0_14px_30px_-3px_rgba(254,107,0,0.45)] transition-all duration-200"
            >
              <span className="tracking-wider">
                {isSubmitting ? 'SENDING...' : 'CONTINUE'}
              </span>
              {isSubmitting ? (
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              )}
            </button>
            <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
              <span className="text-amber-500">★</span> Join 100+ happy clients
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
