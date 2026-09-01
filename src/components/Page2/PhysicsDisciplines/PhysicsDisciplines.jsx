import React, { useState, useRef, useEffect, memo } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';

const DISCIPLINES = [
  {
    id: 'portraiture',
    title: 'PORTRAITURE',
    cards: [
      '/images/section2/alessandro-rodriguez-Z-hkVVWZiOI-unsplash.jpg',
      '/images/section2/eric-soubeyrand-de-saint-prix-wpGHqh_1D84-unsplash.jpg',
      '/images/section2/erwi-bZZwOLx7zX0-unsplash.jpg',
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
      '/images/section2/fethi-benattallah-5HIAAj1-XD8-unsplash.jpg',
      '/images/section2/juan-ordonez-rdta95kcS78-unsplash.jpg',
      '/images/section2/kyle-johnson-i9oQ8auj5hk-unsplash.jpg',
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
      '/images/section2/lev-yarmanov-m5HaYd0NqBM-unsplash.jpg',
      '/images/section2/priscilla-du-preez-H5yqXWC-XMk-unsplash.jpg',
      '/images/section2/yanny-mishchuk-iJQ-FDykacg-unsplash.jpg',
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

export const PhysicsDisciplines = memo(() => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderLoopRef = useRef(null);
  const pillBodiesRef = useRef([]);

  // Handle Matter.js physics pill drops
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

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const width = (canvas.width = section.clientWidth);
    const height = (canvas.height = section.clientHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create Matter.js Engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.95 },
    });
    engineRef.current = engine;

    // Create boundaries (floor, left, right walls)
    const groundY = height * 0.72; // Settle across typography area
    const ground = Matter.Bodies.rectangle(width / 2, groundY, width * 1.5, 40, {
      isStatic: true,
      friction: 0.8,
    });
    const leftWall = Matter.Bodies.rectangle(width * 0.15, height / 2, 40, height, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(width * 0.85, height / 2, 40, height, {
      isStatic: true,
    });

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // Spawn pills
    const discipline = DISCIPLINES[hoveredIdx];
    const newPills = [];

    discipline.pills.forEach((pillText, i) => {
      // Measure pill text width
      ctx.font = '600 13px monospace';
      const textWidth = ctx.measureText(pillText).width;
      const pillWidth = Math.max(90, textWidth + 32);
      const pillHeight = 34;

      const spawnX = width / 2 + (Math.random() - 0.5) * (width * 0.4);
      const spawnY = height * 0.15 - i * 38; // Staggered drop from above cards

      const body = Matter.Bodies.rectangle(spawnX, spawnY, pillWidth, pillHeight, {
        chamfer: { radius: 17 },
        restitution: 0.55,
        friction: 0.2,
        frictionAir: 0.02,
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.5,
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

    // Custom Canvas Render Loop for Pill Capsular Badges
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pillBodiesRef.current.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const w = body.pillWidth;
        const h = body.pillHeight;
        const r = 17;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Draw pill container
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fillStyle = '#1c1c22';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.stroke();

        // Draw pill text
        ctx.font = '600 12px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(body.label, 0, 1);

        ctx.restore();
      });

      renderLoopRef.current = requestAnimationFrame(render);
    };

    renderLoopRef.current = requestAnimationFrame(render);

    return () => {
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
    };
  }, [hoveredIdx]);

  return (
    <section
      ref={sectionRef}
      onMouseLeave={() => setHoveredIdx(null)}
      className="relative w-full min-h-screen bg-[#0a0a0c] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Physics Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto text-center z-10 mb-12 sm:mb-16">
        <h3 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-white/95 mb-3 drop-shadow-sm">
          "We know what we're good at!"
        </h3>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Mastering light, shadow, and scale.
        </p>
      </div>

      {/* Center 3 Giant Red Disciplines */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-10 my-auto">
        {DISCIPLINES.map((discipline, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={discipline.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative w-full flex flex-col items-center justify-center cursor-pointer group"
            >
              {/* Stacked 3 Visual Cards (Tilted behind the word) */}
              {isHovered && (
                <div className="absolute -top-32 sm:-top-44 z-10 flex items-center justify-center pointer-events-none transition-all duration-500 animate-fadeIn">
                  {/* Card 1: Left Tilted */}
                  <div
                    className="w-44 sm:w-60 md:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 -rotate-6 transform -translate-x-8 transition-transform"
                    style={{ backgroundColor: '#18181e' }}
                  >
                    <img
                      src={discipline.cards[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card 2: Right Tilted */}
                  <div
                    className="absolute w-44 sm:w-60 md:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 rotate-4 transform translate-x-8 transition-transform"
                    style={{ backgroundColor: '#18181e' }}
                  >
                    <img
                      src={discipline.cards[1]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card 3: Center Foreground */}
                  <div
                    className="absolute w-44 sm:w-60 md:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/30 rotate-0 transform scale-105 transition-transform"
                    style={{ backgroundColor: '#18181e' }}
                  >
                    <img
                      src={discipline.cards[2]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Giant Red Word */}
              <h2
                className={`font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] tracking-tight text-center transition-all duration-300 ${
                  isHovered ? 'text-[#f5f5f0] scale-[1.02]' : 'text-[#ff3823]'
                }`}
                style={{
                  textShadow: isHovered
                    ? '0 0 30px rgba(255, 255, 255, 0.2)'
                    : '0 0 40px rgba(255, 56, 35, 0.25)',
                }}
              >
                {discipline.title}
              </h2>

              {/* Learn More link below hovered word */}
              <div
                className={`transition-opacity duration-300 pt-2 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-300 underline decoration-white/40 underline-offset-4 hover:text-white">
                  Learn More
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default PhysicsDisciplines;
