import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ project, index, onActive }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        bg,
        { yPercent: -30, scale: 1.2 },
        {
          yPercent: 30,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => onActive(index),
        onEnterBack: () => onActive(index),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [index, onActive]);

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center select-none"
    >

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={bgRef}
          src={project.bgImage}
          alt={project.title}
          className="absolute inset-0 w-full h-[150%] -top-[25%] object-cover object-center contrast-[1.05] brightness-[0.88] subpixel-antialiased"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      </div>
    </section>
  );
}
