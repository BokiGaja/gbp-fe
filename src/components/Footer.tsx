import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#000D2D] text-[16px] font-sans pt-12 pb-6">
      <div className="mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
        {/* Logo & Socials */}
        <div className="min-w-[220px] md:mb-8">
          <div className="mb-8">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-4 ml-[-4px]" />
          </div>
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/instagram.svg" alt="Instagram" className="h-6 w-6" />
              </span>
              Instagram
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/twitter.svg" alt="Twitter" className="h-6 w-6" />
              </span>
              Twitter
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
              </span>
              LinkedIn
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/youtube.svg" alt="Youtube" className="h-6 w-6" />
              </span>
              Youtube
            </a>
          </div>
        </div>
        {/* Product & Services */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">
            {t('productServices')}
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white/50 no-underline">
              {t('services.vitez')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.remont')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.air')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.sea')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.ground')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.consulting')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('services.mediation')}
            </a>
          </div>
        </div>
        {/* Who we are */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">
            {t('whoWeAre')}
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white/50 no-underline">
              {t('links.events')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('links.partners')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('links.careers')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('links.licenses')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('links.aboutUs')}
            </a>
            <a href="#" className="text-white/50 no-underline">
              {t('links.joinTeam')}
            </a>
          </div>
        </div>
        {/* Our Info */}
        <div className="min-w-[320px] mb-8">
          <div className="text-white font-[500] text-2xl mb-6">
            {t('ourInfo')}
          </div>
          <div className="text-white/50 mb-4">emailexample@gbp.com</div>
          <div className="text-white/50">Serbia, Lapovo, Ul.Ratka 43a</div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="md:mt-12 pt-6 mx-auto px-4 flex flex-col lg:flex-row lg:justify-between lg:items-center text-[16px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-wrap mb-4 md:mb-0">
          <a href="#" className="text-white/50 no-underline">
            {t('legal.privacyPolicy')}
          </a>
          <a href="#" className="text-white/50 no-underline">
            {t('legal.termsOfUse')}
          </a>
          <a href="#" className="text-white/50 no-underline">
            {t('legal.accessibility')}
          </a>
          <a href="#" className="text-white/50 no-underline">
            {t('legal.modernSlavery')}
          </a>
          <a href="#" className="text-white/50 no-underline">
            {t('legal.cookiesSettings')}
          </a>
        </div>
        <div className="text-white/50 mt-8 lg:mt-0">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 