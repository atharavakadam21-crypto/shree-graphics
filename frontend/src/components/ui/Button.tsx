'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-cyan text-ink border border-cyan hover:bg-cyan/90',
  secondary: 'glass text-steel-100 hover:border-cyan/50 hover:text-cyan',
  ghost: 'text-steel-400 border border-transparent hover:text-steel-100',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-200 disabled:pointer-events-none disabled:opacity-40',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';