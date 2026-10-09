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
    accentColor: '#FF3D91',
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
    accentColor: '#087BFA',
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
    accentColor: '#FF3D91',
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
    accentColor: '#087BFA',
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
    accentColor: '#FF3D91',
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
    accentColor: '#087BFA',
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
    accentColor: '#FF3D91',
    thumbnailUrl: 'https://img.youtube.com/vi/TJ2if3k44nA/hqdefault.jpg',
  },
  {
    id: 'vid-team-seas',
    youtubeId: 'cV2gBU6hKfY',
    title: 'We Cleaned Up 30 Million Pounds Of Trash',
    type: 'video',
    views: '210M+ Views',
    publishedYear: '2023',
    description: 'TeamSeas global ocean cleanup removing 30 million pounds of marine trash from beaches, rivers, and oceans worldwide.',
    highlightTag: 'GLOBAL CONSERVATION',
    accentColor: '#087BFA',
    thumbnailUrl: 'https://img.youtube.com/vi/cV2gBU6hKfY/hqdefault.jpg',
  },
];
