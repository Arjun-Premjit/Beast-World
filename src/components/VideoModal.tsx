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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-[#3D3024]/15 rounded-3xl shadow-[0_25px_60px_rgba(50,35,20,0.3)] overflow-hidden my-6 text-[#1C1814]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3D3024]/10 bg-[#FAF5ED]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D91]" />
            <span className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase font-bold">
              {video.highlightTag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#3D3024]/15 hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] text-[#1C1814] flex items-center justify-center transition-colors"
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
        <div className="p-6 sm:p-8 space-y-4 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-[#1C1814] font-display">
                {video.title}
              </h2>
              <div className="flex items-center gap-3 text-xs font-mono text-[#61554A] mt-1">
                <span className="flex items-center gap-1 text-[#FF3D91] font-bold">
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
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] text-white text-xs font-bold uppercase font-mono tracking-wider transition-all shrink-0 shadow-[0_4px_16px_rgba(255,61,145,0.4)]"
            >
              <span>WATCH ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs text-[#61554A] leading-relaxed border-t border-[#3D3024]/10 pt-4 font-normal">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
