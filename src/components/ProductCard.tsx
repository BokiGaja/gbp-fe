import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buildCategoryPath } from '@/utils/routes';
import { useParams } from 'next/navigation';
import { ProductItem } from '@/app/[lang]/home/Products';

interface ProductCardProps {
  title: string;
  image: string;
  slug: string;
  className?: string;
  item: ProductItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, className = '', item }) => {
  const params = useParams();
  const lang = params.lang as string;

  const href = buildCategoryPath(item, lang);

  // Don't render if no valid image
  if (!image) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden cursor-pointer group ${className}`}>
      <Link href={href} className="block w-full h-full">
        <Image
          src={image}
          alt={title || 'Product image'}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          fill
        />
        <div
          className="absolute left-0 top-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
          style={{ height: '60%' }}
        >
          <div className="w-full h-full bg-gradient-to-b from-[#000D2D]/60 to-transparent" />
        </div>
        <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
