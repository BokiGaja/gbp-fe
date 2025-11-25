'use client';

import { useTranslations } from 'next-intl';
import { useAboutUsGalleries } from '@/hooks/useAboutUsGalleries';
import { useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function AboutHero() {
  const t = useTranslations('about.hero');
  const params = useParams();
  const locale = params.lang as string;
  const { data } = useAboutUsGalleries(locale);

  // Fallback to translations if no data
  const title = data?.title || t('title');
  const description = data?.description || t('description');

  return (
    <section className="w-full bg-white pt-12 md:pt-20 pb-12">
      <div className="mx-auto flex flex-col items-center tracking-wider max-w-5xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-[500] text-[#000D2D] mb-8 md:mb-12 leading-tight text-center">
          {title}
        </h1>

        {/* Logos row */}
        <div className="flex items-center justify-center mb-4 md:mb-6 w-full">
          <div className="flex flex-row gap-px w-full max-w-2xl bg-white rounded-lg">
            <div className="flex items-center justify-center flex-1 p-4 bg-[#F5F5F5]">
              <img src="/idmir-logo.png" alt="Logo 2" width={120} height={120} />
            </div>
            <div className="flex items-center justify-center flex-1 p-4 bg-[#F5F5F5]">
              <img src="/gbp-logo.png" alt="Logo 1" width={120} height={120} />
            </div>
            <div className="flex items-center justify-center flex-1 p-4 bg-[#F5F5F5]">
              <img src="/dj-logo.png" alt="Logo 3" width={120} height={120} />
            </div>
          </div>
        </div>

        {/* Description text */}
        <div className="w-full max-w-4xl">
          <MarkdownRenderer content={description || ''} />
        </div>
      </div>
    </section>
  );
}
