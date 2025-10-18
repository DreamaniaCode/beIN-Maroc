import { useState, useCallback } from 'react';
import { EpgProgram } from '../types';
import { epgData as mockEpgData } from '../data/epgData';

// In a real app, this would be a more robust in-memory store or a context.
// For this mock setup, we'll manage the state within the hook.
let epgDataStore: { [key: string]: EpgProgram[] } = JSON.parse(JSON.stringify(mockEpgData));

export const useEpgAdmin = () => {
  const [epgData, setEpgData] = useState(epgDataStore);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Function to get programs for a specific channel
  const getProgramsForChannel = useCallback((channelId: string): EpgProgram[] => {
    return epgData[channelId] || [];
  }, [epgData]);

  // Function to add a new program
  const addProgram = useCallback((channelId: string, programData: Omit<EpgProgram, 'id'>) => {
    // In a real app, you'd generate a proper ID.
    const newProgram = { ...programData, id: `prog-${Date.now()}` };
    
    setEpgData(prevData => {
      const channelPrograms = prevData[channelId] ? [...prevData[channelId]] : [];
      channelPrograms.push(newProgram);
      const newData = { ...prevData, [channelId]: channelPrograms };
      epgDataStore = newData; // Update "database"
      return newData;
    });
  }, []);

  // Function to update an existing program
  const updateProgram = useCallback((channelId: string, programId: string, programData: Partial<EpgProgram>) => {
    setEpgData(prevData => {
      const channelPrograms = prevData[channelId]?.map(p => 
        p.id === programId ? { ...p, ...programData } : p
      );
      if (channelPrograms) {
        const newData = { ...prevData, [channelId]: channelPrograms };
        epgDataStore = newData; // Update "database"
        return newData;
      }
      return prevData;
    });
  }, []);

  // Function to delete a program
  const deleteProgram = useCallback((channelId: string, programId: string) => {
    setEpgData(prevData => {
      const channelPrograms = prevData[channelId]?.filter(p => p.id !== programId);
      if (channelPrograms) {
        const newData = { ...prevData, [channelId]: channelPrograms };
        epgDataStore = newData; // Update "database"
        return newData;
      }
      return prevData;
    });
  }, []);

  return {
    loading,
    error,
    getProgramsForChannel,
    addProgram,
    updateProgram,
    deleteProgram,
  };
};
