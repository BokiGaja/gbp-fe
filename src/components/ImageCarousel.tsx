import React, { useState } from 'react';
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
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className={`w-full ${className}`}>
      {/* Main Image */}
      <div className="relative w-full h-[400px] lg:h-[500px] mb-6 overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority={selectedIndex === 0}
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => {
          const thumbUrl = image.formats?.thumbnail?.url || image.url;

          return (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className="flex-shrink-0 relative group transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-20 h-16 lg:w-24 lg:h-18 overflow-hidden">
                <Image src={thumbUrl} alt={image.name} fill className="object-cover" sizes="80px" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
