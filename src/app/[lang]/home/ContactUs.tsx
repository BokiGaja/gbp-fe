import React from 'react';
import { Users, Briefcase, Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ContactUs = () => {
  const t = useTranslations('home.contact');

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
  const firstLetter = subtitle.charAt(0);
  const restOfText = subtitle.slice(1);

  return (
    <section className="w-full px-4 min-h-[60vh] flex flex-col items-center justify-center bg-[#f7f9f8] py-20 md:pt-60 md:pb-30">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-normal text-[#000D2D] mb-4">
          <span className="block">{t('title')}</span>
          <span className="block text-[#CBD0D8] font-normal">
            <span className="text-[#000D2D]">{firstLetter}</span>{restOfText}
          </span>
          <span className="block text-[#CBD0D8] font-normal">{t('subtitle2')}</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-center">
        {options.map((option, idx) => (
          <div key={idx} className="flex flex-col items-center w-full md:w-1/3">
            <button className="flex items-center text-[#000D2D] text-md font-medium focus:outline-none border-b-1 border-transparent hover:border-[#000D2D] transition-all duration-200 pb-2 cursor-pointer">
              {option.icon}
              {option.text}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUs; 