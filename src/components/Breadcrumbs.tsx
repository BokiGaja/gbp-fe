'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Category } from '@/types/category';

interface BreadcrumbsProps {
  lang: string;
  category: Category;
}

export default function Breadcrumbs({ lang, category }: BreadcrumbsProps) {
  const t = useTranslations();

  return (
    <div className="mb-4">
      <div className="flex items-center text-sm text-[#8B94A7]">
        <Link href={`/${lang}`} className="hover:text-[#000D2D] transition-colors">
          {t('nav.home')}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        {category.parents?.map((parent: Category) => (
          <React.Fragment key={parent.id}>
            <Link
              href={`/${lang}/categories/${parent.slug}`}
              className="hover:text-[#000D2D] transition-colors"
            >
              {parent.name}
            </Link>
            <ChevronRight size={16} className="mx-2" />
          </React.Fragment>
        ))}
        <span className="text-[#000D2D] font-medium">{category.name}</span>
      </div>
    </div>
  );
}
