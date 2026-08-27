import React, { useState, useCallback, memo } from 'react';
import { FilmGrain } from '../../components/Page1/FilmGrain/FilmGrain';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';
import { MenuOverlay } from '../../components/Page1/MenuOverlay/MenuOverlay';
import { DarkroomCanvas } from '../../components/Page2/DarkroomCanvas/DarkroomCanvas';
import { DarkroomHeader } from '../../components/Page2/DarkroomHeader/DarkroomHeader';
import './Page2.css';

export const Page2Component = ({ onSelectPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTriggerRect, setMenuTriggerRect] = useState(null);

  const handleOpenMenu = useCallback((rect) => {
    setMenuTriggerRect(rect);
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="page2-root-wrapper">
      {/* Device Restriction Blocker (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Cinematic Film Grain Overlay */}
      <FilmGrain />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Section 1 Header: CHRONICLES IN LIGHT + MENU */}
      <DarkroomHeader
        isVisible={true}
        onOpenMenu={handleOpenMenu}
      />

      {/* Section 1 Interactive HUD Video Canvas */}
      <DarkroomCanvas />

      {/* Fullscreen Navigation Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onSelectPage={onSelectPage}
        triggerRect={menuTriggerRect}
      />
    </div>
  );
};

export const Page2 = memo(Page2Component);
export default Page2;
