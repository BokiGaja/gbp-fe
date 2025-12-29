'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Users, Briefcase, Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

const ContactUs = () => {
  const t = useTranslations('home.contact');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const lang = params.lang as string;

  const isHomePage = pathname === '/' || pathname === `/${lang}` || pathname === `/${lang}/`;

  const options = [
    {
      icon: <Users className="w-6 h-6 mr-2" />,
      text: t('joinTeam'),
    },
    {
      icon: <Briefcase className="w-6 h-6 mr-2" />,
      text: t('productsServices'),
    },
    {
      icon: <Handshake className="w-6 h-6 mr-2" />,
      text: t('partnership'),
    },
  ];

  const subtitle = t('subtitle');
  const title = t('title');
  const subtitle2 = t('subtitle2');
  const lines = [title, subtitle, subtitle2];
  const lettersWithLine = lines.flatMap((line, lineIdx) =>
    Array.from(line).map((char, charIdx) => ({ char, lineIdx, charIdx }))
  );
  const totalLetters = lettersWithLine.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // When top is at bottom of viewport: 0, when bottom is at top: 1
      const totalHeight = rect.height + windowHeight;
      let visible = 0;
      if (rect.top > windowHeight) {
        visible = 0;
      } else if (rect.bottom < 0) {
        visible = 1;
      } else {
        visible = 1 - rect.bottom / totalHeight;
      }
      setProgress(Math.max(0, Math.min(1, visible)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 min-h-[60vh] flex flex-col items-center justify-center bg-[#f7f9f8] py-20 md:pt-60 md:pb-30"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-normal mb-4">
          {[0, 1, 2].map((lineIdx) => (
            <span className="block font-normal" key={lineIdx}>
              {lettersWithLine
                .filter((l) => l.lineIdx === lineIdx)
                .map((l, idx) => {
                  // Delay coloring: start at 18% scroll, finish at 48%
                  let adjProgress = (progress - 0.18) / 0.3;
                  adjProgress = Math.max(0, Math.min(adjProgress, 1));
                  const blueCount = Math.round(adjProgress * totalLetters);
                  // Find the global index of this letter in the flat array
                  const globalIdx = lettersWithLine.findIndex(
                    (ll, i) =>
                      i >=
                        (lineIdx === 0
                          ? 0
                          : lines.slice(0, lineIdx).reduce((a, b) => a + b.length, 0)) &&
                      ll.lineIdx === lineIdx &&
                      ll.charIdx === l.charIdx
                  );
                  const color = globalIdx < blueCount ? '#000D2D' : '#CBD0D8';
                  return (
                    <span key={idx} style={{ color }}>
                      {l.char}
                    </span>
                  );
                })}
            </span>
          ))}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-center">
        {options.map((option, idx) => {
          const handleClick = () => {
            if (idx === 0) {
              // Join the Team
              router.push('/contact/open-roles');
            } else if (idx === 1) {
              // Products & Services
              if (isHomePage) {
                // If already on home page, scroll to top first, then open dropdown
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Wait for scroll to complete before opening dropdown
                setTimeout(() => {
                  window.location.hash = '#products';
                }, 500);
              } else {
                // If not on home page, navigate to home with hash
                router.push('/#products');
              }
            } else if (idx === 2) {
              // Partnership
              if (isHomePage) {
                // If already on home page, scroll to partners section
                const partnersSection = document.getElementById('partners');
                if (partnersSection) {
                  partnersSection.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                // If not on home page, navigate to home with hash
                router.push('/#partners');
              }
            }
          };

          return (
            <div key={idx} className="flex flex-col items-center w-full md:w-1/3">
              <button
                onClick={handleClick}
                className="flex items-center text-[#000D2D] text-md font-medium focus:outline-none border-b-1 border-transparent hover:border-[#000D2D] transition-all duration-200 pb-2 cursor-pointer"
              >
                {option.icon}
                {option.text}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactUs;
