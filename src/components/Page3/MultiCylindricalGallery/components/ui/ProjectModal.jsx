import React, { useEffect } from 'react';
import { X, ArrowUpRight, Tag, Calendar, User, Layers } from 'lucide-react';

export function ProjectModal({ card, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] glass-panel rounded-lg overflow-hidden flex flex-col md:flex-row border border-white/15 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Project High-Res Image Preview */}
        <div className="w-full md:w-3/5 h-64 md:h-auto relative bg-black/90 overflow-hidden flex items-center justify-center">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover filter contrast-105 brightness-95 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right Side: Detailed Project Story & Telemetry */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 overflow-y-auto font-sans text-xs">
          <div className="space-y-4">
            {/* Header Category & Year */}
            <div className="flex items-center space-x-2 font-mono text-[11px] text-emerald-400">
              <span>{card.category}</span>
              <span>•</span>
              <span>{card.year}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-sm">
              {card.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-[11px]">
              <div>
                <span className="text-gray-500 block">CLIENT</span>
                <span className="text-gray-200 font-medium">{card.client}</span>
              </div>
              <div>
                <span className="text-gray-500 block">YEAR</span>
                <span className="text-gray-200 font-medium">{card.year}</span>
              </div>
            </div>

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div className="pt-4 space-y-2 border-t border-white/10">
                <span className="font-mono text-[10px] text-gray-500 block">KEYWORDS</span>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA inside modal */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => alert(`Launching project showcase: ${card.title}`)}
              className="glass-button w-full py-3 px-4 rounded text-xs font-mono font-bold text-white flex items-center justify-center space-x-2 group"
            >
              <span>VIEW FULL CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
