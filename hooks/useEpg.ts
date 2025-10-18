import { useState, useEffect } from 'react';
import { Program } from '../types';
import { epgData } from '../data/epgData';

const API_DELAY = 300;

export const useEpg = (channelId: string | undefined) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) {
        setPrograms([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const data = epgData[channelId] || [];
        const timeToMinutes = (timeStr: string): number => {
            if (!timeStr || !timeStr.includes(':')) return 0;
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };
        const sortedData = [...data].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
        setPrograms(sortedData);
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
