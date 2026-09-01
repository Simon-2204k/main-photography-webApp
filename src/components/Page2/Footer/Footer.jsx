import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

export const Footer = memo(() => {
  const trackRef = useRef(null);

  useEffect(() => {
    let footerX = -50;
    const animateFooterMarquee = () => {
      if (!trackRef.current) return;
      footerX += 0.07;
      if (footerX >= 0) footerX = -50;
      gsap.set(trackRef.current, { xPercent: footerX });
    };

    gsap.ticker.add(animateFooterMarquee);

    return () => {
      gsap.ticker.remove(animateFooterMarquee);
    };
  }, []);

  return (
    <footer className="relative w-screen max-w-none bg-black text-white z-40 flex flex-col justify-between items-center border-t border-white/10 py-10 px-0 select-none overflow-hidden left-1/2 -translate-x-1/2">
      {/* Full-Width Edge-to-Edge Zero-Jitter Marquee Track */}
      <div className="w-full flex-1 flex items-center overflow-hidden px-0 mx-0">
        <div
          ref={trackRef}
          className="footer-marquee-track flex whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0 px-8">
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
          </span>
          <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0 px-8">
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
          </span>
        </div>
      </div>

      {/* Bottom Row Bar: Centered Copyright Only */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center pt-6 border-t border-white/10 text-xs sm:text-sm font-mono text-neutral-400 px-6">
        <div>© {new Date().getFullYear()} SIMON Photography. All Rights Reserved.</div>
      </div>
    </footer>
  );
});

export default Footer;
