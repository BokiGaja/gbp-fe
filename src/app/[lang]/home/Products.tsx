'use client';
import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTopCategories } from '@/hooks/useCategories';
import ProductCard from '@/components/ProductCard';
import { Category } from '@/types/category';

export type ProductItem = {
  title: string;
  image: string;
  slug: string;
};

const Products = () => {
  const t = useTranslations('home');
  const params = useParams();
  const lang = params.lang as string;
  const { data, isLoading, isError } = useTopCategories(lang);

  // Memoize the items array from API data
  const items = useMemo(() => {
    if (!data?.categories) return [];
    return data.categories.map((cat: Category) => ({
      title: cat.name,
      image: cat.coverImage?.formats?.small?.url || cat.coverImage?.formats?.thumbnail?.url || '',
      slug: cat.slug,
    }));
  }, [data, lang]);

  if (isLoading)
    return (
      <div className="py-20 px-4 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  if (isError) return <div className="py-20 px-4 text-red-500">{t('errorLoading')}</div>;

  return (
    <div className="pt-20 md:pt-30 px-4">
      <h2 className="text-3xl md:text-4xl text-[#000D2D] font-[500] mb-8 md:mb-12">
        {t('productsTitle')}
      </h2>

      {/* ✅ Mobile: Unified Grid */}
      <div className="grid grid-cols-1 gap-1 md:hidden">
        {items.map((item: ProductItem) => (
          <ProductCard
            key={item.slug}
            title={item.title}
            image={item.image}
            slug={item.slug}
            className="h-[200px] min-h-[200px]"
            item={item}
          />
        ))}
      </div>

      {/* ✅ Desktop: Two Grid Sections */}
      <div className="hidden md:block">
        {/* Top Section */}
        <div className="grid [grid-template-columns:1.3fr_0.85fr_0.85fr] grid-rows-2 gap-1 h-[480px]">
          <ProductCard
            title={items[0]?.title}
            image={items[0]?.image}
            slug={items[0]?.slug}
            className="row-span-2"
            item={items[0]}
          />
          <ProductCard
            title={items[1]?.title}
            image={items[1]?.image}
            slug={items[1]?.slug}
            className="col-span-2"
            item={items[1]}
          />
          <ProductCard
            title={items[2]?.title}
            image={items[2]?.image}
            slug={items[2]?.slug}
            item={items[2]}
          />
          <ProductCard
            title={items[3]?.title}
            image={items[3]?.image}
            slug={items[3]?.slug}
            item={items[3]}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-1 h-[240px] mt-1">
          {items.slice(4).map((item: ProductItem) => (
            <ProductCard
              key={item.slug}
              title={item.title}
              image={item.image}
              slug={item.slug}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
