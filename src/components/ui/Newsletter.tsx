export function Newsletter() {
  return (
    <section className="w-full px-gutter py-section-gap mb-16">
      <div className="max-w-container-max mx-auto bg-writtenly-navy rounded-[2rem] md:rounded-3xl overflow-hidden relative shadow-lg">
        <div className="p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 md:gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-white mb-5 font-bold tracking-tight">
              Stay ahead of the curve.
            </h3>
            <p className="font-body-lg text-body-lg text-white/80 text-lg leading-relaxed">
              Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and the future of digital writing.
            </p>
          </div>
          <div className="w-full lg:w-auto shrink-0">
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0">
              <input 
                className="w-full md:min-w-[300px] px-5 py-3.5 md:px-6 md:py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:bg-white/15 focus:border-writtenly-orange focus:ring-2 focus:ring-writtenly-orange/50 font-body-md text-body-md transition-all outline-none" 
                placeholder="Your work email" 
                required 
                type="email" 
              />
              <button 
                className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-writtenly-orange text-white rounded-full font-label-md text-label-md font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-[1px] outline-none min-h-[44px]" 
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[13px] text-white/60 mt-5 text-center lg:text-left font-body-md">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
