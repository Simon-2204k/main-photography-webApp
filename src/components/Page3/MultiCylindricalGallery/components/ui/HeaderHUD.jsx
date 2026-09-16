import React from 'react';

export function HeaderHUD({ activeTab = 'LAB', onNavClick }) {
  const navItems = ['HOME', 'PROJECTS', 'ABOUT', 'LAB'];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-6 md:p-8 flex justify-between items-start pointer-events-none select-none font-mono text-xs tracking-wider">
      {/* Top Left Branding & Vertical Nav Menu */}
      <div className="flex flex-col space-y-4 pointer-events-auto">
        <a
          href="#home"
          className="text-sm font-bold text-white tracking-widest hover:text-gray-300 transition-colors uppercase"
        >
          ASHFALL.STUDIO
        </a>

        {/* Vertical Menu Items */}
        <nav className="flex flex-col space-y-1.5 pt-2 text-[#9999a6]">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => onNavClick && onNavClick(item)}
                className={`text-left flex items-center space-x-2 hover:text-white transition-colors duration-200 ${
                  isActive ? 'text-white font-bold' : ''
                }`}
              >
                <span>{isActive ? '•' : ' '}</span>
                <span>{item}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Top Right Action CTA Button */}
      <div className="pointer-events-auto">
        <button
          onClick={() => onNavClick && onNavClick('TALK')}
          className="glass-button px-5 py-2.5 rounded-sm text-xs font-mono font-medium text-white flex items-center space-x-3 tracking-wider group"
        >
          <span>LET'S TALK</span>
          <span className="text-gray-400 group-hover:text-black transition-colors">+</span>
        </button>
      </div>
    </header>
  );
}
