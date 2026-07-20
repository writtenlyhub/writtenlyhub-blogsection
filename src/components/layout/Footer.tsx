import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-writtenly-navy text-white py-12 px-margin-mobile md:px-gutter mt-auto">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="flex flex-col gap-6">
            <div className="w-40">
              <img 
                alt="WrittenlyHub" 
                className="w-full h-auto object-contain" 
                src="https://framerusercontent.com/images/V35p1Q0n2L8Pnsg6v4B73Gj6oY.png" 
              />
            </div>
            <p className="font-body-md text-body-md text-white/80 leading-relaxed max-w-xs">
              We are a boutique content marketing agency to help you add a premium touch to your brand through our expertise and creativity.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-label-md text-label-md font-bold text-outline">COMPANY</h4>
            <ul className="flex flex-col gap-3 font-body-md text-body-md text-surface-container-low">
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">SEO Content Writing</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Social Media Marketing</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Automate Your Digital Growth</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Content Writing</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Content Writing Services in Bangalore</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">SMM Services in Bangalore</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-label-md text-label-md font-bold text-outline">QUICK LINK</h4>
            <ul className="flex flex-col gap-3 font-body-md text-body-md text-surface-container-low">
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">About Us</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Case Studies</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Blog</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Contact</Link></li>
              <li><Link className="hover:text-writtenly-orange transition-colors" href="#">Career</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-label-md text-label-md font-bold text-outline">GET IN TOUCH</h4>
            <a className="font-body-md text-body-md text-surface-container-low hover:text-writtenly-orange transition-colors" href="mailto:services@writtenlyhub.com">services@writtenlyhub.com</a>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 font-label-md text-label-md text-white/60">
            <Link className="hover:text-white transition-colors" href="#">Terms and Conditions</Link>
            <Link className="hover:text-white transition-colors" href="#">Return Policy</Link>
            <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          </div>
          <p className="font-label-md text-label-md text-white/60 text-center">
            © 2025 WrittenlyHub Private Limited - All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
