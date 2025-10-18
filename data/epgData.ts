import { EpgProgram } from '../types';

type EpgData = {
  [key: string]: EpgProgram[];
};

export const epgData: EpgData = {
  'channel-1': [
    { id: 'ch1-prog1', title: 'The Matrix', startTime: '8:00 PM', endTime: '10:30 PM', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.' },
    { id: 'ch1-prog2', title: 'John Wick', startTime: '10:30 PM', endTime: '12:30 AM', description: 'An ex-hitman comes out of retirement to track down the gangsters that took everything from him.' },
    { id: 'ch1-prog3', title: 'Mad Max: Fury Road', startTime: '12:30 AM', endTime: '2:30 AM', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.' },
  ],
  'channel-2': [
    { id: 'ch2-prog1', title: 'World News Today', startTime: '9:00 PM', endTime: '10:00 PM', description: 'Comprehensive coverage of the day\'s most important international and national news stories.' },
    { id: 'ch2-prog2', title: 'Business Report', startTime: '10:00 PM', endTime: '11:00 PM', description: 'In-depth analysis of the latest market trends and financial news.' },
    { id: 'ch2-prog3', title: 'The Daily Show', startTime: '11:00 PM', endTime: '11:30 PM', description: 'A satirical look at news, politics, and pop culture.' },
  ],
  'channel-3': [
    { id: 'ch3-prog1', title: 'Champions League: Pre-Match', startTime: '7:00 PM', endTime: '8:00 PM', description: 'Expert analysis and team news ahead of the big match.' },
    { id: 'ch3-prog2', title: 'LIVE: Real Madrid vs. Barcelona', startTime: '8:00 PM', endTime: '10:00 PM', description: 'El Clásico live from the Santiago Bernabéu stadium.' },
    { id: 'ch3-prog3', title: 'Post-Match Analysis', startTime: '10:00 PM', endTime: '11:00 PM', description: 'Highlights and expert opinions following the match.' },
  ],
  'channel-4': [
     { id: 'ch4-prog1', title: 'Stand-up Special', startTime: '9:00 PM', endTime: '10:00 PM', description: 'A hilarious hour-long special from a top comedian.' },
     { id: 'ch4-prog2', title: 'Classic Sitcoms', startTime: '10:00 PM', endTime: '11:00 PM', description: 'Back-to-back episodes of a beloved classic sitcom.' },
  ],
  'channel-5': [
      { id: 'ch5-prog1', title: 'Adventure Time', startTime: '8:00 PM', endTime: '8:30 PM', description: 'The adventures of a boy named Finn and his magical dog Jake in the Land of Ooo.' },
      { id: 'ch5-prog2', title: 'Looney Tunes', startTime: '8:30 PM', endTime: '9:00 PM', description: 'Classic cartoons featuring Bugs Bunny, Daffy Duck, and the rest of the gang.' },
  ],
  'channel-6': [
      { id: 'ch6-prog1', title: 'A Quirky Story', startTime: '8:00 PM', endTime: '9:45 PM', description: 'An award-winning independent film about finding love in unexpected places.' },
      { id: 'ch6-prog2', title: 'Director\'s Cut', startTime: '9:45 PM', endTime: '10:15 PM', description: 'An interview with the director of "A Quirky Story".' },
  ],
  'channel-8': [
      { id: 'ch8-prog1', title: 'NBA: Lakers vs. Celtics', startTime: '9:00 PM', endTime: '11:30 PM', description: 'A classic rivalry reignites on the court.' },
      { id: 'ch8-prog2', title: 'Wimbledon Highlights', startTime: '11:30 PM', endTime: '12:00 AM', description: 'The best moments from today\'s matches at Wimbledon.' },
  ]
};
