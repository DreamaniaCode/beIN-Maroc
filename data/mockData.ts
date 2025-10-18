
import { Category, Channel, User } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Channels' },
  { id: 'sports', name: 'Sports' },
  { id: 'news', name: 'News' },
  { id: 'movies', name: 'Movies' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'kids', name: 'Kids' },
];

// NOTE: Using a public domain HLS test stream for demonstration.
// Real applications would use protected stream URLs.
const sampleStreamUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export const channels: Channel[] = [
  {
    id: 'channel-1',
    name: 'Action Sports HD',
    logo: 'https://picsum.photos/seed/sports1/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['sports'],
    isLive: true,
    currentProgram: { title: 'Live: Premier League Football', startTime: '20:00', endTime: '22:00' },
    nextProgram: { title: 'Match Day Highlights', startTime: '22:00', endTime: '23:00' },
  },
  {
    id: 'channel-2',
    name: 'Global News Network',
    logo: 'https://picsum.photos/seed/news1/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['news'],
    isLive: true,
    currentProgram: { title: 'World News Today', startTime: '21:00', endTime: '22:00' },
    nextProgram: { title: 'Business Report', startTime: '22:00', endTime: '22:30' },
  },
  {
    id: 'channel-3',
    name: 'Cinema World',
    logo: 'https://picsum.photos/seed/movies1/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['movies'],
    isLive: true,
    currentProgram: { title: 'Inception', startTime: '20:30', endTime: '23:00' },
    nextProgram: { title: 'The Matrix', startTime: '23:00', endTime: '01:30' },
  },
  {
    id: 'channel-4',
    name: 'FunZone Kids',
    logo: 'https://picsum.photos/seed/kids1/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['kids'],
    isLive: true,
    currentProgram: { title: 'Cartoon Carnival', startTime: '18:00', endTime: '19:00' },
    nextProgram: { title: 'Puzzles & Play', startTime: '19:00', endTime: '20:00' },
  },
  {
    id: 'channel-5',
    name: 'Entertainment+',
    logo: 'https://picsum.photos/seed/ent1/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['entertainment'],
    isLive: true,
    currentProgram: { title: 'Celebrity Talk Show', startTime: '21:00', endTime: '22:00' },
    nextProgram: { title: 'Music Hits Countdown', startTime: '22:00', endTime: '23:00' },
  },
  {
    id: 'channel-6',
    name: 'World Sports 2',
    logo: 'https://picsum.photos/seed/sports2/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['sports'],
    isLive: false,
    currentProgram: { title: 'NBA Classics: Lakers vs Celtics', startTime: '20:00', endTime: '22:00' },
    nextProgram: { title: 'Formula 1 Review', startTime: '22:00', endTime: '23:00' },
  },
  {
    id: 'channel-7',
    name: 'Daily Chronicle',
    logo: 'https://picsum.photos/seed/news2/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['news'],
    isLive: true,
    currentProgram: { title: 'The Evening Post', startTime: '19:00', endTime: '20:00' },
    nextProgram: { title: 'Tech Tonight', startTime: '20:00', endTime: '21:00' },
  },
  {
    id: 'channel-8',
    name: 'Indie Films',
    logo: 'https://picsum.photos/seed/movies2/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['movies'],
    isLive: true,
    currentProgram: { title: 'Moonlight', startTime: '21:00', endTime: '23:00' },
    nextProgram: { title: 'Short Film Showcase', startTime: '23:00', endTime: '00:00' },
  },
   {
    id: 'channel-9',
    name: 'Sports Arena',
    logo: 'https://picsum.photos/seed/sports3/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['sports'],
    isLive: true,
    currentProgram: { title: 'Live UFC Fight Night', startTime: '22:00', endTime: '01:00' },
    nextProgram: { title: 'Post-Fight Analysis', startTime: '01:00', endTime: '01:30' },
  },
  {
    id: 'channel-10',
    name: 'DocuWorld',
    logo: 'https://picsum.photos/seed/ent2/200/200',
    streamUrl: sampleStreamUrl,
    categoryIds: ['entertainment'],
    isLive: false,
    currentProgram: { title: 'Planet Earth II', startTime: '20:00', endTime: '21:00' },
    nextProgram: { title: 'The Cosmos', startTime: '21:00', endTime: '22:00' },
  }
];

export const users: User[] = [
    { id: 'user-1', name: 'Alex Doe', email: 'alex@example.com' }
];
