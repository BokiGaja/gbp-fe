'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import { useItem } from '@/hooks/useCategories';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ImageCarousel from '@/components/ImageCarousel';
import VideoPreview from '@/components/VideoPreview';
import NotFound from '@/components/NotFound';
import LoadingPage from '@/components/LoadingPage';

const ItemPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const lang = params.lang as string;

  const { data: itemData, isLoading, error } = useItem(slug);
  const item = Array.isArray(itemData) ? itemData[0] : itemData;

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error || !item) return <NotFound />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 w-full px-4 py-10">
        <div className="mx-auto">
          {/* Breadcrumbs */}
          {item.categories && item.categories.length > 0 && (
            <Breadcrumbs lang={lang} category={item.categories[0]} itemTitle={item.name} />
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-[500] mb-8 text-[#000D2D]">{item.name}</h1>

          {/* Image Carousel */}
          {item.carousel && item.carousel.length > 0 && (
            <div className="mb-8">
              <ImageCarousel images={item.carousel} />
            </div>
          )}

          {/* Item Content */}
          <div className="flex justify-center mb-[100px]">
            {/* Description */}
            <div className="max-w-2xl space-y-6">
              {item.description && <MarkdownRenderer content={item.description} />}
            </div>
          </div>

          {/* Video Preview */}
          {item.video_url && (
            <div className="flex justify-center mb-[100px]">
              <div className="max-w-2xl w-full">
                <VideoPreview videoUrl={item.video_url} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItemPage;
