import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Channel } from '../types';
import { LiveIndicator } from './LiveIndicator';
import { FavoriteButton } from './FavoriteButton';

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/channel/${channel.id}`);
  };

  const formatDisplayTime = (timeStr: string): string => {
      if (!timeStr || !timeStr.includes(':')) return '...';
      const [hours, minutes] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div 
      className="bg-brand-surface rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/50 transition-shadow duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={channel.logo} alt={`${channel.name} logo`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2">
          <LiveIndicator isLive={channel.isLive} />
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <FavoriteButton channelId={channel.id} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate text-brand-text" title={channel.name}>{channel.name}</h3>
        <p className="text-sm text-brand-text-dim truncate" title={channel.currentProgram.title}>
          {channel.currentProgram.title}
        </p>
        <p className="text-xs text-brand-text-dim">
          {formatDisplayTime(channel.currentProgram.startTime)} - {formatDisplayTime(channel.currentProgram.endTime)}
        </p>
      </div>
    </div>
  );
};
