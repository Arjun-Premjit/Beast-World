import React from 'react';
import { Linkedin, ExternalLink, Code2, ArrowUpRight, User } from 'lucide-react';

export const AboutCreatorSection: React.FC = () => {
  const linkedInUrl =
    'https://www.linkedin.com/in/arjun-premjit-097a89386?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const madrasMachaUrl = 'https://madras-macha-v2.vercel.app/';
  const portfolioUrl = 'https://portfolio-arjun-premjit.vercel.app/';

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-12 border-b border-[#3D3024]/10 bg-[#F4EFE6] text-[#1C1814] overflow-hidden"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF3D91]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#087BFA]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3D3024]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#3D3024]/12 text-xs font-mono text-[#FF3D91] uppercase tracking-wider mb-3 shadow-sm font-semibold">
              <Code2 className="w-3.5 h-3.5 text-[#FF3D91]" />
              <span>BEHIND THE CODE // ARCHITECTURE & CREATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1814] uppercase font-display">
              ABOUT THIS PLATFORM.
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] max-w-2xl mt-3 leading-relaxed font-normal">
              The mission, engineering vision, and human craft behind BEAST // WORLD.
            </p>
          </div>

          {/* Direct LinkedIn Connect Button */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_18px_rgba(255,61,145,0.4)] font-mono hover:scale-105 active:scale-95"
            >
              <Linkedin className="w-4 h-4 fill-white" />
              <span>CONNECT WITH ARJUN PREMJIT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2-Column Core Story: What & Why It Was Built */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: What the Website is About */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#3D3024]/12 p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-[0_10px_35px_rgba(50,35,20,0.06)]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] uppercase tracking-wider font-bold">
                <span>PROJECT PROFILE</span>
                <span>/</span>
                <span>WHAT IS BEAST // WORLD?</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-[#1C1814] font-display">
                An Immersive Digital Hub for the World's Biggest Creator
              </h3>

              <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                <strong>BEAST // WORLD</strong> is a bespoke editorial experience built for Jimmy Donaldson (MrBeast). Rather than a generic portfolio or static biography, this website is architected as an interactive community gateway that explores the mechanics of viral challenge production, high-stakes retention engineering, and verified humanitarian impact.
              </p>

              <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                Visitors can explore curated video archives, pitch challenge ideas directly into a persistent database (<code className="text-[#FF3D91] font-mono font-bold bg-[#FF3D91]/10 px-1.5 py-0.5 rounded">challenge_submissions</code>), discover behind-the-scenes set engineering benchmarks, and enroll in the verified global fan roster.
              </p>
            </div>

            {/* Architecture Highlights Pill Row */}
            <div className="pt-6 border-t border-[#3D3024]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
                <span className="text-[10px] text-[#8C7E72] uppercase block font-semibold">FRAMEWORK</span>
                <span className="font-bold text-[#1C1814]">React 19 & Vite</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
                <span className="text-[10px] text-[#8C7E72] uppercase block font-semibold">ANIMATIONS</span>
                <span className="font-bold text-[#FF3D91]">GSAP Motion Suite</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#8C7E72] uppercase block font-semibold">BACKEND</span>
                <span className="font-bold text-[#087BFA]">Express & SQL Intake</span>
              </div>
            </div>
          </div>

          {/* Right Column: Why Created & The Engineer Behind It */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-[#3D3024]/12 p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-[0_10px_35px_rgba(50,35,20,0.06)] relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] uppercase tracking-wider font-bold">
                <User className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span>DESIGNER & ENGINEER</span>
              </div>

              <div>
                <span className="text-xs font-mono text-[#8C7E72] uppercase tracking-widest block mb-1">
                  CONCEPT & IMPLEMENTATION BY
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1C1814] font-display tracking-tight">
                  Arjun Premjit
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                I built this website for a high-stakes design and development evaluation to demonstrate what a modern, world-class creator platform should feel like: fast, visually captivating, deeply functional, and completely free of generic AI design slop.
              </p>

              <blockquote className="p-4 rounded-2xl bg-[#FAF5ED] border-l-4 border-[#FF3D91] text-xs text-[#61554A] italic font-normal leading-relaxed">
                “Creator platforms shouldn't look like generic link trees. They should reflect the cinematic scale, intensity, and passion of the creators themselves.”
                <span className="block not-italic text-[10px] font-mono text-[#8C7E72] mt-1 font-semibold">
                  — Arjun Premjit
                </span>
              </blockquote>
            </div>

            {/* LinkedIn Action Card in Panther Pink Accent */}
            <div className="pt-4 border-t border-[#3D3024]/10">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5ED] hover:bg-[#F4EFE6] border border-[#3D3024]/12 transition-all text-xs group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white">
                    <Linkedin className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1C1814] block">Arjun Premjit on LinkedIn</span>
                    <span className="text-[10px] font-mono text-[#8C7E72]">View profile & experience</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#FF3D91] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Featured Projects Showcase by Arjun Premjit */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#FF3D91] uppercase tracking-widest block mb-1 font-bold">
                FEATURED WORKS BY ARJUN PREMJIT
              </span>
              <h3 className="text-2xl sm:text-4xl font-light text-[#1C1814] font-display uppercase tracking-tight">
                OTHER PROJECTS BUILT BY ARJUN.
              </h3>
            </div>
            <p className="text-xs text-[#8C7E72] font-mono">
              2 PRODUCTION CREATIVE APPLICATIONS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 01: MadrasMacha */}
            <div className="rounded-3xl bg-white border border-[#3D3024]/12 p-8 flex flex-col justify-between space-y-6 shadow-[0_10px_35px_rgba(50,35,20,0.06)] hover:border-[#FF3D91] transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF3D91] font-bold">
                    PROJECT 01 // CULTURAL EDITORIAL
                  </span>
                  <span className="text-[10px] font-mono text-[#61554A] bg-[#FAF5ED] px-2.5 py-0.5 rounded-full border border-[#3D3024]/10">
                    LIVE ON VERCEL
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold text-[#1C1814] font-display group-hover:text-[#FF3D91] transition-colors">
                  MadrasMacha
                </h4>

                <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                  A high-aesthetic editorial web platform celebrating culture, typography, and distinctive visual storytelling. Features clean whitespace, rich storytelling grids, and bespoke micro-interactions.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[#61554A]">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Next.js / React</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Editorial Typography</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Smooth Motion</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#3D3024]/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C7E72]">
                  madras-macha-v2.vercel.app
                </span>
                <a
                  href={madrasMachaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all font-mono shadow-[0_4px_16px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
                >
                  <span>LAUNCH MADRASMACHA</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Project 02: PORTFOLIO */}
            <div className="rounded-3xl bg-white border border-[#3D3024]/12 p-8 flex flex-col justify-between space-y-6 shadow-[0_10px_35px_rgba(50,35,20,0.06)] hover:border-[#FF3D91] transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF3D91] font-bold">
                    PROJECT 02 // CREATIVE DEVELOPER
                  </span>
                  <span className="text-[10px] font-mono text-[#61554A] bg-[#FAF5ED] px-2.5 py-0.5 rounded-full border border-[#3D3024]/10">
                    LIVE ON VERCEL
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold text-[#1C1814] font-display group-hover:text-[#FF3D91] transition-colors">
                  PORTFOLIO — ARJUN PREMJIT
                </h4>

                <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
                  Arjun Premjit's interactive flagship creative developer portfolio. Featuring interactive Rubik's cube scroll dynamics, 3D spatial transformations, creative physics, and an archive of production-ready digital products.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[#61554A]">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Three.js / Canvas</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Rubik's Physics</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF5ED] border border-[#3D3024]/10">Creative Dev</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#3D3024]/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C7E72]">
                  portfolio-arjun-premjit.vercel.app
                </span>
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all font-mono shadow-[0_4px_16px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
                >
                  <span>VIEW ARJUN'S PORTFOLIO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
