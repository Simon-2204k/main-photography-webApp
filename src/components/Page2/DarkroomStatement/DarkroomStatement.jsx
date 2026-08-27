import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DarkroomStatement.css';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_MARQUEE_TEXT = "WHERE LIGHT, SHADOWS, AND MOMENTS BECOME STORIES WITH US OVERTAKE ";

export const DarkroomStatementComponent = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { opacity: 0.1, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="darkroom-statement" className="darkroom-statement-section">
      {/* Reverse Kinetic Marquee Ribbon */}
      <div className="darkroom-statement-marquee-wrapper">
        <div className="darkroom-statement-marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="darkroom-statement-marquee-node">
              {STATEMENT_MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Main Statement Content Typography */}
      <div className="darkroom-statement-content">
        <div ref={textRef} className="darkroom-statement-inner">
          <h2 className="darkroom-statement-heading">
            Culture-driven, creative and competitive. Our photography studio creates visual impact for brands. In the disciplines Analog Photography, Editorial Campaigns, Fine Art Exhibits, and Cinematography. Between timeless craft and contemporary zeitgeist. When we communicate: Effectively. Sharp. Unapologetic. This is SIMON Darkroom.
          </h2>
        </div>
      </div>
    </section>
  );
};

export const DarkroomStatement = memo(DarkroomStatementComponent);
export default DarkroomStatement;
