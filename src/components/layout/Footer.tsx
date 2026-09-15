import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-writtenly-navy text-white pt-16 md:pt-24 lg:pt-28 pb-10 md:pb-12 lg:pb-14 px-gutter mt-auto">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Image
              alt="WrittenlyHub"
              className="h-10 w-auto object-contain"
              src="/images/logos/logo.svg"
              width={180}
              height={60}
            />
            <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-xs">
              We are a boutique content marketing agency to help you add a premium touch to your brand through our expertise and creativity.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">COMPANY</h2>
            <ul className="flex flex-col font-body-md text-body-md text-white/80">
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/seo-content-writing/">SEO Content Writing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/social-media-marketing/">Social Media Marketing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/automate-your-digital-growth/">Automate Your Digital Growth</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/content-writing/">Content Writing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/content-writing-services-in-bangalore/">Content Writing Services in Bangalore</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/services/smm-services-in-bangalore/">SMM Services in Bangalore</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">QUICK LINK</h2>
            <ul className="flex flex-col font-body-md text-body-md text-white/80">
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/about/">About Us</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="/success-stories">Case Studies</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="/blog">Blog</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/contact/">Contact</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="https://www.writtenlyhub.com/career/">Career</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">GET IN TOUCH</h2>
            <a className="block py-2 font-body-md text-body-md text-white/80 hover:text-writtenly-orange transition-colors" href="mailto:services@writtenlyhub.com">
              services@writtenlyhub.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-label-md text-label-md text-white/60">
            <Link className="px-1 hover:text-white transition-colors" href="https://www.writtenlyhub.com/terms-and-conditions/">Terms and Conditions</Link>
            <Link className="px-1 hover:text-white transition-colors" href="https://www.writtenlyhub.com/return-policy/">Return Policy</Link>
            <Link className="px-1 hover:text-white transition-colors" href="https://www.writtenlyhub.com/privacy-policy/">Privacy Policy</Link>
          </div>
          <p className="font-label-md text-label-md text-white/50 text-center">
            © 2025 WrittenlyHub Private Limited - All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
