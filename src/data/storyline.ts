export interface StoryChapter {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  body: string;
  keyStat: string;
  statLabel: string;
}

export const STORYLINE_CHAPTERS: StoryChapter[] = [
  {
    index: '01',
    year: '2012 — 2016',
    title: 'THE OBSESSION',
    subtitle: 'Microphones, sleepless nights, and the algorithm.',
    body: 'Starting with a broken microphone in a North Carolina bedroom, Jimmy spent 14 hours every single day analyzing thumbnails, retention curves, pacing, and viral mechanics. No quick shortcuts. Just pure iterative obsession.',
    keyStat: '100,000',
    statLabel: 'Numbers counted out loud in one 40-hour take'
  },
  {
    index: '02',
    year: '2017 — 2019',
    title: 'THE REINVESTMENT ENGINE',
    subtitle: 'Giving away the first brand deal cheque.',
    body: 'When the first major brand deal paid $10,000, instead of saving it, Jimmy handed every dollar directly to a homeless man on camera. It established the core philosophy: reinvest 100% of revenue into making each video bigger, bolder, and more generous than the last.',
    keyStat: '$10,000',
    statLabel: 'First creator giveaway that shifted YouTube history'
  },
  {
    index: '03',
    year: '2020 — 2022',
    title: 'STADIUM PRODUCTION SCALE',
    subtitle: 'Building real-life worlds from scratch.',
    body: 'Content evolved from challenges to Hollywood-scale spectacles. Custom soundstages, Olympic-scale arenas, hundreds of automated cameras, and sets that cost millions were built—only to be given away or destroyed in the name of unprecedented entertainment.',
    keyStat: '40,000 sq ft',
    statLabel: 'Average custom physical challenge set footprint'
  },
  {
    index: '04',
    year: '2023 — 2024',
    title: 'GLOBAL MULTILINGUAL REACH',
    subtitle: 'Connecting continents through entertainment.',
    body: 'By pioneering multi-language audio dubbing and localized releases in Spanish, Hindi, Japanese, Arabic, and French, Beast broke cultural barriers, turning singular video drops into global worldwide events watched simultaneously in over 190 countries.',
    keyStat: '300M+',
    statLabel: 'Subscribers across international network'
  },
  {
    index: '05',
    year: '2025 — BEYOND',
    title: 'ENTERTAINMENT WITH PURPOSE',
    subtitle: 'Converting internet attention into permanent infrastructure.',
    body: 'Through Beast Philanthropy, the community has funded solar water wells, rescued thousands of shelter animals, built houses, provided prosthetic limbs, and restored sight. Proving that entertainment can directly feed, heal, and uplift millions.',
    keyStat: '500,000+',
    statLabel: 'People provided clean water & direct relief'
  }
];
