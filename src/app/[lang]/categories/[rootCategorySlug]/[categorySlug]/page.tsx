import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import CategoryGrid from '@/components/CategoryGrid';
import { getTranslations } from 'next-intl/server';
import { fetchCategory } from '@/hooks/useCategories';

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; rootCategorySlug: string; categorySlug: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations('category');
  let categoryData;
  let error = null;
  
  try {
    categoryData = await fetchCategory(resolvedParams.categorySlug);
  } catch (e) {
    error = e;
  }

  const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;
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