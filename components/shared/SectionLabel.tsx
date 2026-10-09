import React from 'react';

interface SectionLabelProps {
  number?: string;
  category: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

export function SectionLabel({
  number,
  category,
  title,
  subtitle,
  alignment = 'left',
  light = false,
}: SectionLabelProps) {
  return (
    <div className={`mb-10 sm:mb-14 ${alignment === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      <div className="flex items-center gap-3 mb-3">
        {number && (
          <span className={`font-mono text-xs tracking-widest px-2 py-0.5 border ${
            light ? 'border-roamora-gold text-roamora-gold' : 'border-roamora-border text-roamora-terracotta bg-roamora-card'
          }`}>
            {number}
          </span>
        )}
        <span className={`font-mono text-xs tracking-wider uppercase font-semibold ${
          light ? 'text-roamora-sand/80' : 'text-roamora-muted'
        }`}>
          {category}
        </span>
      </div>
      <h2 className={`editorial-title text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] ${
        light ? 'text-roamora-card' : 'text-roamora-text'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg font-sans leading-relaxed ${
          light ? 'text-roamora-card/80' : 'text-roamora-text/75'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
