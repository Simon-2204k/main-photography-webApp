import React from 'react';

export function FocusHUD({
  activeLayerInfo,
  autoRotate,
  onToggleAutoRotate,
  onJumpToLayer,
  layerCount = 7
}) {
  const currentLayer = activeLayerInfo?.layer;
  const layerIndex = activeLayerInfo?.index ?? 0;
  const currentFocus = activeLayerInfo?.focus ?? 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-8 font-mono text-xs text-[#a0a0b0]">
      {/* Center Viewport Crosshair Target & Guideline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Subtle Horizontal Guide Line across center focus plane */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent absolute" />

        {/* Center Target '+' Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-[1px] bg-white/40 absolute" />
          <div className="h-3 w-[1px] bg-white/40 absolute" />
        </div>
      </div>

      {/* Spacer for top header */}
      <div />

      {/* Bottom HUD Bar */}
      <div className="flex justify-between items-center w-full pointer-events-auto">
        {/* Layer Quick Jump Dots */}
        <div className="flex items-center space-x-2 glass-panel px-3 py-2 rounded">
          {Array.from({ length: layerCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onJumpToLayer && onJumpToLayer(idx)}
              title={`Jump to Layer ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === layerIndex
                  ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Rotate Toggle Control */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleAutoRotate}
            className={`glass-panel px-3 py-2 rounded text-[11px] font-mono transition-colors ${
              autoRotate ? 'text-emerald-400 border-emerald-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            ROTATE: {autoRotate ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FocusHUD);
