import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('common');

  return (
    <div className="prose lg:prose-xl">
      <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
      <p className="text-lg text-gray-700">{t('about.description')}</p>
    </div>
  );
} 