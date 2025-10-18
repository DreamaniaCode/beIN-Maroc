// FIX: Implemented missing mock Electronic Program Guide (EPG) data.
import { Program } from '../types';

interface EpgData {
  [channelId: string]: Program[];
}

const generateEpgForChannel = (channelName: string, themes: string[]): Program[] => {
    const programs: Program[] = [];
    for (let i = 0; i < 24; i++) {
        const themeIndex = Math.floor(Math.random() * themes.length);
        const startTime = new Date();
        startTime.setHours(i, 0, 0, 0);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration
        
        programs.push({
            title: `${themes[themeIndex]} Hour on ${channelName}`,
            startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            description: `An hour of exciting content about ${themes[themeIndex].toLowerCase()}.`,
        });
    }
    return programs;
}

export const epgData: EpgData = {
    'ch1': generateEpgForChannel('Global News', ['World Politics', 'Tech News', 'Health Watch', 'Documentary']),
    'ch2': generateEpgForChannel('Sports Arena', ['Football Highlights', 'Basketball Analysis', 'Extreme Sports', 'Athlete Interviews']),
    'ch3': generateEpgForChannel('Cinema World', ['Action Movies', 'Romantic Comedies', 'Classic Cinema', 'Sci-Fi thrillers']),
    'ch4': generateEpgForChannel('Entertain Now', ['Celebrity Gossip', 'Reality Show', 'Music Countdown', 'Late Night Talk']),
    'ch5': generateEpgForChannel('Kids Zone', ['Cartoons', 'Educational Fun', 'Puppet Show', 'Animated Adventures']),
    'ch6': generateEpgForChannel('History Uncovered', ['Ancient Civilizations', 'War Documentaries', 'Biographies', 'Historical Mysteries']),
    'ch7': generateEpgForChannel('Foodie Network', ['Cooking Competitions', 'Restaurant Reviews', 'Baking Show', 'Culinary Travels']),
    'ch8': generateEpgForChannel('Nature Wild', ['Ocean Depths', 'Jungle Safari', 'Mountain Life', 'Wildlife Conservation']),
    'ch9': generateEpgForChannel('Sci-Fi Central', ['Space Operas', 'Cyberpunk Stories', 'Alien Encounters', 'Time Travel Tales']),
    'ch10': generateEpgForChannel('Music Mania', ['Top Hits', 'Rock Anthems', 'Pop Icons', 'Acoustic Sessions']),
};
