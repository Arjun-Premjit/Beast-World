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
          {/* Refined Glassmorphic Pill on Very Light Brown Background */}
          <div
            className={`relative flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-[#FAF5ED]/92 backdrop-blur-[20px] border border-[#3D3024]/12 shadow-[0_12px_40px_rgba(50,35,20,0.08)]'
                : 'bg-[#FAF5ED]/80 backdrop-blur-[18px] border border-[#3D3024]/10 shadow-[0_8px_30px_rgba(50,35,20,0.05)]'
            }`}
          >
            {/* Subtle Refraction Glow inside pill */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3D91]/10 via-transparent to-[#087BFA]/10 pointer-events-none opacity-50" />

            {/* Dynamic Glass Highlight Ray across top rim */}
            <div
              className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF3D91]/40 to-transparent pointer-events-none"
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
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
                <img
                  src="/assets/mrbeast-logo.svg"
                  alt="MrBeast Panther"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,61,145,0.35)] transition-transform duration-300 group-hover:scale-105"
                  width={36}
                  height={36}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[#1C1814] group-hover:text-black transition-colors">
                    MRBEAST
                  </span>
                  <span className="text-[#FF3D91] font-mono text-xs font-bold">//</span>
                  <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#087BFA]">
                    WORLD
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-wider text-[#7A6C5F] uppercase mt-0.5 hidden xs:inline-block font-medium">
                  FAN ARCHIVE
                </span>
              </div>
            </Link>

            {/* Navigation Links with Space Grotesk Font */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[12px] font-semibold tracking-wider text-[#5C5044] relative z-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 transition-all duration-200 hover:text-[#1C1814] ${
                      isActive ? 'text-[#1C1814] font-bold' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF3D91] to-[#E60067] rounded-full shadow-[0_0_8px_rgba(255,61,145,0.5)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Pill Button in Panther Pink as in Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 relative z-10">
              <Link
                to="/join"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:shadow-[0_6px_22px_rgba(255,61,145,0.55)] font-mono hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>JOIN ROSTER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.05] border border-black/10 text-[#1C1814] hover:bg-black/[0.1] transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {/* Subtle Scroll Progress Indicator with Pink Accent */}
            <div
              className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#FF3D91] via-[#087BFA] to-[#FF3D91] rounded-full opacity-70 transition-all duration-75 overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - scrollProgress}% 0 0 round 9999px)`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Transparent Glassmorphism Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1C1814]/40 backdrop-blur-3xl md:hidden flex flex-col justify-between p-6 pt-24 font-header animate-in fade-in duration-200">
          <div className="bg-[#FAF5ED]/95 backdrop-blur-2xl p-6 rounded-3xl border border-[#3D3024]/15 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3D3024]/10 pb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/mrbeast-logo.svg"
                  alt="MrBeast Logo"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-[11px] font-mono tracking-widest text-[#FF3D91] uppercase font-bold">
                  INDEX / NAVIGATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#7A6C5F]">
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
                        ? 'bg-[#FF3D91]/15 text-[#FF3D91] font-bold border border-[#FF3D91]/30'
                        : 'text-[#4A3F35] hover:text-[#1C1814] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-[#9E8E80]">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#3D3024]/10 space-y-3">
              <Link
                to="/join"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:opacity-95 shadow-[0_4px_16px_rgba(255,61,145,0.4)] transition-opacity font-mono"
              >
                <span>JOIN THE BEAST COMMUNITY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-center text-[10px] text-[#7A6C5F] font-mono">
                INDEPENDENT MRBEAST FAN ARCHIVE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
