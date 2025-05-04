'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

const items = [
  { title: 'Ground', bg: 'bg-[#1E293B]' },
  { title: 'Security', bg: 'bg-[#334155]' },
  { title: 'Air', bg: 'bg-[#1D4ED8]' },
  { title: 'Space', bg: 'bg-[#4F46E5]' },
  { title: 'Sea', bg: 'bg-[#1E40AF]' },
  { title: 'Ammunition', bg: 'bg-[#713F12]' },
  { title: 'Mediation', bg: 'bg-[#334155]' },
];

const Products = () => {
  const t = useTranslations('common');

  return (
    <div className="my-30 px-4">
      <h2 className="text-3xl text-[#000D2D] font-[500] mb-12">{t('productsTitle')}</h2>

      {/* ✅ Mobile: Unified Grid */}
      <div className="grid grid-cols-1 gap-2 md:hidden">
        {items.map((item) => (
          <div key={item.title} className={`relative ${item.bg} min-h-[160px]`}>
            <div className="absolute top-6 left-6 text-white font-medium">{item.title}</div>
          </div>
        ))}
      </div>

      {/* ✅ Desktop: Two Grid Sections */}
      <div className="hidden md:block">
        {/* Top Section */}
        <div className="grid [grid-template-columns:1.3fr_0.85fr_0.85fr] grid-rows-2 gap-2 h-[480px]">
          <div className={`relative ${items[0].bg} row-span-2`}>
            <div className="absolute top-6 left-6 text-white font-medium">{items[0].title}</div>
          </div>
          <div className={`relative ${items[1].bg} col-span-2`}>
            <div className="absolute top-6 left-6 text-white font-medium">{items[1].title}</div>
          </div>
          <div className={`relative ${items[2].bg}`}>
            <div className="absolute top-6 left-6 text-white font-medium">{items[2].title}</div>
          </div>
          <div className={`relative ${items[3].bg}`}>
            <div className="absolute top-6 left-6 text-white font-medium">{items[3].title}</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-2 h-[240px] mt-2">
          {items.slice(4).map((item) => (
            <div key={item.title} className={`relative ${item.bg}`}>
              <div className="absolute top-6 left-6 text-white font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
