'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface CarouselImage {
  id: number;
  name: string;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
  autoplayInterval?: number; // in milliseconds, default 5000
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = '',
  autoplayInterval = 5000,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    if (images && images.length > 0) {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }
  }, [images]);

  const goToPrevious = useCallback(() => {
    if (images && images.length > 0) {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images]);

  const goToImage = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!images || images.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start autoplay if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoplayInterval);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, goToNext, autoplayInterval, images]);

  if (!images || images.length === 0) {
    return null;
  }

  const selectedImage = images[selectedIndex];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image Container with Navigation Arrows */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] mb-6 overflow-hidden rounded-lg group">
        <Image
          src={selectedImage.url}
          alt={selectedImage.name}
          fill
          className="object-contain transition-opacity duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority={selectedIndex === 0}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-4 px-1 scrollbar-hide -mx-1 overflow-y-visible justify-center">
          {images.map((image, index) => {
            const thumbUrl = image.formats?.thumbnail?.url || image.url;
            const isActive = index === selectedIndex;

            return (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 relative transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-[#000D2D] ring-offset-1 md:ring-offset-2 scale-[1.03] md:scale-105'
                    : 'opacity-60 hover:opacity-100 hover:scale-[1.02] md:hover:scale-105'
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <div className="relative w-20 h-16 lg:w-24 lg:h-20 overflow-hidden rounded-md">
                  <Image
                    src={thumbUrl}
                    alt={image.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
