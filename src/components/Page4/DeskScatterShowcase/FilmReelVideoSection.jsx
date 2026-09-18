import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 7 Consecutive video frames for the 35mm film reel strip
const REEL_FRAMES = [
  { id: 1, src: '/assets/items/item_21.jpg', tag: '06:12' },
  { id: 2, src: '/assets/items/item_22.jpg', tag: '06:15' },
  { id: 3, src: '/assets/items/item_23.jpg', tag: '06:17' },
  { id: 4, src: '/assets/items/item_4.jpg', tag: '06:19', isCenter: true },
  { id: 5, src: '/assets/items/item_24.jpg', tag: '06:21' },
  { id: 6, src: '/assets/items/item_25.jpg', tag: '06:24' },
  { id: 7, src: '/assets/items/item_26.jpg', tag: '06:27' },
];

export default function FilmReelVideoSection() {
  const sectionRef = useRef(null);
  const reelTrackRef = useRef(null);
  const headline1Ref = useRef(null);
  const headline2Ref = useRef(null);
  const audioWaveRef = useRef(null);
  const centerFrameRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const reelTrack = reelTrackRef.current;
    const headline1 = headline1Ref.current;
    const headline2 = headline2Ref.current;
    const audioWave = audioWaveRef.current;
    const centerFrame = centerFrameRef.current;

    if (!section || !reelTrack) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Reel appears and zooms into continuous 35mm strip
      tl.fromTo(
        reelTrack,
        { scale: 0.85, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Film reel pans along the X axis
      tl.to(
        reelTrack,
        {
          x: -240,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        'pan'
      );

      // 3. Center frame illuminates/brightens & audio waveform bar pops up
      tl.to(
        centerFrame,
        {
          filter: 'brightness(1.25) contrast(1.1)',
          scale: 1.06,
          boxShadow: '0 0 35px rgba(255, 87, 34, 0.4)',
          duration: 0.5,
        },
        'pan+=0.3'
      );

      tl.fromTo(
        audioWave,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
        'pan+=0.4'
      );

      // 4. Headline 1 fades out, Headline 2 ("Have a question? Just ask.") fades in
      tl.to(headline1, { opacity: 0, y: -20, duration: 0.4 }, 'split');
      tl.to(headline2, { opacity: 1, y: 0, duration: 0.4 }, 'split+=0.1');

      // Audio waveform bar smoothly slides out
      tl.to(audioWave, { opacity: 0, y: 30, duration: 0.3 }, 'split');

      // 5. Film reel frames SPLIT apart into separated cards with gaps
      tl.to(
        '.reel-card',
        {
          marginRight: 48,
          marginLeft: 48,
          rotation: (i) => (i % 2 === 0 ? -4 : 4),
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out',
        },
        'split+=0.1'
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen wood-bg overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Wood Ambient Shadow */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Dynamic Headlines */}
      <div className="relative z-20 text-center mb-8 px-6 max-w-4xl min-h-[90px] flex items-center justify-center">
        {/* Headline 1 */}
        <div ref={headline1Ref} className="absolute text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white/95 drop-shadow-lg leading-tight">
            Poly can even search{' '}
            <span className="relative inline-block text-white font-semibold">
              within your files,
              <svg className="absolute -bottom-2.5 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none" stroke="#FF5722" strokeWidth="3" strokeLinecap="round">
                <path d="M2 9 C 20 2, 40 11, 60 5 C 80 1, 95 8, 98 6" />
              </svg>
            </span>{' '}
            for that exact scene, page, or clip.
          </h2>
        </div>

        {/* Headline 2 (After reel splits) */}
        <div ref={headline2Ref} className="opacity-0 translate-y-4 text-center">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white/95 drop-shadow-xl">
              Have a question? <span className="italic font-light">Just ask.</span>
            </h2>
            <div className="absolute -bottom-5 right-0">
              <svg width="60" height="20" viewBox="0 0 80 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
                <path d="M2 5 Q 35 20, 75 8 M 55 18 Q 65 22, 75 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 35mm Continuous Film Reel Track */}
      <div className="relative z-10 w-full max-w-7xl overflow-visible px-4">
        <div
          ref={reelTrackRef}
          className="film-reel-track flex items-center py-4 px-8 rounded-lg will-change-transform"
        >
          {REEL_FRAMES.map((frame, index) => {
            const isCenter = frame.isCenter;
            return (
              <div
                key={frame.id}
                ref={isCenter ? centerFrameRef : null}
                className={`reel-card relative shrink-0 transition-all duration-300 ${
                  isCenter ? 'z-20' : 'z-10'
                }`}
                style={{ width: '260px', height: '175px' }}
              >
                <div className="relative w-full h-full rounded overflow-hidden bg-stone-900 border border-stone-800 shadow-xl group">
                  <img
                    src={frame.src}
                    alt={`frame ${index}`}
                    className="w-full h-full object-cover filter brightness-95"
                    loading="eager"
                  />
                  
                  {/* Sprocket Code Overlay */}
                  <div className="absolute top-1 left-2 flex items-center justify-between w-[90%] text-[8px] font-mono text-white/60 tracking-wider">
                    <span>FUJI RDPII</span>
                    <span>21</span>
                  </div>

                  <div className="absolute bottom-1 left-2 flex items-center justify-between w-[90%] text-[8px] font-mono text-white/60 tracking-wider">
                    <span>▶ 20A</span>
                    <span>{frame.tag}</span>
                  </div>

                  {/* Active Highlight Glow for Center Frame */}
                  {isCenter && (
                    <div className="absolute inset-0 border-2 border-[#FF5722]/80 rounded pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphic Audio/Video Waveform Scrubber */}
      <div
        ref={audioWaveRef}
        className="relative z-30 mt-6 opacity-0 translate-y-4"
      >
        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl glass-dock border border-white/15 shadow-2xl bg-stone-900/85">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-[#FF5722] flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* Dynamic Audio Equalizer Bars */}
          <div className="flex items-center gap-1 h-7 px-3">
            {[40, 75, 100, 60, 30, 85, 95, 50, 70, 90, 45, 65, 80, 55, 90, 70, 85, 60, 40, 95, 75, 50, 30, 80, 60, 40].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  i >= 8 && i <= 14 ? 'bg-[#FF5722]' : 'bg-white/40'
                } ${isPlaying ? 'animate-wave' : ''}`}
                style={{
                  height: `${h}%`,
                  animationDelay: `${(i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Timecode */}
          <div className="text-xs font-mono font-medium text-stone-300 pl-2 border-l border-white/15">
            <span className="text-white font-bold">06:19</span> / 15:10
          </div>
        </div>
      </div>
    </section>
  );
}
