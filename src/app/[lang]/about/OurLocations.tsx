import { Navigation2 } from 'lucide-react';

const locations = [
  {
    name: 'Center Lapovo',
    address: 'Svetozara Markovica 44a',
    link: 'https://maps.google.com/?q=Svetozara+Markovica+44a+Lapovo',
    highlight: false,
  },
  {
    name: 'Office Belgrade',
    address: 'Svetozara Markovica 44a',
    link: 'https://maps.google.com/?q=Svetozara+Markovica+44a+Belgrade',
    highlight: true,
  },
  {
    name: 'Office Kragujevac',
    address: 'Svetozara Markovica 44a',
    link: 'https://maps.google.com/?q=Svetozara+Markovica+44a+Kragujevac',
    highlight: false,
  },
];

export default function OurLocations() {
  return (
    <section className="w-full bg-white py-16 pt-30 md:pt-40">
      <h2 className="text-3xl md:text-4xl font-[500] text-[#0A1633] mb-16 px-4">Our locations</h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
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
              <Navigation2 size={20} className="text-white md:text-[#0A1633] md:group-hover:text-white transition-colors duration-150" />
              Google map
            </a>
          </div>
        ))}
      </div>
    </section>
  );
} 