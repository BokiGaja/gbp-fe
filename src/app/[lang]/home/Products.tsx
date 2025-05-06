'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

const items = [
  { 
    title: 'Ground', 
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80' // Military vehicle
  },
  { 
    title: 'Security', 
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' // Security meeting
  },
  { 
    title: 'Air', 
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80' // City view
  },
  { 
    title: 'Space', 
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80' // Space view
  },
  { 
    title: 'Sea', 
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80' // Naval vessel
  },
  { 
    title: 'Ammunition', 
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=800&q=80' // Military equipment
  },
  { 
    title: 'Mediation', 
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' // Diplomatic meeting
  },
];

const Products = () => {
  const t = useTranslations('home');

  return (
    <div className="py-20 md:py-30 px-4">
      <h2 className="text-4xl text-[#000D2D] font-[500] mb-12">{t('productsTitle')}</h2>

      {/* ✅ Mobile: Unified Grid */}
      <div className="grid grid-cols-1 gap-1 md:hidden">
        {items.map((item) => (
          <div key={item.title} className="relative h-[200px] min-h-[200px] overflow-hidden cursor-pointer group">
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
          </div>
        ))}
      </div>

      {/* ✅ Desktop: Two Grid Sections */}
      <div className="hidden md:block">
        {/* Top Section */}
        <div className="grid [grid-template-columns:1.3fr_0.85fr_0.85fr] grid-rows-2 gap-1 h-[480px]">
          <div className="relative row-span-2 overflow-hidden cursor-pointer group">
            <img 
              src={items[0].image} 
              alt={items[0].title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
            />
            <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
            </div>
            <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[0].title}</div>
          </div>
          <div className="relative col-span-2 overflow-hidden cursor-pointer group">
            <img 
              src={items[1].image} 
              alt={items[1].title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
            />
            <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
            </div>
            <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[1].title}</div>
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
            <img 
              src={items[2].image} 
              alt={items[2].title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
            />
            <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
            </div>
            <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[2].title}</div>
          </div>
          <div className="relative overflow-hidden cursor-pointer group">
            <img 
              src={items[3].image} 
              alt={items[3].title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
            />
            <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
            </div>
            <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{items[3].title}</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-1 h-[240px] mt-1">
          {items.slice(4).map((item) => (
            <div key={item.title} className="relative overflow-hidden cursor-pointer group">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute left-0 top-0 w-full pointer-events-none" style={{height: '60%'}}>
                <div className="w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 text-white font-medium drop-shadow-lg z-10 cursor-pointer">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
