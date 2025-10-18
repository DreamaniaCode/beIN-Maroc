import { User, Category, Channel } from '../types';

export const users: User[] = [
  { id: '1', name: 'Alex (Admin)', email: 'alex@example.com', isAdmin: true },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', isAdmin: false },
  { id: '3', name: 'Khalid (Admin)', email: 'khalid@example.com', isAdmin: true },
];

export const categories: Category[] = [
  { id: 'sports', name: 'Sports' },
  { id: 'news', name: 'News' },
  { id: 'movies', name: 'Movies' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'kids', name: 'Kids' },
];

export const channels: Channel[] = [
  {
    id: 'channel-3',
    name: 'beIN SPORTS 1 HD',
    description: 'Live coverage of top football leagues, exclusive interviews, and expert analysis.',
    logo: 'https://placehold.co/400x225/be1770/FFFFFF/png?text=beIN+SPORTS+1',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['sports'],
    currentProgram: { title: 'Champions League: Pre-Match', startTime: '7:00 PM', endTime: '8:00 PM' },
    nextProgram: { title: 'LIVE: Real Madrid vs. Barcelona', startTime: '8:00 PM', endTime: '10:00 PM' },
  },
    {
    id: 'channel-8',
    name: 'beIN SPORTS 2 HD',
    description: 'The home of basketball, tennis, and international sports tournaments.',
    logo: 'https://placehold.co/400x225/be1770/FFFFFF/png?text=beIN+SPORTS+2',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['sports'],
    currentProgram: { title: 'NBA: Lakers vs. Celtics', startTime: '9:00 PM', endTime: '11:30 PM' },
    nextProgram: { title: 'Wimbledon Highlights', startTime: '11:30 PM', endTime: '12:00 AM' },
  },
  {
    id: 'channel-1',
    name: 'Action Movies HD',
    description: 'The best non-stop action movies from around the globe. Explosions guaranteed.',
    logo: 'https://placehold.co/400x225/00a0e1/FFFFFF/png?text=Action+Movies',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['movies'],
    currentProgram: { title: 'The Matrix', startTime: '8:00 PM', endTime: '10:30 PM' },
    nextProgram: { title: 'John Wick', startTime: '10:30 PM', endTime: '12:30 AM' },
  },
  {
    id: 'channel-2',
    name: 'Global News Network',
    description: 'Up-to-the-minute world news, business reports, and political analysis.',
    logo: 'https://placehold.co/400x225/2a2a2a/FFFFFF/png?text=Global+News',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['news'],
    currentProgram: { title: 'World News Today', startTime: '9:00 PM', endTime: '10:00 PM' },
    nextProgram: { title: 'Business Report', startTime: '10:00 PM', endTime: '11:00 PM' },
  },
  {
    id: 'channel-4',
    name: 'Comedy Central',
    logo: 'https://placehold.co/400x225/2a2a2a/FFFFFF/png?text=Comedy',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['entertainment'],
    currentProgram: { title: 'Stand-up Special', startTime: '9:00 PM', endTime: '10:00 PM' },
    nextProgram: { title: 'Classic Sitcoms', startTime: '10:00 PM', endTime: '11:00 PM' },
  },
  {
    id: 'channel-5',
    name: 'Cartoon Universe',
    logo: 'https://placehold.co/400x225/2a2a2a/FFFFFF/png?text=Cartoons',
    isLive: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['kids', 'entertainment'],
    currentProgram: { title: 'Adventure Time', startTime: '8:00 PM', endTime: '8:30 PM' },
    nextProgram: { title: 'Looney Tunes', startTime: '8:30 PM', endTime: '9:00 PM' },
  },
  {
    id: 'channel-6',
    name: 'Indie Films',
    logo: 'https://placehold.co/400x225/00a0e1/FFFFFF/png?text=Indie+Films',
    isLive: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    categoryIds: ['movies'],
    currentProgram: { title: 'A Quirky Story', startTime: '8:00 PM', endTime: '9:45 PM' },
    nextProgram: { title: 'Director\'s Cut', startTime: '9:45 PM', endTime: '10:15 PM' },
  }
];