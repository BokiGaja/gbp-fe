import { useTranslations } from 'next-intl';

export default function MeetOurFaces() {
  const t = useTranslations('about.meetOurFaces');

  const faces = [
    {
      name: 'Budimir Gajic',
      role: t('coFounderGBP'),
      img: '/assets/budimir_gajic.jpeg',
      linkedin: 'https://linkedin.com/in/budimir-gajic-gbp',
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-[500] text-[#0A1633] text-center m-0 mb-20 leading-tight">
          {t('title')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Empty placeholder for first position */}
          <div className="hidden md:block"></div>
          {faces.map((face, i) => (
            <div
              key={i}
              className={`group flex flex-col bg-[#F5F5F5] md:bg-white overflow-hidden transition-colors duration-200 md:hover:bg-[#F5F5F5] hover:cursor-pointer`}
            >
              {face.img && (
                <div className="relative w-full aspect-square">
                  <img
                    src={face.img}
                    alt={face.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-row items-center justify-between px-6 py-4">
                <div>
                  <div className="font-semibold text-[#0A1633] text-lg mb-1">{face.name}</div>
                  <div className="text-[#0A1633] opacity-70 text-base">{face.role}</div>
                </div>
                {face.linkedin && (
                  <a
                    href={face.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
                      <rect width="56" height="56" rx="8" fill="#F5F5F5" />
                      <path
                        d="M18.667 23.333h4.667v14h-4.667v-14zm2.333-7a2.333 2.333 0 110 4.667 2.333 2.333 0 010-4.667zm7 7h4.334v1.917c.6-.934 1.917-2.267 4.017-2.267 4.3 0 5.1 2.833 5.1 6.517v7.834h-4.667v-6.967c0-1.667-.033-3.817-2.333-3.817-2.333 0-2.692 1.833-2.692 3.733v7.048h-4.667v-14z"
                        fill="#0A1633"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
