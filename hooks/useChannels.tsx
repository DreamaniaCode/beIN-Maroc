// Fix: Provide full content for useChannels.tsx to resolve module errors.
import { useState, useEffect } from 'react';
import { Channel, Category } from '../types';
import { channels as mockChannels, categories as mockCategories } from '../data/mockData';

interface UseChannelsReturn {
  channels: Channel[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useChannels = (): UseChannelsReturn => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = () => {
      setLoading(true);
      setError(null);
      // Simulate API call
      setTimeout(() => {
        try {
          setChannels(mockChannels);
          setCategories(mockCategories);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch channel data.');
          setLoading(false);
          console.error(err);
        }
      }, 500); // 500ms delay to simulate network
    };

    fetchChannels();
  }, []);

  return { channels, categories, loading, error };
};
