import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import CategoryGrid from '@/components/categoryGrid/CategoryGrid';
import { fetchCategory } from '@/hooks/useCategories';
import LoadingPage from '@/components/LoadingPage';
import NotFound from '@/components/NotFound';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; rootCategorySlug: string; categorySlug: string }>;
}) {
  const resolvedParams = await params;
  let categoryData;
  let error = null;
  let isLoading = false;

  try {
    categoryData = await fetchCategory(resolvedParams.categorySlug);
    isLoading = true;
  } catch (e) {
    error = e;
    isLoading = false;
  } finally {
    isLoading = false;
  }

  const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;

  if (isLoading) return <LoadingPage />;
  if (error || !category) return <NotFound />;

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
