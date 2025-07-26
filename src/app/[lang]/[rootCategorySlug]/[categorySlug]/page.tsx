import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BASE_API } from '@/constants/api';
import React from 'react';
import CategoryGrid from '@/components/categoryGrid/CategoryGrid';
import LoadingPage from '@/components/LoadingPage';
import NotFound from '@/components/NotFound';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; rootCategorySlug: string; categorySlug: string }>;
}) {
  const resolvedParams = await params;
  let data = null;
  let error = null;
  let isLoading = false;

  try {
    const res = await fetch(`${BASE_API}/categories?slug=${resolvedParams.categorySlug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Not found');
    data = await res.json();
    isLoading = true;
  } catch (e) {
    error = e;
    isLoading = false;
  } finally {
    isLoading = false;
  }

  const category = Array.isArray(data) ? data[0] : data;

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
