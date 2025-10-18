
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Channel, Category } from '../types';
import { channels as mockChannels, categories as mockCategories } from '../data/mockData';

// --- IMPORTANT ---
// To connect your live database, you will do two things:
// 1. Upload the `api.php` file to your Hostinger server (e.g., in `public_html`).
// 2. Change the `API_URL` variable below to your website's URL.
//    For example: const API_URL = "https://your-website.com/api.php";
//
// To use the local mock data for testing, leave API_URL as `null`.
const API_URL = null; // <-- CHANGE THIS URL TO GO LIVE

// This is the shape of the data and functions our context will provide
interface ChannelsContextType {
  channels: Channel[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addChannel: (channelData: Omit<Channel, 'id'>) => void;
  updateChannel: (channelId: string, channelData: Partial<Channel>) => void;
  deleteChannel: (channelId: string) => void;
}

// Create the context with an undefined default value
const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

// Create the Provider component
export const ChannelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      
      // Simulate a short delay for a better loading experience
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        if (API_URL) {
          // --- LIVE MODE ---
          // Fetch data from your live PHP API
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Failed to fetch from API. Server responded with status: ${response.status}`);
          }
          const data = await response.json();
          setChannels(data);
          setCategories(mockCategories); // Categories can remain static for now
        } else {
          // --- MOCK DATA MODE ---
          // Use the local mock data file
          setChannels(mockChannels);
          setCategories(mockCategories);
        }
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to load channel data. ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Function to add a new channel (simulated)
  const addChannel = useCallback((channelData: Omit<Channel, 'id'>) => {
    setChannels(prevChannels => [
      ...prevChannels,
      { ...channelData, id: `channel-${Date.now()}` } // Create a unique ID
    ]);
  }, []);

  // Function to update an existing channel (simulated)
  const updateChannel = useCallback((channelId: string, channelData: Partial<Channel>) => {
    setChannels(prevChannels =>
      prevChannels.map(c => (c.id === channelId ? { ...c, ...channelData } : c))
    );
  }, []);

  // Function to delete a channel (simulated)
  const deleteChannel = useCallback((channelId: string) => {
    setChannels(prevChannels => prevChannels.filter(c => c.id !== channelId));
  }, []);

  // The value that will be available to all consumer components
  const value = {
    channels,
    categories,
    loading,
    error,
    addChannel,
    updateChannel,
    deleteChannel,
  };

  return (
    <ChannelsContext.Provider value={value}>
      {children}
    </ChannelsContext.Provider>
  );
};

// Create the custom hook for easy consumption of the context
export const useChannels = () => {
  const context = useContext(ChannelsContext);
  if (context === undefined) {
    throw new Error('useChannels must be used within a ChannelsProvider');
  }
  return context;
};
