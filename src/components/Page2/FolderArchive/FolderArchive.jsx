import React, { useState, memo } from 'react';

const FOLDER_ROWS = [
  // Row 1: 50% / 50%
  {
    rowId: 'row-1',
    zIndex: 1,
    folders: [
      {
        id: '01',
        title: 'motion',
        color: '#fed730', // Vibrant Yellow
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
        color: '#e2e4e6', // Light Grey
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
  // Row 2: 40% / 60% Asymmetric Split
  {
    rowId: 'row-2',
    zIndex: 2,
    marginTop: '-28px',
    folders: [
      {
        id: '03',
        title: 'editorial',
        color: '#e2e4e6', // Light Grey
        width: '40%', // Narrower left folder
        tabWidth: '150px',
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
        color: '#a8aaac', // Concrete Grey
        width: '60%', // Wider right folder
        tabWidth: '220px',
        images: [
          '/images/section4/pexels-luiz-antico-1846061-4847526.webp',
          '/images/section4/pexels-marianamontrazi-6757343.webp',
          '/images/section4/pexels-minimoy-18532184.webp',
          '/images/section4/pexels-myatezhny39-3994122.webp',
        ],
      },
    ],
  },
  // Row 3: 50% / 50% Split
  {
    rowId: 'row-3',
    zIndex: 3,
    marginTop: '-28px',
    folders: [
      {
        id: '05',
        title: 'illustration',
        color: '#fed730', // Vibrant Yellow
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
        color: '#e2e4e6', // Light Grey
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

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#141416', // Frequent signature dark black!
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Flush to bottom!
        alignItems: 'center',
        padding: '24px 0 0 0', // Zero bottom padding!
        margin: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Editorial Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
          maxWidth: '100vw',
          padding: '0 4vw',
          boxSizing: 'border-box',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
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
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
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

      {/* 100vw Full-Bleed Edge-to-Edge File Folder Stack */}
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
        {FOLDER_ROWS.map((row) => (
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

              // Background & text color logic
              const bg = isAnyHovered ? (isHovered ? folder.color : '#1c1c22') : folder.color;
              const textColor = isAnyHovered && !isHovered ? 'rgba(255, 255, 255, 0.35)' : '#111111';
              const borderStyle = isAnyHovered && !isHovered ? '1px solid rgba(255, 255, 255, 0.1)' : 'none';

              return (
                <div
                  key={folder.id}
                  onMouseEnter={() => setHoveredId(folder.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'relative',
                    width: folder.width,
                    cursor: 'pointer',
                    zIndex: isHovered ? 50 : row.zIndex,
                  }}
                >
                  {/* Fanned Preview Cards */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '125px',
                      left: '50%',
                      transformOrigin: 'bottom center',
                      transform: `translateX(-50%) ${isHovered ? 'translateY(-70px) scale(1)' : 'translateY(-10px) scale(0.85)'
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
                        width: '160px',
                        height: '220px',
                        transform: 'rotate(-14deg) translateX(-150px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        width: '160px',
                        height: '220px',
                        transform: 'rotate(-5deg) translateX(-45px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        width: '160px',
                        height: '220px',
                        transform: 'rotate(5deg) translateX(50px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        width: '160px',
                        height: '220px',
                        transform: 'rotate(14deg) translateX(150px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  {/* Folder Face Plate (Compact 135px Height) */}
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
                      justifyContent: 'space-between',
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
                        fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        color: textColor,
                        margin: '12px 0 0 0',
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
        ))}
      </div>
    </section>
  );
});

export default FolderArchive;
