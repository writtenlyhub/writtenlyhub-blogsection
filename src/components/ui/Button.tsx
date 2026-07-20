import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-label-md text-label-md transition-all rounded-full font-bold shadow-sm whitespace-nowrap px-5 py-2";
  
  const variants = {
    primary: "bg-writtenly-orange text-white border border-writtenly-orange hover:opacity-90",
    outline: "bg-white text-on-surface-variant border border-outline-variant hover:border-writtenly-orange hover:text-writtenly-orange",
    ghost: "bg-transparent text-secondary-container hover:opacity-80 shadow-none px-0 py-0",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
