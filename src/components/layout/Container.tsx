import { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div
      className={`w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({ children, className = '', ...props }: ContainerProps) {
  return (
    <section
      className={`w-full py-16 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
