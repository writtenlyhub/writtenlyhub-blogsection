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
                className="object-contain"
                src="/images/logos/logo.svg"
                width={210}
                height={50}
                style={{ width: "210px", height: "auto" }}
              />
            <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-xs">
              We are a boutique content marketing agency to help you add a premium touch to your brand through our expertise and creativity.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">COMPANY</h4>
            <ul className="flex flex-col font-body-md text-body-md text-white/80">
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">SEO Content Writing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Social Media Marketing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Automate Your Digital Growth</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Content Writing</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Content Writing Services in Bangalore</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">SMM Services in Bangalore</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">QUICK LINK</h4>
            <ul className="flex flex-col font-body-md text-body-md text-white/80">
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">About Us</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Case Studies</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="/blog">Blog</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Contact</Link></li>
              <li><Link className="block py-2 hover:text-writtenly-orange transition-colors" href="#">Career</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-label-md text-label-md font-bold text-white/50 tracking-wider">GET IN TOUCH</h4>
            <a className="block py-2 font-body-md text-body-md text-white/80 hover:text-writtenly-orange transition-colors" href="mailto:services@writtenlyhub.com">services@writtenlyhub.com</a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-label-md text-label-md text-white/60">
            <Link className="px-1 hover:text-white transition-colors" href="#">Terms and Conditions</Link>
            <Link className="px-1 hover:text-white transition-colors" href="#">Return Policy</Link>
            <Link className="px-1 hover:text-white transition-colors" href="#">Privacy Policy</Link>
          </div>
          <p className="font-label-md text-label-md text-white/50 text-center">
            © 2025 WrittenlyHub Private Limited - All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
