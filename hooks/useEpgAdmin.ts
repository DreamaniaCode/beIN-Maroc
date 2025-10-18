import { useState, useEffect, useCallback } from 'react';
import { Program } from '../types';
import { epgData as mockEpgData } from '../data/epgData';

const API_DELAY = 200;

let epgDataStore = JSON.parse(JSON.stringify(mockEpgData));

const timeToMinutes = (timeStr: string): number => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export const useEpgAdmin = (channelId: string | null) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(() => {
    if (channelId) {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          const channelPrograms = epgDataStore[channelId] || [];
          const sortedPrograms = [...channelPrograms].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
          setPrograms(sortedPrograms);
        } catch (e) {
          setError('Failed to load EPG data.');
        } finally {
          setLoading(false);
        }
      }, API_DELAY);
    } else {
      setPrograms([]);
    }
  }, [channelId]);

  useEffect(() => {
    fetchPrograms();
  }, [channelId, fetchPrograms]);

  const updateProgram = useCallback((index: number, programData: Program) => {
    if (!channelId) return;
    const newPrograms = [...programs];
    newPrograms[index] = programData;
    epgDataStore[channelId] = newPrograms;
    fetchPrograms(); // Refetch to get sorted list
  }, [channelId, programs, fetchPrograms]);

  const addProgram = useCallback((programData: Program) => {
    if (!channelId) return;
    const currentPrograms = epgDataStore[channelId] || [];
    const newPrograms = [...currentPrograms, programData];
    epgDataStore[channelId] = newPrograms;
    fetchPrograms(); // Refetch to get sorted list
  }, [channelId, fetchPrograms]);

  const deleteProgram = useCallback((index: number) => {
    if (!channelId) return;
    const programToDelete = programs[index];
    const newPrograms = (epgDataStore[channelId] || []).filter(p => p.startTime !== programToDelete.startTime || p.title !== programToDelete.title);
    epgDataStore[channelId] = newPrograms;
    fetchPrograms();
  }, [channelId, programs, fetchPrograms]);

  return { programs, loading, error, updateProgram, addProgram, deleteProgram };
};
