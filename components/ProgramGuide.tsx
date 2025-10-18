import React from 'react';
import { Channel } from '../types';

interface ProgramGuideProps {
  channel: Channel;
}

export const ProgramGuide: React.FC<ProgramGuideProps> = ({ channel }) => {
  // In a real app, this would be a list of programs for the day.
  // Here, we're just showing the current and next for simplicity.
  const programs = [channel.currentProgram, channel.nextProgram];

  return (
    <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Program Guide</h2>
      <div className="space-y-4">
        {programs.map((program, index) => (
          <div key={index} className={`flex justify-between items-center p-4 rounded-md ${index === 0 ? 'bg-slate-700 ring-2 ring-brand-primary' : 'bg-slate-800'}`}>
            <div>
              <p className="font-semibold text-brand-text">{program.title}</p>
              <p className="text-sm text-brand-text-dim">{program.startTime} - {program.endTime}</p>
            </div>
            {index === 0 && (
              <div className="text-sm font-semibold text-brand-primary">
                ON AIR
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
