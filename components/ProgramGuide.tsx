
import React from 'react';
import { Channel } from '../types';
import { LiveIndicator } from './LiveIndicator';

interface ProgramGuideProps {
  channel: Channel;
}

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-brand-secondary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export const ProgramGuide: React.FC<ProgramGuideProps> = ({ channel }) => {
  return (
    <div className="bg-brand-surface rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={channel.logo} alt={`${channel.name} logo`} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h2 className="text-2xl font-bold text-white">{channel.name}</h2>
          <div className="mt-1">
            <LiveIndicator isLive={channel.isLive} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-brand-primary mb-4">Program Guide</h3>
        <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-md">
                <p className="text-sm font-bold text-brand-text-dim">NOW PLAYING</p>
                <p className="text-base font-semibold text-brand-text mt-1">{channel.currentProgram.title}</p>
                <div className="flex items-center gap-2 text-sm text-brand-secondary mt-1">
                    <ClockIcon />
                    <span>{channel.currentProgram.startTime} - {channel.currentProgram.endTime}</span>
                </div>
            </div>
            <div className="opacity-70 p-4 rounded-md">
                <p className="text-sm font-bold text-brand-text-dim">UP NEXT</p>
                <p className="text-base font-semibold text-brand-text mt-1">{channel.nextProgram.title}</p>
                 <div className="flex items-center gap-2 text-sm text-brand-secondary mt-1">
                    <ClockIcon />
                    <span>{channel.nextProgram.startTime} - {channel.nextProgram.endTime}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
