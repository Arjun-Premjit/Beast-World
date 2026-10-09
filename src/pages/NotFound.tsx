import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[#F4F2EC] text-[#151515]">
      <div className="w-12 h-12 border border-[#151515]/20 flex items-center justify-center text-[#1769E0] mb-6">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <span className="text-xs font-mono tracking-widest text-[#707070] uppercase mb-2">
        ERROR 404 / PERIMETER BOUNDARY
      </span>
      <h1 className="text-4xl sm:text-6xl font-light text-[#151515] uppercase font-display mb-4">
        THIS PAGE DOESN'T EXIST.
      </h1>
      <p className="text-xs sm:text-sm text-[#707070] max-w-md mb-8 leading-relaxed font-normal">
        You stepped outside the verified challenge perimeter. Return to the main hub to continue exploring.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#151515] hover:bg-[#1769E0] text-[#F4F2EC] text-xs font-medium uppercase font-mono tracking-wider transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO HOME</span>
      </Link>
    </div>
  );
};
