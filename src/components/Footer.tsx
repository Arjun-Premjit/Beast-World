import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Youtube, Instagram, Twitter, ChevronUp, Linkedin, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkedInUrl =
    'https://www.linkedin.com/in/arjun-premjit-097a89386?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const madrasMachaUrl = 'https://madras-macha-v2.vercel.app/';
  const portfolioUrl = 'https://portfolio-arjun-premjit.vercel.app/';

  return (
    <footer className="relative bg-[#070A10] text-[#F5F7FB] border-t border-white/[0.10] pt-20 pb-12 overflow-hidden font-header">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Massive Editorial Headline */}
        <div className="border-b border-white/[0.1] pb-14 mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00BCEB] uppercase mb-4">
            <span>THE CREATOR JOURNEY</span>
            <span>/</span>
            <span>NEXT CHAPTER</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#F5F7FB] leading-[0.95] font-display">
            SEE YOU IN THE <br />
            <span className="font-semibold text-[#087BFA]">NEXT CHALLENGE.</span>
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/[0.1]">
          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#F5F7FB] font-display">
              <img
                src="/assets/mrbeast-logo.svg"
                alt="MrBeast Logo"
                className="w-6 h-6 object-contain"
              />
              <span>MRBEAST</span>
              <span className="text-[#087BFA] font-mono text-sm">/</span>
              <span className="text-[#00BCEB]">WORLD</span>
            </Link>
            <p className="text-xs sm:text-sm text-[#AAB4C2] max-w-sm leading-relaxed font-normal">
              A bespoke editorial digital archive exploring the scale, challenges, viral mechanics, and global humanitarian projects of Jimmy Donaldson.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-[#0077B5]/20 border border-[#0077B5]/40 flex items-center justify-center text-white hover:bg-[#0077B5] transition-all"
                aria-label="Arjun Premjit LinkedIn"
                title="Connect with Arjun Premjit on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-white" />
              </a>
              <a
                href="https://youtube.com/@MrBeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mrbeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/mrbeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#00BCEB] uppercase mb-4">
              ARCHIVE INDEX
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#AAB4C2]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-white transition-colors">
                  Challenge Archive
                </Link>
              </li>
              <li>
                <Link to="/submit-challenge" className="text-[#00BCEB] hover:text-white transition-colors">
                  Pitch Challenge Idea
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white transition-colors">
                  Global Impact
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-white hover:text-[#00BCEB] transition-colors">
                  About Creator & Site
                </a>
              </li>
              <li>
                <Link to="/join" className="hover:text-white transition-colors">
                  Join Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Creator & Works (Arjun Premjit) */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#087BFA] uppercase">
              <Code2 className="w-3.5 h-3.5" />
              <span>ARJUN PREMJIT WORKS</span>
            </div>
            <div className="space-y-2.5">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0077B5] transition-colors text-xs text-neutral-300 group"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5] fill-[#0077B5]" />
                  <span className="font-semibold text-white">Arjun Premjit</span>
                </div>
                <span className="text-[10px] font-mono text-[#0077B5] flex items-center gap-0.5">
                  LINKEDIN <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href={madrasMachaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00BCEB] transition-colors text-xs text-neutral-300 group"
              >
                <div>
                  <span className="font-semibold text-white block">MadrasMacha</span>
                  <span className="text-[10px] text-neutral-500 font-mono">madras-macha-v2</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00BCEB]" />
              </a>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FFD400] transition-colors text-xs text-neutral-300 group"
              >
                <div>
                  <span className="font-semibold text-white block">PORTFOLIO</span>
                  <span className="text-[10px] text-neutral-500 font-mono">portfolio-arjun-premjit</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD400]" />
              </a>
            </div>
          </div>

          {/* Col 4: Official Philanthropy Links */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
              MRBEAST MISSIONS
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-neutral-400">
              <li>
                <a
                  href="https://www.beastphilanthropy.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Beast Philanthropy</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://teamtrees.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>TeamTrees.org</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://teamseas.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>TeamSeas.org</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Arjun Premjit Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>Concept, Design & Code by</span>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00BCEB] hover:underline font-bold inline-flex items-center gap-1"
            >
              <Linkedin className="w-3 h-3 fill-current" />
              <span>Arjun Premjit</span>
            </a>
            <span>· Fan-made creative experience design study</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} BEAST // WORLD</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              aria-label="Scroll to top of page"
            >
              <span>TOP</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
