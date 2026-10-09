import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FastImage } from './FastImage';

interface RealMrBeastMoment {
  id: string;
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  realImageUrl: string;
  secondaryImageUrl?: string;
  statNumber: string;
  statLabel: string;
  quote: string;
  badge: string;
}

const REAL_MRBEAST_MOMENTS: RealMrBeastMoment[] = [
  {
    id: 'architect',
    index: '01',
    kicker: 'THE CREATOR',
    title: 'JIMMY DONALDSON',
    subtitle: 'Founder, Director & 100% Reinvestment Architect',
    description:
      'No safety nets. No venture capital. Jimmy Donaldson began in an empty bedroom in Greenville, North Carolina, obsessing over retention and storytelling until he built the single most-watched independent entertainment channel on Earth.',
    realImageUrl: '/assets/jimmy-donaldson.webp',
    secondaryImageUrl: 'https://img.youtube.com/vi/0e3GPea1Tyg/hqdefault.jpg',
    statNumber: '350M+',
    statLabel: 'Subscribers Worldwide Across All Channels',
    quote: '“I want to make the best videos on YouTube, and I reinvest literally every single penny to make that happen.”',
    badge: 'VERIFIED CREATOR PROFILE',
  },
  {
    id: 'million-dollar',
    index: '02',
    kicker: 'HIGH-STAKES GIVEAWAYS',
    title: 'THE $1,000,000 CASH HANDOFF',
    subtitle: 'Direct, Physical, Life-Changing Stakes',
    description:
      'Unlike game shows with delayed payouts, Jimmy hands contestants physical briefcases packed with hundreds of thousands of dollars in genuine cash. Real everyday teachers, students, and workers walking away forever debt-free.',
    realImageUrl: 'https://img.youtube.com/vi/0e3GPea1Tyg/hqdefault.jpg',
    secondaryImageUrl: 'https://img.youtube.com/vi/1WEAJ-DFkHE/hqdefault.jpg',
    statNumber: '$50,000,000+',
    statLabel: 'Total Cash & Goods Awarded to Real People',
    quote: '“Seeing someone fall to their knees crying because they can pay off their family mortgage is the reason we do this.”',
    badge: 'UNSCRIPTED HUMAN EMOTION',
  },
  {
    id: 'survival',
    index: '03',
    kicker: 'EXTREME SURVIVAL',
    title: '7 DAYS ABANDONED AT SEA & SOLITARY',
    subtitle: 'Physical Tests With Zero Shortcuts',
    description:
      'From 7 days stranded on an uninhabited volcanic island in the Pacific to 50 hours in complete sensory deprivation, Jimmy puts his own body through psychological and physical gauntlets with zero off-camera comforts.',
    realImageUrl: 'https://img.youtube.com/vi/er6m94z58_c/hqdefault.jpg',
    secondaryImageUrl: 'https://img.youtube.com/vi/vyqC9YvP_2c/hqdefault.jpg',
    statNumber: '200+',
    statLabel: 'Remote 4K Production Cameras Operating 24/7',
    quote: '“If we say it is 7 days without food or shelter, we mean 7 actual days. No hotel breaks. Real endurance.”',
    badge: 'DOCUMENTARY PHYSICAL REALITY',
  },
  {
    id: 'philanthropy',
    index: '04',
    kicker: 'GLOBAL IMPACT',
    title: 'BEAST PHILANTHROPY IN ACTION',
    subtitle: '100 Clean Water Wells & Humanitarian Relief',
    description:
      'Beyond entertainment, Jimmy leveraged his global platform to build 100 solar-powered water boreholes across Kenya, Cameroon, and Zimbabwe, cure 1,000 people of blindness, and distribute tens of millions of meals with 0% corporate overhead.',
    realImageUrl: 'https://img.youtube.com/vi/TJ2ifmkGGus/hqdefault.jpg',
    secondaryImageUrl: 'https://img.youtube.com/vi/urtFrx8wflA/hqdefault.jpg',
    statNumber: '500,000+',
    statLabel: 'People Given Permanent Access to Pure Drinking Water',
    quote: '“I don’t care about mansions or luxury cars. I want to build schools, feed people, and dig wells before I die.”',
    badge: '100% NON-PROFIT MISSION',
  },
];

export const RealMrBeastExperience: React.FC = () => {
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);

  const currentMoment = REAL_MRBEAST_MOMENTS[activeMomentIndex];

  return (
    <div className="relative w-full bg-[#F4EFE6] text-[#1C1814] border-b border-[#3D3024]/10 overflow-hidden py-20 sm:py-28">
      {/* Background Subtle Gradient Flares */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF3D91]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#087BFA]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Top Header with Real Verification Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3D3024]/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3D3024]/12 text-xs font-mono text-[#FF3D91] uppercase tracking-wider mb-3 shadow-sm font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3D91]" />
              <span>THE REAL MRBEAST // DOCUMENTARY ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1814] font-display">
              MEET JIMMY DONALDSON.
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] max-w-xl mt-2 font-normal leading-relaxed">
              Real high-definition photography and verified production chronicles of the creator rewriting entertainment history.
            </p>
          </div>

          {/* Interactive Chapter Buttons with Round Corners & Panther Pink Active State */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {REAL_MRBEAST_MOMENTS.map((moment, idx) => (
              <button
                key={moment.id}
                onClick={() => setActiveMomentIndex(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap font-medium ${
                  activeMomentIndex === idx
                    ? 'bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] text-white font-bold shadow-[0_4px_18px_rgba(255,61,145,0.4)] scale-105'
                    : 'bg-white hover:bg-[#FAF5ED] text-[#61554A] hover:text-[#1C1814] border border-[#3D3024]/12 shadow-sm'
                }`}
              >
                <span>{moment.index}</span>
                <span className="hidden sm:inline"> // {moment.kicker}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Real MrBeast Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Real Photography Spotlight */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#3D3024]/15 shadow-[0_20px_50px_rgba(50,35,20,0.12)]">
              {/* Primary Real Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#1C1814]">
                <FastImage
                  src={currentMoment.realImageUrl}
                  alt={currentMoment.title}
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1814] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Floating Real Proof Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1814]/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#FF3D91]">
                  <span className="w-2 h-2 rounded-full bg-[#FF3D91] animate-ping" />
                  <span className="font-semibold">{currentMoment.badge}</span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#1C1814]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                  FRAME {currentMoment.index} OF 04
                </div>

                {/* Bottom Photo Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-mono text-[#FF3D91] tracking-widest uppercase block font-bold">
                    {currentMoment.kicker}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                    {currentMoment.title}
                  </h3>
                  <p className="text-xs text-[#D6CBC0] font-mono">
                    {currentMoment.subtitle}
                  </p>
                </div>
              </div>

              {/* Secondary Real Production Proof Strip */}
              {currentMoment.secondaryImageUrl && (
                <div className="p-4 sm:p-5 bg-white border-t border-[#3D3024]/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FastImage
                      src={currentMoment.secondaryImageUrl}
                      alt="Production still"
                      containerClassName="w-16 h-10 rounded-lg border border-[#3D3024]/15 overflow-hidden shrink-0"
                      className="w-full h-full object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#8C7E72] uppercase block font-semibold">
                        PRODUCTION RECORD
                      </span>
                      <span className="text-xs font-medium text-[#1C1814] font-mono">
                        Real set documentation
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/challenges"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#FF3D91] hover:text-[#E60067] bg-[#FF3D91]/10 hover:bg-[#FF3D91]/15 transition-colors font-bold"
                  >
                    <span>VIEW ARCHIVE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Authentic Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] font-bold">
                <span>CHAPTER {currentMoment.index}</span>
                <span>/</span>
                <span>04</span>
                <span>·</span>
                <span className="text-[#61554A] font-normal">{currentMoment.kicker}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1C1814] font-display leading-tight">
                {currentMoment.subtitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                {currentMoment.description}
              </p>
            </div>

            {/* Authentic Quote Block */}
            <div className="p-6 rounded-2xl bg-white border border-[#3D3024]/12 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF3D91]/10 rounded-full blur-2xl" />
              <blockquote className="text-xs sm:text-sm text-[#1C1814] italic font-normal leading-relaxed relative z-10">
                {currentMoment.quote}
              </blockquote>
              <div className="flex items-center gap-2 pt-2 border-t border-[#3D3024]/10 text-[11px] font-mono text-[#61554A]">
                <span className="text-[#FF3D91] font-bold">JIMMY DONALDSON</span>
                <span>—</span>
                <span>ON-RECORD CREATOR STATEMENT</span>
              </div>
            </div>

            {/* Metric Callout Card with Pink Action Button */}
            <div className="p-5 rounded-2xl bg-white border border-[#3D3024]/12 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1C1814] font-mono tracking-tight">
                  {currentMoment.statNumber}
                </div>
                <div className="text-[11px] font-mono text-[#61554A] mt-0.5">
                  {currentMoment.statLabel}
                </div>
              </div>

              <Link
                to="/submit-challenge"
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_16px_rgba(255,61,145,0.4)] font-mono hover:scale-105 active:scale-95"
              >
                PITCH IDEA
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Metric Strip */}
        <div className="mt-16 pt-8 border-t border-[#3D3024]/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#8C7E72] uppercase block font-medium">AUTHENTIC FOOTAGE</span>
            <span className="text-base sm:text-lg font-bold text-[#1C1814] font-mono">100% Real Sets</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#8C7E72] uppercase block font-medium">HIGHEST PRIZE</span>
            <span className="text-base sm:text-lg font-bold text-[#FF3D91] font-mono">$456,000 Single Cash</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#8C7E72] uppercase block font-medium">GLOBAL CLEAN WATER</span>
            <span className="text-base sm:text-lg font-bold text-[#1C1814] font-mono">100 Wells in Africa</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#8C7E72] uppercase block font-medium">PHILANTHROPY OVERHEAD</span>
            <span className="text-base sm:text-lg font-bold text-[#087BFA] font-mono">0% Retained Profit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
