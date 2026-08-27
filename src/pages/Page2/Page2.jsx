import React, { memo } from 'react';
import { FilmGrain } from '../../components/Page1/FilmGrain/FilmGrain';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';
import { DarkroomCanvas } from '../../components/Page2/DarkroomCanvas/DarkroomCanvas';
import { DarkroomHeader } from '../../components/Page2/DarkroomHeader/DarkroomHeader';
import { DarkroomGridGrain } from '../../components/Page2/DarkroomGridGrain/DarkroomGridGrain';
import './Page2.css';

export const Page2Component = ({ onOpenMenu }) => {
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
        onOpenMenu={onOpenMenu}
      />

      {/* Technical Grid Grain & Telemetry Overlay */}
      <DarkroomGridGrain />

      {/* Section 1 Interactive HUD Video Canvas */}
      <DarkroomCanvas />
    </div>
  );
};

export const Page2 = memo(Page2Component);
export default Page2;
