import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = memo(() => {
  const footerRef = useRef(null);
  const trackRef = useRef(null);
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    let footerX = -50;
    const animateFooterMarquee = () => {
      if (!trackRef.current) return;
      footerX += 0.07;
      if (footerX >= 0) footerX = -50;
      gsap.set(trackRef.current, { xPercent: footerX });
    };

    gsap.ticker.add(animateFooterMarquee);

    const st = ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 30%',
      onEnter: () => setIsInverted(true),
      onLeaveBack: () => setIsInverted(false),
      onEnterBack: () => setIsInverted(true),
    });

    return () => {
      gsap.ticker.remove(animateFooterMarquee);
      st.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative w-screen max-w-none z-40 flex flex-col justify-between items-center py-10 px-0 select-none overflow-hidden left-1/2 -translate-x-1/2 transition-colors duration-500 ease-in-out border-t ${
        isInverted
          ? 'bg-white text-black border-black/10'
          : 'bg-black text-white border-white/10'
      }`}
    >
      {/* Full-Width Edge-to-Edge Zero-Jitter Marquee Track */}
      <div className="w-full flex-1 flex items-center overflow-hidden px-0 mx-0">
        <div
          ref={trackRef}
          className="footer-marquee-track flex whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          <span
            className={`font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight shrink-0 px-8 transition-colors duration-500 ${
              isInverted ? 'text-black/90' : 'text-white/90'
            }`}
          >
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
          </span>
          <span
            className={`font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight shrink-0 px-8 transition-colors duration-500 ${
              isInverted ? 'text-black/90' : 'text-white/90'
            }`}
          >
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
          </span>
        </div>
      </div>

      {/* Bottom Row Bar: Centered Copyright Only */}
      <div
        className={`w-full max-w-7xl mx-auto flex items-center justify-center pt-6 border-t text-xs sm:text-sm font-mono px-6 transition-colors duration-500 ${
          isInverted
            ? 'border-black/10 text-neutral-600'
            : 'border-white/10 text-neutral-400'
        }`}
      >
        <div>© {new Date().getFullYear()} SIMON Photography. All Rights Reserved.</div>
      </div>
    </footer>
  );
});

export default Footer;
