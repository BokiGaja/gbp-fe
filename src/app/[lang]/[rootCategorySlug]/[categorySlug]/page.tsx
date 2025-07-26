import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BASE_API } from '@/constants/api';
import React from 'react';
import CategoryGrid from '@/components/categoryGrid/CategoryGrid';
import { getTranslations } from 'next-intl/server';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; rootCategorySlug: string; categorySlug: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations('category');
  let data = null;
  let error = null;
  try {
    const res = await fetch(`${BASE_API}/categories?slug=${resolvedParams.categorySlug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Not found');
    data = await res.json();
  } catch (e) {
    error = e;
  }

  const category = Array.isArray(data) ? data[0] : data;
  if (error || !category) return <div>{t('notFound')}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 w-full px-4 py-10">
        <CategoryGrid slug={category.slug} />
      </main>
      <Footer />
    </div>
  );
}
