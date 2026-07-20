import Link from 'next/link';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <nav className="bg-writtenly-navy w-full top-0 sticky z-50 transition-all shadow-sm h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="font-display-lg text-headline-md font-bold text-white flex items-center gap-2">
          <Link href="/">
            <img 
              alt="Writtenly Hub Logo" 
              className="h-10 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnNfgwgSzoGdhHkCH5bQFvyM3KDBVt9ACw7_NhQpvdxshmet2qLJeVHQgtlzZ4ocLXVsVObzhDqJtOUv3wUkvpyN96Fz4t40GXTD5yWME3PN0-7KxfJAUiDIjsdVHX7yUmXCvppzl52IGBOvCkRhmeA5a0MaB9avyFObcDShMQjhfjOVH3H2_49s1um1zBair3d0PET-qkF9F3ljE7vXAyYDPDo5e5wQIioYV7LAI2naz9n-oErRQ3MsZJde0REMLX7QEExf4371s"
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
        <div className="flex items-center gap-stack-md">
          <Button variant="primary" className="hidden md:block">Contact Us</Button>
          <button className="md:hidden text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
