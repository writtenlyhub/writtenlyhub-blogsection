import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { AnimatedHeroTitle } from '@/components/contact/AnimatedHeroTitle';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export const metadata: Metadata = {
  title: 'Contact Us | WrittenlyHub',
  description:
    "Have a project in mind? Get in touch with WrittenlyHub's team. We'll get back to you within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us | WrittenlyHub',
    description:
      "Have a project in mind? Get in touch with WrittenlyHub's team. We'll get back to you within 24 hours.",
    url: `${SITE_URL}/contact`,
    siteName: 'WrittenlyHub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | WrittenlyHub',
    description:
      "Have a project in mind? Get in touch with WrittenlyHub's team. We'll get back to you within 24 hours.",
  },
};

// ─── Reusable icon components ─────────────────────────────────────────────────
function EmailIcon() {
  return (
    <svg className="w-4 h-4 text-writtenly-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-writtenly-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Contact card ─────────────────────────────────────────────────────────────
interface ContactCardProps {
  initials: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

function ContactCard({ initials, name, role, email, phone }: ContactCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Orange top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-writtenly-orange" />

      <div>
        <div className="mb-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-writtenly-orange font-bold text-sm">
            {initials}
          </span>
        </div>
        <h3 className="text-xl font-bold text-writtenly-navy">{name}</h3>
        <p className="text-sm font-medium text-slate-500 mb-5">{role}</p>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2.5 text-sm text-writtenly-navy hover:text-writtenly-orange transition-colors font-medium"
        >
          <EmailIcon />
          {email}
        </a>
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-writtenly-orange transition-colors"
        >
          <PhoneIcon />
          {phone}
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* ── Hero section ── */}
        <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 text-center px-gutter max-w-4xl mx-auto relative z-10">
          {/* Team avatar cluster */}
          <div
            className="animate-fade-in-up flex justify-center items-center -space-x-3 mb-3"
            style={{ animationDelay: '100ms' }}
          >
            <img
              src="/images/authors/alex.webp"
              alt="Team Member"
              className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <img
              src="/images/authors/elena.webp"
              alt="Team Member"
              className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-10"
            />
            <img
              src="/images/authors/marcus.webp"
              alt="Team Member"
              className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
            />
          </div>

          {/* Eyebrow */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            <p className="text-sm sm:text-base font-bold text-slate-800 flex items-center justify-center gap-1.5 mb-3">
              Need a reply fast? <span className="text-base sm:text-lg">🔥</span>
            </p>
          </div>

          {/* Headline: Letter-by-letter hero title */}
          <AnimatedHeroTitle baseDelay={0.2} letterDelay={0.035} />

          {/* Subtitle: Supporting hero description */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '550ms' }}
          >
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Share your project requirements here or send us an email at{' '}
              <a
                href="mailto:info@writtenlyhub.com"
                className="font-bold text-writtenly-navy hover:text-writtenly-orange transition-colors"
              >
                info@writtenlyhub.com
              </a>{' '}
              we will follow up in <span className="font-bold text-writtenly-navy">24 hrs</span>.
            </p>
          </div>
        </section>

        {/* ── Contact form section ── */}
        <section
          id="contact-form"
          className="max-w-[620px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16 relative z-10"
        >
          {/* Animated wrapper (server-rendered, CSS fires on first paint) */}
          <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <ContactForm />
          </div>

          {/* Divider & Schedule Call Prompt */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '850ms' }}
          >
            <div className="relative my-14 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-surface-container-lowest px-4 text-xs font-semibold text-slate-400 uppercase tracking-widest absolute">
                or
              </span>
            </div>

            <p className="text-center text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
              Filling out the form above is the fastest way to get an answer, but you can also schedule a call in the upcoming days if you prefer.
            </p>
          </div>
        </section>

        {/* ── Contact Details section (Cards in sequential order) ── */}
        <section
          id="contact-details"
          className="w-full max-w-4xl mx-auto px-gutter pb-16 relative z-10"
        >
          <div
            className="animate-fade-in-up text-center mb-10"
            style={{ animationDelay: '950ms' }}
          >
            <h2 className="font-display text-3xl font-extrabold text-writtenly-navy tracking-tight">
              Contact Details
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Get in touch directly with our leadership and hiring teams
            </p>
          </div>

          {/* Leadership cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              className="animate-fade-in-up h-full"
              style={{ animationDelay: '1050ms' }}
            >
              <ContactCard
                initials="SG"
                name="Saksham Gogia"
                role="Founder | Managing Director"
                email="saksham@writtenlyhub.com"
                phone="+91 96069 83977"
              />
            </div>
            <div
              className="animate-fade-in-up h-full"
              style={{ animationDelay: '1150ms' }}
            >
              <ContactCard
                initials="AV"
                name="Astha Verma"
                role="Co-Founder | CEO"
                email="astha@writtenlyhub.com"
                phone="+91 97654 19710"
              />
            </div>
          </div>

          {/* Recruitment card (centered, narrower) */}
          <div
            className="animate-fade-in-up max-w-md mx-auto"
            style={{ animationDelay: '1250ms' }}
          >
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-writtenly-orange" />

              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-writtenly-orange mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-writtenly-navy">Recruitment Team</h3>
              <p className="text-sm font-medium text-slate-500 mb-5">Careers &amp; Talent Acquisition</p>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 flex flex-col items-center">
                <a
                  href="mailto:recruitment@writtenlyhub.com"
                  className="flex items-center gap-2 text-sm text-writtenly-navy hover:text-writtenly-orange transition-colors font-medium"
                >
                  <EmailIcon />
                  recruitment@writtenlyhub.com
                </a>
                <a
                  href="tel:+919606797944"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-writtenly-orange transition-colors"
                >
                  <PhoneIcon />
                  +91 96067 97944
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Book-a-call banner (#9 in sequential order) ── */}
        <section className="w-full max-w-4xl mx-auto px-gutter pb-20 relative z-10">
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '1350ms' }}
          >
            <div className="bg-writtenly-navy rounded-3xl p-6 sm:p-9 text-white relative overflow-hidden shadow-xl">
              {/* Abstract wave overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 800 200"
              >
                <path d="M-50,150 C150,50 350,250 550,100 C750,-50 850,120 950,50" stroke="white" strokeWidth="4" />
                <path d="M-50,50 C200,200 400,0 600,180 C800,20 850,150 950,100" stroke="white" strokeWidth="2" />
              </svg>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Avatar cluster + heading */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center text-center sm:text-left gap-4">
                  {/* Avatars */}
                  <div className="flex items-center -space-x-3 shrink-0">
                    <img src="/images/authors/alex.webp" alt="Team" className="w-11 h-11 rounded-full border-2 border-writtenly-navy object-cover" />
                    <img src="/images/authors/elena.webp" alt="Team" className="w-11 h-11 rounded-full border-2 border-writtenly-navy object-cover" />
                    <img src="/images/authors/marcus.webp" alt="Team" className="w-11 h-11 rounded-full border-2 border-writtenly-navy object-cover" />
                  </div>

                  {/* Copy */}
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Want to jump on a call?
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base mt-0.5">
                      Book a 30 minute call with our team.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://calendly.com/writtenlyhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-3 bg-writtenly-orange hover:bg-writtenly-orange/90 text-white text-sm font-bold pl-6 pr-2 py-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <span>BOOK A CALL</span>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-writtenly-orange">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

