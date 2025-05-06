import React from 'react';

const events = [
  {
    title: 'Our cutting-edge armored vehicles deliver unparalleled',
    date: 'Jan 22,2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // handshake/meeting
  },
  {
    title: 'Our cutting-edge armored vehicles deliver unparalleled',
    date: 'Mar 22,2024',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // city/building
  },
  {
    title: 'Our cutting-edge armored vehicles deliver unparalleled',
    date: 'Apr 22,2024',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', // military/vehicle
  },
];

const Events = () => {
  return (
    <section className="w-full px-4 py-20 md:py-30">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-[500] text-[#000D2D] mb-4">Events</h2>
        <a href="#" className="text-[#000D2D] text-md">Read all</a>
      </div>
      <div className="grid md:grid-cols-2">
        {/* Left large event */}
        <div className="relative md:row-span-2 max-h-[600px] h-[300px] md:h-[600px] overflow-hidden">
          <img 
            src={events[0].image} 
            alt={events[0].title} 
            className="w-full h-full object-cover max-h-[600px] cursor-pointer transition-all duration-300 hover:scale-105" 
          />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="mb-2 text-sm opacity-80">{events[0].date}</div>
            <div className="text-xl md:text-2xl drop-shadow-lg max-w-xs">{events[0].title}</div>
          </div>
        </div>
        {/* Right two small events */}
        <div className="grid grid-rows-2">
          {[1, 2].map((i) => (
            <div key={i} className="relative max-h-[300px] h-[140px] md:h-[300px] overflow-hidden">
              <img 
                src={events[i].image} 
                alt={events[i].title} 
                className="w-full h-full object-cover max-h-[300px] cursor-pointer transition-all duration-300 hover:scale-105" 
              />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="mb-1 text-xs opacity-80">{events[i].date}</div>
                <div className="text-lg drop-shadow max-w-xs">{events[i].title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events; 