'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface MobileMenuProps {
  contactEmail: string;
}

export function MobileMenu({ contactEmail }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useBodyScrollLock(isOpen);

  // Sync state and handle cleanup
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let mounted = true;
    const onClose = () => {
      if (!mounted) return;
      setIsOpen(false);
    };

    dialog.addEventListener('close', onClose);
    return () => {
      mounted = false;
      dialog.removeEventListener('close', onClose);
    };
  }, []);

  // Handle scroll for the floating navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('main-header');
      if (header) {
        header.setAttribute('data-scrolled', window.scrollY > 20 ? 'true' : 'false');
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on backdrop click
  const handleDialogClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeMenu();
    }
  }, [closeMenu]);

  return (
    <>
      <button 
        onClick={openMenu}
        aria-expanded={isOpen}
        aria-label="Open mobile menu"
        className="text-writtenly-navy bg-white p-2.5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
      >
        <Menu size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="fixed m-0 p-0 w-full h-full max-w-none max-h-none border-0 outline-none bg-writtenly-navy transition-opacity duration-300 opacity-0 open:opacity-100"
        onClick={handleDialogClick}
      >
        <div 
          className="w-full h-full flex flex-col max-w-[1400px] mx-auto"
          role="document"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-16 py-6 lg:py-10">
            <Link href="/" onClick={closeMenu} className="flex-shrink-0">
              <Image
                alt="WrittenlyHub Logo"
                src="/images/logos/logo.svg"
                width={280}
                height={90}
                className="h-10 lg:h-14 w-auto object-contain"
                priority
              />
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-writtenly-navy bg-white p-2.5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] lg:min-w-[56px] lg:min-h-[56px]"
            >
              <X className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-16 pb-16 flex flex-col lg:flex-row gap-12 lg:gap-32 mt-8 lg:mt-16" data-lenis-prevent="true">
            <nav className="flex flex-col gap-6 lg:gap-8">
              <Link onClick={closeMenu} className="font-display-lg text-[36px] lg:text-[56px] font-bold text-white hover:text-writtenly-orange transition-colors leading-tight" href="/about/">About Us</Link>
              <Link onClick={closeMenu} className="font-display-lg text-[36px] lg:text-[56px] font-bold text-white hover:text-writtenly-orange transition-colors leading-tight" href="/services/">Services</Link>
              <Link onClick={closeMenu} className="font-display-lg text-[36px] lg:text-[56px] font-bold text-white hover:text-writtenly-orange transition-colors leading-tight" href="/career/">Career</Link>
              <Link onClick={closeMenu} className="font-display-lg text-[36px] lg:text-[56px] font-bold text-white hover:text-writtenly-orange transition-colors leading-tight" href="/blog/write-for-us/">Write For Us</Link>
              <Link onClick={closeMenu} className="font-display-lg text-[36px] lg:text-[56px] font-bold text-white hover:text-writtenly-orange transition-colors leading-tight" href="/contact">Contact</Link>
            </nav>
            
            <div className="flex flex-col gap-6 lg:gap-8 lg:pt-3">
              <span className="font-headline-md text-[16px] lg:text-[20px] font-bold text-white/50 uppercase tracking-widest">Resources</span>
              <nav className="flex flex-col gap-4 lg:gap-6 border-l-2 border-white/10 pl-6 lg:pl-8">
                <Link onClick={closeMenu} className="font-display-lg text-[28px] lg:text-[40px] font-bold text-white/90 hover:text-writtenly-orange transition-colors leading-tight" href="/blog">Blog</Link>
                <Link onClick={closeMenu} className="font-display-lg text-[28px] lg:text-[40px] font-bold text-white/90 hover:text-writtenly-orange transition-colors leading-tight" href="/news">News</Link>
                <Link onClick={closeMenu} className="font-display-lg text-[28px] lg:text-[40px] font-bold text-white/90 hover:text-writtenly-orange transition-colors leading-tight" href="/our-work">Our Work</Link>
              </nav>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
