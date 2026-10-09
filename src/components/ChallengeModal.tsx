import React, { useEffect } from 'react';
import { X, Trophy, Clock, Zap, ShieldAlert, ExternalLink, Users } from 'lucide-react';
import type { Challenge } from '../data/challenges';
import { ImageWithFallback } from './ImageWithFallback';

interface ChallengeModalProps {
  challenge: Challenge | null;
  onClose: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ challenge, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (challenge) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [challenge, onClose]);

  if (!challenge) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white text-[#1C1814] border border-[#3D3024]/15 shadow-[0_25px_60px_rgba(50,35,20,0.25)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1C1814]">
          <ImageWithFallback
            src={challenge.thumbnailUrl}
            theme={challenge.visualTheme}
            alt={challenge.title}
            category={challenge.category}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-[#FF3D91] text-white flex items-center justify-center border border-white/20 transition-colors shadow-sm"
            aria-label="Close challenge details"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1814] via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-4 left-6 right-6 z-10 text-white">
            <span className="text-[11px] font-mono text-[#FF3D91] tracking-widest uppercase block mb-1 font-bold">
              {challenge.isRealVideo ? 'OFFICIAL PUBLISHED RELEASE' : 'PRODUCTION CONCEPT'} / {challenge.index}
            </span>
            <h2 id="challenge-modal-title" className="text-xl sm:text-2xl font-bold text-white font-display">
              {challenge.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
            {challenge.fullDescription}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8C7E72] mb-1 font-mono font-medium">
                <Trophy className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span>PRIZE / STAKES</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1C1814] truncate font-display">
                {challenge.prizeOrScale}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8C7E72] mb-1 font-mono font-medium">
                <Clock className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span>DURATION</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1C1814] truncate font-display">
                {challenge.duration}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8C7E72] mb-1 font-mono font-medium">
                <Zap className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span>ENERGY LEVEL</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#FF3D91] font-mono">
                {challenge.energyLevel}
              </p>
            </div>
          </div>

          {/* Key Rule Warning */}
          <div className="p-4 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10 border-l-4 border-l-[#FF3D91] flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#FF3D91] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1C1814] mb-0.5 font-mono">
                CRITICAL CHALLENGE DIRECTIVE
              </h4>
              <p className="text-xs text-[#61554A] leading-relaxed font-normal">
                {challenge.keyRule}
              </p>
            </div>
          </div>

          {/* Action Row with Panther Pink CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#3D3024]/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#61554A] self-start sm:self-center">
              <Users className="w-3.5 h-3.5 text-[#FF3D91]" />
              <span>{challenge.participants}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {challenge.youtubeId && (
                <a
                  href={`https://youtube.com/watch?v=${challenge.youtubeId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all font-mono shadow-[0_4px_16px_rgba(255,61,145,0.4)]"
                >
                  <span>WATCH VIDEO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1C1814] bg-[#FAF5ED] hover:bg-white border border-[#3D3024]/15 hover:border-[#FF3D91] transition-colors font-mono"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
