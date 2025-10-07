'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import { useItem } from '@/hooks/useCategories';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
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
            {/* Description (HTML from item.description) */}
            <div
              className="max-w-2xl font-sans text-[#000D2D] [&>h3]:text-3xl [&>h3]:font-[500] [&>h3]:mb-6 [&>h4]:font-[500] [&>h4]:text-[#000D2D]/70 [&>p]:text-base [&>p]:leading-8 [&>p]:text-[#000D2D]/70 [&>p+*]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-2 [&_ul]:mb-6 [&_ul]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-2 [&_ol]:mb-6 [&_ol]:text-base [&_li]:text-base [&_li]:leading-8 [&_li]:text-[#000D2D]/70 [&_a]:text-[#000D2D]/70 [&_strong]:text-[#000D2D]/70 [&_em]:text-[#000D2D]/70"
              dangerouslySetInnerHTML={{ __html: item.description || '' }}
            />
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
