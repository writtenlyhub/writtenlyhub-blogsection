export function Newsletter() {
  return (
    <section className="w-full px-margin-mobile md:px-gutter py-12 mb-12">
      <div className="max-w-container-max mx-auto bg-primary-container rounded-3xl overflow-hidden relative shadow-lg">
        <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-primary mb-5">
              Stay ahead of the curve.
            </h3>
            <p className="font-body-lg text-body-lg text-inverse-primary text-lg">
              Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and the future of digital writing.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto md:mx-0">
              <input 
                className="px-5 py-2.5 bg-surface-container-lowest/10 border border-outline-variant/30 rounded-lg text-on-primary placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container min-w-[280px] font-body-md text-body-md transition-colors" 
                placeholder="Your work email" 
                required 
                type="email" 
              />
              <button 
                className="px-6 py-2.5 bg-secondary-container text-on-secondary rounded-lg font-label-md text-label-md font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm" 
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[12px] text-inverse-primary/70 mt-4 text-center md:text-left">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
