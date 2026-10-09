import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[#F4EFE6] text-[#1C1814]">
      <div className="w-14 h-14 rounded-full bg-[#FF3D91]/15 border border-[#FF3D91]/30 flex items-center justify-center text-[#FF3D91] mb-6 shadow-sm">
        <AlertTriangle className="w-7 h-7 text-[#FF3D91]" />
      </div>
      <span className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase mb-2 font-bold">
        ERROR 404 / PERIMETER BOUNDARY
      </span>
      <h1 className="text-4xl sm:text-6xl font-light text-[#1C1814] uppercase font-display mb-4">
        THIS PAGE DOESN'T EXIST.
      </h1>
      <p className="text-xs sm:text-sm text-[#61554A] max-w-md mb-8 leading-relaxed font-normal">
        You stepped outside the verified challenge perimeter. Return to the main hub to continue exploring.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] text-white text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO HOME</span>
      </Link>
    </div>
  );
};
