import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Channel, Category, Program } from '../types';
import { channels as mockChannels, categories as mockCategories } from '../data/mockData';
import { epgData } from '../data/epgData';

const API_DELAY = 500;

const findCurrentAndNextPrograms = (channelId: string): { currentProgram: Program, nextProgram: Program } => {
    const channelEpg = epgData[channelId] || [];
    const defaultProgram: Program = { title: 'To be announced', startTime: '', endTime: '', description: 'Schedule not available.' };
    
    if (channelEpg.length === 0) {
        return { currentProgram: defaultProgram, nextProgram: defaultProgram };
    }

    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    const timeToMinutes = (timeStr: string): number => {
        if (!timeStr || !timeStr.includes(':')) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    let currentProgram: Program | undefined;
    let nextProgram: Program | undefined;

    // Sort EPG by start time to be safe
    const sortedEpg = [...channelEpg].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    for (let i = 0; i < sortedEpg.length; i++) {
        const program = sortedEpg[i];
        const startMinutes = timeToMinutes(program.startTime);
        
        // Using end of the day for the last program's end time if it wraps
        const nextProgramStartTime = (i + 1 < sortedEpg.length) ? timeToMinutes(sortedEpg[i+1].startTime) : 24 * 60;

        if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes < nextProgramStartTime) {
            currentProgram = program;
            nextProgram = sortedEpg[(i + 1) % sortedEpg.length]; // Get next, wrap around for last program
            break;
        }
    }
    
    // Fallback if no program is currently running (e.g., before the first program of the day)
    if (!currentProgram) {
        currentProgram = sortedEpg[sortedEpg.length - 1]; // Assume last program of yesterday is "current"
        nextProgram = sortedEpg[0]; // Next program is the first of the day
    }
    
    return { 
        currentProgram: currentProgram || defaultProgram,
        nextProgram: nextProgram || defaultProgram
    };
};

interface ChannelsContextType {
  channels: Channel[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addChannel: (channelData: Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>) => void;
  updateChannel: (channelId: string, channelData: Partial<Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>>) => void;
  deleteChannel: (channelId: string) => void;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

export const ChannelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateAllChannelsPrograms = useCallback(() => {
    setChannels(prevChannels =>
      prevChannels.map(channel => ({
        ...channel,
        ...findCurrentAndNextPrograms(channel.id)
      }))
    );
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
        try {
            const initialChannels = mockChannels.map(channel => ({
                ...channel,
                ...findCurrentAndNextPrograms(channel.id)
            }));
            setChannels(initialChannels);
            setCategories(mockCategories);
        } catch (e) {
            setError('Failed to load channel data.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, API_DELAY);

    const interval = setInterval(() => {
      updateAllChannelsPrograms();
    }, 60000); // Update every minute

    return () => {
        clearTimeout(timer);
        clearInterval(interval);
    };
  }, [updateAllChannelsPrograms]);
  
  const addChannel = useCallback((channelData: Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>) => {
    const newChannel: Channel = {
        ...channelData,
        id: `ch${Date.now()}`,
        ...findCurrentAndNextPrograms(`ch${Date.now()}`),
    };
    setChannels(prev => [...prev, newChannel]);
  }, []);

  const updateChannel = useCallback((channelId: string, channelData: Partial<Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>>) => {
      setChannels(prev => prev.map(ch => ch.id === channelId ? { ...ch, ...channelData } : ch));
  }, []);

  const deleteChannel = useCallback((channelId: string) => {
      setChannels(prev => prev.filter(ch => ch.id !== channelId));
  }, []);

  return (
    <ChannelsContext.Provider value={{ channels, categories, loading, error, addChannel, updateChannel, deleteChannel }}>
      {children}
    </ChannelsContext.Provider>
  );
};

export const useChannels = () => {
  const context = useContext(ChannelsContext);
  if (context === undefined) {
    throw new Error('useChannels must be used within a ChannelsProvider');
  }
  return context;
};
