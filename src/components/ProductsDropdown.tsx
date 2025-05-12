import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';

interface CategoriesDropdownProps {
  open: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  t: (key: string) => string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  coverImage?: {
    url: string;
    formats?: { thumbnail?: { url: string } };
  };
  children?: Category[];
  items?: { name: string }[];
}

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ open, dropdownRef, t }) => {
  const { data: categories, isLoading, isError } = useCategories();
  const [selected, setSelected] = useState<Category | null>(null);

  // Only root categories (with children or items)
  const rootCategories = (categories || []).filter((cat: Category) => (cat.children && cat.children.length > 0) || (cat.items && cat.items.length > 0));

  useEffect(() => {
    if (rootCategories.length > 0) {
      setSelected(rootCategories[0]);
    }
  }, [categories]);

  if (!open) return null;
  if (isLoading) return null;
  if (isError || !categories) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed left-0 top-[70px] w-screen h-[662px] bg-[#0A1633] text-white rounded-b-lg shadow-lg z-50 flex flex-row p-0 m-0 md:flex-row flex-col md:h-[662px] h-auto overflow-y-auto max-h-[calc(100vh-70px)]"
      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      {/* Left: Menu (full width on mobile, left column on desktop) */}
      <div className="flex flex-col gap-2 px-8 py-12 w-full md:w-[340px] h-full">
        <div className="text-xl font-semibold mb-6">{t('products')}</div>
        <div className="overflow-y-auto max-h-[320px] md:max-h-[500px]">
          {rootCategories.map((cat: Category) => (
            <div
              key={cat.id}
              className={`flex items-center justify-between px-2 py-2 rounded-lg transition-colors hover:bg-[#16244A] cursor-pointer ${selected?.id === cat.id ? 'bg-[#16244A]' : ''}`}
              onClick={() => setSelected(cat)}
            >
              <span>{cat.name}</span>
              {selected?.id === cat.id && (
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </div>
          ))}
        </div>
        {/* Mobile: show right part below selected category */}
        <div className="block md:hidden w-full mt-8">
          {selected?.coverImage?.url && (
            <div className="w-full h-[200px] relative rounded-lg overflow-hidden mb-4">
              <Image
                src={selected.coverImage.url}
                alt={selected.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-[#0A1633]/60" />
            </div>
          )}
          <div className="px-2">
            <div className="text-2xl font-semibold mb-4">{selected?.name}</div>
            {selected?.children && selected.children.length > 0 && (
              <div className="flex flex-col gap-2 w-full overflow-y-auto max-h-[200px] md:max-h-[300px]">
                {selected.children.map((child) => (
                  <div
                    key={child.id}
                    className="group text-lg font-medium pb-2 cursor-pointer flex items-center w-fit hover:text-white transition-colors"
                    style={{ minWidth: 0 }}
                  >
                    <span className="inline-block border-b border-white/60 group-hover:border-white transition-colors pb-1">
                      {child.name}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xl">&gt;</span>
                  </div>
                ))}
              </div>
            )}
            {selected?.items && selected.items.length > 0 && (
              <div className="flex flex-col gap-2 mt-4 w-full overflow-y-auto max-h-[200px] md:max-h-[300px]">
                {selected.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group text-lg font-medium pb-2 cursor-pointer flex items-center w-fit hover:text-white transition-colors"
                    style={{ minWidth: 0 }}
                  >
                    <span className="inline-block border-b border-white/60 group-hover:border-white transition-colors pb-1">
                      {item.name}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xl">&gt;</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Desktop: Right part as side panel */}
      <div className="hidden md:block flex-1 h-full relative overflow-hidden">
        {selected?.coverImage?.url && (
          <Image
            src={selected.coverImage.url}
            alt={selected.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
            priority
          />
        )}
        {/* Overlay for title and children/items */}
        <div className="absolute inset-0 flex flex-col items-start px-16 pt-16 bg-[#0A1633]/60">
          <div className="text-3xl font-semibold mb-6">{selected?.name}</div>
          {selected?.children && selected.children.length > 0 && (
            <div className="flex flex-col gap-2 w-full overflow-y-auto max-h-[200px] md:max-h-[300px]">
              {selected.children.map((child) => (
                <div
                  key={child.id}
                  className="group text-lg font-medium pb-2 cursor-pointer flex items-center w-fit hover:text-white transition-colors"
                  style={{ minWidth: 0 }}
                >
                  <span className="inline-block border-b border-white/60 group-hover:border-white transition-colors pb-1">
                    {child.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xl">&gt;</span>
                </div>
              ))}
            </div>
          )}
          {selected?.items && selected.items.length > 0 && (
            <div className="flex flex-col gap-2 mt-4 w-full overflow-y-auto max-h-[200px] md:max-h-[300px]">
              {selected.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group text-lg font-medium pb-2 cursor-pointer flex items-center w-fit hover:text-white transition-colors"
                  style={{ minWidth: 0 }}
                >
                  <span className="inline-block border-b border-white/60 group-hover:border-white transition-colors pb-1">
                    {item.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xl">&gt;</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};