'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
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
        className="md:hidden text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
      >
        <Menu size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="fixed m-0 p-0 w-full h-full max-w-none max-h-none border-0 outline-none bg-transparent backdrop:bg-writtenly-navy/80 backdrop:backdrop-blur-sm"
        onClick={handleDialogClick}
      >
        <div 
          className="absolute top-0 right-0 h-full w-[80vw] max-w-sm bg-writtenly-navy shadow-2xl flex flex-col"
          role="document"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="font-headline-md text-headline-md text-white font-bold tracking-tight">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center w-9 h-9"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto" data-lenis-prevent="true">
            <Link onClick={closeMenu} className="font-headline-md text-headline-md font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="#">About</Link>
            <Link onClick={closeMenu} className="font-headline-md text-headline-md font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="#">Services</Link>
            
            <div className="flex flex-col gap-4">
              <span className="font-headline-md text-headline-md font-bold text-white/50">Resources</span>
              <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                <Link onClick={closeMenu} className="font-headline-md text-[20px] font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="/">Blog</Link>
                <Link onClick={closeMenu} className="font-headline-md text-[20px] font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="/news">News</Link>
                <Link onClick={closeMenu} className="font-headline-md text-[20px] font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="/success-stories">Our Work</Link>
              </div>
            </div>

            <Link onClick={closeMenu} className="font-headline-md text-headline-md font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="#">Career</Link>
            <Link onClick={closeMenu} className="font-headline-md text-headline-md font-bold text-white/80 hover:text-writtenly-orange transition-colors" href="#">Write For Us</Link>
          </nav>

          {/* Footer CTA removed as requested */}
        </div>
      </dialog>
    </>
  );
}
