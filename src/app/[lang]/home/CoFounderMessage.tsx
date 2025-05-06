import React from 'react';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

const CoFounderMessage = () => {
  const t = useTranslations('home');
  return (
    <section className="mt-30 w-full flex flex-col lg:flex-row items-stretch bg-[#000D2D]">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src="/co-founder.png"
          alt="Budimir Gajic"
          className="w-full h-full object-cover max-h-[700px]"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 mt-8 lg:mt-40 mb-8">
        <h2 className="text-4xl text-white font-[500] mb-6 leading-tight">
          {t('coFounderTitle')}
        </h2>
        <Quote className="w-10 h-10 text-white/20 mb-2" />
        <p className="text-[16px] md:text-[16px] font-[400] text-white/70 mb-10 max-w-2xl">
          {t('coFounderBody')}
        </p>
        <div className="mt-auto flex justify-between items-end">
          <div>
            <div className="text-[24px] text-white font-[500] leading-tight">Budimir Gajic</div>
            <div className="text-[24px] text-white/70 font-[400]">Co-Founder</div>
          </div>
          <a 
            href="https://www.linkedin.com/in/budimir-gajic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg 
              className="w-8 h-8" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoFounderMessage; 