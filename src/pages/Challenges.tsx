import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, ArrowUpRight, Filter } from 'lucide-react';
import { CHALLENGES_DATA, type Challenge } from '../data/challenges';
import { FastImage } from '../components/FastImage';
import { ChallengeModal } from '../components/ChallengeModal';
import { SubmitIdeaModal } from '../components/SubmitIdeaModal';

export const Challenges: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isSubmitIdeaOpen, setIsSubmitIdeaOpen] = useState<boolean>(false);

  const categories = ['ALL', 'COMPETITION', 'GIVEAWAYS', 'SURVIVAL', 'TEAM', 'COMMUNITY'];

  const filteredChallenges = useMemo(() => {
    return CHALLENGES_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.prizeOrScale.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-[#F4EFE6] text-[#1C1814]">
      {/* Detail Modal */}
      <ChallengeModal
        challenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
      <SubmitIdeaModal
        isOpen={isSubmitIdeaOpen}
        onClose={() => setIsSubmitIdeaOpen(false)}
      />

      {/* Page Header — Editorial & Compact */}
      <div className="border-b border-[#3D3024]/10 pb-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] tracking-widest uppercase mb-3 font-bold">
              <span>MEDIA ARCHIVE</span>
              <span>/</span>
              <span>CHRONICLE 01 THROUGH 08</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1C1814] uppercase font-display leading-[0.95]">
              THE CHALLENGE <br />
              <span className="font-extrabold text-[#FF3D91]">ARCHIVE.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#61554A] max-w-2xl mt-4 leading-relaxed font-normal">
              A curated catalog of the spectacles, survival experiments, and philanthropic feats defining the MrBeast universe. Featuring verified published videos alongside select production concepts.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              to="/submit-challenge"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all font-mono shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>PITCH A CHALLENGE</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#3D3024]/10">
        {/* Category Tabs in Panther Pink */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap font-medium ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] text-white font-bold shadow-[0_4px_16px_rgba(255,61,145,0.4)] scale-105'
                  : 'bg-white hover:bg-[#FAF5ED] text-[#61554A] hover:text-[#1C1814] border border-[#3D3024]/12 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Minimal Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C7E72]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#3D3024]/15 text-xs font-mono text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#8C7E72] hover:text-[#FF3D91] font-mono font-bold"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Result Status Metric */}
      <div className="flex items-center justify-between text-xs font-mono text-[#8C7E72] mb-8">
        <span>SHOWING {filteredChallenges.length} OF {CHALLENGES_DATA.length} ENTRIES</span>
        <span>ACTIVE FILTER: <span className="text-[#FF3D91] font-bold">{activeCategory}</span></span>
      </div>

      {/* Deliberate Editorial Layout Rhythm */}
      {filteredChallenges.length > 0 ? (
        <div className="space-y-8">
          {/* Prominent Editorial Lead */}
          {filteredChallenges.length > 0 && (
            <div
              onClick={() => setSelectedChallenge(filteredChallenges[0])}
              className="group cursor-pointer rounded-3xl bg-white border border-[#3D3024]/12 hover:border-[#FF3D91] transition-all grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-[0_10px_35px_rgba(50,35,20,0.06)] hover:shadow-[0_15px_40px_rgba(50,35,20,0.12)]"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] bg-[#1C1814]">
                <FastImage
                  src={filteredChallenges[0].thumbnailUrl || ''}
                  alt={filteredChallenges[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#FF3D91] px-3 py-1 rounded-full text-[10px] font-mono border border-white/15 z-10 font-bold">
                  {filteredChallenges[0].isRealVideo ? 'OFFICIAL RELEASE' : 'CONCEPT SPEC'}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#61554A]">
                    <span className="text-[#FF3D91] font-bold">{filteredChallenges[0].category}</span>
                    <span>·</span>
                    <span>{filteredChallenges[0].prizeOrScale}</span>
                  </div>
                  <h3 className="text-2xl font-light text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display">
                    {filteredChallenges[0].title}
                  </h3>
                  <p className="text-xs text-[#61554A] leading-relaxed font-normal">
                    {filteredChallenges[0].shortDescription}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8C7E72]">{filteredChallenges[0].publishedDate || 'ARCHIVE'}</span>
                  <span className="font-bold text-[#FF3D91] group-hover:text-[#E60067] flex items-center gap-1 transition-colors">
                    SPECIFICATION <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Subsequent Items in Clean Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredChallenges.slice(1).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedChallenge(item)}
                className="group cursor-pointer rounded-3xl bg-white border border-[#3D3024]/12 hover:border-[#FF3D91] transition-all p-6 flex flex-col justify-between shadow-[0_10px_35px_rgba(50,35,20,0.06)] hover:shadow-[0_15px_40px_rgba(50,35,20,0.12)]"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#1C1814] mb-5">
                    <FastImage
                      src={item.thumbnailUrl || ''}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-[#FF3D91] px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-white/15 z-10 font-bold">
                      {item.isRealVideo ? 'OFFICIAL RELEASE' : 'PRODUCTION CONCEPT'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#61554A] mb-2">
                    <span className="text-[#FF3D91] font-bold">{item.category}</span>
                    <span>·</span>
                    <span>{item.prizeOrScale}</span>
                  </div>

                  <h3 className="text-xl font-light text-[#1C1814] group-hover:text-[#FF3D91] transition-colors font-display line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#61554A] leading-relaxed line-clamp-3 font-normal">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#3D3024]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8C7E72]">{item.publishedDate || 'SPEC ENTRY'}</span>
                  <span className="font-bold text-[#FF3D91] group-hover:text-[#E60067] flex items-center gap-1 transition-colors">
                    VIEW DETAILS <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl bg-white border border-[#3D3024]/12 p-8 shadow-sm">
          <Filter className="w-6 h-6 text-[#8C7E72] mx-auto mb-3" />
          <h3 className="text-base font-medium text-[#1C1814] mb-1 font-display">NO MATCHING CHALLENGES</h3>
          <p className="text-xs text-[#61554A] max-w-sm mx-auto mb-4 font-normal">
            No challenges match the active filter or search keywords.
          </p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_16px_rgba(255,61,145,0.4)]"
          >
            RESET FILTERS
          </button>
        </div>
      )}

      {/* Bottom Pitch Callout */}
      <div className="mt-16 p-8 rounded-3xl bg-white border border-[#3D3024]/12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-[11px] font-mono text-[#FF3D91] tracking-widest uppercase font-bold">
            OPEN BRAINSTORM QUEUE
          </span>
          <h3 className="text-xl sm:text-2xl font-light text-[#1C1814] mt-1 font-display">
            HAVE A RIDICULOUS CHALLENGE CONCEPT?
          </h3>
          <p className="text-xs text-[#61554A] max-w-xl mt-1 font-normal">
            Jimmy Donaldson's creative directors review fan pitches every week. Send in your rules, location ideas, and crazy twists.
          </p>
        </div>
        <Link
          to="/submit-challenge"
          className="px-7 py-3.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all whitespace-nowrap shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:scale-105 active:scale-95"
        >
          PITCH A CHALLENGE
        </Link>
      </div>
    </div>
  );
};
