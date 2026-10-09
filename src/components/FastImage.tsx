import React, { useState, useEffect } from 'react';

interface FastImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
  fallbackTheme?: 'vault' | 'arctic' | 'island' | 'stadium' | 'circle' | 'maze' | 'water' | 'forest' | 'hero';
}

export const FastImage: React.FC<FastImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio,
  fallbackTheme = 'stadium',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  // Compute fast, lightweight source URL
  // YouTube hqdefault.jpg is 480x360 (~30KB) and loads instantly across global edge CDNs
  const getOptimizedSrc = (rawSrc?: string) => {
    if (!rawSrc) return undefined;
    // For YouTube maxresdefault which is often slow (1-2MB) or 404s, provide fast hqdefault
    if (rawSrc.includes('youtube.com') && rawSrc.includes('maxresdefault.jpg')) {
      return rawSrc.replace('maxresdefault.jpg', 'hqdefault.jpg');
    }
    return rawSrc;
  };

  useEffect(() => {
    const optimized = getOptimizedSrc(src);
    setCurrentSrc(optimized);
    setIsLoaded(false);
    setHasError(false);

    if (optimized) {
      const img = new Image();
      img.src = optimized;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
        img.onerror = () => {
          // If hqdefault failed, try original or mark error
          if (src && src !== optimized) {
            setCurrentSrc(src);
          } else {
            setHasError(true);
          }
        };
      }
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-[#12141D] ${aspectRatio ? aspectRatio : ''} ${containerClassName}`}
    >
      {/* 1. Instant Shimmer Skeleton (active while image is loading) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#12141D] via-[#1A1D2B] to-[#12141D] bg-[length:200%_100%] animate-pulse" />
      )}

      {/* 2. Fast Decoded Image */}
      {currentSrc && !hasError && (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}

      {/* 3. Fallback when image cannot be retrieved */}
      {(!currentSrc || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#12141D] text-neutral-500 font-mono text-xs p-4 text-center">
          <div className="space-y-1">
            <span className="block text-[#28B8E8] text-[10px] uppercase tracking-wider font-semibold">
              BEAST ARCHIVE STILL
            </span>
            <span className="text-[11px] text-neutral-400">{alt}</span>
          </div>
        </div>
      )}
    </div>
  );
};
