import React from 'react';
import { Compass, Sparkles, Layers, Search, Film, MessageSquare, Monitor, LayoutGrid } from 'lucide-react';

export default function BottomDock({ activeTab = 'hero', onSelectTab }) {
  const tabs = [
    { id: 'hero', label: 'Intro', icon: Compass },
    { id: 'desk', label: 'Scatter', icon: Layers },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'reel', label: 'Film Reel', icon: Film },
    { id: 'chat', label: 'AI Stack', icon: MessageSquare },
    { id: 'windows', label: 'Dark Windows', icon: Monitor },
    { id: 'showcase', label: 'iPad Feed', icon: LayoutGrid },
  ];

  return (
    <nav 
      aria-label="Section Navigation"
      className="sticky bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-max mx-auto my-4"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-2xl glass-dock border border-white/10 shadow-2xl backdrop-blur-xl bg-stone-900/90 max-w-[95vw] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab && onSelectTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'text-white bg-white/15 shadow-inner'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF5722]' : 'text-stone-400'}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FF5722] rounded-full shadow-[0_0_8px_#FF5722]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
