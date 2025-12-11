// src/components/blog/ImageWithFallback.tsx

'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export type ImageWithFallbackProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function ImageWithFallback({
  src,
  alt = 'Image',
  width = 88,
  height = 88,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  // Si src est invalide ou erreur → fallback
  if (!src || imageError) {
    return (
      <div
        className={`inline-block bg-muted text-center align-middle ${className || ''}`}
        style={{ width, height }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={ERROR_IMG_SRC}
            alt="Image non chargée"
            width={48}
            height={48}
            unoptimized
            data-original-url={src}
          />
        </div>
      </div>
    );
  }

  // Sinon → image normale avec gestion d'erreur
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}