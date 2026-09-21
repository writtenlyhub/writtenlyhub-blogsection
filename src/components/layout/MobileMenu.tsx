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
    setIsOpen(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 500); // Wait for transition to finish
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
        className={`fixed m-0 p-0 w-full h-full max-w-none max-h-none border-0 outline-none bg-writtenly-navy transition-transform duration-500 ease-in-out z-[100] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={handleDialogClick}
      >
        <div 
          className="w-full h-full flex flex-col relative"
          role="document"
        >
          {/* Header Area */}
          <div className="flex items-center justify-between p-6 lg:p-12 absolute top-0 left-0 w-full z-10">
            <div className="w-16 lg:w-24">
              <Image
                alt="WrittenlyHub Bird Logo"
                src="/images/logos/bird-accent.svg"
                width={80}
                height={80}
                className="w-full h-auto object-contain"
              />
            </div>
            <button
              onClick={closeMenu}
              aria-label="Close overlay"
              className="text-writtenly-navy bg-white p-3 lg:p-4 rounded-full hover:bg-white/90 transition-transform hover:scale-105 flex items-center justify-center shadow-xl"
            >
              <X size={32} strokeWidth={2} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12 mt-20 lg:mt-0">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Left Column (Illustration) */}
              <div className="hidden lg:flex items-center justify-center w-full h-full relative min-h-[400px]">
                <Image
                  src="/images/contact-map.png"
                  alt="WrittenlyHub Location Map"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right Column (Text Content) */}
              <div className="flex flex-col gap-6 max-w-lg">
                <div>
                  <h2 className="font-display-lg text-3xl lg:text-[40px] font-bold text-white leading-tight mb-3">
                    We are in the heart of India's Silicon Valley,
                  </h2>
                  <h3 className="font-display-md text-2xl lg:text-[32px] font-bold text-writtenly-orange italic">
                    Namma Bengaluru
                  </h3>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-headline-md text-lg lg:text-xl text-white font-medium">
                    Address
                  </span>
                  <p className="font-body-lg text-base lg:text-lg text-white/90 leading-relaxed max-w-md">
                    172/1, 1st floor, 5th Main, 9th Cross Rd, Opposite to Kairalee Nikethan Education Trust, Indira Nagar 1st Stage, Bengaluru, Karnataka-560038
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
