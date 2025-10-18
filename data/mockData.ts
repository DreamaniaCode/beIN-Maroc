// FIX: Implemented missing mock data for users, categories, and channels.
import { User, Channel, Category, Program } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Alex Doe', email: 'alex@example.com', isAdmin: true },
  { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', isAdmin: false },
];

export const categories: Category[] = [
  { id: 'c1', name: 'News' },
  { id: 'c2', name: 'Sports' },
  { id: 'c3', name: 'Movies' },
  { id: 'c4', name: 'Entertainment' },
  { id: 'c5', name: 'Kids' },
];

const generateProgram = (title: string, startHour: number, description: string): Program => {
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration
    return {
        title,
        startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description,
    };
};

export const channels: Channel[] = [
  {
    id: 'ch1',
    name: 'Global News',
    description: 'The latest news from around the world, 24/7. Your reliable source for breaking stories and in-depth analysis.',
    logo: 'https://placehold.co/400x225/334155/ffffff?text=Global+News',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c1'],
    currentProgram: generateProgram('World Report', 10, 'Live coverage of global events.'),
    nextProgram: generateProgram('Business Today', 11, 'The latest financial market updates.'),
  },
  {
    id: 'ch2',
    name: 'Sports Arena',
    description: 'Live sports action, highlights, and expert commentary. From football to basketball, we have it all covered.',
    logo: 'https://placehold.co/400x225/166534/ffffff?text=Sports+Arena',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c2'],
    currentProgram: generateProgram('Championship Finals', 10, 'The final match of the season.'),
    nextProgram: generateProgram('Sports Talk', 11, 'Post-game analysis and discussion.'),
  },
  {
    id: 'ch3',
    name: 'Cinema World',
    description: 'Blockbuster movies and timeless classics. Your ultimate destination for a cinematic experience at home.',
    logo: 'https://placehold.co/400x225/991b1b/ffffff?text=Cinema+World',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c3', 'c4'],
    currentProgram: generateProgram('The Galactic Adventure', 9, 'A sci-fi epic across the stars.'),
    nextProgram: generateProgram('Comedy Hour', 11, 'A hilarious stand-up special.'),
  },
  {
    id: 'ch4',
    name: 'Entertain Now',
    description: 'The latest in celebrity news, gossip, and entertainment. Your daily dose of pop culture.',
    logo: 'https://placehold.co/400x225/a21caf/ffffff?text=Entertain+Now',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c4'],
    currentProgram: generateProgram('Red Carpet Live', 10, 'Live from the movie premiere.'),
    nextProgram: generateProgram('Top 10 Countdown', 11, 'The week\'s hottest celebrity news.'),
  },
  {
    id: 'ch5',
    name: 'Kids Zone',
    description: 'Fun and educational content for children of all ages. Safe and entertaining shows for your little ones.',
    logo: 'https://placehold.co/400x225/1d4ed8/ffffff?text=Kids+Zone',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c5'],
    currentProgram: generateProgram('Cartoon Capers', 8, 'A collection of funny cartoons.'),
    nextProgram: generateProgram('Science for Kids', 9, 'Exploring the wonders of science.'),
  },
  {
    id: 'ch6',
    name: 'History Uncovered',
    description: 'Explore the past with fascinating documentaries and historical series that bring history to life.',
    logo: 'https://placehold.co/400x225/854d0e/ffffff?text=History',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c1', 'c4'],
    currentProgram: generateProgram('Ancient Empires', 12, 'The rise and fall of Rome.'),
    nextProgram: generateProgram('The World at War', 13, 'A deep dive into WWII.'),
  },
  {
    id: 'ch7',
    name: 'Foodie Network',
    description: 'Delicious recipes, cooking competitions, and culinary adventures from around the globe.',
    logo: 'https://placehold.co/400x225/c2410c/ffffff?text=Foodie',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c4'],
    currentProgram: generateProgram('Master Chef Challenge', 18, 'Amateur chefs battle it out.'),
    nextProgram: generateProgram('Street Food Diaries', 19, 'Exploring the best street food.'),
  },
  {
    id: 'ch8',
    name: 'Nature Wild',
    description: 'Breathtaking wildlife documentaries and nature series showcasing the beauty of our planet.',
    logo: 'https://placehold.co/400x225/15803d/ffffff?text=Nature+Wild',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c1'],
    currentProgram: generateProgram('Ocean Giants', 15, 'Journey with whales and sharks.'),
    nextProgram: generateProgram('The Amazon Rainforest', 16, 'Secrets of the jungle.'),
  },
  {
    id: 'ch9',
    name: 'Sci-Fi Central',
    description: 'Your portal to other dimensions with classic and modern science fiction movies and TV shows.',
    logo: 'https://placehold.co/400x225/4338ca/ffffff?text=Sci-Fi',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c3'],
    currentProgram: generateProgram('Starlight Voyager', 20, 'A spaceship crew explores the unknown.'),
    nextProgram: generateProgram('Cyber City 2099', 21, 'A dystopian future thriller.'),
  },
  {
    id: 'ch10',
    name: 'Music Mania',
    description: 'Non-stop music videos, live concerts, and exclusive interviews with your favorite artists.',
    logo: 'https://placehold.co/400x225/be185d/ffffff?text=Music+Mania',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['c4'],
    currentProgram: generateProgram('Top 40 Hits', 16, 'The biggest songs right now.'),
    nextProgram: generateProgram('Rock Legends Live', 17, 'A classic concert from the archives.'),
  },
];
