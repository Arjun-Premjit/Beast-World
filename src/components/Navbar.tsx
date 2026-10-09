import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (sy / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'CHALLENGES', path: '/challenges' },
    { label: 'PITCH AN IDEA', path: '/submit-challenge' },
    { label: 'IMPACT', path: '/impact' },
    { label: 'ABOUT', path: '/#about' },
    { label: 'JOIN', path: '/join' },
  ];

  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-header ${
          isScrolled ? 'py-3 sm:py-3.5' : 'py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Refined Dark Translucent Navy Glassmorphic Pill */}
          <div
            className={`relative flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-[#101826]/85 backdrop-blur-[20px] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.55)]'
                : 'bg-[#101826]/70 backdrop-blur-[18px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            }`}
          >
            {/* Ambient Refraction Glow inside pill */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#087BFA]/10 via-transparent to-[#00BCEB]/10 pointer-events-none opacity-60" />

            {/* Dynamic Glass Highlight Ray across top rim */}
            <div
              className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#00BCEB]/40 to-transparent pointer-events-none"
              style={{
                transform: `translateX(${(scrollProgress - 50) * 0.3}%)`,
              }}
            />

            {/* Wordmark with Real MrBeast Panther Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none relative z-10"
              aria-label="MrBeast World Fan Archive Homepage"
            >
              {/* Supplied MrBeast Panther Logo in original colors */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
                <img
                  src="/assets/mrbeast-logo.svg"
                  alt="MrBeast Panther"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(8,123,250,0.5)] transition-transform duration-300 group-hover:scale-105"
                  width={36}
                  height={36}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[#F5F7FB] group-hover:text-white transition-colors">
                    MRBEAST
                  </span>
                  <span className="text-[#087BFA] font-mono text-xs font-light">/</span>
                  <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#00BCEB]">
                    WORLD
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-wider text-[#AAB4C2] uppercase mt-0.5 hidden xs:inline-block">
                  FAN ARCHIVE
                </span>
              </div>
            </Link>

            {/* Clean Navigation Links with Refined Space Grotesk Font */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[12px] font-semibold tracking-wider text-[#AAB4C2] relative z-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 transition-all duration-200 hover:text-[#F5F7FB] ${
                      isActive ? 'text-[#F5F7FB] font-bold' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#087BFA] to-[#00BCEB] rounded-full shadow-[0_0_8px_#00BCEB]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Pill Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 relative z-10">
              <Link
                to="/join"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(8,123,250,0.35)] font-mono"
              >
                <span>JOIN ROSTER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Button with Rounded Pill Style */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] border border-white/20 text-[#F5F7FB] hover:bg-white/[0.15] transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {/* Subtle Scroll Progress Indicator on Bottom Edge of Pill */}
            <div
              className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#087BFA] via-[#00BCEB] to-[#087BFA] rounded-full opacity-60 transition-all duration-75 overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - scrollProgress}% 0 0 round 9999px)`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Transparent Glassmorphism Mobile Menu Overlay with Rounded Corners */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070A10]/80 backdrop-blur-3xl md:hidden flex flex-col justify-between p-6 pt-24 font-header animate-in fade-in duration-200">
          <div className="bg-[#101826]/90 backdrop-blur-2xl p-6 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/mrbeast-logo.svg"
                  alt="MrBeast Logo"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-[11px] font-mono tracking-widest text-[#00BCEB] uppercase font-semibold">
                  INDEX / NAVIGATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#AAB4C2]">
                {Math.floor(scrollProgress)}% SCROLL
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-medium tracking-wide transition-all flex items-center justify-between py-2.5 px-3 rounded-xl ${
                      isActive
                        ? 'bg-white/10 text-white font-bold border border-white/20'
                        : 'text-[#AAB4C2] hover:text-[#F5F7FB] hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-neutral-500">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                to="/join"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 transition-opacity font-mono"
              >
                <span>JOIN THE BEAST COMMUNITY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-center text-[10px] text-[#AAB4C2] font-mono">
                INDEPENDENT MRBEAST FAN ARCHIVE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
