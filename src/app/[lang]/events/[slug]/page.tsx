'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import { useEvent } from '@/hooks/useEvents';
import { useParams } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import NotFound from '@/components/NotFound';
import LoadingPage from '@/components/LoadingPage';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const EventPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const lang = params.lang as string;

  const { data: eventData, isLoading, error } = useEvent(slug);
  const event = Array.isArray(eventData) ? eventData[0] : eventData;

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error || !event) return <NotFound />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 w-full px-4 py-10">
        <div className="mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-[500] mb-8 text-[#000D2D]">{event.title}</h1>

          {/* Cover Image */}
          {event.coverImage && (
            <div className="mb-8">
              <img
                src={
                  event.coverImage.url ||
                  event.coverImage.formats?.large?.url ||
                  event.coverImage.formats?.medium?.url ||
                  event.coverImage.formats?.small?.url ||
                  ''
                }
                alt={event.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image Carousel */}
          {event.carousel && event.carousel.length > 0 && (
            <div className="mb-8">
              <ImageCarousel images={event.carousel} />
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="flex justify-center mb-8">
              <div
                className="max-w-2xl font-sans text-[#000D2D] [&>h3]:text-3xl [&>h3]:font-[500] [&>h3]:mb-6 [&>h4]:font-[500] [&>h4]:text-[#000D2D]/70 [&>p]:text-base [&>p]:leading-8 [&>p]:text-[#000D2D]/70 [&>p+*]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-2 [&_ul]:mb-6 [&_ul]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-2 [&_ol]:mb-6 [&_ol]:text-base [&_li]:text-base [&_li]:leading-8 [&_li]:text-[#000D2D]/70 [&_a]:text-[#000D2D]/70 [&_strong]:text-[#000D2D]/70 [&_em]:text-[#000D2D]/70"
                dangerouslySetInnerHTML={{ __html: event.description || '' }}
              />
            </div>
          )}

          {/* Content (Markdown) */}
          {event.content && (
            <div className="flex justify-center mb-[100px]">
              <div className="max-w-2xl w-full">
                <MarkdownRenderer content={event.content} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;

