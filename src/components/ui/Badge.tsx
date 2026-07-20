import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'solid' | 'text';
  className?: string;
}

export function Badge({ children, variant = 'text', className = '' }: BadgeProps) {
  const baseStyles = "font-label-md text-label-md text-[10px] uppercase tracking-wider font-bold text-secondary-container";
  const variants = {
    solid: "px-2.5 py-0.5 bg-surface-container-low rounded",
    text: "",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
