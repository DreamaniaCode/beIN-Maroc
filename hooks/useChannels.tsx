// FIX: Implemented the missing useChannels hook and ChannelsProvider.
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Channel, Category } from '../types';
import { channels as mockChannels, categories as mockCategories } from '../data/mockData';

// Simulate API delay
const API_DELAY = 500;

interface ChannelsContextType {
  channels: Channel[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addChannel: (channelData: Omit<Channel, 'id'>) => void;
  updateChannel: (channelId: string, channelData: Partial<Omit<Channel, 'id'>>) => void;
  deleteChannel: (channelId: string) => void;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

export const ChannelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      try {
        // In a real app, you would sort or filter this data
        setChannels(mockChannels);
        setCategories(mockCategories);
      } catch (e) {
        setError('Failed to load channel data.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, API_DELAY);
  }, []);
  
  const addChannel = useCallback((channelData: Omit<Channel, 'id'>) => {
    const newChannel: Channel = {
        ...channelData,
        id: `ch${Date.now()}`, // Create a pseudo-unique ID
    };
    setChannels(prev => [...prev, newChannel]);
  }, []);

  const updateChannel = useCallback((channelId: string, channelData: Partial<Omit<Channel, 'id'>>) => {
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
