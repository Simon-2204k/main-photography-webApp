import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Darkroom3DOutroCard.css';

gsap.registerPlugin(ScrollTrigger);

const NEWS_CARDS = [
  {
    id: 1,
    category: 'Denner',
    title: 'SIMON Studio & Manifesto Visuals: Denner Editorial Series with Granit Xhaka and Terence Hill, Captured Cinematically',
    image: '/assets/page2/images/img1.jpg',
  },
  {
    id: 2,
    category: 'Migros Gruppe',
    title: 'New Corporate Photo Identity for the Migros Group',
    image: '/assets/page2/images/img2.jpg',
  },
  {
    id: 3,
    category: 'Denner',
    title: 'Denner signs the Easter Bunny as official model for spring photoshoot',
    image: '/assets/page2/images/img3.jpg',
  },
];

export const Darkroom3DOutroCardComponent = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const cta = ctaRef.current;
    if (!container || !card || !cta) return;

    const ctx = gsap.context(() => {
      const outroTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=350%',
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
        },
      });

      // Step 1: Scale down from full screen (1 -> 0.75) and round corners
      outroTl.to(card, {
        scale: 0.75,
        borderRadius: '28px',
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // Step 2: 3D Flip 180 degrees on Y-axis
      outroTl.to(card, {
        rotationY: 180,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Step 3: Reveal CTA button with blur resolve
      outroTl.fromTo(
        cta,
        { opacity: 0, filter: 'blur(16px)', scale: 0.9 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'power2.out' }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleScrollToVideo = () => {
    const videoSection = document.getElementById('darkroom-video-outro');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="darkroom-outro-card-section" className="darkroom-3d-outro-container">
      {/* 3D Flipping Card Container */}
      <div ref={cardRef} className="darkroom-3d-card-wrapper">
        {/* FRONT FACE: Latest News from SIMON Photography */}
        <div className="darkroom-card-face darkroom-card-front">
          <div className="darkroom-news-header">
            <h2 className="darkroom-news-heading">
              Latest news from the world of SIMON Photography
            </h2>
          </div>

          <div className="darkroom-news-grid">
            {NEWS_CARDS.map((item) => (
              <article key={item.id} className="darkroom-news-card">
                <div className="darkroom-news-img-box">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="darkroom-news-details">
                  <span className="darkroom-news-cat">{item.category}</span>
                  <h3 className="darkroom-news-title">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BACK FACE: Video CTA Button */}
        <div className="darkroom-card-face darkroom-card-back">
          <div ref={ctaRef} className="darkroom-cta-content">
            <span className="darkroom-cta-label">Exclusive Content</span>
            <button
              onClick={handleScrollToVideo}
              className="darkroom-cta-btn"
              aria-label="Watch Photography Tips Video"
            >
              <span>[WATCH THE PHOTOGRAPHY TIPS VIDEO]</span>
              <span className="darkroom-play-arrow">▶</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Darkroom3DOutroCard = memo(Darkroom3DOutroCardComponent);
export default Darkroom3DOutroCard;
