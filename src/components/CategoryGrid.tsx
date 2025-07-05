"use client";

import { useCategory, useCategories } from '@/hooks/useCategories';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

interface CategoryGridProps {
  slug: string;
}

interface GridItem {
  id?: string | number;
  slug: string;
  name: string;
  type?: 'service' | 'item';
  coverImage?: { url: string };
  image?: { url: string };
  children?: GridItem[];
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
  const gridItems = [
    ...(category.children || []),
    ...(category.items || [])
  ];
  // Only root categories (no parents or parents.length === 0), excluding current
  const rootCategories = (allCategories || []).filter((cat: { id: string | number; slug: string; name: string; parents?: { id: string | number; slug: string; name: string }[] }) => (!cat.parents || cat.parents.length === 0) && cat.slug !== category.slug);

  const buildCategoryPath = (category: { slug: string; parents?: { slug: string }[] }) => {
    const slugs = category.parents ? [...category.parents.map(p => p.slug), category.slug] : [category.slug];
    return `/${lang}/categories/${slugs.join('/')}`;
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-[#8B94A7]">
          <Link href={`/${lang}`} className="hover:text-[#000D2D] transition-colors">
            {t('nav.home')}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          {category.parents?.map((parent: { id: string | number; slug: string; name: string }) => (
            <React.Fragment key={parent.id}>
              <Link href={`/${lang}/categories/${parent.slug}`} className="hover:text-[#000D2D] transition-colors">
                {parent.name}
              </Link>
              <ChevronRight size={16} className="mx-2" />
            </React.Fragment>
          ))}
          <span className="text-[#000D2D] font-medium">{category.name}</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-[500] mb-8 text-[#000D2D]">{category.name}</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] mb-[100px]">
        {gridItems.map((item, idx) => {
          const imageUrl = item.coverImage?.url || item.image?.url;
          const name = item.name;
          // If item has children, it's a category; otherwise, it's an item/service
          const isCategory = !!item.children;
          let href = '';
          if (isCategory) {
            href = buildCategoryPath({ ...item, parents: [...(category.parents || []), category] });
          } else if ((item as GridItem).type === 'service') {
            href = `/service/${item.slug}`;
          } else {
            href = `/items/${item.slug}`;
          }
          return (
            <Link
              key={item.id || idx}
              href={href}
              className="relative group cursor-pointer overflow-hidden min-h-[220px] lg:min-h-[300px] flex flex-col justify-end bg-[#0A1633] shadow-md"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 6}
                />
              )}
              {/* Blue gradient overlay for text readability, fades out on hover */}
              <div className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
              </div>
              <div className="relative z-30 p-6 flex items-center justify-between">
                <span className="text-white text-lg font-[500] drop-shadow-md ml-4">{name}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-12 h-12 bg-white/20 border border-white rounded-full flex items-center justify-center">
                    <ChevronRight size={24} className="text-white" />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Other categories section */}
      <section className="w-full pb-12">
        <h2 className="text-2xl font-[500] mb-6 text-[#000D2D]">{t('category.otherCategories')}</h2>
        <div className="flex flex-wrap gap-3">
          {rootCategories.map((cat: { id: string | number; slug: string; name: string }) => (
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