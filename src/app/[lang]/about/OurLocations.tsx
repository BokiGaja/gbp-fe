import { Navigation2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function OurLocations() {
  const t = useTranslations('about.ourLocations');

  const locations = [
    {
      name: t('officeKragujevac'),
      address: t('addressKragujevac'),
      link: 'https://maps.google.com/?q=Dr+Zorana+Djindjica+15a+Kragujevac',
      highlight: false,
    },
    {
      name: t('centerLapovo'),
      address: t('addressLapovo'),
      link: 'https://maps.google.com/?q=Kapetana+Koce+Andjelkovica+4+Lapovo',
      highlight: false,
    },
    {
      name: t('officeBelgrade'),
      address: t('addressBelgrade'),
      link: 'https://maps.google.com/?q=SZ+Janicija+Zivanovica+19+Beograd',
      highlight: true,
    },
  ];

  return (
    <section className="w-full bg-white py-16 pt-30 md:pt-40 pl-5">
      <h1 className="text-5xl font-[500] text-[#000D2D] mb-16 leading-none tracking-normal">
        {t('title')}
      </h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="group flex flex-col rounded-xl p-8 bg-[#F5F5F5] md:bg-white md:hover:bg-[#F5F5F5] transition-colors cursor-pointer"
          >
            <div className="mb-6">
              <div className="text-2xl font-[500] text-[#0A1633] mb-2">{loc.name}</div>
              <div className="text-l font-[400] text-[#0A1633] opacity-50">{loc.address}</div>
            </div>
            <a
              href={loc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-3 rounded-lg px-8 py-3 text-sm font-[400] transition-colors duration-150 bg-[#0A1633] text-white md:bg-[#F5F6F8] md:text-[#0A1633] md:group-hover:bg-[#0A1633] md:group-hover:text-white"
            >
              <Navigation2
                size={20}
                className="text-white md:text-[#0A1633] md:group-hover:text-white transition-colors duration-150"
              />
              {t('googleMap')}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
