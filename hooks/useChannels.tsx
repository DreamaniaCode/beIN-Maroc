import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Channel } from '../types';
// We are importing the local mock data to make the app work without a live backend.
import { channels as mockChannels } from '../data/mockData';

// IMPORTANT: This is the placeholder URL for your live API.
// We have commented out the live fetching logic for now.
// const API_URL = 'https://your-website.com/api.php';

interface ChannelsContextType {
  channels: Channel[];
  loading: boolean;
  error: string | null;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

export const ChannelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // --- Using Local Mock Data ---
    // This makes the app work immediately without needing a live database.
    try {
      // Simulate a network request to show the loading indicator
      setLoading(true);
      setTimeout(() => {
        setChannels(mockChannels);
        setLoading(false);
      }, 500); // 0.5 second delay
    } catch (e) {
      setError("Failed to load mock data.");
      setLoading(false);
    }
    
    /*
    // --- Code for fetching from your LIVE PHP API ---
    // UNCOMMENT THIS BLOCK WHEN YOUR api.php IS WORKING ON HOSTINGER

    const fetchChannels = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if(data.error) {
            throw new Error(data.error);
        }

        setChannels(data);
      } catch (e) {
        console.error("Failed to fetch channels:", e);
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
    */
    
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = { channels, loading, error };

  return (
    <ChannelsContext.Provider value={value}>
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
