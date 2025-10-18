<script src="https://cdn.tailwindcss.com"></script>
import React from 'react';
import { Channel } from '../../types';
import { useNavigate } from 'react-router-dom';
import { LiveIndicator } from '../LiveIndicator';

interface HeroChannelProps {
  channel: Channel;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m5 3 14 9-14 9V3z"/></svg>
);


export const HeroChannel: React.FC<HeroChannelProps> = ({ channel }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/channel/${channel.id}`);

  return (
    <button 
      className="relative block w-full text-left rounded-lg overflow-hidden cursor-pointer group mb-12 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-bg" 
      onClick={handleNavigate}
      aria-label={`View featured channel: ${channel.name}`}
    >
      <div className="aspect-16/7 w-full">
        <img src={channel.logo.replace('400x225', '1200x525')} alt={`${channel.name} promotional art`} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white w-full md:w-2/3 lg:w-1/2">
        <div className="mb-2">
            <LiveIndicator isLive={channel.isLive}/>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold">{channel.name}</h2>
        <p className="text-md sm:text-lg mt-2 text-brand-text-dim">{channel.description || channel.currentProgram.title}</p>
        <div className="flex items-center gap-2 mt-4 bg-brand-primary text-brand-bg font-bold py-2 px-5 rounded-lg hover:bg-sky-400 transition-transform group-hover:scale-105 pointer-events-none">
            <PlayIcon />
            Watch Now
        </div>
      </div>
    </button>
  );
};