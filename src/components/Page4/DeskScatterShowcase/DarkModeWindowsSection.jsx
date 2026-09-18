import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Sparkles, Folder, FileText, ArrowRight, CheckCircle2, Shield, Zap, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DarkModeWindowsSection() {
  const sectionRef = useRef(null);
  const win1Ref = useRef(null);
  const win2Ref = useRef(null);
  const win3Ref = useRef(null);
  const outroRef = useRef(null);
  const headlineDarkRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const win1 = win1Ref.current;
    const win2 = win2Ref.current;
    const win3 = win3Ref.current;
    const outro = outroRef.current;
    const headlineDark = headlineDarkRef.current;

    if (!section || !win1 || !win2 || !win3) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: Window 1 is in focus, Headline 1 displays
      tl.fromTo(
        win1,
        { scale: 0.88, y: 80, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Window 2 cascades forward on scroll, Window 1 scales down & pushes back in 3D
      tl.to(
        win1,
        { scale: 0.92, y: -40, opacity: 0.6, filter: 'brightness(0.7)', duration: 0.8, ease: 'power2.inOut' },
        'step2'
      );
      tl.fromTo(
        win2,
        { scale: 0.88, y: 120, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        'step2'
      );

      // 3. Window 3 cascades forward, Window 2 pushes back in stack, Headline changes to "Create intelligent notes and summaries"
      tl.to(
        win2,
        { scale: 0.94, y: -30, opacity: 0.7, filter: 'brightness(0.75)', duration: 0.8, ease: 'power2.inOut' },
        'step3'
      );
      tl.to(
        win1,
        { scale: 0.86, y: -70, opacity: 0.3, duration: 0.8, ease: 'power2.inOut' },
        'step3'
      );
      tl.fromTo(
        win3,
        { scale: 0.88, y: 120, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        'step3'
      );

      // 4. Windows exit & Full-Screen Outro hero reveals
      tl.to(
        [win1, win2, win3, headlineDark],
        { opacity: 0, y: -100, scale: 0.8, duration: 0.6, ease: 'power2.in' },
        'outro'
      );
      tl.fromTo(
        outro,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        'outro+=0.2'
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070709] overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e11] via-[#070709] to-[#040405] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Headline Indicator */}
      <div
        ref={headlineDarkRef}
        className="relative z-20 text-center mb-6 px-6 max-w-4xl min-h-[50px] flex items-center justify-center"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-xl">
          Analyze, synthesize & create <br className="hidden sm:inline" />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-[#FF7043]">deep neural understanding.</span>
        </h2>
      </div>

      {/* 3D Cascading Layered App Windows Area */}
      <div className="relative z-10 w-full max-w-5xl h-[470px] sm:h-[510px] flex items-center justify-center">
        
        {/* WINDOW 1: Analyze Large Datasets & Citations */}
        <div
          ref={win1Ref}
          className="absolute w-[92%] sm:w-[860px] h-[400px] sm:h-[450px] rounded-2xl bg-[#121216] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col will-change-transform"
        >
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-900/90 border-b border-white/10 text-xs font-mono text-stone-300">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-3 text-stone-300 font-sans font-semibold">Home / Context Is All You Need</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-sans text-[11px]">
                33 Files Loaded
              </span>
            </div>
          </div>

          {/* Window Body: File Grid + AI Chat Panel */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Files Matrix */}
            <div className="flex-1 p-3 grid grid-cols-6 gap-2 overflow-hidden bg-stone-950/60">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-stone-900/70 border border-white/10 p-1.5 flex flex-col justify-between h-24 hover:border-[#FF5722]/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono text-stone-400">
                    <FileText className="w-3 h-3 text-[#FF7043]" />
                    <span>0{i + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-white/20 rounded w-4/5" />
                    <div className="h-1 bg-white/10 rounded w-3/5" />
                  </div>
                  <div className="text-[7px] font-mono text-stone-400 truncate">
                    thesis_doc_{i + 1}.pdf
                  </div>
                </div>
              ))}
            </div>

            {/* Right AI Assistant Panel */}
            <div className="w-72 sm:w-80 p-4 bg-stone-900/95 border-l border-white/10 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-300 font-mono text-[11px] pb-2 border-b border-white/10">
                  <Bot className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span className="font-semibold text-white">Context Assistant</span>
                </div>

                {/* Prompt Bubble */}
                <div className="p-3 rounded-xl bg-stone-800 border border-white/10 text-stone-200 text-xs leading-relaxed">
                  "Read this entire folder and describe how the thesis behind Context has changed throughout the year. Include citations."
                </div>

                {/* Response State */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Cross-referenced 33 citations</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-stone-500 text-[10px] font-mono">
                <span>AI ANALYSIS COMPLETE</span>
                <span className="text-[#FF7043]">99.8% CONFIDENCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* WINDOW 2: Creative Generative Synthesis (Zine Cover) */}
        <div
          ref={win2Ref}
          className="absolute w-[92%] sm:w-[860px] h-[400px] sm:h-[450px] rounded-2xl bg-[#121216] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col will-change-transform opacity-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-white/10 text-xs font-mono text-stone-300">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-3 text-stone-300 font-sans font-semibold">Home / Buckminster Fuller / Creative Synthesis</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FF5722]/20 border border-[#FF5722]/30 text-[#FF7043] text-[11px] font-sans">
              <Sparkles className="w-3 h-3" />
              <span>Generative Studio</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Visual Workspace */}
            <div className="flex-1 p-4 flex items-center justify-center gap-4 bg-stone-950/80">
              <div className="w-44 h-56 rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black">
                <img src="/assets/items/item_3.jpg" alt="zine art" className="w-full h-full object-cover" />
              </div>
              <div className="w-44 h-56 rounded-lg overflow-hidden border border-[#FF5722]/50 shadow-2xl bg-black relative">
                <img src="/assets/items/item_5.jpg" alt="zine cover draft" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white">
                  COVER_DRAFT_V2
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="w-72 sm:w-80 p-4 bg-stone-900/95 border-l border-white/10 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-stone-800 border border-white/10 text-stone-200 leading-relaxed">
                  "Create a zine cover based on some of the visual elements from the files in this folder"
                </div>

                <div className="p-3 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-stone-200 text-xs">
                  <span className="text-[#FF7043] font-semibold block mb-1">Synthesizing Imagery</span>
                  Extracted 8 geometric vectors & architectural overlays from archive.
                </div>
              </div>

              <div className="text-[10px] font-mono text-stone-400">READY TO EXPORT (PRINT READY)</div>
            </div>
          </div>
        </div>

        {/* WINDOW 3: Intelligent Notes and Summaries */}
        <div
          ref={win3Ref}
          className="absolute w-[92%] sm:w-[860px] h-[400px] sm:h-[450px] rounded-2xl bg-[#121216] border border-[#FF5722]/40 shadow-[0_30px_90px_rgba(255,87,34,0.25)] overflow-hidden flex flex-col will-change-transform opacity-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-white/10 text-xs font-mono text-stone-300">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-3 text-stone-300 font-sans font-semibold">Home / Computing HCI / Auto-Summarizer</span>
            </div>
            <div className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-sans font-semibold">
              Live Synthesis
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Document Outline Table */}
            <div className="flex-1 p-4 bg-stone-950/70 overflow-hidden font-mono text-xs">
              <div className="text-[10px] text-stone-500 uppercase font-bold mb-2 pb-1 border-b border-white/10 flex justify-between">
                <span>File Name</span>
                <span>Generated Notes</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: 'Agency_Among_Agents.pdf', note: 'Multi-agent coordination protocols & memory graphs' },
                  { name: 'HCI_Research_Summary.pdf', note: 'Direct manipulation vs natural language file queries' },
                  { name: 'Malleable_Software_2026.pdf', note: 'Dynamic UI adaptation across semantic file entities' },
                  { name: 'Knowledge_Work_Automations.pdf', note: 'Zero-latency retrieval in local vector indexes' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5 text-[11px]">
                    <span className="text-stone-300 flex items-center gap-2">
                      <FileText className="w-3 h-3 text-[#FF7043]" />
                      {row.name}
                    </span>
                    <span className="text-[#FF7043] font-sans truncate max-w-[240px]">{row.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Chat Action */}
            <div className="w-72 sm:w-80 p-4 bg-stone-900/95 border-l border-white/10 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-stone-800 border border-white/10 text-stone-200 leading-relaxed">
                  "Read each file in this folder and add a 2 line summary to their metadata notes."
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Batch Updated 4 Files</span>
                  </div>
                  All metadata tags synced to local vector store.
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-t border-white/10 pt-2">
                <span>POLARIS ENGINE V2.4</span>
                <span className="text-emerald-400">READY</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* GRAND FULL-SCREEN END OUTRO SECTION */}
      <div
        ref={outroRef}
        className="absolute inset-0 z-40 bg-[#070709] flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none [&.pointer-events-auto]:pointer-events-auto"
      >
        <div className="max-w-3xl space-y-6">
          {/* Logo Big */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF5722] to-[#FF8A65] shadow-[0_0_40px_rgba(255,87,34,0.6)] mb-2">
            <svg viewBox="0 0 100 100" className="w-10 h-10">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#ffffff" />
            </svg>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white leading-tight">
            Find your files <br />
            <span className="italic font-light text-stone-300">naturally.</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-400 max-w-xl mx-auto leading-relaxed">
            The intelligent, zero-lag file browser that actually understands what's inside your files. Experience seamless scroll-driven search and spatial media management.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7043] text-white text-base font-semibold shadow-xl shadow-[#FF5722]/40 hover:shadow-[#FF5722]/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
              <span>Join the Private Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/15 text-stone-200 text-base font-medium hover:bg-white/15 hover:text-white transition-all">
              Watch Product Keynote
            </button>
          </div>

          <div className="pt-8 text-xs font-mono text-stone-600 flex items-center justify-center gap-6">
            <span>© 2026 POLY INC.</span>
            <span>•</span>
            <span>BUILT WITH REACT + GSAP + LENIS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
