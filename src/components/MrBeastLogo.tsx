import React from 'react';

interface MrBeastLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const MrBeastLogo: React.FC<MrBeastLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Real MrBeast Panther Logo (Original SVG Asset) */}
      <img
        src="/assets/mrbeast-logo.svg"
        alt="MrBeast Panther Logo"
        width={size}
        height={size}
        className="shrink-0 object-contain drop-shadow-[0_0_12px_rgba(8,123,250,0.45)]"
        style={{ width: `${size}px`, height: `${size}px` }}
      />

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-display font-extrabold text-base md:text-lg tracking-tight text-[#F5F7FB]">
              MRBEAST
            </span>
            <span className="text-[#FF3D91] font-mono text-xs font-bold tracking-widest">//</span>
            <span className="font-display font-bold text-base md:text-lg tracking-tight text-[#00BCEB]">
              WORLD
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#AAB4C2] uppercase mt-0.5">
            FAN ARCHIVE
          </span>
        </div>
      )}
    </div>
  );
};
