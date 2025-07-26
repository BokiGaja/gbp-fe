import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { CategoryItem } from '@/types/grid';
import { buildCategoryPath } from '@/utils/routes';

interface CategoryGridItemProps {
  item: CategoryItem;
  idx: number;
  isCategory: boolean;
}

const CategoryGridItem = ({ item, idx, isCategory }: CategoryGridItemProps) => {
  const params = useParams();

  const imageUrl = item.coverImage?.url || item.image?.url;
  const name = item.name;
  const lang = params.lang as string;

  let href = '';
  if (isCategory) {
    href = buildCategoryPath(item, lang);
  } else if (item.type === 'service') {
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
      <div
        className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
        style={{ height: '60%' }}
      >
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
};

export default CategoryGridItem;
