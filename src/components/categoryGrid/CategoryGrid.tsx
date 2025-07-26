'use client';

import { useCategory, useCategories } from '@/hooks/useCategories';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import CategoryGridItem from './CategoryGridItem';
import { CategoryItem } from '@/types/grid';
import { Category } from '@/types/category';

interface CategoryGridProps {
  slug: string;
}

export default function CategoryGrid({ slug }: CategoryGridProps) {
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;
  const { data: categoryData, isLoading: isCategoryLoading } = useCategory(slug);
  const { data: allCategories, isLoading: isAllLoading } = useCategories();

  if (isCategoryLoading || isAllLoading) return <div>{t('category.loading')}</div>;
  if (!categoryData || !allCategories) return <div>{t('category.notFound')}</div>;

  const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;
  // Only root categories (no parents or parents.length === 0), excluding current
  const rootCategories = (allCategories || []).filter(
    (cat: Category) => (!cat.parents || cat.parents.length === 0) && cat.slug !== category.slug
  );

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs lang={lang} category={category} />

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-[500] mb-8 text-[#000D2D]">{category.name}</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] mb-[100px]">
        {/* Category Grid Items */}
        {category.children.map((item: CategoryItem, idx: number) => {
          return <CategoryGridItem key={item.id || idx} item={item} idx={idx} isCategory />;
        })}
        {/* Item Grid Items */}
        {category.items.map((item: CategoryItem, idx: number) => {
          return <CategoryGridItem key={item.id || idx} item={item} idx={idx} isCategory={false} />;
        })}
      </div>
      {/* Other categories section */}
      <section className="w-full pb-12">
        <h2 className="text-2xl font-[500] mb-6 text-[#000D2D]">{t('category.otherCategories')}</h2>
        <div className="flex flex-wrap gap-3">
          {rootCategories.map((cat: Category) => (
            <Link
              key={cat.id}
              href={`/${lang}/categories/${cat.slug}`}
              className="group flex items-center px-6 h-[56px] rounded-xl bg-[#F7F8FA] text-lg transition-colors duration-150"
            >
              <span className="font-normal text-[#8B94A7] group-hover:text-[#000D2D] transition-colors">
                {cat.name}
              </span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                <ChevronRight size={20} className="text-[#000D2D]" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
