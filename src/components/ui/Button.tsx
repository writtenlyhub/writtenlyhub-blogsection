import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'invertedOutline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-label-md text-label-md transition-all rounded-md font-bold shadow-sm whitespace-nowrap px-[18px] py-[8px]";
    
    const variants = {
      primary: "bg-writtenly-orange text-white border border-writtenly-orange hover:opacity-90",
      outline: "bg-white text-on-surface-variant border border-outline-variant hover:border-writtenly-orange hover:text-writtenly-orange",
      ghost: "bg-transparent text-secondary-container hover:opacity-80 shadow-none px-0 py-0",
      invertedOutline: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

