import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/types/category';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface CategoriesDropdownProps {
  open: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  t: (key: string) => string;
}

interface SubItem {
  id?: number;
  name: string;
  slug?: string;
  type?: 'service' | 'item';
}

interface SubItemListProps {
  items: SubItem[];
  selectedId?: number;
  onClick: (item: SubItem) => void;
}

const SubItemList: React.FC<SubItemListProps> = ({ items, selectedId, onClick }) => (
  <div className="flex flex-col gap-2 w-full overflow-y-auto px-8 md:px-0">
    {items.map((item, idx) => (
      <div
        key={item.id ?? idx}
        className={`flex items-center h-[55px] gap-3 font-normal text-[16px] leading-[23px] tracking-normal text-[#B3B8C5] cursor-pointer group transition-colors hover:text-white ${selectedId === item.id ? 'font-semibold bg-[#16244A] text-white' : ''}`}
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
  const params = useParams();
  const locale = params.lang as string;
  const { data: categories, isLoading, isError } = useCategories(locale);
  const [selected, setSelected] = useState<Category | null>(null);
  const router = useRouter();

  // Only root categories (with children or items)
  const rootCategories = (categories || []).filter(
    (cat: Category) => !cat.parents || cat.parents.length === 0
  );

  useEffect(() => {
    if (rootCategories.length > 0) {
      setSelected(rootCategories[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const navigateToCategory = (cat: Category) => {
    router.push(`/categories/${cat.slug}`);
  };

  const navigateToSelectedChildCategory = (child: SubItem) => {
    if (selected) {
      router.push(`/categories/${selected.slug}/${child.slug}`);
    }
  };

  const navigateToSelectedItem = (item: SubItem) => {
    if (item.type === 'service') {
      router.push(`/service/${item.slug}`);
    } else {
      router.push(`/items/${item.slug}`);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`fixed left-0 right-0 top-[70px] bottom-0 w-screen bg-[#0A1633] text-white rounded-b-lg shadow-lg z-50 flex flex-row p-0 m-0 h-[calc(100vh-70px)] transition-all duration-500 ease-in-out
        ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      {/* Only render content if categories are loaded and not in error */}
      {isLoading || isError || !categories ? null : (
        <>
          {/* Left: Menu */}
          <div className="flex flex-col gap-2 py-12 w-[340px] h-full">
            <div className="text-2xl font-[500] mb-6 px-8">{t('products')}</div>
            <div className="overflow-y-auto max-h-[500px]">
              {rootCategories.map((cat: Category) => (
                <div key={cat.id}>
                  <div
                    className={`flex px-8 cursor-pointer items-center justify-between py-4 transition-colors w-full
                      ${
                        selected?.id === cat.id
                          ? 'bg-[#16244A] text-white'
                          : 'text-[#B3B8C5] opacity-50 hover:opacity-100 hover:text-white cursor-pointer'
                      }
                    `}
                    onMouseEnter={() => setSelected(cat)}
                    onClick={() => navigateToCategory(cat)}
                  >
                    <span>{cat.name}</span>
                    {selected?.id === cat.id && <ArrowRightIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Cover image and children/items */}
          <div className="flex-1 h-full relative overflow-hidden">
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
              <div className="text-2xl font-[500] mb-6">{selected?.name}</div>
              {selected?.children && selected.children.length > 0 && (
                <SubItemList
                  items={selected.children}
                  selectedId={undefined}
                  onClick={navigateToSelectedChildCategory}
                />
              )}
              {selected?.items && selected.items.length > 0 && (
                <SubItemList
                  items={selected.items}
                  selectedId={undefined}
                  onClick={navigateToSelectedItem}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
