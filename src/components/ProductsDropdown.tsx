import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

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
  items?: { name: string; slug?: string }[];
  parents?: Category[];
}

interface SubItem {
  id?: number;
  name: string;
  slug?: string;
}

interface SubItemListProps {
  items: SubItem[];
  selectedId?: number;
  onClick: (item: SubItem) => void;
}

const SubItemList: React.FC<SubItemListProps> = ({ items, selectedId, onClick }) => (
  <div className="flex flex-col gap-2 w-full overflow-y-auto">
    {items.map((item, idx) => (
      <div
        key={item.id ?? idx}
        className={`flex items-center h-[55px] gap-3 font-work-sans font-normal text-[16px] leading-[23px] tracking-normal text-[#B3B8C5] cursor-pointer group transition-colors hover:text-white ${selectedId === item.id ? 'font-semibold bg-[#16244A] text-white' : ''}`}
        style={{ minWidth: 0 }}
        onClick={() => onClick(item)}
      >
        <span className="inline-block pb-1 border-b-1 border-transparent group-hover:border-white transition-colors">
          {item.name}
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl text-white">
          <ChevronRight size={24} />
        </span>
      </div>
    ))}
  </div>
);

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ open, dropdownRef, t }) => {
  const { data: categories, isLoading, isError } = useCategories();
  const [selected, setSelected] = useState<Category | null>(null);
  const router = useRouter();

  // Only root categories (with children or items)
  const rootCategories = (categories || []).filter((cat: Category) => !cat.parents || cat.parents.length === 0);

  useEffect(() => {
    if (rootCategories.length > 0) {
      setSelected(rootCategories[0]);
    }
  }, [categories]);

  return (
    <div
      ref={dropdownRef}
      className={`fixed left-0 right-0 top-[70px] bottom-0 w-screen bg-[#0A1633] text-white rounded-b-lg shadow-lg z-50 flex flex-row p-0 m-0 md:flex-row flex-col h-[calc(100vh-70px)] transition-all duration-500 ease-in-out
        ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      {/* Only render content if categories are loaded and not in error */}
      {isLoading || isError || !categories ? null : (
        <>
          {/* Left: Menu (full width on mobile, left column on desktop) */}
          <div className="flex flex-col gap-2 px-8 py-12 w-full md:w-[340px] h-[70vh] min-h-[300px] md:h-full">
            <div className="text-xl font-semibold mb-6">{t('products')}</div>
            <div className="overflow-y-auto max-h-[60vh] md:max-h-[500px]">
              {rootCategories.map((cat: Category) => (
                <div key={cat.id}>
                  <div
                    className={`flex items-center justify-between px-2 py-2 rounded-lg transition-colors hover:bg-[#16244A] cursor-pointer ${selected?.id === cat.id ? 'bg-[#16244A]' : ''}`}
                    onClick={() => setSelected(cat)}
                  >
                    <span>{cat.name}</span>
                    {selected?.id === cat.id && (
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </div>
                  {/* Mobile drawer for subcategories/items */}
                  {selected?.id === cat.id && (
                    <div className="block md:hidden pl-4 border-l border-white/10 mt-2">
                      {cat.children && cat.children.length > 0 && (
                        <SubItemList
                          items={cat.children}
                          selectedId={undefined}
                          onClick={(child) => cat && router.push(`/categories/${cat.slug}/${child.slug}`)}
                        />
                      )}
                      {cat.items && cat.items.length > 0 && (
                        <SubItemList
                          items={cat.items}
                          selectedId={undefined}
                          onClick={(item) => {
                            if ((item as any).type === 'service') {
                              router.push(`/service/${item.slug}`);
                            } else {
                              router.push(`/items/${item.slug}`);
                            }
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile: do not show cover image */}
            {/* Desktop: show right part as side panel */}
          </div>
          <div className="hidden md:block flex-1 h-full relative overflow-hidden">
            {selected?.coverImage?.url && (
              <Image
                src={selected.coverImage.url}
                alt={selected.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
            {/* Overlay for title and children/items */}
            <div className="absolute inset-0 flex flex-col items-start px-16 pt-16 bg-gradient-to-r from-[#000D2D] to-transparent opacity-90 z-10">
              <div className="text-3xl font-semibold mb-6">{selected?.name}</div>
              {selected?.children && selected.children.length > 0 && (
                <SubItemList
                  items={selected.children}
                  selectedId={undefined}
                  onClick={(child) => selected && router.push(`/categories/${selected.slug}/${child.slug}`)}
                />
              )}
              {selected?.items && selected.items.length > 0 && (
                <SubItemList
                  items={selected.items}
                  selectedId={undefined}
                  onClick={(item) => {
                    if ((item as any).type === 'service') {
                      router.push(`/service/${item.slug}`);
                    } else {
                      router.push(`/items/${item.slug}`);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};