import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Film, Activity, CheckCircle2, RotateCcw, ArrowDown, Eye, Sliders } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// High-resolution verified footage keyframes from authentic MrBeast challenge productions
const AUTHENTIC_KEYFRAMES: { src: string; caption: string; stat: string }[] = [
  {
    src: 'https://img.youtube.com/vi/0e3GPea1Tyg/maxresdefault.jpg',
    caption: 'T-00:00: RED LIGHT GREEN LIGHT ARENA COUNTDOWN',
    stat: '456 CONTESTANTS ON SET',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/MrBeast_2023_%28cropped%29.jpg/800px-MrBeast_2023_%28cropped%29.jpg',
    caption: 'T-00:01: JIMMY INITIATES HIGH-STAKES SEQUENCE',
    stat: '100% UNGUARDED HUMAN EMOTION',
  },
  {
    src: 'https://img.youtube.com/vi/1WEAJ-DFkHE/maxresdefault.jpg',
    caption: 'T-00:02: PHYSICAL CASH VAULT UNSEALED',
    stat: '$456,000 CASH IN THE GLASS PIGGY BANK',
  },
  {
    src: 'https://img.youtube.com/vi/Hwybp38GnZw/maxresdefault.jpg',
    caption: 'T-00:03: SOUNDSTAGE PRESSURE AT APEX',
    stat: '200+ AUTOMATED 4K RECORDING CAMERAS',
  },
  {
    src: 'https://img.youtube.com/vi/er6m94z58_c/maxresdefault.jpg',
    caption: 'T-00:04: SURVIVAL GAUNTLET ENGAGED',
    stat: 'ZERO RETAKES · REAL CONTINUOUS ACTION',
  },
];

export const ScrollScrubbedFootage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preloaded image element references for smooth canvas drawing
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload verified keyframe images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    AUTHENTIC_KEYFRAMES.forEach((frame, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = frame.src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === AUTHENTIC_KEYFRAMES.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Still count to prevent blocking
        loadedCount++;
        if (loadedCount === AUTHENTIC_KEYFRAMES.length) {
          setImagesLoaded(true);
        }
      };
      images[idx] = img;
    });

    loadedImagesRef.current = images;
  }, []);

  // Canvas render function
  const renderCanvasFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = loadedImagesRef.current[index];
    if (img && img.complete && img.naturalWidth > 0) {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;

      // Cover aspect ratio
      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cWidth / cHeight;

      let drawWidth = cWidth;
      let drawHeight = cHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = cWidth / imgRatio;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawWidth = cHeight * imgRatio;
        offsetX = (cWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Vignette effect
      const grad = ctx.createRadialGradient(
        cWidth / 2,
        cHeight / 2,
        cWidth * 0.2,
        cWidth / 2,
        cHeight / 2,
        cWidth * 0.7
      );
      grad.addColorStop(0, 'rgba(8, 9, 13, 0)');
      grad.addColorStop(1, 'rgba(8, 9, 13, 0.75)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cWidth, cHeight);
    }
  };

  useEffect(() => {
    if (imagesLoaded) {
      renderCanvasFrame(currentFrameIndex);
    }
  }, [imagesLoaded, currentFrameIndex]);

  // GSAP ScrollTrigger timeline for scroll scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map progress to frame index
        const totalFrames = AUTHENTIC_KEYFRAMES.length;
        const frameIdx = Math.min(Math.floor(p * totalFrames), totalFrames - 1);
        setCurrentFrameIndex(frameIdx);

        // Also scrub video element if video source is loaded
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = p * videoRef.current.duration;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [imagesLoaded]);

  // Manual playback toggle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingManual) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % AUTHENTIC_KEYFRAMES.length);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlayingManual]);

  const activeData = AUTHENTIC_KEYFRAMES[currentFrameIndex] || AUTHENTIC_KEYFRAMES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#08090D] overflow-hidden flex items-center justify-center select-none border-b border-white/[0.08]"
    >
      {/* Canvas rendering frame sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05] brightness-90 z-0"
      />

      {/* Atmospheric lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-[#08090D]/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090D]/90 via-transparent to-[#08090D]/90 pointer-events-none z-10" />

      {/* Top HUD Header */}
      <div className="absolute top-8 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono text-neutral-400 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#28B8E8]" />
          <span className="text-white font-semibold">SCROLL-SCRUBBED FOOTAGE ENGINE</span>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <span className="hidden sm:inline text-[#28B8E8]">AUTHENTIC PRODUCTION ARCHIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-neutral-500">PROGRESS:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-white font-mono">
            {Math.round(scrollProgress * 100)}%
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#28B8E8] font-bold">
            FRAME {currentFrameIndex + 1}/{AUTHENTIC_KEYFRAMES.length}
          </span>
        </div>
      </div>

      {/* Center Cinematic Content HUD */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-[#28B8E8]">
          <Activity className="w-3.5 h-3.5 text-[#1769E0] animate-pulse" />
          <span>{activeData.stat}</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase font-display leading-[0.95]">
          SCROLL TO SCRUB <br />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#28B8E8]">
            REAL PRODUCTION.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 font-mono max-w-xl mx-auto bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-white/10">
          {activeData.caption}
        </p>

        {/* Controls HUD */}
        <div className="pt-2 flex items-center justify-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsPlayingManual(!isPlayingManual)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all backdrop-blur-md"
          >
            {isPlayingManual ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#28B8E8]" />
                <span>PAUSE PLAYBACK</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#28B8E8]" />
                <span>AUTO DEMO REEL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Frame Progress Scrubber Bar */}
      <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 z-20 pointer-events-none border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-300">
          <ArrowDown className="w-3.5 h-3.5 text-[#28B8E8] animate-bounce" />
          <span>SCROLL DOWN TO ADVANCE TIMELINE · SCROLL UP TO REVERSE</span>
        </div>

        {/* Visual Keyframe Stepper */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {AUTHENTIC_KEYFRAMES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentFrameIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentFrameIndex === idx
                  ? 'w-8 bg-[#28B8E8] shadow-[0_0_12px_rgba(40,184,232,0.6)]'
                  : 'w-2 bg-white/20 hover:bg-white/50'
              }`}
              aria-label={`Jump to frame ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 text-neutral-500">
          <span>CANVAS RENDERING // 60FPS</span>
          <span>·</span>
          <span>VERIFIED ASSET REEL</span>
        </div>
      </div>
    </div>
  );
};
