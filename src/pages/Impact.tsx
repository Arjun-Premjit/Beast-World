import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FastImage } from '../components/FastImage';

export const Impact: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-[#F4EFE6] text-[#1C1814]">
      {/* Page Header — Editorial Manifesto */}
      <div className="border-b border-[#3D3024]/10 pb-16 mb-20">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] tracking-widest uppercase mb-4 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3D91]" />
          <span>BEAST PHILANTHROPY // HUMANITARIAN MANDATE</span>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light tracking-tight text-[#1C1814] uppercase font-display leading-[0.92]">
          MORE THAN <br />
          <span className="font-extrabold text-[#FF3D91]">THE MOMENT.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#61554A] max-w-3xl mt-6 leading-relaxed font-normal">
          The goal isn’t to accumulate wealth or status. It is to take the most watched entertainment platform in human history and convert that attention into clean water, food security, tree planting, and life-changing relief for everyday people.
        </p>
      </div>

      {/* Quote Statement Section */}
      <div className="py-12 border-b border-[#3D3024]/10 mb-20 max-w-4xl">
        <blockquote className="text-2xl sm:text-4xl font-light text-[#1C1814] leading-snug font-display">
          “I want to make the world a better place before I die. I don’t care about luxury cars or mansions. I want to build schools, feed people, and dig wells.”
        </blockquote>
        <div className="pt-6 flex items-center gap-3 text-xs font-mono text-[#61554A]">
          <span className="text-[#FF3D91] font-bold">JIMMY DONALDSON</span>
          <span>—</span>
          <span>FOUNDER, BEAST PHILANTHROPY</span>
        </div>
      </div>

      {/* Full-Width Visual Editorial Chapters */}
      <div className="space-y-24 mb-24">
        {/* Chapter 01: Clean Water Wells */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#3D3024]/10 pb-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-[#FF3D91] uppercase tracking-widest font-bold">
              01 / INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1C1814] font-display">
              100+ Solar Water Wells
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
              In dozens of rural villages across Kenya, Zimbabwe, and Uganda, children walk hours every single day just to carry muddy, contaminated water. Beast Philanthropy partnered with certified local drillers to install deep solar pump boreholes, providing permanent, sterilized drinking water to over 500,000 residents and keeping kids in school.
            </p>
            <div className="pt-2 text-xs font-mono text-[#61554A]">
              <span>VERIFIED OUTCOME: </span>
              <span className="font-bold text-[#FF3D91]">500,000+ LIVES DIRECTLY IMPACTED</span>
            </div>
            <div className="pt-2">
              <a
                href="https://www.beastphilanthropy.org"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-mono text-[#FF3D91] hover:text-[#E60067] transition-colors"
              >
                <span>VIEW INITIATIVE DOCUMENTARY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#3D3024]/12 aspect-[16/10] overflow-hidden shadow-xl">
            <FastImage
              src="https://img.youtube.com/vi/TJ2if3k44nA/hqdefault.jpg"
              alt="Clean Water Well Celebration"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Chapter 02: TeamTrees & TeamSeas */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#3D3024]/10 pb-20">
          <div className="lg:col-span-7 order-2 lg:order-1 rounded-3xl bg-white border border-[#3D3024]/12 aspect-[16/10] overflow-hidden shadow-xl">
            <FastImage
              src="https://img.youtube.com/vi/cV2gBU6hKfY/hqdefault.jpg"
              alt="TeamSeas Ocean Cleanup"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-mono text-[#FF3D91] uppercase tracking-widest font-bold">
              02 / GLOBAL CONSERVATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1C1814] font-display">
              TeamTrees & TeamSeas
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
              Organized alongside former NASA engineer Mark Rober, these two campaigns rallied over 10,000 creators to raise tens of millions of dollars. In partnership with the Arbor Day Foundation and The Ocean Cleanup, 20M+ trees were planted globally and 34M+ pounds of marine trash were removed using autonomous solar river interceptors.
            </p>
            <div className="pt-2 text-xs font-mono text-[#61554A]">
              <span>COMBINED RESULT: </span>
              <span className="font-bold text-[#FF3D91]">54M+ TREES ROOTED & LBS REMOVED</span>
            </div>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://teamtrees.org"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-mono text-[#FF3D91] hover:text-[#E60067] transition-colors"
              >
                <span>TEAMTREES.ORG</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://teamseas.org"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-mono text-[#FF3D91] hover:text-[#E60067] transition-colors"
              >
                <span>TEAMSEAS.ORG</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Chapter 03: Food Logistics & Pantries */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-[#FF3D91] uppercase tracking-widest font-bold">
              03 / FOOD INSECURITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1C1814] font-display">
              Millions of Fresh Meals
            </h2>
            <p className="text-xs sm:text-sm text-[#61554A] leading-relaxed font-normal">
              Beast Philanthropy operates a permanent 501(c)(3) food distribution hub in North Carolina that intercepts surplus food from wholesalers and delivers nutritious produce, meats, and pantry goods directly to underserved food deserts. Over 15 million meals have been distributed to families with zero administrative overhead deducted.
            </p>
            <div className="pt-2 text-xs font-mono text-[#61554A]">
              <span>TOTAL MEALS SERVED: </span>
              <span className="font-bold text-[#FF3D91]">15,000,000+ DELIVERED</span>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#3D3024]/12 aspect-[16/10] overflow-hidden shadow-xl">
            <FastImage
              src="https://img.youtube.com/vi/Hwybp38GnZw/hqdefault.jpg"
              alt="Community Distribution"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </div>

      {/* Sustainable Model Summary Strip */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#3D3024]/12 mb-20 shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono text-[#FF3D91] uppercase tracking-widest font-bold">
            OPERATIONAL PARADIGM
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-[#1C1814] mt-1 font-display">
            HOW CREATOR AD DOLLARS FUND THE RELIEF
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
          <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
            <span className="font-mono text-[#FF3D91] font-bold block mb-1">STEP 01</span>
            <h4 className="font-bold text-[#1C1814] mb-1 font-display text-sm">100% Ad Revenue Pass-through</h4>
            <p className="text-[#61554A] leading-relaxed">
              Every view and like on the Beast Philanthropy channel generates ad revenue that goes directly into project execution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
            <span className="font-mono text-[#FF3D91] font-bold block mb-1">STEP 02</span>
            <h4 className="font-bold text-[#1C1814] mb-1 font-display text-sm">Zero Overhead Deductions</h4>
            <p className="text-[#61554A] leading-relaxed">
              Jimmy’s main companies absorb operational costs so that 100% of donor funding goes directly to relief.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10">
            <span className="font-mono text-[#FF3D91] font-bold block mb-1">STEP 03</span>
            <h4 className="font-bold text-[#1C1814] mb-1 font-display text-sm">Local Infrastructure Ownership</h4>
            <p className="text-[#61554A] leading-relaxed">
              All wells and schools are handed over to local village engineers and elders to ensure generational sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA in Panther Pink */}
      <div className="text-center max-w-lg mx-auto space-y-4">
        <h3 className="text-2xl sm:text-3xl font-light text-[#1C1814] font-display">
          WANT TO GET INVOLVED?
        </h3>
        <p className="text-xs sm:text-sm text-[#61554A] font-normal">
          Register with our community network to be the first to know when public volunteer and build opportunities open.
        </p>
        <Link
          to="/join"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_20px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
        >
          <span>JOIN COMMUNITY DISPATCH</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
