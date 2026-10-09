export interface Challenge {
  id: string;
  index: string;
  title: string;
  category: 'COMPETITION' | 'GIVEAWAYS' | 'SURVIVAL' | 'TEAM' | 'COMMUNITY';
  shortDescription: string;
  fullDescription: string;
  energyLevel: 'EXTREME' | 'HIGH' | 'MAXIMUM' | 'TACTICAL';
  prizeOrScale: string;
  duration: string;
  participants: string;
  keyRule: string;
  visualTheme: 'vault' | 'arctic' | 'island' | 'stadium' | 'circle' | 'maze' | 'water' | 'forest';
  thumbnailUrl?: string;
  youtubeId?: string;
  isRealVideo: boolean;
  publishedDate?: string;
}

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'squid-game-real-life',
    index: '01',
    title: '$456,000 SQUID GAME IN REAL LIFE',
    category: 'GIVEAWAYS',
    shortDescription: '456 real contestants battle through custom physical recreations of Red Light Green Light, Tug of War, and Glass Bridge for $456,000 cash.',
    fullDescription: 'The defining creator spectacle in internet history. A multi-million-dollar production that recreated all six sets with custom pneumatic safety drop-zones, tracking sensors for every player, and an authentic cash sphere containing $456,000 in crisp currency.',
    energyLevel: 'MAXIMUM',
    prizeOrScale: '$456,000 Cash',
    duration: '6 Exhausting Production Days',
    participants: '456 Verified Challengers',
    keyRule: 'Tripping the sensor vest trigger results in immediate dye explosion elimination.',
    visualTheme: 'stadium',
    thumbnailUrl: 'https://img.youtube.com/vi/0e3GPea1Tyg/hqdefault.jpg',
    youtubeId: '0e3GPea1Tyg',
    isRealVideo: true,
    publishedDate: 'November 2021'
  },
  {
    id: 'vault-1m',
    index: '02',
    title: '$1,000,000 LASER VAULT INFILTRATION',
    category: 'GIVEAWAYS',
    shortDescription: 'Contestants navigate high-precision motion detection grids and locked vault chambers to reach the briefcase.',
    fullDescription: 'A custom-built subterranean vault complex filled with over 200 laser tripwires, pressure-sensitive floor tiles, and biometric security locks. Contestants must use gymnastics, balance, and quick thinking to reach the vault door before the 60-minute lockdown.',
    energyLevel: 'MAXIMUM',
    prizeOrScale: '$1,000,000 Cash',
    duration: '60-Minute Countdown',
    participants: '10 Finalists',
    keyRule: 'Tripping any laser adds 5 minutes to the lockdown timer.',
    visualTheme: 'vault',
    isRealVideo: false,
    publishedDate: 'Production Concept'
  },
  {
    id: 'arctic-survival',
    index: '03',
    title: '7 DAYS IN SUB-ZERO ARCTIC TUNDRA',
    category: 'SURVIVAL',
    shortDescription: 'Surviving extreme polar conditions inside a prototype geodesic pod with limited resources and tactical supply drops.',
    fullDescription: 'A remote wilderness endurance challenge situated 200 miles north of the Arctic Circle. Contestants are equipped with extreme weather survival suits and must maintain internal habitat warmth, complete daily outdoor supply puzzles, and outlast brutal blizzard conditions.',
    energyLevel: 'EXTREME',
    prizeOrScale: '$500,000 Or Custom Heavy Vehicle',
    duration: '168 Continuous Hours',
    participants: '4 Endurance Specialists',
    keyRule: 'If personal core temperature drops below safe threshold, medical evacuation triggers.',
    visualTheme: 'arctic',
    isRealVideo: false,
    publishedDate: 'Production Concept'
  },
  {
    id: 'island-escape',
    index: '04',
    title: 'LAST TO LEAVE THE ABANDONED ISLAND',
    category: 'COMPETITION',
    shortDescription: 'Stranded in the remote Pacific, building shelters, foraging coconuts, and enduring ruthless daily elimination gauntlets.',
    fullDescription: 'Jimmy and the boys spend 7 continuous days surviving with only what washed ashore. Severe tropical storms, building bamboo rafts, and competing in obstacle sprints to determine who stays on the island.',
    energyLevel: 'HIGH',
    prizeOrScale: '$800,000 Island Ownership',
    duration: '7 Days & Nights',
    participants: 'Jimmy & The Crew',
    keyRule: 'Tapping out signals the rescue boat and forfeits survival standing.',
    visualTheme: 'island',
    thumbnailUrl: 'https://img.youtube.com/vi/er6m94z58_c/hqdefault.jpg',
    youtubeId: 'er6m94z58_c',
    isRealVideo: true,
    publishedDate: 'August 2023'
  },
  {
    id: 'stadium-50-creators',
    index: '05',
    title: '50 CREATORS BATTLE FOR $1,000,000',
    category: 'COMPETITION',
    shortDescription: 'The biggest digital creators in the world clash in an arena of five relentless mental and physical gauntlets.',
    fullDescription: 'A massive spectacle hosted in an Olympic-scale indoor stadium with 50 of the top creators on YouTube, TikTok, and Twitch. Features giant glass cube enclosures, cognitive logic puzzles, and intense psychological duels.',
    energyLevel: 'MAXIMUM',
    prizeOrScale: '$1,000,000 Cash Briefcase',
    duration: '48 Production Hours',
    participants: '50 Global Creators',
    keyRule: 'Every round halves the remaining field until only two contenders face off.',
    visualTheme: 'stadium',
    thumbnailUrl: 'https://img.youtube.com/vi/GLoeAJUcz38/hqdefault.jpg',
    youtubeId: 'GLoeAJUcz38',
    isRealVideo: true,
    publishedDate: 'June 2024'
  },
  {
    id: 'solitary-50-hours',
    index: '06',
    title: '50 HOURS IN SOLITARY CONFINEMENT',
    category: 'SURVIVAL',
    shortDescription: 'Locked inside a completely white soundproof chamber with zero clocks, zero sunlight, and zero human contact.',
    fullDescription: 'An intense psychological endurance experiment. Jimmy spent 50 continuous hours isolated inside a custom white soundstage room with hidden surveillance cameras tracking sleep cycles and mental stamina.',
    energyLevel: 'TACTICAL',
    prizeOrScale: 'Personal Mental Endurance Record',
    duration: '50 Continuous Hours',
    participants: 'Jimmy Donaldson',
    keyRule: 'Stepping through the single exit door ends the timer immediately.',
    visualTheme: 'circle',
    thumbnailUrl: 'https://img.youtube.com/vi/vyqC9YvP_2c/hqdefault.jpg',
    youtubeId: 'vyqC9YvP_2c',
    isRealVideo: true,
    publishedDate: 'May 2020'
  },
  {
    id: 'clean-water-project',
    index: '07',
    title: '100 SOLAR WELLS FOR 500,000 PEOPLE',
    category: 'COMMUNITY',
    shortDescription: 'Constructing sustainable solar-powered deep boreholes across rural communities to provide lifetime potable water.',
    fullDescription: 'In partnership with local civil engineers and community elders, Beast Philanthropy constructed over 100 deep-well water distribution points across sub-Saharan Africa, drastically cutting daily walking distances and improving regional health.',
    energyLevel: 'HIGH',
    prizeOrScale: '500,000+ Lives Impacted',
    duration: 'Year-Round Initiative',
    participants: 'Global Philanthropy Crew',
    keyRule: '100% community-owned and maintained infrastructure for generational sustainability.',
    visualTheme: 'water',
    thumbnailUrl: 'https://img.youtube.com/vi/TJ2if3k44nA/hqdefault.jpg',
    youtubeId: 'TJ2if3k44nA',
    isRealVideo: true,
    publishedDate: 'November 2023'
  },
  {
    id: 'trees-reforestation',
    index: '08',
    title: 'TEAMTREES & TEAMSEAS GLOBAL ACTION',
    category: 'COMMUNITY',
    shortDescription: 'The internet unites to plant 20 million trees and remove 30 million pounds of plastic trash from oceans and rivers.',
    fullDescription: 'A historic grassroots creator campaign collaborating with thousands of creators worldwide. Every single dollar donated directly equaled one native tree planted or one pound of marine debris extracted using high-capacity automated river interceptors.',
    energyLevel: 'HIGH',
    prizeOrScale: '50M+ Units Planted / Cleaned',
    duration: 'Ongoing Impact',
    participants: '10,000,000+ Global Donors',
    keyRule: 'Third-party certified auditing on all plantings and ocean debris removals.',
    visualTheme: 'forest',
    thumbnailUrl: 'https://img.youtube.com/vi/cV2gBU6hKfY/hqdefault.jpg',
    youtubeId: 'cV2gBU6hKfY',
    isRealVideo: true,
    publishedDate: 'October 2019 - Present'
  }
];
