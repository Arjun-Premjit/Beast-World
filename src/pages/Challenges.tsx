import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, ArrowUpRight, Filter, Film, Sparkles, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-[#070A10] text-[#F5F7FB]">
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
      <div className="border-b border-white/10 pb-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00BCEB] tracking-widest uppercase mb-3">
              <span>MEDIA ARCHIVE</span>
              <span>/</span>
              <span>CHRONICLE 01 THROUGH 08</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5F7FB] uppercase font-display leading-[0.95]">
              THE CHALLENGE <br />
              <span className="font-extrabold text-[#087BFA]">ARCHIVE.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#AAB4C2] max-w-2xl mt-4 leading-relaxed font-normal">
              A curated catalog of the spectacles, survival experiments, and philanthropic feats defining the MrBeast universe. Featuring verified published videos alongside select production concepts.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              to="/submit-challenge"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 transition-all font-mono shadow-[0_0_20px_rgba(8,123,250,0.3)]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>PITCH A CHALLENGE</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#087BFA] text-white font-bold shadow-[0_0_15px_rgba(8,123,250,0.4)]'
                  : 'bg-white/[0.04] text-[#AAB4C2] hover:text-[#F5F7FB] hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Minimal Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#AAB4C2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#101826] border border-white/15 text-xs font-mono text-[#F5F7FB] placeholder-neutral-500 focus:outline-none focus:border-[#00BCEB]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-white font-mono"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Result Status Metric */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-8">
        <span>SHOWING {filteredChallenges.length} OF {CHALLENGES_DATA.length} ENTRIES</span>
        <span>ACTIVE FILTER: {activeCategory}</span>
      </div>

      {/* Deliberate Editorial Layout Rhythm */}
      {filteredChallenges.length > 0 ? (
        <div className="space-y-8">
          {/* Prominent Editorial Lead */}
          {filteredChallenges.length > 0 && (
            <div
              onClick={() => setSelectedChallenge(filteredChallenges[0])}
              className="group cursor-pointer rounded-3xl glass-panel border border-white/10 hover:border-[#087BFA] transition-all grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] bg-[#101826]">
                <FastImage
                  src={filteredChallenges[0].thumbnailUrl || ''}
                  alt={filteredChallenges[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#070A10]/80 backdrop-blur-md text-[#00BCEB] px-3 py-1 rounded-full text-[10px] font-mono border border-white/15 z-10">
                  {filteredChallenges[0].isRealVideo ? 'OFFICIAL RELEASE' : 'CONCEPT SPEC'}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#AAB4C2]">
                    <span className="text-[#00BCEB] font-semibold">{filteredChallenges[0].category}</span>
                    <span>·</span>
                    <span>{filteredChallenges[0].prizeOrScale}</span>
                  </div>
                  <h3 className="text-2xl font-light text-[#F5F7FB] group-hover:text-[#00BCEB] transition-colors font-display">
                    {filteredChallenges[0].title}
                  </h3>
                  <p className="text-xs text-[#AAB4C2] leading-relaxed font-normal">
                    {filteredChallenges[0].shortDescription}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#AAB4C2]">{filteredChallenges[0].publishedDate || 'ARCHIVE'}</span>
                  <span className="font-medium text-[#00BCEB] group-hover:text-white flex items-center gap-1 transition-colors">
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
                className="group cursor-pointer rounded-3xl glass-panel border border-white/10 hover:border-[#087BFA] transition-all p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#101826] mb-5">
                    <FastImage
                      src={item.thumbnailUrl || ''}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-[#070A10]/80 backdrop-blur-md text-[#00BCEB] px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-white/15 z-10">
                      {item.isRealVideo ? 'OFFICIAL RELEASE' : 'PRODUCTION CONCEPT'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#AAB4C2] mb-2">
                    <span className="text-[#00BCEB] font-medium">{item.category}</span>
                    <span>·</span>
                    <span>{item.prizeOrScale}</span>
                  </div>

                  <h3 className="text-xl font-light text-[#F5F7FB] group-hover:text-[#00BCEB] transition-colors font-display line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#AAB4C2] leading-relaxed line-clamp-3 font-normal">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#AAB4C2]">{item.publishedDate || 'SPEC ENTRY'}</span>
                  <span className="font-medium text-[#00BCEB] group-hover:text-white flex items-center gap-1 transition-colors">
                    VIEW DETAILS <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl glass-panel border border-white/10 p-8">
          <Filter className="w-6 h-6 text-[#AAB4C2] mx-auto mb-3" />
          <h3 className="text-base font-medium text-[#F5F7FB] mb-1 font-display">NO MATCHING CHALLENGES</h3>
          <p className="text-xs text-[#AAB4C2] max-w-sm mx-auto mb-4 font-normal">
            No challenges match the active filter or search keywords.
          </p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full text-xs font-mono font-medium text-white bg-[#087BFA]"
          >
            RESET FILTERS
          </button>
        </div>
      )}

      {/* Bottom Pitch Callout */}
      <div className="mt-16 p-8 rounded-3xl glass-panel border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-[11px] font-mono text-[#28B8E8] tracking-widest uppercase">
            OPEN BRAINSTORM QUEUE
          </span>
          <h3 className="text-xl sm:text-2xl font-light text-white mt-1 font-display">
            HAVE A RIDICULOUS CHALLENGE CONCEPT?
          </h3>
          <p className="text-xs text-neutral-300 max-w-xl mt-1 font-normal">
            Jimmy Donaldson's creative directors review fan pitches every week. Send in your rules, location ideas, and crazy twists.
          </p>
        </div>
        <Link
          to="/submit-challenge"
          className="px-6 py-3 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#1769E0] to-[#28B8E8] hover:opacity-90 transition-all whitespace-nowrap shadow-[0_0_20px_rgba(23,105,224,0.3)]"
        >
          PITCH A CHALLENGE
        </Link>
      </div>
    </div>
  );
};
