import { cn } from '@/lib/utils';

interface RegistrationMarkProps {
  label?: string;
  className?: string;
}

export function RegistrationMark({ label, className }: RegistrationMarkProps) {
  return (
    <div className={cn('flex items-center gap-2 text-steel-600', className)}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
      {label && <span className="font-mono text-xs uppercase tracking-wider">{label}</span>}
    </div>
  );
}