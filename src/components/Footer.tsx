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
    <footer className="relative bg-[#EDE4D8] text-[#1C1814] border-t border-[#3D3024]/12 pt-20 pb-12 overflow-hidden font-header">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Massive Editorial Headline */}
        <div className="border-b border-[#3D3024]/12 pb-14 mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF3D91] uppercase mb-4 font-bold">
            <span>THE CREATOR JOURNEY</span>
            <span>/</span>
            <span>NEXT CHAPTER</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#1C1814] leading-[0.95] font-display">
            SEE YOU IN THE <br />
            <span className="font-extrabold text-[#FF3D91]">NEXT CHALLENGE.</span>
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#3D3024]/12">
          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#1C1814] font-display">
              <img
                src="/assets/mrbeast-logo.svg"
                alt="MrBeast Logo"
                className="w-7 h-7 object-contain drop-shadow-[0_2px_6px_rgba(255,61,145,0.3)]"
              />
              <span>MRBEAST</span>
              <span className="text-[#FF3D91] font-mono text-sm">//</span>
              <span className="text-[#087BFA]">WORLD</span>
            </Link>
            <p className="text-xs sm:text-sm text-[#61554A] max-w-sm leading-relaxed font-normal">
              A bespoke editorial digital archive exploring the scale, challenges, viral mechanics, and global humanitarian projects of Jimmy Donaldson.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-[#0077B5] border border-[#0077B5] flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                aria-label="Arjun Premjit LinkedIn"
                title="Connect with Arjun Premjit on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-white" />
              </a>
              <a
                href="https://youtube.com/@MrBeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white border border-[#3D3024]/15 flex items-center justify-center text-[#1C1814] hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] transition-colors shadow-sm"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mrbeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white border border-[#3D3024]/15 flex items-center justify-center text-[#1C1814] hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] transition-colors shadow-sm"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/mrbeast"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white border border-[#3D3024]/15 flex items-center justify-center text-[#1C1814] hover:bg-[#FF3D91] hover:text-white hover:border-[#FF3D91] transition-colors shadow-sm"
                aria-label="X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#FF3D91] uppercase mb-4 font-bold">
              ARCHIVE INDEX
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#61554A]">
              <li>
                <Link to="/" className="hover:text-[#FF3D91] transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-[#FF3D91] transition-colors">
                  Challenge Archive
                </Link>
              </li>
              <li>
                <Link to="/submit-challenge" className="text-[#FF3D91] font-bold hover:underline transition-colors">
                  Pitch Challenge Idea
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-[#FF3D91] transition-colors">
                  Global Impact
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-[#FF3D91] transition-colors">
                  About Creator & Site
                </a>
              </li>
              <li>
                <Link to="/join" className="hover:text-[#FF3D91] transition-colors">
                  Join Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Creator & Works (Arjun Premjit) */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#FF3D91] uppercase font-bold">
              <Code2 className="w-3.5 h-3.5" />
              <span>ARJUN PREMJIT WORKS</span>
            </div>
            <div className="space-y-2.5">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#3D3024]/10 hover:border-[#0077B5] transition-colors text-xs text-[#1C1814] group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5] fill-[#0077B5]" />
                  <span className="font-semibold text-[#1C1814]">Arjun Premjit</span>
                </div>
                <span className="text-[10px] font-mono text-[#0077B5] flex items-center gap-0.5 font-bold">
                  LINKEDIN <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href={madrasMachaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#3D3024]/10 hover:border-[#FF3D91] transition-colors text-xs text-[#1C1814] group shadow-sm"
              >
                <div>
                  <span className="font-semibold text-[#1C1814] block">MadrasMacha</span>
                  <span className="text-[10px] text-[#8C7E72] font-mono">madras-macha-v2</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF3D91]" />
              </a>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#3D3024]/10 hover:border-[#FF3D91] transition-colors text-xs text-[#1C1814] group shadow-sm"
              >
                <div>
                  <span className="font-semibold text-[#1C1814] block">PORTFOLIO</span>
                  <span className="text-[10px] text-[#8C7E72] font-mono">portfolio-arjun-premjit</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF3D91]" />
              </a>
            </div>
          </div>

          {/* Col 4: Official Philanthropy Links */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#8C7E72] uppercase mb-4 font-semibold">
              MRBEAST MISSIONS
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#61554A]">
              <li>
                <a
                  href="https://www.beastphilanthropy.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-[#FF3D91] transition-colors"
                >
                  <span>Beast Philanthropy</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF3D91]" />
                </a>
              </li>
              <li>
                <a
                  href="https://teamtrees.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-[#FF3D91] transition-colors"
                >
                  <span>TeamTrees.org</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF3D91]" />
                </a>
              </li>
              <li>
                <a
                  href="https://teamseas.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-[#FF3D91] transition-colors"
                >
                  <span>TeamSeas.org</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF3D91]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Arjun Premjit Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#61554A] font-mono">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>Concept, Design & Code by</span>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF3D91] hover:underline font-bold inline-flex items-center gap-1"
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
              className="flex items-center gap-1 text-[#61554A] hover:text-[#FF3D91] transition-colors font-bold"
              aria-label="Scroll to top of page"
            >
              <span>TOP</span>
              <ChevronUp className="w-3.5 h-3.5 text-[#FF3D91]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
