import React from 'react';
import { formatSGD } from '@/lib/travel-formatters';

interface PriceLabelProps {
  priceSGD: number;
  perPerson?: boolean;
  showDisclosure?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceLabel({
  priceSGD,
  perPerson = true,
  showDisclosure = true,
  size = 'md',
  className = '',
}: PriceLabelProps) {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className={`font-serif font-bold text-roamora-green tracking-tight ${sizeClasses[size]}`}>
          {formatSGD(priceSGD)}
        </span>
        {perPerson && (
          <span className="font-mono text-xs text-roamora-muted tracking-wide">
            per person
          </span>
        )}
      </div>
      {showDisclosure && (
        <span className="mt-1 font-mono text-[10px] text-roamora-muted tracking-wider uppercase leading-tight">
          Illustrative demo price · Non-live
        </span>
      )}
    </div>
  );
}
