'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface EditorialImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'wide' | 'auto';
  caption?: string;
}

export function EditorialImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  className = '',
  aspectRatio = 'auto',
  caption,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    auto: '',
  }[aspectRatio];

  const containerClasses = fill
    ? `relative w-full h-full overflow-hidden ${aspectClass} ${className}`
    : `relative overflow-hidden ${aspectClass} ${className}`;

  return (
    <figure className={containerClasses}>
      {hasError ? (
        <div className="w-full h-full min-h-[160px] bg-roamora-sand flex flex-col items-center justify-center p-6 text-center border border-roamora-border">
          <div className="w-8 h-8 rounded-full border border-roamora-green/40 flex items-center justify-center mb-2 text-roamora-green font-mono text-xs font-bold">
            SG
          </div>
          <span className="font-serif text-sm text-roamora-text/90">{alt}</span>
          <span className="font-mono text-[10px] text-roamora-muted mt-1 uppercase tracking-wider">
            Roamora Visual Archive
          </span>
        </div>
      ) : fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full"
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          className="object-cover w-full h-auto"
          onError={() => setHasError(true)}
        />
      )}

      {caption && (
        <figcaption className="mt-2 font-mono text-[11px] text-roamora-muted uppercase tracking-wider">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
