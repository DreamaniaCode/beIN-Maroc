// FIX: Implemented the missing `useEpg` hook.
import { useState, useEffect } from 'react';
import { Program } from '../types';
import { epgData } from '../data/epgData';

// Simulate API delay
const API_DELAY = 300;

export const useEpg = (channelId: string | undefined) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    if (!channelId) {
        setPrograms([]);
        setLoading(false);
        return;
    }

    // Simulate fetching data from an API
    setTimeout(() => {
      try {
        const data = epgData[channelId];
        if (data) {
          setPrograms(data);
        } else {
          // No data for this channel, which is not an error, just empty
          setPrograms([]);
        }
      } catch (e) {
        setError('Failed to load EPG data.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, API_DELAY);
  }, [channelId]);

  return { programs, loading, error };
};
