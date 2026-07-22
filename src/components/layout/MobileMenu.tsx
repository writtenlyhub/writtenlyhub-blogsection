'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  contactEmail: string;
}

export function MobileMenu({ contactEmail }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden'; // Lock scroll
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Sync state and handle cleanup
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let mounted = true;
    const onClose = () => {
      if (!mounted) return;
      setIsOpen(false);
      document.body.style.overflow = ''; // Restore scroll
    };

    dialog.addEventListener('close', onClose);
    return () => {
      mounted = false;
      dialog.removeEventListener('close', onClose);
      document.body.style.overflow = ''; // Ensure scroll is restored on unmount
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
        <span className="material-symbols-outlined text-[20px]">menu</span>
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
            <span className="text-white font-bold font-headline-md tracking-tight">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center w-9 h-9"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
            <Link onClick={closeMenu} className="text-white/80 hover:text-writtenly-orange transition-colors font-headline-md font-bold" href="#">About</Link>
            <Link onClick={closeMenu} className="text-white/80 hover:text-writtenly-orange transition-colors font-headline-md font-bold" href="#">Services</Link>
            <Link onClick={closeMenu} className="text-white/80 hover:text-writtenly-orange transition-colors font-headline-md font-bold" href="#">Case Studies</Link>
            <Link onClick={closeMenu} className="text-writtenly-orange font-bold font-headline-md" href="/">Blog</Link>
            <Link onClick={closeMenu} className="text-white/80 hover:text-writtenly-orange transition-colors font-headline-md font-bold" href="#">Career</Link>
            <Link onClick={closeMenu} className="text-white/80 hover:text-writtenly-orange transition-colors font-headline-md font-bold" href="#">Write For Us</Link>
          </nav>

          {/* Footer CTA */}
          <div className="mt-auto p-6 border-t border-white/10">
            <a 
              href={`mailto:${contactEmail}`}
              onClick={closeMenu}
              className="flex w-full items-center justify-center px-6 py-4 bg-writtenly-orange text-white rounded-full font-label-md font-bold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
