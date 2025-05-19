import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BASE_API } from '@/constants/api';
import React from 'react';

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; rootCategorySlug: string; categorySlug: string }> }) {
  const resolvedParams = await params;
  let category = null;
  let error = null;
  try {
    const res = await fetch(`${BASE_API}/categories/${resolvedParams.categorySlug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Not found');
    category = await res.json();
  } catch (e) {
    error = e;
  }

  if (error || !category) return <div>Category not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
        {/* Add more category details here */}
      </main>
      <Footer />
    </div>
  );
} 