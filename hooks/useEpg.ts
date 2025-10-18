import { useState, useEffect } from 'react';
import { EpgProgram } from '../types';
import { epgData } from '../data/epgData';

export const useEpg = (channelId: string | undefined) => {
  const [programs, setPrograms] = useState<EpgProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) {
        setPrograms([]);
        setLoading(false);
        return;
    }
    
    const fetchEpgData = async () => {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        // In a real app, you would fetch this data from an API
        // e.g., const response = await fetch(`/api/epg/${channelId}`);
        const data = epgData[channelId] || [];
        setPrograms(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to load EPG data. ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEpgData();
  }, [channelId]);

  return { programs, loading, error };
};
