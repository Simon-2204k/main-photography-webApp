import React, { useState, useRef, useEffect, memo } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';

const DISCIPLINES = [
  {
    id: 'portraiture',
    title: 'PORTRAITURE',
    cards: [
      '/images/section2/alessandro-rodriguez-Z-hkVVWZiOI-unsplash.webp',
      '/images/section2/eric-soubeyrand-de-saint-prix-wpGHqh_1D84-unsplash.webp',
      '/images/section2/erwi-bZZwOLx7zX0-unsplash.webp',
    ],
    pills: [
      'Natural Light',
      'Studio Strobe',
      'Medium Format',
      'Character Studies',
      'Environmental',
      'Black & White',
      'Direct Gaze',
      'Skin Texture',
      'Optics & Bokeh',
      'Expression',
    ],
  },
  {
    id: 'editorial',
    title: 'EDITORIAL',
    cards: [
      '/images/section2/fethi-benattallah-5HIAAj1-XD8-unsplash.webp',
      '/images/section2/juan-ordonez-rdta95kcS78-unsplash.webp',
      '/images/section2/kyle-johnson-i9oQ8auj5hk-unsplash.webp',
    ],
    pills: [
      'Fashion Campaigns',
      'Lookbooks',
      'Visual Narrative',
      'Styling & Art Direction',
      'Location Scouting',
      'Magazine Spreads',
      '120 Emulsion',
      'Color Grading',
      'Runway & Avant-Garde',
      'Moodboards',
    ],
  },
  {
    id: 'documentary',
    title: 'DOCUMENTARY',
    cards: [
      '/images/section2/lev-yarmanov-m5HaYd0NqBM-unsplash.webp',
      '/images/section2/priscilla-du-preez-H5yqXWC-XMk-unsplash.webp',
      '/images/section2/yanny-mishchuk-iJQ-FDykacg-unsplash.webp',
    ],
    pills: [
      'Street Life',
      'Photojournalism',
      'Raw Emotion',
      'Unposed Moments',
      'Grain & Shadow',
      'Cultural Archives',
      'Available Light',
      'Visual Truth',
      'Social Chronicle',
      'Tri-X 400',
    ],
  },
];

// =============================================================
// 🎛️ GSAP CARD STAGGER & EASING CONTROLS (TUNE HERE)
// =============================================================
export const CARD_ANIM_CONFIG = {
  duration: 0.3,       // Duration per card (seconds)
  staggerDelay: 0.1,   // Delay between Card 1 -> Card 2 -> Card 3
  ease: 'power2.out',   // GSAP ease curve ('power2.out', 'power3.out', 'back.out(1.2)')
  fromY: '105%',        // Starts below mask (bottom-to-top)
  toY: '-4px',          // Pushed up 4px so bottom rounded corners are never clipped
};

// Sub-component for the 3-Card Stack with bottom-to-top GSAP stagger masked by overflow: hidden
const CardDeck = memo(({ cards }) => {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    // Reveal sequentially rising from bottom to top: Card 1 -> Card 2 -> Card 3
    const tl = gsap.timeline();
    tl.fromTo(
      [card1Ref.current, card2Ref.current, card3Ref.current],
      {
        opacity: 0,
        y: CARD_ANIM_CONFIG.fromY,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: CARD_ANIM_CONFIG.toY,
        scale: 1,
        stagger: CARD_ANIM_CONFIG.staggerDelay,
        duration: CARD_ANIM_CONFIG.duration,
        ease: CARD_ANIM_CONFIG.ease,
      }
    );

    return () => tl.kill();
  }, []);

  return (
    <div
      className="absolute pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        bottom: '12px', // Elevated with bottom clearance so rounded corners are never clipped
        left: '50%',
        transform: 'translateX(-50%)',
        width: '350px',
        height: '190px',
        zIndex: 10,
        paddingTop: '10px',
        paddingBottom: '8px',
      }}
    >
      {/* Card 1: Back Left (Appears First) - Clean with NO Shadow */}
      <div
        ref={card1Ref}
        style={{
          position: 'absolute',
          width: '240px',
          height: '165px',
          borderRadius: '14px',
          overflow: 'hidden',
          transform: 'translateX(-36px) translateY(8px) rotate(-8deg)',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backgroundColor: '#16161a',
          zIndex: 1,
          opacity: 0,
        }}
      >
        <img
          src={cards[0]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Card 2: Back Right (Appears Second) - Clean with NO Shadow */}
      <div
        ref={card2Ref}
        style={{
          position: 'absolute',
          width: '240px',
          height: '165px',
          borderRadius: '14px',
          overflow: 'hidden',
          transform: 'translateX(36px) translateY(8px) rotate(6deg)',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backgroundColor: '#16161a',
          zIndex: 2,
          opacity: 0,
        }}
      >
        <img
          src={cards[1]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Card 3: Center Foreground (Appears Third) - Clean with NO Shadow */}
      <div
        ref={card3Ref}
        style={{
          position: 'absolute',
          width: '250px',
          height: '172px',
          borderRadius: '14px',
          overflow: 'hidden',
          transform: 'translateX(0px) translateY(0px) rotate(-1deg)',
          boxShadow: 'none',
          border: '1.5px solid rgba(255, 255, 255, 0.28)',
          backgroundColor: '#16161a',
          zIndex: 3,
          opacity: 0,
        }}
      >
        <img
          src={cards[2]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
    </div>
  );
});

export const PhysicsDisciplines = memo(() => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const wordRefs = useRef([]);
  const h2Refs = useRef([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderLoopRef = useRef(null);
  const pillBodiesRef = useRef([]);
  const leaveTimerRef = useRef(null);

  const handleMouseEnter = (idx) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredIdx(null);
    }, 100);
  };

  // Handle Matter.js physics pill drops on the active word
  useEffect(() => {
    if (hoveredIdx === null) {
      // Clean up previous simulation
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
      pillBodiesRef.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    // Delay 110ms so physics measures coordinates right as the push-down motion completes
    const spawnTimer = setTimeout(() => {
      const canvas = canvasRef.current;
      const section = sectionRef.current;
      const targetH2 = h2Refs.current[hoveredIdx];
      if (!canvas || !section || !targetH2) return;

      const width = (canvas.width = section.clientWidth);
      const height = (canvas.height = section.clientHeight);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate exact bounding coordinates of the active <h2> letters
      const sectionRect = section.getBoundingClientRect();
      const textRect = targetH2.getBoundingClientRect();

      const wordCenterX = textRect.left - sectionRect.left + textRect.width / 2;
      const wordWidth = textRect.width;
      const textBottomY = textRect.bottom - sectionRect.top;

      // Create Matter.js Engine
      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 1.15 },
      });
      engineRef.current = engine;

      // Physical collision platform placed right at the bottom baseline of the letters
      const platformY = textBottomY - 6;
      const platformWidth = Math.min(width * 0.95, Math.max(wordWidth * 1.02, 450));

      const ground = Matter.Bodies.rectangle(wordCenterX, platformY, platformWidth, 20, {
        isStatic: true,
        friction: 0.85,
        restitution: 0.25,
      });

      // Left and right angled barrier walls so pills stay gathered over the word
      const leftWall = Matter.Bodies.rectangle(
        wordCenterX - platformWidth / 2 - 15,
        platformY - 60,
        30,
        180,
        {
          isStatic: true,
          angle: 0.25,
          friction: 0.5,
        }
      );

      const rightWall = Matter.Bodies.rectangle(
        wordCenterX + platformWidth / 2 + 15,
        platformY - 60,
        30,
        180,
        {
          isStatic: true,
          angle: -0.25,
          friction: 0.5,
        }
      );

      // Subtle center wedge to disperse pills naturally across both sides of the word
      const centerDeflector = Matter.Bodies.polygon(wordCenterX, platformY - 8, 3, 20, {
        isStatic: true,
        angle: Math.PI,
      });

      Matter.World.add(engine.world, [ground, leftWall, rightWall, centerDeflector]);

      // Spawn 10 pills dropping dynamically from behind the 3 floating cards
      const discipline = DISCIPLINES[hoveredIdx];
      const newPills = [];
      const cardsOriginY = textRect.top - sectionRect.top - 60;


      discipline.pills.forEach((pillText, i) => {
        ctx.font = '600 13px Inter, sans-serif';
        const textWidth = ctx.measureText(pillText).width;
        const pillWidth = Math.max(90, textWidth + 32);
        const pillHeight = 32;

        const spawnX = wordCenterX + (Math.random() - 0.5) * 220;
        const spawnY = cardsOriginY + (Math.random() - 0.5) * 40 - i * 30;

        const body = Matter.Bodies.rectangle(spawnX, spawnY, pillWidth, pillHeight, {
          chamfer: { radius: 16 },
          restitution: 0.45,
          friction: 0.25,
          frictionAir: 0.02,
          density: 0.002,
          angle: (Math.random() - 0.5) * 0.7,
        });

        body.label = pillText;
        body.pillWidth = pillWidth;
        body.pillHeight = pillHeight;
        newPills.push(body);
      });

      pillBodiesRef.current = newPills;
      Matter.World.add(engine.world, newPills);

      // Run Matter Runner
      const runner = Matter.Runner.create();
      runnerRef.current = runner;
      Matter.Runner.run(runner, engine);

      // Canvas Render Loop for Pill Badges
      const render = () => {
        ctx.clearRect(0, 0, width, height);

        pillBodiesRef.current.forEach((body) => {
          const { x, y } = body.position;
          const angle = body.angle;
          const w = body.pillWidth;
          const h = body.pillHeight;
          const r = 16;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          // Pill capsule body (dark charcoal with crisp white border)
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, r);
          ctx.fillStyle = '#141416';
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.stroke();

          // Pill text
          ctx.font = '600 12px Inter, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(body.label, 0, 1);

          ctx.restore();
        });

        renderLoopRef.current = requestAnimationFrame(render);
      };

      renderLoopRef.current = requestAnimationFrame(render);
    }, 110);

    return () => {
      clearTimeout(spawnTimer);
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
    };
  }, [hoveredIdx]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{
        backgroundColor: '#121214',
        isolation: 'isolate',
        minHeight: '140vh',
        height: '140vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Physics Overlay Canvas for Pill Badges */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* Top Header in Warm Cream Serif */}
      <div
        className="w-full max-w-5xl mx-auto text-center z-10"
        style={{ marginBottom: 'clamp(4rem, 8vh, 7rem)' }}
      >
        <h3
          className="font-serif italic font-normal tracking-tight text-white/95"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            color: '#f7f4ea',
            lineHeight: 1.1,
          }}
        >
          We know what we&apos;re good at!
        </h3>
      </div>

      {/* Center 3 Giant Serif Disciplines with Dynamic Push-Down & Tight Idle Spacing */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
        {DISCIPLINES.map((discipline, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={discipline.id}
              className="relative w-full flex flex-col items-center justify-center transition-all duration-300"
              style={{ margin: 'clamp(1.4rem, 2.8vh, 2.2rem) 0' }}
            >
              {/* Unified Interactive Container: captures hover across expanded spacer, cards, text & Learn More */}
              <div
                ref={(el) => (wordRefs.current[idx] = el)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                className="relative inline-flex flex-col items-center justify-center cursor-pointer w-fit mx-auto px-4 py-2"
              >
                {/* Dynamic Push-Down Spacer Slot (Houses CardDeck right above text) */}
                <div
                  style={{
                    height: isHovered ? '195px' : '0px',
                    transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    width: '100%',
                    position: 'relative',
                    pointerEvents: 'none',
                  }}
                >
                  {/* 3-Card Stack anchored snugly inside the 195px opened slot */}
                  {isHovered && <CardDeck cards={discipline.cards} />}
                </div>

                {/* Giant Serif Word: Clean flat colors, ZERO gloomy text-shadow */}
                <h2
                  ref={(el) => (h2Refs.current[idx] = el)}
                  className="font-serif font-bold text-center tracking-normal transition-colors duration-200 select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(3.8rem, 8.5vw, 8.2rem)',
                    lineHeight: 0.9,
                    color: isHovered ? '#f7f4ea' : '#ff3823',
                  }}
                >
                  {discipline.title}
                </h2>

                {/* Clean Learn More link below hovered word */}
                <div
                  className="pt-4 transition-opacity duration-200 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? '32px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    className="text-xs sm:text-sm font-medium tracking-wide underline underline-offset-4"
                    style={{
                      color: '#f7f4ea',
                      textDecorationColor: 'rgba(247, 244, 234, 0.6)',
                    }}
                  >
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default PhysicsDisciplines;
