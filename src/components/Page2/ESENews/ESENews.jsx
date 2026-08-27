import React from 'react';

const NEWS_ITEMS = [
  {
    id: 1,
    category: 'Denner',
    title: 'SIMON Studio & Manifesto Visuals: Denner Editorial Series with Granit Xhaka and Terence Hill, Captured Cinematically',
    image: '/img1.jpg',
  },
  {
    id: 2,
    category: 'Migros Gruppe',
    title: 'New Corporate Photo Identity for the Migros Group',
    image: '/img2.jpg',
  },
  {
    id: 3,
    category: 'Denner',
    title: 'Denner signs the Easter Bunny as official model for spring photoshoot',
    image: '/img3.jpg',
  },
];

export default function ESENews() {
  return (
    <section className="relative w-full bg-black text-white pt-[5vh] pb-32 px-4 sm:px-8 z-40">
      <div className="max-w-[92vw] mx-auto">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
            Latest news from the world of SIMON Photography
          </h2>
        </div>

        {/* 3-Column News Card Grid with 10px Gap, Sharp Rectangular Corners, 90% Width, 0 Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-[#181818] group-hover:bg-[#222222] rounded-none border-none overflow-hidden cursor-pointer transition-colors duration-300"
            >
              {/* Card Image (Sharp 90° rectangular corners) */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 rounded-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out rounded-none"
                />
              </div>

              {/* Card Text Details Content (Dark gray panel, scales & translates upward on hover) */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between transform group-hover:-translate-y-1.5 group-hover:scale-[1.01] transition-transform duration-300 ease-out">
                <div>
                  <span className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-sans font-semibold text-lg sm:text-xl text-white leading-snug group-hover:text-neutral-100 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
