import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <nav className="bg-writtenly-navy w-full top-0 sticky z-50 transition-all shadow-sm h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto">
        <div className="font-display-lg text-headline-md font-bold text-white flex items-center gap-2">
          <Link href="/">
              <Image
                alt="WrittenlyHub Logo"
                src="/images/logos/logo.svg"
                width={200}
                height={34}
                className="object-contain"
                priority
              />
            </Link>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">About</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Services</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Case Studies</Link>
          <Link className="text-writtenly-orange font-bold font-label-md text-label-md transition-opacity duration-150" href="/">Blog</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Career</Link>
          <Link className="text-white hover:text-writtenly-orange transition-colors font-label-md text-label-md" href="#">Write For Us</Link>
        </div>
        <div className="flex items-center gap-2 md:gap-stack-md">
          <Button variant="primary" className="hidden md:inline-flex text-[12px] md:text-[14px] px-3 py-2 md:px-4 md:py-2 min-h-[40px] md:min-h-[44px]">Contact Us</Button>
          <button className="md:hidden text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
