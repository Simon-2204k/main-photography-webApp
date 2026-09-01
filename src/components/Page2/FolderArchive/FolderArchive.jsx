import React, { useState, memo } from 'react';

const FOLDERS = [
  {
    id: '01',
    title: 'motion',
    color: '#ffd836', // Yellow
    textColor: '#1a1a1a',
    col: 'left',
    images: [
      '/images/section4/pexels-304109370-14232091.webp',
      '/images/section4/pexels-abdelilah-hibat-allah-1652683667-33393728.webp',
      '/images/section4/pexels-aloevera-17612352.webp',
      '/images/section4/pexels-aloevera-20240486.webp',
    ],
  },
  {
    id: '02',
    title: 'branding',
    color: '#e2e2e5', // Light Grey
    textColor: '#1a1a1a',
    col: 'right',
    images: [
      '/images/section4/pexels-andrew-schwark-540305-22468990.webp',
      '/images/section4/pexels-andrew-schwark-540305-9200496.webp',
      '/images/section4/pexels-fakhri98-16104931.webp',
      '/images/section4/pexels-fromsalih-36456611.webp',
    ],
  },
  {
    id: '03',
    title: 'editorial',
    color: '#e2e2e5', // Light Grey
    textColor: '#1a1a1a',
    col: 'left',
    images: [
      '/images/section4/pexels-gin-311039220-34175280.webp',
      '/images/section4/pexels-hazily-light-672092024-18022480.webp',
      '/images/section4/pexels-krista-glizdeniece-2150567376-31603972.webp',
      '/images/section4/pexels-kyle-miller-169884138-13411957.webp',
    ],
  },
  {
    id: '04',
    title: 'photoworks',
    color: '#a8a8ad', // Concrete Grey
    textColor: '#1a1a1a',
    col: 'right',
    images: [
      '/images/section4/pexels-luiz-antico-1846061-4847526.webp',
      '/images/section4/pexels-marianamontrazi-6757343.webp',
      '/images/section4/pexels-minimoy-18532184.webp',
      '/images/section4/pexels-myatezhny39-3994122.webp',
    ],
  },
  {
    id: '05',
    title: 'illustration',
    color: '#ffd836', // Yellow
    textColor: '#1a1a1a',
    col: 'left',
    images: [
      '/images/section4/pexels-osvaldosam-28111495.webp',
      '/images/section4/pexels-phuc-lai-1112451390-20788936.webp',
      '/images/section4/pexels-phuc-lai-1112451390-20788967.webp',
      '/images/section4/pexels-plato-terentev-3804555-5891794.webp',
    ],
  },
  {
    id: '06',
    title: '3D tech',
    color: '#e2e2e5', // Light Grey
    textColor: '#1a1a1a',
    col: 'right',
    images: [
      '/images/section4/pexels-simlibas-13417127.webp',
      '/images/section4/pexels-tr-n-long-3093985-7164274.webp',
      '/images/section4/pexels-vitalyagorbachev-11191758.webp',
      '/images/section4/pexels-zahra-talebizadeh-423932604-20820384.webp',
    ],
  },
];

export const FolderArchive = memo(() => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="relative w-full min-h-screen bg-[#ffffff] text-black py-24 sm:py-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between mb-16 sm:mb-20">
        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-black font-normal">
          Works
        </h2>
        <span className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-300 font-normal">
          Archive
        </span>
      </div>

      {/* 2-Column Staggered Folder Tab Matrix */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 sm:gap-y-20 items-start">
        {FOLDERS.map((folder) => {
          const isHovered = hoveredId === folder.id;
          const isOtherHovered = hoveredId !== null && !isHovered;

          return (
            <div
              key={folder.id}
              onMouseEnter={() => setHoveredId(folder.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative cursor-pointer transition-all duration-500 ${
                isOtherHovered ? 'opacity-15 blur-[1px]' : 'opacity-100'
              }`}
            >
              {/* Fanned 3-4 Preview Cards (Rising behind folder tab on hover) */}
              <div
                className={`absolute -top-36 sm:-top-48 left-1/2 -translate-x-1/2 z-0 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                  isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                }`}
              >
                {/* Image 1: Left Fanned */}
                <div className="w-36 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-white/40 -rotate-12 -translate-x-16 transform transition-transform">
                  <img src={folder.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Image 2: Center Left */}
                <div className="absolute w-36 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-white/40 -rotate-4 -translate-x-6 transform transition-transform">
                  <img src={folder.images[1]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Image 3: Center Right */}
                <div className="absolute w-36 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-white/40 rotate-6 translate-x-8 transform transition-transform">
                  <img src={folder.images[2]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Image 4: Right Fanned */}
                <div className="absolute w-36 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-white/40 rotate-14 translate-x-20 transform transition-transform">
                  <img src={folder.images[3]} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Folder Panel with Notch Cutout */}
              <div
                className="relative z-10 w-full min-h-[160px] sm:min-h-[210px] p-6 sm:p-10 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: folder.color,
                  clipPath: 'polygon(0% 0%, 180px 0%, 215px 30px, 100% 30px, 100% 100%, 0% 100%)',
                }}
              >
                {/* Top Number Index */}
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider opacity-80">
                  {folder.id}
                </span>

                {/* Main Folder Title */}
                <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-900 mt-6">
                  {folder.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default FolderArchive;
