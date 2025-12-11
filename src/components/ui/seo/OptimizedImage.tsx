import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
  title?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  onLoad,
  onError,
  fallback,
  title,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        title={title}
      />
    );
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-400">
          <ImageOff className="h-8 w-8 mx-auto mb-2" />
          <p className="text-xs">Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        title={title || alt}
      />
    </div>
  );
}

// Component pour gérer le texte alternatif dans l'admin
interface ImageAltEditorProps {
  imageUrl: string;
  currentAlt: string;
  onSave: (alt: string) => void;
}

export function ImageAltEditor({ imageUrl, currentAlt, onSave }: ImageAltEditorProps) {
  const [alt, setAlt] = useState(currentAlt);

  return (
    <div className="space-y-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <label className="block text-sm font-medium text-gray-700">
        Texte alternatif de l'image
      </label>
      <div className="flex gap-2 items-start">
        <img
          src={imageUrl}
          alt={alt || 'Aperçu'}
          className="w-20 h-20 object-cover rounded border border-gray-300"
        />
        <div className="flex-1">
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Décrivez cette image de façon précise..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14548C]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Le texte alternatif aide les moteurs de recherche et les lecteurs d'écran
          </p>
          {alt.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Caractères: {alt.length} {alt.length > 125 && '(recommandé: moins de 125)'}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onSave(alt)}
        className="px-4 py-2 bg-[#14548C] text-white rounded-lg hover:bg-[#0d3a5f] transition-colors text-sm"
      >
        Enregistrer le texte alternatif
      </button>
    </div>
  );
}
