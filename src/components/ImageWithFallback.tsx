import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  theme?: 'vault' | 'arctic' | 'island' | 'stadium' | 'circle' | 'maze' | 'water' | 'forest' | 'hero';
  className?: string;
  title?: string;
  category?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  theme = 'stadium',
  className = '',
  title,
  category,
}) => {
  const [hasError, setHasError] = useState(false);

  // If valid image source exists and hasn't errored
  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden bg-[#121212] ${className}`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Curated High-Production Architectural SVG Vector Visuals
  return (
    <div className={`relative overflow-hidden bg-[#101010] flex items-center justify-center select-none ${className}`}>
      {theme === 'vault' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#0A0A0A" />
          <radialGradient id="vGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </radialGradient>
          <circle cx="400" cy="300" r="280" fill="url(#vGlow)" />
          
          {/* Laser grids */}
          <line x1="0" y1="180" x2="800" y2="420" stroke="#FFD400" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
          <line x1="0" y1="420" x2="800" y2="180" stroke="#FFD400" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4" />
          <line x1="120" y1="0" x2="680" y2="600" stroke="#FFD400" strokeWidth="1" strokeOpacity="0.25" />
          <line x1="680" y1="0" x2="120" y2="600" stroke="#FFD400" strokeWidth="1" strokeOpacity="0.25" />
          
          {/* Vault Door Geometrics */}
          <circle cx="400" cy="300" r="160" stroke="#262626" strokeWidth="14" />
          <circle cx="400" cy="300" r="140" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="12 8" />
          <circle cx="400" cy="300" r="90" fill="#141414" stroke="#333333" strokeWidth="4" />
          <circle cx="400" cy="300" r="30" fill="#FFD400" fillOpacity="0.9" />
          
          {/* Locking Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="400"
              y1="300"
              x2={400 + Math.cos((angle * Math.PI) / 180) * 135}
              y2={300 + Math.sin((angle * Math.PI) / 180) * 135}
              stroke="#555"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          {/* Digital Timer Stamp */}
          <text x="400" y="520" textAnchor="middle" fill="#FFD400" fontSize="16" fontFamily="JetBrains Mono" letterSpacing="4">
            SEC_LOCK // 00:59:59
          </text>
        </svg>
      )}

      {theme === 'arctic' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#06090D" />
          <radialGradient id="aGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06090D" stopOpacity="0" />
          </radialGradient>
          <circle cx="400" cy="240" r="300" fill="url(#aGlow)" />
          
          {/* Mountain Silhouettes */}
          <path d="M0 480L180 260L360 440L560 210L800 480V600H0Z" fill="#101924" opacity="0.8" />
          <path d="M0 520L280 340L490 500L650 360L800 520V600H0Z" fill="#182535" opacity="0.9" />
          
          {/* Geodesic Survival Dome */}
          <g transform="translate(400, 420)">
            <ellipse cx="0" cy="40" rx="90" ry="20" fill="#000" opacity="0.6" />
            <path d="M-70 30C-70 -20 0 -50 70 30Z" fill="#0E1620" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="-70" y1="30" x2="0" y2="-50" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="70" y1="30" x2="0" y2="-50" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="0" y1="30" x2="0" y2="-50" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.8" />
            <circle cx="0" cy="0" r="14" fill="#FFD400" opacity="0.9" filter="drop-shadow(0 0 10px #FFD400)" />
          </g>
          <text x="400" y="550" textAnchor="middle" fill="#94A3B8" fontSize="14" fontFamily="JetBrains Mono" letterSpacing="3">
            LAT -78.21° // SUB-ZERO HABITAT
          </text>
        </svg>
      )}

      {theme === 'island' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#080F14" />
          <radialGradient id="iGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#080F14" stopOpacity="0" />
          </radialGradient>
          <circle cx="400" cy="300" r="280" fill="url(#iGlow)" />
          
          {/* Topographic Contours */}
          <path d="M220 320C240 240 380 200 480 220C580 240 620 360 560 420C480 500 280 440 220 320Z" fill="#13232C" stroke="#2DD4BF" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M280 320C300 260 420 230 460 250C520 270 540 360 490 390C430 430 300 400 280 320Z" fill="#1C323E" stroke="#FFD400" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="410" cy="310" r="8" fill="#FFD400" />
          <circle cx="410" cy="310" r="24" stroke="#FFD400" strokeWidth="1.5" strokeDasharray="4 4" />
          
          <text x="400" y="520" textAnchor="middle" fill="#2DD4BF" fontSize="14" fontFamily="JetBrains Mono" letterSpacing="4">
            PERIMETER ZONE // DROP_03
          </text>
        </svg>
      )}

      {theme === 'stadium' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#0A0A0A" />
          <radialGradient id="sHeroGlow" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#EAB308" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </radialGradient>
          <rect width="800" height="600" fill="url(#sHeroGlow)" />
          
          {/* Stadium Spotlights */}
          <polygon points="100,0 280,600 210,600 80,0" fill="#FFD400" opacity="0.06" />
          <polygon points="700,0 520,600 590,600 720,0" fill="#FFD400" opacity="0.06" />
          <polygon points="400,0 350,600 450,600 400,0" fill="#FFFFFF" opacity="0.08" />
          
          {/* Architectural Arena Truss */}
          <line x1="0" y1="80" x2="800" y2="80" stroke="#333" strokeWidth="3" />
          <line x1="0" y1="120" x2="800" y2="120" stroke="#222" strokeWidth="2" />
          {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
            <line key={i} x1={x} y1="80" x2={x + 40} y2="120" stroke="#444" strokeWidth="1.5" />
          ))}
          
          {/* Stadium Pedestal / Ring */}
          <ellipse cx="400" cy="460" rx="320" ry="80" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.5" fill="#141414" />
          <ellipse cx="400" cy="460" rx="220" ry="55" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="400" cy="440" r="18" fill="#FFD400" />
        </svg>
      )}

      {theme === 'circle' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#0A0A0A" />
          <circle cx="400" cy="300" r="200" stroke="#EF4444" strokeWidth="12" strokeOpacity="0.85" filter="drop-shadow(0 0 16px rgba(239,68,68,0.5))" />
          <circle cx="400" cy="300" r="160" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.2" />
          <rect x="360" y="260" width="80" height="80" rx="12" fill="#161616" stroke="#EF4444" strokeWidth="2" />
          <text x="400" y="306" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="Syne" fontWeight="bold">DAY 100</text>
        </svg>
      )}

      {theme === 'maze' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#0A0A0A" />
          {/* Labyrinth segments */}
          <path d="M120 120H680V480H120V120ZM200 200H600V400H200V200ZM280 280H520V320H280V280Z" stroke="#333" strokeWidth="8" fill="none" />
          <path d="M200 300H280M400 200V280M520 300H600" stroke="#FFD400" strokeWidth="6" />
        </svg>
      )}

      {theme === 'water' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#080E14" />
          <radialGradient id="wGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#080E14" stopOpacity="0" />
          </radialGradient>
          <circle cx="400" cy="280" r="300" fill="url(#wGlow)" />
          {/* Clean water ripple waves */}
          {[1, 2, 3, 4].map((ring) => (
            <ellipse
              key={ring}
              cx="400"
              cy="360"
              rx={ring * 65}
              ry={ring * 24}
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeOpacity={0.7 - ring * 0.12}
              fill="none"
            />
          ))}
          {/* Solar well tower icon */}
          <path d="M370 240L400 160L430 240H370Z" fill="#FFD400" opacity="0.8" />
          <line x1="400" y1="160" x2="400" y2="360" stroke="#FFD400" strokeWidth="3" />
          <circle cx="400" cy="360" r="10" fill="#38BDF8" />
        </svg>
      )}

      {theme === 'forest' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#08100C" />
          <radialGradient id="fGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#08100C" stopOpacity="0" />
          </radialGradient>
          <circle cx="400" cy="280" r="280" fill="url(#fGlow)" />
          {/* Tree geometric silhouettes */}
          <polygon points="400,160 330,300 470,300" fill="#065F46" />
          <polygon points="400,240 310,380 490,380" fill="#047857" />
          <polygon points="400,320 290,460 510,460" fill="#059669" />
          <rect x="385" y="460" width="30" height="60" fill="#1C1917" />
          <text x="400" y="550" textAnchor="middle" fill="#34D399" fontSize="14" fontFamily="JetBrains Mono" letterSpacing="4">
            20,000,000 TREES PLANTED
          </text>
        </svg>
      )}

      {theme === 'hero' && (
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="900" fill="#080808" />
          <radialGradient id="heroCenterGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#FFD400" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0" />
          </radialGradient>
          <rect width="1440" height="900" fill="url(#heroCenterGlow)" />
          
          {/* Laser stage projectors */}
          <line x1="200" y1="0" x2="680" y2="850" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.3" />
          <line x1="1240" y1="0" x2="760" y2="850" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.3" />
          <line x1="720" y1="0" x2="720" y2="850" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.15" />
          
          {/* Perspective grid arena */}
          <line x1="0" y1="720" x2="1440" y2="720" stroke="#222" strokeWidth="1.5" />
          <line x1="0" y1="780" x2="1440" y2="780" stroke="#2A2A2A" strokeWidth="2" />
          <line x1="0" y1="850" x2="1440" y2="850" stroke="#333" strokeWidth="3" />
          
          <ellipse cx="720" cy="720" rx="420" ry="90" stroke="#FFD400" strokeWidth="2" strokeOpacity="0.6" fill="none" />
          <ellipse cx="720" cy="720" rx="280" ry="60" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        </svg>
      )}

      {/* Atmospheric vignette scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Clean caption watermark if provided */}
      {category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[11px] font-medium tracking-widest text-[#FFD400] uppercase font-mono">
            {category}
          </span>
        </div>
      )}
    </div>
  );
};
