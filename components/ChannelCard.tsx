import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Channel } from '../types';
import { LiveIndicator } from './LiveIndicator';

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/channel/${channel.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <div
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View channel ${channel.name}`}
      className="group block rounded-lg overflow-hidden bg-brand-surface hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-bg cursor-pointer"
    >
      <div className="relative">
        <img 
          src={channel.logo} 
          alt={`${channel.name} logo`}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2">
          <LiveIndicator isLive={channel.isLive} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-brand-text truncate">{channel.name}</h3>
        <p className="text-sm text-brand-text-dim truncate">{channel.currentProgram.title}</p>
      </div>
    </div>
  );
};
