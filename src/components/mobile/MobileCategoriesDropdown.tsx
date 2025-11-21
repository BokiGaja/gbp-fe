import React, { useEffect, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/types/category';
import ArrowRightIcon from '../icons/ArrowRightIcon';

interface MobileCategoriesDropdownProps {
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
  <div className="flex flex-col gap-2 w-full overflow-y-auto px-8">
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

export const MobileCategoriesDropdown: React.FC<MobileCategoriesDropdownProps> = ({
  open,
  dropdownRef,
  t,
}) => {
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

  return (
    <div
      ref={dropdownRef}
      className={`fixed left-0 right-0 top-[70px] bottom-0 w-screen bg-[#0A1633] text-white rounded-b-lg shadow-lg z-50 flex flex-col p-0 m-0 h-[calc(100vh-70px)] transition-all duration-500 ease-in-out
        ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      {/* Only render content if categories are loaded and not in error */}
      {isLoading || isError || !categories ? null : (
        <div className="flex flex-col gap-2 py-12 w-full h-[70vh] min-h-[300px]">
          <div className="text-2xl font-[500] mb-6 px-8">{t('products')}</div>
          <div className="overflow-y-auto max-h-[60vh]">
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
                >
                  <span>{cat.name}</span>
                  {selected?.id === cat.id && <ArrowRightIcon />}
                </div>
                {/* Mobile drawer for subcategories/items */}
                {selected?.id === cat.id && (
                  <div className="block pl-4 border-l border-white/10 mt-2">
                    {cat.children && cat.children.length > 0 && (
                      <SubItemList
                        items={cat.children}
                        selectedId={undefined}
                        onClick={(child) =>
                          cat && router.push(`/categories/${cat.slug}/${child.slug}`)
                        }
                      />
                    )}
                    {cat.items && cat.items.length > 0 && (
                      <SubItemList
                        items={cat.items}
                        selectedId={undefined}
                        onClick={(item) => {
                          if (item.type === 'service') {
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
        </div>
      )}
    </div>
  );
};
