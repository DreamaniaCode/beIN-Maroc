// FIX: Implemented the missing `useEpgAdmin` hook.
import { useState, useEffect, useCallback } from 'react';
import { Program } from '../types';
import { epgData as mockEpgData } from '../data/epgData';

// Simulate API delay
const API_DELAY = 200;

// In a real app, this would be a proper state management solution (e.g., Redux, Zustand)
// or interact with a backend. For this mock, we'll just manage it in memory.
let epgDataStore = { ...mockEpgData };

export const useEpgAdmin = (channelId: string | null) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (channelId) {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          setPrograms(epgDataStore[channelId] || []);
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

  const updateProgram = useCallback((index: number, programData: Program) => {
    if (!channelId) return;
    const newPrograms = [...programs];
    newPrograms[index] = programData;
    epgDataStore[channelId] = newPrograms;
    setPrograms(newPrograms);
  }, [channelId, programs]);

  const addProgram = useCallback((programData: Program) => {
    if (!channelId) return;
    const newPrograms = [...programs, programData];
    // A real app should sort by time
    epgDataStore[channelId] = newPrograms;
    setPrograms(newPrograms);
  }, [channelId, programs]);

  const deleteProgram = useCallback((index: number) => {
    if (!channelId) return;
    const newPrograms = programs.filter((_, i) => i !== index);
    epgDataStore[channelId] = newPrograms;
    setPrograms(newPrograms);
  }, [channelId, programs]);

  return { programs, loading, error, updateProgram, addProgram, deleteProgram };
};
