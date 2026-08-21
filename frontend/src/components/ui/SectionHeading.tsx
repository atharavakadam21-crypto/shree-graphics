import React from 'react';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'right';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${align === 'right' ? 'text-right ml-auto' : ''} ${className}`}>
      <div className="inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400/90 font-medium">
          {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 uppercase font-sans">
        {title}
      </h2>
      {description && (
        <p className="text-zinc-400 font-mono text-sm max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}