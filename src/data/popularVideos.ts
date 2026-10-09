export interface PopularVideo {
  id: string;
  youtubeId: string;
  title: string;
  type: 'video' | 'short';
  views: string;
  publishedYear: string;
  description: string;
  highlightTag: string;
  accentColor: string;
  thumbnailUrl: string;
}

export const POPULAR_VIDEOS: PopularVideo[] = [
  {
    id: 'vid-squid-game',
    youtubeId: '0e3GPea1Tyg',
    title: '$456,000 Squid Game In Real Life!',
    type: 'video',
    views: '650M+ Views',
    publishedYear: '2021',
    description: 'Recreated all six iconic games in real life with 456 contestants competing for a real $456,000 cash prize.',
    highlightTag: 'MOST WATCHED CREATOR EVENT',
    accentColor: '#FF007A', // Beast Pink
    thumbnailUrl: 'https://img.youtube.com/vi/0e3GPea1Tyg/hqdefault.jpg',
  },
  {
    id: 'vid-hotel-rooms',
    youtubeId: '1WEAJ-DFkHE',
    title: '$1 vs $1,000,000 Hotel Room!',
    type: 'video',
    views: '390M+ Views',
    publishedYear: '2022',
    description: 'Testing the extremes of global hospitality, from a cardboard box campsite to a $1,000,000 private castle estate.',
    highlightTag: 'EXTREME SCALE TEST',
    accentColor: '#FFD400', // Gold
    thumbnailUrl: 'https://img.youtube.com/vi/1WEAJ-DFkHE/hqdefault.jpg',
  },
  {
    id: 'vid-willy-wonka',
    youtubeId: 'Hwybp38GnZw',
    title: 'I Built Willy Wonka’s Chocolate Factory!',
    type: 'video',
    views: '310M+ Views',
    publishedYear: '2022',
    description: 'A life-size edible candy wonderland complete with chocolate rivers, marshmallow rooms, and Gordon Ramsay as celebrity judge.',
    highlightTag: 'CUSTOM PRODUCTION WONDER',
    accentColor: '#00C2FF', // Beast Blue
    thumbnailUrl: 'https://img.youtube.com/vi/Hwybp38GnZw/hqdefault.jpg',
  },
  {
    id: 'vid-solitary',
    youtubeId: 'vyqC9YvP_2c',
    title: 'I Spent 50 Hours In Solitary Confinement',
    type: 'video',
    views: '330M+ Views',
    publishedYear: '2020',
    description: '50 continuous hours locked in a soundproof, white-walled room with zero sensory stimulation or clocks.',
    highlightTag: 'PSYCHOLOGICAL ENDURANCE',
    accentColor: '#00C2FF',
    thumbnailUrl: 'https://img.youtube.com/vi/vyqC9YvP_2c/hqdefault.jpg',
  },
  {
    id: 'vid-abandoned-island',
    youtubeId: 'er6m94z58_c',
    title: 'I Survived 7 Days On An Abandoned Island',
    type: 'video',
    views: '280M+ Views',
    publishedYear: '2023',
    description: 'Stranded in the remote Pacific with the boys, battling torrential storms, building shelters, and finding fresh water.',
    highlightTag: 'WILDERNESS EXPEDITION',
    accentColor: '#FF007A',
    thumbnailUrl: 'https://img.youtube.com/vi/er6m94z58_c/hqdefault.jpg',
  },
  {
    id: 'vid-100-kids-adults',
    youtubeId: 'GLoeAJUcz38',
    title: '100 Kids vs 100 Adults For $500,000',
    type: 'video',
    views: '260M+ Views',
    publishedYear: '2023',
    description: 'Massive generational battle in a colossal stadium obstacle gauntlet to determine which generation wins half a million dollars.',
    highlightTag: 'STADIUM TOURNAMENT',
    accentColor: '#FFD400',
    thumbnailUrl: 'https://img.youtube.com/vi/GLoeAJUcz38/hqdefault.jpg',
  },
  {
    id: 'vid-blind-see',
    youtubeId: 'TJ2if3k44nA',
    title: '1,000 Blind People See For The First Time',
    type: 'video',
    views: '190M+ Views',
    publishedYear: '2023',
    description: 'Beast Philanthropy funded 1,000 life-changing cataract extraction surgeries for people with curable blindness across the globe.',
    highlightTag: 'PHILANTHROPIC TRIUMPH',
    accentColor: '#00C2FF',
    thumbnailUrl: 'https://img.youtube.com/vi/TJ2if3k44nA/hqdefault.jpg',
  },
  {
    id: 'vid-team-seas',
    youtubeId: 'cV2gBU6hKfY',
    title: 'I Cleaned The World’s Dirtiest Beach #TeamSeas',
    type: 'video',
    views: '130M+ Views',
    publishedYear: '2021',
    description: 'Rallied thousands of creators and deployed high-tech river interceptors to eliminate 30,000,000 lbs of ocean waste.',
    highlightTag: 'GLOBAL CLEANUP INITIATIVE',
    accentColor: '#00E5FF',
    thumbnailUrl: 'https://img.youtube.com/vi/cV2gBU6hKfY/hqdefault.jpg',
  }
];

export const POPULAR_SHORTS: PopularVideo[] = [
  {
    id: 'short-world-record',
    youtubeId: 'dBxOybb7lAI',
    title: 'Would You Drink Liquid Gold?',
    type: 'short',
    views: '140M+ Views',
    publishedYear: '2023',
    description: 'Offering strangers pure 24k culinary gold drinks or a stack of cash on the spot.',
    highlightTag: 'VIRAL DROP',
    accentColor: '#FFD400',
    thumbnailUrl: 'https://img.youtube.com/vi/dBxOybb7lAI/hqdefault.jpg',
  },
  {
    id: 'short-lamborghini',
    youtubeId: 'K_Cqf5bYkS0',
    title: 'Don’t Choose The Wrong Door!',
    type: 'short',
    views: '180M+ Views',
    publishedYear: '2023',
    description: 'Contestants decide between mystery doors holding luxury supercars or giant slime drops.',
    highlightTag: 'HIGH-STAKES SHORT',
    accentColor: '#FF007A',
    thumbnailUrl: 'https://img.youtube.com/vi/K_Cqf5bYkS0/hqdefault.jpg',
  },
  {
    id: 'short-cookie-jar',
    youtubeId: 'xSOrqg_q63A',
    title: 'Give This Stranger $10,000 If He Smiles',
    type: 'short',
    views: '120M+ Views',
    publishedYear: '2024',
    description: 'Spontaneous public giving challenge that brought an entire grocery store to tears.',
    highlightTag: 'INSTANT GIVING',
    accentColor: '#00C2FF',
    thumbnailUrl: 'https://img.youtube.com/vi/xSOrqg_q63A/hqdefault.jpg',
  }
];
