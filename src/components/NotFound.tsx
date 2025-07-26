'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ title, message, showBackButton = true }) => {
  const t = useTranslations('item');
  const params = useParams();
  const lang = params.lang as string;

  const defaultTitle = title || t('notFound');
  const defaultMessage = message || t('notFoundMessage');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 w-full px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="text-8xl md:text-9xl font-bold text-[#000D2D]/10 mb-8">404</div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-[500] mb-6 text-[#000D2D]">{defaultTitle}</h1>

          {/* Message */}
          <p className="text-lg text-[#8B94A7] mb-12 max-w-md mx-auto">{defaultMessage}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 bg-[#000D2D] text-white rounded-lg hover:bg-[#000D2D]/90 transition-colors"
              >
                <ArrowLeft size={20} />
                {t('goBack')}
              </button>
            )}

            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#000D2D] border border-[#000D2D] rounded-lg hover:bg-[#000D2D] hover:text-white transition-colors"
            >
              <Home size={20} />
              {t('goHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
