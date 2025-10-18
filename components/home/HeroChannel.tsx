// Fix: Provide full content for HeroChannel.tsx to resolve module errors.
import React from 'react';
import { Channel } from '../../types';
import { useNavigate } from 'react-router-dom';

interface HeroChannelProps {
  channel: Channel;
}

export const HeroChannel: React.FC<HeroChannelProps> = ({ channel }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer group mb-8" 
      onClick={() => navigate(`/channel/${channel.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/channel/${channel.id}`)}
      aria-label={`View featured channel: ${channel.name}`}
    >
      <div className="aspect-w-16 aspect-h-7">
        <img src="https://placehold.co/1200x525/0D1117/FFFFFF/png?text=Featured+Channel" alt="Hero" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white">
        <p className="text-sm font-bold text-brand-primary">NOW PLAYING</p>
        <h2 className="text-2xl sm:text-4xl font-bold group-hover:underline">{channel.name}</h2>
        <p className="text-md sm:text-lg mt-2">{channel.currentProgram.title}</p>
      </div>
    </div>
  );
};
