'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

interface LoadingPageProps {
  message?: string;
  namespace?: string;
  showNavigation?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  message,
  namespace = 'item',
  showNavigation = true,
}) => {
  const t = useTranslations(namespace);
  const loadingMessage = message || t('loading');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {showNavigation && <Navigation />}
      <main className="flex-1 w-full px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-[#000D2D] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#8B94A7]">{loadingMessage}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingPage;
