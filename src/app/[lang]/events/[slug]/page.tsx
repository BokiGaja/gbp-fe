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

  const { data: eventData, isLoading, error } = useEvent(slug, lang);
  const event = Array.isArray(eventData) ? eventData[0] : eventData;

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error || !event) return <NotFound />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[500] mb-6 md:mb-10 text-[#000D2D] text-center">
            {event.title}
          </h1>

          {/* Cover Image */}
          {event.coverImage && (
            <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  event.coverImage.url ||
                  event.coverImage.formats?.large?.url ||
                  event.coverImage.formats?.medium?.url ||
                  event.coverImage.formats?.small?.url ||
                  ''
                }
                alt={event.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="flex justify-center mb-8 md:mb-12">
              <div
                className="max-w-3xl font-sans text-[#000D2D] prose prose-lg [&>h3]:text-3xl [&>h3]:font-[500] [&>h3]:mb-6 [&>h3]:mt-8 [&>h4]:font-[500] [&>h4]:text-xl [&>h4]:text-[#000D2D]/70 [&>h4]:mb-4 [&>h4]:mt-6 [&>p]:text-base [&>p]:leading-8 [&>p]:text-[#000D2D]/70 [&>p]:mb-4 [&>p+*]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-2 [&_ul]:mb-6 [&_ul]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-2 [&_ol]:mb-6 [&_ol]:text-base [&_li]:text-base [&_li]:leading-8 [&_li]:text-[#000D2D]/70 [&_a]:text-[#000D2D] [&_a]:underline [&_a]:hover:text-[#000D2D]/80 [&_strong]:text-[#000D2D] [&_strong]:font-[600] [&_em]:text-[#000D2D]/70"
                dangerouslySetInnerHTML={{ __html: event.description || '' }}
              />
            </div>
          )}

          {/* Content (Markdown) */}
          {event.content && (
            <div className="flex justify-center mb-16 md:mb-24">
              <div className="max-w-3xl w-full">
                <MarkdownRenderer content={event.content} />
              </div>
            </div>
          )}

          {/* Image Carousel */}
          {event.carousel && event.carousel.length > 0 && (
            <div className="mb-8 md:mb-12">
              <ImageCarousel images={event.carousel} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
