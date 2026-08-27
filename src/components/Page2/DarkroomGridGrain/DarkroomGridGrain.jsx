import React, { useState, useEffect, memo } from 'react';
import './DarkroomGridGrain.css';

export const DarkroomGridGrainComponent = () => {
  const [timeStr, setTimeStr] = useState('10:33:00');
  const [dateStr, setDateStr] = useState('27.08.2026');
  const [displayStr, setDisplayStr] = useState('1920X1080PX @ 75HZ');
  const [browserName, setBrowserName] = useState('GOOGLE CHROME');

  useEffect(() => {
    // Detect browser
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;
      if (ua.includes('Firefox')) setBrowserName('MOZILLA FIREFOX');
      else if (ua.includes('Safari') && !ua.includes('Chrome')) setBrowserName('APPLE SAFARI');
      else if (ua.includes('Edg')) setBrowserName('MICROSOFT EDGE');
      else setBrowserName('GOOGLE CHROME');
    }

    const updateMetrics = () => {
      const now = new Date();
      // IST / Indian standard time
      const timeOpts = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setTimeStr(new Intl.DateTimeFormat('en-GB', timeOpts).format(now));

      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      setDateStr(`${day}.${month}.${year}`);

      setDisplayStr(`${window.innerWidth}X${window.innerHeight}PX @ 75HZ`);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);
    window.addEventListener('resize', updateMetrics);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  return (
    <div className="darkroom-grid-grain-overlay" aria-hidden="true">
      {/* 1. Four Precision Corner Viewport Brackets */}
      <div className="darkroom-corner-bracket top-left" />
      <div className="darkroom-corner-bracket top-right" />
      <div className="darkroom-corner-bracket bottom-left" />
      <div className="darkroom-corner-bracket bottom-right" />

      {/* 2. Grid Grain Markers: Crosshairs (+) */}
      <span className="darkroom-cross-marker" style={{ top: '15%', left: '22%' }}>+</span>
      <span className="darkroom-cross-marker" style={{ top: '55%', left: '28%' }}>+</span>
      <span className="darkroom-cross-marker" style={{ top: '78%', left: '18%' }}>+</span>
      <span className="darkroom-cross-marker" style={{ top: '35%', right: '24%' }}>+</span>
      <span className="darkroom-cross-marker" style={{ top: '70%', right: '35%' }}>+</span>

      {/* 3. Technical Target Boxes [X] */}
      <div className="darkroom-target-box" style={{ top: '18%', left: '17%' }}>✕</div>
      <div className="darkroom-target-box" style={{ top: '42%', left: '54%' }}>✕</div>
      <div className="darkroom-target-box" style={{ top: '75%', left: '9%' }}>✕</div>
      <div className="darkroom-target-box" style={{ top: '82%', right: '18%' }}>✕</div>
      <div className="darkroom-target-box" style={{ top: '88%', right: '31%' }}>✕</div>

      {/* 4. Circular Reticles */}
      <div className="darkroom-reticle-circle" style={{ top: '17%', left: '18%' }} />
      <div className="darkroom-reticle-circle" style={{ top: '57%', left: '32%' }} />

      {/* 5. Right-Side Vertical Scale Tick Ladder */}
      <div className="darkroom-tick-scale">
        <div className="tick-line long" />
        <div className="tick-line med" />
        <div className="tick-line short" />
        <div className="tick-line med" />
        <div className="tick-line long" />
        <div className="tick-line short" />
        <div className="tick-line med" />
        <div className="tick-line long" />
        <div className="tick-line med" />
        <div className="tick-line short" />
        <div className="tick-line long" />
      </div>

      {/* 6. Top-Left Monospace Telemetry Block */}
      <div className="darkroom-telemetry-top-left">
        <div className="title-line">PARSING DATA</div>
        <div className="divider">------------</div>
        <div>DATE&nbsp;&nbsp;&nbsp;&nbsp;: <span className="data-val">[{dateStr}]</span></div>
        <div>HOUR&nbsp;&nbsp;&nbsp;&nbsp;: <span className="data-val">[{timeStr}]</span></div>
        <div>LOADING PROJECTS : <span className="data-val">[01/01]</span></div>
        <br />
        <div>DISPLAY : <span className="data-val">[{displayStr}]</span></div>
        <div>BROWSER : <span className="data-val">[{browserName}]</span></div>
        <div>LANGUAGE: <span className="data-val">[ENGLISH]</span></div>
      </div>

      {/* 7. Bottom-Right Monospace Telemetry Block */}
      <div className="darkroom-telemetry-bottom-right">
        <div>VIDEO ID / AAN 5410AQZ8FAZ8A / POK5 XFRK YV7C VIEWPORT /</div>
        <div>FRAMES 1920X1080*1.28 / 0 DROPPED OF 8545% CURRENT /</div>
        <div>OPTIMAL RES 1920X1080@25 / 3840X2160@25 VOLUME /</div>
        <div>NORMALIZED 100% / 100% (CONTENT LOUDNESS -25.8DB) CODECS</div>
        <div>AVC1.90100615137 / OPUS (201)</div>

        <div className="sub-parsing-block">
          <div className="title-line">PARSING DATA</div>
          <div>------------</div>
          <div>DATE&nbsp;&nbsp;&nbsp;&nbsp;: [{dateStr}]</div>
          <div>HOUR&nbsp;&nbsp;&nbsp;&nbsp;: [{timeStr}]</div>
          <div>LOADING PROJECTS : [01/01]</div>
          <div>DISPLAY : [{displayStr}]</div>
          <div>BROWSER : [{browserName}]</div>
          <div>LANGUAGE: [ENGLISH]</div>
        </div>
      </div>
    </div>
  );
};

export const DarkroomGridGrain = memo(DarkroomGridGrainComponent);
export default DarkroomGridGrain;
