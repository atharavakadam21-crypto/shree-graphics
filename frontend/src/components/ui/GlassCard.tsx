import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
  hasAccentLeft?: boolean;
}

export function GlassCard({
  raised = false,
  hasAccentLeft = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        raised ? 'glass-raised' : 'glass',
        'p-6 transition-colors duration-300',
        hasAccentLeft &&
          'border-l-2 border-l-cyan-300/70',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}