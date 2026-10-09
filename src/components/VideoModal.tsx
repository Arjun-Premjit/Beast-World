import React, { useEffect } from 'react';
import { X, ExternalLink, Eye } from 'lucide-react';
import type { PopularVideo } from '../data/popularVideos';

interface VideoModalProps {
  video: PopularVideo | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#070A10]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-[#101826] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070A10]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#087BFA]" />
            <span className="text-xs font-mono tracking-widest text-[#00BCEB] uppercase">
              {video.highlightTag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white text-white flex items-center justify-center transition-colors"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player 16:9 responsive embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Metadata & Controls */}
        <div className="p-6 sm:p-8 space-y-4 bg-[#101826]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-[#F5F7FB] font-display">
                {video.title}
              </h2>
              <div className="flex items-center gap-3 text-xs font-mono text-[#AAB4C2] mt-1">
                <span className="flex items-center gap-1 text-[#00BCEB]">
                  <Eye className="w-3.5 h-3.5" />
                  {video.views}
                </span>
                <span>·</span>
                <span>Year: {video.publishedYear}</span>
                <span>·</span>
                <span className="uppercase">{video.type}</span>
              </div>
            </div>

            <a
              href={`https://youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 text-white text-xs font-medium uppercase font-mono tracking-wider transition-all shrink-0"
            >
              <span>WATCH ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs text-[#AAB4C2] leading-relaxed border-t border-white/10 pt-4 font-normal">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
