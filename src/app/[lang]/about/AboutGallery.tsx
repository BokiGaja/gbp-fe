'use client';

import { useAboutUsGalleries } from '@/hooks/useAboutUsGalleries';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

export default function AboutGallery() {
  const params = useParams();
  const locale = params.lang as string;
  const { data, isLoading } = useAboutUsGalleries(locale);
  const t = useTranslations('about.gallery');

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-20">
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const images: GalleryImage[] = data?.images || [];

  if (!images || images.length === 0) {
    return null;
  }

  const [firstImage, ...restImages] = images;

  return (
    <section className="w-full py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12 text-center">
        {t('title')}
      </h2>

      {/* Mobile: Unified Grid */}
      <div className="grid grid-cols-1 gap-1 md:hidden">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative w-full aspect-square overflow-hidden bg-gray-100 group"
          >
            <Image
              src={image.url}
              alt={`Gallery image ${image.id}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop: Left large image + Right grid */}
      <div className="hidden md:flex md:gap-1">
        {/* Left: Large image */}
        {firstImage && (
          <div className="relative flex-1 h-[604px] overflow-hidden bg-gray-100 group">
            <Image
              src={firstImage.url}
              alt={`Gallery image ${firstImage.id}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Right: Grid of other images (2x2) */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 h-[604px]">
          {restImages.slice(0, 4).map((image) => (
            <div key={image.id} className="relative overflow-hidden bg-gray-100 group h-full">
              <Image
                src={image.url}
                alt={`Gallery image ${image.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
