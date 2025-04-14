import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <div className="prose lg:prose-xl">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <p className="text-lg text-gray-700">{t('description')}</p>
    </div>
  );
} 