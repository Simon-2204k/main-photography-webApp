import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';

const FOLDER_ROWS = [

  {
    rowId: 'row-1',
    zIndex: 1,
    folders: [
      {
        id: '01',
        title: 'motion',
        color: '#fed730',
        width: '50%',
        tabWidth: '170px',
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
        color: '#e2e4e6',
        width: '50%',
        tabWidth: '170px',
        images: [
          '/images/section4/pexels-andrew-schwark-540305-22468990.webp',
          '/images/section4/pexels-andrew-schwark-540305-9200496.webp',
          '/images/section4/pexels-fakhri98-16104931.webp',
          '/images/section4/pexels-fromsalih-36456611.webp',
        ],
      },
    ],
  },

  {
    rowId: 'row-2',
    zIndex: 2,
    marginTop: '-45px',
    folders: [
      {
        id: '03',
        title: 'editorial',
        color: '#e2e4e6',
        width: '40%',
        tabWidth: '170px',
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
        color: '#a6a8ab',
        width: '60%',
        tabWidth: '170px',
        images: [
          '/images/section4/pexels-luiz-antico-1846061-4847526.webp',
          '/images/section4/pexels-marianamontrazi-6757343.webp',
          '/images/section4/pexels-minimoy-18532184.webp',
          '/images/section4/pexels-myatezhny39-3994122.webp',
        ],
      },
    ],
  },

  {
    rowId: 'row-3',
    zIndex: 3,
    marginTop: '-45px',
    folders: [
      {
        id: '05',
        title: 'illustration',
        color: '#fed730',
        width: '50%',
        tabWidth: '170px',
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
        color: '#e2e4e6',
        width: '50%',
        tabWidth: '170px',
        images: [
          '/images/section4/pexels-simlibas-13417127.webp',
          '/images/section4/pexels-tr-n-long-3093985-7164274.webp',
          '/images/section4/pexels-vitalyagorbachev-11191758.webp',
          '/images/section4/pexels-zahra-talebizadeh-423932604-20820384.webp',
        ],
      },
    ],
  },
];

export const FolderArchive = memo(() => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );
  const [isNarrowPhone, setIsNarrowPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 480 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
      setIsNarrowPhone(window.innerWidth < 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allFolders = useMemo(() => {
    return FOLDER_ROWS.flatMap((r) => r.folders);
  }, []);

  const sectionRef = useRef(null);
  useLandoTextReveal(sectionRef, ['.folder-archive-works', '.folder-archive-archive'], {
    theme: 'dark',
    start: 'top 80%',
    stagger: 0.04,
  });

  return (
    <section
      ref={sectionRef}
      onClick={() => {

        if (hoveredId !== null) setHoveredId(null);
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: isMobileOrTablet ? 'auto' : '100vh',
        minHeight: '100vh',
        maxHeight: isMobileOrTablet ? 'none' : '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobileOrTablet ? 'flex-start' : 'flex-end',
        alignItems: 'center',
        padding: isNarrowPhone ? '24px 0 36px 0' : isMobileOrTablet ? '32px 0 44px 0' : '24px 0 0 0',
        margin: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        userSelect: 'none',
      }}
    >

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
          maxWidth: '100vw',
          padding: isNarrowPhone ? '0 5vw' : '0 4vw',
          boxSizing: 'border-box',
          marginBottom: isNarrowPhone ? '18px' : isMobileOrTablet ? '26px' : '20px',
        }}
      >
        <h2
          className="folder-archive-works"
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: isNarrowPhone ? 'clamp(2.2rem, 7.5vw, 2.8rem)' : 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#ffffff',
            margin: 0,
          }}
        >
          Works
        </h2>
        <span
          className="folder-archive-archive"
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: isNarrowPhone ? 'clamp(2.2rem, 7.5vw, 2.8rem)' : 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#ffffff',
            opacity: 0.25,
            margin: 0,
          }}
        >
          Archive
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100vw',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobileOrTablet ? (

          allFolders.map((folder, idx) => {
            const isHovered = hoveredId === folder.id;
            const isAnyHovered = hoveredId !== null;

            const bg = isAnyHovered ? (isHovered ? folder.color : '#1c1c22') : folder.color;
            const textColor = isAnyHovered && !isHovered ? 'rgba(255, 255, 255, 0.35)' : '#111111';
            const borderStyle = isAnyHovered && !isHovered ? '1px solid rgba(255, 255, 255, 0.1)' : 'none';

            const tabWidthVal = isNarrowPhone ? 'min(160px, 45vw)' : 'clamp(170px, 26vw, 260px)';
            const tabSlopeVal = isNarrowPhone ? '18px' : '24px';
            const tabHeightVal = isNarrowPhone ? '20px' : '26px';

            return (
              <div
                key={folder.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredId((prev) => (prev === folder.id ? null : folder.id));
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  marginTop: idx === 0 ? '0px' : isNarrowPhone ? '-24px' : '-28px',
                  cursor: 'pointer',
                  zIndex: isHovered ? 70 : 10 + idx * 5,
                  touchAction: 'manipulation',
                }}
              >

                <div
                  style={{
                    position: 'absolute',
                    bottom: isNarrowPhone ? '95px' : '110px',
                    left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) ${
                      isHovered ? 'translateY(-50px) scale(1)' : 'translateY(10px) scale(0.8)'
                    }`,
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: 'none',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: isNarrowPhone ? 'clamp(76px, 20vw, 95px)' : 'clamp(95px, 14vw, 150px)',
                      height: isNarrowPhone ? 'clamp(108px, 28vw, 136px)' : 'clamp(135px, 20vw, 210px)',
                      transform: isNarrowPhone
                        ? 'rotate(-13deg) translateX(-72px)'
                        : 'rotate(-14deg) translateX(clamp(-135px, -15vw, -65px))',
                      border: '1px solid rgba(255,255,255,0.7)',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={folder.images[0]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      width: isNarrowPhone ? 'clamp(76px, 20vw, 95px)' : 'clamp(95px, 14vw, 150px)',
                      height: isNarrowPhone ? 'clamp(108px, 28vw, 136px)' : 'clamp(135px, 20vw, 210px)',
                      transform: isNarrowPhone
                        ? 'rotate(-4deg) translateX(-24px)'
                        : 'rotate(-5deg) translateX(clamp(-45px, -5vw, -20px))',
                      border: '1px solid rgba(255,255,255,0.7)',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={folder.images[1]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      width: isNarrowPhone ? 'clamp(76px, 20vw, 95px)' : 'clamp(95px, 14vw, 150px)',
                      height: isNarrowPhone ? 'clamp(108px, 28vw, 136px)' : 'clamp(135px, 20vw, 210px)',
                      transform: isNarrowPhone
                        ? 'rotate(4deg) translateX(24px)'
                        : 'rotate(5deg) translateX(clamp(20px, 5vw, 45px))',
                      border: '1px solid rgba(255,255,255,0.7)',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={folder.images[2]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      width: isNarrowPhone ? 'clamp(76px, 20vw, 95px)' : 'clamp(95px, 14vw, 150px)',
                      height: isNarrowPhone ? 'clamp(108px, 28vw, 136px)' : 'clamp(135px, 20vw, 210px)',
                      transform: isNarrowPhone
                        ? 'rotate(13deg) translateX(72px)'
                        : 'rotate(14deg) translateX(clamp(65px, 15vw, 135px))',
                      border: '1px solid rgba(255,255,255,0.7)',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={folder.images[3]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    height: isNarrowPhone ? 'clamp(112px, 15vh, 126px)' : 'clamp(130px, 14vh, 155px)',
                    minHeight: isNarrowPhone ? '112px' : '130px',
                    backgroundColor: bg,
                    border: borderStyle,
                    clipPath: `polygon(0% 0%, ${tabWidthVal} 0%, calc(${tabWidthVal} + ${tabSlopeVal}) ${tabHeightVal}, 100% ${tabHeightVal}, 100% 100%, 0% 100%)`,
                    padding: isNarrowPhone ? '10px 18px 12px 18px' : '14px 28px 16px 28px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: '4px',
                    transition: 'background-color 0.35s ease, color 0.35s ease, border 0.35s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: isNarrowPhone ? '11px' : '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: textColor,
                      opacity: isAnyHovered && !isHovered ? 0.5 : 0.85,
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {folder.id}
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Newsreader', serif",
                      fontSize: isNarrowPhone ? 'clamp(1.65rem, 5.8vw, 2.2rem)' : 'clamp(2.2rem, 3.8vw, 3rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      color: textColor,
                      margin: '2px 0 0 0',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {folder.title}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (

          FOLDER_ROWS.map((row) => (
            <div
              key={row.rowId}
              style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                zIndex: row.folders.some((f) => f.id === hoveredId) ? 40 : row.zIndex,
                marginTop: row.marginTop || '0px',
              }}
            >
              {row.folders.map((folder) => {
                const isHovered = hoveredId === folder.id;
                const isAnyHovered = hoveredId !== null;

                const bg = isAnyHovered ? (isHovered ? folder.color : '#1c1c22') : folder.color;
                const textColor = isAnyHovered && !isHovered ? 'rgba(255, 255, 255, 0.35)' : '#111111';
                const borderStyle = isAnyHovered && !isHovered ? '1px solid rgba(255, 255, 255, 0.1)' : 'none';

                return (
                  <div
                    key={folder.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredId((prev) => (prev === folder.id ? null : folder.id));
                    }}
                    onMouseEnter={() => setHoveredId(folder.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'relative',
                      width: folder.width,
                      cursor: 'pointer',
                      zIndex: isHovered ? 50 : row.zIndex,
                    }}
                  >

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '125px',
                        left: '50%',
                        transformOrigin: 'bottom center',
                        transform: `translateX(-50%) ${
                          isHovered ? 'translateY(-70px) scale(1)' : 'translateY(-10px) scale(0.85)'
                        }`,
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: 'none',
                        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          width: 'clamp(100px, 16vw, 160px)',
                          height: 'clamp(140px, 22vw, 220px)',
                          transform: 'rotate(-14deg) translateX(clamp(-150px, -18vw, -60px))',
                          border: '1px solid rgba(255,255,255,0.7)',
                          overflow: 'hidden',
                          backgroundColor: '#111',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          contain: 'paint layout',
                        }}
                      >
                        <img
                          src={folder.images[0]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          width: 'clamp(100px, 16vw, 160px)',
                          height: 'clamp(140px, 22vw, 220px)',
                          transform: 'rotate(-5deg) translateX(clamp(-45px, -6vw, -18px))',
                          border: '1px solid rgba(255,255,255,0.7)',
                          overflow: 'hidden',
                          backgroundColor: '#111',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          contain: 'paint layout',
                        }}
                      >
                        <img
                          src={folder.images[1]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          width: 'clamp(100px, 16vw, 160px)',
                          height: 'clamp(140px, 22vw, 220px)',
                          transform: 'rotate(5deg) translateX(clamp(18px, 6vw, 50px))',
                          border: '1px solid rgba(255,255,255,0.7)',
                          overflow: 'hidden',
                          backgroundColor: '#111',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          contain: 'paint layout',
                        }}
                      >
                        <img
                          src={folder.images[2]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          width: 'clamp(100px, 16vw, 160px)',
                          height: 'clamp(140px, 22vw, 220px)',
                          transform: 'rotate(14deg) translateX(clamp(60px, 18vw, 150px))',
                          border: '1px solid rgba(255,255,255,0.7)',
                          overflow: 'hidden',
                          backgroundColor: '#111',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          contain: 'paint layout',
                        }}
                      >
                        <img
                          src={folder.images[3]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        height: '160px',
                        minHeight: '155px',
                        backgroundColor: bg,
                        border: borderStyle,
                        clipPath: `polygon(0% 0%, ${folder.tabWidth} 0%, calc(${folder.tabWidth} + 40px) 28px, 100% 28px, 100% 100%, 0% 100%)`,
                        padding: '12px 32px 18px 32px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '6px',
                        transition: 'background-color 0.35s ease, color 0.35s ease, border 0.35s ease',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          color: textColor,
                          opacity: isAnyHovered && !isHovered ? 0.5 : 0.85,
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {folder.id}
                      </span>

                      <h3
                        style={{
                          fontFamily: "'Newsreader', serif",
                          fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                          color: textColor,
                          margin: '4px 0 0 0',
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {folder.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </section>
  );
});

export default FolderArchive;
