'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useTopCategories } from '@/hooks/useCategories';
import { Category } from '@/types/category';

const Footer = () => {
  const t = useTranslations('footer');
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang as string;
  const { data, isLoading } = useTopCategories(lang);

  const topCategories = data?.categories || [];

  const isHomePage = pathname === '/' || pathname === `/${lang}` || pathname === `/${lang}/`;
  const isAboutPage = pathname === `/${lang}/about` || pathname === `/${lang}/about/`;

  const handlePartnersClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const partnersSection = document.getElementById('partners');
      if (partnersSection) {
        partnersSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If navigating from another page, the hash will be in the URL
      // The home page will handle scrolling via useEffect
    }
  };

  const handleLicensesClick = (e: React.MouseEvent) => {
    if (isAboutPage) {
      e.preventDefault();
      const licensesSection = document.getElementById('licenses');
      if (licensesSection) {
        licensesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If not on about page, let the Link handle navigation with hash
  };

  return (
    <footer className="bg-[#000D2D] text-[16px] font-sans pt-12 pb-6">
      <div className="mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
        {/* Logo & Socials */}
        <div className="min-w-[220px] md:mb-8">
          <div className="mb-8">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto mb-4 ml-[-4px] cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {/* <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/instagram.svg" alt="Instagram" className="h-6 w-6" />
              </span>
              Instagram
            </a> */}
            {/* <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/twitter.svg" alt="Twitter" className="h-6 w-6" />
              </span>
              Twitter
            </a> */}
            <a
              href="https://www.linkedin.com/company/gbp-defence/?originalSubdomain=rs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/50 no-underline hover:text-white transition-colors"
            >
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
              </span>
              LinkedIn
            </a>
            {/* <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/youtube.svg" alt="Youtube" className="h-6 w-6" />
              </span>
              Youtube
            </a> */}
          </div>
        </div>
        {/* Product & Services */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">{t('productServices')}</div>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="text-white/50">Loading...</div>
            ) : topCategories.length > 0 ? (
              topCategories.map((category: Category) => {
                // Build path without lang since Link component handles locale
                const slugs = category?.parents
                  ? [...category.parents.map((p) => p.slug), category.slug]
                  : [category.slug];
                const categoryPath = `/categories/${slugs.join('/')}`;
                return (
                  <Link
                    key={category.id || category.slug}
                    href={categoryPath}
                    className="text-white/50 no-underline hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                );
              })
            ) : (
              <div className="text-white/50">No categories available</div>
            )}
          </div>
        </div>
        {/* Who we are */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">{t('whoWeAre')}</div>
          <div className="flex flex-col gap-4">
            <Link
              href="/events"
              className="text-white/50 no-underline hover:text-white transition-colors"
            >
              {t('links.events')}
            </Link>
            <Link
              href="/#partners"
              className="text-white/50 no-underline hover:text-white transition-colors"
              onClick={handlePartnersClick}
            >
              {t('links.partners')}
            </Link>
            <Link
              href="/contact/open-roles"
              className="text-white/50 no-underline hover:text-white transition-colors"
            >
              {t('links.careers')}
            </Link>
            <Link
              href="/about#licenses"
              className="text-white/50 no-underline hover:text-white transition-colors"
              onClick={handleLicensesClick}
            >
              {t('links.licenses')}
            </Link>
            <Link
              href="/about"
              className="text-white/50 no-underline hover:text-white transition-colors"
            >
              {t('links.aboutUs')}
            </Link>
            <Link
              href="/contact/open-roles"
              className="text-white/50 no-underline hover:text-white transition-colors"
            >
              {t('links.joinTeam')}
            </Link>
          </div>
        </div>
        {/* Our Info */}
        <div className="min-w-[320px] mb-8">
          <div className="text-white font-[500] text-2xl mb-6">{t('ourInfo')}</div>
          <div className="text-white/50 mb-4">info@gbp.com</div>
          <div className="text-white/50">Dr Zorana Djindjica 15a, Kragujevac</div>
        </div>
      </div>
      {/* Bottom bar - ToDO: Add legal links */}
      {/* <div className="md:mt-12 pt-6 mx-auto px-4 flex flex-col lg:flex-row lg:justify-between lg:items-center text-[16px]">
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
        <div className="text-white/50 mt-8 lg:mt-0">{t('copyright')}</div>
      </div> */}
    </footer>
  );
};

export default Footer;
