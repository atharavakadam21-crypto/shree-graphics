import { cn } from '@/lib/utils';

type BadgeTone = 'cyan' | 'magenta' | 'amber' | 'success' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  cyan: 'text-cyan border-cyan/30 bg-cyan/10',
  magenta: 'text-magenta border-magenta/30 bg-magenta/10',
  amber: 'text-amber border-amber/30 bg-amber/10',
  success: 'text-success border-success/30 bg-success/10',
  neutral: 'text-steel-400 border-line bg-white/5',
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-xs uppercase tracking-wider', toneStyles[tone], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}