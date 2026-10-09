import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ChevronRight, ChevronLeft, Film, Sparkles, Layers, Play, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHALLENGES_DATA, type Challenge } from '../data/challenges';
import { POPULAR_VIDEOS, type PopularVideo } from '../data/popularVideos';
import { RealMrBeastExperience } from '../components/RealMrBeastExperience';
import { AboutCreatorSection } from '../components/AboutCreatorSection';
import { FastImage } from '../components/FastImage';
import { ChallengeModal } from '../components/ChallengeModal';
import { VideoModal } from '../components/VideoModal';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PopularVideo | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Video horizontal slider ref
  const videoScrollRef = useRef<HTMLDivElement>(null);

  // Hero refs for GSAP ScrollTrigger animation
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const heroImageElementRef = useRef<HTMLImageElement>(null);
  const objectTransitionBeaconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Gentle hero entrance
      if (heroHeadlineRef.current) {
        gsap.fromTo(
          heroHeadlineRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }

      if (heroPanelRef.current) {
        gsap.fromTo(
          heroPanelRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out', delay: 0.25 }
        );
      }

      // Isolated signature Jimmy-led ScrollTrigger scrub animation
      if (heroSectionRef.current && heroHeadlineRef.current && heroImageElementRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom 25%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // 1. Hero headline transitions out with restrained masked reveal / subtle upward fade
        scrollTl.to(
          heroHeadlineRef.current,
          {
            y: -36,
            opacity: 0.25,
            ease: 'power1.out',
          },
          0
        );

        // 2. Jimmy's photograph moves slightly upward and toward center, scales up subtly
        scrollTl.to(
          heroImageElementRef.current,
          {
            scale: 1.06,
            y: -24,
            ease: 'power1.out',
          },
          0
        );

        // 3. Panel border & shadow adapt subtly
        if (heroPanelRef.current) {
          scrollTl.to(
            heroPanelRef.current,
            {
              borderColor: 'rgba(255, 61, 145, 0.45)',
              boxShadow: '0 30px 70px rgba(50, 35, 20, 0.25)',
              ease: 'power1.out',
            },
            0
          );
        }

        // 4. Object-led transition element: guides the eye towards the documentary archive & challenges
        if (objectTransitionBeaconRef.current) {
          scrollTl.fromTo(
            objectTransitionBeaconRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, ease: 'power2.out' },
            0.25
          );
        }
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Update horizontal video scroll state
  const handleVideoScroll = () => {
    if (videoScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = videoScrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      videoScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const marqueeChallenge = CHALLENGES_DATA[0]; // $456,000 Squid Game
  const secondaryChallenge1 = CHALLENGES_DATA[2]; // Arctic Survival
  const secondaryChallenge2 = CHALLENGES_DATA[3]; // Abandoned Island

  const behindTheMomentStages = [
    {
      index: '01',
      title: 'THE IDEA',
      subtitle: 'The 14-Hour Retention Lab',
      desc: 'Before a single set piece is ordered, Jimmy and the creative team spend weeks stress-testing concepts. If an idea cannot be understood in 5 words with life-changing stakes, it gets thrown away. Every concept is engineered to hook viewers instantly and keep them glued until the final second.',
      stat: '100+',
      statLabel: 'Rough concepts pitched before one gets greenlit',
    },
    {
      index: '02',
      title: 'THE BUILD',
      subtitle: '40,000 Sq Ft Physical Soundstages',
      desc: 'No green screens. No Hollywood CGI cheats. Real custom-welded steel sets, pneumatic safety drop zones, 200+ synchronized remote 4K cameras, and tracking vests for hundreds of contestants. Real physical builds where any failure halts production.',
      stat: '$3.5M',
      statLabel: 'Average soundstage engineering budget per marquee video',
    },
    {
      index: '03',
      title: 'THE PAYOFF',
      subtitle: '100% Unscripted Human Emotion',
      desc: 'The defining element of a MrBeast challenge is authenticity. Contestants aren’t actors—they are everyday teachers, students, and subscribers fighting for life-changing cash. When someone wins half a million dollars, the tears, hugs, and shock are real.',
      stat: '$456,000',
      statLabel: 'Largest single cash prize handed directly on camera in a single challenge',
    },
  ];

  return (
    <div className="relative w-full bg-[#F4EFE6] text-[#1C1814]">
      {/* Modals */}
      <ChallengeModal
        challenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* 1. HOMEPAGE HERO — ASYMMETRIC EDITORIAL WITH REAL JIMMY DONALDSON PHOTOGRAPH */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 pb-12 px-6 sm:px-12 border-b border-[#3D3024]/10 overflow-hidden bg-[#F4EFE6]"
      >
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF3D91]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#087BFA]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Minimal Status Indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-[#61554A] uppercase relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D91] animate-pulse" />
            <span className="font-semibold text-[#1C1814]">THE BEAST EXPERIENCE // 001</span>
          </div>
          <div className="flex items-center gap-2 text-[#FF3D91] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3D91]" />
            <span className="hidden sm:inline">AUTHENTIC CREATOR ARCHIVE</span>
          </div>
        </div>

        {/* Hero Asymmetric Centerpiece Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8 relative z-10">
          {/* Left Column: Editorial Display Typography */}
          <div ref={heroHeadlineRef} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3D3024]/12 text-xs font-mono text-[#FF3D91] tracking-widest uppercase font-semibold shadow-sm">
              <span>OFFICIAL FAN EXPERIENCE</span>
              <span className="text-[#3D3024]/30">·</span>
              <span className="text-[#1C1814]">JIMMY DONALDSON</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[6.2rem] xl:text-[7.2rem] font-light tracking-tight text-[#1C1814] leading-[0.92] font-display">
              BIG IDEAS. <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1C1814] via-[#FF3D91] to-[#E60067]">
                BIGGER MOMENTS.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#61554A] max-w-xl font-normal leading-relaxed">
              A closer look at the extreme challenges, unprecedented spectacle, and human stories behind real creator Jimmy Donaldson. Where viral engineering meets genuine giving.
            </p>

            {/* Action Group with Panther Pink Primary Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#challenge-archive"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_20px_rgba(255,61,145,0.4)] hover:shadow-[0_6px_25px_rgba(255,61,145,0.55)] font-mono hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE CHALLENGES</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <Link
                to="/submit-challenge"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#FF3D91] bg-white hover:bg-[#FF3D91] hover:text-white border border-[#FF3D91]/40 hover:border-[#FF3D91] transition-all font-mono shadow-[0_2px_12px_rgba(255,61,145,0.18)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>PITCH A CHALLENGE IDEA</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Supplied Real Jimmy Donaldson Photograph Composition */}
          <div className="lg:col-span-5 relative">
            <div
              ref={heroPanelRef}
              className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl bg-[#1C1814] border border-[#3D3024]/20 overflow-hidden shadow-[0_25px_60px_rgba(50,35,20,0.2)] group"
            >
              {/* Jimmy Donaldson Photograph in Dark Hoodie */}
              <picture className="w-full h-full block">
                <source srcSet="/assets/jimmy-donaldson.webp" type="image/webp" />
                <source srcSet="/assets/jimmy-donaldson.jpg" type="image/jpeg" />
                <img
                  ref={heroImageElementRef}
                  src="/assets/jimmy-donaldson.webp"
                  alt="Jimmy Donaldson wearing dark hoodie"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 will-change-transform"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('jimmy-donaldson.jpg')) {
                      img.src = '/assets/jimmy-donaldson.jpg';
                    }
                  }}
                />
              </picture>

              {/* Natural dark vignette blend into panel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1814] via-transparent to-[#1C1814]/30 opacity-80 pointer-events-none" />

              {/* Verified Real Creator Floating Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1814]/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#FF3D91]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span className="font-semibold">JIMMY DONALDSON // REAL CREATOR</span>
              </div>

              {/* Minimalist Floating Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono text-[#FF3D91] uppercase tracking-widest block font-bold">
                  FOUNDER & EXECUTIVE PRODUCER
                </span>
                <h3 className="text-xl font-bold font-display leading-snug text-[#F5F7FB]">
                  MrBeast Digital Universe
                </h3>
                <p className="text-xs text-[#D6CBC0] font-mono">
                  350M+ Subscribers · $50M+ Given Away
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar with Vertical Scroll Callout & Transition Lead */}
        <div
          ref={objectTransitionBeaconRef}
          className="flex items-center justify-between text-xs font-mono text-[#61554A] pt-4 border-t border-[#3D3024]/10 relative z-10"
        >
          <div className="flex items-center gap-2 text-[#1C1814] font-medium">
            <ArrowDown className="w-3.5 h-3.5 text-[#FF3D91] animate-bounce" />
            <span>CONTINUE SCROLLING TO EXPLORE ARCHIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>SCALE: UNPRECEDENTED</span>
            <span className="text-[#3D3024]/30">·</span>
            <span>REINVESTMENT: 100%</span>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE FEATURE — REAL MRBEAST DOCUMENTARY EXPERIENCE */}
      <section className="relative">
        <RealMrBeastExperience />
      </section>

      {/* 3. SECTION 01 — THE CHALLENGE ARCHIVE (EDITORIAL ASYMMETRIC GRID) */}
      <section id="challenge-archive" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#3D3024]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#3D3024]/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase block mb-2 font-bold">
              CURATED PRODUCTION STORIES
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-[#1C1814] uppercase font-display">
              THE CHALLENGE NEVER STOPS.
            </h2>
          </div>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all self-start md:self-end font-mono shadow-[0_4px_16px_rgba(255,61,145,0.35)] hover:scale-105 active:scale-95"
          >
            <span>VIEW COMPLETE ARCHIVE (08)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

        {/* Asymmetric 3-Story Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Dominant Feature (Col-Span 7) */}
          <div
            onClick={() => setSelectedChallenge(marqueeChallenge)}
            className="lg:col-span-7 group cursor-pointer rounded-3xl bg-white border border-[#3D3024]/10 hover:border-[#FF3D91] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(50,35,20,0.05)] hover:shadow-[0_15px_40px_rgba(50,35,20,0.1)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1C1814]">
              <FastImage
                src={marqueeChallenge.thumbnailUrl}
                alt={marqueeChallenge.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono border border-white/10 z-10">
                {marqueeChallenge.index}
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#61554A]">
                <span className="text-[#FF3D91] font-bold">{marqueeChallenge.category}</span>
                <span>·</span>
                <span>{marqueeChallenge.prizeOrScale}</span>
                <span>·</span>
                <span>{marqueeChallenge.duration}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display">
                {marqueeChallenge.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                {marqueeChallenge.shortDescription}
              </p>

              <div className="pt-4 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono text-[#1C1814]">
                <span className="text-[#61554A]">{marqueeChallenge.participants}</span>
                <span className="font-bold text-[#FF3D91] group-hover:text-[#E60067] flex items-center gap-1 transition-colors">
                  EXPLORE SPECIFICATION <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Column (Col-Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div
              onClick={() => setSelectedChallenge(secondaryChallenge1)}
              className="group cursor-pointer rounded-3xl bg-white border border-[#3D3024]/10 hover:border-[#FF3D91] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between flex-1 shadow-[0_10px_30px_rgba(50,35,20,0.05)] hover:shadow-[0_15px_40px_rgba(50,35,20,0.1)]"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-mono text-[#FF3D91] font-bold">
                    {secondaryChallenge1.category} / {secondaryChallenge1.index}
                  </span>
                  <span className="text-xs font-mono text-[#61554A]">
                    {secondaryChallenge1.energyLevel}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-light text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display mb-2">
                  {secondaryChallenge1.title}
                </h3>

                <p className="text-xs text-[#61554A] leading-relaxed line-clamp-3 mb-4">
                  {secondaryChallenge1.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#61554A]">{secondaryChallenge1.prizeOrScale}</span>
                <span className="font-bold text-[#FF3D91] group-hover:text-[#E60067] flex items-center gap-1 transition-colors">
                  VIEW <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setSelectedChallenge(secondaryChallenge2)}
              className="group cursor-pointer rounded-3xl bg-white border border-[#3D3024]/10 hover:border-[#FF3D91] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between flex-1 shadow-[0_10px_30px_rgba(50,35,20,0.05)] hover:shadow-[0_15px_40px_rgba(50,35,20,0.1)]"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-mono text-[#FF3D91] font-bold">
                    {secondaryChallenge2.category} / {secondaryChallenge2.index}
                  </span>
                  <span className="text-xs font-mono text-[#61554A]">
                    {secondaryChallenge2.energyLevel}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-light text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display mb-2">
                  {secondaryChallenge2.title}
                </h3>

                <p className="text-xs text-[#61554A] leading-relaxed line-clamp-3 mb-4">
                  {secondaryChallenge2.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#61554A]">{secondaryChallenge2.prizeOrScale}</span>
                <span className="font-bold text-[#FF3D91] group-hover:text-[#E60067] flex items-center gap-1 transition-colors">
                  VIEW <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 02 — BEHIND THE MOMENT (STORYTELLING WITH TECHNICAL HUD) */}
      <section className="py-24 sm:py-32 border-b border-[#3D3024]/10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase block mb-2 font-bold">
              02 / PRODUCTION METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1C1814] uppercase font-display">
              BEHIND THE MOMENT.
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] mt-3 leading-relaxed font-normal">
              How Jimmy Donaldson and team transform whiteboard ideas into multi-million-dollar physical realities. A three-stage pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Stages Tab Selector */}
            <div className="lg:col-span-6 space-y-5">
              {behindTheMomentStages.map((stage, idx) => (
                <div
                  key={stage.index}
                  onClick={() => setActiveStage(idx)}
                  className={`p-6 sm:p-8 cursor-pointer rounded-2xl border transition-all duration-300 ${
                    activeStage === idx
                      ? 'bg-white border-[#FF3D91] shadow-[0_8px_30px_rgba(255,61,145,0.2)]'
                      : 'bg-white/70 border-[#3D3024]/10 hover:border-[#3D3024]/20 opacity-80 hover:opacity-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="font-bold text-[#FF3D91]">{stage.index} // {stage.title}</span>
                    <span className="text-[#61554A]">{stage.subtitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                    {stage.desc}
                  </p>

                  <div className="pt-4 mt-4 border-t border-[#3D3024]/10 flex items-baseline gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-[#FF3D91] font-mono-numbers">
                      {stage.stat}
                    </span>
                    <span className="text-xs text-[#61554A] font-mono">
                      — {stage.statLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Technical Camera HUD Window */}
            <div className="lg:col-span-6 sticky top-28">
              <div className="bg-[#1C1814] text-white p-8 rounded-3xl border border-[#3D3024]/25 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between text-xs font-mono text-[#FF3D91] pb-4 border-b border-white/10 font-bold">
                  <span>PRODUCTION STAGE CAMERA FEED</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    REC ● 4K 120FPS
                  </span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#D6CBC0]">
                    STAGE FOCUS: {behindTheMomentStages[activeStage].title}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#F5F7FB] font-display">
                    {behindTheMomentStages[activeStage].subtitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D6CBC0] leading-relaxed font-normal">
                    "Every second of footage is scrubbed against real viewer retention analytics. If a 10-second segment doesn’t advance the stakes or heighten emotion, it gets cut from the final master edit."
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D6CBC0]">
                  <span>SPEC // SOUNDSTAGE_NC</span>
                  <Link
                    to="/submit-challenge"
                    className="text-[#FF3D91] hover:text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>PITCH YOUR IDEA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 03 — DEDICATED HORIZONTAL SCROLL ONLY FOR MRBEAST VIDEOS */}
      <section className="py-24 sm:py-32 bg-[#F4EFE6] text-[#1C1814] border-b border-[#3D3024]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] uppercase tracking-widest mb-2 font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>HORIZONTAL VIDEO SLIDER / RECORD BREAKERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1C1814] uppercase font-display">
              MOST WATCHED MRBEAST VIDEOS.
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] mt-2 font-normal">
              Scroll horizontally through Jimmy's historic releases. Click any card to launch the video player.
            </p>
          </div>

          {/* Dedicated Horizontal Scroll Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollVideos('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white border border-[#3D3024]/15 flex items-center justify-center text-[#1C1814] hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Scroll videos left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollVideos('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white border border-[#3D3024]/15 flex items-center justify-center text-[#1C1814] hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Scroll videos right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={videoScrollRef}
          onScroll={handleVideoScroll}
          className="flex items-stretch gap-6 overflow-x-auto px-6 sm:px-12 pb-6 scroll-smooth select-none cursor-grab active:cursor-grabbing no-scrollbar"
        >
          {POPULAR_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer w-[300px] sm:w-[380px] shrink-0 bg-white rounded-2xl border border-[#3D3024]/10 hover:border-[#FF3D91] transition-all p-5 flex flex-col justify-between shadow-[0_8px_25px_rgba(50,35,20,0.06)] hover:shadow-[0_12px_32px_rgba(50,35,20,0.12)]"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black mb-4">
                  <FastImage
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors z-10">
                    <div className="w-10 h-10 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white group-hover:bg-[#FF3D91] group-hover:border-[#FF3D91] transition-colors">
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/85 px-2 py-0.5 rounded text-[10px] font-mono text-[#FF3D91] font-bold z-10">
                    {video.views}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#7A6C5F] uppercase tracking-widest block mb-1 font-semibold">
                  {video.highlightTag}
                </span>
                <h4 className="text-base font-semibold text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display line-clamp-2">
                  {video.title}
                </h4>
              </div>

              <div className="pt-4 mt-4 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono text-[#61554A]">
                <span>{video.publishedYear}</span>
                <span className="text-[#FF3D91] group-hover:text-[#E60067] font-bold flex items-center gap-1">
                  WATCH CLIP <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SECTION 04 — CREATOR & PHILOSOPHY */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-5xl mx-auto text-center space-y-8">
        <span className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase block font-bold">
          04 / PHILOSOPHY & GIVING
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#1C1814] tracking-tight leading-snug font-display text-balance">
          “THE SCALE IS MASSIVE. <br />
          <span className="font-extrabold text-[#FF3D91]">THE INTENTION IS SIMPLE.”</span>
        </h2>

        <p className="text-sm sm:text-base text-[#61554A] max-w-2xl mx-auto leading-relaxed font-normal">
          Jimmy Donaldson believes global attention is an asset that should be converted into permanent positive change. From 100+ deep solar water wells in rural Africa to 20,000,000 trees planted worldwide, entertainment fuels real human relief.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/impact"
            className="px-7 py-3.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_20px_rgba(255,61,145,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            DISCOVER THE HUMANITARIAN IMPACT
          </Link>
          <Link
            to="/join"
            className="px-7 py-3.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-[#FF3D91] bg-white hover:bg-[#FF3D91] hover:text-white border border-[#FF3D91]/40 hover:border-[#FF3D91] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            JOIN COMMUNITY ROSTER
          </Link>
        </div>
      </section>

      {/* 7. ABOUT THE CREATOR & PROJECT BY ARJUN PREMJIT */}
      <AboutCreatorSection />

      {/* 8. SECTION 05 — FINAL CTA COMPOSITION */}
      <section className="py-20 px-6 sm:px-12 border-t border-[#3D3024]/10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#3D3024]/15 p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-mono text-[#FF3D91] uppercase tracking-widest font-bold">
              NEXT PRODUCTION WINDOW
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-[#1C1814] font-display">
              YOUR NEXT CHALLENGE <br />
              <span className="font-extrabold text-[#FF3D91]">STARTS HERE.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#61554A] max-w-md font-normal">
              Submit your challenge rules, join the community dispatch roster, or pitch directly to Jimmy's production team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/submit-challenge"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all text-center font-mono shadow-[0_4px_20px_rgba(255,61,145,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              PITCH AN IDEA
            </Link>
            <Link
              to="/join"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#FF3D91] bg-white hover:bg-[#FF3D91] hover:text-white border border-[#FF3D91]/40 hover:border-[#FF3D91] transition-all text-center font-mono shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              JOIN ROSTER
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
