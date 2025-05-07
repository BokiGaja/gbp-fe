'use client';
import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  slug: string;
  coverImage?: {
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
};

type Item = {
  title: string;
  image: string;
  slug: string;
};

const Products = () => {
  const t = useTranslations('home');
  const { data, isLoading, isError } = useCategories();

  // Memoize the items array from API data
  const items = useMemo(() => {
    if (!data?.categories) return [];
    return (data.categories as Category[]).map((cat) => ({
      title: cat.name,
      image: cat.coverImage?.formats?.small?.url || cat.coverImage?.formats?.thumbnail?.url || '',
      slug: cat.slug,
    }));
  }, [data]);

  if (isLoading) return (
    <div className="py-20 px-4 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
  if (isError) return <div className="py-20 px-4 text-red-500">{t('errorLoading')}</div>;

  return (
    <div className="py-20 md:py-30 px-4">
      <h2 className="text-4xl text-[#000D2D] font-[500] mb-12">{t('productsTitle')}</h2>

      {/* ✅ Mobile: Unified Grid */}
      <div className="grid grid-cols-1 gap-1 md:hidden">
        {items.map((item: Item) => (
          <div key={item.slug} className="relative h-[200px] min-h-[200px] overflow-hidden cursor-pointer group">
            <Link href={`/en/${item.slug}`} className="block w-full h-full">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">
                {item.title}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ Desktop: Two Grid Sections */}
      <div className="hidden md:block">
        {/* Top Section */}
        <div className="grid [grid-template-columns:1.3fr_0.85fr_0.85fr] grid-rows-2 gap-1 h-[480px]">
          <div className="relative row-span-2 overflow-hidden cursor-pointer group">
            <Link href={`/en/${items[0]?.slug}`} className="block w-full h-full">
              <img 
                src={items[0]?.image} 
                alt={items[0]?.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[0]?.title}</div>
            </Link>
          </div>
          <div className="relative col-span-2 overflow-hidden cursor-pointer group">
            <Link href={`/en/${items[1]?.slug}`} className="block w-full h-full">
              <img 
                src={items[1]?.image} 
                alt={items[1]?.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[1]?.title}</div>
            </Link>
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
            <Link href={`/en/${items[2]?.slug}`} className="block w-full h-full">
              <img 
                src={items[2]?.image} 
                alt={items[2]?.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[2]?.title}</div>
            </Link>
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
            <Link href={`/en/${items[3]?.slug}`} className="block w-full h-full">
              <img 
                src={items[3]?.image} 
                alt={items[3]?.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[3]?.title}</div>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-1 h-[240px] mt-1">
          {items.slice(4).map((item: Item) => (
            <div key={item.slug} className="relative overflow-hidden cursor-pointer group">
              <Link href={`/en/${item.slug}`} className="block w-full h-full">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
                />
                <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                  <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
                </div>
                <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{item.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
