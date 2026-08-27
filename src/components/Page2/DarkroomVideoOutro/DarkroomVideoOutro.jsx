import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DarkroomVideoOutro.css';

gsap.registerPlugin(ScrollTrigger);

export const DarkroomVideoOutroComponent = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const playBtnRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gridTiles = section.querySelectorAll('.darkroom-grid-tile');

    const ctx = gsap.context(() => {
      if (gridTiles && gridTiles.length) {
        gsap.to(gridTiles, {
          opacity: 0,
          duration: 0.1,
          ease: 'steps(1)',
          stagger: {
            amount: 1.2,
            from: 'random',
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayBtnMouseMove = (e) => {
    const btn = playBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.4;
    const deltaY = (e.clientY - centerY) * 0.4;
    gsap.to(btn, { x: deltaX, y: deltaY, duration: 0.4, ease: 'power2.out' });
  };

  const handlePlayBtnMouseLeave = () => {
    const btn = playBtnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1.5, 0.3)' });
  };

  return (
    <section ref={sectionRef} id="darkroom-video-outro" className="darkroom-video-outro-section">
      <div className="darkroom-video-card-frame">
        {/* 112-Tile Staggered Square Grid Reveal Matrix */}
        <div className="darkroom-video-grid-matrix">
          {[...Array(112)].map((_, i) => (
            <div key={i} className="darkroom-grid-tile" />
          ))}
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          src="/assets/page2/video/darkroom_outro.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="darkroom-video-element"
        />

        {/* Bottom-Left Quote */}
        <div className="darkroom-video-quote-block">
          <blockquote className="darkroom-quote-text">
            "If you want long-term visual impact, there's only one frame to capture. Here. Period. End of story. Amen."
          </blockquote>
          <div className="darkroom-quote-author">
            SIMON <span className="darkroom-quote-role">— Founder & Lead Photographer, SIMON Photography</span>
          </div>
        </div>

        {/* Center-Right Play/Pause Button */}
        <div
          className="darkroom-video-play-zone"
          onMouseMove={handlePlayBtnMouseMove}
          onMouseLeave={handlePlayBtnMouseLeave}
        >
          <button
            ref={playBtnRef}
            onClick={toggleVideoPlayback}
            className="darkroom-video-play-btn"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <span className="darkroom-play-icon">{isPlaying ? '❚❚' : '▶'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export const DarkroomVideoOutro = memo(DarkroomVideoOutroComponent);
export default DarkroomVideoOutro;
